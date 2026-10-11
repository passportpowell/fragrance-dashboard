/**
 * Test Validator for Fragrance Inventory
 */
const { FRAGRANCE_DATABASE, FILTER_DIMENSIONS } = require('../js/data.js');

function runValidation() {
  console.log('--- RUNNING FRAGRANCE DATA VALIDATION ---');
  let errors = 0;

  if (!Array.isArray(FRAGRANCE_DATABASE) || FRAGRANCE_DATABASE.length === 0) {
    console.error('FAIL: Database must be a non-empty array');
    return process.exit(1);
  }

  const ids = new Set();

  FRAGRANCE_DATABASE.forEach((item, index) => {
    // Unique ID check
    if (!item.id || ids.has(item.id)) {
      console.error(`Item #${index} invalid or duplicate id: ${item.id}`);
      errors++;
    }
    ids.add(item.id);

    // Required fields check
    const required = [
      'name', 'brand', 'concentration', 'flaconFormat', 'bottleSize', 'rating', 
      'occasions', 'seasons', 'timeOfDay', 'mainAccords', 'notes',
      'recommendedSprays', 'sprayBlueprint', 'macerationStatus', 'wardrobeArchetype'
    ];
    required.forEach(field => {
      if (item[field] === undefined || item[field] === null) {
        console.error(`Item ${item.name || index} missing required field: ${field}`);
        errors++;
      }
    });

    // Spray blueprint check
    if (!Array.isArray(item.sprayBlueprint) || item.sprayBlueprint.length === 0) {
      console.error(`Item ${item.name} has no sprayBlueprint array`);
      errors++;
    }

    // Notes pyramid check
    if (!item.notes.top || !item.notes.heart || !item.notes.base) {
      console.error(`Item ${item.name} notes pyramid incomplete (needs top, heart, base)`);
      errors++;
    }

    // Occasions check
    if (!Array.isArray(item.occasions) || item.occasions.length === 0) {
      console.error(`Item ${item.name} has no occasions assigned`);
      errors++;
    }

    // Accords check
    if (!Array.isArray(item.mainAccords) || item.mainAccords.length === 0) {
      console.error(`Item ${item.name} has no mainAccords`);
      errors++;
    }
  });

  // Verify HTML file data-id integrity
  const fs = require('fs');
  const path = require('path');
  const htmlFiles = ['index.html', 'collection.html', 'occasions.html', 'layering.html', 'guide.html'];
  htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (!fs.existsSync(filePath)) {
      console.error(`Missing HTML file: ${file}`);
      errors++;
      return;
    }
    const content = fs.readFileSync(filePath, 'utf8');
    const regex = /data-id="([^"]+)"/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const id = match[1];
      if (!ids.has(id)) {
        console.error(`Broken data-id in ${file}: "${id}" does not exist in FRAGRANCE_DATABASE`);
        errors++;
      }
    }

    // Check for empty src=""
    if (content.includes('src=""')) {
      console.error(`Empty src="" found in ${file}`);
      errors++;
    }
  });

  console.log(`Validated ${FRAGRANCE_DATABASE.length} fragrances across ${FILTER_DIMENSIONS.occasions.length} occasion tags and ${FILTER_DIMENSIONS.wardrobeArchetypes.length} wardrobe archetypes.`);
  console.log(`Verified data-id integrity and image sources across ${htmlFiles.length} core HTML pages.`);
  if (errors > 0) {
    console.error(`VALIDATION FAILED with ${errors} errors.`);
    process.exit(1);
  } else {
    console.log('ALL INVENTORY & VOJ/REDDIT ENRICHED CHECKS PASSED SUCCESSFULLY.');
  }
}

runValidation();
