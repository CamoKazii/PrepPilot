import fs from'node:fs';
import path from'node:path';
const root=path.resolve('dist/assets');
if(!fs.existsSync(root))throw new Error('dist/assets not found; run npm run build first');
const files=fs.readdirSync(root).map(name=>({name,bytes:fs.statSync(path.join(root,name)).size}));
const js=files.filter(file=>file.name.endsWith('.js'));
const css=files.filter(file=>file.name.endsWith('.css'));
const limits={largestJs:300*1024,totalJs:850*1024,totalCss:140*1024};
const values={largestJs:Math.max(0,...js.map(file=>file.bytes)),totalJs:js.reduce((sum,file)=>sum+file.bytes,0),totalCss:css.reduce((sum,file)=>sum+file.bytes,0)};
console.table(files.sort((a,b)=>b.bytes-a.bytes).map(file=>({file:file.name,kB:(file.bytes/1024).toFixed(1)})));
let failed=false;
for(const[key,limit]of Object.entries(limits)){const value=values[key];console.log(`${key}: ${(value/1024).toFixed(1)} kB / ${(limit/1024).toFixed(0)} kB`);if(value>limit){failed=true;console.error(`Budget exceeded: ${key}`)}}
if(js.length<2){failed=true;console.error('Expected route-level code splitting to produce multiple JavaScript chunks')}
if(failed)process.exit(1);
