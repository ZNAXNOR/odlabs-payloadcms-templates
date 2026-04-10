import type { Media } from '@/payload-types'

import { plainRichText } from './richText'

export const image4: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Admin Dashboard',
  caption: plainRichText('OD LABS Plugin Template Admin Dashboard.'),
}
