const normalise=value=>String(value||'').trim().toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
export function createIdentity(name,{state='',brand='',variant=''}={}){return{name,canonical:normalise(name),state:normalise(state),brand:normalise(brand),variant:normalise(variant)}}
export function identityKey(value,aliases={}){const item=typeof value==='string'?createIdentity(value):createIdentity(value.name,value);const canonical=aliases[item.canonical]||item.canonical;return[canonical,item.state,item.brand,item.variant].filter(Boolean).join('::')}
export function resolveIdentity(item,aliases={}){const key=identityKey(item,aliases);return{key,resolved:Boolean(key),conflict:!key?'Ingredient identity is unresolved.':null}}
export function canMerge(a,b,aliases={}){return identityKey(a,aliases)===identityKey(b,aliases)}
export function approveAlias(aliases,from,to){return{...aliases,[normalise(from)]:normalise(to)}}