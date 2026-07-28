# Phase 7 Quality, Accessibility and Maintenance Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans.

**Goal:** Keep PrepPilot fast, accessible, secure and maintainable as its feature set grows.

**Architecture:** Treat quality as a continuous cross-cutting phase. Establish measurable budgets, reusable components, automated checks and documented maintenance routines rather than relying on end-of-project cleanup.

**Tech Stack:** React, Vite, automated accessibility tooling, browser tests, bundle analysis, GitHub Actions and dependency/security scanners.

## Global Constraints

- Target WCAG 2.2 AA.
- Support keyboard-only operation and reduced motion.
- Keep core planner, recipe and shopping flows usable on representative mobile hardware.
- Do not add analytics that expose recipe notes, health data or detailed personal plans.

### Task 1: Component and design-system extraction

- Inventory repeated controls, panels, status badges, forms and responsive layouts.
- Extract accessible reusable components under `src/components/`.
- Document variants, states and usage rules.
- Add visual examples and interaction tests.

### Task 2: Accessibility baseline

- Add automated accessibility scans to CI.
- Audit headings, landmarks, labels, focus order, contrast and live-region announcements.
- Provide skip navigation and robust focus restoration after route changes/dialogs.
- Test with keyboard and at least one desktop and one mobile screen reader.

### Task 3: Responsive and touch QA

- Define supported viewport matrix.
- Ensure 44 px minimum practical touch targets where applicable.
- Test recipe cooking mode, planner controls and shopping checklists one-handed.
- Prevent horizontal overflow and inaccessible sticky navigation.

### Task 4: Performance budgets

- Set production budgets for initial JavaScript, CSS, route chunks and largest contentful paint.
- Add route-level code splitting for editor, analytics, AI and integration features.
- Avoid loading complete recipe audit data where only cards are required.
- Add bundle analysis and regression thresholds to CI.

### Task 5: Visual and end-to-end regression

- Capture key desktop and mobile route snapshots.
- Test recipe → planner → shopping, backup/restore, offline launch and sync conflict flows.
- Make tests deterministic by using fixed clocks and fixtures.
- Require critical workflow tests before merge.

### Task 6: Security and dependency maintenance

- Enable automated dependency update pull requests.
- Run dependency and secret scans.
- Document supported Node/browser versions and upgrade cadence.
- Review authentication, integration and AI threat models after material changes.

### Task 7: Privacy-respecting observability

- Track only coarse application health: load failures, sync failures, build version and feature errors.
- Exclude free-text notes, ingredient selections, body measurements and detailed plans.
- Provide an opt-out where telemetry is introduced.
- Document retention and access.

### Task 8: Maintenance cadence

- Monthly: dependency review and production smoke test.
- Quarterly: accessibility, backup-restore and browser compatibility review.
- Before each major phase: architecture and data-migration review.
- After each release: update roadmap status, changelog and rollback notes.

## Acceptance Criteria

- Automated and manual accessibility checks find no critical violations in core flows.
- Performance budgets pass on representative mobile conditions.
- Critical end-to-end flows run in CI.
- Maintenance responsibilities and cadence are documented and followed.
