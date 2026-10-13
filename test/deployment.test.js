const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
function walk(directory, prefix = '') {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const name = prefix + entry.name;
    return entry.isDirectory() ? walk(path.join(directory, entry.name), name + '/') : [name];
  });
}
test('production build excludes internal/source files and rebuild removes stale output', () => {
  execFileSync(process.execPath, ['scripts/build.js'], { cwd: root });
  const output = path.join(root, 'public');
  fs.writeFileSync(path.join(output, 'stale-secret.txt'), 'test fixture');
  execFileSync(process.execPath, ['scripts/build.js'], { cwd: root });
  const files = walk(output);
  assert.equal(files.filter(name => name.endsWith('.html')).length, 5);
  const allowed = /^(?:index|collection|occasions|layering|guide)\.html$|^css\/styles\.css$|^js\/(?:app|data|inventory|theme)\.js$|^(?:robots\.txt|sitemap\.xml)$|^assets\/bottles\/(?:cropped\/[\w-]+\.(?:jpg|jpeg|png|webp)|(?:default-bottle|fresh-aquatic-blue|niche-flacon-amber|pp-extrait-gold|pp-spray-black)\.svg)$/i;
  for (const file of files) assert.match(file, allowed, `Unapproved output: ${file}`);
  assert.ok(!files.some(file => /studio|user_photos|secret|docs|skills|\.git|test\//.test(file)));
  assert.ok(fs.existsSync(path.join(root, 'assets/bottles/user_photos/shelf_1_pp_row.jpg')));
});
test('Vercel routes, restrictive headers and revalidating asset cache are explicit', () => {
  const config = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
  assert.equal(config.outputDirectory, 'public');
  assert.equal(config.buildCommand, 'node scripts/build.js');
  assert.equal(config.redirects.length, 6);
  const headers = config.headers.flatMap(rule => rule.headers);
  const csp = headers.find(header => header.key === 'Content-Security-Policy').value;
  assert.match(csp, /script-src 'self';/);
  assert.match(csp, /object-src 'none'/);
  assert.match(csp, /frame-ancestors 'none'/);
  assert.match(headers.find(header => header.key === 'Cache-Control').value, /max-age=3600, must-revalidate/);
  assert.ok(!headers.some(header => /immutable/.test(header.value)));
  for (const key of ['X-Content-Type-Options', 'X-Frame-Options', 'Referrer-Policy', 'Permissions-Policy']) assert.ok(headers.some(header => header.key === key));
});
