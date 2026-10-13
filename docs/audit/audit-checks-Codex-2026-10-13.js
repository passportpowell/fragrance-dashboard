// Read-only audit harness. No inventory, application or deployment writes.
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = path.resolve(__dirname, '../..');
const cache = new Map();
const read = p => { if (!cache.has(p)) cache.set(p, fs.readFileSync(path.join(root, p), 'utf8')); return cache.get(p); };
const { FRAGRANCE_DATABASE: data } = require(path.join(root, 'js/data.js'));
const pages = ['index.html', 'collection.html', 'occasions.html', 'layering.html', 'guide.html'];
const report = { bottles: data.length, pages: {}, missingAssets: [], brokenLinks: [], brokenTriggers: [] };
for (const page of pages) {
  const html = read(page);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
  report.pages[page] = {
    duplicateIds: ids.filter((id, i) => ids.indexOf(id) !== i),
    tailscaleLink: /(?:tail0be63c|100\.92\.173\.32)/.test(html),
    footerCard: /href="https:\/\/www\.passportpowell\.com\/card"/.test(html),
    description: /name="description"/.test(html),
    canonical: /rel="canonical"/.test(html),
    h1Count: [...html.matchAll(/<h1\b/g)].length,
    addBottleUi: /id="(?:addFragranceBtn|addBottleModal|addFragranceForm)"/.test(html)
  };
  for (const m of html.matchAll(/\b(?:src|href)="([^"]+)"/g)) {
    const value = m[1];
    if (/^(?:https?:|data:|mailto:|tel:)/.test(value)) continue;
    const [file, fragment] = value.split('#');
    const target = (file || page).split('?')[0];
    if (!fs.existsSync(path.join(root, target))) report.brokenLinks.push({ page, value });
    else if (fragment && target.endsWith('.html') && !read(target).includes(`id="${fragment}"`)) report.brokenLinks.push({ page, value });
  }
  for (const m of html.matchAll(/openDetailModal\('([^']+)'\)/g)) {
    if (!data.some(d => d.id === m[1])) report.brokenTriggers.push({ page, id: m[1] });
  }
}
for (const item of data) {
  for (const field of ['image', 'userPhoto']) {
    if (item[field] && !fs.existsSync(path.join(root, item[field]))) report.missingAssets.push({ id: item.id, field, path: item[field] });
  }
}
report.occasions = Object.fromEntries(['Gym', 'Running', 'Walking', 'Office / Work', 'Dates', 'Wedding'].map(o => [o, data.filter(d => d.occasions.includes(o)).length]));
report.brandsMissingFilter = [...new Set(data.map(d => d.brand))].filter(b => !read('collection.html').includes(`data-filter="${b}"`));
report.strengthsMissingFilter = [...new Set(data.map(d => d.concentration))].filter(c => !read('collection.html').includes(`data-filter="${c}"`));
report.occasionLists = [...read('occasions.html').matchAll(/<article\b[^>]*id="([^"]+)"([\s\S]*?)<\/article>/g)].map(m => {
  const tag = { gym: 'Gym', running: 'Running', walking: 'Walking', work: 'Office / Work', dates: 'Dates', wedding: 'Wedding' }[m[1]];
  const shown = [...m[2].matchAll(/openDetailModal\('([^']+)'\)/g)].map(x => x[1]);
  return { section: m[1], shown: shown.length, missingTagged: tag ? data.filter(d => d.occasions.includes(tag) && !shown.includes(d.id)).map(d => d.id) : [] };
});
const Inventory = require(path.join(root, 'js/inventory.js'));
function context(storage = {}) {
  const errors = [];
  const sandbox = { Inventory, FRAGRANCE_DATABASE: data, document: { addEventListener() {}, getElementById() { return null; }, documentElement: { setAttribute() {} }, querySelectorAll() { return []; } }, window: { addEventListener() {} }, localStorage: { getItem: key => storage[key] || null, setItem: (key, value) => { storage[key] = value; } }, console: { error: (...a) => errors.push(String(a[0])), warn: (...a) => errors.push(String(a[0])) }, URLSearchParams };
  sandbox.addEventListener = () => {};
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(read('js/app.js'), sandbox);
  return { sandbox, errors, run: code => vm.runInContext(code, sandbox) };
}
const blocked = context();
blocked.sandbox.localStorage.getItem = () => { throw Error('Storage denied'); };
try { blocked.run('initTheme(); loadCollection();'); report.storageBlockedStartup = 'unexpected pass'; }
catch (e) { report.storageBlockedStartup = String(e); }
const malformed = context({ fragrance_atelier_collection_v3: '[null]' });
malformed.run('loadCollection()');
report.malformedStorage = { messages: malformed.errors, fallbackCount: malformed.run('collection.length') };
const custom = context({ fragrance_atelier_collection_v3: JSON.stringify([{ ...data[0], userUploadedCustomPhoto: true, userPhoto: 'data:image/png;base64,AUDIT' }]) });
custom.run('loadCollection()');
report.photoPriority = custom.run('({ customPhoto: collection[0].userPhoto, renderedSource: imageSource(collection[0]) })');
const inject = context();
const chip = { innerHTML: '', setAttribute() {}, addEventListener() {}, querySelector: () => ({ addEventListener() {} }) };
const grid = { innerHTML: '', appendChild() {} };
const chips = { innerHTML: '', appendChild() {}, replaceChildren() {} };
inject.sandbox.document.getElementById = id => id === 'boutiqueProductGrid' ? grid : id === 'activeFilterChipsContainer' ? chips : null;
inject.sandbox.document.createElement = () => chip;
inject.run('loadCollection(); vaultFilters.search = "<img src=x onerror=alert(1)>"; renderCollectionGrid()');
report.searchBadgeContainsRawHtml = chip.innerHTML.includes('<img src=x onerror=alert(1)>');
inject.run('vaultFilters.search = ""; vaultFilters.occasion = "<img src=x onerror=alert(1)>"; renderCollectionGrid()');
report.urlOccasionBadgeContainsRawHtml = chip.innerHTML.includes('<img src=x onerror=alert(1)>');
const pairs = context();
pairs.run('loadCollection()');
report.pairingDisagreements = pairs.run('CURATED_SIGNATURE_DUOS.map(d => ({title:d.title, curated:d.score, calculator:calculatePairingSynergy(collection.find(c=>c.id===d.baseId),collection.find(c=>c.id===d.companionId)).score})).filter(d=>d.curated!==d.calculator)');
const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
const assets = walk(path.join(root, 'assets'));
report.assets = { count: assets.length, bytes: assets.reduce((sum, p) => sum + fs.statSync(p).size, 0) };
report.sourceBytes = Object.fromEntries(['js/app.js', 'js/data.js', 'css/styles.css'].map(p => [p, fs.statSync(path.join(root, p)).size]));
report.skinContrast = (() => {
  const lum = h => { const rgb = h.match(/\w\w/g).map(v => parseInt(v, 16) / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4); return .2126 * rgb[0] + .7152 * rgb[1] + .0722 * rgb[2]; };
  const ratio = (a,b) => { const x=lum(a), y=lum(b); return +((Math.max(x,y)+.05)/(Math.min(x,y)+.05)).toFixed(2); };
  return { goldOnLight: ratio('7D5E1B','FDFBF7'), tertiaryOnLight: ratio('635F56','FDFBF7'), tertiaryOnDark: ratio('A4AAB5','090A0D') };
})();
const mutated = JSON.parse(JSON.stringify(data));
Object.assign(mutated[0], { rating: 999, remainingMl: 99999, image: 'assets/missing-audit.jpg' });
mutated[0].mainAccords[0].percentage = 999;
const validator = { require: p => p === '../js/data.js' ? { ...require(path.join(root, 'js/data.js')), FRAGRANCE_DATABASE: mutated } : require(path.resolve(root, 'test', p)), __dirname: path.join(root, 'test'), console: { log() {}, error() {} }, process: { exit: code => { throw Error(`exit ${code}`); } } };
try { vm.runInNewContext(read('test/validate-inventory.js'), validator); report.validatorAcceptedInvalidRatingVolumeAccordAndMissingImage = true; }
catch (e) { report.validatorAcceptedInvalidRatingVolumeAccordAndMissingImage = false; report.validatorMutationError = String(e); }
async function finish() {
  if (process.argv.includes('--live')) {
    const { createHash } = require('crypto');
    const hash = bytes => createHash('sha256').update(bytes).digest('hex');
    report.liveParity = await Promise.all([...pages, 'js/app.js', 'js/data.js', 'css/styles.css'].map(async file => {
      try {
        const response = await fetch(`https://fragrance-dashboard.vercel.app/${file === 'index.html' ? '' : file}`, { signal: AbortSignal.timeout(15000) });
        const bytes = Buffer.from(await response.arrayBuffer());
        return { file, status: response.status, matchesLocal: hash(bytes) === hash(fs.readFileSync(path.join(root, file))) };
      } catch (e) { return { file, error: String(e) }; }
    }));
  }
  console.log(JSON.stringify(report, null, 2));
}
finish().catch(e => { console.error(e); process.exitCode = 1; });
