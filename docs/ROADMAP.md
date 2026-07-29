# PrepPilot Master Roadmap

**Status:** Canonical product roadmap  
**Last updated:** 29 July 2026  
**Current production baseline:** Phase 3 / v1.3.0 — local-first meal-prep PWA with verified recipe authoring, training-aware planning, pantry-aware shopping, package recommendations and dated AUD cost tracking.

## Product mission

PrepPilot is Cameron's dependable meal-prep operating system: a fast mobile-first app that turns verified recipes, training demands, nutrition targets, shopping and progress data into one practical weekly workflow.

## Non-negotiable principles

1. Nutrition integrity first: only fully calculated recipes may be called ingredient-verified.
2. Australian metric, en-AU formatting and Australian products where possible.
3. Protein is a mandatory floor of 160 g/day.
4. Cooking quality cannot be sacrificed for macro optimisation.
5. Core planning, recipes and shopping remain local-first and offline-capable.
6. Each phase must remain tested, migratable and releasable.
7. Serving changes are derived from canonical recipes; ingredient, brand or portion-definition changes require full recalculation.

## Phase status

| Phase | Name | Status | Dependency |
|---|---|---|---|
| 0 | Release hardening and production validation | Complete | Baseline |
| 1 | Serving scaling, target tolerances and run-day planning | Complete | Phase 0 |
| 2 | Recipe authoring, substitutions and macro engine | Complete | Phase 1 |
| 3 | Pantry, advanced shopping and cost tracking | Complete | Phase 2 |
| 4 | Accounts, cloud sync and data portability | Next | Phase 3 |
| 5 | AI meal planning and nutrition auditing | Planned | Phase 4 |
| 6 | Garmin, progress and health integrations | Planned | Phase 4 |
| 7 | Polish, accessibility, performance and maintenance | Continuous | All phases |

## Completed Phase 0 — Release hardening

Delivered versioned persistence, migration and quarantine, JSON backup/restore, PWA lifecycle messaging, error recovery, accessible empty states and release/rollback documentation.

Detailed plan: [`phase-0-release-hardening.md`](superpowers/plans/phase-0-release-hardening.md)

## Completed Phase 1 — Scaling and run-day planning

Delivered recipe and batch scaling, training-day targets, exact tolerance evaluation, verified snack suggestions, reusable week templates and scaled shopping with storage schema v2.

Detailed plan: [`phase-1-scaling-run-days.md`](superpowers/plans/phase-1-scaling-run-days.md)

## Completed Phase 2 — Recipe authoring and macro engine

Delivered normalized ingredient records, deterministic bottom-up calculation, calorie reconciliation, versioned publication gates, substitutions, culinary checks, structured imports and storage schema v3.

Detailed plan: [`phase-2-recipe-engine.md`](superpowers/plans/phase-2-recipe-engine.md)

## Completed Phase 3 — Pantry, shopping and costs

Delivered:

- canonical shopping identities with explicit state, brand and variant separation;
- user-approved alias rules and unresolved identity handling;
- pantry inventory with add, consume, adjust, discard, archive and movement history;
- expiry warnings and pantry-first recipe matching;
- gross requirement, pantry deduction and net purchase calculations;
- per-item pantry deduction overrides and non-negative net quantities;
- manual and recurring shopping items with persistent check state;
- package-size optimisation that minimises excess before cost;
- dated AUD price records with retailer and source metadata;
- known, estimated, stale and missing price coverage;
- ingredient, recipe, serving and shopping-list cost primitives;
- waste event logging and estimated waste-cost support;
- storage schema v4 and backup coverage for all Phase 3 records.

Detailed plan: [`phase-3-pantry-costs.md`](superpowers/plans/phase-3-pantry-costs.md)

## Phase 4 — Accounts, cloud sync and data portability

Optional authentication, conflict-aware cloud persistence, offline mutation queue, full export/import, account deletion and permanent local-only mode.

Detailed plan: [`phase-4-cloud-sync.md`](superpowers/plans/phase-4-cloud-sync.md)

## Phase 5 — AI meal planning and nutrition auditing

AI may suggest plans and drafts, but deterministic calculations remain authoritative. AI cannot mark recipes verified, and all generated plans must be independently recalculated and approved.

Detailed plan: [`phase-5-ai-planning.md`](superpowers/plans/phase-5-ai-planning.md)

## Phase 6 — Garmin, progress and health integrations

Officially supported activity/calendar import, manual fallback, weight trends, adherence summaries and training-load-informed carbohydrate guidance with source timestamps and privacy controls.

Detailed plan: [`phase-6-health-integrations.md`](superpowers/plans/phase-6-health-integrations.md)

## Phase 7 — Quality and maintenance

Continuous WCAG 2.2 AA work, keyboard/screen-reader support, performance budgets, code splitting, visual regression, browser matrix, dependency/security maintenance and privacy-respecting product-health metrics.

Detailed plan: [`phase-7-quality-maintenance.md`](superpowers/plans/phase-7-quality-maintenance.md)

## Architecture direction

- `src/app/` — routing, providers and shell
- `src/features/recipes/` — catalogue, detail, scaling and authoring
- `src/features/planner/` — weekly planning, targets and training logic
- `src/features/shopping/` — consolidation, pantry and cost logic
- `src/features/profile/` — targets, backups and integrations
- `src/domain/` — pure nutrition, quantity and validation rules
- `src/data/` — repositories, migrations and persistence adapters
- `tests/` — unit, integration and end-to-end coverage

Domain calculations remain pure and authoritative. UI, AI and integrations consume those rules rather than replacing them.

## Release governance

- One feature branch and pull request per phase or independently releasable slice.
- Keep `main` deployable.
- Use semantic versioning.
- Use feature flags for incomplete cloud, AI and integration work.
- Any scope, sequencing or phase-status change must update this roadmap in the same pull request.

## Explicitly out of scope until justified

Public social features, marketplace/subscriptions, medical diagnosis, automatic grocery purchasing, autonomous recipe publication, and data access that violates supermarket or Garmin terms.