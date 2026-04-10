import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { plugin } from 'odlabs-payload-plugin-template'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { testEmailAdapter } from './helpers/testEmailAdapter.js'
import { seed } from './seed.js'
import { Media } from './src/collections/Media.js'
import { Pages } from './src/collections/Pages/index.js'
import { Posts } from './src/collections/Posts/index.js'
import { Users } from './src/collections/Users/index.js'
import { defaultLexical } from './src/fields/defaultLexical.js'
import { Footer } from './src/Footer/config.js'
import { Header } from './src/Header/config.js'
import { getOptionalEnv, getPluginBrandName } from './src/utilities/env.js'
import { getServerSideURL } from './src/utilities/getURL.js'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

if (!process.env.ROOT_DIR) {
  process.env.ROOT_DIR = dirname
}

const databaseURL = process.env.DATABASE_URL || 'file:./dev.db'
const brandName = getPluginBrandName()

export default buildConfig({
  admin: {
    components: {
      beforeDashboard: ['@/components/BeforeDashboard'],
      beforeLogin: ['@/components/BeforeLogin'],
      graphics: {
        Icon: '/src/graphics/Icon/index.tsx#Icon',
        Logo: '/src/graphics/Logo/index.tsx#Logo',
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        {
          name: 'mobile',
          height: 667,
          label: 'Mobile',
          width: 375,
        },
        {
          name: 'tablet',
          height: 1024,
          label: 'Tablet',
          width: 768,
        },
        {
          name: 'desktop',
          height: 900,
          label: 'Desktop',
          width: 1440,
        },
      ],
    },
    meta: {
      description:
        'OD LABS white-label plugin template for Payload with a branded website dev app and built-in dashboard metadata cards.',
      icons: [
        {
          type: 'image/svg+xml',
          rel: 'icon',
          url: '/assets/favicon.svg',
        },
      ],
      openGraph: {
        description:
          'OD LABS white-label plugin template for Payload with a branded website dev app and built-in dashboard metadata cards.',
        images: [
          {
            height: 630,
            url: '/admin/hero-image.webp',
            width: 1200,
          },
        ],
        title: `${brandName} Payload Plugin Template`,
      },
      titleSuffix: `- ${brandName}`,
    },
    user: Users.slug,
  },
  collections: [Pages, Posts, Media, Users],
  cors: [getServerSideURL()].filter(Boolean),
  db: sqliteAdapter({
    client: {
      url: databaseURL,
    },
    push: process.env.NODE_ENV !== 'production',
  }),
  editor: defaultLexical,
  email: testEmailAdapter,
  globals: [Header, Footer],
  onInit: async (payload) => {
    await seed(payload)
  },
  plugins: [
    plugin({
      collections: {
        posts: true,
      },
      dashboard: {
        injectIntoAdmin: false,
      },
      meta: {
        brandName,
        packageName: getOptionalEnv(process.env.PLUGIN_PACKAGE_NAME),
        publishedAt: getOptionalEnv(process.env.PLUGIN_PUBLISHED_AT),
        repositoryURL: getOptionalEnv(process.env.PLUGIN_REPOSITORY_URL),
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || 'odlabs-plugin-template-secret',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})

