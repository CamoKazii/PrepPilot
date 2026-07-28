const UNIT_TO_BASE = {
  g: { unit: 'g', factor: 1 },
  kg: { unit: 'g', factor: 1000 },
  mL: { unit: 'mL', factor: 1 },
  L: { unit: 'mL', factor: 1000 },
};

const SECTION_RULES = [
  ['Meat & protein', /chicken|beef|lamb|bacon|egg/i],
  ['Dairy & chilled', /milk|yoghurt|cream|butter|cheese|feta/i],
  ['Fruit & vegetables', /apple|pear|mandarin|strawberr|potato|pumpkin|carrot|broccoli|spinach|leek|mushroom|cabbage|onion|corn|peas|beans|garlic|ginger|lemon/i],
  ['Bakery', /bread|pastry/i],
  ['Pantry', /oats|rice|barley|flour|noodle|stock|soy|oil|honey|sugar|mustard|sauce|spice|paprika|cinnamon|thyme|oregano|whey|protein|chia|walnut|peanut|sesame|curry|cornflour/i],
];

export function sectionForIngredient(name) {
  return SECTION_RULES.find(([, pattern]) => pattern.test(name))?.[0] || 'Other';
}

export function parseQuantity(value) {
  const match = String(value).trim().match(/^(\d+(?:\.\d+)?)\s*(kg|g|mL|L)$/);
  if (!match) return null;
  return { amount: Number(match[1]), unit: match[2] };
}

function formatQuantity(baseAmount, baseUnit) {
  if (baseUnit === 'g' && baseAmount >= 1000) {
    return `${Number((baseAmount / 1000).toFixed(2))} kg`;
  }
  if (baseUnit === 'mL' && baseAmount >= 1000) {
    return `${Number((baseAmount / 1000).toFixed(2))} L`;
  }
  return `${Number(baseAmount.toFixed(1))} ${baseUnit}`;
}

export function consolidateIngredients(selectedRecipes) {
  const grouped = new Map();
  const loose = [];

  for (const recipe of selectedRecipes) {
    for (const [name, quantity] of recipe.ingredients || []) {
      const parsed = parseQuantity(quantity);
      if (!parsed || !UNIT_TO_BASE[parsed.unit]) {
        loose.push({ name, quantity, section: sectionForIngredient(name) });
        continue;
      }
      const conversion = UNIT_TO_BASE[parsed.unit];
      const key = `${name.toLowerCase()}::${conversion.unit}`;
      const current = grouped.get(key) || { name, amount: 0, unit: conversion.unit };
      current.amount += parsed.amount * conversion.factor;
      grouped.set(key, current);
    }
  }

  return [
    ...Array.from(grouped.values()).map(item => ({
      name: item.name,
      quantity: formatQuantity(item.amount, item.unit),
      section: sectionForIngredient(item.name),
    })),
    ...loose,
  ].sort((a, b) => a.section.localeCompare(b.section) || a.name.localeCompare(b.name));
}

export function plannedRecipeIds(plan) {
  return Array.from(new Set(Object.values(plan).filter(Boolean)));
}

export function calculateDayTotals(ids, recipes) {
  const byId = new Map(recipes.map(recipe => [recipe.id, recipe]));
  return ids.reduce((total, id) => {
    const recipe = byId.get(id);
    if (!recipe) return total;
    total.calories += recipe.calories;
    total.protein += recipe.protein;
    total.carbs += recipe.carbs;
    total.fat += recipe.fat;
    total.meals += 1;
    return total;
  }, { calories: 0, protein: 0, carbs: 0, fat: 0, meals: 0 });
}

export function calculateWeekSummary(plan, recipes, days, meals) {
  const complete = days.map(day => meals.map(meal => plan[`${day}-${meal}`]).filter(Boolean))
    .filter(ids => ids.length === meals.length)
    .map(ids => calculateDayTotals(ids, recipes));

  if (!complete.length) {
    return { completeDays: 0, averages: { calories: 0, protein: 0, carbs: 0, fat: 0 } };
  }

  const totals = complete.reduce((sum, day) => ({
    calories: sum.calories + day.calories,
    protein: sum.protein + day.protein,
    carbs: sum.carbs + day.carbs,
    fat: sum.fat + day.fat,
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  return {
    completeDays: complete.length,
    averages: Object.fromEntries(Object.entries(totals).map(([key, value]) => [key, Number((value / complete.length).toFixed(1))])),
  };
}
