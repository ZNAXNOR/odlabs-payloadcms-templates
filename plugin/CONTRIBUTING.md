# Contributing

## Local development

1. Copy `dev/.env.example` to `dev/.env`.
2. Install dependencies with `pnpm install`.
3. Start the template with `pnpm dev`.
4. Sign in at `http://localhost:3000/admin` with `dev@payloadcms.com` / `test`.

The local app uses SQLite by default, so no extra database service is required.

## Working conventions

- Keep `website/` as donor reference only. Make implementation changes inside `plugin/`.
- Treat `dev/` as the branded preview app for the plugin package, not as a second independent product.
- Keep sample content lean. Bootstrap seed should stay minimal and idempotent.
- New sample content must remain optional behind the existing env flags.
- Do not reintroduce the removed donor plugins unless that is a deliberate template feature.

## Regenerating generated files

Run these after schema or admin component changes:

- `pnpm generate:types`
- `pnpm generate:importmap`

## Tests

Run the full suite before opening a release or publish PR:

- `pnpm test:int`
- `pnpm test:e2e`
- `pnpm lint`

## Publish checklist

Before publishing a package draft, update:

- `package.json` package metadata
- self-import package name references inside `dev/`
- runtime metadata env values used by the dashboard preview
- README installation and usage examples

## Pull requests

Please keep pull requests focused and include:

- a short summary of user-facing changes
- any env or migration implications
- test coverage notes
- screenshots when dashboard or frontend visuals changed
