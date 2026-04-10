import type { Media, User } from '@/payload-types'
import type { RequiredDataFromCollectionSlug } from 'payload'

import { heading, lexicalBlock, paragraph, richTextRoot } from './richText'

export type PostArgs = {
  author: User
  blockImage: Media
  heroImage: Media
}

export const post3 = ({ author, blockImage, heroImage }: PostArgs): RequiredDataFromCollectionSlug<'posts'> => {
  return {
    slug: 'optional-sample-seeding',
    _status: 'published',
    authors: [author.id],
    content: {
      root: {
        type: 'root',
        children: [
          heading('Seed only what helps', 'h2'),
          paragraph(
            'The template auto-seeds only the essentials on boot: a user, navigation globals, one homepage, and one branded media asset.',
          ),
          lexicalBlock({
            blockName: 'Sample route toggle',
            blockType: 'banner',
            content: richTextRoot(
              paragraph(
                'The sample post route stays hidden and disabled until you opt in with environment flags, so teams can start from a cleaner baseline.',
              ),
            ),
            style: 'success',
          }),
          lexicalBlock({
            blockName: 'Seed toggle example',
            blockType: 'code',
            code: [
              'ENABLE_SAMPLE_POST_SEED=true',
              'ENABLE_SAMPLE_POST_SEED_UI=true',
            ].join('\n'),
            language: 'typescript',
          }),
          lexicalBlock({
            blockName: 'Seed artwork',
            blockType: 'mediaBlock',
            media: blockImage.id,
          }),
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    heroImage: heroImage.id,
    meta: {
      description:
        'Ship the template lean by default and let teams opt into example posts only when they want dashboard content to explore.',
      image: heroImage.id,
      title: 'Optional sample seeding',
    },
    relatedPosts: [],
    title: 'Optional sample seeding',
  }
}

