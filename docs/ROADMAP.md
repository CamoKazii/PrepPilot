# PrepPilot Master Roadmap

**Status:** Canonical product roadmap  
**Last updated:** 28 July 2026  
**Current production baseline:** local-first React/Vite PWA with 16 ingredient-audited recipes, planner, macro summaries, favourites, notes and consolidated shopping.

## Product mission

PrepPilot should become Cameron's dependable meal-prep operating system: a fast mobile-first app that turns verified recipes, training demands, nutrition targets, shopping and progress data into one practical weekly workflow.

## Non-negotiable product principles

1. **Nutrition integrity first.** No recipe is labelled ingredient-verified unless every caloric ingredient is included and batch totals reconcile with per-serving values.
2. **Australian context.** Australian metric, Australian products where possible, Brisbane seasonality and en-AU formatting.
3. **Protein is mandatory.** Daily planning must treat 160 g protein as a floor, not a soft target.
4. **Cooking quality matters.** Macro optimisation must not produce structurally poor food.
5. **Local-first by default.** Core planning, recipes and shopping must remain usable offline. Cloud features are optional enhancements, not prerequisites.
6. **Progressive complexity.** Each phase must leave the app usable, tested and releasable.
7. **No silent recalculation.** Brand, quantity, serving-count or ingredient changes must trigger a full macro recalculation.

## Delivery model

Each phase has its own implementation plan in `docs/superpowers/plans/`. A phase is complete only when:

- acceptance criteria are met;
- automated tests pass;
- production build succeeds;
- mobile and desktop smoke tests pass;
- migration and rollback paths are documented;
- the roadmap status is updated.

## Phase status

| Phase | Name | Status | Dependency |
|---|---|---|---|
| 0 | Release hardening and production validation | Next | Current baseline |
| 1 | Serving scaling, target tolerances and run-day planning | Planned | Phase 0 |
| 2 | Recipe authoring, substitutions and macro engine | Planned | Phase 1 |
| 3 | Pantry, advanced shopping and cost tracking | Planned | Phase 2 |
| 4 | Accounts, cloud sync and data portability | Planned | Phase 3 |
| 5 | AI meal planning and nutrition auditing | Planned | Phase 4 |
| 6 | Garmin, progress and health integrations | Planned | Phase 4 |
| 7 | Polish, accessibility, performance and maintenance | Continuous | All phases |

---

## Phase 0 — Release hardening and production validation

### Goal

Make the current app safe, observable and dependable enough for regular personal use.

### Scope

- Confirm GitHub Pages deployment and custom base-path behaviour.
- Add smoke tests for primary routes and persisted data.
- Add error boundaries and localStorage schema migration.
- Add data export/import for manual backups.
- Add PWA install/update messaging.
- Add accessible loading, empty and error states.
- Validate on current Chrome desktop and Android/iOS mobile browsers.
- Document release and rollback procedure.

### Exit criteria

- Production URL works after a clean browser load.
- Planner, notes, favourites and shopping persist across refreshes.
- Offline reload works after first successful visit.
- Existing browser data can be exported and restored.
- CI tests and production build pass.

Detailed plan: [`phase-0-release-hardening.md`](superpowers/plans/phase-0-release-hardening.md)

---

## Phase 1 — Serving scaling, target tolerances and run-day planning

### Goal

Turn the planner into a training-aware macro decision tool.

### Scope

- Scale ingredient quantities and macros from the canonical five-serving recipe.
- Preserve raw/dry/drained states while scaling.
- Add complete-day tolerance evaluation:
  - calories ±75 kcal;
  - protein at least 160 g;
  - carbohydrate ±15 g before run-day adjustment;
  - fat ±7 g.
- Mark easy, quality, long-run, futsal and rest days.
- Shift 30–40 g carbohydrate around quality/long runs without changing weekly calories silently.
- Show exact daily differences and warnings.
- Add snack recommendations from verified snack records.
- Add week templates and duplicate-week controls.

### Exit criteria

- Scaling any supported serving count updates ingredients, batch macros and per-serving macros consistently.
- Planner distinguishes base targets from run-day targets.
- No day is labelled on target outside declared tolerances.
- Recommended snacks display ingredient-verified macros.

Detailed plan: [`phase-1-scaling-run-days.md`](superpowers/plans/phase-1-scaling-run-days.md)

---

## Phase 2 — Recipe authoring, substitutions and macro engine

### Goal

Allow new recipes and controlled substitutions without compromising nutrition integrity.

### Scope

- Introduce a normalized ingredient catalogue with unit, state, brand and nutrition basis.
- Build a bottom-up macro calculator.
- Add recipe draft, validation and publish states.
- Add exact ingredient-level audit tables.
- Add substitution workflows requiring recalculation.
- Add baking-vessel and high-protein-bake checks.
- Add custom recipe import and editing.
- Add recipe version history.

### Exit criteria

- A new recipe cannot be published while ingredients, serving count, assumptions or sanity checks are incomplete.
- Any material ingredient change invalidates prior macro verification.
- Historical recipe versions remain inspectable.
- Published recipes satisfy the same validation rules as migrated recipes.

Detailed plan: [`phase-2-recipe-engine.md`](superpowers/plans/phase-2-recipe-engine.md)

---

## Phase 3 — Pantry, advanced shopping and cost tracking

### Goal

Reduce shopping friction, waste and weekly food cost.

### Scope

- Pantry inventory with quantities, expiry dates and preferred brands.
- Shopping list subtracts available pantry stock.
- Manual shopping items and aisle reordering.
- Intentional ingredient aliases and non-merge rules.
- Package-size recommendations.
- Cost-per-recipe and cost-per-serving in AUD.
- Store/product price records with timestamp and source.
- Waste and leftover tracking.

### Exit criteria

- Shopping quantities never become negative.
- Pantry deductions are transparent and reversible.
- Price estimates show source date and assumptions.
- Cost totals reconcile from ingredient prices to recipe and weekly totals.

Detailed plan: [`phase-3-pantry-costs.md`](superpowers/plans/phase-3-pantry-costs.md)

---

## Phase 4 — Accounts, cloud sync and data portability

### Goal

Make PrepPilot safely usable across phone, tablet and desktop.

### Scope

- Optional authentication.
- Cloud persistence for recipes, planner, shopping, favourites, notes and pantry.
- Conflict-aware synchronization.
- Offline mutation queue.
- Full JSON export/import.
- Account deletion and privacy controls.
- Local-only mode remains supported.

### Exit criteria

- A user can create data offline and sync it later without silent loss.
- Conflicts are surfaced and recoverable.
- Exported data can restore a new account.
- Local-only users retain all current functionality.

Detailed plan: [`phase-4-cloud-sync.md`](superpowers/plans/phase-4-cloud-sync.md)

---

## Phase 5 — AI meal planning and nutrition auditing

### Goal

Use AI to accelerate planning while deterministic validation remains authoritative.

### Scope

- AI meal-plan suggestions using verified recipe records only.
- Constraint-aware planning for calories, protein, carbohydrates, fat, prep time and seasonality.
- Snack-gap recommendations.
- AI-assisted recipe drafting.
- Deterministic macro recalculation after every AI change.
- Explainable plan rationale and variance disclosure.
- Human approval before publishing or changing verified recipes.

### Exit criteria

- AI cannot mark a recipe or plan verified.
- Every generated plan is independently recalculated.
- Unsupported assumptions are clearly identified.
- Failed validation blocks publication.

Detailed plan: [`phase-5-ai-planning.md`](superpowers/plans/phase-5-ai-planning.md)

---

## Phase 6 — Garmin, progress and health integrations

### Goal

Adapt meal planning to training demand and measured progress.

### Scope

- Garmin calendar/activity import where officially supported.
- Manual fallback for run type, duration and estimated demand.
- Weight trend and target-loss tracking.
- Weekly adherence and performance summaries.
- Training-load-informed carbohydrate suggestions.
- Privacy controls and disconnect workflow.

### Exit criteria

- Integration failure never prevents manual planning.
- Imported activity data shows source and timestamp.
- Weight trends use rolling averages rather than single-day reactions.
- Nutrition suggestions remain advisory and disclose uncertainty.

Detailed plan: [`phase-6-health-integrations.md`](superpowers/plans/phase-6-health-integrations.md)

---

## Phase 7 — Polish, accessibility, performance and maintenance

### Goal

Keep PrepPilot fast, understandable and maintainable as capabilities grow.

### Scope

- WCAG 2.2 AA target.
- Keyboard, screen-reader and reduced-motion support.
- Performance budgets and route-level code splitting.
- Visual regression testing.
- Browser compatibility matrix.
- Dependency and security maintenance.
- Analytics limited to privacy-respecting product health metrics.
- Design-system and component documentation.

### Exit criteria

- No critical accessibility violations in automated and manual checks.
- Performance budgets pass on representative mobile hardware.
- Core workflows remain covered by end-to-end tests.
- Dependency updates follow a documented cadence.

Detailed plan: [`phase-7-quality-maintenance.md`](superpowers/plans/phase-7-quality-maintenance.md)

---

## Cross-phase architecture direction

The current single-page implementation should evolve toward:

- `src/app/` — routing, providers and application shell;
- `src/features/recipes/` — catalogue, recipe detail, scaling and authoring;
- `src/features/planner/` — week planning, targets and run-day logic;
- `src/features/shopping/` — consolidation, pantry and cost logic;
- `src/features/profile/` — targets, preferences and integrations;
- `src/domain/` — pure nutrition, quantity and validation rules;
- `src/data/` — repositories and persistence adapters;
- `src/components/` — reusable presentation components;
- `tests/` — unit, integration and end-to-end coverage.

Domain calculations must remain pure and independently testable. UI components must not become the authoritative source of nutrition calculations.

## Release strategy

- Use one feature branch and pull request per phase or independently releasable slice.
- Keep `main` deployable.
- Use semantic versioning once Phase 0 is complete.
- Prefer feature flags for incomplete cloud, AI and integration work.
- Update this roadmap in the same pull request that changes phase scope or status.

## Explicitly out of scope until justified

- Public social feed.
- Marketplace or paid subscriptions.
- Medical diagnosis or treatment recommendations.
- Automatic grocery purchasing.
- Fully autonomous recipe publication.
- Scraping private supermarket or Garmin data in violation of service terms.
