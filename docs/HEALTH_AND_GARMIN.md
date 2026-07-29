# Training, progress and Garmin operations

PrepPilot's training and progress features are local-first. Activities, measurements and recovery notes can always be entered manually and remain available without an account, network or external provider.

## Garmin activation

1. Obtain approval for the Garmin Connect Developer Program.
2. Deploy a server-side OAuth 2.0 gateway implementing the adapter contract in `src/data/integrations/garmin.js`.
3. Store Garmin client credentials and user tokens only on that server.
4. Configure the approved callback and origin.
5. Set `VITE_ENABLE_GARMIN=true` and `VITE_GARMIN_GATEWAY_URL` in the deployment environment.
6. Test two users, authorization expiry, revocation, duplicate backfill and provider outage before enabling broadly.

## Record attribution

Every imported activity and measurement stores its provider, provider record ID and import timestamp. User corrections retain the original record rather than silently rewriting provenance.

## Disconnect and deletion

Disconnecting Garmin stops future access and removes imported Garmin records from the browser when requested. Manual records remain. Provider-side authorization should also be revoked through the gateway and Garmin account controls. Account exports include health records unless the user deletes them first.

## Guidance limits

Weight trends use rolling averages and do not react to isolated measurements. Carbohydrate guidance is advisory, shows the unchanged base target and never lowers the 160 g protein floor. Recovery notes capture sleep, soreness, energy and context but do not diagnose causes or provide medical treatment.

## Incident handling

If provider authorization expires or the gateway fails, show the error, preserve existing records and continue in manual mode. Never retry indefinitely, expose tokens, or block planner access.
