# Phase 6 Garmin, Progress and Health Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans.

**Status:** Implemented in v1.6.0.

**Goal:** Connect planning to training demand and measured progress while preserving manual control and privacy.

**Architecture:** External integrations write normalized activity and measurement records through adapters. Planning consumes those records through stable domain interfaces and always supports manual entry.

**Tech Stack:** React, secure backend integration adapters, official provider APIs where available, deterministic trend and target logic.

## Global Constraints

- Use official or explicitly permitted APIs and export mechanisms.
- Manual entry remains available when integrations fail.
- Imported records show source and timestamp.
- Suggestions are advisory, not medical treatment.

### Task 1: Integration architecture decision — Complete

- Official Garmin Connect Developer Program Activity API selected.
- OAuth 2.0 cloud-to-cloud gateway documented in ADR 0003.
- Provider-neutral and manual baselines implemented.

### Task 2: Activity model — Complete

- Stores date/time, type, duration, distance, intensity, status, source and source ID.
- Normalizes easy, quality, long-run, futsal and other activities.
- Deduplicates imports and preserves original records through corrections.

### Task 3: Calendar integration — Complete

- Planner overlays planned and completed training.
- Day-type suggestions require explicit confirmation.
- Cancelled records do not change planning; source history remains retained.

### Task 4: Weight and progress model — Complete

- Timestamped manual/imported measurements.
- Seven-day rolling averages and weekly change.
- Comparison with the 0.3–0.4 kg/week target range without reacting to one measurement.

### Task 5: Training-aware suggestions — Complete

- Advisory carbohydrate ranges use day type, duration and recent load.
- Base target and shift remain visible.
- Protein floor remains at least 160 g/day.

### Task 6: Weekly review — Complete

- Observed sessions, minutes, rolling weight trend and recurring gaps remain facts.
- Suggestions are displayed separately.
- Sleep, soreness, energy and recovery notes are supported without diagnosis.

### Task 7: Privacy and disconnect — Complete

- Provider, permissions boundary and last-sync state are visible.
- Disconnect removes imported Garmin records while preserving manual records.
- Retention and provider revocation behaviour are documented.

### Task 8: Release validation — Complete

- Manual-only, duplicate imports, outages, disconnect, rolling averages and advisory guidance are covered by tests.
- Garmin remains behind deployment feature flags.
- Storage schema advanced to v7.

## Acceptance Criteria

- Imported records are attributable and deduplicated — met.
- Manual planning remains fully functional without providers — met.
- Trend summaries use rolling averages — met.
- Nutrition adjustments remain transparent, reversible and advisory — met.

## External activation

Live Garmin operation still requires Garmin Connect Developer Program approval and deployment of the documented OAuth 2.0 gateway. The production PWA remains fully functional without it.
