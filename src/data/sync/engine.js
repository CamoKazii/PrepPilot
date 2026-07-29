import{createRecord}from'../repositories/records.js';
import{detectConflict}from'./conflicts.js';
import{drainQueue,enqueue}from'./queue.js';

export function recordsFromSnapshot(snapshot,now=new Date().toISOString()){
  return Object.entries(snapshot).map(([collection,data])=>createRecord(collection,'root',data,now));
}

export function snapshotFromRecords(records){
  return Object.fromEntries(records.filter(record=>!record.deletedAt&&record.key==='root').map(record=>[record.collection,structuredClone(record.data)]));
}

function byId(records=[]){return new Map(records.map(record=>[record.id,record]));}
function same(a,b){return JSON.stringify(a)===JSON.stringify(b);}

export function prepareInitialSync(localRecords,remoteRecords,choice){
  const local=byId(localRecords),remote=byId(remoteRecords),ids=new Set([...local.keys(),...remote.keys()]);
  const records=[],conflicts=[];let queue=[];
  for(const id of ids){
    const l=local.get(id),r=remote.get(id);
    if(choice==='replace-local'){
      if(r)records.push(r);
      continue;
    }
    if(choice==='replace-cloud'){
      if(l){records.push(l);queue=enqueue(queue,{recordId:l.id,version:l.version,baseVersion:r?.version||0,type:l.deletedAt?'delete':'put',record:l});}
      continue;
    }
    if(!l){records.push(r);continue}
    if(!r){records.push(l);queue=enqueue(queue,{recordId:l.id,version:l.version,baseVersion:0,type:l.deletedAt?'delete':'put',record:l});continue}
    if(same(l.data,r.data)&&l.deletedAt===r.deletedAt){records.push(l.version>=r.version?l:r);continue}
    conflicts.push({conflict:true,base:null,local:l,remote:r,overlap:['root'],preserved:[l,r],reason:'first-sign-in'});
    records.push(l);
  }
  return{records,queue,conflicts,choice};
}

export function reconcileRecords(baseRecords,localRecords,remoteRecords){
  const base=byId(baseRecords),local=byId(localRecords),remote=byId(remoteRecords),ids=new Set([...base.keys(),...local.keys(),...remote.keys()]);
  const records=[],conflicts=[];let queue=[];
  for(const id of ids){
    const b=base.get(id),l=local.get(id),r=remote.get(id);
    if(!l&&r){records.push(r);continue}
    if(l&&!r){records.push(l);queue=enqueue(queue,{recordId:l.id,version:l.version,baseVersion:b?.version||0,type:l.deletedAt?'delete':'put',record:l});continue}
    if(!l&&!r)continue;
    const localChanged=!b||l.version!==b.version||!same(l.data,b.data)||l.deletedAt!==b.deletedAt;
    const remoteChanged=!b||r.version!==b.version||!same(r.data,b.data)||r.deletedAt!==b.deletedAt;
    if(localChanged&&!remoteChanged){records.push(l);queue=enqueue(queue,{recordId:l.id,version:l.version,baseVersion:b?.version||0,type:l.deletedAt?'delete':'put',record:l});continue}
    if(!localChanged&&remoteChanged){records.push(r);continue}
    if(!localChanged&&!remoteChanged){records.push(l);continue}
    const result=detectConflict(b,l,r);
    if(result.conflict){conflicts.push(result);records.push(l)}else{records.push(result.record);queue=enqueue(queue,{recordId:result.record.id,version:result.record.version,baseVersion:Math.max(l.version,r.version),type:result.record.deletedAt?'delete':'put',record:result.record})}
  }
  return{records,queue,conflicts,baseRecords:remoteRecords};
}

export async function runSyncCycle(state,remote){
  const remaining=await drainQueue(state.queue,item=>remote.push(item));
  const remoteRecords=await remote.listRecords();
  const reconciled=reconcileRecords(state.baseRecords,state.records,remoteRecords);
  return{...reconciled,queue:[...remaining,...reconciled.queue],lastSyncedAt:new Date().toISOString()};
}
