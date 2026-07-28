import test from'node:test';import assert from'node:assert/strict';import{createBackup,parseBackup,validateBackup}from'../src/domain/backup.js';
const state={shopping:['B1'],planner:{'Monday-Breakfast':'B1'},checked:[],favourites:['B1'],notes:{B1:'Good'}};
test('valid backup round trip',()=>{const backup=createBackup(state,'2026-07-28T00:00:00.000Z');const parsed=parseBackup(JSON.stringify(backup));assert.equal(parsed.valid,true);assert.equal(parsed.counts.planner,1);assert.deepEqual(parsed.value.data,state)});
test('rejects malformed JSON',()=>assert.equal(parseBackup('{oops').valid,false));
test('rejects incomplete backup',()=>{const result=validateBackup({format:'preppilot-backup',version:1,data:{}});assert.equal(result.valid,false);assert.match(result.errors.join(' '),/planner/)});