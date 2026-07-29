# PrepPilot AI Assistant

PrepPilot treats AI as a proposal layer. Deterministic nutrition, recipe validation and user approval remain authoritative.

## Deployment

The static GitHub Pages build must never contain an AI-provider secret. Deploy `server/ai-gateway/handler.js` or an equivalent HTTPS service on a server platform, store provider credentials there, restrict allowed origins to the PrepPilot site and then configure:

- `VITE_ENABLE_AI=true`
- `VITE_AI_GATEWAY_URL=https://your-secure-gateway.example.com`

Without those values, the AI Assistant route remains useful through deterministic local candidate generation.

## Contracts

The gateway exposes:

- `POST /v1/plan`
- `POST /v1/snacks`
- `POST /v1/recipe-draft`
- `POST /v1/audit`

Responses are validated in the browser before display or use. Invalid recipe IDs, malformed quantities, unsupported snack IDs, self-assigned verification states and prompt-control language are rejected.

## Authoritative workflow

1. AI returns multiple structured proposals.
2. PrepPilot recalculates each proposal from stored recipe macros.
3. Protein compliance and target differences are evaluated deterministically.
4. The user reviews reasons, assumptions and unresolved constraints.
5. Only an explicit Apply action changes selected planner days.

AI recipe output enters the recipe engine as a draft. It cannot receive ingredient-verified status. AI explanations may describe deterministic failures, but may not change calculated figures or blocking status.

## Data minimisation

Plan requests contain targets, day types, declared constraints and selected recipe metadata. Account identifiers, email, detailed health history and provider credentials are excluded. Applied proposal history stores timestamp, proposal ID, selected days and provider/model/version metadata for reproducibility.

## Safety and evaluation

Automated fixtures cover malformed output, unknown recipe IDs, impossible targets, protein-floor failures, unverified snacks, verification-label bypass attempts, prompt injection and AI-unavailable fallback. Release checks must continue to run the entire local-only regression suite.
