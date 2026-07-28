# PrepPilot Master Roadmap

**Status:** Canonical product roadmap  
**Last updated:** 28 July 2026  
**Current production baseline:** Phase 1 / v1.1.0 — hardened local-first PWA with audited recipes, derived serving scaling, training-aware planning, verified snack suggestions and scaled shopping.

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
| 2 | Recipe authoring, substitutions and macro engine | Next | Phase 1 |
| 3 | Pantry, advanced shopping and cost tracking | Planned | Phase 2 |
| 4 | Accounts, cloud sync and data portability | Planned | Phase 3 |
| 5 | AI meal planning and nutrition auditing | Planned | Phase 4 |
| 6 | Garmin, progress and health integrations | Planned | Phase 4 |
| 7 | Polish, accessibility, performance and maintenance | Continuous | All phases |

## Completed Phase 0 — Release hardening

Delivered versioned persistence, migration and quarantine, JSON backup/restore, PWA lifecycle messaging, error recovery, accessible empty states and release/rollback documentation.

Detailed plan: [`phase-0-release-hardening.md`](superpowers/plans/phase-0-release-hardening.md)

## Completed Phase 1 — Scaling and run-day planning

Delivered:

- recipe ingredient and batch scaling from canonical serving counts;
- explicit derived-value warnings for unsupported free-text quantities;
- planner slot records containing recipe ID and intended batch servings;
- scaled planner-to-shopping quantities;
- exact calorie, protein, carbohydrate and fat variance assessment;
- calorie ±75 kcal, carbohydrate ±15 g and fat ±7 g tolerances;
- mandatory protein floor of at least 160 g;
- rest, easy, quality, long-run, futsal and custom day types;
- visible 30–40 g carbohydrate shifts for quality and long-run days;
- reusable week templates and copy-day controls;
- five ingredient-verified snack records with recalculated gap ranking;
- storage schema v2 migration and Phase 1 backup compatibility.

Detailed plan: [`phase-1-scaling-run-days.md`](superpowers/plans/phase-1-scaling-run-days.md)

## Phase 2 — Recipe authoring, substitutions and macro engine

**Goal:** allow new recipes and controlled substitutions without compromising nutrition integrity.

Scope:

- normalised ingredient catalogue with unit, state, brand and nutrition basis;
- bottom-up macro calculator and ingredient audit tables;
- recipe draft, validation and publish states;
- substitution workflows that invalidate and recalculate macros;
- baking-vessel and high-protein-bake checks;
- custom recipe editing, import and version history.

Exit gate: incomplete ingredients, assumptions, serving counts or sanity checks must block publication.

Detailed plan: [`phase-2-recipe-engine.md`](superpowers/plans/phase-2-recipe-engine.md)

## Phase 3 — Pantry, advanced shopping and cost tracking

Pantry inventory, expiry and preferred brands; transparent stock deductions; manual items; aliases and non-merge rules; package sizing; AUD recipe and weekly costs with dated price sources; waste and leftovers.

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