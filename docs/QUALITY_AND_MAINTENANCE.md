# PrepPilot Quality and Maintenance Baseline

## Supported environments

- Node.js 24 or newer for development and CI.
- Current and previous major versions of Chrome, Edge, Firefox and Safari.
- Responsive support from 360 px mobile widths through desktop layouts.
- Keyboard-only operation and reduced-motion preferences are mandatory.

## Automated release gates

Every pull request must pass:

1. Node unit and integration tests.
2. Production Vite build.
3. JavaScript and CSS bundle budgets.
4. Desktop and mobile Chromium critical-flow tests.
5. Axe scans with no serious or critical violations in the tested core route.
6. Keyboard skip-link, route-focus and horizontal-overflow tests.

Current uncompressed asset budgets are evidence-based starting points from the first code-split v1.7 build:

- Largest JavaScript chunk: 300 kB.
- Total JavaScript: 850 kB.
- Total CSS: 140 kB.

The initial measured build was 280.6 kB for the largest React/vendor chunk, 579.4 kB total JavaScript and 19.9 kB total CSS across multiple route chunks. Budget increases require a written explanation in the pull request and should be paired with a follow-up reduction plan.

## Manual accessibility matrix

Quarterly and before material navigation changes:

- Keyboard-only flow through Dashboard, Recipes, Planner and Shopping list.
- NVDA with current Chrome or Edge on Windows.
- VoiceOver with Safari on iOS or macOS.
- 200% zoom and 360 px viewport checks.
- Reduced-motion mode.
- Contrast review for new tokens and interactive states.

Automated checks do not replace these manual reviews.

## Privacy-safe diagnostics

Diagnostics are local and opt-in. Permitted fields are limited to event type, application version, coarse feature name, error code and timestamp. The implementation rejects or omits notes, recipe and ingredient details, meal plans, weight or health measurements, identity fields and tokens. Records are capped at 100 entries and can be cleared locally.

No analytics endpoint is enabled by this phase. A future remote endpoint requires a separate privacy review, explicit opt-in, documented retention and deletion controls.

## Security maintenance

- Dependabot reviews npm and GitHub Actions dependencies monthly.
- `npm audit` findings are reviewed monthly; critical exploitable findings block release.
- Secrets must never be stored in `VITE_` variables unless explicitly public by design.
- Authentication, AI and Garmin threat models are reviewed after material changes.
- Provider tokens remain server-side.

## Cadence

### After every release

- Confirm GitHub Pages loads in a clean browser profile.
- Confirm service-worker update and offline relaunch.
- Review bundle-budget output.
- Update changelog, roadmap baseline and rollback notes.

### Monthly

- Review dependency update pull requests and audit findings.
- Run the production smoke checklist.
- Inspect failed CI and local diagnostic patterns without collecting personal content.

### Quarterly

- Run the manual accessibility matrix.
- Test backup export and restore in a clean profile.
- Test current supported browser versions and one representative mobile device.
- Review bundle budgets and remove obsolete code or dependencies.

## Component rules

Reusable controls belong under `src/components/`. Components must expose native semantics first, support visible focus, avoid colour-only status, keep practical touch targets at least 44 px, announce asynchronous changes when needed and respect reduced-motion settings.
