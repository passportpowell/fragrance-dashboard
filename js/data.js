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
    remainingMl: 74,
    purchaseSource: "Fragrance World / Online",
    rating: 4.9,
    gender: "Unisex",
    crg: "Sweet Tobacco / Boozy Gourmand",
    wardrobeArchetype: "Date Night Seduction",
    recommendedSprays: "2-3 Sprays (Potent Sillage)",
    sprayBlueprint: ["Behind Ears", "Back of Neck"],
    maturationWeeks: 8,
    macerationStatus: "Fully Matured (Hypnotic Boozy Cloud)",
    macerationTips: "Reddit favorite: High concentration of rum and cinnamon. Macerating for 4+ weeks creates an intoxicating, seamless vanilla tobacco drydown.",
    layeringPartner: "Layers beautifully with Particle (ISO E-Super) to boost sillage projection.",
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
        { name: "Dark Rum", icon: "🥃" },
        { name: "Ceylon Cinnamon", icon: "🪵" }
      ],
      heart: [
        { name: "Tobacco Leaf", icon: "🍂" },
        { name: "Saffron", icon: "🌾" },
        { name: "Hedione", icon: "✨" }
      ],
      base: [
        { name: "Madagascar Vanilla", icon: "🍦" },
        { name: "Sandalwood", icon: "🪵" }
      ]
    },
    description: "An irresistible narcotic blend of warm aged rum, honeyed tobacco leaf, sharp cinnamon bark, and creamy Madagascar vanilla. Intoxicating for upscale date nights and winter soirees.",
    image: "assets/bottles/cropped/after_effect_fa_paris.jpg",
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
    concentration: "Eau de Parfum",
    bottleSize: 50,
    bottleType: "Spray",
    remainingMl: 46,
    purchaseSource: "Perfume Parlour",
    rating: 4.8,
    gender: "Masculine",
    crg: "Fresh Citrus / Aromatic Woody",
    wardrobeArchetype: "Everyday Office / Versatile Signature",
    recommendedSprays: "3-4 Sprays",
    sprayBlueprint: ["Behind Ears", "Back of Neck", "Collarbones"],
    maturationWeeks: 6,
    macerationStatus: "Matured & Settled",
    macerationTips: "Reddit tip: 3 weeks of dark cupboard storage softens the citrus opening into velvety incense, amber, and cedarwood.",
    layeringPartner: "Can be layered over PP Particle (ISO E-Super) for an all-day boardroom presence.",
    seasons: { spring: 35, summer: 35, autumn: 20, winter: 10 },
    timeOfDay: { day: 70, night: 30 },
    occasions: ["Office / Work", "City Centre", "Malls", "Dates", "Wedding", "Casual"],
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
        { name: "Grapefruit", icon: "🍊" },
        { name: "Lemon", icon: "🍋" },
        { name: "Mint", icon: "🌿" },
        { name: "Pink Pepper", icon: "🌶️" }
      ],
      heart: [
        { name: "Ginger", icon: "🫚" },
        { name: "Nutmeg", icon: "🌰" },
        { name: "Jasmine", icon: "🌸" },
        { name: "Melon", icon: "🍈" }
      ],
      base: [
        { name: "Incense", icon: "🕯️" },
        { name: "Amber", icon: "🪨" },
        { name: "Cedar", icon: "🌲" },
        { name: "Sandalwood", icon: "🪵" },
        { name: "Patchouli", icon: "🌿" }
      ]
    },
    description: "The definitive blue fragrance masterclass. Sparkling fresh grapefruit and invigorating ginger drying down into rich resinous incense, amber, and dry cedar. Flawlessly versatile in any setting.",
    image: "assets/bottles/cropped/pp_navy_intense.jpg",
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
    remainingMl: 92,
    purchaseSource: "Paris Corner / Online",
    rating: 4.9,
    gender: "Unisex",
    crg: "Sweet Tobacco / Boozy Gourmand",
    wardrobeArchetype: "Formal / Black Tie Elegance",
    recommendedSprays: "2-3 Sprays",
    sprayBlueprint: ["Behind Ears", "Back of Neck"],
    maturationWeeks: 6,
    macerationStatus: "Fully Matured (Golden Honey & Tobacco)",
    macerationTips: "Voj favorite scent profile! Honey, tobacco leaf, and Sicilian citrus harmonize after resting. Luxurious performance.",
    layeringPartner: "Worn solo as a prestigious signature.",
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
        { name: "Bergamot", icon: "🍋" },
        { name: "Lemon", icon: "🍋" },
        { name: "Lavender", icon: "🪻" }
      ],
      heart: [
        { name: "Honey", icon: "🍯" },
        { name: "Cinnamon", icon: "🪵" },
        { name: "Cashmeran", icon: "🧣" },
        { name: "Jasmine Sambac", icon: "🌸" }
      ],
      base: [
        { name: "Tobacco Leaf", icon: "🍂" },
        { name: "Tonka Bean", icon: "🌰" },
        { name: "Vanilla", icon: "🍦" }
      ]
    },
    description: "An Italian Mediterranean tribute combining sun-drenched Sicilian lemon and aromatic lavender with decadent golden honey, rich blonde tobacco leaves, and warm tonka bean.",
    image: "assets/bottles/cropped/voux_elegante.jpg",
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
    remainingMl: 85,
    purchaseSource: "Selfridges",
    rating: 4.9,
    gender: "Masculine",
    crg: "Gourmand / Amber Woody",
    wardrobeArchetype: "Date Night Seduction",
    recommendedSprays: "2-3 Sprays",
    sprayBlueprint: ["Behind Ears", "Back of Neck"],
    maturationWeeks: 12,
    macerationStatus: "Stable Designer Formulation",
    macerationTips: "The pinnacle of winter date-night luxury. The milky Indian kulfi dessert and cardamom accords create an intimate, magnetic sillage.",
    layeringPartner: "Spray directly on cashmere jumpers or formal evening wear.",
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
        { name: "Cardamom", icon: "🫚" },
        { name: "Nutmeg", icon: "🌰" },
        { name: "Saffron", icon: "🌾" },
        { name: "Mandarin Orange", icon: "🍊" },
        { name: "Neroli", icon: "🌼" }
      ],
      heart: [
        { name: "Kulfi Accord", icon: "🍧" },
        { name: "Rose", icon: "🌹" },
        { name: "Mastic", icon: "🪵" },
        { name: "Jasmine", icon: "🌸" },
        { name: "Orange Blossom", icon: "🌼" }
      ],
      base: [
        { name: "Madagascar Vanilla", icon: "🍦" },
        { name: "Amber", icon: "🪨" },
        { name: "Sandalwood", icon: "🪵" },
        { name: "Woody Notes", icon: "🌲" }
      ]
    },
    description: "An amber-drenched, woody oriental with an appetizing heart of traditional Indian Kulfi dessert, saffron, and cardamom. Universally recognized as one of the greatest date night fragrances in history.",
    image: "assets/bottles/cropped/tf_noir_extreme.jpg",
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
    remainingMl: 48,
    purchaseSource: "Perfume Parlour",
    rating: 4.8,
    gender: "Masculine",
    crg: "Spicy Oriental / Aromatic Lavender",
    wardrobeArchetype: "Cold Weather Beast",
    recommendedSprays: "2-3 Sprays (Potent Sillage)",
    sprayBlueprint: ["Back of Neck", "Behind Ears"],
    maturationWeeks: 6,
    macerationStatus: "Matured & Settled",
    macerationTips: "Voj Fall Lane 1 (Spicy Gourmand). Black pepper and tobacco blend with sweet bourbon vanilla after 4 weeks of dark storage.",
    layeringPartner: "Pairs with Molecule 01 / Particle for extended cloud projection.",
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
        { name: "Black Pepper", icon: "🌶️" },
        { name: "Pimento", icon: "🌶️" }
      ],
      heart: [
        { name: "Tobacco Leaf", icon: "🍂" },
        { name: "Cinnamon", icon: "🪵" },
        { name: "Cumin", icon: "🌰" }
      ],
      base: [
        { name: "Bourbon Vanilla", icon: "🍦" },
        { name: "Amber", icon: "🪨" },
        { name: "Lavender", icon: "🪻" }
      ]
    },
    description: "An explosive winter firestorm of fiery black pepper, rich aromatic pipe tobacco, grated cinnamon, and intoxicating dark bourbon vanilla. Supreme cold-weather protection.",
    image: "assets/bottles/cropped/pp_intense_aroma_exploding.jpg",
    userPhoto: "assets/bottles/cropped/pp_intense_aroma_exploding.jpg",
    batchYear: 2024
  },
  {
    id: "user-laya-edp",
    name: "Laya (Eau de Parfum)",
    brand: "Ne'emah / Ene'emahe",
    perfumeParlourCode: "N/A (Niche Middle Eastern)",
    isClone: false,
    cloneOf: null,
    concentration: "Eau de Parfum",
    bottleSize: 100,
    bottleType: "Spray",
    remainingMl: 90,
    purchaseSource: "Middle Eastern Boutique",
    rating: 4.8,
    gender: "Unisex",
    crg: "Gourmand / Amber Woody",
    wardrobeArchetype: "Date Night Seduction",
    recommendedSprays: "2-3 Sprays",
    sprayBlueprint: ["Behind Ears", "Back of Neck"],
    maturationWeeks: 10,
    macerationStatus: "Matured & Dense",
    macerationTips: "Cult Arabian vanilla and oud icon. Deep cedarwood and black amber anchor luscious sweet vanilla for extraordinary longevity.",
    layeringPartner: "Incredible when layered under Tom Ford Oud Wood.",
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
        { name: "Bourbon Vanilla", icon: "🍦" }
      ],
      heart: [
        { name: "Cedarwood", icon: "🌲" }
      ],
      base: [
        { name: "Agarwood (Oud)", icon: "🪵" },
        { name: "Black Amber", icon: "🪨" },
        { name: "Musk", icon: "✨" }
      ]
    },
    description: "A legendary Arabian classic blending rich Madagascar vanilla bean, aromatic Atlas cedarwood, precious oud, and black amber into a soft yet unforgettable presence.",
    image: "assets/bottles/cropped/laya_edp.jpg",
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
    remainingMl: 46,
    purchaseSource: "Perfume Parlour",
    rating: 4.8,
    gender: "Masculine",
    crg: "Fresh Woody / Smoky Fruity",
    wardrobeArchetype: "Everyday Office / Versatile Signature",
    recommendedSprays: "3-4 Sprays",
    sprayBlueprint: ["Behind Ears", "Back of Neck", "Collarbones"],
    maturationWeeks: 6,
    macerationStatus: "Matured & Settled",
    macerationTips: "Citrus and blackcurrant notes blend smoothly into rich cedar, leather, and vanilla after 3 weeks of resting.",
    layeringPartner: "Layer over Particle (ISO E-Super) for all-day sillage trail.",
    seasons: { spring: 35, summer: 35, autumn: 25, winter: 5 },
    timeOfDay: { day: 75, night: 25 },
    occasions: ["Office / Work", "City Centre", "Malls", "Dates", "Casual"],
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
        { name: "Sicilian Lemon", icon: "🍋" },
        { name: "Blackcurrant", icon: "🫐" },
        { name: "Bergamot", icon: "🍋" },
        { name: "Spicy Notes", icon: "🌶️" }
      ],
      heart: [
        { name: "Fruity Notes", icon: "🍎" },
        { name: "Patchouli Leaf", icon: "🌿" },
        { name: "Water Jasmine", icon: "🌸" }
      ],
      base: [
        { name: "Cedar", icon: "🌲" },
        { name: "Leather", icon: "🧥" },
        { name: "Sandalwood", icon: "🪵" },
        { name: "Vanilla", icon: "🍦" },
        { name: "White Musk", icon: "✨" }
      ]
    },
    description: "Vibrant zesty Sicilian lemon and blackcurrant bursting over a heart of juicy fruits, patchouli, velvety cedarwood, and supple leather. An extraordinary signature all-rounder.",
    image: "assets/bottles/cropped/pp_wood_miracle.jpg",
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
    bottleSize: 30,
    bottleType: "Spray",
    remainingMl: 28,
    purchaseSource: "Perfume Parlour",
    rating: 4.9,
    gender: "Unisex",
    crg: "Fresh Woody / Smoky Fruity",
    wardrobeArchetype: "Everyday Office / Versatile Signature",
    recommendedSprays: "4-5 Sprays (The Ultimate Layering Weapon)",
    sprayBlueprint: ["Behind Ears", "Collarbones", "Wrists"],
    maturationWeeks: 4,
    macerationStatus: "Ready to Wear / Stable",
    macerationTips: "Pure aroma-chemical ISO E-Super. Produces phantom projection that comes and goes throughout the day. Never induces anosmia.",
    layeringPartner: "The Holy Grail Layering Tool: Spray under ANY cologne in your vault to double its projection and longevity.",
    seasons: { spring: 25, summer: 25, autumn: 25, winter: 25 },
    timeOfDay: { day: 50, night: 50 },
    occasions: ["Office / Work", "Gym", "Parks", "City Centre", "Malls", "Dates", "Casual"],
    longevity: "Eternal (12h+)",
    sillage: "Moderate",
    mainAccords: [
      { name: "Woody Cedar", percentage: 100, color: "#854d0e" },
      { name: "Velvety Amber", percentage: 85, color: "#d97706" },
      { name: "Musky", percentage: 80, color: "#a16207" }
    ],
    notes: {
      top: [
        { name: "Iso E Super", icon: "✨" }
      ],
      heart: [
        { name: "Velvet Cedar nuance", icon: "🪵" }
      ],
      base: [
        { name: "Warm Ambergris aura", icon: "🌊" }
      ]
    },
    description: "A minimalist marvel consisting of pure Iso E Super. Creates a warm, velvety cedarwood cocoon that fades and re-emerges mysteriously with your body heat. The undisputed champion of fragrance layering.",
    image: "assets/bottles/cropped/pp_particle.jpg",
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
    bottleSize: 30,
    bottleType: "Spray",
    remainingMl: 28,
    purchaseSource: "Perfume Parlour",
    rating: 4.8,
    gender: "Unisex",
    crg: "Fresh Citrus / Aromatic Woody",
    wardrobeArchetype: "Gym & High-Heat Freshie",
    recommendedSprays: "4-5 Sprays",
    sprayBlueprint: ["Behind Ears", "Back of Neck", "Collarbones", "Wrists"],
    maturationWeeks: 4,
    macerationStatus: "Ready to Wear",
    macerationTips: "Photorealistic mandarin orange and airy cedar Iso E Super. High-heat and daytime champion; uplifting and refreshing.",
    layeringPartner: "Layers phenomenally with warm vanilla or tobacco scents to inject a burst of natural citrus top notes.",
    seasons: { spring: 35, summer: 50, autumn: 15, winter: 0 },
    timeOfDay: { day: 85, night: 15 },
    occasions: ["Gym", "Parks", "Office / Work", "City Centre", "Malls", "Casual"],
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
        { name: "Mandarin Orange", icon: "🍊" },
        { name: "Citrus Zest", icon: "🍋" }
      ],
      heart: [
        { name: "Iso E Super", icon: "✨" },
        { name: "Cedar Shavings", icon: "🪵" }
      ],
      base: [
        { name: "Velvety Amber", icon: "🪨" },
        { name: "Warm Musk", icon: "🌊" }
      ]
    },
    description: "A modern masterpiece marrying photorealistic sparkling mandarin orange juice with the velvety cedarwood projection of Iso E Super. Clean, effervescent, and uplifting.",
    image: "assets/bottles/cropped/pp_particle.jpg",
    userPhoto: "assets/bottles/cropped/pp_particle.jpg",
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
    concentration: "Eau de Parfum",
    bottleSize: 30,
    bottleType: "Spray",
    remainingMl: 26,
    purchaseSource: "Perfume Parlour",
    rating: 4.7,
    gender: "Masculine",
    crg: "Fresh Citrus / Aromatic Aquatic",
    wardrobeArchetype: "Gym & High-Heat Freshie",
    recommendedSprays: "4-5 Sprays",
    sprayBlueprint: ["Behind Ears", "Back of Neck", "Collarbones"],
    maturationWeeks: 4,
    macerationStatus: "Ready to Wear",
    macerationTips: "Aquatic marine notes. Ideal for high heat and athletic activities; refreshing mineral profile.",
    layeringPartner: "Pairs with PP Particle for extended sea-breeze projection.",
    seasons: { spring: 30, summer: 55, autumn: 15, winter: 0 },
    timeOfDay: { day: 85, night: 15 },
    occasions: ["Gym", "Parks", "City Centre", "Malls", "Casual"],
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
        { name: "Sea Notes", icon: "🌊" },
        { name: "Aquozone", icon: "💧" },
        { name: "Green Mandarin", icon: "🍊" },
        { name: "Bergamot", icon: "🍋" }
      ],
      heart: [
        { name: "Rosemary", icon: "🌱" },
        { name: "Cypress", icon: "🌲" },
        { name: "Lavender", icon: "🪻" }
      ],
      base: [
        { name: "Mineral Amber", icon: "🪨" },
        { name: "Patchouli", icon: "🌿" },
        { name: "Musk", icon: "✨" }
      ]
    },
    description: "Deep oceanic plunge with fresh sparkling bergamot and mandarin diving into aromatic rosemary, lavender, and mineral amber. The ultimate gym and beach companion.",
    image: "assets/bottles/cropped/pp_intenso_water.jpg",
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
    concentration: "Eau de Parfum",
    bottleSize: 50,
    bottleType: "Spray",
    remainingMl: 44,
    purchaseSource: "Perfume Parlour",
    rating: 4.8,
    gender: "Masculine",
    crg: "Fresh Citrus / Aromatic Aquatic",
    wardrobeArchetype: "Everyday Office / Versatile Signature",
    recommendedSprays: "3-4 Sprays",
    sprayBlueprint: ["Behind Ears", "Back of Neck", "Collarbones"],
    maturationWeeks: 6,
    macerationStatus: "Matured & Settled",
    macerationTips: "The legendary dark aquatic clone. Incense and patchouli anchor the sea notes for an authoritative evening profile.",
    layeringPartner: "Layers masterfully with woody scents.",
    seasons: { spring: 35, summer: 35, autumn: 25, winter: 5 },
    timeOfDay: { day: 60, night: 40 },
    occasions: ["Office / Work", "Dates", "City Centre", "Wedding", "Casual"],
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
        { name: "Sea Notes", icon: "🌊" },
        { name: "Bergamot", icon: "🍋" }
      ],
      heart: [
        { name: "Rosemary", icon: "🌱" },
        { name: "Sage", icon: "🌿" },
        { name: "Geranium", icon: "🌸" }
      ],
      base: [
        { name: "Incense", icon: "🕯️" },
        { name: "Patchouli", icon: "🌿" }
      ]
    },
    description: "Dark crashing waves against black volcanic rocks. Salty sea mist colliding with aromatic wild herbs and hypnotic church incense. Sophisticated and universally respected.",
    image: "assets/bottles/cropped/pp_sweet_water.jpg",
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
    remainingMl: 78,
    purchaseSource: "Designer Boutique",
    rating: 4.9,
    gender: "Masculine",
    crg: "Sweet Tobacco / Gourmand Amber",
    wardrobeArchetype: "Date Night Seduction",
    recommendedSprays: "4-5 Sprays (Intimate Sillage)",
    sprayBlueprint: ["Behind Ears", "Back of Neck", "Collarbones", "Chest"],
    maturationWeeks: 12,
    macerationStatus: "Stable Designer Formulation",
    macerationTips: "The undisputed King of Date Nights. Warm amber, ginger, and blond tobacco invite close-proximity intimacy without overwhelming.",
    layeringPartner: "Spray directly on shirt collar for extended projection.",
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
        { name: "Grapefruit", icon: "🍊" },
        { name: "Coriander", icon: "🌾" },
        { name: "Basil", icon: "🍃" }
      ],
      heart: [
        { name: "Cardamom", icon: "🫚" },
        { name: "Ginger", icon: "🫚" },
        { name: "Orange Blossom", icon: "🌼" }
      ],
      base: [
        { name: "Amber", icon: "🪨" },
        { name: "Tobacco", icon: "🍂" },
        { name: "Cedar", icon: "🌲" }
      ]
    },
    description: "The modern benchmark for masculine seduction. An intoxicating blend of sparkling grapefruit, spicy cardamom, warm amber, and refined pipe tobacco designed specifically for close encounters.",
    image: "assets/bottles/cropped/dg_the_one.jpg",
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
    remainingMl: 120,
    purchaseSource: "Tom Ford",
    rating: 4.8,
    gender: "Unisex",
    crg: "Fresh Woody / Smoky Fruity",
    wardrobeArchetype: "Everyday Office / Versatile Signature",
    recommendedSprays: "3-5 Sprays across body and torso",
    sprayBlueprint: ["Chest", "Forearms", "Torso"],
    maturationWeeks: 12,
    macerationStatus: "Stable Designer Formulation",
    macerationTips: "Tom Ford's iconic Oud Wood in an airy all-over aerosol mist. Perfect for post-shower freshness or layering under other woody fragrances.",
    layeringPartner: "Layers seamlessly under Tom Ford Noir Extreme or Laya EDP.",
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
        { name: "Rosewood", icon: "🪵" },
        { name: "Cardamom", icon: "🫚" },
        { name: "Sichuan Pepper", icon: "🌶️" }
      ],
      heart: [
        { name: "Agarwood (Oud)", icon: "🪵" },
        { name: "Sandalwood", icon: "🪵" },
        { name: "Vetiver", icon: "🌾" }
      ],
      base: [
        { name: "Tonka Bean", icon: "🌰" },
        { name: "Vanilla", icon: "🍦" },
        { name: "Amber", icon: "🪨" }
      ]
    },
    description: "Smoky exotic rosewood and cardamom giving way to a rare blend of precious oud wood, sandalwood, and vetiver. Luxurious grooming touch for active and boardroom days alike.",
    image: "assets/bottles/cropped/tf_oud_wood_spray.jpg",
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
    bottleSize: 104,
    bottleType: "Spray",
    remainingMl: 85,
    purchaseSource: "Bath & Body Works",
    rating: 4.8,
    gender: "Masculine",
    crg: "Sweet Tobacco / Boozy Gourmand",
    wardrobeArchetype: "Cold Weather Beast",
    recommendedSprays: "3-4 Sprays",
    sprayBlueprint: ["Chest", "Behind Neck", "Shoulders"],
    maturationWeeks: 12,
    macerationStatus: "Discontinued Grail Formulation",
    macerationTips: "A legendary discontinued masculine grail. High cognac, bourbon vanilla, and golden amber content rivaling $200 niche fragrances.",
    layeringPartner: "Layers sensationally under warm vanilla and amber scents.",
    seasons: { spring: 10, summer: 0, autumn: 45, winter: 45 },
    timeOfDay: { day: 30, night: 70 },
    occasions: ["Parks", "Malls", "City Centre", "Casual"],
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
        { name: "Fresh Mahogany", icon: "🪵" },
        { name: "Blood Orange", icon: "🍊" },
        { name: "Red Pepper", icon: "🌶️" }
      ],
      heart: [
        { name: "Clary Sage", icon: "🌿" },
        { name: "Cognac", icon: "🥃" },
        { name: "Bourbon Vanilla", icon: "🍦" }
      ],
      base: [
        { name: "Golden Amber", icon: "🪨" },
        { name: "Tonka Bean", icon: "🌰" },
        { name: "Sandalwood", icon: "🪵" }
      ]
    },
    description: "A rich, rugged blend of fresh mahogany, blood orange, chilled cognac, and warm bourbon vanilla over golden amber. Widely celebrated as Bath & Body Works' greatest men's release of all time.",
    image: "assets/bottles/cropped/bbw_mahogany_woods.jpg",
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
    remainingMl: 75,
    purchaseSource: "Superdrug / Boots",
    rating: 4.6,
    gender: "Masculine",
    crg: "Gourmand / Amber Woody",
    wardrobeArchetype: "Gym & High-Heat Freshie",
    recommendedSprays: "3-4 Sprays across neck and wrists",
    sprayBlueprint: ["Neck Base", "Wrists", "Torso"],
    maturationWeeks: 6,
    macerationStatus: "Stable Daily Formulation",
    macerationTips: "Precision pump daily fragrance. Smooth smoky oud and dark vanilla designed for casual daily errands and gym refreshes.",
    layeringPartner: "Great post-shower foundation before applying Tom Ford Noir Extreme or After Effect.",
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
        { name: "Mandarin", icon: "🍊" },
        { name: "Spices", icon: "🌶️" }
      ],
      heart: [
        { name: "Dark Vanilla Bean", icon: "🍦" }
      ],
      base: [
        { name: "Smoky Oud Wood", icon: "🪵" },
        { name: "Amber", icon: "🪨" }
      ]
    },
    description: "A refined daily signature pump blending smoky oud wood with sensual dark Madagascar vanilla. Convenient, modern, and reliably pleasant for daily tasks and workouts.",
    image: "assets/bottles/cropped/lynx_oud_vanilla.jpg",
    userPhoto: "assets/bottles/cropped/lynx_oud_vanilla.jpg",
    batchYear: 2024
  }
];

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
    "Ne'emah / Ene'emahe",
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
