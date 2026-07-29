# Privacy, Sync and Recovery

PrepPilot is local-first. Without cloud configuration or sign-in, all user-owned records remain in the current browser profile and the app continues to work offline.

## Enabling cloud sync

1. Create a Supabase project.
2. Apply `supabase/migrations/20260729_phase4.sql`.
3. Configure the production redirect URL for the GitHub Pages address.
4. Set build variables `VITE_ENABLE_CLOUD_SYNC=true`, `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
5. Never expose a service-role key.

## First sign-in

Existing local data must be handled through an explicit merge or replace choice. Overlapping concurrent edits preserve both versions for resolution. Independent fields may be merged deterministically.

## Offline behaviour

Writes remain local and create idempotent queued operations. Retries use bounded exponential backoff. Rejected operations become visible as stuck rather than being discarded.

## Export and deletion

Account export contains profile metadata, all versioned records, consent history and integration state. Account deletion removes cloud records and the Supabase authentication account. Local browser data remains until the user separately clears it, preventing accidental loss.

## Incident recovery

Disable `VITE_ENABLE_CLOUD_SYNC`, redeploy the local-only build, export browser data, inspect stuck operations and conflicts, then restore provider service. Do not clear local data as part of routine sync recovery.
