# PrepPilot

PrepPilot is a local-first meal-prep, recipe-verification and macro-planning PWA built around Cameron's ingredient-audited recipe library.

## Product roadmap

The canonical roadmap and phase status are maintained in [`docs/ROADMAP.md`](docs/ROADMAP.md). Detailed phase plans live in [`docs/superpowers/plans/`](docs/superpowers/plans/).

Phase 6 establishes the `1.6.0` training, progress and health-integration baseline. Phase 7 quality and maintenance is the remaining continuous roadmap stream.

## Features

- 16 complete five-serving recipes with Australian metric ingredients
- Ingredient-verified batch and per-serving macros
- Serving scaling and training-aware weekly planning
- Exact target tolerance and verified snack-gap assessment
- Pantry-aware shopping, package optimisation, dated AUD prices and waste tracking
- Deterministic recipe authoring, substitutions, culinary validation and version history
- Permanent local-only mode with optional conflict-safe cloud sync
- Guarded AI proposals that are independently recalculated before approval
- Manual activity, weight and recovery tracking
- Source-attributed and duplicate-safe provider imports
- Planner training overlays with explicit day-type confirmation
- Seven-day rolling weight averages and weekly trend classification
- Advisory carbohydrate guidance that never lowers the 160 g protein floor
- Weekly observed-fact and recovery summaries
- Optional official Garmin Activity API gateway behind a feature flag
- Versioned browser persistence, backups and offline PWA operation

## Development

```bash
npm install
npm test
npm run dev
```

Create a production build with:

```bash
npm run build
```

The default build is local-only and uses deterministic/manual fallbacks. Copy `.env.example` only when activating approved external services.

## Deployment

GitHub Actions tests and builds every pull request. Pushes to `main` deploy `dist/` to GitHub Pages.

Published address: `https://camokazii.github.io/PrepPilot/`

Optional cloud sync requires the committed Supabase migration and documented variables. Optional AI requires a secure server gateway. Optional Garmin sync requires Garmin Connect Developer Program approval, an OAuth 2.0 server gateway and:

- `VITE_ENABLE_GARMIN=true`
- `VITE_GARMIN_GATEWAY_URL`

Never expose Supabase service-role credentials, AI provider secrets, Garmin client secrets or OAuth tokens in browser-visible `VITE_` values.

Operational guidance:

- [`docs/RELEASING.md`](docs/RELEASING.md)
- [`docs/PRIVACY_AND_SYNC.md`](docs/PRIVACY_AND_SYNC.md)
- [`docs/HEALTH_AND_GARMIN.md`](docs/HEALTH_AND_GARMIN.md)
- [`docs/RECIPE_AUTHORING.md`](docs/RECIPE_AUTHORING.md)

## Data

All core records are stored locally first. Activities and measurements retain source attribution and import timestamps. Disconnecting an integration can remove imported provider records without deleting manual records. Use **Data tools** for browser backups and the relevant account/integration screen for provider controls.
