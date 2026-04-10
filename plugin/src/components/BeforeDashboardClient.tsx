'use client'

import { useConfig } from '@payloadcms/ui'
import { formatAdminURL } from 'payload/shared'
import { useEffect, useMemo, useState } from 'react'

import type { DashboardHealthResponse } from '../templateMeta.js'

import styles from './BeforeDashboardServer.module.css'

export const BeforeDashboardClient = () => {
  const { config } = useConfig()

  const [copied, setCopied] = useState(false)
  const [error, setError] = useState('')
  const [health, setHealth] = useState<DashboardHealthResponse | null>(null)

  useEffect(() => {
    const fetchDashboardHealth = async () => {
      try {
        const response = await fetch(
          formatAdminURL({
            apiRoute: config.routes.api,
            path: '/my-plugin-endpoint',
          }),
        )

        if (!response.ok) {
          throw new Error('Dashboard status could not be loaded.')
        }

        const result = (await response.json()) as DashboardHealthResponse
        setHealth(result)
      } catch (caughtError) {
        const message = caughtError instanceof Error ? caughtError.message : 'Unknown error.'
        setError(message)
      }
    }

    void fetchDashboardHealth()
  }, [config.serverURL, config.routes.api])

  const installCommand = health?.meta.installCommand
  const statusText = useMemo(() => {
    if (error) {
      return error
    }

    if (!health) {
      return 'Loading plugin dashboard status...'
    }

    return `Endpoint healthy. Plugin collection has ${health.collections.pluginCollection} record(s).`
  }, [error, health])

  const copyInstallCommand = async () => {
    if (!installCommand) {
      return
    }

    try {
      await navigator.clipboard.writeText(installCommand)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setError('Install command could not be copied.')
    }
  }

  return (
    <section className={styles.card}>
      <div className={styles.cardHeader}>
        <p className={styles.eyebrow}>Plugin actions</p>
        <h2 className={styles.cardTitle}>Package and distribution</h2>
      </div>

      <p className={styles.cardDescription}>{statusText}</p>

      <div className={styles.buttonRow}>
        {health?.meta.repositoryURL ? (
          <a
            className={styles.linkButton}
            href={health.meta.repositoryURL}
            rel="noreferrer"
            target="_blank"
          >
            View Git Repo
          </a>
        ) : null}

        {health?.meta.npmURL ? (
          <a className={styles.linkButton} href={health.meta.npmURL} rel="noreferrer" target="_blank">
            View on npm
          </a>
        ) : null}

        {installCommand ? (
          <button className={styles.actionButton} onClick={copyInstallCommand} type="button">
            {copied ? 'Copied install command' : 'Copy install command'}
          </button>
        ) : null}
      </div>

      <dl className={styles.metaGrid}>
        <div>
          <dt className={styles.metaLabel}>Brand</dt>
          <dd className={styles.metaValue}>{health?.meta.brandName || 'OD LABS'}</dd>
        </div>
        <div>
          <dt className={styles.metaLabel}>Package</dt>
          <dd className={styles.metaValue}>{health?.meta.packageName || 'Not configured'}</dd>
        </div>
      </dl>
    </section>
  )
}
