import test from'node:test';
import assert from'node:assert/strict';
import fs from'node:fs';
import{sanitiseDiagnostic}from'../src/lib/diagnostics.js';

const shell=fs.readFileSync(new URL('../src/main-v7.jsx',import.meta.url),'utf8');
const css=fs.readFileSync(new URL('../src/phase7.css',import.meta.url),'utf8');

test('application shell code-splits major routes',()=>{assert.match(shell,/lazyNamed/);assert.match(shell,/import\('\.\/features\/health\/HealthPage'\)/);assert.match(shell,/Suspense/)});
test('application shell includes skip navigation and main landmark',()=>{assert.match(shell,/SkipLink/);assert.match(shell,/id="main-content"/)});
test('touch and reduced-motion accessibility baselines are present',()=>{assert.match(css,/min-height:44px/);assert.match(css,/prefers-reduced-motion:reduce/)});
test('diagnostics exclude sensitive content',()=>{const safe=sanitiseDiagnostic({type:'sync-failure',version:'1.7.0',feature:'sync',code:'timeout',notes:'private',weight:80,email:'x@example.com'});assert.equal(safe.type,'sync-failure');assert.equal('notes'in safe,false);assert.equal('weight'in safe,false);assert.equal('email'in safe,false)});
