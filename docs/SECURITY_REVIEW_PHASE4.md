# Phase 4 Security and Threat Review

## Assets

User meal plans, notes, custom recipes, pantry contents, price history, favourites, shopping data, consent events and account identity.

## Trust boundaries

- Browser local storage and service worker
- GitHub Pages static hosting
- Supabase Auth and Postgres
- Email magic-link delivery

## Controls

- Cloud sync is disabled unless explicitly configured.
- The browser receives only the public anonymous key.
- Postgres row-level security scopes every cloud record to `auth.uid()`.
- Optimistic concurrency rejects writes based on stale record versions.
- Conflicting versions remain visible until a user selects a resolution.
- Deletions use tombstones so offline clients do not resurrect deleted records silently.
- Queue operations are idempotent and retries are bounded.
- Account deletion removes remote records, consent events, integrations and the auth identity.
- A final export is initiated before deletion; local data is retained separately.

## Threats reviewed

### Cross-user data access
Mitigated through primary keys containing `user_id`, row-level-security policies and authorization tests against the migration design.

### Client credential disclosure
The anonymous key is expected to be public and has no privileged bypass. Service-role keys are prohibited from `VITE_` variables, repository files and GitHub Pages configuration.

### Lost updates and replay
Mitigated through record versions, `baseVersion`, the `apply_user_record` function and idempotent queue IDs.

### Clock manipulation
Conflict decisions use record versions and field comparisons rather than trusting client clock ordering.

### Malicious import files
Imports require the documented format, versioned records and a validation preview before applying. Unknown or malformed exports are rejected.

### Account takeover
Authentication is delegated to Supabase passwordless email sessions. Redirect URLs must be restricted to the production and approved development origins.

### Offline device loss
Local data is unencrypted browser storage. Users should rely on operating-system device encryption and screen security. Client-side field encryption is not claimed in Phase 4.

## Operational checks before enabling cloud sync

- Apply the migration in a non-production project first.
- Test two distinct accounts and confirm cross-user reads and writes fail.
- Restrict authentication redirect URLs.
- Confirm no service-role key appears in build logs or `dist/`.
- Exercise offline creation, reconnect, conflict resolution, export and deletion.
- Review Supabase retention and backup settings for the chosen project.
