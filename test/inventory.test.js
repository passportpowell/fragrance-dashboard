const test = require('node:test');
const assert = require('node:assert/strict');
const Inventory = require('../js/inventory.js');
const { FRAGRANCE_DATABASE: seed } = require('../js/data.js');
const memory = () => { const map = new Map(); return { getItem: key => map.get(key) || null, setItem: (key, value) => map.set(key, value) }; };
test('latest seed replaces stale legacy metadata without losing owner volume', () => {
  const storage = memory();
  const old = { ...seed[0], name: 'Obsolete', concentration: 'Wrong', remainingMl: 10 };
  storage.setItem(Inventory.LEGACY_KEY, JSON.stringify([old]));
  const loaded = Inventory.load(storage, seed).collection[0];
  assert.equal(loaded.name, seed[0].name);
  assert.equal(loaded.concentration, seed[0].concentration);
  assert.equal(loaded.remainingMl, 10);
});
test('storage denial returns usable seed and visible warning', () => {
  const result = Inventory.load({ getItem() { throw Error('denied'); } }, seed);
  assert.equal(result.collection.length, seed.length);
  assert.match(result.warning, /not been overwritten/);
});
test('invalid storage preserves recoverable original', () => {
  const storage = memory(); storage.setItem(Inventory.KEY, '[null]');
  const result = Inventory.load(storage, seed);
  assert.equal(result.recovery, '[null]');
  assert.equal(storage.getItem(Inventory.KEY), '[null]');
});
test('backup round trip retains edits, custom bottles, deletion and custom photo', () => {
  const items = Inventory.records(seed).slice(1);
  items[0].name = '<img src=x onerror=alert(1)>';
  items[0].userPhoto = 'data:image/png;base64,YWJj'; items[0].userUploadedCustomPhoto = true;
  items.push(Inventory.normalizeRecord({ id: 'user-custom-test', name: 'Test', brand: 'Owner' }));
  const restored = Inventory.importBackup(Inventory.exportBackup(items, seed), seed);
  assert.deepEqual(restored, items);
  assert.equal(Inventory.imageSource(restored[0]), items[0].userPhoto);
  assert.equal(restored.at(-1).rating, null);
  assert.equal(restored.at(-1).remainingMl, null);
});
test('invalid imports reject duplicate IDs, malformed notes, unsafe photos and numeric bounds', () => {
  const record = { id: 'test', name: 'Test', brand: 'Owner' };
  for (const changes of [{ rating: 999 }, { bottleSize: 50, remainingMl: 51 }, { seasons: { spring: 101 } }, { image: 'javascript:alert(1)' }, { userPhoto: 'data:image/svg+xml;base64,YWJj' }, { mainAccords: [{ name: 'Woody', percentage: 999 }] }, { notes: { top: {} } }]) assert.throws(() => Inventory.normalizeRecord({ ...record, ...changes }));
  assert.throws(() => Inventory.importBackup(JSON.stringify([record, record]), seed));
});
test('failed save leaves stored backup intact', () => {
  const storage = memory(); storage.setItem(Inventory.KEY, 'unchanged');
  storage.setItem = () => { throw Error('QuotaExceededError'); };
  assert.throws(() => Inventory.save(storage, seed, seed), /Quota/);
  assert.equal(storage.getItem(Inventory.KEY), 'unchanged');
});
test('seed changes flow through except explicit owner overrides', () => {
  const items = Inventory.records(seed); items[0].remainingMl = 3;
  const state = Inventory.stateFromCollection(items, seed);
  const updated = seed.map(s => ({ ...s })); updated[0].description = 'Updated source';
  const result = Inventory.merge(state, updated);
  assert.equal(result[0].description, 'Updated source'); assert.equal(result[0].remainingMl, 3);
});

test('invalid legacy entries preserve valid records and exportable originals',()=>{
  const storage=memory();const legacy=[{...seed[0],userUploadedCustomPhoto:true,userPhoto:'data:image/svg+xml;base64,YWJj'},{id:'user-custom-good',name:'Good',brand:'Owner'},null];
  storage.setItem(Inventory.LEGACY_KEY,JSON.stringify(legacy));
  const result=Inventory.load(storage,seed);
  assert(result.collection.some(i=>i.id==='user-custom-good'));
  assert.equal(result.recovery,JSON.stringify(legacy));assert.equal(result.recoveryRequired,true);
});
test('invalid seed overrides preserve unaffected custom records and recovery data',()=>{
  const storage=memory(),state=Inventory.stateFromCollection([...seed,{id:'user-custom-good',name:'Good',brand:'Owner'}],seed);
  state.overrides[seed[0].id]={remainingMl:9999};const raw=JSON.stringify(state);storage.setItem(Inventory.KEY,raw);
  const result=Inventory.load(storage,seed);
  assert(result.collection.some(i=>i.id==='user-custom-good'));assert.equal(result.recovery,raw);assert.equal(result.recoveryRequired,true);
});
test('unsupported backup version is protected and diagnostics are controlled',()=>{
  const storage=memory();storage.setItem(Inventory.KEY,'{"version":5}');
  const result=Inventory.load(storage,seed);assert(result.recoveryRequired);assert.equal(result.storedRaw,'{"version":5}');
  assert.throws(()=>Inventory.importBackup('null',seed),/inventory object/);
  assert.throws(()=>Inventory.normalizeRecord({id:'__proto__',name:'Bad',brand:'Owner'}));
  assert.equal(Inventory.normalizeRecord({id:'photo',name:'Photo',brand:'Owner',image:'assets/bottles/cropped/Foo.JPEG'}).image,'assets/bottles/cropped/Foo.JPEG');
});

test('imported occasion labels normalize without losing custom tags',()=>{const item=Inventory.normalizeRecord({id:'tags',name:'Tags',brand:'Owner',occasions:['gym','GYM','work / office','Holiday']});assert.deepEqual(item.occasions,['Gym','Office / Work','Holiday']);});
