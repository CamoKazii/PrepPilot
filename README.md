# PrepPilot

PrepPilot is a local-first meal-prep and macro-planning PWA built around Cameron's ingredient-audited recipe library.

## Product roadmap

The canonical roadmap, phase status and long-term architecture are maintained in [`docs/ROADMAP.md`](docs/ROADMAP.md).

Detailed phase implementation plans live in [`docs/superpowers/plans/`](docs/superpowers/plans/), and the master architecture specification is in [`docs/superpowers/specs/2026-07-28-preppilot-master-roadmap-design.md`](docs/superpowers/specs/2026-07-28-preppilot-master-roadmap-design.md).

Phase 2 establishes the `1.2.0` recipe-engine baseline. The next product milestone is Phase 3: pantry, advanced shopping and AUD cost tracking.

Any pull request that changes product scope, sequencing or phase status should update the roadmap in the same change.

## Features

- 16 complete five-serving recipes with Australian metric ingredients
- Ingredient-verified batch and per-serving macros
- Serving scaling and training-aware weekly planning
- Exact target tolerance and verified snack-gap assessment
- Planner-to-shopping workflow with consolidated quantities
- Recipe favourites and personal notes
- Normalized ingredient catalogue with brand, state and nutrition basis
- Deterministic bottom-up macro calculator and audit table
- Custom recipe draft, culinary review and publication lifecycle
- Substitution audit trail with automatic verification invalidation
- High-protein baking and baking-vessel feasibility checks
- Recipe cloning, structured import, version history and rollback
- Versioned browser persistence with legacy-data migration and quarantine
- JSON data export, validation and restore with safety backup
- Install, update and offline PWA status messaging
- Application error recovery and actionable empty states
- Offline-capable installable PWA

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

## Deployment

The GitHub Actions workflow tests and builds every pull request. Pushes to `main` deploy `dist/` to GitHub Pages. In repository settings, set **Pages → Source** to **GitHub Actions**.

The published address is:

`https://camokazii.github.io/PrepPilot/`

The release, smoke-test, rollback and data-recovery procedure is maintained in [`docs/RELEASING.md`](docs/RELEASING.md).

Recipe authoring and verification rules are documented in [`docs/RECIPE_AUTHORING.md`](docs/RECIPE_AUTHORING.md).

## Data

Planner selections, shopping state, favourites, recipe notes and custom recipe versions are stored in versioned browser records. They remain private to the device and browser profile and do not currently sync between devices.

Use **Data tools** inside the app to download a portable JSON backup before clearing browser data or moving devices.
