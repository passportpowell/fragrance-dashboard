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
      'name', 'brand', 'concentration', 'bottleSize', 'rating', 
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

  console.log(`Validated ${FRAGRANCE_DATABASE.length} fragrances across ${FILTER_DIMENSIONS.occasions.length} occasion tags and ${FILTER_DIMENSIONS.wardrobeArchetypes.length} wardrobe archetypes.`);
  if (errors > 0) {
    console.error(`VALIDATION FAILED with ${errors} errors.`);
    process.exit(1);
  } else {
    console.log('ALL INVENTORY & VOJ/REDDIT ENRICHED CHECKS PASSED SUCCESSFULLY.');
  }
}

runValidation();
