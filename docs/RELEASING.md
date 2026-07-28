# PrepPilot Release and Recovery Runbook

## Release gate

A release may merge only when:

1. `npm test` passes.
2. `npm run build` succeeds.
3. The pull-request workflow is green.
4. Dashboard, recipe library, planner, shopping list and Data tools load from a clean browser session.
5. Planner, favourites, notes and shopping state survive a refresh.
6. A JSON export validates and restores in a clean browser profile.
7. The app reloads offline after one successful online visit.
8. Keyboard focus is visible and primary controls have accessible names.

## Deployment

PrepPilot deploys from `main` through `.github/workflows/deploy.yml`.

- Repository Settings → Pages → Source must be **GitHub Actions**.
- Production URL: `https://camokazii.github.io/PrepPilot/`.
- Do not deploy by manually uploading `dist/`; the workflow is the source of truth.

## Post-deployment smoke test

Use a private/incognito window for the clean-load check:

1. Open the production URL and confirm the dashboard renders.
2. Open Recipes and one recipe detail page.
3. Add a favourite and recipe note, then refresh.
4. Plan one complete day and generate the shopping list.
5. Tick one shopping item and refresh.
6. Open Data tools, export a backup, and validate it by selecting the downloaded file.
7. In browser developer tools, switch Network to Offline and reload.
8. Repeat the core navigation check at a mobile viewport width near 390 px.

## Rollback

When production is broken:

1. Identify the last known-good merge commit on `main`.
2. Revert the faulty pull request with a new pull request; do not force-push `main`.
3. Require tests and build to pass on the revert.
4. Merge the revert and confirm the Pages deployment succeeds.
5. Record the incident and corrective action in the original pull request.

A rollback must not delete or rewrite browser storage. Storage migrations must remain forwards-readable whenever possible.

## User data recovery

PrepPilot stores user data locally using versioned envelopes. Before risky browser or device changes, export a backup from **Data tools**.

During restore:

- the file is parsed and validated before any data is written;
- a pre-import safety backup is saved in `localStorage` under `preppilot-pre-import-safety-backup`;
- unsupported backup versions are rejected;
- invalid JSON or missing data sections do not alter current state.

If a stored record is corrupt, PrepPilot returns a safe fallback and quarantines the unreadable value under a timestamped key rather than deleting it silently.

## Versioning

Phase 0 establishes the production baseline. Subsequent user-facing releases should follow semantic versioning:

- patch: fixes without data-model or feature changes;
- minor: backwards-compatible features or migrations;
- major: incompatible data or workflow changes requiring an explicit migration and rollback plan.
