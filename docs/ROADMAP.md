# PrepPilot Master Roadmap

**Status:** Canonical product roadmap  
**Last updated:** 29 July 2026  
**Current production baseline:** Phase 6 / v1.6.0 — local-first meal-prep PWA with verified recipes, training-aware planning, pantry and cost workflows, optional sync, guarded AI proposals, activity tracking and rolling progress trends.

## Product mission

PrepPilot is Cameron's dependable meal-prep operating system: a fast mobile-first app that turns verified recipes, training demands, nutrition targets, shopping and progress data into one practical weekly workflow.

## Non-negotiable principles

1. Nutrition integrity first: only fully calculated recipes may be called ingredient-verified.
2. Australian metric, en-AU formatting and Australian products where possible.
3. Protein is a mandatory floor of 160 g/day.
4. Cooking quality cannot be sacrificed for macro optimisation.
5. Core planning, recipes, health records and shopping remain local-first and offline-capable.
6. Each phase must remain tested, migratable and releasable.
7. Serving changes are derived from canonical recipes; ingredient, brand or portion-definition changes require full recalculation.
8. Cloud, AI and health integrations remain optional and may never silently discard data or override deterministic nutrition rules.
9. Health guidance is advisory, attributable and never presented as diagnosis or treatment.

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
| 7 | Polish, accessibility, performance and maintenance | Next / Continuous | All phases |

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

Delivered strict proposal schemas, deterministic candidate recalculation and ranking, explicit approval, verified-snack ranking, guarded recipe drafts, prompt-injection protection, local fallback and storage schema v6.

Detailed plan: [`phase-5-ai-planning.md`](superpowers/plans/phase-5-ai-planning.md)

## Completed Phase 6 — Training, progress and health integrations

Delivered:

- provider-neutral activity and weight records with source IDs and timestamps;
- manual activity, measurement and recovery-note entry as the permanent baseline;
- duplicate-safe import and correction history;
- official Garmin Activity API gateway contract behind a feature flag;
- planner overlays with explicit confirmation of suggested day types;
- moved/cancelled activity handling without historical data loss;
- rolling weight averages and weekly change against the 0.3–0.4 kg/week target;
- advisory carbohydrate ranges based on day type, duration and recent load;
- an invariant protein floor of at least 160 g/day;
- weekly observed-fact and suggestion summaries;
- provider status, last-sync visibility, disconnect and imported-record deletion;
- storage schema v7 and backup coverage for all Phase 6 records.

Live Garmin sync becomes operational only after Garmin Connect Developer Program approval and deployment of an OAuth 2.0 server gateway. Manual mode requires no provider.

Detailed plan: [`phase-6-health-integrations.md`](superpowers/plans/phase-6-health-integrations.md)

## Phase 7 — Quality and maintenance

Continuous WCAG 2.2 AA work, keyboard and screen-reader support, performance budgets, code splitting, visual regression, browser matrix, dependency/security maintenance and privacy-respecting product-health metrics.

Detailed plan: [`phase-7-quality-maintenance.md`](superpowers/plans/phase-7-quality-maintenance.md)

## Architecture direction

- `src/app/` — routing, providers and shell
- `src/features/recipes/` — catalogue, detail, scaling and authoring
- `src/features/planner/` — weekly planning, targets and training overlays
- `src/features/ai/` — guarded proposals, review and approval
- `src/features/health/` — activity, progress, recovery and integration controls
- `src/features/shopping/` — consolidation, pantry and cost logic
- `src/features/profile/` — targets, backups and integrations
- `src/features/account/` — authentication, sync controls, conflicts and portability
- `src/domain/` — pure nutrition, quantity, training, trend and validation rules
- `src/data/` — repositories, migrations, persistence and provider adapters
- `tests/` — unit, integration and end-to-end coverage

Domain calculations remain pure and authoritative. UI, AI and integrations consume those rules rather than replacing them.

## Release governance

- One feature branch and pull request per phase or independently releasable slice.
- Keep `main` deployable.
- Use semantic versioning.
- Use feature flags for incomplete cloud, AI and integration work.
- Any scope, sequencing or phase-status change must update this roadmap in the same pull request.

## Explicitly out of scope until justified

Public social features, marketplace/subscriptions, medical diagnosis, automatic grocery purchasing, autonomous recipe publication, and data access that violates supermarket, Garmin or other provider terms.
