import type { Media } from '@/payload-types'

import { plainRichText } from './richText'

export const image3: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
alt: 'The Sprouting Seed',
  caption: plainRichText('Lean Start: Opt-In for Example Data'),
}
