// Shared validation also runs in deployment builds.
const { FRAGRANCE_DATABASE } = require('../js/data.js');
const Inventory = require('../js/inventory.js');

// Validate inventory records against schema, bounds, and accords
Inventory.records(FRAGRANCE_DATABASE);

require('../scripts/verify-source.js');

