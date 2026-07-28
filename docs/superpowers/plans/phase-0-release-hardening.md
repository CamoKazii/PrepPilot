# Phase 0 Release Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the current local-first PWA dependable for regular production use.

**Architecture:** Preserve the current app while introducing versioned persistence, backup/restore, route smoke tests and PWA lifecycle UI behind small focused modules.

**Tech Stack:** React, Vite, React Router, Node test runner, GitHub Actions, GitHub Pages.

## Global Constraints

- Keep `main` deployable.
- Do not change recipe macros in this phase.
- Existing localStorage data must remain recoverable.
- Core workflows must continue working offline.

### Task 1: Versioned persistence

**Files:** Create `src/data/storage.js`, `src/data/migrations.js`, tests in `tests/storage.test.js`; modify feature consumers.

- Define schema envelope `{version, updatedAt, data}`.
- Add safe read, write, migrate and quarantine functions.
- Migrate existing planner, shopping, favourites and notes keys.
- Test valid, corrupt and older-schema records.
- Commit as an independently releasable migration.

### Task 2: Backup and restore

**Files:** Create `src/features/profile/DataTools.jsx`, `src/domain/backup.js`, `tests/backup.test.js`; add route/navigation entry.

- Export recipes/user state metadata and all user-owned local data to JSON.
- Validate imported file structure before writing.
- Preview counts and errors before confirmation.
- Restore atomically; preserve a pre-import safety backup.
- Test round trip, partial invalidity and incompatible versions.

### Task 3: PWA lifecycle

**Files:** Create `src/app/PwaStatus.jsx`; modify service-worker registration and CSS.

- Detect install eligibility.
- Show install guidance without blocking use.
- Detect waiting service worker and offer explicit reload.
- Show offline/online state accessibly.
- Test state transitions with mocked browser events.

### Task 4: Error and empty states

**Files:** Create `src/app/ErrorBoundary.jsx`, reusable `EmptyState` and `Notice` components.

- Catch render failures at route level.
- Provide reload and data-export escape routes.
- Ensure planner, library and shopping empty states explain the next action.
- Add keyboard focus and screen-reader labels.

### Task 5: Smoke and accessibility tests

**Files:** Add browser test tooling, `tests/e2e/core.spec.*`, CI changes.

- Test dashboard load, recipe open, planner persistence, planner-to-shopping generation, notes/favourites persistence and backup restore.
- Run automated accessibility scans on primary routes.
- Run tests before production build in CI.

### Task 6: Production release gate

- Verify GitHub Pages source is GitHub Actions.
- Test clean desktop and mobile browser sessions.
- Test installed/offline launch.
- Document deployment, rollback and data recovery in `docs/RELEASING.md`.
- Update Phase 0 status in `docs/ROADMAP.md`.

## Acceptance Criteria

- Existing data migrates without silent loss.
- Backup export restores successfully in a clean browser profile.
- Core e2e tests and build pass in CI.
- Production URL works online and offline after first load.
