# Pantry, Shopping and Cost Guide

PrepPilot v1.3.0 keeps inventory, purchasing and price observations separate so recommendations remain transparent.

## Pantry records

Each pantry item stores its name, quantity, unit, state, preferred brand, opened status, purchase date, expiry date, archive state and movement history. Supported movements are add, consume, adjust, discard and archive. Expiry warnings are advisory and never block use.

## Ingredient identity

Shopping identities include canonical name plus material state, brand and variant. Dry and cooked foods, drained and undrained products, or intentionally different brands do not merge silently. Aliases must be deliberately approved.

## Pantry-aware purchases

For each compatible item the shopping engine displays:

`gross recipe requirement − pantry deduction = net purchase quantity`

Deductions never create negative quantities and can be disabled per identity. Unsupported or incompatible units remain visible with a warning and no automatic deduction.

## Manual and recurring items

Non-recipe purchases can be added manually. Items marked recurring return to generated lists, while check state remains keyed to stable item identity.

## Package recommendations

Available package options are evaluated for sufficient quantity. The deterministic optimiser first minimises excess, then estimated cost. It never changes brand or product without an explicit selection. Excess is shown as expected leftover.

## AUD price observations

Price records store AUD price, package size, retailer, source/reference and observation date. Calculations report known, estimated, stale and missing coverage. Records older than 30 days display as stale rather than current.

## Waste and leftovers

Discard movements create waste events. Quantity and estimated AUD cost can be summarised from applicable dated price records. Pantry-first suggestions rank recipes by deterministic ingredient-name matches; they are opportunities, not automatic substitutions.

## Backup and recovery

Storage schema v4 includes pantry, aliases, manual items, recurring items, aisle order, price records, package options, waste logs and deduction overrides. These records are included automatically in PrepPilot JSON backups.