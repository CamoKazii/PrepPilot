# Phase 6 Garmin, Progress and Health Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans.

**Goal:** Connect planning to training demand and measured progress while preserving manual control and privacy.

**Architecture:** External integrations write normalized activity and measurement records through adapters. Planning consumes those records through stable domain interfaces and always supports manual entry.

**Tech Stack:** React, secure backend integration adapters, official provider APIs where available, deterministic trend and target logic.

## Global Constraints

- Use official or explicitly permitted APIs and export mechanisms.
- Manual entry remains available when integrations fail.
- Imported records show source and timestamp.
- Suggestions are advisory, not medical treatment.

### Task 1: Integration architecture decision

- Document officially supported Garmin connection options, authorization model, rate limits and data availability.
- Select an approach only after confirming terms and feasibility.
- Define a provider-neutral activity adapter.
- Add a manual activity adapter as the baseline implementation.

### Task 2: Activity model

**Files:** Create `src/domain/training/activity.js`, repository and tests.

- Store date/time, type, duration, distance, intensity, source and source ID.
- Normalize easy, quality, long-run, futsal and other activities.
- Prevent duplicate imports through provider/source IDs.
- Allow user correction without altering the original imported record silently.

### Task 3: Calendar integration

- Overlay planned and completed training on the meal planner.
- Derive suggested day type from activity data but require user confirmation when ambiguous.
- Handle moved, cancelled and duplicated sessions.
- Preserve historical plan context.

### Task 4: Weight and progress model

**Files:** Create `src/domain/progress/`, tests and feature screens.

- Store timestamped weight measurements and source.
- Calculate rolling averages and weekly change.
- Compare observed trend with the 0.3–0.4 kg/week target range.
- Avoid reacting to single-day fluctuations.
- Support manual, imported and corrected measurements.

### Task 5: Training-aware suggestions

- Use day type, duration and recent load to suggest carbohydrate timing ranges.
- Keep base daily targets and adjustments visible.
- Explain uncertainty and avoid automatic target changes.
- Never reduce protein below the configured floor.

### Task 6: Weekly review

- Summarize plan adherence, completed training, weight trend and recurring macro gaps.
- Separate observed facts from suggestions.
- Allow notes for sleep, soreness, energy and recovery without diagnosing causes.

### Task 7: Privacy and disconnect

- Show connected providers, permissions and last sync.
- Support disconnect and deletion of imported records.
- Document retention and provider revocation behaviour.
- Test authorization expiry and revoked access.

### Task 8: Release validation

- Test manual-only use, successful sync, duplicate imports, outages and disconnect.
- Verify no integration failure blocks planner access.
- Roll out behind feature flags.
- Update roadmap and privacy documentation.

## Acceptance Criteria

- Imported records are attributable and deduplicated.
- Manual planning remains fully functional without providers.
- Trend summaries use rolling averages.
- Nutrition adjustments remain transparent, reversible and advisory.
