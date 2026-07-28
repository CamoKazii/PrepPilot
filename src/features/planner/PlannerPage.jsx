import React,{useState}from'react';
import{recipes,targets}from'../../data';
import{readStored,writeStored}from'../../data/storage';
import{PhaseOnePlanner}from'./PhaseOnePlanner';
const DAYS=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],MEALS=['Breakfast','Lunch','Dinner'];
export function PlannerPage(){const[plan,setPlan]=useState(()=>readStored('planner',{}));function shopping(slots){writeStored('shopping',slots);location.hash='#/shopping-list'}return <PhaseOnePlanner plan={plan} setPlan={setPlan} recipes={recipes} targets={targets} days={DAYS} meals={MEALS} readLocal={readStored} writeLocal={writeStored} onShopping={shopping}/>}
