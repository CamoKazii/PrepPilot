# PrepPilot Master Roadmap

**Status:** Canonical product roadmap  
**Last updated:** 29 July 2026  
**Current production baseline:** Phase 5 / v1.5.0 — local-first meal-prep PWA with verified recipe authoring, training-aware planning, pantry-aware shopping, dated AUD costs, optional sync and guarded AI proposal workflows.

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
8. Cloud and AI features remain optional and may never silently discard user data or override deterministic nutrition rules.

## Phase status

| Phase | Name | Status | Dependency |
|---|---|---|---|
| 0 | Release hardening and production validation | Complete | Baseline |
| 1 | Serving scaling, target tolerances and run-day planning | Complete | Phase 0 |
| 2 | Recipe authoring, substitutions and macro engine | Complete | Phase 1 |
| 3 | Pantry, advanced shopping and cost tracking | Complete | Phase 2 |
| 4 | Accounts, cloud sync and data portability | Complete | Phase 3 |
| 5 | AI meal planning and nutrition auditing | Complete | Phase 4 |
| 6 | Garmin, progress and health integrations | Next | Phase 4 |
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

Delivered canonical shopping identities, pantry movement history, expiry guidance, transparent stock deductions, manual and recurring shopping items, package optimisation, dated AUD price coverage, cost calculations, waste tracking and storage schema v4.

Detailed plan: [`phase-3-pantry-costs.md`](superpowers/plans/phase-3-pantry-costs.md)

## Completed Phase 4 — Accounts, sync and portability

Delivered permanent local-only mode, versioned records, optional Supabase authentication, row-level security, conflict-safe offline sync, full portability, account deletion and storage schema v5. Cloud operation remains deployment-configured and optional.

Detailed plan: [`phase-4-cloud-sync.md`](superpowers/plans/phase-4-cloud-sync.md)

## Completed Phase 5 — AI planning and nutrition auditing

Delivered:

- strict schemas for plan, snack and recipe-draft proposals;
- a server-side gateway contract with timeout, feature flag and no browser API secrets;
- multiple candidate plan generation with deterministic recalculation and ranking;
- protein-floor, calorie, carbohydrate and fat tolerance checks for every complete day;
- exact day-level target differences, assumptions and selection reasons;
- whole-plan or selected-day user approval before planner changes;
- verified-snack-only ranking with recalculated totals and unresolved-gap disclosure;
- structured recipe drafts that can only enter the authoring system as drafts;
- prompt-injection and verification-label bypass rejection;
- deterministic local proposals whenever AI is disabled or unavailable;
- provider/model/version history for applied proposals;
- storage schema v6 and privacy-safe AI history support.

AI becomes operational after a secure server-side gateway is deployed and `VITE_ENABLE_AI` plus `VITE_AI_GATEWAY_URL` are configured. Without them, the same interface provides deterministic local proposals and all core features remain available.

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
- `src/features/ai/` — guarded proposals, review and approval
- `src/features/shopping/` — consolidation, pantry and cost logic
- `src/features/profile/` — targets, backups and integrations
- `src/features/account/` — authentication, sync controls, conflicts and portability
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
