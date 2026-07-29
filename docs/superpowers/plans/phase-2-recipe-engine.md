# Phase 2 Recipe Authoring and Macro Engine Implementation Plan

**Status:** Implemented on `phase-2-recipe-engine`  
**Release:** v1.2.0

## Goal

Support trustworthy recipe creation, editing, substitutions and versioned macro verification.

## Architecture delivered

Normalized ingredient and recipe-version entities now sit behind pure calculation, culinary-check and publication functions. The editor collects data and displays results, but cannot grant ingredient-verified status independently.

## Completed work

- [x] Stable ingredient/product IDs, names, brands, food states, units, nutrition bases, Australian source levels, effective dates and assumptions.
- [x] Per-100 g, per-100 mL, per-unit and per-package macro calculation.
- [x] Ingredient-level audit rows and complete batch/per-serving totals.
- [x] Macro-derived calorie reconciliation with a blocking variance above 5%.
- [x] Draft, calculation-complete, culinary-reviewed, ingredient-verified and archived lifecycle model.
- [x] Material edits create new draft versions and preserve history.
- [x] Publishing freezes ingredient references and calculated audit results.
- [x] Custom recipe editor with ingredients, method, storage, reheating, texture and doneness fields.
- [x] Blocking-issues summary and ingredient-level macro table.
- [x] Clone, save, publish and historical rollback controls.
- [x] Audited substitution trail with liquid, retained-fat and baking-structure warnings.
- [x] High-protein baking ratio checks and baking-vessel validation.
- [x] Immutable migration representation for existing audited recipes without displayed macro changes.
- [x] Structured JSON recipe import with record-level errors.
- [x] Storage schema v3 and backup migration for custom recipe histories.
- [x] Unit and integration coverage for schema, calculator, lifecycle, substitutions, culinary rules, migration and import.
- [x] Authoring and recovery documentation.

## Global constraints retained

- Every caloric ingredient must be represented by a catalogue product.
- Raw, cooked, dry, drained, edible and packaged states cannot be mixed silently.
- Per-serving values equal batch totals divided by actual servings.
- Calorie reconciliation above 5% blocks publication.
- Material changes invalidate prior verification.

## Acceptance criteria

- Incomplete recipes cannot display ingredient-verified status.
- Ingredient audit totals reconcile with published batch and per-serving values.
- Any material substitution invalidates verification and triggers full recalculation.
- Historical verified versions remain inspectable and recoverable.
- Production tests and build must pass before merge.
