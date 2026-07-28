# Phase 4 Accounts, Cloud Sync and Data Portability Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans.

**Goal:** Add optional secure cross-device use without removing local-first operation.

**Architecture:** Introduce repository interfaces and a sync engine before selecting a hosted backend. Local repositories remain authoritative while offline; remote adapters synchronize versioned records through an explicit queue and conflict policy.

**Tech Stack:** React, service worker, selected authentication/backend provider, encrypted HTTPS APIs, automated integration tests.

## Global Constraints

- Local-only mode remains fully supported.
- No silent conflict resolution that discards user data.
- Account deletion and full export are mandatory.
- Secrets and privileged credentials never ship in the browser bundle.

### Task 1: Repository contracts

**Files:** Create interfaces/adapters under `src/data/repositories/`, tests.

- Define CRUD, list, subscribe and transaction interfaces for user-owned entities.
- Wrap existing local persistence behind these contracts.
- Add stable IDs, record versions, timestamps and deletion tombstones.
- Verify existing functionality through local adapters before adding remote code.

### Task 2: Authentication and profile

- Select provider through an architecture decision record.
- Implement sign-up/sign-in, sign-out, session expiry and passwordless/social options as supported.
- Keep local data accessible before authentication.
- Offer explicit merge or replace choices when a user first signs in with existing local data.

### Task 3: Remote data model and authorization

- Define user-scoped storage for recipes, plans, shopping, notes, favourites, pantry, prices and settings.
- Enforce server-side authorization per record.
- Add schema migrations and indexes.
- Test cross-user access denial.

### Task 4: Offline mutation queue

**Files:** Create `src/data/sync/queue.js`, adapters and tests.

- Queue create/update/delete operations while offline.
- Retry with bounded backoff.
- Make operations idempotent.
- Surface stuck or rejected operations to the user.

### Task 5: Conflict detection and resolution

- Detect concurrent edits through record versions.
- Auto-merge only independent fields with deterministic rules.
- Present side-by-side choices for overlapping edits.
- Preserve both versions until resolution.
- Test clock skew and repeated reconnects.

### Task 6: Data portability and privacy

- Export all account data in documented JSON.
- Import to a new account with validation preview.
- Implement account deletion with clear retention behaviour.
- Add integration disconnect and consent history.

### Task 7: Observability and security review

- Add privacy-safe sync health metrics and structured errors.
- Run dependency, authorization and client-secret checks.
- Document incident and recovery procedure.
- Conduct manual threat review before release.

### Task 8: Release validation

- E2E test two devices, offline edits, reconnect, conflict and recovery.
- Verify local-only regression suite.
- Roll out behind a feature flag.
- Update roadmap, privacy documentation and support guidance.

## Acceptance Criteria

- Offline-created records synchronize without duplication.
- Conflicts never cause silent record loss.
- A full export restores a clean account.
- Local-only mode remains usable without authentication or network access.
