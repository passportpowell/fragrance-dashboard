const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'public');
require('./verify-source.js');
if(process.exitCode)throw new Error('Source integrity validation failed; output not changed');
const pages = ['index.html', 'collection.html', 'occasions.html', 'layering.html', 'guide.html'];
const files = [...pages, 'css/styles.css', 'js/data.js', 'js/inventory.js', 'js/theme.js', 'js/app.js', 'robots.txt', 'sitemap.xml'];
const fallbacks = ['default-bottle.svg', 'fresh-aquatic-blue.svg', 'niche-flacon-amber.svg', 'pp-extrait-gold.svg', 'pp-spray-black.svg'];
for (const name of fallbacks) files.push(`assets/bottles/${name}`);
for (const name of fs.readdirSync(path.join(root, 'assets/bottles/cropped'))) {
  if (/^[\w-]+\.(jpg|jpeg|png|webp)$/i.test(name)) files.push(`assets/bottles/cropped/${name}`);
}
// Resolve every input before touching generated output. Refuse links/junctions.
for (const file of files) {
  const source = path.join(root, file);
  if (!fs.statSync(source).isFile() || fs.realpathSync(source) !== source) throw new Error(`Unsafe or missing build input: ${file}`);
}
if (path.dirname(output) !== root || path.basename(output) !== 'public') throw new Error('Unsafe output path');
if (fs.existsSync(output) && fs.realpathSync(output) !== output) throw new Error('Output must not be a link/junction');
// Delete only the explicitly contained generated directory; source assets remain intact.
fs.rmSync(output, { recursive: true, force: true });
for (const file of files) {
  const destination = path.join(output, file);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(path.join(root, file), destination);
}
console.log(`Built ${files.length} allowlisted files in public/`);
