import { expect, test } from '@playwright/test'

import { devUser } from './helpers/credentials.js'

test('renders the branded dashboard shell with conditional plugin actions hidden by default', async ({ page }) => {
  await page.goto('/admin')

  await page.fill('#field-email', devUser.email)
  await page.fill('#field-password', devUser.password)
  await page.locator('.form-submit button').click()

  await expect(page).toHaveTitle(/Dashboard/i)
  await expect(page.getByText('Runtime metadata')).toBeVisible()
  await expect(page.getByText('Package and distribution')).toBeVisible()
  await expect(page.getByText('Welcome back')).toBeVisible()
  await expect(page.locator('.graphic-icon')).toBeVisible()

  await expect(page.getByRole('link', { name: 'View Git Repo' })).toHaveCount(0)
  await expect(page.getByRole('link', { name: 'View on npm' })).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Copy install command' })).toHaveCount(0)
  await expect(page.getByText('Optional sample content')).toHaveCount(0)
})
