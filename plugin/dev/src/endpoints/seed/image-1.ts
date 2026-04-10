import type { Media } from '@/payload-types'

import { plainRichText } from './richText'

export const image1: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'The Branded Packages',
  caption: plainRichText('Customize Your Admin: Branded Dashboard Shell.'),
}
