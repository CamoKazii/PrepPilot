export const STORAGE_VERSION=1;
export const LEGACY_KEYS={shopping:'preppilot-shopping-v2',planner:'preppilot-planner-v1',checked:'preppilot-checked-v1',favourites:'preppilot-favourites-v1',notes:'preppilot-notes-v1'};
export const APP_KEYS=Object.fromEntries(Object.keys(LEGACY_KEYS).map(name=>[name,`preppilot-${name}`]));

export function envelope(data,updatedAt=new Date().toISOString()){return{version:STORAGE_VERSION,updatedAt,data}}
export function parseRecord(raw,fallback){if(raw==null)return envelope(fallback);const parsed=JSON.parse(raw);if(parsed&&typeof parsed==='object'&&'version'in parsed&&'data'in parsed)return migrateRecord(parsed);return envelope(parsed)}
export function migrateRecord(record){if(record.version===STORAGE_VERSION)return record;if(record.version<STORAGE_VERSION)return envelope(record.data,record.updatedAt);throw new Error(`Unsupported storage version ${record.version}`)}
export function readStored(name,fallback,storage=localStorage){const key=APP_KEYS[name]||name;try{const current=storage.getItem(key);if(current!=null)return parseRecord(current,fallback).data;const legacy=LEGACY_KEYS[name]&&storage.getItem(LEGACY_KEYS[name]);if(legacy!=null){const record=parseRecord(legacy,fallback);storage.setItem(key,JSON.stringify(record));return record.data}return fallback}catch(error){try{storage.setItem(`${key}-quarantine-${Date.now()}`,storage.getItem(key)||'')}catch{}return fallback}}
export function writeStored(name,data,storage=localStorage){const key=APP_KEYS[name]||name;storage.setItem(key,JSON.stringify(envelope(data)));return data}
export function snapshot(storage=localStorage){return Object.fromEntries(Object.keys(APP_KEYS).map(name=>[name,readStored(name,name==='notes'||name==='planner'?{}:[],storage)]))}
export function restoreSnapshot(data,storage=localStorage){for(const name of Object.keys(APP_KEYS))writeStored(name,data[name]??(name==='notes'||name==='planner'?{}:[]),storage)}