import type { Media, User } from '@/payload-types'
import type { RequiredDataFromCollectionSlug } from 'payload'

import { heading, lexicalBlock, paragraph } from './richText'

export type PostArgs = {
  author: User
  blockImage: Media
  heroImage: Media
}

export const post2 = ({ author, blockImage, heroImage }: PostArgs): RequiredDataFromCollectionSlug<'posts'> => {
  return {
    slug: 'runtime-plugin-metadata-with-env',
    _status: 'published',
    authors: [author.id],
    content: {
      root: {
        type: 'root',
        children: [
          heading('Keep template identity flexible', 'h2'),
          paragraph(
            'The dashboard now derives brand, package name, repository URL, npm page, install command, version, and license from a small runtime metadata layer.',
          ),
          lexicalBlock({
            blockName: 'Metadata example',
            blockType: 'code',
            code: [
              'PLUGIN_BRAND_NAME=OD LABS',
              'PLUGIN_PACKAGE_NAME=@your-scope/your-plugin',
              'PLUGIN_REPOSITORY_URL=https://github.com/your-org/your-plugin',
              'PLUGIN_PUBLISHED_AT=2026-04-06',
            ].join('\n'),
            language: 'typescript',
          }),
          paragraph(
            'That keeps the runtime preview flexible while still letting package.json stay a publishable template draft instead of pretending it can be env-driven at publish time.',
          ),
          lexicalBlock({
            blockName: 'Metadata artwork',
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
        'Keep the template flexible by driving the dashboard repo, package, and published date metadata from environment variables.',
      image: heroImage.id,
      title: 'Runtime plugin metadata with env',
    },
    relatedPosts: [],
    title: 'Runtime plugin metadata with env',
  }
}

