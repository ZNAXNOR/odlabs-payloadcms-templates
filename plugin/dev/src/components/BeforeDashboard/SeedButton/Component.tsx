import { isFlagEnabled } from '@/utilities/env'
import { SquareArrowOutUpRight } from 'lucide-react'
import React from 'react'

import { SeedButton } from './index'

export const SeedButtonInstructions: React.FC = () => {
  const showSeedControls = isFlagEnabled(process.env.ENABLE_SAMPLE_POST_SEED_UI)
  const sampleSeedEnabled = isFlagEnabled(process.env.ENABLE_SAMPLE_POST_SEED)

  if (!showSeedControls) {
    return null
  }

  return (
    <div className="seed-instructions">
      <div className="seed-content">
        <p className="seed-title">Optional sample content</p>

        <ul className="seed-list">
          <li>
            <SeedButton enabled={sampleSeedEnabled} /> to add the three OD LABS sample posts, then{' '}
            <a href="/posts" rel="noopener noreferrer" target="_blank">
              browse the posts archive
              <SquareArrowOutUpRight height={16} width={16} />
            </a>
            .
          </li>
        </ul>

        <div className="seed-footer">
          <p>
            Toggle `ENABLE_SAMPLE_POST_SEED_UI` to show this card and `ENABLE_SAMPLE_POST_SEED` to
            allow the route itself.
          </p>
        </div>
      </div>
    </div>
  )
}
