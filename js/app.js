/* Local fragrance inventory UI. Owner text is escaped or assigned as textContent. */
'use strict';
const $ = id => document.getElementById(id);
const h = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const imageSource = item => Inventory.imageSource(item);
const storage = { getItem: key => localStorage.getItem(key), setItem: (key, value) => localStorage.setItem(key, value) };
const DEFAULT_FILTERS = { occasion:'all', scentType:'all', season:'all', timeOfDay:'all', originType:'all', brand:'all', concentration:'all', wardrobeArchetype:'all', longevity:'all', sillage:'all', search:'', sort:'rating' };
let collection = [], vaultFilters = {...DEFAULT_FILTERS}, currentSotdFragranceId = null, sotdActiveSeason = null, sotdOccasion = "all", sotdTimeFilter = "auto";
let editedId = null, activeDialog = null, returnFocus = null, recoveryData = null, pendingImport = null, pendingPhoto = null, photoRemoved = false, photoToken = 0, editorInitial = "", loadedRaw = null, recoveryRequired = false, recoveryExported = false;
const inertBefore = new Map();
const OCCASIONS = [['gym','Gym','Gym & Workouts'],['running','Running','Running'],['walking','Walking','Walking'],['work','Office / Work','Work / Office'],['dates','Dates','Dates & Evenings'],['wedding','Wedding','Weddings & Formal'],['parks','Parks','Parks'],['city','City Centre','City Centre'],['malls','Malls','Malls'],['evening','Clubbing / Evening','Evening outings'],['casual','Casual','Casual / Everyday']];
const MIN_LAYERING_SCORE = 90;
const isParticleOrMolecular = item => {
  if (!item) return false;
  const id = item.id || '';
  const name = (item.name || '').toLowerCase();
  const primerIds = ['user-pp-particle-iso-e-super', 'user-pp-second-particle-1980', 'user-pp-citrus-particle-0616'];
  return primerIds.includes(id) || /particle|iso[\s-]*e[\s-]*super|ambrox/i.test(id) || /particle|iso[\s-]*e[\s-]*super|ambrox/i.test(name);
};
const CURATED_SIGNATURE_DUOS = [
  {
    "title": "Dark Cherry & Warm Rum",
    "baseId": "user-pp-astray-fruit-1947",
    "companionId": "user-after-effect-fa-paris",
    "score": 96,
    "rationale": "Tart Griotte cherry liqueur and bitter almond fold into aged dark rum, cinnamon, pipe tobacco, and bourbon vanilla.",
    "caution": "Both profiles are dense and sweet. Apply 1 spray of Astray Fruit to 2 sprays of After Effect.",
    "sequence": "Spray 2 sprays After Effect as a base, then 1 spray Astray Fruit on collar or wrists."
  },
  {
    "title": "Honeyed Tobacco & Boozy Rum",
    "baseId": "user-voux-elegante",
    "companionId": "user-after-effect-fa-paris",
    "score": 95,
    "rationale": "Mediterranean bergamot, golden honey, and lavender brighten After Effect’s deep spiced tobacco and rum core.",
    "caution": "Potent sillage from both flacons. Best suited for cool weather and evening wear.",
    "sequence": "1 spray Voux Elegante on chest, 1-2 sprays After Effect on sides of neck."
  },
  {
    "title": "Fiery Spice & Boozy Speakeasy",
    "baseId": "user-pp-intense-aroma-exploding",
    "companionId": "user-after-effect-fa-paris",
    "score": 94,
    "rationale": "Fiery black pepper, cinnamon, and cumin in Spicebomb fuse with the dark Martinique rum and bourbon vanilla of After Effect.",
    "caution": "Spicy and warm. A 1:1 spray ratio provides immense fireside presence without becoming cloying.",
    "sequence": "1 spray After Effect on the chest + 2 sprays Intense Aroma Exploding on the collar."
  },
  {
    "title": "Gourmand Nightcap",
    "baseId": "user-pp-noire-illusion-1746",
    "companionId": "user-after-effect-fa-paris",
    "score": 94,
    "rationale": "Dark roasted coffee beans, bitter cocoa, and burnt sugar cane meld into spiced rum, vanilla, and tonka bean.",
    "caution": "Intensely rich chocolate and boozy facets. Use sparingly for intimate nighttime occasions.",
    "sequence": "1 spray Noire Illusion on the lower chest + 1 spray After Effect on the neck."
  },
  {
    "title": "Spiced Woods & Warm Rum",
    "baseId": "user-tf-oud-wood-spray",
    "companionId": "user-after-effect-fa-paris",
    "score": 93,
    "rationale": "Dry, aristocratic rosewood, agarwood, and cardamom ground the sweet boozy cinnamon and tobacco cloud.",
    "caution": "Body spray format diffuses broadly; allow 2 minutes before layering the extrait on pulse points.",
    "sequence": "Apply Oud Wood all-over first, then accent with 1-2 sprays After Effect on the neck."
  },
  {
    "title": "Fireside Bourbon & Boozy Rum",
    "baseId": "user-bbw-mahogany-woods",
    "companionId": "user-after-effect-fa-paris",
    "score": 93,
    "rationale": "Bourbon, golden mahogany, and cognac intertwine with spiced dark rum and tobacco for a rich hearthside warmth.",
    "caution": "Rich woody-boozy overlap. Try 1 mist of Mahogany Woods with 2 sprays After Effect.",
    "sequence": "Mist Mahogany Woods on torso, then layer After Effect on wrists and neck."
  },
  {
    "title": "Smoky Citrus & Blue Woods",
    "baseId": "user-pp-navy-intense-0061",
    "companionId": "user-pp-wood-miracle-1872",
    "score": 94,
    "rationale": "Sparkling Sicilian lemon and blackcurrant birch leather elevate Bleu’s grapefruit, incense, and cedarwood trail.",
    "caution": "High versatility for day and evening. Keep spray count balanced at 2 sprays each.",
    "sequence": "2 sprays Wood Miracle on chest and wrists + 2 sprays Navy Intense on neck."
  },
  {
    "title": "Incense Marine & Blue Elegance",
    "baseId": "user-pp-navy-intense-0061",
    "companionId": "user-pp-sweet-water-1262",
    "score": 93,
    "rationale": "Salty ocean spray, rosemary, and incense patchouli blend seamlessly with Bleu’s aromatic ginger and cedar.",
    "caution": "Both scents carry incense facets; allow the fresh aquatic opening to settle for 5 minutes.",
    "sequence": "2 sprays Sweet Water on torso + 2 sprays Navy Intense on outer collar."
  },
  {
    "title": "Aromatic Fougère & Blue Cedar",
    "baseId": "user-pp-navy-intense-0061",
    "companionId": "user-pp-herb-garden-1598",
    "score": 92,
    "rationale": "Crisp green apple, lavender, and cool cardamom add tailored refinement to the deep grapefruit and cedar base.",
    "caution": "Crisp and magnetic for office or boardroom settings. 1-2 sprays each.",
    "sequence": "2 sprays Navy Intense as the base + 1 spray Herb Garden on the collar."
  },
  {
    "title": "Aquatic Citrus Surge",
    "baseId": "user-pp-navy-intense-0061",
    "companionId": "user-pp-intenso-water-1329",
    "score": 92,
    "rationale": "Green mandarin, mineral marine ozone, and cypress infuse vibrant ocean energy into the refined blue woods.",
    "caution": "Very fresh and uplifting for spring and summer daytime wear.",
    "sequence": "2 sprays Intenso Water all over + 2 sprays Navy Intense on collar."
  },
  {
    "title": "Royal Honey Apple & Lavender",
    "baseId": "user-voux-elegante",
    "companionId": "user-pp-herb-garden-1598",
    "score": 94,
    "rationale": "Shared aromatic lavender and vanilla notes create natural harmony; crisp apple and cardamom lift the honeyed tobacco.",
    "caution": "Both fragrances have strong longevity. A 1:1 spray ratio provides all-day projection.",
    "sequence": "1 spray Voux Elegante on chest + 1 spray Herb Garden on neck."
  },
  {
    "title": "Golden Honey Tobacco & Spiced Vanilla",
    "baseId": "user-voux-elegante",
    "companionId": "user-pp-leaf-flavour-0401",
    "score": 93,
    "rationale": "Bright Mediterranean citruses and honeyed lavender soften and illuminate dry, dense tobacco leaf and cacao.",
    "caution": "Dense gourmand-tobacco profile. Strictly for cold autumn and winter evenings.",
    "sequence": "1 spray Leaf Flavour as base + 1 spray Voux Elegante over top."
  },
  {
    "title": "Amber Tobacco & Velvet Honey",
    "baseId": "user-voux-elegante",
    "companionId": "user-dg-the-one-edp",
    "score": 92,
    "rationale": "The One’s warm amber, cardamom, and subtle ginger blend intimately with Naxos’s honeyed tobacco, tonka, and cashmeran.",
    "caution": "Naxos easily projects louder than The One. Use 2 sprays of The One to 1 spray of Voux Elegante.",
    "sequence": "2 sprays The One EDP on chest + 1 spray Voux Elegante on back of neck."
  },
  {
    "title": "Spiced Kulfi & Smoky Agarwood",
    "baseId": "user-tf-noir-extreme",
    "companionId": "user-tf-oud-wood-spray",
    "score": 95,
    "rationale": "Dry, aristocratic rosewood, cardamom, and vetiver cleanly balance lush creamy pistachio kulfi and vanilla.",
    "caution": "Exquisite formal pairing. Spray Oud Wood across torso and shoulders, Noir Extreme on pulse points.",
    "sequence": "Apply Oud Wood all-over first, then apply 2 sprays Noir Extreme on wrists and neck."
  },
  {
    "title": "Black Cherry & Spiced Kulfi",
    "baseId": "user-tf-noir-extreme",
    "companionId": "user-pp-astray-fruit-1947",
    "score": 94,
    "rationale": "Tart cherry liqueur and roasted bitter almond fold into sweet cardamom, amber, and Indian pistachio kulfi.",
    "caution": "Decadent gourmand statement. Limit to 1 spray of Astray Fruit to let the kulfi breathe.",
    "sequence": "2 sprays Noir Extreme on neck + 1 spray Astray Fruit on outer lapel or collar."
  },
  {
    "title": "Dark Mocha & Saffron Kulfi",
    "baseId": "user-tf-noir-extreme",
    "companionId": "user-pp-noire-illusion-1746",
    "score": 93,
    "rationale": "Bitter cocoa, roasted espresso, and caramel meet cardamom, pistachio kulfi, and warm amber.",
    "caution": "Heavy dessert gourmand depth. Best reserved for late nights and winter dates.",
    "sequence": "1 spray Noire Illusion on chest + 2 sprays Noir Extreme on neck."
  },
  {
    "title": "Velvet Amber & Spiced Woods",
    "baseId": "user-tf-noir-extreme",
    "companionId": "user-dg-the-one-edp",
    "score": 92,
    "rationale": "Cardamom, amber, and ginger in The One merge with Noir Extreme’s saffron, amber, and sandalwood.",
    "caution": "Smooth and close-sitting scent bubble ideal for close encounters.",
    "sequence": "2 sprays The One on chest + 1-2 sprays Noir Extreme on collar."
  },
  {
    "title": "Crisp Apple & Smoldering Spices",
    "baseId": "user-pp-intense-aroma-exploding",
    "companionId": "user-pp-herb-garden-1598",
    "score": 93,
    "rationale": "Fresh mentholated cardamom and crisp green apple provide a luminous daytime lift to fiery black pepper and vanilla.",
    "caution": "Spicebomb can dominate. Use 2 sprays Herb Garden to 1 spray Intense Aroma Exploding.",
    "sequence": "2 sprays Herb Garden on front of neck + 1 spray Intense Aroma Exploding on back of neck."
  },
  {
    "title": "Spiced Cherry Tobacco",
    "baseId": "user-pp-intense-aroma-exploding",
    "companionId": "user-pp-astray-fruit-1947",
    "score": 93,
    "rationale": "Tart syrupy Griotte cherry and roasted almond cut through dense dry black pepper and warm cinnamon pipe tobacco.",
    "caution": "Rich, intoxicating evening projection. 1 spray Astray Fruit + 2 sprays Spicebomb.",
    "sequence": "2 sprays Intense Aroma Exploding as warm base + 1 spray Astray Fruit on wrists or jacket."
  },
  {
    "title": "Double Spiced Tobacco",
    "baseId": "user-pp-intense-aroma-exploding",
    "companionId": "user-pp-leaf-flavour-0401",
    "score": 92,
    "rationale": "Spicy pipe tobacco leaf, cacao, and tonka amplify black pepper, cinnamon, and bourbon vanilla.",
    "caution": "Beast-mode cold-weather performance. Spray with restraint in enclosed environments.",
    "sequence": "1 spray Leaf Flavour + 1 spray Intense Aroma Exploding."
  },
  {
    "title": "Spiced Mexican Mocha",
    "baseId": "user-pp-intense-aroma-exploding",
    "companionId": "user-pp-noire-illusion-1746",
    "score": 91,
    "rationale": "Roasted espresso beans, dark chocolate, and sugar cane meld with cinnamon, pimento, and bourbon vanilla.",
    "caution": "Creates a rich artisanal espresso martini accord with holiday spices.",
    "sequence": "1 spray Noire Illusion on lower chest + 1-2 sprays Intense Aroma Exploding on shoulders."
  },
  {
    "title": "Smoked Agarwood & Double Vanilla",
    "baseId": "user-laya-edp",
    "companionId": "user-lynx-signature-oud-vanilla",
    "score": 95,
    "rationale": "Shared sweet bourbon vanilla, smoked agarwood, and cedarwood harmonize into an ultra-smooth, long-lasting cloud.",
    "caution": "Both share warm vanilla and oud accords; very safe and universally appealing.",
    "sequence": "Apply Signature Oud Wood & Dark Vanilla on body, accent with 2 sprays Laya EDP on pulse points."
  },
  {
    "title": "Sweet Cedar Oud & Sandalwood",
    "baseId": "user-laya-edp",
    "companionId": "user-tf-oud-wood-spray",
    "score": 94,
    "rationale": "Laya’s creamy sweet vanilla and cedarwood are framed and elevated by Oud Wood’s dry rosewood, cardamom, and vetiver.",
    "caution": "Contrasts sweet Arabian vanilla oud with dry Western aristocratic woods.",
    "sequence": "Mist Oud Wood on upper body, then apply 2 sprays Laya EDP on neck."
  },
  {
    "title": "Vanilla Oud & Black Cherry",
    "baseId": "user-laya-edp",
    "companionId": "user-pp-astray-fruit-1947",
    "score": 93,
    "rationale": "Laya’s creamy vanilla and soft agarwood provide an opulent foundation for tart, syrupy cherry liqueur and bitter almond.",
    "caution": "Sumptuous evening gourmand. Spray Astray Fruit on wrists, Laya on neck.",
    "sequence": "2 sprays Laya EDP on neck + 1 spray Astray Fruit on collar."
  },
  {
    "title": "Bourbon Woods & Sweet Vanilla Oud",
    "baseId": "user-laya-edp",
    "companionId": "user-bbw-mahogany-woods",
    "score": 91,
    "rationale": "Bourbon, mahogany, and cognac wrap around Laya’s cedarwood, sweet vanilla, and musk.",
    "caution": "Warm, cozy, and fireside-ready.",
    "sequence": "Mist Mahogany Woods on torso + 2 sprays Laya EDP on pulse points."
  },
  {
    "title": "Citrus Leather & Incense Marine",
    "baseId": "user-pp-wood-miracle-1872",
    "companionId": "user-pp-sweet-water-1262",
    "score": 93,
    "rationale": "Smoky birch, Sicilian lemon, and white musk meet mineral sea spray, rosemary, and incense patchouli.",
    "caution": "Complex fresh-woody-smoky hybrid for warm spring and summer afternoons.",
    "sequence": "2 sprays Wood Miracle on chest + 2 sprays Sweet Water on neck."
  },
  {
    "title": "Fruity Woods & Crisp Cardamom Apple",
    "baseId": "user-pp-wood-miracle-1872",
    "companionId": "user-pp-herb-garden-1598",
    "score": 92,
    "rationale": "Blackcurrant, lemon, and birch leather intertwine with crisp green apple, lavender, and vanilla.",
    "caution": "High-compliment daytime signature crossover.",
    "sequence": "2 sprays Wood Miracle + 1 spray Herb Garden on neck."
  },
  {
    "title": "Marine Citrus & Birch Leather",
    "baseId": "user-pp-wood-miracle-1872",
    "companionId": "user-pp-intenso-water-1329",
    "score": 91,
    "rationale": "Green mandarin and oceanic mineral notes amplify the sparkling lemon before settling into clean birch leather and musk.",
    "caution": "High-heat daytime combo that cuts through summer humidity.",
    "sequence": "2 sprays Intenso Water + 2 sprays Wood Miracle."
  },
  {
    "title": "Dual Coast Oceanic Depth",
    "baseId": "user-pp-intenso-water-1329",
    "companionId": "user-pp-sweet-water-1262",
    "score": 95,
    "rationale": "Profondo’s sparkling green mandarin and mineral marine notes float over Profumo’s smoky incense and patchouli base.",
    "caution": "Seamless marine family layering that combines the best facets of both legendary flankers.",
    "sequence": "2 sprays Sweet Water on lower chest + 2 sprays Intenso Water on neck and shoulders."
  },
  {
    "title": "Aquatic Incense & Sandalwood Woods",
    "baseId": "user-pp-sweet-water-1262",
    "companionId": "user-tf-oud-wood-spray",
    "score": 91,
    "rationale": "Ocean spray, rosemary, and incense gain refined woody structure from rosewood, cardamom, and sandalwood.",
    "caution": "Light woody-aquatic balance for formal daytime occasions.",
    "sequence": "Mist Oud Wood across torso + 2 sprays Sweet Water on collar."
  },
  {
    "title": "Spiced Amber & Rich Tobacco Leaf",
    "baseId": "user-dg-the-one-edp",
    "companionId": "user-pp-leaf-flavour-0401",
    "score": 93,
    "rationale": "The One’s intimate amber-tobacco accord receives an enormous boost in depth and longevity from dense tobacco leaf and tonka.",
    "caution": "Tobacco Vanille can easily overpower The One. Spray 2 sprays The One to 1 spray Leaf Flavour.",
    "sequence": "2 sprays The One EDP on chest + 1 spray Leaf Flavour on back of neck."
  },
  {
    "title": "Amber Tobacco & Golden Mahogany",
    "baseId": "user-dg-the-one-edp",
    "companionId": "user-bbw-mahogany-woods",
    "score": 91,
    "rationale": "Bourbon, golden mahogany, and cognac enrich The One’s cedar, cardamom, and warm amber.",
    "caution": "Intimate, warm, and cozy date-night sillage.",
    "sequence": "Mist Mahogany Woods on torso + 2 sprays The One EDP on neck."
  },
  {
    "title": "Dark Cherry Smoke & Agarwood",
    "baseId": "user-tf-oud-wood-spray",
    "companionId": "user-pp-astray-fruit-1947",
    "score": 94,
    "rationale": "Tart cherry liqueur and bitter almond cut cleanly through dry rosewood, cardamom, and smoky agarwood.",
    "caution": "Mimics the dark, opulent profile of high-end smoky cherry releases.",
    "sequence": "Mist Oud Wood across torso + 2 sprays Astray Fruit on wrists and neck."
  },
  {
    "title": "Cardamom Sandalwood & Apple Fougère",
    "baseId": "user-tf-oud-wood-spray",
    "companionId": "user-pp-herb-garden-1598",
    "score": 92,
    "rationale": "Oud Wood’s cardamom and sandalwood reinforce Layton’s crisp green apple, lavender, and vanilla heart.",
    "caution": "Sophisticated, tailored masculine sillage.",
    "sequence": "Mist Oud Wood on chest + 2 sprays Herb Garden on collar."
  },
  {
    "title": "Refined Agarwood & Dark Smoked Vanilla",
    "baseId": "user-tf-oud-wood-spray",
    "companionId": "user-lynx-signature-oud-vanilla",
    "score": 93,
    "rationale": "Dry rosewood and cardamom complement the smoked dark vanilla, amber, and warm woods.",
    "caution": "Creates a rich, multifaceted woody-amber trail.",
    "sequence": "Apply Signature Oud Wood & Dark Vanilla + mist TF Oud Wood on upper body."
  },
  {
    "title": "Bourbon Mahogany & Spiced Tobacco",
    "baseId": "user-bbw-mahogany-woods",
    "companionId": "user-pp-leaf-flavour-0401",
    "score": 93,
    "rationale": "Rich mahogany woods and cognac meet spicy tobacco leaf, cacao, and tonka bean.",
    "caution": "Fireside winter powerhouse.",
    "sequence": "Mist Mahogany Woods on chest + 1 spray Leaf Flavour on collar."
  },
  {
    "title": "Smoked Vanilla Woods & Tobacco Leaf",
    "baseId": "user-lynx-signature-oud-vanilla",
    "companionId": "user-pp-leaf-flavour-0401",
    "score": 92,
    "rationale": "Dark vanilla and smoked warm woods blend with sweet pipe tobacco, tonka bean, and dried fruits.",
    "caution": "Deep and comforting cold-weather aroma.",
    "sequence": "Apply Signature Oud Wood & Dark Vanilla + 1-2 sprays Leaf Flavour on neck."
  },
  {
    "title": "Smoked Vanilla Oud & Black Cherry",
    "baseId": "user-lynx-signature-oud-vanilla",
    "companionId": "user-pp-astray-fruit-1947",
    "score": 91,
    "rationale": "Smoked wood and dark vanilla anchor tart, syrupy cherry liqueur and bitter almond.",
    "caution": "Rich cherry-vanilla dessert profile.",
    "sequence": "Apply Signature Oud Wood & Dark Vanilla + 1 spray Astray Fruit on collar."
  },
  {
    "title": "Cherry Tobacco & Spiced Vanilla",
    "baseId": "user-pp-astray-fruit-1947",
    "companionId": "user-pp-leaf-flavour-0401",
    "score": 93,
    "rationale": "Sweet cherry liqueur and bitter almond add mouthwatering fruitiness to rich spicy tobacco leaf and vanilla.",
    "caution": "Very rich and potent. 1 spray Astray Fruit + 1 spray Leaf Flavour.",
    "sequence": "1 spray Leaf Flavour as base + 1 spray Astray Fruit over top."
  },
  {
    "title": "Black Forest Mocha & Cherry",
    "baseId": "user-pp-astray-fruit-1947",
    "companionId": "user-pp-noire-illusion-1746",
    "score": 92,
    "rationale": "Dark chocolate, roasted espresso, and rum marry tart cherry syrup and roasted almond like a Black Forest gateau.",
    "caution": "Pure unadulterated luxury gourmand.",
    "sequence": "1 spray Noire Illusion on chest + 1 spray Astray Fruit on collar."
  },
  {
    "title": "Woody Amber Anchor",
    "baseId": "user-pp-particle-iso-e-super",
    "companionId": "user-dg-the-one-edp",
    "score": 92,
    "rationale": "Particle’s minimalist cedarwood profile provides a subtle woody base for The One’s warm amber, cardamom, and ginger.",
    "caution": "Enhances the intimate woody-amber presence of The One.",
    "sequence": "2 sprays Particle as base layer, then 2 sprays The One EDP over top."
  },
  {
    "title": "Cedar & Smoky Citrus",
    "baseId": "user-pp-particle-iso-e-super",
    "companionId": "user-pp-wood-miracle-1872",
    "score": 91,
    "rationale": "Velvety cedarwood supports sparkling Sicilian lemon, blackcurrant, and birch leather.",
    "caution": "Clean, uplifting woody-citrus synergy.",
    "sequence": "2 sprays Particle on torso, then 2 sprays Wood Miracle on neck."
  },
  {
    "title": "Cedarwood & Blue Incense",
    "baseId": "user-pp-particle-iso-e-super",
    "companionId": "user-pp-navy-intense-0061",
    "score": 90,
    "rationale": "Minimalist cedar complements Bleu’s clean grapefruit, incense, and cedarwood base.",
    "caution": "Subtle woody reinforcement for daily wear.",
    "sequence": "2 sprays Particle on chest, then 2 sprays Navy Intense on collar."
  },
  {
    "title": "Sparkling Mandarin & Smoky Leather",
    "baseId": "user-pp-citrus-particle-0616",
    "companionId": "user-pp-wood-miracle-1872",
    "score": 93,
    "rationale": "Photorealistic sparkling mandarin orange juice and cedarwood fuse with lemon, blackcurrant, and birch leather.",
    "caution": "Vibrant and zesty high-heat combination.",
    "sequence": "2 sprays Citrus Particle + 2 sprays Wood Miracle."
  },
  {
    "title": "Sparkling Citrus & Blue Woods",
    "baseId": "user-pp-citrus-particle-0616",
    "companionId": "user-pp-navy-intense-0061",
    "score": 92,
    "rationale": "Effervescent mandarin orange lifts Bleu’s aromatic grapefruit and incense base.",
    "caution": "Bright, uplifting daytime blue-citrus hybrid.",
    "sequence": "2 sprays Citrus Particle on chest + 2 sprays Navy Intense on collar."
  },
  {
    "title": "Mandarin Marine Splash",
    "baseId": "user-pp-citrus-particle-0616",
    "companionId": "user-pp-intenso-water-1329",
    "score": 91,
    "rationale": "Crisp mandarin orange and cedarwood reinforce Profondo’s green mandarin and oceanic mineral notes.",
    "caution": "Maximum summer freshness.",
    "sequence": "2 sprays Citrus Particle + 2 sprays Intenso Water."
  },
  {
    "title": "Ambergris Radiance & Blue Woods",
    "baseId": "user-pp-second-particle-1980",
    "companionId": "user-pp-navy-intense-0061",
    "score": 92,
    "rationale": "Crisp dry ambergris warmth amplifies the mineral amber and cedarwood foundation of Bleu de Chanel.",
    "caution": "Increases oceanic radiance and sillage without competing notes.",
    "sequence": "2 sprays Second Particle on chest, then 2 sprays Navy Intense on neck."
  },
  {
    "title": "Marine Ambergris & Incense",
    "baseId": "user-pp-second-particle-1980",
    "companionId": "user-pp-sweet-water-1262",
    "score": 91,
    "rationale": "Salty ambergris texture enhances mineral sea spray, rosemary, and smoky incense patchouli.",
    "caution": "Deepens the oceanic mineral presence.",
    "sequence": "2 sprays Second Particle on torso + 2 sprays Sweet Water on neck."
  },
  {
    "title": "Warm Ambergris & Velvet Amber",
    "baseId": "user-pp-second-particle-1980",
    "companionId": "user-dg-the-one-edp",
    "score": 90,
    "rationale": "Dry ambergris skin warmth anchors the intimate tobacco and amber accord of The One.",
    "caution": "Subtle, intimate sillage enhancement.",
    "sequence": "2 sprays Second Particle as base + 2 sprays The One EDP on pulse points."
  }
];
let currentDuoFilter = 'all';

function plural(count, singular, pluralWord = singular + 's') {
  return `${count} ${count === 1 ? singular : pluralWord}`;
}

function accordBridgeMarkup(base, companion) {
  if (!base || !companion) return '';
  const a = (base.mainAccords || []).map(x => x.name);
  const b = (companion.mainAccords || []).map(x => x.name);
  const shared = a.filter(name => b.some(other => other.toLowerCase() === name.toLowerCase()));
  const pills = shared.length
    ? shared.slice(0, 3).map(name => `<span class="duo-accord-pill">Shared: ${h(name)}</span>`)
    : [a[0], b[0]].filter(Boolean).map(name => `<span class="duo-accord-pill">${h(name)}</span>`);
  return pills.length ? `<div class="duo-accord-bridges">${pills.join('')}</div>` : '';
}

function matchesDuoFilter(base, comp, filter = currentDuoFilter) {
  if (!base || !comp || filter === 'all') return true;
  const hasOccasion = pattern =>
    (base.occasions || []).some(o => pattern.test(o)) ||
    (comp.occasions || []).some(o => pattern.test(o));
  if (filter === 'daytime') {
    return ((base.timeOfDay?.day || 0) >= 50 || (comp.timeOfDay?.day || 0) >= 50) &&
      hasOccasion(/Gym|Running|Walking|Casual|Parks/i);
  }
  if (filter === 'evening') {
    return ((base.timeOfDay?.night || 0) >= 60 || (comp.timeOfDay?.night || 0) >= 60) &&
      hasOccasion(/Dates|Wedding|Clubbing/i);
  }
  if (filter === 'office') {
    return hasOccasion(/Office|Work/i);
  }
  if (filter === 'cold') {
    return ((base.seasons?.autumn || 0) + (base.seasons?.winter || 0) >= 65) &&
      ((comp.seasons?.autumn || 0) + (comp.seasons?.winter || 0) >= 65);
  }
  if (filter === 'warm') {
    return ((base.seasons?.spring || 0) + (base.seasons?.summer || 0) >= 50) ||
      ((comp.seasons?.spring || 0) + (comp.seasons?.summer || 0) >= 50);
  }
  return true;
}

function notify(message, error = false) {
  const el = $('inventoryStatus');
  if (!el) return;
  if (!message) {
    el.replaceChildren();
    el.hidden = true;
    return;
  }
  el.replaceChildren();
  const span = document.createElement('span');
  span.textContent = message;
  const dismiss = document.createElement('button');
  dismiss.type = 'button';
  dismiss.className = 'status-dismiss-btn';
  dismiss.setAttribute('aria-label', 'Dismiss notification');
  dismiss.textContent = '×';
  dismiss.addEventListener('click', () => {
    el.replaceChildren();
    el.hidden = true;
  });
  el.appendChild(span);
  el.appendChild(dismiss);
  el.classList.toggle('is-error', error);
  el.hidden = false;
}

function loadCollection() {
  const loaded = Inventory.load(storage, FRAGRANCE_DATABASE);
  collection = loaded.collection;
  recoveryData = loaded.recovery;
  loadedRaw = loaded.storedRaw;
  recoveryRequired = loaded.recoveryRequired;
  recoveryExported = false;
  if (!loaded.storedRaw && loaded.recovery && !loaded.recoveryRequired) {
    try {
      storage.setItem(Inventory.KEY, JSON.stringify(loaded.state));
      loadedRaw = JSON.stringify(loaded.state);
    } catch {}
  }
  if ($('exportRecoveryBtn')) {
    $('exportRecoveryBtn').hidden = !loaded.recovery;
    $('exportRecoveryBtn').textContent = loaded.recoveryRequired ? 'Export recovery data' : 'Export previous backup';
  }
  if (loaded.warning && loaded.recoveryRequired) notify(loaded.warning, true);
}

async function commitCollection(next, message) {
  if (recoveryRequired && !recoveryExported) {
    notify('Export recovery data before saving. The unreadable original remains protected.', true);
    return false;
  }
  const save = () => {
    let validated, state;
    try {
      if (storage.getItem(Inventory.KEY) !== loadedRaw) {
        loadCollection();
        refreshPage();
        notify('Another tab changed the collection. Your edit was not saved; review the latest data and try again.', true);
        return false;
      }
      validated = Inventory.records(next);
      state = Inventory.save(storage, validated, FRAGRANCE_DATABASE);
    } catch (error) {
      notify('Not saved. Your existing collection is unchanged. ' + error.message + ' Export a backup or try a smaller photo.', true);
      return false;
    }
    collection = validated;
    loadedRaw = JSON.stringify(state);
    recoveryRequired = false;
    refreshPage();
    notify(message);
    return true;
  };
  return navigator.locks ? navigator.locks.request(Inventory.KEY, save) : save();
}

function initTheme() {
  $('themeToggleBtn')?.addEventListener('click', () =>
    applyTheme(document.documentElement?.dataset?.theme === 'dark' ? 'light' : 'dark')
  );
  applyTheme(document.documentElement?.dataset?.theme || 'light');
}

function applyTheme(theme) {
  theme = theme === 'dark' ? 'dark' : 'light';
  if (document.documentElement?.dataset) document.documentElement.dataset.theme = theme;
  else document.documentElement?.setAttribute?.('data-theme', theme);
  const meta = $('themeColorMeta');
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#0B0D10' : '#F4F5F6');
  try {
    storage.setItem('atelier_theme', theme);
  } catch {}
  const button = $('themeToggleBtn');
  if (button) {
    const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
    button.title = label;
    button.setAttribute('aria-label', label);
    button.setAttribute('aria-pressed', String(theme === 'dark'));
  }
}

function closeDialog(force = false) {
  if (!activeDialog) return true;
  if (force !== true && activeDialog.id === 'addBottleModal' && editorDirty() && !confirm('Discard unsaved bottle changes?')) return false;
  const old = activeDialog;
  old.classList.remove('open');
  old.setAttribute('aria-hidden', 'true');
  for (const [el, previous] of inertBefore) el.inert = previous;
  inertBefore.clear();
  document.body.classList.remove('dialog-open');
  $('mobileMenuBtn')?.setAttribute('aria-expanded', 'false');
  activeDialog = null;
  if (old.id === 'addBottleModal') photoToken++;
  const replacement = returnFocus?.dataset?.detail ? document.querySelector('[data-detail="' + returnFocus.dataset.detail + '"]') : null;
  (returnFocus?.isConnected && returnFocus.getClientRects().length ? returnFocus : replacement || $('addFragranceBtn') || $('main-content'))?.focus();
  return true;
}

function editorSnapshot() {
  return [...$('addFragranceForm').elements].filter(el => el.name).map(el => [el.name, el.value]);
}

function editorDirty() {
  return pendingPhoto !== null || photoRemoved || JSON.stringify(editorSnapshot()) !== editorInitial;
}

function openDialog(dialog) {
  if (!dialog) return;
  const trigger = activeDialog ? returnFocus : document.activeElement;
  closeDialog(true);
  returnFocus = trigger;
  activeDialog = dialog;
  dialog.classList.add('open');
  dialog.setAttribute('aria-hidden', 'false');
  let branch = dialog;
  while (branch.parentElement) {
    for (const sibling of branch.parentElement.children) {
      if (sibling !== branch && !inertBefore.has(sibling)) {
        inertBefore.set(sibling, sibling.inert);
        sibling.inert = true;
      }
    }
    if (branch.parentElement === document.body) break;
    branch = branch.parentElement;
  }
  document.body.classList.add('dialog-open');
  $('mobileMenuBtn')?.setAttribute('aria-expanded', String(dialog.id === 'mobileDrawer'));
  dialog.querySelector('button,input,select,a[href]')?.focus();
}

function initDialogs() {
  document.querySelectorAll('.modal-overlay,#mobileDrawer').forEach(dialog => {
    dialog.setAttribute('aria-hidden', 'true');
    dialog.addEventListener('click', e => {
      if (e.target === dialog && dialog.id !== 'addBottleModal') closeDialog();
    });
  });
  for (const id of ['modalCloseBtn', 'addModalCloseBtn', 'cancelAddBtn', 'mobileDrawerClose']) {
    $(id)?.addEventListener('click', closeDialog);
  }
  $('mobileMenuBtn')?.addEventListener('click', () => openDialog($('mobileDrawer')));
  document.addEventListener('keydown', event => {
    if (!activeDialog) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeDialog();
      return;
    }
    if (event.key === 'Tab') {
      const list = [...activeDialog.querySelectorAll('button,a[href],input,select,textarea,[tabindex="0"]')].filter(
        el => !el.disabled && !el.hidden && el.getClientRects().length
      );
      if (!list.length) {
        event.preventDefault();
        return;
      }
      const first = list[0], last = list.at(-1);
      if (event.shiftKey && (document.activeElement === first || !activeDialog.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
}

function bottleCard(item) {
  const topAccords = (item.mainAccords || []).slice(0, 3).map(a =>
    `<span class="card-accord-row"><span class="card-accord-name">${h(a.name)}</span><span class="card-accord-track"><span class="card-accord-fill" style="width:${Math.min(100, Math.max(12, a.percentage ?? 50))}%;background:${h(a.color || '#8C4A27')}"></span></span></span>`
  ).join('');
  const volText = item.remainingMl != null && item.bottleSize != null
    ? `${item.remainingMl}/${item.bottleSize}ml`
    : item.remainingMl != null
      ? `${item.remainingMl}ml`
      : (item.concentration || 'Vault Flacon');
  const ratingBadge = item.rating != null ? `<span class="card-rating-pill">★ ${item.rating.toFixed(1)}</span>` : '';
  return `<button type="button" class="boutique-product-card" data-detail="${h(item.id)}" aria-label="View details for ${h(item.name)}"><span class="boutique-card-topline"><span class="boutique-brand-name">${h(item.brand)}</span>${ratingBadge}</span><span class="boutique-pedestal-stage"><img class="boutique-bottle-img" src="${h(imageSource(item))}" alt="${h(item.name)}" width="375" height="500" loading="lazy"><span class="boutique-origin-tag">${item.cloneOf ? `Inspired by ${h(item.cloneOf.originalName)}` : 'Original Flacon'}</span></span><span class="boutique-card-info"><span class="boutique-fragrance-name">${h(item.name)}</span><span class="boutique-lineage-note">${h(item.crg || (item.cloneOf ? `Inspired by ${item.cloneOf.originalName}` : 'Personal collection'))}</span>${topAccords ? `<span class="card-accord-stack" aria-hidden="true">${topAccords}</span>` : ''}<span class="boutique-notes-summary">${h(item.notes.top.map(n => n.name).slice(0, 3).join(' · ') || 'Notes not recorded')}</span><span class="boutique-card-footer"><span class="boutique-concentration-badge">${h(item.concentration || 'Concentration unknown')} · ${h(volText)}</span><span class="card-inspect-cta">Dossier →</span></span></span></button>`;
}

function renderOccasions() {
  document.querySelectorAll('[data-occasion-grid]').forEach(grid => {
    const items = collection.filter(i => i.occasions.includes(grid.dataset.occasionGrid));
    grid.innerHTML = items.map(bottleCard).join('') || '<p>No bottles tagged for this occasion. Edit a bottle to add tags.</p>';
    const count = grid.parentElement.querySelector('[data-occasion-count]');
    if (count) count.textContent = plural(items.length, 'tagged bottle');
  });
  document.querySelectorAll('[data-occasion-preview]').forEach(rail => {
    const items = collection.filter(i => i.occasions.includes(rail.dataset.occasionPreview)).slice(0, 3);
    rail.innerHTML = items.map(i => `<button type="button" class="world-flacon-thumb-item" data-detail="${h(i.id)}" title="${h(i.name)}"><img class="world-flacon-thumb-img" src="${h(imageSource(i))}" alt="${h(i.name)}" width="100" height="130" loading="lazy"><span class="world-flacon-thumb-name">${h(i.name)}</span></button>`).join('') || '<p>No tagged bottles yet.</p>';
  });
}

function filterChoices() {
  const values = field => [...new Set(collection.map(i => i[field]).filter(Boolean))].sort((a, b) => a.localeCompare(b));
  return {
    occasion: [...new Set([...OCCASIONS.map(o => o[1]), ...collection.flatMap(i => i.occasions)])].filter(tag => collection.some(i => i.occasions.includes(tag))),
    scentType: ['fresh', 'woody', 'sweet', 'spicy', 'tobacco', 'citrus', 'aquatic'],
    season: ['spring', 'summer', 'autumn', 'winter'],
    timeOfDay: ['day', 'night'],
    originType: ['clone', 'original'],
    brand: values('brand'),
    concentration: values('concentration'),
    wardrobeArchetype: values('wardrobeArchetype'),
    longevity: values('longevity'),
    sillage: values('sillage')
  };
}

function syncFilterControls() {
  const choices = filterChoices();
  for (const [key, values] of Object.entries(choices)) {
    if (vaultFilters[key] !== 'all' && !values.includes(vaultFilters[key])) vaultFilters[key] = 'all';
    const row = document.querySelector(`.filter-pills-wrap[data-group="${key}"]`);
    if (row) {
      row.innerHTML = ['all', ...values].map(value => `<button type="button" class="filter-chip-btn ${vaultFilters[key] === value ? 'active' : ''}" aria-pressed="${vaultFilters[key] === value}" data-filter="${h(value)}">${h(value === 'all' ? 'All' : value)}</button>`).join('');
    }
  }
  const secondaryKeys = ['timeOfDay', 'originType', 'brand', 'concentration', 'wardrobeArchetype', 'longevity', 'sillage'];
  const activeSecondary = secondaryKeys.filter(k => vaultFilters[k] && vaultFilters[k] !== 'all').length;
  const badge = $('moreFiltersActiveCount');
  if (badge) {
    badge.textContent = `${activeSecondary} active`;
    badge.hidden = activeSecondary === 0;
  }
  if ($('vaultSortSelect')) $('vaultSortSelect').value = vaultFilters.sort;
  if ($('vaultSearchInput')) $('vaultSearchInput').value = vaultFilters.search;
}

function readFilterUrl() {
  const params = new URLSearchParams(location.search), choices = filterChoices();
  for (const [key, values] of Object.entries(choices)) {
    const raw = params.get(key) || (key === 'occasion' ? params.get('scenario') : null);
    vaultFilters[key] = values.find(v => v.toLowerCase() === raw?.toLowerCase()) || 'all';
  }
  vaultFilters.search = (params.get('search') || '').slice(0, 200);
  vaultFilters.sort = ['rating', 'name', 'brand', 'volume'].includes(params.get('sort')) ? params.get('sort') : 'rating';
}

function updateFilterUrl() {
  if (document.body?.dataset?.page !== 'collection') return;
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(vaultFilters)) {
    if (value && value !== DEFAULT_FILTERS[key]) params.set(key, value);
  }
  history.replaceState(null, '', `${location.pathname}${params.size ? '?' + params : ''}${location.hash}`);
}

function scentMatches(item, type) {
  const profile = `${item.crg} ${item.mainAccords.map(a => a.name).join(' ')}`.toLowerCase();
  const patterns = {
    fresh: /fresh|clean|aquatic|marine|aromatic|citrus/,
    woody: /wood|cedar|oud|sandal/,
    sweet: /sweet|vanilla|tonka|gourmand|caramel|chocolate/,
    spicy: /spic|pepper|cinnamon|cardamom/,
    tobacco: /tobacco|boozy|rum|cognac/,
    citrus: /citrus|lemon|bergamot|mandarin|grapefruit/,
    aquatic: /aquatic|marine|ocean|sea notes/
  };
  return patterns[type]?.test(profile) ?? true;
}

function filteredCollection() {
  return collection.filter(item => {
    const q = vaultFilters.search.toLowerCase();
    const searchable = [
      item.name, item.brand, item.cloneOf?.originalName, item.cloneOf?.originalHouse,
      item.perfumeParlourCode, ...item.mainAccords.map(a => a.name),
      ...Object.values(item.notes).flat().map(n => n.name)
    ].join(' ').toLowerCase();
    if (q && !searchable.includes(q)) return false;
    if (vaultFilters.occasion !== 'all' && !item.occasions.includes(vaultFilters.occasion)) return false;
    if (vaultFilters.scentType !== 'all' && !scentMatches(item, vaultFilters.scentType)) return false;
    if (vaultFilters.season !== 'all' && (item.seasons[vaultFilters.season] || 0) < 20) return false;
    if (vaultFilters.timeOfDay !== 'all' && (item.timeOfDay[vaultFilters.timeOfDay] || 0) < 35) return false;
    if (vaultFilters.originType !== 'all' && item.isClone !== (vaultFilters.originType === 'clone')) return false;
    return ['brand', 'concentration', 'wardrobeArchetype', 'longevity', 'sillage'].every(
      k => vaultFilters[k] === 'all' || item[k] === vaultFilters[k]
    );
  }).sort((a, b) =>
    vaultFilters.sort === 'name' ? a.name.localeCompare(b.name) :
    vaultFilters.sort === 'brand' ? a.brand.localeCompare(b.brand) :
    vaultFilters.sort === 'volume' ? (b.remainingMl ?? -1) - (a.remainingMl ?? -1) :
    (b.rating ?? -1) - (a.rating ?? -1)
  );
}

function renderCollectionGrid() {
  const grid = $('boutiqueProductGrid');
  if (!grid) return;
  const items = filteredCollection();
  grid.innerHTML = items.map(bottleCard).join('') || '<div class="empty-collection"><h2>No bottles match</h2><p>Clear filters or add a bottle to your collection.</p><button type="button" class="btn-luxury" data-clear-filters>Clear filters</button></div>';
  if ($('vaultFilteredCount')) $('vaultFilteredCount').textContent = items.length;
  const chips = $('activeFilterChipsContainer');
  if (chips) {
    chips.replaceChildren();
    for (const [key, value] of Object.entries(vaultFilters)) {
      if (!value || value === DEFAULT_FILTERS[key] || key === 'sort') continue;
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'active-filter-badge';
      button.textContent = `${key === 'search' ? 'Search: ' : ''}${value} ×`;
      button.setAttribute('aria-label', `Remove ${key} filter ${value}`);
      button.addEventListener('click', () => {
        vaultFilters[key] = DEFAULT_FILTERS[key];
        syncFilterControls();
        renderCollectionGrid();
      });
      chips.appendChild(button);
    }
  }
  updateFilterUrl();
}

function resetAllFilters() {
  vaultFilters = { ...DEFAULT_FILTERS };
  syncFilterControls();
  renderCollectionGrid();
}

function initCollectionPage() {
  readFilterUrl();
  syncFilterControls();
  $('vaultFilterSystem')?.addEventListener('click', e => {
    const button = e.target.closest('[data-filter]');
    if (!button) return;
    vaultFilters[button.closest('[data-group]').dataset.group] = button.dataset.filter;
    syncFilterControls();
    renderCollectionGrid();
  });
  $('vaultSearchInput')?.addEventListener('input', e => {
    vaultFilters.search = e.target.value.slice(0, 200);
    renderCollectionGrid();
  });
  $('vaultSortSelect')?.addEventListener('change', e => {
    vaultFilters.sort = e.target.value;
    renderCollectionGrid();
  });
  window.addEventListener('popstate', () => {
    readFilterUrl();
    syncFilterControls();
    renderCollectionGrid();
  });
  renderCollectionGrid();
}

function initSotdControls() {
  const nav = $('sotdSeasonNav');
  if (!nav) return;
  if (!$('sotdOccasionSelect')) {
    const bar = document.createElement('div');
    bar.className = 'sotd-filter-bar';
    const label = document.createElement('label');
    label.className = 'sotd-filter-label';
    label.textContent = 'Occasion ';
    const select = document.createElement('select');
    select.id = 'sotdOccasionSelect';
    select.setAttribute('aria-label', 'Scent suggestion occasion');
    label.appendChild(select);
    select.addEventListener('change', () => {
      sotdOccasion = select.value;
      initSotdRecommendation(false);
    });
    const timeLabel = document.createElement('label');
    timeLabel.className = 'sotd-filter-label';
    timeLabel.textContent = 'Time ';
    const time = document.createElement('select');
    time.id = 'sotdTimeSelect';
    time.setAttribute('aria-label', 'Scent suggestion time');
    for (const [value, text] of [['auto', 'Current time'], ['day', 'Daytime'], ['night', 'Evening']]) {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = text;
      time.appendChild(option);
    }
    timeLabel.appendChild(time);
    time.addEventListener('change', () => {
      sotdTimeFilter = time.value;
      initSotdRecommendation(false);
    });
    bar.appendChild(label);
    bar.appendChild(timeLabel);
    nav.after(bar);
  }
  const select = $('sotdOccasionSelect'), values = filterChoices().occasion;
  if (sotdOccasion !== 'all' && !values.includes(sotdOccasion)) sotdOccasion = 'all';
  select.replaceChildren(...['all', ...values].map(value => {
    const option = document.createElement('option');
    option.value = value;
    option.textContent = value === 'all' ? 'Any occasion' : value;
    return option;
  }));
  select.value = sotdOccasion;
}

function getCalendarSeasonInfo(date = new Date()) {
  const m = date.getMonth(), hour = date.getHours();
  const calendarSeason = m >= 2 && m <= 4 ? 'spring' : m >= 5 && m <= 7 ? 'summer' : m >= 8 && m <= 10 ? 'autumn' : 'winter';
  return {
    calendarSeason,
    monthName: date.toLocaleString('en-GB', { month: 'long' }),
    timeKey: hour >= 18 || hour < 6 ? 'night' : 'day',
    timeLabel: hour >= 18 || hour < 6 ? 'Evening' : 'Daytime'
  };
}

function getInSeasonCandidates(season) {
  const timeKey = sotdTimeFilter === 'auto' ? getCalendarSeasonInfo().timeKey : sotdTimeFilter;
  return collection
    .filter(i => (i.seasons[season] || 0) >= 20 && (sotdOccasion === 'all' || i.occasions.includes(sotdOccasion)))
    .map(item => ({ item, seasonScore: item.seasons[season] || 0, timeScore: item.timeOfDay[timeKey] || 0 }))
    .sort((a, b) => b.seasonScore - a.seasonScore || b.timeScore - a.timeScore || (b.item.rating ?? -1) - (a.item.rating ?? -1));
}

function calculatePairingSynergy(base, companion) {
  if (!base || !companion || base.id === companion.id) {
    return { score: 0, synergyType: 'Choose two different bottles', rationale: 'A pairing needs two bottles.', sequence: '' };
  }
  if (isParticleOrMolecular(base) && isParticleOrMolecular(companion)) {
    return { score: 40, synergyType: 'Molecular clash', rationale: 'Synthetic single-note molecules do not provide synergistic contrast.', sequence: '' };
  }
  const matchesProfile = item => {
    const seed = FRAGRANCE_DATABASE.find(i => i.id === item.id);
    return seed && ['name', 'brand', 'concentration', 'notes', 'mainAccords'].every(
      key => JSON.stringify(item[key]) === JSON.stringify(seed[key])
    );
  };
  const pair = matchesProfile(base) && matchesProfile(companion)
    ? CURATED_SIGNATURE_DUOS.find(d => [d.baseId, d.companionId].includes(base.id) && [d.baseId, d.companionId].includes(companion.id))
    : null;
  const a = base.mainAccords.map(v => v.name.toLowerCase());
  const b = companion.mainAccords.map(v => v.name.toLowerCase());
  const shared = [...new Set(a.filter(v => b.includes(v)))];
  const marine = x => x.some(v => /marine|aquatic/.test(v));
  const rich = x => x.some(v => /rum|boozy|coffee|chocolate/.test(v));
  let score = pair?.score ?? Math.min(MIN_LAYERING_SCORE - 1, 60 + Math.round(30 * shared.length / Math.max(1, new Set([...a, ...b]).size)));
  let synergyType = pair ? (pair.title || 'Curated pairing') : shared.length ? 'Shared accords' : 'Contrasting profiles';
  let rationale = pair
    ? `${pair.rationale}${pair.caution ? ' Caution: ' + pair.caution : ''}`
    : shared.length
      ? `Harmonious pairing sharing ${shared.slice(0, 3).join(', ')} accords.`
      : 'Contrasting profiles: distinct note families that create depth when layered.';
  let sequence = pair?.sequence || 'No order, timing or ratio has been tested. Start with a small amount of each and judge by smell.';
  if (!pair && ((marine(a) && rich(b)) || (marine(b) && rich(a)))) {
    score = 45;
    synergyType = 'Contrasting marine / gourmand';
    rationale = 'Contrasting aquatic and rich gourmand profiles. Try a small test spray first.';
  }
  return { score, synergyType, rationale, sequence };
}

function layeringAdvice(item) {
  const option = getTopLayeringOptionsForFragrance(item, 1)[0];
  return option
    ? `Idea to try: ${option.partner.name} (${option.score}/100 editorial score, untested). Start lightly; results vary.`
    : 'No listed pairing meets the 90/100 editorial threshold. You can wear this fragrance on its own; unlisted combinations are not necessarily unsuitable.';
}

function getTopLayeringOptionsForFragrance(item, limit = 3) {
  const options = collection
    .filter(c => c.id !== item.id && !isParticleOrMolecular(c))
    .map(partner => ({ partner, ...calculatePairingSynergy(item, partner) }))
    .filter(option => option.score >= MIN_LAYERING_SCORE)
    .sort((a, b) => b.score - a.score || a.partner.name.localeCompare(b.partner.name));
  return options.slice(0, limit);
}

function flacon(item, className = 'duplex-flacon') {
  return `<button type="button" class="${className}" data-detail="${h(item.id)}"><img src="${h(imageSource(item))}" alt="${h(item.name)}" width="160" height="210" loading="lazy"><span>${h(item.name)}</span></button>`;
}

function initSotdRecommendation(reroll = false, targetId = null, season = null) {
  initSotdControls();
  const cal = getCalendarSeasonInfo();
  if (sotdTimeFilter !== 'auto') cal.timeLabel = sotdTimeFilter === 'day' ? 'Daytime' : 'Evening';
  sotdActiveSeason = season || sotdActiveSeason || cal.calendarSeason;
  const candidates = getInSeasonCandidates(sotdActiveSeason);
  const set = (id, value) => { if ($(id)) $(id).textContent = value; };
  for (const s of ['spring', 'summer', 'autumn', 'winter']) {
    const cap = s[0].toUpperCase() + s.slice(1);
    const button = document.querySelector(`.sotd-season-btn[data-season="${s}"]`);
    set(`sotdCount${cap}`, getInSeasonCandidates(s).length);
    if ($(`sotdTag${cap}`)) $(`sotdTag${cap}`).style.display = s === cal.calendarSeason ? '' : 'none';
    if (button) {
      button.classList.toggle('active', s === sotdActiveSeason);
      button.setAttribute('aria-pressed', String(s === sotdActiveSeason));
    }
  }
  const cap = sotdActiveSeason[0].toUpperCase() + sotdActiveSeason.slice(1);
  set('sotdSeasonBadgeText', `${cap} suggestions · ${cal.timeLabel}`);
  set('sotdSectionDesc', `${plural(candidates.length, 'bottle')} with a curated season score of at least 20/100. Season score takes priority, then time of day and personal rating. Uses calendar seasons, not live weather.`);
  const pool = reroll ? candidates.filter(c => c.item.id !== currentSotdFragranceId) : candidates;
  const item = candidates.find(c => c.item.id === targetId)?.item || (reroll && pool.length ? pool[Math.floor(Math.random() * pool.length)].item : candidates[0]?.item);
  if ($('sotdOptionsRail')) {
    $('sotdOptionsRail').innerHTML = candidates.map(c => `<button type="button" class="sotd-option-card ${c.item.id === item?.id ? 'active' : ''}" data-sotd="${h(c.item.id)}" aria-pressed="${c.item.id === item?.id}"><img class="sotd-option-thumb" src="${h(imageSource(c.item))}" alt="${h(c.item.name)}" width="100" height="130" loading="lazy"><span class="sotd-option-name">${h(c.item.name)}</span><span class="sotd-option-match">Season score ${c.seasonScore}/100</span></button>`).join('');
  }
  set('sotdOptionsTitle', `${cap} options (${candidates.length})`);
  if (!item) {
    currentSotdFragranceId = null;
    set('sotdTitle', 'No rated bottles for this season');
    if ($('sotdImg')) {
      $('sotdImg').src = Inventory.FALLBACK;
      $('sotdImg').alt = 'Bottle placeholder';
    }
    for (const id of ['sotdSubtitle', 'sotdCloneMeta', 'sotdTopNotes', 'sotdHeartNotes', 'sotdBaseNotes', 'sotdBlueprint', 'sotdQuickLayerText', 'sotdLayeringGrid', 'sotdPhotoSeasonTag', 'sotdAccordsPreview']) {
      if ($(id)) $(id).replaceChildren();
    }
    return;
  }
  currentSotdFragranceId = item.id;
  if ($('sotdImg')) {
    $('sotdImg').src = imageSource(item);
    $('sotdImg').alt = item.name;
  }
  set('sotdTitle', item.name);
  set('sotdSubtitle', item.description || 'Add your own scent description.');
  set('sotdCloneMeta', item.cloneOf ? `Inspired by ${item.cloneOf.originalName} · provisional reference` : item.brand);
  set('sotdPhotoSeasonTag', `Curated season score ${item.seasons[sotdActiveSeason]}/100`);
  for (const tier of ['top', 'heart', 'base']) {
    set(`sotd${tier[0].toUpperCase() + tier.slice(1)}Notes`, item.notes[tier].map(n => n.name).join(', ') || 'Not recorded');
  }
  if ($('sotdAccordsPreview')) {
    $('sotdAccordsPreview').innerHTML = (item.mainAccords || []).slice(0, 4).map(a =>
      `<div class="sotd-accord-bar-item"><div class="sotd-accord-bar-label"><span>${h(a.name)}</span><span>${a.percentage ?? 0}%</span></div><div class="sotd-accord-bar-track"><div class="sotd-accord-bar-fill" style="width:${Math.min(100, a.percentage ?? 0)}%;background:${h(a.color || '#8C4A27')}"></div></div></div>`
    ).join('');
  }
  set('sotdBlueprint', `Personal spray suggestion: ${item.recommendedSprays || 'not recorded'}${item.sprayBlueprint.length ? ' · ' + item.sprayBlueprint.join(', ') : ''}. Use less in shared spaces.`);
  const options = getTopLayeringOptionsForFragrance(item);
  set('sotdQuickLayerText', options.length ? `Idea to try: ${options[0].partner.name} (${options[0].score}/100 editorial score, untested). Start lightly.` : 'No listed pairing meets the 90/100 editorial threshold. You can wear this fragrance on its own; unlisted combinations are not necessarily unsuitable.');
  set('sotdLayeringTitle', `Pairing suggestions for ${item.name}`);
  if ($('sotdLayeringGrid')) {
    $('sotdLayeringGrid').innerHTML = options.map(opt => `<article class="sotd-layering-card"><div class="sotd-layering-card-top"><span class="world-badge-code">${h(opt.synergyType)}</span><span class="sotd-layering-score-pill">${opt.score}/100 · editorial, untested</span></div><div class="sotd-layering-duplex">${flacon(item, 'sotd-layering-flacon')}${flacon(opt.partner, 'sotd-layering-flacon')}</div><div class="sotd-layering-body"><h3>${h(opt.partner.name)}</h3>${accordBridgeMarkup(item, opt.partner)}<p>${h(opt.rationale)}</p><p>${h(opt.sequence)}</p></div><a class="btn-text-link" href="layering.html?base=${encodeURIComponent(item.id)}">Compare pairings →</a></article>`).join('');
  }
}

function renderLayeringDuos() {
  if (!$('layeringDuosContainer')) return;
  const allPairs = CURATED_SIGNATURE_DUOS
    .map(d => ({ d, base: collection.find(i => i.id === d.baseId), comp: collection.find(i => i.id === d.companionId) }))
    .filter(p => p.base && p.comp && !isParticleOrMolecular(p.base) && !isParticleOrMolecular(p.comp) && calculatePairingSynergy(p.base, p.comp).score >= MIN_LAYERING_SCORE);
  const pairs = allPairs.filter(p => matchesDuoFilter(p.base, p.comp, currentDuoFilter));
  $('layeringDuosContainer').innerHTML = pairs.map(({ d, base, comp }) => {
    const score = calculatePairingSynergy(base, comp);
    return `<article class="duo-editorial-card"><div class="duo-card-header"><span class="world-badge-code">Curated suggestion</span><span>${score.score}/100 · editorial, untested</span></div><h3 class="duo-card-title">${h(d.title)}</h3><div class="duo-bottles-duplex">${flacon(base)}<span aria-hidden="true">+</span>${flacon(comp)}</div>${accordBridgeMarkup(base, comp)}<p>${h(score.rationale)}</p><p class="duo-application-steps">${h(score.sequence)}</p></article>`;
  }).join('') || '<p>No listed pairing meets the 90/100 editorial threshold for this filter. Unlisted combinations are not necessarily unsuitable.</p>';
  if ($('modeCuratedDuosBtn')) $('modeCuratedDuosBtn').textContent = `Curated combinations (${allPairs.length})`;
}

function initInteractivePairingStudio() {
  const select = $('baseFragranceSelect');
  if (!select) return;
  const current = select.value || new URLSearchParams(location.search).get('base');
  select.replaceChildren(...collection.map(item => {
    const option = document.createElement('option');
    option.value = item.id;
    option.textContent = item.name;
    return option;
  }));
  select.value = collection.some(i => i.id === current) ? current : collection[0]?.id || '';
  updateInteractivePairings(select.value);
}

function updateInteractivePairings(id) {
  const base = collection.find(i => i.id === id);
  if ($('baseFlaconPreview')) $('baseFlaconPreview').innerHTML = base ? flacon(base) : '<p>No bottles in this collection.</p>';
  const options = base
    ? collection
        .filter(i => i.id !== id && !isParticleOrMolecular(i))
        .map(candidate => ({ candidate, ...calculatePairingSynergy(base, candidate) }))
        .filter(option => option.score >= MIN_LAYERING_SCORE)
        .sort((a, b) => b.score - a.score || a.candidate.name.localeCompare(b.candidate.name))
    : [];
  if ($('companionsCountBadge')) $('companionsCountBadge').textContent = `${plural(options.length, 'suggestion')} at 90/100 or above`;
  if ($('rankedCompanionsContainer')) {
    $('rankedCompanionsContainer').innerHTML = options.map(opt => `<article class="companion-rank-card">${flacon(opt.candidate, 'companion-bottle-button')}<div class="companion-rank-meta"><h3>${h(opt.synergyType)}</h3>${accordBridgeMarkup(base, opt.candidate)}<p>${h(opt.rationale)}</p><p>${h(opt.sequence)}</p></div><div class="companion-synergy-column"><span class="companion-synergy-score">${opt.score}</span><span>Editorial /100 · untested</span></div></article>`).join('') || '<p>No listed pairing meets the 90/100 editorial threshold. You can wear this fragrance on its own; unlisted combinations are not necessarily unsuitable.</p>';
  }
}

function setLayeringMode(interactive) {
  for (const [id, selected] of [['modeCuratedDuosBtn', !interactive], ['modeInteractiveStudioBtn', interactive]]) {
    if ($(id)) {
      $(id).classList.toggle('active', selected);
      $(id).setAttribute('aria-pressed', String(selected));
    }
  }
  if ($('curatedDuosView')) $('curatedDuosView').hidden = interactive;
  if ($('interactiveStudioView')) {
    $('interactiveStudioView').hidden = !interactive;
    $('interactiveStudioView').style.display = interactive ? 'block' : '';
  }
}

function performanceMeters(item) {
  const duration = Number(item.longevity.match(/(\d+(?:\.\d+)?)\s*h/i)?.[1]);
  const projection = /enormous|beast|heavy/i.test(item.sillage) ? 4 : /strong/i.test(item.sillage) ? 3 : /moderate/i.test(item.sillage) ? 2 : /intimate|soft/i.test(item.sillage) ? 1 : null;
  return (Number.isFinite(duration) && duration > 0 ? '<label>Stated duration estimate (hours)<meter min="0" max="24" value="' + Math.min(duration, 24) + '" aria-label="Provisional duration estimate">' + duration + '</meter></label>' : '') +
    (projection ? '<label>Curated projection tier (1–4)<meter min="0" max="4" value="' + projection + '" aria-label="Provisional projection tier">' + projection + '</meter></label>' : '');
}

function openDetailModal(id) {
  const item = collection.find(i => i.id === id);
  if (!item) return;
  const set = (key, value) => { if ($(key)) $(key).textContent = value; };
  if ($('modalBottleImg')) {
    $('modalBottleImg').src = imageSource(item);
    $('modalBottleImg').alt = item.name;
  }
  set('modalTitle', item.name);
  set('modalConcentration', `${item.concentration || 'Unknown concentration'} · ${item.bottleSize ?? '?'}ml`);
  set('modalCloneOrigin', item.cloneOf ? `Inspired by ${item.cloneOf.originalName} (${item.cloneOf.originalHouse || 'house not recorded'}) · unverified reference` : item.brand);
  set('modalDescription', item.description || 'No description recorded.');
  for (const tier of ['top', 'heart', 'base']) {
    set(`modal${tier[0].toUpperCase() + tier.slice(1)}Notes`, item.notes[tier].map(n => n.name).join(', ') || 'Not recorded');
  }
  set('modalSprayBlueprintText', `${item.recommendedSprays || 'Not recorded'}${item.sprayBlueprint.length ? ' · ' + item.sprayBlueprint.join(', ') : ''}. Personal starting suggestion; use less around others.`);
  set('modalLayeringPartner', layeringAdvice(item));
  const accordRows = item.mainAccords.map(a =>
    a.percentage == null
      ? `<div class="accord-row"><span>${h(a.name)}</span><span>Unrated</span></div>`
      : `<div class="accord-row"><span>${h(a.name)}</span><meter min="0" max="100" value="${a.percentage}" style="--accord-color:${a.color}" aria-label="${h(a.name)} estimated strength">${a.percentage}</meter><span>${a.percentage}/100</span></div>`
  ).join('') || '<p>Accords not recorded.</p>';
  $('modalInventoryDetails').innerHTML = `<p class="profile-provenance">${h(item.provenance || 'Owner-entered profile; not independently verified.')}</p><h3>Accord profile</h3>${accordRows}${performanceMeters(item)}<dl class="inventory-facts"><dt>Personal rating</dt><dd>${item.rating ?? 'Unknown'}${item.rating != null ? ' / 5 (provisional)' : ''}</dd><dt>Remaining volume</dt><dd>${item.remainingMl ?? 'Unknown'}${item.remainingMl != null ? 'ml' : ''}</dd><dt>Performance estimate</dt><dd>${h(item.longevity || 'Unknown')} · ${h(item.sillage || 'Unknown')}</dd><dt>Wardrobe role</dt><dd>${h(item.wardrobeArchetype || 'Not recorded')}</dd><dt>Bottle format</dt><dd>${h(item.flaconFormat || item.bottleType || 'Not recorded')}</dd><dt>Recorded year</dt><dd>${item.batchYear ?? 'Unknown'}</dd><dt>Gender label</dt><dd>${h(item.gender || 'Not recorded')}</dd><dt>Purchase source</dt><dd>${h(item.purchaseSource || 'Not recorded')}</dd><dt>Resting observation</dt><dd>${h(item.macerationStatus || 'Not recorded')}</dd></dl><label>Remaining volume<meter min="0" max="${item.bottleSize ?? 1}" value="${item.remainingMl ?? 0}" aria-label="Remaining bottle volume">${item.remainingMl ?? 'Unknown'}</meter></label><label for="detailRemaining">Update remaining volume (ml)</label><input id="detailRemaining" type="number" min="0" max="${item.bottleSize ?? 0}" step="0.1" value="${item.remainingMl ?? ''}" ${item.bottleSize == null ? 'disabled' : ''}><label for="detailRemainingSlider">Adjust volume</label><input id="detailRemainingSlider" type="range" min="0" max="${item.bottleSize ?? 0}" step="0.1" value="${item.remainingMl ?? 0}" ${item.bottleSize == null ? 'disabled' : ''}><div class="inventory-actions"><button type="button" class="btn-luxury" data-save-volume="${h(id)}" ${item.bottleSize == null ? 'disabled' : ''}>Save volume</button><button type="button" class="btn-luxury btn-luxury-ghost" data-log-wear="${h(id)}" ${item.bottleSize == null || !(item.remainingMl > 0) ? 'disabled' : ''}>Log 1 wear (-0.3ml)</button><button type="button" class="btn-luxury" data-edit="${h(id)}">Edit bottle / photo</button><button type="button" class="btn-luxury" data-delete="${h(id)}">Remove bottle</button></div>`;
  openDialog($('detailModal'));
}

function editorMarkup() {
  const input = (name, label, type = 'text', extra = '') => `<label for="edit-${name}">${label}<input id="edit-${name}" name="${name}" type="${type}" ${extra}></label>`;
  const area = (name, label) => `<label for="edit-${name}">${label}<textarea id="edit-${name}" name="${name}" rows="2" maxlength="3000"></textarea></label>`;
  return `<p>Changes stay in this browser. Export JSON to back up or move your collection. Leave unknown fields blank.</p><div class="editor-grid">${input('name', 'Fragrance name', 'text', 'required maxlength="120"')}${input('brand', 'Brand / maker', 'text', 'required maxlength="120"')}${input('bottleType', 'Bottle type (spray, oil, roll-on)')}${input('flaconFormat', 'Bottle format / label')}${input('batchYear', 'Recorded year', 'number', 'min="1900" max="2100"')}${input('concentration', 'Concentration', 'text', 'list="concentration-options" maxlength="120"')}${input('bottleSize', 'Bottle size (ml)', 'number', 'min="1" max="5000" step="0.1"')}${input('remainingMl', 'Remaining volume (ml)', 'number', 'min="0" max="5000" step="0.1"')}${input('rating', 'Your rating (0–5)', 'number', 'min="0" max="5" step="0.1"')}${input('originalName', 'Inspired by (optional)', 'text', 'maxlength="120"')}${input('originalHouse', 'Inspiration house', 'text', 'maxlength="120"')}${input('purchaseSource', 'Purchase source')}${input('wardrobeArchetype', 'Wardrobe role')}${input('longevity', 'Your longevity observation')}${input('sillage', 'Your projection observation')}</div><datalist id="concentration-options">${['Extrait de Parfum', 'Eau de Parfum', 'Eau de Toilette', 'Perfume Oil', 'Body Spray', 'Daily Fragrance'].map(v => `<option value="${v}">`).join('')}</datalist>${area('description', 'Description')}${area('occasions', 'Occasions (comma separated)')}${area('top', 'Top notes (comma separated)')}${area('heart', 'Heart notes (comma separated)')}${area('base', 'Base notes (comma separated)')}${area('mainAccords', 'Accords, one per line: name | strength 0–100')}${area('sprayBlueprint', 'Your spray routine (comma separated)')}${input('recommendedSprays', 'Personal spray amount')}${area('macerationStatus', 'Resting / maturation observation')}<fieldset><legend>Personal season and time scores (0–100; blank means unrated)</legend><div class="editor-grid">${['spring', 'summer', 'autumn', 'winter', 'day', 'night'].map(k => input(k, k[0].toUpperCase() + k.slice(1), 'number', 'min="0" max="100"')).join('')}</div></fieldset><label for="edit-photo">Bottle photograph (JPEG, PNG, WebP; maximum 8 MB)<input id="edit-photo" type="file" accept="image/jpeg,image/png,image/webp"></label><img id="editPhotoPreview" class="editor-photo" src="${Inventory.FALLBACK}" alt="Bottle photo preview" width="150" height="200"><button type="button" id="removePhotoBtn">Use original photo / placeholder</button><p id="editorError" role="alert"></p><div class="inventory-actions"><button type="button" id="editorCancel" class="btn-luxury">Cancel</button><button type="submit" class="btn-luxury btn-luxury-primary">Save bottle</button></div>`;
}

function openBottleEditor(id = null) {
  editedId = id;
  pendingPhoto = null;
  photoRemoved = false;
  const item = collection.find(i => i.id === id), form = $('addFragranceForm');
  form.reset();
  form.querySelector('[type=submit]').disabled = false;
  $('editorError').textContent = '';
  $('addBottleTitle').textContent = item ? 'Edit bottle' : 'Add bottle';
  for (const el of form.elements) if (el.name) el.value = '';
  if (item) {
    for (const el of form.elements) if (el.name && typeof item[el.name] !== 'object') el.value = item[el.name] ?? '';
    form.elements.originalName.value = item.cloneOf?.originalName || '';
    form.elements.originalHouse.value = item.cloneOf?.originalHouse || '';
    for (const key of ['occasions', 'sprayBlueprint']) form.elements[key].value = item[key].join(', ');
    for (const tier of ['top', 'heart', 'base']) form.elements[tier].value = item.notes[tier].map(n => n.name).join(', ');
    form.elements.mainAccords.value = item.mainAccords.map(a => `${a.name} | ${a.percentage ?? ''}`).join('\n');
    for (const k of ['spring', 'summer', 'autumn', 'winter']) form.elements[k].value = item.seasons[k] || '';
    for (const k of ['day', 'night']) form.elements[k].value = item.timeOfDay[k] || '';
  }
  $('editPhotoPreview').src = item ? imageSource(item) : Inventory.FALLBACK;
  openDialog($('addBottleModal'));
  photoToken++;
  editorInitial = JSON.stringify(editorSnapshot());
}

async function preparePhoto(file) {
  if (!file || file.size > 8 * 1024 * 1024 || !['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    throw Error('Choose JPEG, PNG or WebP up to 8 MB.');
  }
  const bytes = new Uint8Array(await file.arrayBuffer()), view = new DataView(bytes.buffer);
  let width = 0, height = 0;
  if (file.type === 'image/png' && bytes.length >= 24 && bytes.slice(0, 8).join(',') === '137,80,78,71,13,10,26,10') {
    width = view.getUint32(16);
    height = view.getUint32(20);
  }
  if (file.type === 'image/jpeg' && bytes[0] === 255 && bytes[1] === 216) {
    let offset = 2;
    while (offset + 4 < bytes.length) {
      if (bytes[offset++] !== 255) break;
      while (bytes[offset] === 255) offset++;
      const marker = bytes[offset++];
      if (marker === 218 || marker === 217) break;
      const size = view.getUint16(offset);
      if (size < 2 || offset + size > bytes.length) break;
      if ([192, 193, 194, 195, 197, 198, 199, 201, 202, 203, 205, 206, 207].includes(marker) && size >= 8) {
        height = view.getUint16(offset + 3);
        width = view.getUint16(offset + 5);
        break;
      }
      offset += size;
    }
  }
  if (file.type === 'image/webp' && bytes.length >= 30 && String.fromCharCode(...bytes.slice(0, 4)) === 'RIFF' && String.fromCharCode(...bytes.slice(8, 12)) === 'WEBP') {
    const type = String.fromCharCode(...bytes.slice(12, 16));
    if (type === 'VP8X') {
      width = 1 + bytes[24] + (bytes[25] << 8) + (bytes[26] << 16);
      height = 1 + bytes[27] + (bytes[28] << 8) + (bytes[29] << 16);
    }
    if (type === 'VP8L' && bytes[20] === 47) {
      const bits = view.getUint32(21, true);
      width = 1 + (bits & 16383);
      height = 1 + ((bits >>> 14) & 16383);
    }
    if (type === 'VP8 ' && bytes[23] === 157 && bytes[24] === 1 && bytes[25] === 42) {
      width = view.getUint16(26, true) & 16383;
      height = view.getUint16(28, true) & 16383;
    }
  }
  if (!width || !height) throw Error('Image contents do not match a supported file type.');
  if (width * height > 40000000) throw Error('Image dimensions exceed the 40 megapixel limit.');
  const scale = Math.min(1, 720 / Math.max(width, height)), targetWidth = Math.max(1, Math.round(width * scale)), targetHeight = Math.max(1, Math.round(height * scale));
  const bitmap = await createImageBitmap(file, { resizeWidth: targetWidth, resizeHeight: targetHeight, resizeQuality: 'high' });
  try {
    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, targetWidth, targetHeight);
    ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight);
    for (const quality of [0.82, 0.65, 0.5]) {
      const photo = canvas.toDataURL('image/jpeg', quality);
      if (photo.length <= Inventory.MAX_PHOTO) return photo;
    }
    throw Error('Compressed photo is too large. Try a smaller image.');
  } finally {
    bitmap.close();
  }
}

function download(name, content) {
  const url = URL.createObjectURL(new Blob([content], { type: 'application/json' })), link = document.createElement('a');
  link.href = url;
  link.download = name;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function initInventoryManager() {
  const form = $('addFragranceForm');
  form.innerHTML = editorMarkup();
  $('addFragranceBtn')?.addEventListener('click', () => openBottleEditor());
  $('editorCancel').addEventListener('click', closeDialog);
  $('removePhotoBtn').addEventListener('click', () => {
    photoToken++;
    pendingPhoto = null;
    photoRemoved = true;
    $('edit-photo').value = '';
    $('editPhotoPreview').src = collection.find(i => i.id === editedId)?.image || Inventory.FALLBACK;
  });
  $('edit-photo').addEventListener('change', async e => {
    const token = ++photoToken, submit = form.querySelector('[type="submit"]');
    submit.disabled = true;
    $('editorError').textContent = 'Processing photograph…';
    try {
      const photo = await preparePhoto(e.target.files[0]);
      if (token !== photoToken) return;
      pendingPhoto = photo;
      photoRemoved = false;
      $('editPhotoPreview').src = photo;
      $('editorError').textContent = 'Photo ready; save the bottle to keep it.';
    } catch (error) {
      if (token === photoToken) {
        pendingPhoto = null;
        e.target.value = '';
        $('editorError').textContent = error.message;
      }
    } finally {
      if (token === photoToken) submit.disabled = false;
    }
  });
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const old = collection.find(i => i.id === editedId);
    const value = name => form.elements[name].value.trim();
    const numeric = name => value(name) === '' ? null : Number(value(name));
    const list = name => value(name).split(',').map(v => v.trim()).filter(Boolean);
    try {
      const item = {
        ...(old || {}),
        id: old?.id || `user-custom-${crypto.randomUUID()}`,
        name: value('name'),
        brand: value('brand'),
        concentration: value('concentration'),
        bottleSize: numeric('bottleSize'),
        remainingMl: numeric('remainingMl'),
        rating: numeric('rating'),
        description: value('description'),
        occasions: list('occasions').map(tag => OCCASIONS.find(o => o[1].toLowerCase() === tag.toLowerCase())?.[1] || tag),
        notes: Object.fromEntries(['top', 'heart', 'base'].map(t => [t, list(t).map(name => ({ name }))])),
        mainAccords: value('mainAccords')
          ? value('mainAccords').split('\n').filter(v => v.trim()).map(row => {
              const [name, score] = row.split('|');
              return {
                name: name.trim(),
                percentage: score?.trim() ? Number(score) : null,
                color: old?.mainAccords.find(a => a.name.toLowerCase() === name.trim().toLowerCase())?.color || '#635F56'
              };
            })
          : [],
        cloneOf: value('originalName')
          ? {
              originalName: value('originalName'),
              originalHouse: value('originalHouse'),
              similarityScore: old?.cloneOf?.originalName === value('originalName') && old?.cloneOf?.originalHouse === value('originalHouse')
                ? old.cloneOf.similarityScore
                : null
            }
          : null,
        isClone: Boolean(value('originalName')),
        seasons: Object.fromEntries(['spring', 'summer', 'autumn', 'winter'].map(k => [k, numeric(k) ?? 0])),
        timeOfDay: Object.fromEntries(['day', 'night'].map(k => [k, numeric(k) ?? 0])),
        sprayBlueprint: list('sprayBlueprint'),
        recommendedSprays: value('recommendedSprays'),
        macerationStatus: value('macerationStatus'),
        provenance: old?.provenance || 'Owner-entered profile and observations; not independently verified.',
        image: old?.image || Inventory.FALLBACK
      };
      for (const k of ['purchaseSource', 'wardrobeArchetype', 'longevity', 'sillage', 'bottleType', 'flaconFormat']) {
        item[k] = value(k);
      }
      item.batchYear = numeric('batchYear');
      if (photoRemoved) {
        item.userPhoto = '';
        item.userUploadedCustomPhoto = false;
      } else if (pendingPhoto) {
        item.userPhoto = pendingPhoto;
        item.userUploadedCustomPhoto = true;
      }
      const valid = Inventory.normalizeRecord(item);
      const next = old ? collection.map(i => i.id === old.id ? valid : i) : [...collection, valid];
      if (await commitCollection(next, `${valid.name} saved in this browser. Export JSON for a backup.`)) closeDialog(true);
      else $('editorError').textContent = $('inventoryStatus').textContent;
    } catch (error) {
      $('editorError').textContent = error.message;
    }
  });
  $('exportInventoryBtn')?.addEventListener('click', () =>
    download(`fragrance-inventory-${new Date().toISOString().slice(0, 10)}.json`, Inventory.exportBackup(collection, FRAGRANCE_DATABASE))
  );
  $('exportRecoveryBtn')?.addEventListener('click', () => {
    if (recoveryData) {
      download('fragrance-inventory-recovery.json', recoveryData);
      recoveryExported = true;
      notify('Recovery download requested. Saving is now enabled; keep this file.');
    } else notify('No unreadable backup was found.');
  });
  $('importInventoryFile')?.addEventListener('change', async e => {
    try {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > 16000000) throw Error('Backup exceeds 16 MB.');
      pendingImport = Inventory.importBackup(await file.text(), FRAGRANCE_DATABASE);
      $('importPreview').textContent = `Validated ${pendingImport.length} bottles. Applying this backup replaces this browser's collection. Export your current inventory first.`;
      $('applyImportBtn').hidden = false;
    } catch (error) {
      pendingImport = null;
      $('applyImportBtn').hidden = true;
      $('importPreview').textContent = `Import rejected: ${error.message}`;
    } finally {
      e.target.value = '';
    }
  });
  $('applyImportBtn')?.addEventListener('click', async () => {
    if (pendingImport && await commitCollection(pendingImport, 'Backup applied to this browser.')) {
      pendingImport = null;
      $('applyImportBtn').hidden = true;
      $('importPreview').textContent = 'Backup applied.';
    }
  });
}

function refreshPage() {
  document.querySelectorAll('[data-collection-count]').forEach(el => {
    el.textContent = collection.length;
  });
  if ($('heroTotalVolume')) {
    const totalMl = Math.round(collection.reduce((sum, i) => sum + (Number.isFinite(i.remainingMl) ? i.remainingMl : 0), 0));
    $('heroTotalVolume').textContent = `${totalMl.toLocaleString('en-GB')} ml`;
  }
  renderOccasions();
  if (document.body.dataset.page === 'collection') {
    syncFilterControls();
    renderCollectionGrid();
  }
  if (document.body.dataset.page === 'home') initSotdRecommendation(false, currentSotdFragranceId);
  if (document.body.dataset.page === 'layering') {
    renderLayeringDuos();
    initInteractivePairingStudio();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  loadCollection();
  initDialogs();
  initInventoryManager();
  document.addEventListener('click', async e => {
    const detail = e.target.closest('[data-detail]');
    if (detail) openDetailModal(detail.dataset.detail);
    const edit = e.target.closest('[data-edit]');
    if (edit) openBottleEditor(edit.dataset.edit);
    const remove = e.target.closest('[data-delete]');
    if (remove) {
      const item = collection.find(i => i.id === remove.dataset.delete);
      if (item && confirm(`Remove ${item.name} from this browser's collection? Export a backup first if you want to keep it.`) && await commitCollection(collection.filter(i => i.id !== item.id), 'Bottle removed from this browser.')) {
        closeDialog(true);
      }
    }
    const volume = e.target.closest('[data-save-volume]');
    if (volume) {
      const input = $('detailRemaining');
      if (!input.checkValidity()) {
        input.reportValidity();
        notify('Invalid remaining volume; existing value retained.', true);
        return;
      }
      const val = input.value;
      const next = collection.map(i => i.id === volume.dataset.saveVolume ? { ...i, remainingMl: val === '' ? null : Number(val) } : i);
      if (await commitCollection(next, 'Remaining volume saved.')) closeDialog(true);
    }
    const wear = e.target.closest('[data-log-wear]');
    if (wear) {
      const item = collection.find(i => i.id === wear.dataset.logWear);
      if (item && item.remainingMl != null) {
        const nextMl = Math.max(0, Math.round((item.remainingMl - 0.3) * 10) / 10);
        const next = collection.map(i => i.id === item.id ? { ...i, remainingMl: nextMl } : i);
        if (await commitCollection(next, `Logged 1 wear (-0.3ml) for ${item.name}. Remaining: ${nextMl}ml.`)) closeDialog(true);
      }
    }
    const duoBtn = e.target.closest('[data-duo-filter]');
    if (duoBtn) {
      currentDuoFilter = duoBtn.dataset.duoFilter || 'all';
      document.querySelectorAll('[data-duo-filter]').forEach(btn => {
        const active = btn.dataset.duoFilter === currentDuoFilter;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-pressed', String(active));
      });
      renderLayeringDuos();
    }
    if (e.target.closest('[data-clear-filters]')) resetAllFilters();
    const season = e.target.closest('.sotd-season-btn');
    if (season) initSotdRecommendation(false, null, season.dataset.season);
    const scent = e.target.closest('[data-sotd]');
    if (scent) initSotdRecommendation(false, scent.dataset.sotd);
  });
  document.addEventListener('input', event => {
    if (event.target.id === 'detailRemainingSlider') $('detailRemaining').value = event.target.value;
  });
  document.addEventListener('error', e => {
    if (e.target.tagName === 'IMG' && !e.target.src.endsWith(Inventory.FALLBACK)) e.target.src = Inventory.FALLBACK;
  }, true);
  $('sotdInspectBtn')?.addEventListener('click', () => openDetailModal(currentSotdFragranceId));
  $('sotdRefreshBtn')?.addEventListener('click', () => initSotdRecommendation(true));
  $('modeCuratedDuosBtn')?.addEventListener('click', () => setLayeringMode(false));
  $('modeInteractiveStudioBtn')?.addEventListener('click', () => setLayeringMode(true));
  $('baseFragranceSelect')?.addEventListener('change', e => updateInteractivePairings(e.target.value));
  window.addEventListener('storage', event => {
    if (event.key !== Inventory.KEY) return;
    if (activeDialog?.id === 'addBottleModal') {
      notify('Another tab changed the inventory. Saving will recheck the latest data.', true);
      return;
    }
    loadCollection();
    refreshPage();
    if (!recoveryRequired) notify('Collection refreshed from another tab.');
  });
  if (document.body.dataset.page === 'collection') initCollectionPage();
  if (document.body.dataset.page === 'layering') setLayeringMode(collection.some(i => i.id === new URLSearchParams(location.search).get('base')));
  refreshPage();
});

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MIN_LAYERING_SCORE,
    CURATED_SIGNATURE_DUOS,
    isParticleOrMolecular,
    calculatePairingSynergy,
    getTopLayeringOptionsForFragrance,
    layeringAdvice,
    getInSeasonCandidates,
    filteredCollection,
    scentMatches,
    filterChoices,
    plural,
    accordBridgeMarkup,
    matchesDuoFilter
  };
}
