type RichTextChild = {
  [k: string]: unknown
  type: string
  version: number
}

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4'


const textNode = (text: string, format = 0): RichTextChild => ({
  type: 'text',
  detail: 0,
  format,
  mode: 'normal',
  style: '',
  text,
  version: 1,
})

export const heading = (text: string, tag: HeadingTag = 'h2'): RichTextChild => ({
  type: 'heading',
  children: [textNode(text)],
  direction: 'ltr',
  format: '' as const,
  indent: 0,
  tag,
  version: 1,
})

export const paragraph = (text: string): RichTextChild => ({
  type: 'paragraph',
  children: [textNode(text)],
  direction: 'ltr',
  format: '' as const,
  indent: 0,
  textFormat: 0,
  version: 1,
})

export const richTextRoot = (...children: RichTextChild[]) => ({
  root: {
    type: 'root',
    children,
    direction: 'ltr' as 'ltr' | 'rtl' | null,
    format: '' as const,
    indent: 0,
    version: 1,
  },
})

export const plainRichText = (text: string) => richTextRoot(paragraph(text))

export const lexicalBlock = (fields: Record<string, unknown>) => ({
  type: 'block',
  fields,
  format: '' as const,
  version: 2,
})



