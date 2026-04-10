# OD LABS Payload Plugin Template

OD LABS white-labeled starter for building a Payload plugin and previewing it inside a branded Payload website shell.

This template keeps the official website experience inside `dev/`, trims out the donor plugins, and leaves you with a publish-ready plugin package plus a practical local app for screenshots, testing, and iteration.

## What ships here

- SQLite-based local dev app in `dev/`
- Branded dashboard shell with plugin summary and package action cards
- Optional runtime metadata for brand name, npm package name, repo URL, and published date
- Bootstrap seed for one admin user, header, footer, homepage, and branded media
- Optional sample post seed route that stays hidden and disabled by default
- Root package build, export, lint, and test workflow for npm publishing

## Quick start

1. Copy `dev/.env.example` to `dev/.env`.
2. Install dependencies with `pnpm install`.
3. Start the dev app with `pnpm dev`.
4. Open `http://localhost:3000/admin` and log in with:
   - Email: `dev@payloadcms.com`
   - Password: `test`

The dev app uses SQLite by default with `DATABASE_URL=file:./dev.db`.

## Runtime metadata

The local dashboard cards are driven by env variables so the branded preview can stay flexible even when `package.json` cannot.

```env
PLUGIN_BRAND_NAME=OD LABS
PLUGIN_PACKAGE_NAME=@your-scope/your-plugin
PLUGIN_REPOSITORY_URL=https://github.com/your-org/your-plugin
PLUGIN_PUBLISHED_AT=2026-04-06
```

If `PLUGIN_REPOSITORY_URL` is blank, the repo button is hidden.
If `PLUGIN_PACKAGE_NAME` is blank, the npm link and install-copy button stay hidden.

## Plugin usage

Register the plugin in your Payload config:

```ts
import { plugin } from 'odlabs-payload-plugin-template'

export default buildConfig({
  plugins: [
    plugin({
      collections: {
        posts: true,
      },
      dashboard: {
        injectIntoAdmin: true,
      },
      meta: {
        brandName: process.env.PLUGIN_BRAND_NAME,
        packageName: process.env.PLUGIN_PACKAGE_NAME,
        repositoryURL: process.env.PLUGIN_REPOSITORY_URL,
        publishedAt: process.env.PLUGIN_PUBLISHED_AT,
      },
    }),
  ],
})
```

`dashboard.injectIntoAdmin` defaults to `true`. The local `dev/` app turns it off and renders the merged branded dashboard shell itself so the cards do not appear twice.

## Seed behavior

Two seed layers are included:

- Bootstrap seed on init: user, header, footer, homepage, branded media
- Optional sample seed route: three posts plus supporting media

Bootstrap seeding is idempotent and only fills in missing starter content.

Optional sample seeding is controlled by env flags:

```env
ENABLE_SAMPLE_POST_SEED=false
ENABLE_SAMPLE_POST_SEED_UI=false
```

- `ENABLE_SAMPLE_POST_SEED=true` enables the `/next/seed` route.
- `ENABLE_SAMPLE_POST_SEED_UI=true` shows the dashboard control.

By default the dashboard button is hidden and the route is blocked.

## Useful commands

- `pnpm dev` starts the Next.js dev app in `dev/`
- `pnpm generate:types` regenerates `dev/payload-types.ts`
- `pnpm generate:importmap` regenerates `dev/src/app/(payload)/admin/importMap.js`
- `pnpm test:int` runs the integration tests
- `pnpm test:e2e` runs the Playwright coverage
- `pnpm build` builds the plugin package into `dist/`

## Package publishing notes

This repo keeps placeholder package metadata in `package.json` for a template draft. Before publishing, replace at minimum:

- `name`
- `repository`
- `bugs`
- `homepage`
- `description`
- `version`

If you rename the package, also update the self-imports in:

- `dev/payload.config.ts`
- `dev/src/components/BeforeDashboard/index.tsx`
- `dev/tsconfig.json`

## Testing expectations

The integration suite covers plugin field injection, plugin collection bootstrapping, the structured endpoint response, bootstrap seed idempotency, and optional sample post seeding.

The Playwright suite logs in with the seeded credentials and verifies the merged branded dashboard, hidden optional seed UI, and conditional repo/npm actions.

## License

MIT. See [LICENSE](./LICENSE).
