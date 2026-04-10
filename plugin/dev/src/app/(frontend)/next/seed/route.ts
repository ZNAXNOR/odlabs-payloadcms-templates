import { seedSampleContent } from '@/endpoints/seed'
import { isFlagEnabled } from '@/utilities/env'
import config from '@payload-config'
import { headers } from 'next/headers'
import { createLocalReq, getPayload } from 'payload'


export const maxDuration = 60

export async function POST(): Promise<Response> {
  if (!isFlagEnabled(process.env.ENABLE_SAMPLE_POST_SEED)) {
    return new Response('Sample post seeding is disabled for this template.', { status: 403 })
  }

  const payload = await getPayload({ config })
  const requestHeaders = await headers()

  const { user } = await payload.auth({ headers: requestHeaders })

  if (!user) {
    return new Response('Action forbidden.', { status: 403 })
  }

  try {
    const payloadReq = await createLocalReq({ user }, payload)

    await seedSampleContent({ payload, req: payloadReq })

    return Response.json({ success: true })
  } catch (error) {
    payload.logger.error({ err: error, message: 'Error seeding sample post data' })
    return new Response('Error seeding sample post data.', { status: 500 })
  }
}
