import{createRecord}from'../repositories/records.js';
import{detectConflict}from'./conflicts.js';
import{enqueue,markFailure}from'./queue.js';

export const SYNCED_COLLECTIONS=['shopping','planner','checked','favourites','notes','dayTypes','plannedSnacks','weekTemplates','customRecipes','pantry','aliases','manualShopping','recurringShopping','aisleOrder','priceRecords','packageOptions','wasteLog','deductionOverrides'];

function byId(records=[]){return new Map(records.map(record=>[record.id,record]));}
function same(a,b){return JSON.stringify(a)===JSON.stringify(b);}

export function recordsFromSnapshot(snapshot,now=new Date().toISOString(),baseRecords=[]){
  const base=byId(baseRecords);
  return SYNCED_COLLECTIONS.map(collection=>{
    const id=`${collection}:root`,data=structuredClone(snapshot[collection]??(collection==='notes'||collection==='planner'||collection==='dayTypes'||collection==='plannedSnacks'||collection==='weekTemplates'||collection==='aliases'||collection==='aisleOrder'||collection==='packageOptions'||collection==='deductionOverrides'?{}:[])),prior=base.get(id);
    if(prior&&same(prior.data,data)&&!prior.deletedAt)return prior;
    if(prior)return{...prior,data,version:prior.version+1,updatedAt:now,deletedAt:null};
    return createRecord(collection,'root',data,now);
  });
}

export function snapshotFromRecords(records){return Object.fromEntries(records.filter(record=>!record.deletedAt&&record.key==='root').map(record=>[record.collection,structuredClone(record.data)]));}

export function prepareInitialSync(localRecords,remoteRecords,choice,now=new Date().toISOString()){
  const local=byId(localRecords),remote=byId(remoteRecords),ids=new Set([...local.keys(),...remote.keys()]);
  const records=[],conflicts=[];let queue=[];
  for(const id of ids){
    const l=local.get(id),r=remote.get(id);
    if(choice==='replace-local'){if(r)records.push(r);continue}
    if(choice==='replace-cloud'){if(l){const version=r?Math.max(l.version,r.version)+1:l.version,record={...l,version};records.push(record);queue=enqueue(queue,{recordId:record.id,version:record.version,baseVersion:r?.version||0,type:record.deletedAt?'delete':'put',record},now)}continue}
    if(!l){records.push(r);continue}
    if(!r){records.push(l);queue=enqueue(queue,{recordId:l.id,version:l.version,baseVersion:0,type:l.deletedAt?'delete':'put',record:l},now);continue}
    if(same(l.data,r.data)&&l.deletedAt===r.deletedAt){records.push(l.version>=r.version?l:r);continue}
    conflicts.push({conflict:true,base:null,local:l,remote:r,overlap:['root'],preserved:[l,r],reason:'first-sign-in'});records.push(l);
  }
  return{records,queue,conflicts,baseRecords:remoteRecords,choice};
}

export function reconcileRecords(baseRecords,localRecords,remoteRecords,now=new Date().toISOString()){
  const base=byId(baseRecords),local=byId(localRecords),remote=byId(remoteRecords),ids=new Set([...base.keys(),...local.keys(),...remote.keys()]);
  const records=[],conflicts=[];let queue=[];
  for(const id of ids){
    const b=base.get(id),l=local.get(id),r=remote.get(id);
    if(!l&&r){records.push(r);continue}
    if(l&&!r){records.push(l);queue=enqueue(queue,{recordId:l.id,version:l.version,baseVersion:b?.version||0,type:l.deletedAt?'delete':'put',record:l},now);continue}
    if(!l&&!r)continue;
    const localChanged=!b||l.version!==b.version||!same(l.data,b.data)||l.deletedAt!==b.deletedAt;
    const remoteChanged=!b||r.version!==b.version||!same(r.data,b.data)||r.deletedAt!==b.deletedAt;
    if(localChanged&&!remoteChanged){records.push(l);queue=enqueue(queue,{recordId:l.id,version:l.version,baseVersion:b?.version||0,type:l.deletedAt?'delete':'put',record:l},now);continue}
    if(!localChanged&&remoteChanged){records.push(r);continue}
    if(!localChanged&&!remoteChanged){records.push(l);continue}
    const result=detectConflict(b,l,r);
    if(result.conflict){conflicts.push(result);records.push(l)}else{records.push(result.record);queue=enqueue(queue,{recordId:result.record.id,version:result.record.version,baseVersion:Math.max(l.version,r.version),type:result.record.deletedAt?'delete':'put',record:result.record},now)}
  }
  return{records,queue,conflicts,baseRecords:remoteRecords};
}

export async function runSyncCycle(state,remote,now=Date.now()){
  const remaining=[],pushConflicts=[];
  for(const item of state.queue||[]){
    if(!['pending','retrying'].includes(item.state)||Date.parse(item.nextAttemptAt)>now){remaining.push(item);continue}
    try{await remote.push(item)}catch(error){if(error.code==='VERSION_CONFLICT'){pushConflicts.push({conflict:true,base:(state.baseRecords||[]).find(x=>x.id===item.recordId)||null,local:item.record,remote:error.current,overlap:['root'],preserved:[item.record,error.current].filter(Boolean),reason:'version-check'})}else remaining.push(markFailure(item,error,now))}
  }
  const remoteRecords=await remote.listRecords(),syncTime=new Date(now).toISOString(),reconciled=reconcileRecords(state.baseRecords||[],state.records||[],remoteRecords,syncTime);
  return{...reconciled,queue:[...remaining,...reconciled.queue],conflicts:[...pushConflicts,...reconciled.conflicts],lastSyncedAt:syncTime};
}
