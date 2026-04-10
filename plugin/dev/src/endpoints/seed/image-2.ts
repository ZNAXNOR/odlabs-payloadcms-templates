import type { Media } from '@/payload-types'

import { plainRichText } from './richText'

export const image2: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
alt: 'Dynamic Data Nodes',
  caption: plainRichText('Smart Config: Runtime Meta from Environment Variables.'),
}
