# Phase 5 AI Planning and Nutrition Auditing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans.

**Goal:** Add AI-assisted planning and recipe drafting while deterministic calculations remain authoritative.

**Architecture:** AI operates as a proposal layer over verified structured data. All suggestions pass through deterministic recipe, target and shopping validators before the UI can present them as usable plans.

**Tech Stack:** React, server-side AI gateway, structured JSON schemas, deterministic domain engines, automated evaluation fixtures.

## Global Constraints

- AI cannot assign ingredient-verified status.
- AI output is never trusted as a macro calculation.
- User approval is required before applying recipe edits or replacing a plan.
- Sensitive health/account data is minimized and not retained unnecessarily.

### Task 1: AI gateway and contracts

- Create a server-side provider abstraction; keep API keys off the client.
- Define strict schemas for meal-plan proposals, snack suggestions and recipe drafts.
- Validate and reject malformed or incomplete output.
- Add provider timeouts, retry limits and cost controls.

### Task 2: Constraint-aware plan proposals

- Supply verified recipe metadata, user targets, day types, prep constraints, exclusions and seasonality.
- Generate multiple candidate weeks rather than one opaque answer.
- Recalculate every candidate with the deterministic target engine.
- Rank by protein compliance, total variance, prep practicality and user preferences.

### Task 3: Explainable plan review

- Show why each recipe was selected.
- Display exact daily and weekly target differences.
- Identify unresolved constraints and assumptions.
- Let the user apply the whole proposal or selected days only.

### Task 4: Snack-gap assistant

- Restrict recommendations to verified snack records unless explicitly drafting a new snack.
- Recalculate day totals after each suggestion.
- Show up to five ranked choices and why each fits.
- Never claim a gap is resolved when tolerances remain unmet.

### Task 5: AI-assisted recipe drafting

- Accept concept, cuisine, preparation and target guidance.
- Produce a structured draft only.
- Resolve ingredients through the ingredient catalogue.
- Run deterministic macro and culinary validation.
- Route unresolved products, quantities or texture risks to the authoring workflow.

### Task 6: Audit assistant

- Use AI to explain deterministic validation failures and suggest possible adjustments.
- Keep calculated figures and blocking status sourced only from domain engines.
- Record model/provider/version for reproducibility.

### Task 7: Evaluations and safety

- Build fixed test cases for impossible targets, missing brands, high-protein bakes, allergies/exclusions and prompt injection in imported text.
- Measure schema success, constraint satisfaction and unsupported-claim rate.
- Add red-team tests for attempts to bypass verification labels.

### Task 8: Release validation

- Roll out behind a feature flag.
- Log privacy-safe success/failure metrics.
- Verify graceful fallback when AI is unavailable.
- Update roadmap, AI disclosure and data-handling documentation.

## Acceptance Criteria

- Every applied AI plan is independently calculated.
- Malformed or unsafe output cannot modify stored data.
- Recipe drafts remain unverified until deterministic and culinary gates pass.
- Core local functionality remains available when AI is disabled or unavailable.
