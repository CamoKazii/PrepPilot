# Phase 1 Scaling and Run-Day Planning Implementation Plan

**Status:** Implemented on `phase-1-scaling-run-days`  
**Release:** PrepPilot v1.1.0

**Goal:** Make recipe scaling and weekly planning accurately reflect serving needs, macro tolerances and training-day carbohydrate shifts.

## Delivered

### Quantity scaling domain

- Parses supported Australian metric quantities, ranges, fractions and count units.
- Scales from canonical to requested servings.
- Formats g/kg and mL/L sensibly.
- Retains unsupported free-text quantities with a visible manual-check warning.
- Keeps canonical per-serving macros unchanged while scaling batch totals.

### Recipe scaling UI

- Common presets and validated custom serving counts from 1–20.
- Scaled ingredients and total batch macros.
- Clear derived-value labelling tied to the audited canonical recipe.
- Scaled recipe records can be sent to shopping.

### Target evaluation

- Exact calorie, protein, carbohydrate and fat differences.
- Calories ±75 kcal, carbohydrate ±15 g and fat ±7 g tolerances.
- Protein remains a strict minimum of 160 g.
- Incomplete days are never assessed as on target.
- Machine-readable statuses and human-readable explanations.

### Training-day model

- Rest, easy run, quality run, long run, futsal and custom types.
- Quality and long-run shifts constrained to 30–40 g carbohydrate.
- Adjustments are shown separately from base targets.
- The app explicitly states that weekly energy is not changed automatically.

### Planner integration

- Backward-compatible planner slot migration from recipe strings to `{id, servings}`.
- Day-type and carb-shift controls.
- Daily variance and accessible status messaging.
- Copy-day and reusable week-template controls.
- Planner-to-shopping uses unique scaled batch records.

### Verified snack catalogue

- Five snacks with exact ingredients, assumptions and ingredient-verified macros.
- Gap ranking recalculates the entire updated day.
- Suggestions disclose whether they fully resolve tolerance gaps.
- Snacks can be added to planner days.

### Persistence and release

- Storage schema advanced to version 2.
- Phase 0 backups remain importable.
- Training days, planned snacks and templates are included in new backups.
- Unit coverage added for scaling, target status, training shifts, migration and snack assessment.

## Acceptance criteria

- [x] Scaled quantities and batch totals remain mathematically consistent.
- [x] Run-day targets are visible and reversible.
- [x] Protein below 160 g never displays as acceptable.
- [x] Snack recommendations use verified records and updated day totals.
- [x] Legacy planner data migrates without silent loss.
- [x] Scaled planner records generate scaled shopping quantities.
- [ ] Post-merge production smoke test on desktop and mobile.
- [ ] Post-merge installed/offline launch confirmation.

The final two checks are operational release gates documented under the Phase 0 release process and must be completed against the deployed `main` build.