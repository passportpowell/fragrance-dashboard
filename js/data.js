/**
 * Fragrance Database - User's Real Vault & Curated Collection
 * Featuring real bottle photos cropped directly from user's shelf.
 * Fragrantica accords, note pyramids, Voj spray blueprints, and Reddit maceration tracking.
 */

const FRAGRANCE_DATABASE = [
  // --- USER'S REAL BOTTLES (FROM SHELF PHOTOS) ---
  {
    id: "user-after-effect-fa-paris",
    name: "After Effect",
    brand: "French Avenue / FA Paris",
    perfumeParlourCode: "FA Paris (Niche Clone)",
    isClone: true,
    cloneOf: {
      originalName: "Side Effect",
      originalHouse: "Initio Parfums Privés",
      similarityScore: 95
    },
    concentration: "Extrait de Parfum",
    bottleSize: 80,
    bottleType: "Spray",
    flaconFormat: "80ml Luxury Flacon (Extrait de Parfum)",
    remainingMl: 74,
    purchaseSource: "Fragrance World / Online",
    rating: 4.9,
    gender: "Unisex",
    crg: "Sweet Tobacco / Boozy Gourmand",
    wardrobeArchetype: "Date Night Seduction",
    recommendedSprays: "2-3 Sprays (Potent Sillage)",
    sprayBlueprint: ["Behind Ears", "Back of Neck"],
    maturationWeeks: null,
    macerationStatus: "Not recorded",
    macerationTips: "No maturation schedule is verified. Compare wear on separate days.",
    layeringPartner: "Use the current 90/100 minimum pairing recommendations; performance is not guaranteed.",
    seasons: { spring: 10, summer: 0, autumn: 45, winter: 45 },
    timeOfDay: { day: 15, night: 85 },
    occasions: ["Dates", "Wedding", "Clubbing / Evening", "City Centre"],
    longevity: "Eternal (12h+)",
    sillage: "Enormous / Beast Mode",
    mainAccords: [
      { name: "Warm Spicy", percentage: 98, color: "#dc2626" },
      { name: "Rum / Boozy", percentage: 94, color: "#78350f" },
      { name: "Vanilla", percentage: 90, color: "#fbbf24" },
      { name: "Tobacco", percentage: 88, color: "#92400e" },
      { name: "Cinnamon", percentage: 82, color: "#b91c1c" }
    ],
    notes: {
      top: [
        { name: "Dark Rum" },
        { name: "Ceylon Cinnamon" }
      ],
      heart: [
        { name: "Tobacco Leaf" },
        { name: "Saffron" },
        { name: "Hedione" }
      ],
      base: [
        { name: "Madagascar Vanilla" },
        { name: "Sandalwood" }
      ]
    },
    description: "An irresistible narcotic blend of warm aged rum, honeyed tobacco leaf, sharp cinnamon bark, and creamy Madagascar vanilla. Intoxicating for upscale date nights and winter soirees.",
    image: "assets/bottles/studio/after_effect_fa_paris.jpg",
    userPhoto: "assets/bottles/cropped/after_effect_fa_paris.jpg",
    batchYear: 2024
  },
  {
    id: "user-pp-navy-intense-0061",
    name: "Navy Intense (0061)",
    brand: "Perfume Parlour",
    perfumeParlourCode: "0061",
    isClone: true,
    cloneOf: {
      originalName: "Bleu de Chanel (EDP)",
      originalHouse: "Chanel",
      similarityScore: 93
    },
    concentration: "Extrait de Parfum",
    bottleSize: 50,
    bottleType: "Spray",
    flaconFormat: "50ml Black Flacon (Extrait de Parfum)",
    remainingMl: 46,
    purchaseSource: "Perfume Parlour",
    rating: 4.8,
    gender: "Masculine",
    crg: "Fresh Citrus / Aromatic Woody",
    wardrobeArchetype: "Everyday Office / Versatile Signature",
    recommendedSprays: "3-4 Sprays",
    sprayBlueprint: ["Behind Ears", "Back of Neck", "Collarbones"],
    maturationWeeks: null,
    macerationStatus: "Not recorded",
    macerationTips: "No maturation schedule is verified. Compare wear on separate days.",
    layeringPartner: "Use the current 90/100 minimum pairing recommendations; performance is not guaranteed.",
    seasons: { spring: 35, summer: 35, autumn: 20, winter: 10 },
    timeOfDay: { day: 70, night: 30 },
    occasions: ["Office / Work", "City Centre", "Malls", "Dates", "Wedding", "Casual", "Walking"],
    longevity: "Long Lasting (8h+)",
    sillage: "Moderate",
    mainAccords: [
      { name: "Citrus", percentage: 95, color: "#f59e0b" },
      { name: "Amber", percentage: 88, color: "#d97706" },
      { name: "Woody", percentage: 85, color: "#854d0e" },
      { name: "Warm Spicy", percentage: 78, color: "#dc2626" },
      { name: "Smoky Incense", percentage: 72, color: "#64748b" }
    ],
    notes: {
      top: [
        { name: "Grapefruit" },
        { name: "Lemon" },
        { name: "Mint" },
        { name: "Pink Pepper" }
      ],
      heart: [
        { name: "Ginger" },
        { name: "Nutmeg" },
        { name: "Jasmine" },
        { name: "Melon" }
      ],
      base: [
        { name: "Incense" },
        { name: "Amber" },
        { name: "Cedar" },
        { name: "Sandalwood" },
        { name: "Patchouli" }
      ]
    },
    description: "The definitive blue fragrance masterclass. Sparkling fresh grapefruit and invigorating ginger drying down into rich resinous incense, amber, and dry cedar. A versatile personal wear suggestion.",
    image: "assets/bottles/studio/bdc_edp.jpg",
    userPhoto: "assets/bottles/cropped/pp_navy_intense.jpg",
    batchYear: 2024
  },
  {
    id: "user-voux-elegante",
    name: "Voux Elegante",
    brand: "Paris Corner / Emir",
    perfumeParlourCode: "Paris Corner (Niche Dupe)",
    isClone: true,
    cloneOf: {
      originalName: "Naxos (XJ 1861)",
      originalHouse: "Xerjoff",
      similarityScore: 94
    },
    concentration: "Eau de Parfum",
    bottleSize: 100,
    bottleType: "Spray",
    flaconFormat: "100ml Heavy Glass Flacon (Eau de Parfum)",
    remainingMl: 92,
    purchaseSource: "Paris Corner / Online",
    rating: 4.9,
    gender: "Unisex",
    crg: "Sweet Tobacco / Boozy Gourmand",
    wardrobeArchetype: "Formal / Black Tie Elegance",
    recommendedSprays: "2-3 Sprays",
    sprayBlueprint: ["Behind Ears", "Back of Neck"],
    maturationWeeks: null,
    macerationStatus: "Not recorded",
    macerationTips: "No maturation schedule is verified. Compare wear on separate days.",
    layeringPartner: "Use the current 90/100 minimum pairing recommendations; performance is not guaranteed.",
    seasons: { spring: 25, summer: 10, autumn: 35, winter: 30 },
    timeOfDay: { day: 40, night: 60 },
    occasions: ["Wedding", "Dates", "City Centre", "Malls", "Office / Work"],
    longevity: "Long Lasting (10h+)",
    sillage: "Strong",
    mainAccords: [
      { name: "Sweet Honey", percentage: 98, color: "#f59e0b" },
      { name: "Tobacco", percentage: 92, color: "#92400e" },
      { name: "Vanilla", percentage: 88, color: "#fbbf24" },
      { name: "Citrus", percentage: 82, color: "#facc15" },
      { name: "Lavender", percentage: 78, color: "#a855f7" }
    ],
    notes: {
      top: [
        { name: "Bergamot" },
        { name: "Lemon" },
        { name: "Lavender" }
      ],
      heart: [
        { name: "Honey" },
        { name: "Cinnamon" },
        { name: "Cashmeran" },
        { name: "Jasmine Sambac" }
      ],
      base: [
        { name: "Tobacco Leaf" },
        { name: "Tonka Bean" },
        { name: "Vanilla" }
      ]
    },
    description: "An Italian Mediterranean tribute combining sun-drenched Sicilian lemon and aromatic lavender with decadent golden honey, rich blonde tobacco leaves, and warm tonka bean.",
    image: "assets/bottles/studio/voux_elegante.jpg",
    userPhoto: "assets/bottles/cropped/voux_elegante.jpg",
    batchYear: 2024
  },
  {
    id: "user-tf-noir-extreme",
    name: "Noir Extreme",
    brand: "Tom Ford",
    perfumeParlourCode: "N/A (Designer Original)",
    isClone: false,
    cloneOf: null,
    concentration: "Eau de Parfum",
    bottleSize: 100,
    bottleType: "Spray",
    flaconFormat: "100ml Designer Flacon (Eau de Parfum)",
    remainingMl: 85,
    purchaseSource: "Selfridges",
    rating: 4.9,
    gender: "Masculine",
    crg: "Gourmand / Amber Woody",
    wardrobeArchetype: "Date Night Seduction",
    recommendedSprays: "2-3 Sprays",
    sprayBlueprint: ["Behind Ears", "Back of Neck"],
    maturationWeeks: null,
    macerationStatus: "Not recorded",
    macerationTips: "No maturation schedule is verified. Compare wear on separate days.",
    layeringPartner: "Use the current 90/100 minimum pairing recommendations; performance is not guaranteed.",
    seasons: { spring: 10, summer: 0, autumn: 45, winter: 45 },
    timeOfDay: { day: 15, night: 85 },
    occasions: ["Dates", "Wedding", "Clubbing / Evening", "City Centre"],
    longevity: "Long Lasting (9h+)",
    sillage: "Moderate",
    mainAccords: [
      { name: "Warm Spicy", percentage: 96, color: "#dc2626" },
      { name: "Sweet Kulfi", percentage: 92, color: "#ec4899" },
      { name: "Amber", percentage: 88, color: "#d97706" },
      { name: "Vanilla", percentage: 85, color: "#fbbf24" },
      { name: "Woody", percentage: 78, color: "#854d0e" }
    ],
    notes: {
      top: [
        { name: "Cardamom" },
        { name: "Nutmeg" },
        { name: "Saffron" },
        { name: "Mandarin Orange" },
        { name: "Neroli" }
      ],
      heart: [
        { name: "Kulfi Accord" },
        { name: "Rose" },
        { name: "Mastic" },
        { name: "Jasmine" },
        { name: "Orange Blossom" }
      ],
      base: [
        { name: "Madagascar Vanilla" },
        { name: "Amber" },
        { name: "Sandalwood" },
        { name: "Woody Notes" }
      ]
    },
    description: "An amber-drenched, woody oriental with an appetizing heart of traditional Indian Kulfi dessert, saffron, and cardamom. A personal suggestion for evening wear.",
    image: "assets/bottles/studio/tf_noir_extreme.jpg",
    userPhoto: "assets/bottles/cropped/tf_noir_extreme.jpg",
    batchYear: 2023
  },
  {
    id: "user-pp-intense-aroma-exploding",
    name: "Intense Aroma Exploding",
    brand: "Perfume Parlour",
    perfumeParlourCode: "1484",
    isClone: true,
    cloneOf: {
      originalName: "Spicebomb Extreme",
      originalHouse: "Viktor&Rolf",
      similarityScore: 94
    },
    concentration: "Extrait de Parfum",
    bottleSize: 50,
    bottleType: "Spray",
    flaconFormat: "50ml Black Flacon with Gold Label (Extrait de Parfum)",
    remainingMl: 48,
    purchaseSource: "Perfume Parlour",
    rating: 4.8,
    gender: "Masculine",
    crg: "Spicy Oriental / Aromatic Lavender",
    wardrobeArchetype: "Cold Weather Beast",
    recommendedSprays: "2-3 Sprays (Potent Sillage)",
    sprayBlueprint: ["Back of Neck", "Behind Ears"],
    maturationWeeks: null,
    macerationStatus: "Not recorded",
    macerationTips: "No maturation schedule is verified. Compare wear on separate days.",
    layeringPartner: "Use the current 90/100 minimum pairing recommendations; performance is not guaranteed.",
    seasons: { spring: 5, summer: 0, autumn: 45, winter: 50 },
    timeOfDay: { day: 20, night: 80 },
    occasions: ["Dates", "Clubbing / Evening", "City Centre", "Wedding"],
    longevity: "Eternal (12h+)",
    sillage: "Enormous / Beast Mode",
    mainAccords: [
      { name: "Warm Spicy", percentage: 98, color: "#dc2626" },
      { name: "Vanilla", percentage: 95, color: "#fbbf24" },
      { name: "Tobacco", percentage: 92, color: "#92400e" },
      { name: "Cinnamon", percentage: 85, color: "#b91c1c" },
      { name: "Sweet", percentage: 80, color: "#ec4899" }
    ],
    notes: {
      top: [
        { name: "Black Pepper" },
        { name: "Pimento" }
      ],
      heart: [
        { name: "Tobacco Leaf" },
        { name: "Cinnamon" },
        { name: "Cumin" }
      ],
      base: [
        { name: "Bourbon Vanilla" },
        { name: "Amber" },
        { name: "Lavender" }
      ]
    },
    description: "An explosive winter firestorm of fiery black pepper, rich aromatic pipe tobacco, grated cinnamon, and intoxicating dark bourbon vanilla. Suggested for cooler-weather wear.",
    image: "assets/bottles/studio/spicebomb_extreme.jpg",
    userPhoto: "assets/bottles/cropped/pp_intense_aroma_exploding.jpg",
    batchYear: 2024
  },
  {
    id: "user-laya-edp",
    name: "Laya (Eau de Parfum)",
    brand: "Ne'emah",
    perfumeParlourCode: "N/A (Niche Middle Eastern)",
    isClone: false,
    cloneOf: null,
    concentration: "Eau de Parfum",
    bottleSize: 100,
    bottleType: "Spray",
    flaconFormat: "100ml Frosted Flacon (Eau de Parfum)",
    remainingMl: 90,
    purchaseSource: "Middle Eastern Boutique",
    rating: 4.8,
    gender: "Unisex",
    crg: "Gourmand / Amber Woody",
    wardrobeArchetype: "Date Night Seduction",
    recommendedSprays: "2-3 Sprays",
    sprayBlueprint: ["Behind Ears", "Back of Neck"],
    maturationWeeks: null,
    macerationStatus: "Not recorded",
    macerationTips: "No maturation schedule is verified. Compare wear on separate days.",
    layeringPartner: "Use the current 90/100 minimum pairing recommendations; performance is not guaranteed.",
    seasons: { spring: 20, summer: 5, autumn: 40, winter: 35 },
    timeOfDay: { day: 30, night: 70 },
    occasions: ["Dates", "Wedding", "City Centre", "Malls"],
    longevity: "Eternal (12h+)",
    sillage: "Strong",
    mainAccords: [
      { name: "Vanilla", percentage: 98, color: "#fbbf24" },
      { name: "Woody", percentage: 90, color: "#854d0e" },
      { name: "Powdery", percentage: 85, color: "#c084fc" },
      { name: "Amber", percentage: 82, color: "#d97706" },
      { name: "Oud", percentage: 75, color: "#451a03" }
    ],
    notes: {
      top: [
        { name: "Bourbon Vanilla" }
      ],
      heart: [
        { name: "Cedarwood" }
      ],
      base: [
        { name: "Agarwood (Oud)" },
        { name: "Black Amber" },
        { name: "Musk" }
      ]
    },
    description: "A legendary Arabian classic blending rich Madagascar vanilla bean, aromatic Atlas cedarwood, precious oud, and black amber into a soft yet unforgettable presence.",
    image: "assets/bottles/studio/neemah_laya.jpg",
    userPhoto: "assets/bottles/cropped/laya_edp.jpg",
    batchYear: 2023
  },
  {
    id: "user-pp-wood-miracle-1872",
    name: "Wood Miracle (1872)",
    brand: "Perfume Parlour",
    perfumeParlourCode: "1872",
    isClone: true,
    cloneOf: {
      originalName: "Cedrat Boise",
      originalHouse: "Mancera",
      similarityScore: 92
    },
    concentration: "Extrait de Parfum",
    bottleSize: 50,
    bottleType: "Spray",
    flaconFormat: "50ml Faceted Black Flacon with Wood Cap (Extrait de Parfum)",
    remainingMl: 46,
    purchaseSource: "Perfume Parlour",
    rating: 4.8,
    gender: "Masculine",
    crg: "Fresh Woody / Smoky Fruity",
    wardrobeArchetype: "Everyday Office / Versatile Signature",
    recommendedSprays: "3-4 Sprays",
    sprayBlueprint: ["Behind Ears", "Back of Neck", "Collarbones"],
    maturationWeeks: null,
    macerationStatus: "Not recorded",
    macerationTips: "No maturation schedule is verified. Compare wear on separate days.",
    layeringPartner: "Use the current 90/100 minimum pairing recommendations; performance is not guaranteed.",
    seasons: { spring: 35, summer: 35, autumn: 25, winter: 5 },
    timeOfDay: { day: 75, night: 25 },
    occasions: ["Office / Work", "City Centre", "Malls", "Dates", "Casual", "Walking"],
    longevity: "Long Lasting (8h+)",
    sillage: "Moderate",
    mainAccords: [
      { name: "Citrus", percentage: 95, color: "#f59e0b" },
      { name: "Fruity", percentage: 88, color: "#f43f5e" },
      { name: "Woody", percentage: 85, color: "#854d0e" },
      { name: "Leather", percentage: 70, color: "#78350f" },
      { name: "Aromatic", percentage: 68, color: "#06b6d4" }
    ],
    notes: {
      top: [
        { name: "Sicilian Lemon" },
        { name: "Blackcurrant" },
        { name: "Bergamot" },
        { name: "Spicy Notes" }
      ],
      heart: [
        { name: "Fruity Notes" },
        { name: "Patchouli Leaf" },
        { name: "Water Jasmine" }
      ],
      base: [
        { name: "Cedar" },
        { name: "Leather" },
        { name: "Sandalwood" },
        { name: "Vanilla" },
        { name: "White Musk" }
      ]
    },
    description: "Vibrant zesty Sicilian lemon and blackcurrant bursting over a heart of juicy fruits, patchouli, velvety cedarwood, and supple leather. An extraordinary signature all-rounder.",
    image: "assets/bottles/studio/mancera_cedrat_boise.jpg",
    userPhoto: "assets/bottles/cropped/pp_wood_miracle.jpg",
    batchYear: 2024
  },
  {
    id: "user-pp-particle-iso-e-super",
    name: "Particle (ISO E-SUPER)",
    brand: "Perfume Parlour",
    perfumeParlourCode: "1365",
    isClone: true,
    cloneOf: {
      originalName: "Molecule 01",
      originalHouse: "Escentric Molecules",
      similarityScore: 96
    },
    concentration: "Eau de Parfum",
    bottleSize: 50,
    bottleType: "Spray",
    flaconFormat: "50ml Clear Glass Flacon (Eau de Parfum)",
    remainingMl: 46,
    purchaseSource: "Perfume Parlour",
    rating: 4.9,
    gender: "Unisex",
    crg: "Fresh Woody / Smoky Fruity",
    wardrobeArchetype: "Everyday Office / Versatile Signature",
    recommendedSprays: "3-4 Sprays (Versatile Molecular Layering)",
    sprayBlueprint: ["Behind Ears", "Back of Neck", "Wrists"],
    maturationWeeks: null,
    macerationStatus: "Not recorded",
    macerationTips: "No maturation schedule is verified. Compare wear on separate days.",
    layeringPartner: "Use the current 90/100 minimum pairing recommendations; performance is not guaranteed.",
    seasons: { spring: 25, summer: 25, autumn: 25, winter: 25 },
    timeOfDay: { day: 50, night: 50 },
    occasions: ["Office / Work", "Gym", "Parks", "City Centre", "Malls", "Dates", "Casual", "Running", "Walking"],
    longevity: "Eternal (12h+)",
    sillage: "Moderate",
    mainAccords: [
      { name: "Woody Cedar", percentage: 100, color: "#854d0e" },
      { name: "Velvety Amber", percentage: 85, color: "#d97706" },
      { name: "Musky", percentage: 80, color: "#a16207" }
    ],
    notes: {
      top: [
        { name: "Iso E Super" }
      ],
      heart: [
        { name: "Velvet Cedar nuance" }
      ],
      base: [
        { name: "Warm Ambergris aura" }
      ]
    },
    description: "A minimalist woody profile associated with Iso E Super. Perception and wear vary; the finished spray composition is not independently verified.",
    image: "assets/bottles/studio/molecule_01.jpg",
    userPhoto: "assets/bottles/cropped/pp_particle.jpg",
    batchYear: 2024
  },
  {
    id: "user-pp-citrus-particle-0616",
    name: "Citrus Particle (0616)",
    brand: "Perfume Parlour",
    perfumeParlourCode: "0616",
    isClone: true,
    cloneOf: {
      originalName: "Molecule 01 + Mandarin",
      originalHouse: "Escentric Molecules",
      similarityScore: 95
    },
    concentration: "Eau de Parfum",
    bottleSize: 13,
    bottleType: "Travel Spray",
    flaconFormat: "13ml Cylindrical Travel Spray (Eau de Parfum)",
    remainingMl: 12,
    purchaseSource: "Perfume Parlour",
    rating: 4.8,
    gender: "Unisex",
    crg: "Fresh Citrus / Aromatic Woody",
    wardrobeArchetype: "Gym & High-Heat Freshie",
    recommendedSprays: "4-5 Sprays",
    sprayBlueprint: ["Behind Ears", "Back of Neck", "Collarbones", "Wrists"],
    maturationWeeks: null,
    macerationStatus: "Not recorded",
    macerationTips: "No maturation schedule is verified. Compare wear on separate days.",
    layeringPartner: "Use the current 90/100 minimum pairing recommendations; performance is not guaranteed.",
    seasons: { spring: 35, summer: 50, autumn: 15, winter: 0 },
    timeOfDay: { day: 85, night: 15 },
    occasions: ["Gym", "Parks", "Office / Work", "City Centre", "Malls", "Casual", "Running", "Walking"],
    longevity: "Moderate (6-7h)",
    sillage: "Moderate",
    mainAccords: [
      { name: "Citrus Mandarin", percentage: 98, color: "#f59e0b" },
      { name: "Woody Cedar", percentage: 90, color: "#854d0e" },
      { name: "Musky", percentage: 80, color: "#a16207" },
      { name: "Fresh", percentage: 75, color: "#06b6d4" }
    ],
    notes: {
      top: [
        { name: "Mandarin Orange" },
        { name: "Citrus Zest" }
      ],
      heart: [
        { name: "Iso E Super" },
        { name: "Cedar Shavings" }
      ],
      base: [
        { name: "Velvety Amber" },
        { name: "Warm Musk" }
      ]
    },
    description: "A modern masterpiece marrying photorealistic sparkling mandarin orange juice with the velvety cedarwood projection of Iso E Super. Clean, effervescent, and uplifting.",
    image: "assets/bottles/studio/molecule_01_mandarin.jpg",
    userPhoto: "assets/bottles/cropped/pp_citrus_particle_0616.jpg",
    batchYear: 2024
  },
  {
    id: "user-pp-intenso-water-1329",
    name: "Intenso Water (1329)",
    brand: "Perfume Parlour",
    perfumeParlourCode: "1329",
    isClone: true,
    cloneOf: {
      originalName: "Acqua Di Giò Profondo",
      originalHouse: "Giorgio Armani",
      similarityScore: 92
    },
    concentration: "Extrait de Parfum",
    bottleSize: 30,
    bottleType: "Spray",
    flaconFormat: "30ml Black Flacon (Extrait de Parfum)",
    remainingMl: 26,
    purchaseSource: "Perfume Parlour",
    rating: 4.7,
    gender: "Masculine",
    crg: "Fresh Citrus / Aromatic Aquatic",
    wardrobeArchetype: "Gym & High-Heat Freshie",
    recommendedSprays: "4-5 Sprays",
    sprayBlueprint: ["Behind Ears", "Back of Neck", "Collarbones"],
    maturationWeeks: null,
    macerationStatus: "Not recorded",
    macerationTips: "No maturation schedule is verified. Compare wear on separate days.",
    layeringPartner: "Use the current 90/100 minimum pairing recommendations; performance is not guaranteed.",
    seasons: { spring: 30, summer: 55, autumn: 15, winter: 0 },
    timeOfDay: { day: 85, night: 15 },
    occasions: ["Gym", "Parks", "City Centre", "Malls", "Casual", "Running", "Walking"],
    longevity: "Moderate (6-7h)",
    sillage: "Moderate",
    mainAccords: [
      { name: "Marine / Aquatic", percentage: 100, color: "#0284c7" },
      { name: "Aromatic", percentage: 88, color: "#06b6d4" },
      { name: "Citrus", percentage: 85, color: "#f59e0b" },
      { name: "Salty Mineral", percentage: 75, color: "#94a3b8" },
      { name: "Fresh Spicy", percentage: 70, color: "#10b981" }
    ],
    notes: {
      top: [
        { name: "Sea Notes" },
        { name: "Aquozone" },
        { name: "Green Mandarin" },
        { name: "Bergamot" }
      ],
      heart: [
        { name: "Rosemary" },
        { name: "Cypress" },
        { name: "Lavender" }
      ],
      base: [
        { name: "Mineral Amber" },
        { name: "Patchouli" },
        { name: "Musk" }
      ]
    },
    description: "Deep oceanic plunge with fresh sparkling bergamot and mandarin diving into aromatic rosemary, lavender, and mineral amber. The ultimate gym and beach companion.",
    image: "assets/bottles/studio/adg_profondo.jpg",
    userPhoto: "assets/bottles/cropped/pp_intenso_water.jpg",
    batchYear: 2024
  },
  {
    id: "user-pp-sweet-water-1262",
    name: "Sweet Water",
    brand: "Perfume Parlour",
    perfumeParlourCode: "1262",
    isClone: true,
    cloneOf: {
      originalName: "Acqua Di Giò Profumo",
      originalHouse: "Giorgio Armani",
      similarityScore: 93
    },
    concentration: "Extrait de Parfum",
    bottleSize: 50,
    bottleType: "Spray",
    flaconFormat: "50ml Black Flacon with Gold Lettering (Extrait de Parfum)",
    remainingMl: 44,
    purchaseSource: "Perfume Parlour",
    rating: 4.8,
    gender: "Masculine",
    crg: "Fresh Citrus / Aromatic Aquatic",
    wardrobeArchetype: "Everyday Office / Versatile Signature",
    recommendedSprays: "3-4 Sprays",
    sprayBlueprint: ["Behind Ears", "Back of Neck", "Collarbones"],
    maturationWeeks: null,
    macerationStatus: "Not recorded",
    macerationTips: "No maturation schedule is verified. Compare wear on separate days.",
    layeringPartner: "Use the current 90/100 minimum pairing recommendations; performance is not guaranteed.",
    seasons: { spring: 35, summer: 35, autumn: 25, winter: 5 },
    timeOfDay: { day: 60, night: 40 },
    occasions: ["Office / Work", "Dates", "City Centre", "Wedding", "Casual", "Walking"],
    longevity: "Long Lasting (8h+)",
    sillage: "Strong",
    mainAccords: [
      { name: "Marine Aquatic", percentage: 95, color: "#0284c7" },
      { name: "Aromatic", percentage: 88, color: "#06b6d4" },
      { name: "Smoky Incense", percentage: 85, color: "#64748b" },
      { name: "Fresh Spicy", percentage: 78, color: "#10b981" },
      { name: "Amber", percentage: 70, color: "#d97706" }
    ],
    notes: {
      top: [
        { name: "Sea Notes" },
        { name: "Bergamot" }
      ],
      heart: [
        { name: "Rosemary" },
        { name: "Sage" },
        { name: "Geranium" }
      ],
      base: [
        { name: "Incense" },
        { name: "Patchouli" }
      ]
    },
    description: "Dark crashing waves against black volcanic rocks. Salty sea mist colliding with aromatic wild herbs and hypnotic church incense. An aromatic aquatic profile with an incense impression.",
    image: "assets/bottles/studio/adg_profumo.jpg",
    userPhoto: "assets/bottles/cropped/pp_sweet_water.jpg",
    batchYear: 2024
  },
  {
    id: "user-dg-the-one-edp",
    name: "The One for Men (EDP)",
    brand: "Dolce & Gabbana",
    perfumeParlourCode: "N/A (Designer Original)",
    isClone: false,
    cloneOf: null,
    concentration: "Eau de Parfum",
    bottleSize: 100,
    bottleType: "Spray",
    flaconFormat: "100ml Glass Flacon with Wood Cap (Eau de Parfum)",
    remainingMl: 78,
    purchaseSource: "Designer Boutique",
    rating: 4.9,
    gender: "Masculine",
    crg: "Sweet Tobacco / Gourmand Amber",
    wardrobeArchetype: "Date Night Seduction",
    recommendedSprays: "4-5 Sprays (Intimate Sillage)",
    sprayBlueprint: ["Behind Ears", "Back of Neck", "Collarbones", "Chest"],
    maturationWeeks: null,
    macerationStatus: "Not recorded",
    macerationTips: "No maturation schedule is verified. Compare wear on separate days.",
    layeringPartner: "Use the current 90/100 minimum pairing recommendations; performance is not guaranteed.",
    seasons: { spring: 15, summer: 5, autumn: 40, winter: 40 },
    timeOfDay: { day: 25, night: 75 },
    occasions: ["Dates", "Wedding", "City Centre", "Casual"],
    longevity: "Moderate (6-7h)",
    sillage: "Moderate",
    mainAccords: [
      { name: "Warm Spicy", percentage: 98, color: "#dc2626" },
      { name: "Amber", percentage: 92, color: "#d97706" },
      { name: "Tobacco", percentage: 88, color: "#92400e" },
      { name: "Citrus", percentage: 75, color: "#f59e0b" },
      { name: "Aromatic", percentage: 70, color: "#06b6d4" }
    ],
    notes: {
      top: [
        { name: "Grapefruit" },
        { name: "Coriander" },
        { name: "Basil" }
      ],
      heart: [
        { name: "Cardamom" },
        { name: "Ginger" },
        { name: "Orange Blossom" }
      ],
      base: [
        { name: "Amber" },
        { name: "Tobacco" },
        { name: "Cedar" }
      ]
    },
    description: "The modern benchmark for masculine seduction. An intoxicating blend of sparkling grapefruit, spicy cardamom, warm amber, and refined pipe tobacco designed specifically for close encounters.",
    image: "assets/bottles/studio/dg_the_one_edp.jpg",
    userPhoto: "assets/bottles/cropped/dg_the_one.jpg",
    batchYear: 2023
  },
  {
    id: "user-tf-oud-wood-spray",
    name: "Oud Wood (All Over Body Spray)",
    brand: "Tom Ford",
    perfumeParlourCode: "N/A (Designer Original)",
    isClone: false,
    cloneOf: null,
    concentration: "Body Spray",
    bottleSize: 150,
    bottleType: "Spray",
    flaconFormat: "150ml Aerosol Body Spray",
    remainingMl: 120,
    purchaseSource: "Tom Ford",
    rating: 4.8,
    gender: "Unisex",
    crg: "Fresh Woody / Smoky Fruity",
    wardrobeArchetype: "Everyday Office / Versatile Signature",
    recommendedSprays: "3-5 Sprays across body and torso",
    sprayBlueprint: ["Chest", "Forearms", "Torso"],
    maturationWeeks: null,
    macerationStatus: "Not recorded",
    macerationTips: "No maturation schedule is verified. Compare wear on separate days.",
    layeringPartner: "Use the current 90/100 minimum pairing recommendations; performance is not guaranteed.",
    seasons: { spring: 25, summer: 25, autumn: 25, winter: 25 },
    timeOfDay: { day: 60, night: 40 },
    occasions: ["Gym", "Office / Work", "Parks", "Casual", "City Centre"],
    longevity: "Moderate (5-6h)",
    sillage: "Moderate",
    mainAccords: [
      { name: "Woody", percentage: 98, color: "#854d0e" },
      { name: "Warm Spicy", percentage: 90, color: "#dc2626" },
      { name: "Balsamic", percentage: 85, color: "#a16207" },
      { name: "Oud", percentage: 80, color: "#451a03" },
      { name: "Aromatic", percentage: 75, color: "#06b6d4" }
    ],
    notes: {
      top: [
        { name: "Rosewood" },
        { name: "Cardamom" },
        { name: "Sichuan Pepper" }
      ],
      heart: [
        { name: "Agarwood (Oud)" },
        { name: "Sandalwood" },
        { name: "Vetiver" }
      ],
      base: [
        { name: "Tonka Bean" },
        { name: "Vanilla" },
        { name: "Amber" }
      ]
    },
    description: "Smoky exotic rosewood and cardamom giving way to a rare blend of precious oud wood, sandalwood, and vetiver. Luxurious grooming touch for active and boardroom days alike.",
    image: "assets/bottles/studio/tf_oud_wood.jpg",
    userPhoto: "assets/bottles/cropped/tf_oud_wood_spray.jpg",
    batchYear: 2024
  },
  {
    id: "user-bbw-mahogany-woods",
    name: "Mahogany Woods",
    brand: "Bath & Body Works",
    perfumeParlourCode: "N/A (Grail Body Spray)",
    isClone: false,
    cloneOf: null,
    concentration: "Body Spray",
    bottleSize: null,
    bottleType: "Spray",
    flaconFormat: "104g Aerosol Body Spray",
    remainingMl: null,
    purchaseSource: "Bath & Body Works",
    rating: 4.8,
    gender: "Masculine",
    crg: "Sweet Tobacco / Boozy Gourmand",
    wardrobeArchetype: "Cold Weather Beast",
    recommendedSprays: "3-4 Sprays",
    sprayBlueprint: ["Chest", "Behind Neck", "Shoulders"],
    maturationWeeks: null,
    macerationStatus: "Not recorded",
    macerationTips: "No maturation schedule is verified. Compare wear on separate days.",
    layeringPartner: "Use the current 90/100 minimum pairing recommendations; performance is not guaranteed.",
    seasons: { spring: 10, summer: 0, autumn: 45, winter: 45 },
    timeOfDay: { day: 30, night: 70 },
    occasions: ["Parks", "Malls", "City Centre", "Casual", "Walking"],
    longevity: "Long Lasting (8h+ on fabric)",
    sillage: "Strong",
    mainAccords: [
      { name: "Woody", percentage: 98, color: "#854d0e" },
      { name: "Vanilla", percentage: 92, color: "#fbbf24" },
      { name: "Boozy Cognac", percentage: 88, color: "#78350f" },
      { name: "Warm Amber", percentage: 85, color: "#d97706" },
      { name: "Sweet", percentage: 80, color: "#ec4899" }
    ],
    notes: {
      top: [
        { name: "Fresh Mahogany" },
        { name: "Blood Orange" },
        { name: "Red Pepper" }
      ],
      heart: [
        { name: "Clary Sage" },
        { name: "Cognac" },
        { name: "Bourbon Vanilla" }
      ],
      base: [
        { name: "Golden Amber" },
        { name: "Tonka Bean" },
        { name: "Sandalwood" }
      ]
    },
    description: "A rich, rugged blend of fresh mahogany, blood orange, chilled cognac, and warm bourbon vanilla over golden amber. A personal woody amber profile.",
    image: "assets/bottles/studio/bbw_mahogany_woods.jpg",
    userPhoto: "assets/bottles/cropped/bbw_mahogany_woods.jpg",
    batchYear: 2022
  },
  {
    id: "user-lynx-signature-oud-vanilla",
    name: "Signature Oud Wood & Dark Vanilla",
    brand: "Lynx",
    perfumeParlourCode: "N/A (Daily Grooming)",
    isClone: false,
    cloneOf: null,
    concentration: "Daily Fragrance",
    bottleSize: 100,
    bottleType: "Spray",
    flaconFormat: "100ml Precision Pump Bottle",
    remainingMl: 75,
    purchaseSource: "Superdrug / Boots",
    rating: 4.6,
    gender: "Masculine",
    crg: "Gourmand / Amber Woody",
    wardrobeArchetype: "Gym & High-Heat Freshie",
    recommendedSprays: "3-4 Sprays across neck and wrists",
    sprayBlueprint: ["Neck Base", "Wrists", "Torso"],
    maturationWeeks: null,
    macerationStatus: "Not recorded",
    macerationTips: "No maturation schedule is verified. Compare wear on separate days.",
    layeringPartner: "Use the current 90/100 minimum pairing recommendations; performance is not guaranteed.",
    seasons: { spring: 25, summer: 10, autumn: 35, winter: 30 },
    timeOfDay: { day: 65, night: 35 },
    occasions: ["Gym", "Parks", "Casual", "City Centre"],
    longevity: "Moderate (5-6h)",
    sillage: "Moderate",
    mainAccords: [
      { name: "Dark Vanilla", percentage: 95, color: "#fbbf24" },
      { name: "Smoky Oud", percentage: 88, color: "#451a03" },
      { name: "Woody", percentage: 85, color: "#854d0e" },
      { name: "Sweet", percentage: 80, color: "#ec4899" }
    ],
    notes: {
      top: [
        { name: "Mandarin" },
        { name: "Spices" }
      ],
      heart: [
        { name: "Dark Vanilla Bean" }
      ],
      base: [
        { name: "Smoky Oud Wood" },
        { name: "Amber" }
      ]
    },
    description: "A refined daily signature pump blending smoky oud wood with sensual dark Madagascar vanilla. Convenient, modern, and reliably pleasant for daily tasks and workouts.",
    image: "assets/bottles/studio/lynx_oud_vanilla.jpg",
    userPhoto: "assets/bottles/cropped/lynx_oud_vanilla.jpg",
    batchYear: 2024
  },
  {
    id: "user-pp-herb-garden-1598",
    name: "Herb Garden (1598)",
    brand: "Perfume Parlour",
    perfumeParlourCode: "1598",
    isClone: true,
    cloneOf: {
      originalName: "Layton",
      originalHouse: "Parfums de Marly",
      similarityScore: 96
    },
    concentration: "Eau de Parfum",
    bottleSize: 50,
    bottleType: "Spray",
    flaconFormat: "50ml Clear Glass Flacon (Eau de Parfum)",
    remainingMl: 46,
    purchaseSource: "Perfume Parlour",
    rating: 4.9,
    gender: "Masculine",
    crg: "Aromatic Fougere / Green Woody",
    wardrobeArchetype: "Everyday Office / Versatile Signature",
    recommendedSprays: "3-4 Sprays",
    sprayBlueprint: ["Behind Ears", "Back of Neck", "Collarbones"],
    maturationWeeks: null,
    macerationStatus: "Not recorded",
    macerationTips: "No maturation schedule is verified. Compare wear on separate days.",
    layeringPartner: "Use the current 90/100 minimum pairing recommendations; performance is not guaranteed.",
    seasons: { spring: 25, summer: 10, autumn: 40, winter: 25 },
    timeOfDay: { day: 45, night: 55 },
    occasions: ["Office / Work", "Dates", "City Centre", "Malls", "Casual", "Wedding", "Walking"],
    longevity: "Long Lasting (8-10h)",
    sillage: "Strong",
    mainAccords: [
      { name: "Warm Spicy", percentage: 98, color: "#dc2626" },
      { name: "Vanilla", percentage: 94, color: "#fbbf24" },
      { name: "Aromatic Lavender", percentage: 88, color: "#a855f7" },
      { name: "Crisp Apple", percentage: 85, color: "#84cc16" },
      { name: "Woody", percentage: 78, color: "#854d0e" }
    ],
    notes: {
      top: [
        { name: "Crisp Apple" },
        { name: "Lavender" },
        { name: "Bergamot" },
        { name: "Mandarin" }
      ],
      heart: [
        { name: "Geranium" },
        { name: "Violet" },
        { name: "Jasmine" }
      ],
      base: [
        { name: "Bourbon Vanilla" },
        { name: "Cardamom" },
        { name: "Sandalwood" },
        { name: "Black Pepper" },
        { name: "Patchouli" },
        { name: "Guaiac Wood" }
      ]
    },
    description: "A majestic royal signature opening with crisp green apple, zesty bergamot, and soothing lavender before evolving into a floral heart of geranium and a luxurious drydown of bourbon vanilla, spicy cardamom, and creamy sandalwood. Parfums de Marly's crowned prince.",
    image: "assets/bottles/studio/pdm_layton.jpg",
    userPhoto: "assets/bottles/cropped/pp_herb_garden_1598.jpg",
    batchYear: 2024
  },
  {
    id: "user-pp-astray-fruit-1947",
    name: "Astray Fruit (1947)",
    brand: "Perfume Parlour",
    perfumeParlourCode: "1947",
    isClone: true,
    cloneOf: {
      originalName: "Lost Cherry",
      originalHouse: "Tom Ford",
      similarityScore: 93
    },
    concentration: "Eau de Parfum",
    bottleSize: 30,
    bottleType: "Spray",
    flaconFormat: "30ml Clear Glass Flacon (Eau de Parfum)",
    remainingMl: 26,
    purchaseSource: "Perfume Parlour",
    rating: 4.8,
    gender: "Unisex",
    crg: "Gourmand / Amber Woody",
    wardrobeArchetype: "Date Night Seduction",
    recommendedSprays: "3-4 Sprays",
    sprayBlueprint: ["Behind Ears", "Back of Neck", "Wrists"],
    maturationWeeks: null,
    macerationStatus: "Not recorded",
    macerationTips: "No maturation schedule is verified. Compare wear on separate days.",
    layeringPartner: "Use the current 90/100 minimum pairing recommendations; performance is not guaranteed.",
    seasons: { spring: 15, summer: 5, autumn: 40, winter: 40 },
    timeOfDay: { day: 25, night: 75 },
    occasions: ["Dates", "Clubbing / Evening", "City Centre", "Malls", "Casual"],
    longevity: "Long Lasting (8h+)",
    sillage: "Strong",
    mainAccords: [
      { name: "Sweet Cherry", percentage: 100, color: "#be123c" },
      { name: "Almond & Nutty", percentage: 92, color: "#a16207" },
      { name: "Boozy Liqueur", percentage: 88, color: "#b45309" },
      { name: "Warm Amber", percentage: 82, color: "#d97706" },
      { name: "Vanilla & Tonka", percentage: 80, color: "#fbbf24" }
    ],
    notes: {
      top: [
        { name: "Sour Cherry" },
        { name: "Bitter Almond" },
        { name: "Cherry Liqueur" }
      ],
      heart: [
        { name: "Griotte Cherry Syrup" },
        { name: "Turkish Rose" },
        { name: "Jasmine Sambac" },
        { name: "Plum" }
      ],
      base: [
        { name: "Peru Balsam" },
        { name: "Roasted Tonka Bean" },
        { name: "Sandalwood" },
        { name: "Vetiver" },
        { name: "Cedarwood" }
      ]
    },
    description: "An opulent and intoxicating voyage into forbidden decadence. Ripe luscious black cherries drenched in cherry liqueur and bitter almond, wrapped in Turkish rose, warm Peru balsam, and roasted tonka beans.",
    image: "assets/bottles/studio/tf_lost_cherry.jpg",
    userPhoto: "assets/bottles/cropped/pp_astray_fruit_1947.jpg",
    batchYear: 2024
  },
  {
    id: "user-pp-leaf-flavour-0401",
    name: "Leaf Flavour (0401)",
    brand: "Perfume Parlour",
    perfumeParlourCode: "0401",
    isClone: true,
    cloneOf: {
      originalName: "Tobacco Vanille",
      originalHouse: "Tom Ford",
      similarityScore: 95
    },
    concentration: "Eau de Parfum",
    bottleSize: 30,
    bottleType: "Spray",
    flaconFormat: "30ml Clear Glass Flacon (Eau de Parfum)",
    remainingMl: 27,
    purchaseSource: "Perfume Parlour",
    rating: 4.9,
    gender: "Unisex",
    crg: "Sweet Tobacco / Boozy Gourmand",
    wardrobeArchetype: "Cold Weather Beast",
    recommendedSprays: "2-3 Sprays",
    sprayBlueprint: ["Behind Ears", "Back of Neck"],
    maturationWeeks: null,
    macerationStatus: "Not recorded",
    macerationTips: "No maturation schedule is verified. Compare wear on separate days.",
    layeringPartner: "Use the current 90/100 minimum pairing recommendations; performance is not guaranteed.",
    seasons: { spring: 10, summer: 0, autumn: 45, winter: 45 },
    timeOfDay: { day: 20, night: 80 },
    occasions: ["Dates", "Wedding", "Clubbing / Evening", "City Centre", "Casual"],
    longevity: "Beast Mode (10-12h)",
    sillage: "Enormous",
    mainAccords: [
      { name: "Sweet Tobacco", percentage: 100, color: "#92400e" },
      { name: "Vanilla", percentage: 95, color: "#fbbf24" },
      { name: "Warm Spicy", percentage: 90, color: "#dc2626" },
      { name: "Sweet Dried Fruits", percentage: 85, color: "#b45309" },
      { name: "Cacao", percentage: 78, color: "#78350f" }
    ],
    notes: {
      top: [
        { name: "Tobacco Leaf" },
        { name: "Spicy Notes" }
      ],
      heart: [
        { name: "Tonka Bean" },
        { name: "Tobacco Blossom" },
        { name: "Vanilla" },
        { name: "Cacao Pod" }
      ],
      base: [
        { name: "Dried Fruits" },
        { name: "Woody Notes" }
      ]
    },
    description: "An iconic London private club aroma reimagined with opulent tobacco leaf accords, aromatic spices, and creamy tonka bean, unfolding into rich cacao, sweet dried fruits, and mellow wood sap.",
    image: "assets/bottles/studio/tf_tobacco_vanille.jpg",
    userPhoto: "assets/bottles/cropped/pp_leaf_flavour_0401.jpg",
    batchYear: 2024
  },
  {
    id: "user-pp-noire-illusion-1746",
    name: "Noire Illusion (1746)",
    brand: "Perfume Parlour",
    perfumeParlourCode: "1746",
    isClone: true,
    cloneOf: {
      originalName: "Black Phantom (Memento Mori)",
      originalHouse: "Kilian",
      similarityScore: 94
    },
    concentration: "Eau de Parfum",
    bottleSize: 30,
    bottleType: "Spray",
    flaconFormat: "30ml Clear Glass Flacon (Eau de Parfum)",
    remainingMl: 25,
    purchaseSource: "Perfume Parlour",
    rating: 4.8,
    gender: "Unisex",
    crg: "Gourmand / Amber Woody",
    wardrobeArchetype: "Date Night Seduction",
    recommendedSprays: "2-3 Sprays",
    sprayBlueprint: ["Behind Ears", "Back of Neck"],
    maturationWeeks: null,
    macerationStatus: "Not recorded",
    macerationTips: "No maturation schedule is verified. Compare wear on separate days.",
    layeringPartner: "Use the current 90/100 minimum pairing recommendations; performance is not guaranteed.",
    seasons: { spring: 10, summer: 0, autumn: 45, winter: 45 },
    timeOfDay: { day: 10, night: 90 },
    occasions: ["Dates", "Clubbing / Evening", "City Centre", "Malls"],
    longevity: "Long Lasting (9-10h)",
    sillage: "Strong",
    mainAccords: [
      { name: "Sweet Gourmand", percentage: 100, color: "#78350f" },
      { name: "Warm Rum / Boozy", percentage: 94, color: "#b45309" },
      { name: "Dark Chocolate", percentage: 92, color: "#451a03" },
      { name: "Roasted Coffee", percentage: 88, color: "#292524" },
      { name: "Caramel & Almond", percentage: 85, color: "#d97706" }
    ],
    notes: {
      top: [
        { name: "Martinique Rum" },
        { name: "Sugar Cane" }
      ],
      heart: [
        { name: "Dark Chocolate" },
        { name: "Roasted Coffee" },
        { name: "Almond" }
      ],
      base: [
        { name: "Caramel" },
        { name: "Sandalwood" },
        { name: "Heliotrope" }
      ]
    },
    description: "A pirate ship anchored in the dark waters of the Caribbean. Heady Martinique rum infused with roasted dark coffee, velvety bittersweet chocolate, almond milk, and golden sugar cane. Sinfully seductive.",
    image: "assets/bottles/studio/kilian_black_phantom.jpg",
    userPhoto: "assets/bottles/cropped/pp_noire_illusion_1746.jpg",
    batchYear: 2024
  },
  {
    id: "user-pp-second-particle-1980",
    name: "Second Particle (1980)",
    brand: "Perfume Parlour",
    perfumeParlourCode: "1980",
    isClone: true,
    cloneOf: {
      originalName: "Molecule 02 (Ambroxan)",
      originalHouse: "Escentric Molecules",
      similarityScore: 96
    },
    concentration: "Eau de Parfum",
    bottleSize: 30,
    bottleType: "Spray",
    flaconFormat: "30ml Clear Glass Flacon (Eau de Parfum)",
    remainingMl: 28,
    purchaseSource: "Perfume Parlour",
    rating: 4.8,
    gender: "Unisex",
    crg: "Fresh Citrus / Aromatic Woody",
    wardrobeArchetype: "Everyday Office / Versatile Signature",
    recommendedSprays: "3-4 Sprays",
    sprayBlueprint: ["Behind Ears", "Back of Neck", "Wrists"],
    maturationWeeks: null,
    macerationStatus: "Not recorded",
    macerationTips: "No maturation schedule is verified. Compare wear on separate days.",
    layeringPartner: "Use the current 90/100 minimum pairing recommendations; performance is not guaranteed.",
    seasons: { spring: 30, summer: 35, autumn: 20, winter: 15 },
    timeOfDay: { day: 70, night: 30 },
    occasions: ["Office / Work", "Gym", "Parks", "City Centre", "Malls", "Casual", "Running", "Walking"],
    longevity: "Long Lasting (8h+)",
    sillage: "Radiant (Intimate yet diffusive)",
    mainAccords: [
      { name: "Mineral Ambergris", percentage: 100, color: "#0284c7" },
      { name: "Velvety Musky", percentage: 92, color: "#64748b" },
      { name: "Warm Skin", percentage: 85, color: "#d97706" },
      { name: "Woody", percentage: 75, color: "#854d0e" }
    ],
    notes: {
      top: [
        { name: "Pure Ambroxan" }
      ],
      heart: [
        { name: "Velvety Mineral Sheen" }
      ],
      base: [
        { name: "Radiant Ambergris Aura" }
      ]
    },
    description: "A molecular-style fragrance with an Ambroxan-associated profile. The finished spray composition is not independently verified. Smells like warm sunlit skin, clean mineral ambergris, and sweet oceanic air. Try alone before experimenting with a light layer; increased projection is not established.",
    image: "assets/bottles/studio/molecule_02.jpg",
    userPhoto: "assets/bottles/cropped/pp_second_particle_1980.jpg",
    batchYear: 2024
  }
];

// Curated profiles with owner photographs of the actual collection.
FRAGRANCE_DATABASE.forEach(item => {
  item.image = item.userPhoto || 'assets/bottles/default-bottle.svg';
  if (item.brand === "Ne'emah / Ene'emahe") item.brand = "Ne'emah";
  item.provenance = 'Curated personal collection profile. Notes, accords, packaging, years, ratings, volumes, similarity, performance and wear scores are provisional unless separately confirmed.';
});

// Available Filter Dimensions
const FILTER_DIMENSIONS = {
  seasons: ["Spring", "Summer", "Autumn", "Winter"],
  timesOfDay: ["Day", "Night"],
  wardrobeArchetypes: [
    "Everyday Office / Versatile Signature",
    "Cold Weather Beast",
    "Date Night Seduction",
    "Gym & High-Heat Freshie",
    "Formal / Black Tie Elegance"
  ],
  occasions: [
    "Wedding",
    "Office / Work",
    "Gym",
    "Running",
    "Walking",
    "Parks",
    "City Centre",
    "Malls",
    "Dates",
    "Clubbing / Evening",
    "Casual"
  ],
  crgs: [
    "Fresh Citrus / Aromatic Aquatic",
    "Fresh Woody / Smoky Fruity",
    "Sweet Tobacco / Boozy Gourmand",
    "Gourmand / Amber Woody",
    "Woody Leather / Fruity Animalic",
    "Aromatic Fougere / Green Woody",
    "White Floral / Woody Powdery",
    "Spicy Oriental / Aromatic Lavender",
    "Fresh Citrus / Aromatic Woody"
  ],
  brands: [
    "Perfume Parlour",
    "French Avenue / FA Paris",
    "Paris Corner / Emir",
    "Tom Ford",
    "Dolce & Gabbana",
    "Ne'emah",
    "Bath & Body Works",
    "Lynx"
  ],
  concentrations: [
    "Extrait de Parfum",
    "Eau de Parfum",
    "Perfume Oil",
    "Body Spray",
    "Daily Fragrance"
  ]
};

// If running in Node.js test environment, export
if (typeof module !== "undefined" && module.exports) {
  module.exports = { FRAGRANCE_DATABASE, FILTER_DIMENSIONS };
}
