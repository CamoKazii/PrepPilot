# Phase 1 Scaling and Run-Day Planning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans.

**Goal:** Make recipe scaling and weekly planning accurately reflect serving needs, macro tolerances and training-day carbohydrate shifts.

**Architecture:** Add pure quantity and target engines first, then build recipe and planner UI on top. Canonical recipe records remain five-serving audited sources; scaled views are derived, not re-verified source records.

**Tech Stack:** React, Vite, Node tests, existing local-first repositories.

## Global Constraints

- Current targets: 2,150 kcal, at least 160 g protein, 210 g carbohydrate, 70 g fat.
- Normal tolerances: calories ±75 kcal, carbohydrates ±15 g, fat ±7 g; protein is a minimum.
- Quality/long-run days shift 30–40 g carbohydrate deliberately and visibly.
- Scaling must preserve Australian metric and ingredient state.

### Task 1: Quantity scaling domain

**Files:** Create `src/domain/quantities/scale.js`, `format.js`, tests.

- Parse numeric metric quantities, ranges and supported count units.
- Scale from canonical servings to requested servings.
- Preserve unsupported free-text quantities with an explicit warning.
- Format sensible g/kg and mL/L outputs without altering the calculation basis.
- Test decimal, range, unit and unsupported cases.

### Task 2: Recipe scaling UI

**Files:** Create `src/features/recipes/ServingControl.jsx`; modify recipe detail and shopping adapters.

- Support common serving presets and validated custom counts.
- Scale ingredient quantities and total batch macros.
- Keep per-serving macros unchanged unless the user changes portion definition.
- Clearly label scaled values as derived from the verified canonical recipe.
- Add selected scale to planner/shopping records.

### Task 3: Target evaluation engine

**Files:** Create `src/domain/nutrition/targets.js`, tests.

- Return exact differences and statuses for calories, protein, carbohydrate and fat.
- Never label a day on target outside configured tolerances.
- Distinguish incomplete days from complete-day assessment.
- Expose machine-readable status and human-readable explanation.

### Task 4: Training-day model

**Files:** Create `src/domain/training/dayTypes.js`, profile settings and tests.

- Support rest, easy run, quality run, long run, futsal and custom day types.
- Store run-day carbohydrate adjustment independently from base targets.
- Default quality/long-run shift to a user-selected value within 30–40 g.
- Show where carbohydrates are shifted rather than silently increasing weekly intake.

### Task 5: Planner integration

**Files:** Refactor planner into focused components under `src/features/planner/`.

- Add day type selection and adjusted target display.
- Add exact variance cards and accessible status indicators.
- Add copy-day, copy-week and reusable template controls.
- Preserve existing plans through schema migration.

### Task 6: Verified snack catalogue and gap suggestions

**Files:** Add `src/data/snacks.*`, `src/domain/nutrition/snackSuggestions.js`, tests and UI.

- Store exact ingredients and ingredient-verified snack macros.
- Rank up to five snacks by unresolved protein/calorie/carbohydrate/fat gaps.
- Do not claim a snack fixes a day unless recalculated day totals meet tolerances.
- Allow suggestions to be added to a planner day and shopping list.

### Task 7: Release validation

- Unit-test scaling, target status and run-day adjustments.
- E2E test scaled recipe → planner → shopping.
- Test incomplete and out-of-tolerance days.
- Update roadmap and user documentation.

## Acceptance Criteria

- Scaled quantities and batch totals remain mathematically consistent.
- Run-day targets are visible and reversible.
- Protein below 160 g never displays as acceptable.
- Snack recommendations use verified records and updated day totals.
