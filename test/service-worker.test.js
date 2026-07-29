import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const source=fs.readFileSync(new URL('../public/sw.js',import.meta.url),'utf8');

test('service worker uses a release-specific cache',()=>{
  assert.match(source,/const CACHE='preppilot-v7'/);
});

test('document navigation is network-first to avoid stale Pages bundles',()=>{
  assert.match(source,/event\.request\.mode==='navigate'/);
  assert.match(source,/fetch\(request,\{cache:'no-store'\}\)/);
  assert.doesNotMatch(source,/const cached=await caches\.match\(event\.request\);if\(cached\)return cached/);
});
