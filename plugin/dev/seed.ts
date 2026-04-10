import type { Payload } from 'payload'

import { bootstrapTemplateContent } from './src/endpoints/seed/index.js'
import { devUser } from './helpers/credentials.js'

export const seed = async (payload: Payload) => {
  const { totalDocs } = await payload.count({
    collection: 'users',
    where: {
      email: {
        equals: devUser.email,
      },
    },
  })

  if (!totalDocs) {
    await payload.create({
      collection: 'users',
      data: devUser,
    })
  }

  await bootstrapTemplateContent({ payload })
}
