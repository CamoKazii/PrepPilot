# PrepPilot v0.1 Design

## Goal
Deliver a mobile-first, local-first meal-prep PWA that makes Cameron's audited recipes usable for weekly planning, macro review and grocery preparation.

## Scope
- Dashboard with current nutrition targets and planning status
- Searchable 16-recipe catalogue
- Full structured recipe pages for B1, B2 and B3
- Seven-day breakfast/lunch/dinner planner with live macro totals
- Device-local shopping selections and checkable ingredient list
- Responsive dark UI
- Offline service worker and installable manifest
- GitHub Actions build and Pages deployment

## Architecture
A small React/Vite single-page application using hash routing so it works beneath the `/PrepPilot/` GitHub Pages path. Recipe content is structured JavaScript data. Planner and shopping state are stored in localStorage. No account, backend or remote sync is included in v0.1.

## Data integrity
Only source-library macros labelled ingredient-verified are displayed as such. Recipes without migrated ingredient bodies remain visibly marked as structured-import pending rather than presenting invented detail.

## Error handling
Unknown routes and recipe slugs show a safe not-found state. Corrupt localStorage falls back to empty planner and shopping data. Service-worker registration failures do not block the app.

## Testing and release
Every pull request runs `npm install` and `npm run build`. Pushes to `main` additionally publish `dist/` through GitHub Pages.
