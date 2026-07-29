import{readStored,writeStored}from'./storage.js';
const KEY='customRecipes';
export function listCustomRecipes(){return readStored(KEY,[])}
export function getCustomRecipe(id){return listCustomRecipes().find(x=>x.id===id)||null}
export function saveCustomRecipe(recipe){const all=listCustomRecipes(),index=all.findIndex(x=>x.id===recipe.id),next=index>=0?all.map((x,i)=>i===index?recipe:x):[...all,recipe];writeStored(KEY,next);return recipe}
export function deleteCustomRecipe(id){writeStored(KEY,listCustomRecipes().filter(x=>x.id!==id))}
export function importRecipes(records){const errors=[],accepted=[];for(const [index,r]of(records||[]).entries()){if(!r?.id||!r?.title||!Array.isArray(r.ingredients)){errors.push({index,message:'Record requires id, title and ingredients.'});continue}accepted.push(r)}if(accepted.length){const byId=new Map(listCustomRecipes().map(x=>[x.id,x]));for(const r of accepted)byId.set(r.id,r);writeStored(KEY,[...byId.values()])}return{accepted:accepted.length,errors}}
