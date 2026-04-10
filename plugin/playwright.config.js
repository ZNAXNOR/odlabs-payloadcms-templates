import { defineConfig, devices } from '@playwright/test'

const webServerEnv = {
  ...process.env,
  DATABASE_URL: 'file:./dev/playwright-template.sqlite',
  ENABLE_SAMPLE_POST_SEED: 'false',
  ENABLE_SAMPLE_POST_SEED_UI: 'false',
  NEXT_PUBLIC_SERVER_URL: 'http://localhost:3000',
  PAYLOAD_SECRET: process.env.PAYLOAD_SECRET || 'odlabs-playwright-secret',
  PLUGIN_PACKAGE_NAME: '',
  PLUGIN_PUBLISHED_AT: '',
  PLUGIN_REPOSITORY_URL: '',
}

export default defineConfig({
  testDir: './dev',
  testMatch: '**/e2e.spec.{ts,js}',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'pnpm dev',
    env: webServerEnv,
    reuseExistingServer: false,
    timeout: 120000,
    url: 'http://localhost:3000/admin',
  },
})
