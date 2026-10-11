const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'js', 'data.js');
let code = fs.readFileSync(dataPath, 'utf8');

const map = {
  'after_effect_fa_paris.jpg': 'studio/after_effect_fa_paris.jpg',
  'pp_navy_intense.jpg': 'studio/bdc_edp.jpg',
  'voux_elegante.jpg': 'studio/voux_elegante.jpg',
  'tf_noir_extreme.jpg': 'studio/tf_noir_extreme.jpg',
  'pp_intense_aroma_exploding.jpg': 'studio/spicebomb_extreme.jpg',
  'laya_edp.jpg': 'studio/neemah_laya.jpg',
  'pp_wood_miracle.jpg': 'studio/mancera_cedrat_boise.jpg',
  'pp_particle.jpg': 'studio/molecule_01.jpg',
  'pp_citrus_particle_0616.jpg': 'studio/molecule_01_mandarin.jpg',
  'pp_intenso_water.jpg': 'studio/adg_profondo.jpg',
  'pp_sweet_water.jpg': 'studio/adg_profumo.jpg',
  'dg_the_one.jpg': 'studio/dg_the_one_edp.jpg',
  'tf_oud_wood_spray.jpg': 'studio/tf_oud_wood.jpg',
  'bbw_mahogany_woods.jpg': 'studio/bbw_mahogany_woods.jpg',
  'lynx_oud_vanilla.jpg': 'studio/lynx_oud_vanilla.jpg',
  'pp_herb_garden_1598.jpg': 'studio/pdm_layton.jpg',
  'pp_astray_fruit_1947.jpg': 'studio/tf_lost_cherry.jpg',
  'pp_leaf_flavour_0401.jpg': 'studio/tf_tobacco_vanille.jpg',
  'pp_noire_illusion_1746.jpg': 'studio/kilian_black_phantom.jpg',
  'pp_second_particle_1980.jpg': 'studio/molecule_02.jpg'
};

let replacedCount = 0;
for (const [oldName, newName] of Object.entries(map)) {
  const target = `image: "assets/bottles/cropped/${oldName}"`;
  const replacement = `image: "assets/bottles/${newName}"`;
  if (code.includes(target)) {
    code = code.replace(target, replacement);
    replacedCount++;
  } else {
    console.warn(`Target not found for: ${oldName}`);
  }
}

fs.writeFileSync(dataPath, code, 'utf8');
console.log(`Successfully updated ${replacedCount} image paths in js/data.js!`);
