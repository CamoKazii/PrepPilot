export function recordId(collection,key){return`${collection}:${key}`}
export function createRecord(collection,key,data,now=new Date().toISOString()){return{id:recordId(collection,key),collection,key,version:1,updatedAt:now,deletedAt:null,data:structuredClone(data)}}
export function updateRecord(record,data,now=new Date().toISOString()){return{...record,version:Number(record.version||0)+1,updatedAt:now,deletedAt:null,data:structuredClone(data)}}
export function deleteRecord(record,now=new Date().toISOString()){return{...record,version:Number(record.version||0)+1,updatedAt:now,deletedAt:now}}
export function isTombstone(record){return Boolean(record?.deletedAt)}
export function validateRecord(record){const issues=[];if(!record?.id||!record?.collection||!record?.key)issues.push('Record identity is incomplete.');if(!Number.isInteger(record?.version)||record.version<1)issues.push('Record version must be a positive integer.');if(!record?.updatedAt)issues.push('Record timestamp is required.');return issues}
