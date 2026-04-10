import type { Media, User } from '@/payload-types'
import type { RequiredDataFromCollectionSlug } from 'payload'

import { heading, lexicalBlock, paragraph, richTextRoot } from './richText'

export type PostArgs = {
  author: User
  blockImage: Media
  heroImage: Media
}

export const post1 = ({ author, blockImage, heroImage }: PostArgs): RequiredDataFromCollectionSlug<'posts'> => {
  return {
    slug: 'dashboard-branding-for-your-plugin',
    _status: 'published',
    authors: [author.id],
    content: {
      root: {
        type: 'root',
        children: [
          heading('Turn the admin dashboard into the product demo', 'h2'),
          paragraph(
            'The local website shell now frames the plugin with a branded hero, collection shortcuts, and plugin cards that make package setup easier to understand.',
          ),
          lexicalBlock({
            blockName: 'Why this matters',
            blockType: 'banner',
            content: richTextRoot(
              paragraph(
                'A plugin template should feel finished on first boot. The merged dashboard keeps the blank Payload base useful without burying the plugin itself.',
              ),
            ),
            style: 'info',
          }),
          paragraph(
            'That makes the dev app a better preview environment for screenshots, package testing, and future white-label handoff work.',
          ),
          lexicalBlock({
            blockName: 'Dashboard artwork',
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
        'Use the OD LABS dashboard shell to expose your package health, install actions, and branded admin entry point.',
      image: heroImage.id,
      title: 'Dashboard branding for your plugin',
    },
    relatedPosts: [],
    title: 'Dashboard branding for your plugin',
  }
}
