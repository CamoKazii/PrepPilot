# PrepPilot Product Completion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Turn the recipe catalogue prototype into a practical local-first meal-planning app that can produce a consolidated grocery list and retain personal planning state.

**Architecture:** Keep the existing React/Vite PWA and localStorage model. Extract deterministic planning and shopping calculations into pure JavaScript utilities with Node's built-in test runner, then consume those utilities from the React UI. No backend, login or paid services are introduced.

**Tech Stack:** React, React Router, Vite, JavaScript ES modules, Node test runner, GitHub Actions, GitHub Pages.

## Global Constraints

- Retain all 16 ingredient-audited recipes and their displayed macro values.
- Use Australian metric quantities and en-AU number formatting.
- Persist planner, favourites, notes and shopping state locally on the device.
- Do not claim unlike ingredient units can be combined.
- Keep GitHub Pages compatibility under `/PrepPilot/`.

---

### Task 1: Pure planning and shopping utilities

**Files:**
- Create: `src/lib/planning.js`
- Create: `test/planning.test.js`
- Modify: `package.json`

**Interfaces:**
- Produces `parseQuantity`, `consolidateIngredients`, `plannedRecipeIds`, `calculateDayTotals`, `calculateWeekSummary`.

- [ ] Write tests for quantity parsing, safe consolidation, planner recipe extraction and macro summaries.
- [ ] Run `npm test` and verify the new tests fail before implementation.
- [ ] Implement the minimal pure functions.
- [ ] Run `npm test` and verify all tests pass.
- [ ] Commit the utility layer.

### Task 2: Smart shopping workflow

**Files:**
- Modify: `src/main.jsx`
- Modify: `src/styles.css`

**Interfaces:**
- Consumes `consolidateIngredients` and `plannedRecipeIds`.
- Produces planner-to-shopping actions, consolidated grocery rows and persistent checked state.

- [ ] Add an action that builds the shopping list from the current planner.
- [ ] Consolidate only identical ingredient names with compatible units.
- [ ] Group ingredients into practical supermarket sections.
- [ ] Persist checked grocery rows and provide clear/reset controls.
- [ ] Verify with `npm test` and `npm run build`.

### Task 3: Personal recipe layer

**Files:**
- Modify: `src/main.jsx`
- Modify: `src/styles.css`

**Interfaces:**
- Produces local favourites and per-recipe notes.

- [ ] Add favourite toggles to cards and recipe pages.
- [ ] Add a favourites filter to the recipe library.
- [ ] Add a persistent notes field to each recipe page.
- [ ] Verify localStorage fallback behaviour and build output.

### Task 4: Week-level nutrition dashboard

**Files:**
- Modify: `src/main.jsx`
- Modify: `src/styles.css`

**Interfaces:**
- Consumes `calculateDayTotals` and `calculateWeekSummary`.
- Produces daily variance indicators and weekly averages.

- [ ] Show complete-day averages for calories, protein, carbohydrate and fat.
- [ ] Show target differences using the current project tolerances.
- [ ] Add one-click copy controls for repeating meal-prep days.
- [ ] Verify tests and production build.

### Task 5: CI and documentation

**Files:**
- Modify: `.github/workflows/preppilot.yml`
- Modify: `README.md`

- [ ] Run tests before the production build in GitHub Actions.
- [ ] Document setup, deployment, local development and app data behaviour.
- [ ] Verify the pull-request workflow succeeds.
