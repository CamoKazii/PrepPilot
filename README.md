# PrepPilot

PrepPilot is a local-first meal-prep, recipe-verification and macro-planning PWA built around Cameron's ingredient-audited recipe library.

## Product roadmap

The canonical roadmap and phase status are maintained in [`docs/ROADMAP.md`](docs/ROADMAP.md). Detailed phase plans live in [`docs/superpowers/plans/`](docs/superpowers/plans/).

Version `1.7.0` establishes the Phase 7 quality baseline. Accessibility, performance, browser compatibility, security and maintenance now remain continuous release requirements rather than a separate future phase.

## Features

- 16 complete five-serving recipes with Australian metric ingredients
- Ingredient-verified batch and per-serving macros
- Serving scaling and training-aware weekly planning
- Exact target tolerance and verified snack-gap assessment
- Pantry-aware shopping, package optimisation, dated AUD prices and waste tracking
- Deterministic recipe authoring, substitutions, culinary validation and version history
- Permanent local-only mode with optional conflict-safe cloud sync
- Guarded AI proposals independently recalculated before approval
- Manual activity, weight and recovery tracking
- Source-attributed and duplicate-safe provider imports
- Seven-day rolling weight averages and advisory carbohydrate guidance
- Optional official Garmin Activity API gateway behind a feature flag
- Route-level code splitting and enforced production bundle budgets
- Keyboard skip navigation, route focus restoration and reduced-motion support
- Automated desktop/mobile browser flows and axe accessibility scans
- Monthly dependency maintenance through Dependabot
- Versioned browser persistence, backups and offline PWA operation

## Development

```bash
npm install
npm test
npm run dev
```

Create and validate a production build with:

```bash
npm run build
npm run quality:bundle
```

Run the complete local quality gate after installing Playwright Chromium:

```bash
npx playwright install chromium
npm run quality
```

The default build is local-only and uses deterministic/manual fallbacks. Copy `.env.example` only when activating approved external services.

## Deployment

GitHub Actions tests and builds every pull request. The Phase 7 quality workflow additionally runs bundle budgets, accessibility checks and critical desktop/mobile flows. Pushes to `main` deploy `dist/` to GitHub Pages.

Published address: `https://camokazii.github.io/PrepPilot/`

Optional cloud sync requires the committed Supabase migration and documented variables. Optional AI requires a secure server gateway. Optional Garmin sync requires Garmin Connect Developer Program approval and an OAuth 2.0 server gateway.

Never expose Supabase service-role credentials, AI provider secrets, Garmin client secrets or OAuth tokens in browser-visible `VITE_` values.

Operational guidance:

- [`docs/RELEASING.md`](docs/RELEASING.md)
- [`docs/QUALITY_AND_MAINTENANCE.md`](docs/QUALITY_AND_MAINTENANCE.md)
- [`docs/PRIVACY_AND_SYNC.md`](docs/PRIVACY_AND_SYNC.md)
- [`docs/HEALTH_AND_GARMIN.md`](docs/HEALTH_AND_GARMIN.md)
- [`docs/RECIPE_AUTHORING.md`](docs/RECIPE_AUTHORING.md)

## Data

All core records are stored locally first. Activities and measurements retain source attribution and import timestamps. Diagnostics are disabled by default and, when enabled locally, are restricted to coarse application-health metadata. They exclude free-text notes, ingredients, detailed plans, identity details and body measurements.
