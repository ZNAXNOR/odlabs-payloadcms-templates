import type { Media } from '@/payload-types'
import type { RequiredDataFromCollectionSlug } from 'payload'

import { heading, paragraph, richTextRoot } from './richText'

type HomeArgs = {
  heroImage: Media
  metaImage: Media
}

export const home = ({ heroImage, metaImage }: HomeArgs): RequiredDataFromCollectionSlug<'pages'> => {
  return {
    slug: 'home',
    _status: 'published',
    hero: {
      type: 'highImpact',
      links: [
        {
          link: {
            type: 'custom',
            appearance: 'default',
            label: 'Open admin',
            url: '/admin',
          },
        },
        {
          link: {
            type: 'custom',
            appearance: 'outline',
            label: 'Browse posts',
            url: '/posts',
          },
        },
      ],
      media: heroImage.id,
      richText: richTextRoot(
        heading('OD LABS plugin template', 'h1'),
        paragraph(
          'A white-labeled Payload website shell that showcases your plugin, keeps starter content lean, and stays ready for npm packaging.',
        ),
      ) as any,
    },
    layout: [
      {
        blockName: 'Template highlights',
        blockType: 'content',
        columns: [
          {
            enableLink: false,
            richText: richTextRoot(heading('What ships in the box', 'h2')) as any,
            size: 'full',
          },
          {
            enableLink: false,
            richText: richTextRoot(
              heading('Plugin-ready dashboard', 'h3'),
              paragraph(
                'The admin dashboard merges the donor website shell with cards for repo, npm install, package metadata, and endpoint health.',
              ),
            ) as any,
            size: 'oneThird',
          },
          {
            enableLink: false,
            richText: richTextRoot(
              heading('SQLite by default', 'h3'),
              paragraph(
                'The local dev app boots with SQLite and auto-seeds a user, header, footer, homepage, and one branded media asset.',
              ),
            ) as any,
            size: 'oneThird',
          },
          {
            enableLink: false,
            richText: richTextRoot(
              heading('Optional sample posts', 'h3'),
              paragraph(
                'The template stays mostly blank until you explicitly enable the sample post route and dashboard controls with env flags.',
              ),
            ) as any,
            size: 'oneThird',
          },
        ],
      },
      {
        blockName: 'Template artwork',
        blockType: 'mediaBlock',
        media: metaImage.id,
      },
      {
        blockName: 'Latest sample posts',
        blockType: 'archive',
        introContent: richTextRoot(
          heading('Latest sample posts', 'h3'),
          paragraph(
            'If you enable sample seeding, this archive block immediately surfaces the seeded posts without adding extra collections or plugins.',
          ),
        ) as any,
        populateBy: 'collection',
        relationTo: 'posts',
      },
      {
        blockName: 'Publish checklist',
        blockType: 'cta',
        links: [
          {
            link: {
              type: 'custom',
              appearance: 'default',
              label: 'Review plugin setup',
              url: '/admin',
            },
          },
        ],
        richText: richTextRoot(
          heading('Swap in your package name and repo URL', 'h3'),
          paragraph(
            'Use the env-driven plugin metadata for runtime previews, then replace the placeholder package metadata before publishing your package draft.',
          ),
        ) as any,
      },
    ],
    meta: {
      description:
        'An OD LABS white-labeled Payload website template for building and previewing a plugin package with a branded admin experience.',
      image: metaImage.id,
      title: 'OD LABS Payload Plugin Template',
    },
    title: 'Home',
  }
}


