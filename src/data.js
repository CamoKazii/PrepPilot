import { breakfastRecipes } from './recipes/breakfast';
import { lunchRecipes } from './recipes/lunch';
import { dinnerRecipes } from './recipes/dinner';
import { weeklyRecipes202608 } from './recipes/weekly-2026-08';

export const targets = { calories: 2150, protein: 160, carbs: 210, fat: 70 };

export const recipes = [...breakfastRecipes, ...lunchRecipes, ...dinnerRecipes, ...weeklyRecipes202608];

export const bySlug = (slug) => recipes.find((recipe) => recipe.slug === slug);
