import type { Post } from '@/payload-types'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { Card } from '@/components/Card'
import RichText from '@/components/RichText'
import clsx from 'clsx'
import React from 'react'


export type RelatedPostsProps = {
  className?: string
  docs?: Post[]
  introContent?: DefaultTypedEditorState
}

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={clsx('lg:container', className)}>
      {introContent ? <RichText data={introContent} enableGutter={false} /> : null}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-stretch">
        {Array.isArray(docs) && docs.length > 0 ? (
          docs.map((doc, index) => {
            if (typeof doc === 'string') {
              return null
            }

            return <Card doc={doc} key={index} relationTo="posts" />
          })
        ) : null}
      </div>
    </div>
  )
}


