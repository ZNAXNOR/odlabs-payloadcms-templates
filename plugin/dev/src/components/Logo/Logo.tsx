import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'eager' | 'lazy'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { className, loading: loadingFromProps, priority: priorityFromProps } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    <img
      alt="OD LABS Logo"
      className={clsx('max-w-37.5 w-full h-[34px]', className)}
      decoding="async"
      fetchPriority={priority}
      height={34}
      loading={loading}
      src="/assets/odlabs-logo.svg"
      width={193}
    />
  )
}


