export const targets = { calories: 2150, protein: 160, carbs: 210, fat: 70 };

const full = {
  B1: {
    description: 'Soft, sliceable baked oats with defined apple pieces and a lightly crisp crumble.',
    prep: '20 min',
    cook: '34–40 min',
    equipment: '30 × 20 cm light-coloured metal baking tin; saucepan; mixing bowl',
    ingredients: [
      ['Rolled oats', '250 g'], ['Vanilla whey protein', '145 g'], ['Light milk', '450 mL'],
      ['Whole egg, without shell', '150 g'], ['Apple, edible portion', '500 g'],
      ['High-protein plain yoghurt', '400 g'], ['Walnuts', '25 g'], ['Honey', '20 g'],
      ['Butter', '10 g'], ['Baking powder', '10 g'], ['Ground cinnamon', '8 g'],
      ['Vanilla extract', '10 mL'],
    ],
    method: [
      'Heat oven to 180°C fan-forced. Line the tin. Dice 350 g apple; grate the remaining 150 g.',
      'Melt butter in a small pan. Cook diced apple with half the cinnamon for 5–6 minutes until just flexible.',
      'Mix oats, 110 g whey, baking powder and remaining cinnamon. Whisk milk, eggs, grated apple and vanilla separately, combine, then rest 8 minutes.',
      'Fold through cooked apple. Spread 2.5–3 cm deep in the tin. Mix walnuts with honey and scatter over.',
      'Bake 34–40 minutes until the centre springs back gently and a skewer shows no wet batter.',
      'Cool 20 minutes and cut into five. Mix remaining whey into yoghurt with 20–30 mL water and divide as a cold topping.',
    ],
    storage: 'Refrigerate bake and topping separately for up to 5 days. Freeze the bake only for up to 2 months.',
    reheat: 'Microwave 75–100 seconds at 70% power. Add topping after heating.',
    upgrade: 'Warm the apple with lemon peel; finish with flaky salt.',
    assumption: 'Whey profile 392 kcal/76 P/8 C/6 F per 100 g; high-protein yoghurt 62 kcal/10 P/4 C/0.3 F. Brand changes require recalculation.',
  },
  B2: {
    description: 'Roasted potato and bacon held in a tender egg matrix; sliceable but moist.',
    prep: '25 min',
    cook: '40–45 min',
    equipment: '30 × 20 cm metal roasting tin; non-stick frying pan',
    ingredients: [
      ['Potatoes, raw edible weight', '750 g'], ['Extra-virgin olive oil', '15 g'],
      ['Whole egg, without shell', '300 g'], ['Liquid egg white', '450 g'],
      ['Lean shortcut bacon', '300 g'], ['Baby spinach', '200 g'], ['Light tasty cheese', '100 g'],
      ['Tomatoes', '300 g'], ['Wholemeal bread', '200 g'], ['Smoked paprika', '6 g'],
    ],
    method: [
      'Heat oven to 200°C fan-forced. Cut potatoes into 15 mm cubes, toss with 10 g oil, paprika, salt and pepper, and roast 22–25 minutes.',
      'Crisp chopped bacon in remaining oil. Add spinach and cook only until wilted.',
      'Reduce oven to 175°C fan-forced. Whisk eggs and whites just until combined. Fold in bacon, spinach, potato, diced tomato and 70 g cheese.',
      'Pour into lined tin to roughly 3 cm depth. Top with remaining cheese.',
      'Bake 18–23 minutes until the centre is just set with a slight wobble. Rest 15 minutes.',
      'Serve each portion with 40 g toasted wholemeal bread.',
    ],
    storage: 'Refrigerate for up to 5 days. Freeze without toast for up to 6 weeks.',
    reheat: 'Microwave 75–90 seconds, rest 30 seconds, then heat again briefly if needed.',
    upgrade: 'Add chives and a spoon of smoky tomato relish; recalculate any substantial addition.',
    assumption: 'Lean shortcut bacon and light tasty cheese profiles materially affect macros.',
  },
  B3: {
    description: 'Thick spoonable oats with a genuine sticky-date sauce; creamy rather than gluey.',
    prep: '25 min',
    cook: '8 min',
    equipment: 'Small saucepan; five 500–600 mL jars',
    ingredients: [
      ['Rolled oats', '250 g'], ['Vanilla whey protein', '145 g'], ['Light milk', '450 mL'],
      ['High-protein plain yoghurt', '600 g'], ['Pitted dates', '140 g'], ['Chia seeds', '25 g'],
      ['Butter', '10 g'], ['Brown sugar', '15 g'], ['Ground cinnamon', '5 g'], ['Vanilla extract', '10 mL'],
    ],
    method: [
      'Finely chop 100 g dates. Simmer with 180 mL water, butter, brown sugar, cinnamon and vanilla for 6–8 minutes, crushing until jammy. Cool.',
      'Whisk whey into milk until smooth. Stir through oats and chia, then fold in 400 g yoghurt.',
      'Divide among five jars. Spoon over date sauce and remaining chopped dates.',
      'Top each with remaining yoghurt. Refrigerate at least 8 hours.',
      'Before eating, loosen with 15–30 mL water or milk if desired.',
    ],
    storage: 'Refrigerate up to 5 days. Not recommended for freezing.',
    reheat: 'Eat cold or microwave without top yoghurt for 60–75 seconds, then stir and add yoghurt.',
    upgrade: 'Add a pinch of sea salt to the warm date sauce.',
    assumption: 'Whey and yoghurt nutrition profiles materially affect macros.',
  },
};

const base = [
  ['B1', 'Apple-Crumble Protein Baked Oats', 'Breakfast', 558, 44.6, 57, 15.6],
  ['B2', 'Savoury Bacon, Egg and Potato Breakfast Bake', 'Breakfast', 546, 44.4, 43.6, 19.4],
  ['B3', 'Sticky-Date Pudding Overnight Oats', 'Breakfast', 555, 45.2, 64.2, 11.1],
  ['L3', 'Chicken, Corn and Bacon Chowder', 'Lunch', 766, 62, 69, 24],
  ['L5', 'Honey-Mustard Chicken and Potato Tray Bake', 'Lunch', 711, 59, 63, 22],
  ['D1', 'Slow-Cooked Beef Massaman Curry', 'Dinner', 981, 61, 82, 46],
  ['B7', 'Mandarin and Vanilla Ricotta-Style Pancake Bake', 'Breakfast', 585, 46, 61, 17],
  ['B8', 'Roasted Strawberry French-Toast Bake', 'Breakfast', 563, 44, 59, 16],
  ['B9', 'Caramelised Apple Pie Protein Porridge', 'Breakfast', 546, 44, 58, 15],
  ['B11', 'Pear, Ginger and Honey Baked Oats', 'Breakfast', 586, 45, 64, 17],
  ['L7', 'Mandarin-Ginger Chicken with Broccoli and Rice', 'Lunch', 704, 53, 77, 18],
  ['L8', 'Chicken, Leek and Mushroom Pot-Pie Bowls', 'Lunch', 695, 57, 54, 25],
  ['L11', 'Roast Chicken, Pear and Pumpkin Grain Bowls', 'Lunch', 712, 54, 76, 20],
  ['D7', 'Braised Beef with Leeks, Mushrooms and Mash', 'Dinner', 888, 64, 72, 38],
  ['D10', 'Beef, Mushroom and Black-Pepper Noodles', 'Dinner', 908, 65, 86, 34],
  ['D11', 'Lemon-Oregano Lamb with Roast Winter Vegetables', 'Dinner', 911, 64, 64, 41],
];

const pending = {
  description: 'Ingredient-audited recipe imported from Cameron’s Winter Recipe Library. Full structured method import is queued for the next content pass.',
  prep: 'See legacy library',
  cook: 'See legacy library',
  equipment: 'See legacy library',
  ingredients: [],
  method: [],
  storage: 'See legacy library for complete storage guidance.',
  reheat: 'See legacy library for complete reheating guidance.',
  upgrade: 'See legacy library for restaurant-style upgrades.',
  assumption: 'Macros are ingredient-verified against the assumptions in the source library; brand changes require recalculation.',
};

export const recipes = base.map(([id, title, meal, calories, protein, carbs, fat]) => ({
  id,
  slug: id.toLowerCase(),
  title,
  meal,
  calories,
  protein,
  carbs,
  fat,
  servings: 5,
  status: 'Ingredient-verified',
  tags: ['Meal prep', 'Brisbane winter', '5 servings'],
  ...(full[id] || pending),
}));

export const bySlug = (slug) => recipes.find((recipe) => recipe.slug === slug);
