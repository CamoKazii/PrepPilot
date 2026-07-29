# Phase 4 Accounts, Cloud Sync and Data Portability Implementation Plan

**Status:** Complete in v1.4.0  
**Provider:** Optional Supabase adapter behind a deployment feature flag  
**Goal:** Add optional secure cross-device use without removing local-first operation.

## Global constraints satisfied

- Local-only mode remains fully supported and is the default.
- Conflicting versions are preserved until an explicit user choice.
- Full account export and cloud-account deletion are available.
- No privileged credential is shipped in the browser bundle.
- Nutrition, planning, pantry and shopping logic remain independent of authentication.

## Completed Task 1: Repository contracts

Implemented under `src/data/repositories/`:

- CRUD, list, subscription and transaction-compatible local adapter;
- stable collection/key IDs;
- record versions and timestamps;
- deletion tombstones;
- validation and migration tests.

## Completed Task 2: Authentication and profile

- Supabase was selected and documented in `docs/architecture/ADR-0001-cloud-provider.md`.
- Passwordless email authentication, sign-out and persisted sessions are supported when configured.
- Local data remains accessible before, during and after authentication.
- First sign-in requires an explicit merge, use-cloud or replace-cloud decision.

## Completed Task 3: Remote data model and authorization

`supabase/migrations/20260729_phase4.sql` defines:

- user-scoped versioned records;
- indexes by user and collection;
- row-level-security policies for read, insert, update and delete;
- optimistic concurrency through `apply_user_record`;
- consent and integration tables;
- account deletion function.

Cross-user access is prohibited by `auth.uid() = user_id` policies. Deployment verification steps are documented because a live Supabase project is external to the repository.

## Completed Task 4: Offline mutation queue

Implemented under `src/data/sync/queue.js`:

- idempotent create, update and delete operation IDs;
- pending, retrying and stuck states;
- bounded exponential backoff;
- visible queue and error state;
- successful operation removal without duplication.

## Completed Task 5: Conflict detection and resolution

- Record versions detect concurrent edits without trusting client clocks.
- Independent fields merge deterministically.
- Overlapping edits preserve both local and cloud versions.
- The account UI presents side-by-side JSON records with explicit local/cloud selection.
- Two-device, repeated reconnect and clock-skew scenarios are covered by tests.

## Completed Task 6: Data portability and privacy

- Documented account-export format includes all user records, profile metadata, consent history and integrations.
- Import validates and previews record, collection, update and conflict counts.
- Cloud-account deletion triggers a final export and clearly retains local browser data.
- Integration disconnect and consent history are visible in the account UI.

## Completed Task 7: Observability and security review

- Sync health exposes queued operations, unresolved conflicts and last reconciliation time.
- Structured errors distinguish safe sync failure and version conflicts.
- CI checks route wiring, RLS migration content and absence of service-role references in client code.
- Threat review and incident recovery are documented in `docs/SECURITY_REVIEW_PHASE4.md` and `docs/PRIVACY_AND_SYNC.md`.

## Completed Task 8: Release validation

- Two-device offline create, reconnect, conflict preservation and recovery tests added.
- Local-only mode has a no-provider regression test.
- Cloud capability is behind `VITE_ENABLE_CLOUD_SYNC`.
- GitHub Pages accepts optional Supabase repository variables.
- Storage schema advanced to v5 and prior backup versions remain importable.
- Roadmap, privacy guidance and deployment instructions updated.

## Acceptance criteria

- Offline-created records synchronize without duplication: covered by `test/phase4-sync.test.js`.
- Conflicts never cause silent record loss: both versions are preserved and surfaced.
- A full export can populate a clean local account and then be merged into cloud storage.
- Local-only mode works without authentication, provider configuration or network access.

## Operational activation

The code path is complete but intentionally disabled in the public deployment until a Supabase project is provisioned. To activate it, apply the committed migration, configure approved authentication redirect URLs and set the three documented GitHub Pages variables. This external provisioning step does not affect local-only functionality.
