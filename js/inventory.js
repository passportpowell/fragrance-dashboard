/* Versioned browser inventory. Seed metadata and explicit owner edits stay separate. */
(function (root) {
  'use strict';
  const KEY = 'fragrance_atelier_collection_v4';
  const LEGACY_KEY = 'fragrance_atelier_collection_v3';
  const FALLBACK = 'assets/bottles/default-bottle.svg';
  const MAX_PHOTO = 600000;
  const TEXT_FIELDS = ['name', 'brand', 'concentration', 'bottleType', 'flaconFormat', 'purchaseSource', 'gender', 'crg', 'wardrobeArchetype', 'recommendedSprays', 'macerationStatus', 'macerationTips', 'layeringPartner', 'description', 'longevity', 'sillage', 'perfumeParlourCode', 'provenance'];
  const NUMBERS = { bottleSize: [1, 5000], remainingMl: [0, 5000], rating: [0, 5], maturationWeeks: [0, 104], batchYear: [1900, 2100] };
  const clone = value => JSON.parse(JSON.stringify(value));
  const fail = message => { throw new Error(message); };
  function text(value, label, limit = 3000) {
    if (value == null) return '';
    if (typeof value !== 'string' || value.length > limit) fail(`${label} must be text up to ${limit} characters.`);
    return value.trim();
  }
  function number(value, label, min, max) {
    if (value == null || value === '') return null;
    if (typeof value !== 'number' || !Number.isFinite(value) || value < min || value > max) fail(`${label} must be between ${min} and ${max}.`);
    return value;
  }
  function image(value) {
    if (!value) return '';
    if (typeof value !== 'string' || value.length > MAX_PHOTO) fail('Photo is too large. Upload a smaller image.');
    if (/^assets\/bottles\/(?:cropped\/[a-z0-9_-]+\.(?:jpg|jpeg|png|webp)|[a-z0-9_-]+\.svg)$/i.test(value)) return value;
    if (/^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(value)) return value;
    fail('Photos must be local bottle assets or JPEG, PNG or WebP data.');
  }
  function strings(value, label) {
    if (value == null) return [];
    if (!Array.isArray(value) || value.length > 50) fail(`${label} must be a list of at most 50 entries.`);
    return [...new Set(value.map(v => text(v, label, 120)).filter(Boolean))];
  }
  function distribution(value, keys, label) {
    if (value == null) return Object.fromEntries(keys.map(k => [k, 0]));
    if (typeof value !== 'object' || Array.isArray(value)) fail(`${label} must be an object.`);
    return Object.fromEntries(keys.map(k => [k, number(value[k] ?? 0, `${label} ${k}`, 0, 100)]));
  }
  function normalizeRecord(input) {
    if (!input || typeof input !== 'object' || Array.isArray(input)) fail('Each bottle must be an object.');
    const id = text(input.id, 'Bottle ID', 100);
    if (['__proto__','constructor','prototype'].includes(id)||!/^[a-zA-Z0-9_-]+$/.test(id)) fail('Bottle ID contains invalid characters.');
    const item = { id };
    for (const field of TEXT_FIELDS) item[field] = text(input[field], field, field === 'name' || field === 'brand' ? 120 : 3000);
    if (!item.name || !item.brand) fail('Every bottle needs a name and brand.');
    for (const [field, [min, max]] of Object.entries(NUMBERS)) item[field] = number(input[field], field, min, max);
    if (item.remainingMl != null && (item.bottleSize == null || item.remainingMl > item.bottleSize)) fail('Remaining volume cannot exceed bottle size.');
    item.isClone = input.isClone === true;
    item.cloneOf = input.cloneOf ? { originalName: text(input.cloneOf.originalName, 'Clone inspiration', 120), originalHouse: text(input.cloneOf.originalHouse, 'Inspiration house', 120), similarityScore: number(input.cloneOf.similarityScore, 'Similarity score', 0, 100) } : null;
    if (item.cloneOf && !item.cloneOf.originalName) fail('Clone inspiration needs a name.');
    item.isClone = Boolean(item.cloneOf) || item.isClone;
    const labels=['Gym','Running','Walking','Office / Work','Dates','Wedding','Parks','City Centre','Malls','Clubbing / Evening','Casual'];
    const aliases={work:'Office / Work',office:'Office / Work','work / office':'Office / Work','dates & evenings':'Dates',weddings:'Wedding',formal:'Wedding'};
    item.occasions = [...new Set(strings(input.occasions, 'Occasions').map(tag=>labels.find(label=>label.toLowerCase()===tag.toLowerCase())||aliases[tag.toLowerCase()]||tag))];
    item.sprayBlueprint = strings(input.sprayBlueprint, 'Spray routine');
    item.seasons = distribution(input.seasons, ['spring', 'summer', 'autumn', 'winter'], 'Season score');
    item.timeOfDay = distribution(input.timeOfDay, ['day', 'night'], 'Time score');
    item.notes = Object.fromEntries(['top', 'heart', 'base'].map(tier => [tier, strings(input.notes?.[tier]?.map(n => typeof n === 'string' ? n : n?.name), `${tier} notes`).map(name => ({ name }))]));
    if (input.mainAccords != null && (!Array.isArray(input.mainAccords) || input.mainAccords.length > 30)) fail('Accords must be a list of at most 30 entries.');
    item.mainAccords = (input.mainAccords || []).map(a => {
      if (!a || typeof a !== 'object') fail('Each accord needs a name and strength.');
      const name = text(a.name, 'Accord name', 120);
      if (!name) fail('Accord name is required.');
      return { name, percentage: number(a.percentage, 'Accord strength', 0, 100), color: /^#[0-9a-fA-F]{6}$/.test(a.color) ? a.color : '#635F56' };
    });
    item.image = image(input.image) || FALLBACK;
    item.userPhoto = image(input.userPhoto);
    item.userUploadedCustomPhoto = input.userUploadedCustomPhoto === true && Boolean(item.userPhoto);
    return item;
  }
  function records(input) {
    if (!Array.isArray(input) || input.length > 500) fail('Inventory must contain at most 500 bottles.');
    const items = input.map(normalizeRecord);
    if (new Set(items.map(i => i.id)).size !== items.length) fail('Inventory contains duplicate bottle IDs.');
    return items;
  }
  const emptyState = () => ({ version: 4, custom: [], overrides: {}, deleted: [] });
  function stateFromCollection(items, seed) {
    const all = records(items), seeds = records(seed), state = emptyState();
    for (const item of all) {
      const original = seeds.find(s => s.id === item.id);
      if (!original) state.custom.push(item);
      else {
        const changes = Object.fromEntries(Object.entries(item).filter(([key, value]) => key !== 'id' && JSON.stringify(value) !== JSON.stringify(original[key])));
        if (Object.keys(changes).length) state.overrides[item.id] = changes;
      }
    }
    state.deleted = seeds.filter(s => !all.some(i => i.id === s.id)).map(s => s.id);
    return state;
  }
  function merge(state, seed) {
    if (!state || state.version !== 4 || !Array.isArray(state.custom) || !Array.isArray(state.deleted) || !state.overrides || typeof state.overrides !== 'object' || Array.isArray(state.overrides)) fail('Unsupported inventory backup format.');
    const seeds = records(seed), custom = records(state.custom);
    if (state.deleted.some(id => typeof id !== 'string' || !/^[a-zA-Z0-9_-]+$/.test(id))) fail('Invalid deleted bottle IDs.');
    const allowed = new Set(Object.keys(normalizeRecord({ id: 'schema', name: 'Schema', brand: 'Schema' })).filter(k => k !== 'id'));
    for (const [id, override] of Object.entries(state.overrides)) {
      if (!/^[a-zA-Z0-9_-]+$/.test(id) || !override || typeof override !== 'object' || Array.isArray(override) || Object.keys(override).some(k => !allowed.has(k))) fail('Invalid inventory overrides.');
    }
    return records([...seeds.filter(s => !state.deleted.includes(s.id)).map(s => normalizeRecord({ ...s, ...(Object.hasOwn(state.overrides,s.id)?state.overrides[s.id]:{}), id: s.id })), ...custom]);
  }
  function migrateLegacy(legacy, seed) {
    if (!Array.isArray(legacy)) fail('Legacy inventory must be an array.');
    const seeds=records(seed),state=emptyState(),warnings=[];
    for (const old of legacy) {
      if (!old||typeof old!=='object'){warnings.push('Invalid legacy record');continue;}
      const original=seeds.find(s=>s.id===old.id);
      if(original){
        const override={};
        if(old.userUploadedCustomPhoto&&old.userPhoto){try{Object.assign(override,{userPhoto:image(old.userPhoto),userUploadedCustomPhoto:true});}catch{warnings.push('Unsupported legacy photo for '+old.id);}}
        if(Number.isFinite(old.remainingMl)&&old.remainingMl>=0&&old.remainingMl<=original.bottleSize&&old.remainingMl!==original.remainingMl)override.remainingMl=old.remainingMl;
        if(Object.keys(override).length)state.overrides[old.id]=override;
      }else if(/^user-custom-/.test(old.id)){
        try{const item=normalizeRecord({...old,image:FALLBACK,userPhoto:old.userUploadedCustomPhoto?image(old.userPhoto):'',provenance:'Legacy custom record; review unverified fields.'});if(state.custom.some(i=>i.id===item.id))throw Error('Duplicate');state.custom.push(item);}
        catch{warnings.push('Invalid legacy custom record '+old.id);}
      }
    }
    state.migrationWarnings=warnings;
    return state;
  }

  function load(storage, seed) {
    let raw=null,sourceRaw=null,parsed=null;
    try {
      raw=storage.getItem(KEY);sourceRaw=raw;
      const legacy=raw?null:storage.getItem(LEGACY_KEY);
      if(legacy)sourceRaw=legacy;
      parsed=raw?JSON.parse(raw):null;
      const state=raw?parsed:legacy?migrateLegacy(JSON.parse(legacy),seed):emptyState();
      const warnings=state.migrationWarnings||[];
      return {collection:merge(state,seed),state,storedRaw:raw,recovery:legacy||null,recoveryRequired:warnings.length>0,warning:warnings.length?'Recovered valid legacy records. '+warnings.length+' entries need review; export recovery data before saving.':legacy?'Previous inventory migrated. Current metadata refreshed; volume and custom photos retained. Legacy backup remains in browser storage.':''};
    }catch(error){
      if(parsed?.version===4&&Array.isArray(parsed.custom)&&Array.isArray(parsed.deleted)&&parsed.overrides&&typeof parsed.overrides==='object'){
        const seeds=records(seed),recovered=[],ids=new Set();
        for(const item of seeds)if(!parsed.deleted.includes(item.id)){
          try{recovered.push(normalizeRecord({...item,...(Object.hasOwn(parsed.overrides,item.id)?parsed.overrides[item.id]:{}),id:item.id}));}
          catch{recovered.push(item);}ids.add(item.id);
        }
        for(const item of parsed.custom){try{const valid=normalizeRecord(item);if(ids.has(valid.id))continue;ids.add(valid.id);recovered.push(valid);}catch{}}
        return {collection:recovered,state:stateFromCollection(recovered,seed),storedRaw:raw,warning:'Recovered valid records after a storage/schema conflict. Export recovery data before saving; invalid entries remain in that original backup.',recovery:sourceRaw,recoveryRequired:true};
      }
      return {collection:records(seed),state:emptyState(),storedRaw:raw,warning:'Stored inventory could not be loaded. Your previous data has not been overwritten. '+error.message,recovery:sourceRaw,recoveryRequired:Boolean(sourceRaw)};
    }
  }

  function save(storage, items, seed) {
    const state = stateFromCollection(items, seed);
    storage.setItem(KEY, JSON.stringify(state));
    return state;
  }
  function exportBackup(items, seed) {
    return JSON.stringify({ version: 4, exportedAt: new Date().toISOString(), state: stateFromCollection(items, seed) }, null, 2);
  }
  function importBackup(raw, seed) {
    if (typeof raw !== 'string' || raw.length > 16000000) fail('Backup exceeds the 16 MB limit.');
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return records(parsed);
    if(!parsed||typeof parsed!=='object')fail('Backup must be an inventory object or bottle array.');
    return merge(parsed.state || parsed, seed);
  }
  function imageSource(item) { return image(item.userUploadedCustomPhoto ? item.userPhoto : item.image) || FALLBACK; }
  const api = { KEY, LEGACY_KEY, FALLBACK, MAX_PHOTO, normalizeRecord, records, stateFromCollection, merge, migrateLegacy, load, save, exportBackup, importBackup, imageSource };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Inventory = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
