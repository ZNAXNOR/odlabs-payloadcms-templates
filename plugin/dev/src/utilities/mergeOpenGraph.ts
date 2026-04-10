import type { Metadata } from 'next'

import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'An OD LABS white-labeled Payload starter for building and previewing a plugin package with a branded website shell.',
  images: [
    {
      url: `${getServerSideURL()}/admin/hero-image.webp`,
    },
  ],
  siteName: 'OD LABS Payload Plugin Template',
  title: 'OD LABS Payload Plugin Template',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
