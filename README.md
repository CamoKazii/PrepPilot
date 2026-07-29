# PrepPilot

PrepPilot is a local-first meal-prep, recipe-verification and macro-planning PWA built around Cameron's ingredient-audited recipe library.

## Product roadmap

The canonical roadmap, phase status and long-term architecture are maintained in [`docs/ROADMAP.md`](docs/ROADMAP.md).

Detailed phase implementation plans live in [`docs/superpowers/plans/`](docs/superpowers/plans/), and the master architecture specification is in [`docs/superpowers/specs/2026-07-28-preppilot-master-roadmap-design.md`](docs/superpowers/specs/2026-07-28-preppilot-master-roadmap-design.md).

Phase 4 establishes the `1.4.0` optional-account and conflict-safe sync baseline. The next product milestone is Phase 5: AI meal planning and deterministic nutrition auditing.

Any pull request that changes product scope, sequencing or phase status should update the roadmap in the same change.

## Features

- 16 complete five-serving recipes with Australian metric ingredients
- Ingredient-verified batch and per-serving macros
- Serving scaling and training-aware weekly planning
- Exact target tolerance and verified snack-gap assessment
- Planner-to-shopping workflow with consolidated quantities
- Pantry inventory, expiry guidance and transparent stock deductions
- Package-size optimisation, dated AUD prices and waste tracking
- Normalized ingredient catalogue with brand, state and nutrition basis
- Deterministic bottom-up macro calculator and audit table
- Custom recipe draft, culinary review and publication lifecycle
- Substitution audit trail with automatic verification invalidation
- High-protein baking and baking-vessel feasibility checks
- Recipe cloning, structured import, version history and rollback
- Permanent local-only mode without authentication or network access
- Optional passwordless account sync through a feature-flagged Supabase adapter
- Versioned records, tombstones and an idempotent offline mutation queue
- Conflict-safe two-way sync with preserved local and cloud versions
- Full account export/import preview, consent history and cloud-account deletion
- Versioned browser persistence with legacy-data migration and quarantine
- Install, update and offline PWA status messaging
- Application error recovery and actionable empty states

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

The default build is local-only. Copy `.env.example` and supply the optional cloud variables only after applying the committed Supabase migration.

## Deployment

The GitHub Actions workflow tests and builds every pull request. Pushes to `main` deploy `dist/` to GitHub Pages. In repository settings, set **Pages → Source** to **GitHub Actions**.

The published address is:

`https://camokazii.github.io/PrepPilot/`

To activate cloud sync, create the Supabase project, apply `supabase/migrations/20260729_phase4.sql`, configure the approved redirect URL and define these GitHub repository variables:

- `VITE_ENABLE_CLOUD_SYNC=true`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Never expose a Supabase service-role key in a `VITE_` variable or browser build.

The release, smoke-test, rollback and data-recovery procedure is maintained in [`docs/RELEASING.md`](docs/RELEASING.md). Privacy and provider guidance is in [`docs/PRIVACY_AND_SYNC.md`](docs/PRIVACY_AND_SYNC.md), with the threat review in [`docs/SECURITY_REVIEW_PHASE4.md`](docs/SECURITY_REVIEW_PHASE4.md).

Recipe authoring and verification rules are documented in [`docs/RECIPE_AUTHORING.md`](docs/RECIPE_AUTHORING.md).

## Data

All core records are stored locally first. Without account configuration or sign-in, they remain private to the current browser profile and continue working offline.

With cloud sync enabled, user-owned records are copied to a user-scoped Supabase database protected by row-level security. Overlapping edits preserve both versions for an explicit choice rather than using last-write-wins.

Use **Data tools** for a browser backup and **Account & sync** for the complete account export, import preview, consent history, integration disconnect and cloud-account deletion controls.
