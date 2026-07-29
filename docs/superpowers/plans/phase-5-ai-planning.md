# Phase 5 AI Planning and Nutrition Auditing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans.

**Status:** Complete in v1.5.0. External AI calls remain feature-flagged until a secure server gateway is deployed.

**Goal:** Add AI-assisted planning and recipe drafting while deterministic calculations remain authoritative.

**Architecture:** AI operates as a proposal layer over verified structured data. All suggestions pass through deterministic recipe, target and shopping validators before the UI can present them as usable plans.

**Tech Stack:** React, server-side AI gateway, structured JSON schemas, deterministic domain engines, automated evaluation fixtures.

## Global Constraints

- AI cannot assign ingredient-verified status.
- AI output is never trusted as a macro calculation.
- User approval is required before applying recipe edits or replacing a plan.
- Sensitive health/account data is minimized and not retained unnecessarily.

### Task 1: AI gateway and contracts — Complete

- Added a server-side provider abstraction and browser gateway client; provider keys remain server-side.
- Added strict schemas for meal-plan proposals, snack suggestions and recipe drafts.
- Malformed, incomplete and unsafe output is rejected.
- Added request timeout, bounded retry, body-size and origin controls.

### Task 2: Constraint-aware plan proposals — Complete

- Requests include verified recipe metadata, targets, day types, preparation constraints, exclusions and seasonality guidance.
- The gateway contract requires multiple candidate weeks.
- Every candidate is recalculated through deterministic target logic.
- Ranking prioritises protein compliance, complete-day tolerance, variance and prep practicality.

### Task 3: Explainable plan review — Complete

- Candidate reasons and assumptions are displayed.
- Exact daily target differences are displayed.
- Unresolved constraints remain visible.
- Users can apply a whole proposal or selected days only.

### Task 4: Snack-gap assistant — Complete

- Deterministic ranking accepts only ingredient-verified snack records.
- Recalculated totals accompany each suggestion.
- Up to five choices are ranked.
- The assistant explicitly distinguishes resolved from merely improved days.

### Task 5: AI-assisted recipe drafting — Complete

- Added structured recipe-draft contract for concept, servings, ingredients and method.
- Ingredients require catalogue product IDs, quantities and units.
- AI output can only enter as `draft`.
- Unresolved products or unsafe verification language are rejected and must return to authoring review.

### Task 6: Audit assistant — Complete

- Added a structured audit endpoint contract for explanations and suggestions.
- Calculated figures and blocking status remain sourced from domain engines.
- Provider, model and version metadata are retained with applied proposal history.

### Task 7: Evaluations and safety — Complete

- Added fixed tests for impossible targets, malformed output, unverified snacks and prompt injection.
- Added verification-label bypass tests.
- Added deterministic fallback and protein-floor regressions.

### Task 8: Release validation — Complete

- AI is behind `VITE_ENABLE_AI` and `VITE_AI_GATEWAY_URL`.
- Core local functionality and deterministic proposals work when AI is unavailable.
- Added privacy-safe history and schema v6 backup coverage.
- Updated roadmap and AI data-handling documentation.

## Acceptance Criteria

- Every applied AI plan is independently calculated.
- Malformed or unsafe output cannot modify stored data.
- Recipe drafts remain unverified until deterministic and culinary gates pass.
- Core local functionality remains available when AI is disabled or unavailable.
