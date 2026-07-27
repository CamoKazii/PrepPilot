import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Link, NavLink, Route, Routes, useParams } from 'react-router-dom';
import { bySlug, recipes, targets } from './data';
import './styles.css';

const SHOPPING_KEY = 'preppilot-shopping-v1';
const PLANNER_KEY = 'preppilot-planner-v1';
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEALS = ['Breakfast', 'Lunch', 'Dinner'];

function readLocal(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)); }
  catch { return fallback; }
}
function writeLocal(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

function Layout() {
  return <div className="shell">
    <aside>
      <Link className="brand" to="/"><span className="mark">P</span><span><b>PrepPilot</b><small>Meal prep, dialled in.</small></span></Link>
      <nav>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/recipes">Recipes</NavLink>
        <NavLink to="/planner">Planner</NavLink>
        <NavLink to="/shopping-list">Shopping list</NavLink>
      </nav>
      <div className="target-note"><span>Daily target</span><b>{targets.calories.toLocaleString('en-AU')} kcal</b><small>≥{targets.protein} P · {targets.carbs} C · {targets.fat} F</small></div>
    </aside>
    <main><Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/recipes" element={<Library />} />
      <Route path="/recipes/:slug" element={<Recipe />} />
      <Route path="/planner" element={<Planner />} />
      <Route path="/shopping-list" element={<Shopping />} />
      <Route path="*" element={<NotFound />} />
    </Routes></main>
  </div>;
}

function Dashboard() {
  const planner = readLocal(PLANNER_KEY, {});
  const assigned = Object.values(planner).filter(Boolean).length;
  const fullDays = DAYS.map(day => MEALS.map(meal => planner[`${day}-${meal}`]).filter(Boolean))
    .filter(items => items.length === 3).length;
  const counts = recipes.reduce((acc, recipe) => {
    acc[recipe.meal] = (acc[recipe.meal] || 0) + 1;
    return acc;
  }, {});

  return <>
    <header className="hero">
      <p className="eyebrow">Your nutrition command centre</p>
      <h1>Good evening, Cam.</h1>
      <p>Plan a repeatable week, keep protein mandatory, and turn verified recipes into one practical prep workflow.</p>
      <div className="actions"><Link className="primary" to="/planner">Plan this week</Link><Link className="secondary" to="/recipes">Browse recipes</Link></div>
    </header>
    <section className="target-grid">
      {[['Calories', targets.calories, 'kcal'], ['Protein', targets.protein, 'g minimum'], ['Carbohydrate', targets.carbs, 'g'], ['Fat', targets.fat, 'g']].map(([label, value, unit]) => <article key={label}><span>{label}</span><b>{value}</b><small>{unit}</small></article>)}
    </section>
    <section className="summary-grid">
      <article><span>Meals planned</span><b>{assigned}</b><small>of 21 slots</small></article>
      <article><span>Complete days</span><b>{fullDays}</b><small>breakfast + lunch + dinner</small></article>
      <article><span>Structured recipes</span><b>{recipes.filter(r => r.ingredients.length).length}</b><small>full ingredient detail</small></article>
    </section>
    <section>
      <div className="section-head"><div><p className="eyebrow">Library</p><h2>Built for Sunday prep</h2></div><Link to="/recipes">View all</Link></div>
      <div className="summary-grid">{MEALS.map(meal => <article key={meal}><span>{meal}</span><b>{counts[meal] || 0}</b><small>recipes</small></article>)}</div>
    </section>
    <section><div className="section-head"><div><p className="eyebrow">Start here</p><h2>Featured recipes</h2></div></div><div className="cards">{recipes.slice(0, 3).map(recipe => <Card key={recipe.id} recipe={recipe} />)}</div></section>
  </>;
}

function Library() {
  const [query, setQuery] = useState('');
  const [meal, setMeal] = useState('All');
  const filtered = useMemo(() => recipes.filter(recipe => (meal === 'All' || recipe.meal === meal) && `${recipe.title} ${recipe.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase())), [query, meal]);
  return <>
    <header className="page-head"><p className="eyebrow">Recipe library</p><h1>Find your next meal prep.</h1><p>Search audited recipes by name, meal or preparation style.</p></header>
    <div className="toolbar"><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search recipes…" aria-label="Search recipes" /><div className="chips">{['All', ...MEALS].map(option => <button className={meal === option ? 'active' : ''} onClick={() => setMeal(option)} key={option}>{option}</button>)}</div></div>
    <div className="cards">{filtered.map(recipe => <Card key={recipe.id} recipe={recipe} />)}</div>
    {!filtered.length && <div className="empty">No recipes match those filters.</div>}
  </>;
}

function Card({ recipe }) {
  return <Link className="card" to={`/recipes/${recipe.slug}`}>
    <div className={`art ${recipe.meal.toLowerCase()}`}><span>{recipe.id}</span></div>
    <div className="card-body"><div className="meta"><span>{recipe.meal}</span><span>{recipe.status}</span></div><h3>{recipe.title}</h3><p>{recipe.description}</p><div className="macros"><b>{recipe.calories} kcal</b><span>{recipe.protein} P</span><span>{recipe.carbs} C</span><span>{recipe.fat} F</span></div></div>
  </Link>;
}

function Recipe() {
  const { slug } = useParams();
  const recipe = bySlug(slug);
  const [list, setList] = useState(() => readLocal(SHOPPING_KEY, []));
  if (!recipe) return <NotFound />;
  const added = list.includes(recipe.id);
  function toggle() {
    const next = added ? list.filter(id => id !== recipe.id) : [...list, recipe.id];
    setList(next); writeLocal(SHOPPING_KEY, next);
  }
  return <>
    <Link className="back" to="/recipes">← Back to recipes</Link>
    <header className="recipe-hero"><div><p className="eyebrow">{recipe.meal} · {recipe.id}</p><h1>{recipe.title}</h1><p>{recipe.description}</p><div className="badge">Ingredient-verified macros</div></div><div className="hero-macro"><span>Per serving</span><b>{recipe.calories}</b><small>kcal</small></div></header>
    <div className="recipe-actions"><button className="primary" onClick={toggle}>{added ? 'Remove from shopping list' : 'Add to shopping list'}</button></div>
    <section className="stat-grid"><article><span>Servings</span><b>{recipe.servings}</b></article><article><span>Prep</span><b>{recipe.prep}</b></article><article><span>Cook</span><b>{recipe.cook}</b></article><article><span>Equipment</span><b>{recipe.equipment}</b></article></section>
    <section className="macro-strip">{[['Calories', recipe.calories], ['Protein', `${recipe.protein} g`], ['Carbs', `${recipe.carbs} g`], ['Fat', `${recipe.fat} g`]].map(([label, value]) => <article key={label}><span>{label}</span><b>{value}</b></article>)}</section>
    {recipe.ingredients.length ? <div className="recipe-columns"><section><h2>Ingredients</h2><p className="muted">Australian metric. Raw, drained or packaged state is identified where material.</p><ul className="ingredients">{recipe.ingredients.map(([name, quantity]) => <li key={name}><span>{name}</span><b>{quantity}</b></li>)}</ul></section><section><h2>Method</h2><ol className="method">{recipe.method.map((step, index) => <li key={index}>{step}</li>)}</ol></section></div> : <div className="notice"><b>Structured import pending</b><p>This recipe’s ingredient-verified headline macros are available now. Full ingredients and method remain queued for migration.</p></div>}
    <section className="care"><article><h3>Storage</h3><p>{recipe.storage}</p></article><article><h3>Reheating</h3><p>{recipe.reheat}</p></article><article><h3>Upgrade</h3><p>{recipe.upgrade}</p></article></section>
    <div className="assumption"><b>Material assumptions</b><p>{recipe.assumption}</p></div>
  </>;
}

function Planner() {
  const [plan, setPlan] = useState(() => readLocal(PLANNER_KEY, {}));
  function assign(key, recipeId) { const next = { ...plan, [key]: recipeId || null }; setPlan(next); writeLocal(PLANNER_KEY, next); }
  function clear() { setPlan({}); writeLocal(PLANNER_KEY, {}); }
  return <>
    <header className="page-head"><p className="eyebrow">Weekly planner</p><h1>Build a week that adds up.</h1><p>Select breakfast, lunch and dinner for each day. Daily totals update immediately.</p></header>
    <div className="section-head"><h2>Seven-day plan</h2><button className="secondary" onClick={clear}>Clear plan</button></div>
    <div className="planner-grid">{DAYS.map(day => {
      const selected = MEALS.map(meal => recipes.find(recipe => recipe.id === plan[`${day}-${meal}`])).filter(Boolean);
      const total = selected.reduce((sum, recipe) => ({ calories: sum.calories + recipe.calories, protein: sum.protein + recipe.protein, carbs: sum.carbs + recipe.carbs, fat: sum.fat + recipe.fat }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
      return <section className="day-card" key={day}><div className="day-head"><h3>{day}</h3><span>{selected.length}/3 meals</span></div>{MEALS.map(meal => {
        const key = `${day}-${meal}`;
        return <label key={key}><span>{meal}</span><select value={plan[key] || ''} onChange={event => assign(key, event.target.value)}><option value="">Choose recipe</option>{recipes.filter(recipe => recipe.meal === meal).map(recipe => <option key={recipe.id} value={recipe.id}>{recipe.title}</option>)}</select></label>;
      })}<div className="day-macros"><b>{Math.round(total.calories)} kcal</b><span className={total.protein >= targets.protein ? 'good' : ''}>{Math.round(total.protein)} P</span><span>{Math.round(total.carbs)} C</span><span>{Math.round(total.fat)} F</span></div></section>;
    })}</div>
  </>;
}

function Shopping() {
  const [list, setList] = useState(() => readLocal(SHOPPING_KEY, []));
  const selected = recipes.filter(recipe => list.includes(recipe.id));
  const items = selected.flatMap(recipe => recipe.ingredients.map(([name, quantity]) => ({ name, quantity, recipe: recipe.title })));
  function clear() { setList([]); writeLocal(SHOPPING_KEY, []); }
  return <>
    <header className="page-head"><p className="eyebrow">Shopping list</p><h1>Your prep, consolidated.</h1><p>Selections stay privately on this device and work offline once installed.</p></header>
    {selected.length ? <><div className="section-head"><h2>{selected.length} recipe{selected.length > 1 ? 's' : ''}</h2><button className="secondary" onClick={clear}>Clear all</button></div><div className="shopping-recipes">{selected.map(recipe => <article key={recipe.id}><b>{recipe.title}</b><Link to={`/recipes/${recipe.slug}`}>View</Link></article>)}</div><section><h2>Ingredients</h2>{items.length ? <div className="checklist">{items.map((item, index) => <label key={`${item.name}-${index}`}><input type="checkbox" /><span><b>{item.name}</b><small>{item.quantity} · {item.recipe}</small></span></label>)}</div> : <div className="notice"><p>Selected recipes are awaiting their structured ingredient import.</p></div>}</section></> : <div className="empty"><h2>No recipes added yet.</h2><p>Add recipes from the library to build your prep list.</p><Link className="primary" to="/recipes">Browse recipes</Link></div>}
  </>;
}

function NotFound() { return <div className="empty"><h1>That page wandered off.</h1><Link className="primary" to="/">Back to dashboard</Link></div>; }

createRoot(document.getElementById('root')).render(<React.StrictMode><HashRouter><Layout /></HashRouter></React.StrictMode>);
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => {}));
