import type { RequiredDataFromCollectionSlug } from 'payload'

import { heading, paragraph, richTextRoot } from './richText'

// Used before the bootstrap seed has written the homepage document.
export const homeStatic: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'home',
  _status: 'published',
  hero: {
    type: 'lowImpact',
    richText: richTextRoot(
      heading('OD LABS plugin template', 'h1'),
      paragraph('Open the admin dashboard to log in, review the plugin cards, and continue shaping the template.'),
    ),
  },
  layout: [],
  meta: {
    description:
      'An OD LABS white-labeled Payload starter for building and previewing a plugin package with a branded website shell.',
    title: 'OD LABS Payload Plugin Template',
  },
  title: 'Home',
}
