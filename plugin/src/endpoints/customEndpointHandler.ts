import type { PayloadHandler } from 'payload'

import { getPluginMeta, resolvePluginMeta, type DashboardHealthResponse } from '../templateMeta.js'

const countCollection = async (
  payload: Parameters<PayloadHandler>[0]['payload'],
  collection: 'media' | 'pages' | 'plugin-collection' | 'posts',
) => {
  if (!payload.collections[collection]) {
    return null
  }

  const { totalDocs } = await payload.count({ collection })
  return totalDocs
}

export const customEndpointHandler: PayloadHandler = async (req) => {
  const meta = getPluginMeta(req.payload.config) || resolvePluginMeta()
  const [pluginCollection, posts, pages, media] = await Promise.all([
    countCollection(req.payload, 'plugin-collection'),
    countCollection(req.payload, 'posts'),
    countCollection(req.payload, 'pages'),
    countCollection(req.payload, 'media'),
  ])

  const response: DashboardHealthResponse = {
    collections: {
      media,
      pages,
      pluginCollection: pluginCollection ?? 0,
      posts,
    },
    meta,
    status: 'ok',
    timestamp: new Date().toISOString(),
  }

  return Response.json(response)
}
