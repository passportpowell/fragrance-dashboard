const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../js/data.js');
let code = fs.readFileSync(dataPath, 'utf8');

// Update FILTER_DIMENSIONS
code = code.replace(
  '"Gym",\n    "Parks",',
  '"Gym",\n    "Running",\n    "Walking",\n    "Parks",'
);

// Map of items to add Running and/or Walking
const additions = {
  'user-pp-citrus-particle-0616': ['Running', 'Walking'],
  'user-pp-intenso-water-1329': ['Running', 'Walking'],
  'user-pp-particle-iso-e-super': ['Running', 'Walking'],
  'user-pp-second-particle-1980': ['Running', 'Walking'],
  'user-lynx-oud-vanilla': ['Running', 'Walking'],
  'user-pp-sweet-water-1262': ['Walking'],
  'user-pp-wood-miracle-1872': ['Walking'],
  'user-pp-navy-intense-0061': ['Walking'],
  'user-pp-herb-garden-1598': ['Walking'],
  'user-bbw-mahogany-woods': ['Walking']
};

for (const [id, tags] of Object.entries(additions)) {
  const itemRegex = new RegExp('(id:\\s*"' + id + '"[\\s\\S]*?occasions:\\s*\\[)([^\\]]*?)(\\])');
  code = code.replace(itemRegex, (match, prefix, existingOccasions, suffix) => {
    let list = existingOccasions.split(',').map(s => s.trim().replace(/^"|"$/g, '')).filter(Boolean);
    tags.forEach(t => {
      if (!list.includes(t)) list.push(t);
    });
    return prefix + list.map(t => '"' + t + '"').join(', ') + suffix;
  });
}

fs.writeFileSync(dataPath, code, 'utf8');
console.log('Successfully updated js/data.js with Running and Walking occasions!');
