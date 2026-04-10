import type { Metadata } from 'next'

import type { Config, Media, Page, Post } from '../payload-types'

import { getServerSideURL } from './getURL'
import { mergeOpenGraph } from './mergeOpenGraph'

const defaultDescription =
  'OD LABS white-label Payload plugin template with a branded SQLite-backed website dev app.'
const defaultTitle = 'OD LABS Payload Plugin Template'

const getImageURL = (image?: Config['db']['defaultIDType'] | Media | null) => {
  const serverUrl = getServerSideURL()

  let url = `${serverUrl}/admin/hero-image.webp`

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: null | Partial<Page> | Partial<Post>
}): Promise<Metadata> => {
  const { doc } = args

  await Promise.resolve()




  const ogImage = getImageURL(doc?.meta?.image)
  const title = doc?.meta?.title ? `${doc.meta.title} | OD LABS` : defaultTitle
  const description = doc?.meta?.description || defaultDescription

  return {
    description,
    openGraph: mergeOpenGraph({
      description,
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}

