import type { Media } from '@/payload-types'

import { plainRichText } from './richText'

export const image5: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Seed Dashboard',
  caption: plainRichText('Seed Panel in Admin Dashboard.'),
}
