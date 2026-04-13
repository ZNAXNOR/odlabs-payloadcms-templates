import type { File, Payload, PayloadRequest } from 'payload'

import { readFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

import { devUser } from '../../../helpers/credentials.js'
import { home } from './home'
import { image1 } from './image-1'
import { image2 } from './image-2'
import { image3 } from './image-3'
import { image4 } from './image-4'
import { image5 } from './image-5'
import { post1 } from './post-1'
import { post2 } from './post-2'
import { post3 } from './post-3'
import { plainRichText } from './richText'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const localSeedAssetPath = path.resolve(dirname, '../../../public/assets')
const localSeedAssetMimeType = 'image/webp'
const disableRevalidateContext = {
  disableRevalidate: true,
}

type SeedArgs = {
  payload: Payload
  req?: PayloadRequest
}

type MediaSeedArgs = {
  data: Record<string, unknown>
  fileName: string
  payload: Payload
  req?: PayloadRequest
}

export const bootstrapTemplateContent = async ({ payload, req }: SeedArgs): Promise<void> => {
  payload.logger.info('Ensuring OD LABS bootstrap content...')

  const adminUser = await getOrCreateAdminUser({ payload, req })

  const heroMedia = await getOrCreateMedia({
    data: {
      alt: 'Hero Artwork',
      caption: plainRichText('The high-impact hero artwork for the OD LABS plugin template.'),
    },
    fileName: 'Hero.webp',
    payload,
    req,
  })

  const homepageMedia = await getOrCreateMedia({
    data: {
      alt: 'Homepage Content Artwork',
      caption: plainRichText('Featured artwork used for the homepage content sections.'),
    },
    fileName: 'Homepage_Media.webp',
    payload,
    req,
  })

  const homePageResult = await payload.find({
    collection: 'pages',
    depth: 0,
    limit: 1,
    pagination: false,
    req,
    where: {
      slug: {
        equals: 'home',
      },
    },
  })

  if (homePageResult.docs.length === 0) {
    await payload.create({
      collection: 'pages',
      context: disableRevalidateContext,
      data: home({ heroImage: heroMedia, metaImage: homepageMedia }) as any,
      depth: 0,
      req,
    })
  } else {
    await payload.update({
      id: homePageResult.docs[0].id,
      collection: 'pages',
      context: disableRevalidateContext,
      data: {
        hero: {
          ...homePageResult.docs[0].hero,
          media: heroMedia.id,
        },
        layout: homePageResult.docs[0].layout?.map((block: any) => {
          if (block.blockType === 'mediaBlock') {
            return {
              ...block,
              media: homepageMedia.id,
            }
          }
          return block
        }),
        meta: {
          ...homePageResult.docs[0].meta,
          image: homepageMedia.id,
        },
      },
      req,
    })
  }

  const header = await payload.findGlobal({ slug: 'header', depth: 0, req })
  if (!Array.isArray(header?.navItems) || header.navItems.length === 0) {
    await payload.updateGlobal({
      slug: 'header',
      context: disableRevalidateContext,
      data: {
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'Home',
              url: '/',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Posts',
              url: '/posts',
            },
          },
        ],
      },
      req,
    })
  }

  const footer = await payload.findGlobal({ slug: 'footer', depth: 0, req })
  if (!Array.isArray(footer?.navItems) || footer.navItems.length === 0) {
    await payload.updateGlobal({
      slug: 'footer',
      context: disableRevalidateContext,
      data: {
        navItems: [
          {
            link: {
              type: 'custom',
              label: 'Admin',
              url: '/admin',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'Posts',
              url: '/posts',
            },
          },
          {
            link: {
              type: 'custom',
              label: 'OD LABS',
              newTab: true,
              url: 'https://odtechlab.com',
            },
          },
        ],
      },
      req,
    })
  }


  payload.logger.info({
    msg: 'OD LABS bootstrap content ready.',
    user: adminUser.email,
  })
}

export const seedSampleContent = async ({ payload, req }: SeedArgs): Promise<void> => {
  payload.logger.info('Ensuring OD LABS sample posts...')

  const adminUser = await getOrCreateAdminUser({ payload, req })

  const [dashboardMedia, metadataMedia, seedingMedia, adminDashboardImage, seedPanelImage, ] = await Promise.all([
    getOrCreateMedia({
      data: image1,
      fileName: 'Package_Thumbnail.webp',
      payload,
      req,
    }),
    getOrCreateMedia({
      data: image2,
      fileName: 'Metadata_Thumbnail.webp',
      payload,
      req,
    }),
    getOrCreateMedia({
      data: image3,
      fileName: 'Seed_Thumbnail.webp',
      payload,
      req,
    }),
    getOrCreateMedia({
      data: image4,
      fileName: 'Admin_Dashboard.webp',
      payload,
      req,
    }),
    getOrCreateMedia({
      data: image5,
      fileName: 'Seed_Panel.webp',
      payload,
      req,
    }),
  ])

  const seededPosts = await Promise.all([
    getOrCreatePost({
      slug: 'dashboard-branding-for-your-plugin',
      data: post1({ author: adminUser, blockImage: adminDashboardImage, heroImage: dashboardMedia }),
      payload,
      req,
    }),
    getOrCreatePost({
      slug: 'runtime-plugin-metadata-with-env',
      data: post2({ author: adminUser, blockImage: metadataMedia, heroImage: metadataMedia }),
      payload,
      req,
    }),
    getOrCreatePost({
      slug: 'optional-sample-seeding',
      data: post3({ author: adminUser, blockImage: seedPanelImage, heroImage: seedingMedia }),
      payload,
      req,
    }),
  ])

  await Promise.all(
    seededPosts.map(async (postDoc) => {
      const existingRelatedPosts = Array.isArray(postDoc.relatedPosts) ? postDoc.relatedPosts : []
      if (existingRelatedPosts.length > 0) {
        return
      }

      const relatedPostIDs = seededPosts.filter(({ id }) => id !== postDoc.id).map(({ id }) => id)

      await payload.update({
        id: postDoc.id,
        collection: 'posts',
        context: disableRevalidateContext,
        data: {
          relatedPosts: relatedPostIDs,
        },
        depth: 0,
        req,
      })
    }),
  )

  payload.logger.info('OD LABS sample posts ready.')
}

async function getOrCreateAdminUser({ payload, req }: SeedArgs) {
  const existingUser = await payload.find({
    collection: 'users',
    depth: 0,
    limit: 1,
    pagination: false,
    req,
    where: {
      email: {
        equals: devUser.email,
      },
    },
  })

  if (existingUser.docs[0]) {
    return existingUser.docs[0]
  }

  return payload.create({
    collection: 'users',
    data: {
      name: 'OD LABS Admin',
      email: devUser.email,
      password: devUser.password,
    },
    depth: 0,
    req,
  })
}

async function getOrCreateMedia({ data, fileName, payload, req }: MediaSeedArgs) {
  const mediaAlt = typeof data.alt === 'string' ? data.alt : fileName

  const existingMedia = await payload.find({
    collection: 'media',
    depth: 0,
    limit: 1,
    pagination: false,
    req,
    where: {
      alt: {
        equals: mediaAlt,
      },
    },
  })

  if (existingMedia.docs[0]) {
    return existingMedia.docs[0]
  }

  return payload.create({
    collection: 'media',
    data: data as any,
    depth: 0,
    file: await readSeedFile(fileName),
    req,
  })
}

async function getOrCreatePost({
  slug,
  data,
  payload,
  req,
}: {
  data: Record<string, unknown>
  payload: Payload
  req?: PayloadRequest
  slug: string
}) {
  const existingPost = await payload.find({
    collection: 'posts',
    depth: 0,
    limit: 1,
    pagination: false,
    req,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  if (existingPost.docs[0]) {
    return existingPost.docs[0]
  }

  return payload.create({
    collection: 'posts',
    context: disableRevalidateContext,
    data: data as any,
    depth: 0,
    req,
  })
}

async function readSeedFile(name: string): Promise<File> {
  const filePath = path.join(localSeedAssetPath, name)
  const data = await readFile(filePath)

  return {
    name,
    data,
    mimetype: localSeedAssetMimeType,
    size: data.byteLength,
  }
}




