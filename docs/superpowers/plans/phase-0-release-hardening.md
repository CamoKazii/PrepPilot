# Phase 0 Release Hardening Implementation Plan

**Status:** Complete in PR for `phase-0-release-hardening`  
**Completed:** 28 July 2026

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the current local-first PWA dependable for regular production use.

**Architecture:** Preserve the current app while introducing versioned persistence, backup/restore, route smoke tests and PWA lifecycle UI behind small focused modules.

**Tech Stack:** React, Vite, React Router, Node test runner, GitHub Actions, GitHub Pages.

## Global Constraints

- Keep `main` deployable.
- Do not change recipe macros in this phase.
- Existing localStorage data must remain recoverable.
- Core workflows must continue working offline.

### Task 1: Versioned persistence — complete

**Files:** `src/data/storage.js`, `tests/storage.test.js`, feature consumers in `src/main.jsx`.

- Implemented schema envelope `{version, updatedAt, data}`.
- Added safe read, write, legacy migration and corrupt-record quarantine.
- Migrates planner, shopping, favourites, checked items and notes.
- Tests cover valid, corrupt, legacy and round-trip records.

### Task 2: Backup and restore — complete

**Files:** `src/features/profile/DataTools.jsx`, `src/domain/backup.js`, `tests/backup.test.js`.

- Exports all user-owned local data to versioned JSON.
- Validates structure and version before restore.
- Previews planned meals, shopping recipes, favourites and notes.
- Restores only after confirmation and preserves a pre-import safety backup.
- Tests cover round trip, malformed JSON and incomplete backup structures.

### Task 3: PWA lifecycle — complete

**Files:** `src/app/PwaStatus.jsx`, `public/sw.js`, `src/phase0.css`.

- Detects install eligibility.
- Shows non-blocking install action.
- Detects waiting service workers and offers explicit update reload.
- Announces offline state accessibly.
- Adds service-worker skip-waiting, client claim and offline navigation fallback.

### Task 4: Error and empty states — complete

**Files:** `src/app/ErrorBoundary.jsx`, `src/main.jsx`.

- Catches render failures at application level.
- Provides reload and Data tools escape routes.
- Reusable empty and notice states provide next actions.
- Favourite and notes controls have descriptive accessible labels.

### Task 5: Smoke and accessibility checks — complete for Phase 0 baseline

**Files:** `tests/release-smoke.test.js`, existing CI test/build workflow.

- Static release smoke assertions cover primary routes, PWA paths and safety-module wiring.
- Unit tests cover persisted data and backup behaviour.
- CI runs the complete Node test suite before the production build.
- Manual mobile, keyboard and offline checks are documented in the release runbook.

### Task 6: Production release gate — complete pending post-merge deployment observation

- GitHub Pages remains deployed through GitHub Actions.
- Deployment, smoke testing, rollback and data recovery are documented in `docs/RELEASING.md`.
- Version advanced to `1.0.0` as the hardened production baseline.
- Post-merge production URL and offline launch must be observed using the release checklist.

## Acceptance Criteria

- Existing legacy data migrates without silent loss.
- Backup export can restore successfully in a clean browser profile.
- Automated tests and production build pass in CI.
- Production uses base-relative PWA assets and navigation fallback.
- Offline reload is supported after the first successful visit.

## Evidence

- `tests/storage.test.js`
- `tests/backup.test.js`
- `tests/release-smoke.test.js`
- `docs/RELEASING.md`
- Pull-request CI and production Pages deployment
