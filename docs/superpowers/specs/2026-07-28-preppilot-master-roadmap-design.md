# PrepPilot Master Roadmap Design

## Purpose

This document defines how PrepPilot evolves from the current local-first PWA into a complete meal-prep, nutrition and training-support platform without sacrificing macro integrity, culinary quality or offline usability.

## Product boundaries

PrepPilot is a planning and cooking tool, not a medical device. It may explain nutrition variances and support user-defined goals, but it must not diagnose, prescribe treatment or silently alter targets.

## Architecture strategy

Development proceeds through independently releasable phases. Pure domain logic owns quantities, nutrition calculations, tolerance evaluation and validation. React features consume those interfaces. Persistence is accessed through repositories so localStorage can later be supplemented by cloud storage without rewriting domain or UI logic.

### Target module boundaries

- `src/domain/nutrition/`: macro arithmetic, calorie reconciliation, targets and snack-gap logic.
- `src/domain/quantities/`: units, scaling, normalization and display.
- `src/domain/recipes/`: recipe validation, versioning and publication rules.
- `src/features/recipes/`: library, detail, scaling and authoring UI.
- `src/features/planner/`: weekly plans, run days, templates and target status.
- `src/features/shopping/`: aggregation, pantry, cost and checkout workflows.
- `src/features/profile/`: targets, preferences, backup, accounts and integrations.
- `src/data/`: local and remote repository adapters, migrations and synchronization.
- `src/components/`: reusable accessible UI components.

## Data principles

1. Every stored entity has a stable ID and schema version.
2. Nutrition values record their basis: per 100 g, per 100 mL, per unit or per package.
3. Ingredient state is explicit: raw, cooked, drained, dry, edible portion or packaged.
4. Recipe verification records the exact ingredient versions used.
5. A material ingredient change creates a new recipe version and invalidates verification until recalculated.
6. Local data can always be exported in a documented JSON format.
7. Cloud synchronization, when introduced, never removes local-first operation.

## Error handling

- Invalid or outdated persisted data is migrated when possible and quarantined when not.
- Failed imports show record-level errors and do not overwrite working data.
- Unsupported quantity conversions remain separate and visible.
- Network-dependent features degrade to manual/local alternatives.
- AI and integration failures never block recipe access, planner access or shopping access.

## Testing strategy

- Unit tests for all domain rules.
- Integration tests for repositories and local migrations.
- Component tests for critical forms and status displays.
- End-to-end tests for recipe → planner → shopping and backup/restore workflows.
- Accessibility checks in CI plus manual keyboard and screen-reader review.
- Production build and route smoke tests on every pull request.

## Release governance

A phase cannot be marked complete until its acceptance criteria pass, CI is green, production has been smoke-tested and `docs/ROADMAP.md` is updated. Scope additions require an explicit roadmap amendment rather than being silently folded into an active phase.

## Security and privacy

- No secrets in the client bundle.
- Authentication tokens use platform-appropriate secure storage.
- Health and account integrations require explicit consent and revocation.
- AI providers receive only the minimum data needed for the requested action.
- Data export and deletion are first-class account operations.

## Success measures

- A weekly plan can be created, validated and converted to a shop without spreadsheet work.
- Recipes remain trustworthy after scaling, editing or substitution.
- Core workflows work offline.
- Cross-device sync does not create silent data loss.
- Training-aware planning remains understandable and user-controlled.
