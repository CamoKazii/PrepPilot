import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parseQuantity,
  consolidateIngredients,
  plannedRecipeIds,
  calculateDayTotals,
  calculateWeekSummary,
} from '../src/lib/planning.js';

const recipes = [
  { id: 'B1', calories: 500, protein: 40, carbs: 60, fat: 15, ingredients: [['Rolled oats', '250 g'], ['Light milk', '450 mL']] },
  { id: 'L1', calories: 700, protein: 60, carbs: 70, fat: 20, ingredients: [['Rolled oats', '100 g'], ['Chicken breast', '1 kg']] },
  { id: 'D1', calories: 900, protein: 65, carbs: 80, fat: 35, ingredients: [['Chicken breast', '500 g'], ['Lemon juice', '60 mL']] },
];

test('parseQuantity recognises simple Australian metric quantities', () => {
  assert.deepEqual(parseQuantity('250 g'), { amount: 250, unit: 'g' });
  assert.deepEqual(parseQuantity('1.5 kg'), { amount: 1.5, unit: 'kg' });
  assert.deepEqual(parseQuantity('450 mL'), { amount: 450, unit: 'mL' });
  assert.equal(parseQuantity('2 large'), null);
});

test('consolidateIngredients combines compatible units and preserves incompatible rows', () => {
  const result = consolidateIngredients(recipes);
  assert.deepEqual(result.find(item => item.name === 'Rolled oats'), { name: 'Rolled oats', quantity: '350 g', section: 'Pantry' });
  assert.deepEqual(result.find(item => item.name === 'Chicken breast'), { name: 'Chicken breast', quantity: '1.5 kg', section: 'Meat & protein' });
  assert.deepEqual(result.find(item => item.name === 'Light milk'), { name: 'Light milk', quantity: '450 mL', section: 'Dairy & chilled' });
});

test('plannedRecipeIds returns unique non-empty ids in planner order', () => {
  assert.deepEqual(plannedRecipeIds({ 'Monday-Breakfast': 'B1', 'Monday-Lunch': 'L1', 'Tuesday-Breakfast': 'B1', 'Tuesday-Dinner': null }), ['B1', 'L1']);
});

test('calculateDayTotals sums selected recipes', () => {
  assert.deepEqual(calculateDayTotals(['B1', 'L1'], recipes), { calories: 1200, protein: 100, carbs: 130, fat: 35, meals: 2 });
});

test('calculateWeekSummary averages only complete days', () => {
  const plan = {
    'Monday-Breakfast': 'B1', 'Monday-Lunch': 'L1', 'Monday-Dinner': 'D1',
    'Tuesday-Breakfast': 'B1', 'Tuesday-Lunch': 'L1',
  };
  assert.deepEqual(calculateWeekSummary(plan, recipes, ['Monday', 'Tuesday'], ['Breakfast', 'Lunch', 'Dinner']), {
    completeDays: 1,
    averages: { calories: 2100, protein: 165, carbs: 210, fat: 70 },
  });
});
