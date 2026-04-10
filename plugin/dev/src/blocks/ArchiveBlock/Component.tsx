import type { ArchiveBlock as ArchiveBlockProps, Post } from '@/payload-types'

import { CollectionArchive } from '@/components/CollectionArchive'
import RichText from '@/components/RichText'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

export const ArchiveBlock: React.FC<
  {
    id?: string
  } & ArchiveBlockProps
> = async (props) => {

  const { id, introContent, limit: limitFromProps, populateBy, selectedDocs } = props

  const limit = limitFromProps || 3

  let posts: Post[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const fetchedPosts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit,
    })

    posts = fetchedPosts.docs
  } else if (selectedDocs?.length) {
    posts = selectedDocs
      .map((post) => {
        if (typeof post.value === 'object') {
          return post.value
        }

        return null
      })
      .filter(Boolean) as Post[]
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-3xl" data={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive posts={posts} />
    </div>
  )
}
