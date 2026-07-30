# PrepPilot Master Roadmap

**Status:** Canonical product roadmap  
**Last updated:** 30 July 2026  
**Current production baseline:** Phase 7 quality baseline / v1.7.0 — complete local-first meal-prep platform with verified recipes, training-aware planning, pantry and cost workflows, optional sync and AI, health tracking, accessibility automation, browser regressions and performance budgets.

## Product mission

PrepPilot is Cameron's dependable meal-prep operating system: a fast mobile-first app that turns verified recipes, training demands, nutrition targets, shopping and progress data into one practical weekly workflow.

## Non-negotiable principles

1. Nutrition integrity first: only fully calculated recipes may be called ingredient-verified.
2. Australian metric, en-AU formatting and Australian products where possible.
3. Protein is a mandatory floor of 160 g/day.
4. Cooking quality cannot be sacrificed for macro optimisation.
5. Core planning, recipes, health records and shopping remain local-first and offline-capable.
6. Each change must remain tested, migratable and releasable.
7. Serving changes are derived from canonical recipes; ingredient, brand or portion-definition changes require full recalculation.
8. Cloud, AI and health integrations remain optional and may never silently discard data or override deterministic nutrition rules.
9. Health guidance is advisory, attributable and never presented as diagnosis or treatment.
10. WCAG 2.2 AA, keyboard access, practical touch targets, responsive layouts and measured performance are continuing release requirements.

## Phase status

| Phase | Name | Status | Dependency |
|---|---|---|---|
| 0 | Release hardening and production validation | Complete | Baseline |
| 1 | Serving scaling, target tolerances and run-day planning | Complete | Phase 0 |
| 2 | Recipe authoring, substitutions and macro engine | Complete | Phase 1 |
| 3 | Pantry, advanced shopping and cost tracking | Complete | Phase 2 |
| 4 | Accounts, cloud sync and data portability | Complete | Phase 3 |
| 5 | AI meal planning and nutrition auditing | Complete | Phase 4 |
| 6 | Garmin, progress and health integrations | Complete | Phase 4 |
| 7 | Polish, accessibility, performance and maintenance | Baseline established / Continuous | All phases |

## Completed product phases

### Phase 0 — Release hardening

Delivered versioned persistence, migration and quarantine, JSON backup/restore, PWA lifecycle messaging, error recovery, accessible empty states and release/rollback documentation.

Detailed plan: [`phase-0-release-hardening.md`](superpowers/plans/phase-0-release-hardening.md)

### Phase 1 — Scaling and run-day planning

Delivered recipe and batch scaling, training-day targets, exact tolerance evaluation, verified snack suggestions, reusable week templates and scaled shopping with storage schema v2.

Detailed plan: [`phase-1-scaling-run-days.md`](superpowers/plans/phase-1-scaling-run-days.md)

### Phase 2 — Recipe authoring and macro engine

Delivered normalized ingredient records, deterministic bottom-up calculation, calorie reconciliation, publication gates, substitutions, culinary checks, imports and storage schema v3.

Detailed plan: [`phase-2-recipe-engine.md`](superpowers/plans/phase-2-recipe-engine.md)

### Phase 3 — Pantry, shopping and costs

Delivered canonical shopping identities, pantry movements, expiry guidance, transparent deductions, recurring items, package optimisation, dated AUD prices, waste tracking and storage schema v4.

Detailed plan: [`phase-3-pantry-costs.md`](superpowers/plans/phase-3-pantry-costs.md)

### Phase 4 — Accounts, sync and portability

Delivered permanent local-only mode, versioned records, optional Supabase authentication, row-level security, conflict-safe offline sync, full portability, account deletion and storage schema v5.

Detailed plan: [`phase-4-cloud-sync.md`](superpowers/plans/phase-4-cloud-sync.md)

### Phase 5 — AI planning and nutrition auditing

Delivered strict proposal schemas, deterministic recalculation and ranking, explicit approval, verified-snack ranking, guarded drafts, prompt-injection protection, local fallback and storage schema v6.

Detailed plan: [`phase-5-ai-planning.md`](superpowers/plans/phase-5-ai-planning.md)

### Phase 6 — Training, progress and health integrations

Delivered provider-neutral activities and measurements, manual fallback, duplicate-safe imports, official Garmin gateway contract, planner overlays, rolling weight trends, advisory carbohydrate ranges, weekly review, privacy controls and storage schema v7.

Detailed plan: [`phase-6-health-integrations.md`](superpowers/plans/phase-6-health-integrations.md)

### Phase 7 — Quality and maintenance baseline

Established:

- accessible route transitions, skip navigation, focus restoration and live announcements;
- keyboard, touch-target, responsive and reduced-motion baselines;
- route-level code splitting for major feature areas;
- enforceable JavaScript and CSS bundle budgets;
- desktop and mobile Chromium critical-flow tests;
- axe accessibility scans with serious and critical violations blocking CI;
- monthly npm and GitHub Actions dependency updates;
- privacy-safe, opt-in local diagnostic primitives;
- documented browser support, accessibility reviews, security checks and maintenance cadence;
- PWA cache v8 and app version 1.7.0.

Quality remains continuous. Future feature work must pass and extend these gates rather than treating Phase 7 as a one-time cleanup.

Detailed plan: [`phase-7-quality-maintenance.md`](superpowers/plans/phase-7-quality-maintenance.md)  
Operating standard: [`../QUALITY_AND_MAINTENANCE.md`](../QUALITY_AND_MAINTENANCE.md)

## Architecture direction

- `src/app/` — routing, providers and shell
- `src/components/` — reusable accessible interface primitives
- `src/features/recipes/` — catalogue, detail, scaling and authoring
- `src/features/planner/` — weekly planning, targets and training overlays
- `src/features/ai/` — guarded proposals, review and approval
- `src/features/health/` — activity, progress, recovery and integration controls
- `src/features/shopping/` — consolidation, pantry and cost logic
- `src/features/profile/` — targets, backups and integrations
- `src/features/account/` — authentication, sync controls, conflicts and portability
- `src/domain/` — pure nutrition, quantity, training, trend and validation rules
- `src/data/` — repositories, migrations, persistence and provider adapters
- `test/` and `e2e/` — unit, integration, accessibility and browser coverage

Domain calculations remain pure and authoritative. UI, AI and integrations consume those rules rather than replacing them.

## Release governance

- Keep `main` deployable.
- Use semantic versioning.
- Use feature flags for externally activated cloud, AI and integrations.
- Require unit tests, production build, performance budgets and critical browser flows before merge.
- Update the roadmap, quality baseline and rollback notes after material releases.
- Public social features, marketplaces, medical diagnosis, automatic purchasing, autonomous recipe publication and provider-policy violations remain out of scope.
