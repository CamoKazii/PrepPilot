# PrepPilot

PrepPilot is a local-first meal-prep and macro-planning PWA built around Cameron's ingredient-audited recipe library.

## Product roadmap

The canonical roadmap, phase status and long-term architecture are maintained in [`docs/ROADMAP.md`](docs/ROADMAP.md).

Detailed phase implementation plans live in [`docs/superpowers/plans/`](docs/superpowers/plans/), and the master architecture specification is in [`docs/superpowers/specs/2026-07-28-preppilot-master-roadmap-design.md`](docs/superpowers/specs/2026-07-28-preppilot-master-roadmap-design.md).

Any pull request that changes product scope, sequencing or phase status should update the roadmap in the same change.

## Features

- 16 complete five-serving recipes with Australian metric ingredients
- Ingredient-verified batch and per-serving macros
- Seven-day breakfast, lunch and dinner planner
- Complete-day macro averages against current targets
- Planner-to-shopping workflow
- Consolidated compatible metric quantities
- Supermarket-section grouping and persistent check state
- Recipe favourites and personal notes
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

## Data

Planner selections, shopping state, favourites and recipe notes are stored in the browser's localStorage. They remain private to the device and browser profile and do not currently sync between devices.
