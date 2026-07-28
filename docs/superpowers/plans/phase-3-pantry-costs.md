# Phase 3 Pantry, Shopping and Cost Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans.

**Goal:** Turn the shopping workflow into a practical inventory and cost-management system.

**Architecture:** Build pantry, purchasing and price records as separate domain entities. Shopping calculations consume planned recipe requirements and pantry availability, then produce transparent purchase recommendations.

**Tech Stack:** React, local repositories, deterministic quantity and price engines, Node tests.

## Global Constraints

- Currency is AUD.
- Price records must include source and observation date.
- Pantry deductions must be visible and reversible.
- Incompatible ingredient states or units must not merge automatically.

### Task 1: Ingredient identity and alias rules

**Files:** Create `src/domain/shopping/ingredientIdentity.js`, alias data and tests.

- Map recipe ingredients to canonical shopping identities.
- Distinguish product variants that should not merge.
- Support deliberate aliases approved by the user.
- Record unresolved identity conflicts for review.

### Task 2: Pantry inventory

**Files:** Create `src/features/pantry/`, pantry repository and domain tests.

- Store item, quantity, unit/state, preferred brand, opened status, purchase and expiry dates.
- Support add, consume, adjust, discard and archive operations.
- Maintain a simple movement history.
- Warn about soon-to-expire stock without blocking use.

### Task 3: Pantry-aware shopping calculation

**Files:** Create `src/domain/shopping/calculatePurchases.js`, tests and shopping UI changes.

- Calculate gross requirements from selected plans and recipe scales.
- Deduct compatible pantry stock only.
- Display gross need, pantry deduction and net purchase quantity.
- Never produce negative shopping quantities.
- Allow pantry deductions to be disabled per item.

### Task 4: Manual and reusable shopping items

- Add manual list items with category, quantity and notes.
- Support recurring non-recipe items.
- Preserve check state through list regeneration when identity matches.
- Allow user-defined aisle/category ordering.

### Task 5: Package-size recommendation

**Files:** Create package model and optimizer tests.

- Store available package sizes and preferred products.
- Recommend sufficient package combinations with minimal excess.
- Show excess quantity and estimated leftover.
- Never substitute brands or products silently.

### Task 6: Price records and cost engine

**Files:** Create `src/domain/costs/`, price repository and tests.

- Store AUD price, package size, retailer, source URL/reference and observed date.
- Calculate ingredient, recipe, serving, day and weekly plan cost.
- Distinguish known, estimated and missing price coverage.
- Prevent stale price records from appearing current without a date warning.

### Task 7: Waste and leftovers

- Record unused purchased quantity, leftovers consumed and discarded food.
- Summarize estimated waste quantity and AUD cost.
- Suggest pantry-first recipe opportunities using deterministic matching.

### Task 8: Release validation

- Unit-test identity, deductions, package optimization and costs.
- E2E test planner → pantry deduction → shopping → cost summary.
- Verify export/import includes pantry and price records.
- Update roadmap and user documentation.

## Acceptance Criteria

- Net shopping quantities reconcile from gross requirements minus compatible pantry stock.
- Cost totals reconcile from price records and quantities.
- Every estimate shows its date/source coverage.
- Users can understand and override every pantry deduction or package recommendation.
