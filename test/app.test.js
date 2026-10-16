const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const Inventory = require('../js/inventory.js');
const { FRAGRANCE_DATABASE: seed } = require('../js/data.js');
const app = fs.readFileSync(require.resolve('../js/app.js'),'utf8');
function environment(query = '') {
  const sandbox = { Inventory, FRAGRANCE_DATABASE: seed, URLSearchParams, console, document: { getElementById: () => null, addEventListener() {} }, location: { search: query }, window: {}, localStorage: { getItem: () => null, setItem() {} } };
  vm.createContext(sandbox); vm.runInContext(app,sandbox);
  const run = code => vm.runInContext(code,sandbox);
  run('collection = Inventory.records(FRAGRANCE_DATABASE)');
  return { run, sandbox };
}
test('malicious query occasion is rejected and search remains plain data', () => {
  const {run}=environment('?occasion=%3Cimg%20src=x%20onerror=alert(1)%3E&search=%3Cb%3Etest%3C%2Fb%3E');
  run('readFilterUrl()'); assert.equal(run('vaultFilters.occasion'),'all');
  assert.equal(run('vaultFilters.search'),'<b>test</b>');
});
test('card markup escapes malicious owner names and never creates event handlers', () => {
  const {run}=environment();
  const markup=run('bottleCard(Inventory.normalizeRecord({id:"unsafe", name:"<img src=x onerror=alert(1)>", brand:"\\" onmouseover=\\"alert(1)"}))');
  assert(!markup.includes('<img src=x'));
  assert(markup.includes('&lt;img'));
  assert(!/\sonmouseover="/.test(markup));
  assert(!/\sonclick=/.test(markup));
});
test('all brands, strengths and owner occasion tags are filterable', () => {
  const {run}=environment();
  assert(run('filterChoices().brand.includes("Dolce & Gabbana")'));
  assert(run('filterChoices().concentration.includes("Daily Fragrance")'));
  run('collection.push(Inventory.normalizeRecord({id:"custom",name:"Custom",brand:"New maker",occasions:["Holiday"]}))');
  assert(run('filterChoices().occasion.includes("Holiday")'));
  assert(run('filterChoices().brand.includes("New maker")'));
});
test('occasion matching is exact and aquatic filter does not match Water Jasmine', () => {
  const {run}=environment(); run('vaultFilters.occasion="Gym"');
  assert.equal(run('filteredCollection().length'),seed.filter(i=>i.occasions.includes('Gym')).length);
  assert.equal(run('scentMatches(collection.find(i=>i.id==="user-pp-wood-miracle-1872"),"aquatic")'),false);
});
test('volume sort uses remaining ml rather than bottle fraction', () => {
  const {run}=environment();
  run('collection=Inventory.records([{id:"small",name:"Small",brand:"Owner",bottleSize:20,remainingMl:19},{id:"large",name:"Large",brand:"Owner",bottleSize:100,remainingMl:50}]);vaultFilters.sort="volume"');
  assert.equal(run('filteredCollection()[0].id'),'large');
});
test('season scores take priority and unrated/empty collections do not invent candidates', () => {
  const {run}=environment();
  run('collection=Inventory.records([{id:"high",name:"High",brand:"Owner",seasons:{autumn:80},timeOfDay:{day:0,night:0}},{id:"low",name:"Low",brand:"Owner",seasons:{autumn:30},timeOfDay:{day:100,night:100}}])');
  assert.equal(run('getInSeasonCandidates("autumn")[0].item.id'),'high');
  run('collection=[]');assert.equal(run('getInSeasonCandidates("autumn").length'),0);
});
test('all pair scores are symmetric, finite and agree with curated views', () => {
  const {run}=environment();
  assert(run('collection.every(a=>collection.every(b=>{const x=calculatePairingSynergy(a,b).score,y=calculatePairingSynergy(b,a).score;return x===y&&Number.isFinite(x)&&x>=0&&x<=100}))'));
  assert(run('CURATED_SIGNATURE_DUOS.every(d=>calculatePairingSynergy(collection.find(i=>i.id===d.baseId),collection.find(i=>i.id===d.companionId)).score===d.score)'));
  assert(run('collection.every(i=>getTopLayeringOptionsForFragrance(i).filter(o=>["user-pp-particle-iso-e-super","user-pp-second-particle-1980","user-pp-citrus-particle-0616"].includes(o.partner.id)).length<=1)'));
});
test('storage denial does not stop theme or seed loading', () => {
  const {run,sandbox}=environment();
  sandbox.document.documentElement={dataset:{}};
  sandbox.localStorage={getItem(){throw Error('denied')},setItem(){throw Error('denied')}};
  assert.doesNotThrow(()=>run('applyTheme("dark");loadCollection()'));
  assert.equal(run('collection.length'),20);
});

test('saving refuses to replace an unreadable original before recovery export',async()=>{
  const {run,sandbox}=environment();
  sandbox.navigator={locks:{request:async(name,fn)=>fn()}};
  run('recoveryRequired=true;recoveryExported=false');
  assert.equal(await run('commitCollection(collection,"saved")'),false);
});
test('stale tabs refuse last-writer overwrite',async()=>{
  const {run,sandbox}=environment();
  const latest=Inventory.stateFromCollection([...seed,{id:'user-custom-other',name:'Other tab',brand:'Owner'}],seed);
  const raw=JSON.stringify(latest);
  sandbox.localStorage={getItem:key=>key===Inventory.KEY?raw:null,setItem(){throw Error('must not write stale data')}};
  sandbox.navigator={locks:{request:async(name,fn)=>fn()}};
  run('loadedRaw=null');
  assert.equal(await run('commitCollection(collection,"saved")'),false);
  assert(run('collection.some(i=>i.id==="user-custom-other")'));
});

 test('layering recommendations enforce the inclusive 90 score threshold',()=>{const {run}=environment();assert(run('collection.every(i=>getTopLayeringOptionsForFragrance(i).every(o=>o.score>=90))'));assert(run('getTopLayeringOptionsForFragrance(collection.find(i=>i.id==="user-dg-the-one-edp")).some(o=>o.score===90)'));run('collection=Inventory.records([{id:"a",name:"A",brand:"Owner"},{id:"b",name:"B",brand:"Owner"}])');assert.equal(run('getTopLayeringOptionsForFragrance(collection[0]).length'),0);});

test('all layering views enforce cutoff and ignore legacy free-text tips',()=>{const {run,sandbox}=environment();const nodes=Object.fromEntries(['layeringDuosContainer','modeCuratedDuosBtn','rankedCompanionsContainer','companionsCountBadge','modalLayeringPartner','modalInventoryDetails'].map(id=>[id,{}]));sandbox.document.getElementById=id=>nodes[id]||null;run('CURATED_SIGNATURE_DUOS.push({title:"Below threshold",baseId:collection[0].id,companionId:collection[1].id,score:89});renderLayeringDuos();updateInteractivePairings(collection[0].id)');assert(!nodes.layeringDuosContainer.innerHTML.includes('Below threshold'));assert(!nodes.rankedCompanionsContainer.innerHTML.includes('>89<'));assert(run('layeringAdvice(collection.find(i=>i.id==="user-pp-intenso-water-1329")).includes("91/100")'));run('collection=Inventory.records([{id:"a",name:"A",brand:"Owner",layeringPartner:"Unsupported performance promise"},{id:"b",name:"B",brand:"Owner"}]);updateInteractivePairings("a")');assert(nodes.rankedCompanionsContainer.innerHTML.includes('No pairing meets'));assert(run('layeringAdvice(collection[0]).includes("on its own")'));});
test('seed does not convert aerosol grams to millilitres or assert maturation',()=>{const {run}=environment();assert.equal(seed.find(i=>i.id==='user-bbw-mahogany-woods').bottleSize,null);assert(seed.every(i=>i.macerationStatus==='Not recorded'&&i.maturationWeeks==null));});
