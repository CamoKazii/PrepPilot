# ADR-0001: Optional Supabase cloud provider

**Status:** Accepted for Phase 4

PrepPilot remains a local-first static PWA. Optional cross-device sync uses Supabase Auth and Postgres because it provides passwordless authentication, row-level security, migrations and a browser-safe anonymous key without shipping privileged credentials.

Cloud support is compiled only when `VITE_ENABLE_CLOUD_SYNC=true`, `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are supplied. The anonymous key is not privileged; authorization is enforced by Postgres row-level-security policies. Service-role credentials must never be placed in GitHub Pages variables or the browser bundle.

Local-only mode is the default and remains permanently supported. The repository and sync engines are provider-independent so the adapter may be replaced without changing nutrition, planning or pantry domain logic.
