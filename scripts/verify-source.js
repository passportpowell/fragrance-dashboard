/** Seed schema, assets and page integrity; runtime records use the same schema. */
const fs = require('node:fs');
const path = require('node:path');
const Inventory = require('../js/inventory.js');
const { FRAGRANCE_DATABASE } = require('../js/data.js');
const root = path.resolve(__dirname, '..');
const pages = ['index.html','collection.html','occasions.html','layering.html','guide.html'];
const errors = [];
function check(ok,message){if(!ok)errors.push(message);}
try { Inventory.records(FRAGRANCE_DATABASE); } catch(error){errors.push(error.message);}
check(FRAGRANCE_DATABASE.length > 0,'Seed inventory must not be empty.');
for(const item of FRAGRANCE_DATABASE){
  for(const key of ['name','brand','flaconFormat','concentration','provenance'])check(typeof item[key]==='string'&&item[key].length>0,item.id+': missing '+key);
  for(const tier of ['top','heart','base'])check(Array.isArray(item.notes?.[tier]),item.id+': invalid '+tier+' notes');
  for(const field of ['image','userPhoto'])if(item[field])check(fs.existsSync(path.join(root,item[field])),item.id+': missing '+item[field]);
  check(item.image.startsWith('assets/bottles/cropped/'),item.id+': must show owner photograph');
}
const html = Object.fromEntries(pages.map(p=>[p,fs.readFileSync(path.join(root,p),'utf8')]));
for(const [page,source] of Object.entries(html)){
  const ids=[...source.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  check(new Set(ids).size===ids.length,page+': duplicate IDs');
  check(!/\son[a-z]+\s*=/i.test(source),page+': inline event handler conflicts with CSP');
  check(!/src=""/.test(source),page+': empty image source');
  for(const id of ['main-content','detailModal','modalInventoryDetails','addBottleModal','addFragranceForm','inventoryStatus','exportInventoryBtn','importInventoryFile','applyImportBtn'])check(ids.includes(id),page+': missing '+id);
  check(source.includes('https://desktop-smsroim.tail0be63c.ts.net/'),page+': required private access link missing');
  check(/footer-contact-card-btn[^>]*>[\s\S]*?<svg[^>]*>[\s\S]*?M12 \.8/.test(source),page+': required GitHub card icon missing');
  check(/href="https:\/\/www\.passportpowell\.com\/card"[^>]*target="_blank"[^>]*rel="noopener noreferrer"/.test(source),page+': card link attributes missing');
  check(source.indexOf('js/theme.js')<source.indexOf('css/styles.css'),page+': theme must run before styles');
  const scripts=[...source.matchAll(/<script[^>]*src="([^"]+)"/g)].map(m=>m[1]);
  check(JSON.stringify(scripts)===JSON.stringify(['js/theme.js','js/data.js','js/inventory.js','js/app.js']),page+': wrong script order');
  check(!source.includes('/studio/'),page+': stock photograph remains');
  for(const m of source.matchAll(/\b(?:href|src)="([^"]+)"/g)){
    const value=m[1];if(/^(?:https?:|data:|blob:|mailto:|tel:)/.test(value))continue;
    const [file,fragment]=value.split('#');const target=(file||page).split('?')[0];
    check(fs.existsSync(path.join(root,target)),page+': missing link/asset '+value);
    if(fragment&&html[target])check(html[target].includes('id="'+fragment+'"'),page+': missing anchor '+value);
  }
}
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}
else console.log('PASS: '+FRAGRANCE_DATABASE.length+' seed records; numeric/schema bounds, owner assets, five page hooks, links, script order, footer requirements and CSP-compatible markup.');
