import type { User } from '@/payload-types'
import type { Payload } from 'payload'

import Image from 'next/image'
import { BeforeDashboardClient } from 'odlabs-payload-plugin-template/client'
import { BeforeDashboardServer } from 'odlabs-payload-plugin-template/rsc'
import React from 'react'

import './index.scss'
import { HeroCTA } from './HeroCTA'
import { SeedButtonInstructions } from './SeedButton/Component'




const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC<{ payload: Payload; user: User }> = ({ payload, user }) => {
  const displayName = user?.name || user?.email

  return (
    <div className={baseClass}>
      <div className="hero-background">
        <Image
          alt="Dashboard Background"
          className="hero-image"
          fill
          priority
          sizes="100vw"
          src="/admin/hero-image.webp"
        />
        <div className="hero-overlay" />
      </div>

      <div className="hero-container">
        <h1 className="hero-title">
          Welcome back,
          <span className="user-name-gradient">{displayName}</span>
        </h1>

        <SeedButtonInstructions />

        <HeroCTA payload={payload} />

        <div className="dashboard-plugin-panels">
          <div className="dashboard-plugin-panel">
            <BeforeDashboardServer payload={payload} user={user} />
          </div>
          <div className="dashboard-plugin-panel">
            <BeforeDashboardClient />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BeforeDashboard


