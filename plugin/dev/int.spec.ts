import type { Payload } from 'payload'

import { rm } from 'fs/promises'
import path from 'path'
import { createPayloadRequest, getPayload } from 'payload'
import { fileURLToPath } from 'url'
import { afterAll, beforeAll, describe, expect, test } from 'vitest'

import { customEndpointHandler } from '../src/endpoints/customEndpointHandler.js'
import { bootstrapTemplateContent, seedSampleContent } from './src/endpoints/seed/index.js'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const dbBasePath = path.resolve(dirname, '../test-template.sqlite')

let config: unknown
let payload: Payload

const cleanupTestDatabase = async () => {
  for (const suffix of ['', '-shm', '-wal']) {
    const target = `${dbBasePath}${suffix}`

    for (let attempt = 0; attempt < 5; attempt += 1) {
      try {
        await rm(target, { force: true })
        break
      } catch (error) {
        if (!(error instanceof Error) || !('code' in error) || error.code !== 'EBUSY') {
          throw error
        }

        await new Promise((resolve) => setTimeout(resolve, 100))
      }
    }
  }
}

const getBootstrapCounts = async () => {
  const [users, pages, media] = await Promise.all([
    payload.count({ collection: 'users' }),
    payload.count({ collection: 'pages' }),
    payload.count({ collection: 'media' }),
  ])

  return {
    media: media.totalDocs,
    pages: pages.totalDocs,
    users: users.totalDocs,
  }
}

beforeAll(async () => {
  await cleanupTestDatabase()

  process.env.DATABASE_URL = 'file:./test-template.sqlite'
  process.env.NEXT_PUBLIC_SERVER_URL = 'http://localhost:3000'
  process.env.PAYLOAD_SECRET = 'odlabs-test-secret'
  process.env.ENABLE_SAMPLE_POST_SEED = 'false'
  process.env.ENABLE_SAMPLE_POST_SEED_UI = 'false'
  process.env.PLUGIN_PACKAGE_NAME = ''
  process.env.PLUGIN_REPOSITORY_URL = ''
  process.env.PLUGIN_PUBLISHED_AT = ''

  const configModule = await import('@payload-config')
  config = configModule.default
  payload = await getPayload({ config: config as any })
})

afterAll(async () => {
  if (payload) {
    await payload.destroy()
  }

  await new Promise((resolve) => setTimeout(resolve, 100))
  await cleanupTestDatabase()
})

describe('OD LABS plugin template', () => {
  test('injects the plugin custom field into configured collections', () => {
    const postsCollection = payload.config.collections.find(
      (collection: { slug: string }) => collection.slug === 'posts',
    )

    const hasAddedByPluginField = (postsCollection?.fields as any)?.some(
      (field: any) => field?.name === 'addedByPlugin',
    )

    expect(hasAddedByPluginField).toBe(true)
  })

  test('creates and seeds the plugin collection on init', async () => {
    expect(payload.collections['plugin-collection']).toBeDefined()

    const seededDocs = await payload.count({
      collection: 'plugin-collection',
      where: {
        id: {
          equals: 'seeded-by-plugin',
        },
      },
    })

    expect(seededDocs.totalDocs).toBe(1)
  })

  test('returns structured dashboard health data from the custom endpoint', async () => {
    const request = new Request('http://localhost:3000/api/my-plugin-endpoint', {
      method: 'GET',
    })

    const payloadRequest = await createPayloadRequest({ config: config as any, request })
    const response = await customEndpointHandler(payloadRequest)

    expect(response.status).toBe(200)

    const data = await response.json()

    expect(data).toMatchObject({
      meta: {
        brandName: 'OD LABS',
        license: 'MIT',
      },
      status: 'ok',
    })
    expect(data.collections.pluginCollection).toBe(1)
    expect(typeof data.timestamp).toBe('string')
  })

  test('bootstraps homepage globals idempotently', async () => {
    const countsBefore = await getBootstrapCounts()

    const homePagesBefore = await payload.find({
      collection: 'pages',
      depth: 0,
      limit: 10,
      pagination: false,
      where: {
        slug: {
          equals: 'home',
        },
      },
    })

    const headerBefore = await payload.findGlobal({ slug: 'header', depth: 0 })
    const footerBefore = await payload.findGlobal({ slug: 'footer', depth: 0 })

    expect(homePagesBefore.docs).toHaveLength(1)
    expect(headerBefore.navItems).toHaveLength(2)
    expect(footerBefore.navItems).toHaveLength(3)

    await bootstrapTemplateContent({ payload })
    await bootstrapTemplateContent({ payload })

    const countsAfter = await getBootstrapCounts()
    const homePagesAfter = await payload.find({
      collection: 'pages',
      depth: 0,
      limit: 10,
      pagination: false,
      where: {
        slug: {
          equals: 'home',
        },
      },
    })

    expect(countsAfter).toEqual(countsBefore)
    expect(homePagesAfter.docs).toHaveLength(1)
  })

  test('can add optional sample posts without duplicating them', async () => {
    const previousFlag = process.env.ENABLE_SAMPLE_POST_SEED
    process.env.ENABLE_SAMPLE_POST_SEED = 'true'

    try {
      await seedSampleContent({ payload })
      await seedSampleContent({ payload })
    } finally {
      process.env.ENABLE_SAMPLE_POST_SEED = previousFlag
    }

    const posts = await payload.find({
      collection: 'posts',
      depth: 0,
      limit: 10,
      pagination: false,
      where: {
        slug: {
          in: [
            'dashboard-branding-for-your-plugin',
            'runtime-plugin-metadata-with-env',
            'optional-sample-seeding',
          ],
        },
      },
    })

    const media = await payload.count({ collection: 'media' })

    expect(posts.docs).toHaveLength(3)
    expect(posts.docs.map(({ slug }) => slug).sort()).toEqual([
      'dashboard-branding-for-your-plugin',
      'optional-sample-seeding',
      'runtime-plugin-metadata-with-env',
    ])
    expect(media.totalDocs).toBe(4)
  })
})


