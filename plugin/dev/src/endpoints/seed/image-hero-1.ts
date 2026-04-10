import type { Media } from '@/payload-types'

import { plainRichText } from './richText'

export const imageHero1: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'Futuristic waves of glowing energy',
  caption: plainRichText('Branded starter artwork used for the OD LABS homepage seed.'),
}
