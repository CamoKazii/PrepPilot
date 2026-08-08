import test from 'node:test';
import assert from 'node:assert/strict';
import { weeklyRecipes202608 } from '../src/recipes/weekly-2026-08.js';

const byId = Object.fromEntries(weeklyRecipes202608.map(recipe => [recipe.id, recipe]));

function close(actual, expected, tolerance = 0.11) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} was not within ${tolerance} of ${expected}`);
}

test('August Brisbane week exports the three selected five-serving recipes', () => {
  assert.deepEqual(weeklyRecipes202608.map(recipe => recipe.id), ['B6', 'L16', 'D6']);
  for (const recipe of weeklyRecipes202608) {
    assert.equal(recipe.servings, 5);
    assert.equal(recipe.status, 'Ingredient-verified macros');
    assert.ok(recipe.ingredients.length >= 10);
    assert.ok(recipe.method.length >= 5);
  }
});

test('per-serving macros equal batch totals divided by five', () => {
  for (const recipe of weeklyRecipes202608) {
    close(recipe.calories, recipe.batchMacros.calories / recipe.servings);
    close(recipe.protein, recipe.batchMacros.protein / recipe.servings);
    close(recipe.carbs, recipe.batchMacros.carbs / recipe.servings);
    close(recipe.fat, recipe.batchMacros.fat / recipe.servings);
  }
});

test('selected breakfast lunch and dinner fit the base daily tolerances', () => {
  const totals = ['B6', 'L16', 'D6'].reduce((sum, id) => ({
    calories: sum.calories + byId[id].calories,
    protein: sum.protein + byId[id].protein,
    carbs: sum.carbs + byId[id].carbs,
    fat: sum.fat + byId[id].fat,
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  assert.ok(Math.abs(totals.calories - 2150) <= 75);
  assert.ok(totals.protein >= 160);
  assert.ok(Math.abs(totals.carbs - 210) <= 15);
  assert.ok(Math.abs(totals.fat - 70) <= 7);
});

test('each recipe calorie reconciliation remains within five percent', () => {
  for (const recipe of weeklyRecipes202608) {
    const macroCalories = recipe.batchMacros.protein * 4 + recipe.batchMacros.carbs * 4 + recipe.batchMacros.fat * 9;
    const difference = Math.abs(recipe.batchMacros.calories - macroCalories) / recipe.batchMacros.calories;
    assert.ok(difference <= 0.05, `${recipe.id} reconciliation was ${(difference * 100).toFixed(1)}%`);
  }
});
