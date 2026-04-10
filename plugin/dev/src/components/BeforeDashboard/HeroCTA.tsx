import type { Payload } from 'payload'

import { FilePlus, ImagePlus, LayoutDashboard } from 'lucide-react'
import React from 'react'

export const HeroCTA = async ({ payload }: { payload: Payload }) => {
  const { totalDocs: postsCount } = await payload.find({ collection: 'posts', limit: 0 })
  const { totalDocs: pagesCount } = await payload.find({ collection: 'pages', limit: 0 })
  const { totalDocs: mediaCount } = await payload.find({ collection: 'media', limit: 0 })

  return (
    <div className="hero-cta">
      <a aria-label="View Posts" className="cta-button" href="/admin/collections/posts">
        <span className="cta-inner">
          <span className="cta-label">
            <FilePlus size={16} /> {postsCount} Posts
          </span>

          <span className="cta-label-hover">
            <FilePlus size={16} /> Create Post
          </span>
        </span>
      </a>

      <a aria-label="View Pages" className="cta-button" href="/admin/collections/pages">
        <span className="cta-inner">
          <span className="cta-label">
            <LayoutDashboard size={16} /> {pagesCount} Pages
          </span>

          <span className="cta-label-hover">
            <LayoutDashboard size={16} /> Create Page
          </span>
        </span>
      </a>

      <a aria-label="Upload Media" className="cta-button" href="/admin/collections/media">
        <span className="cta-inner">
          <span className="cta-label">
            <ImagePlus size={16} /> {mediaCount} Media
          </span>

          <span className="cta-label-hover">
            <ImagePlus size={16} /> Upload Media
          </span>
        </span>
      </a>
    </div>
  )
}
