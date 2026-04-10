'use client'

import { toast } from '@payloadcms/ui'
import { Sprout } from 'lucide-react'
import React, { useCallback, useState } from 'react'

import './index.scss'

const SuccessMessage: React.FC = () => (
  <div className="seed-success-msg">
    Sample posts are ready. You can now{' '}
    <a href="/posts" rel="noopener noreferrer" target="_blank">
      view the posts archive
    </a>
  </div>
)

export const SeedButton: React.FC<{ enabled: boolean }> = ({ enabled }) => {
  const [loading, setLoading] = useState(false)
  const [seeded, setSeeded] = useState(false)
  const [error, setError] = useState<null | string>(null)

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault()

      if (!enabled) {
        toast.info('Sample post seeding is disabled for this template.')
        return
      }
      if (seeded) {
        toast.info('Sample posts already seeded.')
        return
      }
      if (loading) {
        toast.info('Seeding already in progress.')
        return
      }
      if (error) {
        toast.error('An error occurred. Please refresh and try again.')
        return
      }

      setLoading(true)

      const seedPromise = (async () => {
        try {
          const res = await fetch('/next/seed', { credentials: 'include', method: 'POST' })
          if (res.ok) {
            setSeeded(true)
            return true
          }

          const message = await res.text()
          throw new Error(message || 'An error occurred while seeding sample posts.')
        } catch (caughtError) {
          const message = caughtError instanceof Error ? caughtError.message : String(caughtError)
          setError(message)
          throw caughtError
        } finally {
          setLoading(false)
        }
      })()

      toast.promise(seedPromise, {
        error: (caughtError) =>
          caughtError?.message || 'An error occurred while seeding sample posts.',
        loading: 'Adding sample posts...',
        success: <SuccessMessage />,
      })
    },
    [enabled, error, loading, seeded],
  )

  let statusText = ''
  if (!enabled) {
    statusText = ' (route disabled)'
  }
  if (loading) {
    statusText = ' (seeding...)'
  }
  if (seeded) {
    statusText = ' (done!)'
  }
  if (error) {
    statusText = ` (error: ${error})`
  }

  return (
    <span className="seed-button-wrapper">
      <button
        className="seedButton"
        disabled={!enabled || loading || seeded}
        onClick={handleClick}
        type="button"
      >
        <Sprout height={16} width={16} />
        Seed Sample Posts
      </button>
      {statusText && <span className="seed-status">{statusText}</span>}
    </span>
  )
}
