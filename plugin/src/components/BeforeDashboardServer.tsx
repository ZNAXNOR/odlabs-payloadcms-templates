import type { Payload } from 'payload'

import { getPluginMeta, resolvePluginMeta } from '../templateMeta.js'
import styles from './BeforeDashboardServer.module.css'

export const BeforeDashboardServer = async (props: { payload: Payload; user?: any }) => {
  const { payload } = props
  const meta = getPluginMeta(payload.config) || resolvePluginMeta()
  const [pluginCollectionCount] = await Promise.all([
    payload.count({ collection: 'plugin-collection' }),
  ])

  const metaRows = [
    { label: 'Version', value: meta.version },
    { label: 'License', value: meta.license },
    { label: 'Published', value: meta.publishedAt || 'Not configured' },
    { label: 'Plugin docs', value: String(pluginCollectionCount.totalDocs) },
  ]

  return (
    <section className={styles.card}>
      <div className={styles.cardHeader}>
        <p className={styles.eyebrow}>Plugin summary</p>
        <h2 className={styles.cardTitle}>Runtime metadata</h2>
      </div>

      <p className={styles.cardDescription}>
        The plugin package exposes its own admin cards, endpoint, and schema additions while this
        local app provides the branded OD LABS shell around them.
      </p>

      <dl className={styles.metaGrid}>
        {metaRows.map((row) => (
          <div key={row.label}>
            <dt className={styles.metaLabel}>{row.label}</dt>
            <dd className={styles.metaValue}>{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
