# ADR 0003 — Garmin integration through the official Connect Developer Program

## Status
Accepted for Phase 6.

## Decision
PrepPilot will integrate Garmin data only through the official Garmin Connect Developer Program Activity API and, where approved, relevant Health API data. The integration is cloud-to-cloud, uses OAuth 2.0 and requires Garmin approval before production access. Browser code talks only to a PrepPilot-controlled HTTPS gateway; Garmin client secrets and refresh tokens never enter the PWA bundle.

Manual activity and weight entry are the baseline and remain available permanently. Imported records are normalized into provider-neutral records with source, source ID, import timestamp and correction history. Duplicate imports are rejected using provider/source identity.

## Consequences
- Live Garmin sync remains disabled until program approval, credentials and a secure gateway exist.
- No scraping, undocumented Garmin Connect endpoints or credential sharing is permitted.
- Revoked or expired authorization cannot block the planner.
- Disconnect removes imported Garmin records when requested but retains manual records.
- Source timestamps and last-sync state remain visible.

## Data scope
Request only the minimum records required for training-aware planning: activity type, start time, duration, distance and intensity indicators. Weight/body-composition data is requested only when separately approved and explicitly consented.

## Rate limits and backfill
Exact production quotas and backfill limits are provider-assigned during Garmin approval. The adapter therefore uses cursors, deduplication and bounded polling rather than assuming fixed public limits.
