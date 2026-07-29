# Recipe Authoring and Verification

PrepPilot v1.2.0 keeps built-in audited recipes immutable and stores custom recipes separately in browser-local versioned records.

## Workflow

1. Open **Recipe engine**.
2. Enter identity, meal type, servings and equipment.
3. Add every caloric ingredient from the normalized catalogue using the state and nutrition basis shown.
4. Add method, storage, reheating, intended texture and doneness cues.
5. For baked recipes, enter pan dimensions, material, oven mode and expected batter depth.
6. Review the ingredient-by-ingredient audit table and calorie reconciliation.
7. Resolve culinary warnings in writing and approve the culinary review.
8. Publish only when no blocking issue remains.

## Verification rules

- Per-serving values always equal batch totals divided by the stated serving count.
- Ingredient state must match the catalogue state.
- Unknown products, missing quantities, missing assumptions and incompatible units block calculation.
- A calorie-versus-macro discrepancy above 5% blocks publication.
- A substitution creates a new draft version, records the prior and replacement product, and invalidates verification.
- Built-in recipes are migrated as immutable historical verified records without changing their displayed macros.

## Backups

Custom recipes and their version histories are included in standard PrepPilot JSON backups. Storage schema v3 can import Phase 0 and Phase 1 backups; missing custom recipe data is initialized safely.

## Rollback

Open a saved custom recipe and use **Rollback** to create a new draft from a historical version. Historical verified records are preserved rather than overwritten.
