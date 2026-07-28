# Phase 2 Recipe Authoring and Macro Engine Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans.

**Goal:** Support trustworthy recipe creation, editing, substitutions and versioned macro verification.

**Architecture:** Introduce normalized ingredient and recipe-version entities. A deterministic calculator and validator own publication eligibility; UI forms only collect and display data.

**Tech Stack:** React, domain modules, local repositories initially, Node tests.

## Global Constraints

- Every caloric ingredient must be included.
- Raw, cooked, dry, drained, edible and packaged states cannot be mixed silently.
- Per-serving values equal batch totals divided by actual servings.
- Calorie reconciliation over about 5% blocks verification pending investigation.
- Material changes invalidate prior verification.

### Task 1: Ingredient catalogue schema

**Files:** Create `src/domain/ingredients/schema.js`, repository and tests.

- Define stable ingredient/product IDs, display name, brand, state, unit basis, nutrient basis, source and effective date.
- Support per-100 g, per-100 mL, per-unit and per-package nutrition.
- Record Australian source hierarchy and material assumptions.
- Validate missing or incompatible fields.

### Task 2: Deterministic macro calculator

**Files:** Create `src/domain/nutrition/calculateRecipe.js`, reconciliation helpers and tests.

- Calculate each ingredient independently.
- Sum batch calories, protein, carbohydrate and fat.
- Divide by actual serving count.
- Calculate macro-derived calories and percentage variance.
- Return a complete audit table and blocking issues.

### Task 3: Recipe lifecycle and versioning

**Files:** Create `src/domain/recipes/versioning.js`, recipe repository and migration.

- States: draft, calculation-complete, culinary-reviewed, ingredient-verified, archived.
- Every edit creates or updates a draft version.
- Publishing freezes ingredient/product references and assumptions.
- Preserve prior versions for inspection and rollback.

### Task 4: Recipe authoring UI

**Files:** Create feature components under `src/features/recipes/editor/`.

- Step through identity, servings/equipment, ingredients, method, storage/reheat, culinary review and macro audit.
- Provide inline validation and a blocking-issues summary.
- Prevent verified labels until all gates pass.
- Support cloning an existing recipe into a new draft.

### Task 5: Substitution workflow

**Files:** Create `src/domain/recipes/substitute.js`, UI and tests.

- Replace an ingredient/product while retaining an audit trail.
- Recalculate the entire recipe automatically.
- Flag changes affecting liquid balance, retained fat, pan depth or cooking method.
- Require renewed culinary and macro review before publication.

### Task 6: Culinary feasibility rules

**Files:** Create `src/domain/recipes/culinaryChecks.js`, tests and editor panel.

- Encode high-protein baking warnings for excessive whey, egg white and low-fat dairy.
- Validate baking dish area, depth, material and oven mode.
- Capture intended texture and doneness cues.
- Treat rule output as warnings or blockers according to severity; require explicit resolution notes.

### Task 7: Import and migration

- Migrate current audited recipes into versioned entities without changing displayed macros.
- Verify audit totals against current records.
- Provide a structured JSON import format with record-level errors.

### Task 8: Release validation

- Unit-test every calculator branch and validation rule.
- Integration-test draft → verify → substitute → reverify.
- E2E test creating and publishing a recipe.
- Update roadmap and authoring documentation.

## Acceptance Criteria

- Incomplete recipes cannot display ingredient-verified status.
- Ingredient audit totals reconcile with published batch/per-serving values.
- Any material substitution invalidates verification and triggers full recalculation.
- Historical verified versions remain available.
