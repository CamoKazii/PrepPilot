export const DAY_TYPES=[
{id:'rest',label:'Rest day',defaultCarbShift:0},
{id:'easy',label:'Easy run',defaultCarbShift:0},
{id:'quality',label:'Quality run',defaultCarbShift:35},
{id:'long',label:'Long run',defaultCarbShift:35},
{id:'futsal',label:'Futsal',defaultCarbShift:20},
{id:'custom',label:'Custom',defaultCarbShift:0},
];
export function normaliseCarbShift(type,value){const day=DAY_TYPES.find(x=>x.id===type)||DAY_TYPES[0];if(type==='quality'||type==='long'){const proposed=Number(value??day.defaultCarbShift);return Math.min(40,Math.max(30,proposed))}return Number(value??day.defaultCarbShift)||0}
export function getDayType(id){return DAY_TYPES.find(x=>x.id===id)||DAY_TYPES[0]}
export function trainingTarget(base,type,shift){const carbShift=normaliseCarbShift(type,shift);return{...base,carbs:base.carbs+carbShift,carbShift,explanation:carbShift?`${carbShift} g carbohydrate shifted to this ${getDayType(type).label.toLowerCase()}. Weekly energy is not changed automatically.`:'Base carbohydrate target.'}}
