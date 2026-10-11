/**
 * ==========================================================================
 * OTIS POWELL — FRAGRANCE COLLECTION ENGINE
 * Simple, natural language interface for 20 curated bottles.
 * Features:
 *   - Comprehensive filters (Gym, Running, Walking, Work, Dates, Casual, Seasons, Scent Types)
 *   - Scent of the Day recommendation (temperature & time-calibrated)
 *   - Layering combinations & interactive pairing calculator
 *   - Clean bottle details modal (notes, sprays, clone inspiration)
 *   - Dark / Light mode toggle
 * ==========================================================================
 */

// Local Storage Key
const STORAGE_KEY = 'fragrance_atelier_collection_v3';

// Master State
let collection = [];
let currentSotdFragranceId = null;

// Multi-Dimensional Filters
let vaultFilters = {
  occasion: 'all',
  scentType: 'all',
  season: 'all',
  timeOfDay: 'all',
  originType: 'all',
  brand: 'all',
  concentration: 'all',
  search: '',
  sort: 'rating'
};

// 6 Signature Layering Combinations
const CURATED_SIGNATURE_DUOS = [
  {
    title: "Honey Tobacco & Iso E Super",
    vibe: "Warm Honey & Golden Tobacco",
    baseId: "user-voux-elegante",
    companionId: "user-pp-particle-iso-e-super",
    score: 98,
    synergyType: "Sillage Booster",
    narrative: "Rich golden honey, lemon, and tobacco from Voux Elegante boosted by Iso E Super for all-day projection.",
    sequence: "Step 1: 2 sprays of Particle on neck as primer. Step 2: 2 sprays of Voux Elegante behind ears."
  },
  {
    title: "Smoked Oud & Warm Rum",
    vibe: "Dark Leather & Boozy Rum",
    baseId: "user-tf-oud-wood-spray",
    companionId: "user-after-effect-fa-paris",
    score: 97,
    synergyType: "Woody Boozy Blend",
    narrative: "Initio Side Effect's aged rum and cinnamon layered over Tom Ford Oud Wood's dry smoked woods.",
    sequence: "Step 1: 3 sprays of Oud Wood body spray on chest and shirt. Step 2: 2 sprays of After Effect on pulse points."
  },
  {
    title: "Crisp Apple & Spiced Vanilla",
    vibe: "Crisp Apple & Spiced Vanilla",
    baseId: "user-pp-herb-garden-1598",
    companionId: "user-pp-intense-aroma-exploding",
    score: 96,
    synergyType: "Fresh Apple & Warm Spice",
    narrative: "Layton's crisp green apple and lavender blended with Spicebomb Extreme's black pepper, cinnamon, and vanilla.",
    sequence: "Step 1: 2 sprays of Herb Garden on neck. Step 2: 1-2 sprays of Intense Aroma Exploding on jacket or scarf."
  },
  {
    title: "Boozy Rum & Dark Cherry",
    vibe: "Dark Cherry & Boozy Tobacco",
    baseId: "user-pp-astray-fruit-1947",
    companionId: "user-after-effect-fa-paris",
    score: 97,
    synergyType: "Sweet Cherry & Boozy Rum",
    narrative: "Lost Cherry's sweet almond and cherry syrup blended into Side Effect's dark tobacco and rum. Great for winter dates.",
    sequence: "Step 1: 2 sprays of After Effect behind ears. Step 2: 1 spray of Astray Fruit on chest and collar."
  },
  {
    title: "Deep Marine & Smoky Incense",
    vibe: "Deep Marine & Smoky Incense",
    baseId: "user-pp-sweet-water-1262",
    companionId: "user-pp-intenso-water-1329",
    score: 95,
    synergyType: "Fresh Marine & Incense",
    narrative: "ADG Profondo's sparkling sea notes mixed with ADG Profumo's smoky incense and rosemary base.",
    sequence: "Step 1: 2 sprays of Sweet Water on neck. Step 2: 2 sprays of Intenso Water on shoulders."
  },
  {
    title: "Dark Chocolate & Kulfi Amber",
    vibe: "Coffee, Dark Chocolate & Vanilla",
    baseId: "user-pp-noire-illusion-1746",
    companionId: "user-tf-noir-extreme",
    score: 95,
    synergyType: "Gourmand Dessert Blend",
    narrative: "Tom Ford Noir Extreme's kulfi dessert creaminess mixed with Kilian Black Phantom's roasted coffee, chocolate, and rum.",
    sequence: "Step 1: 2 sprays of Noir Extreme. Step 2: 1 spray of Noire Illusion on collar."
  }
];

// Document Initialization
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  loadCollection();
  initMobileDrawer();
  initDetailModal();
  initAddBottleModal();

  const page = document.body.dataset.page;

  if (page === 'home' || page === 'salon') {
    initSotdRecommendation();
  } else if (page === 'collection' || page === 'vault') {
    initCollectionPage();
  } else if (page === 'layering') {
    initLayeringPage();
  }
});

// ==========================================================================
// 1. THEME MANAGEMENT (LIGHT DEFAULT, DARK TOGGLE)
// ==========================================================================
function initTheme() {
  const savedTheme = localStorage.getItem('atelier_theme') || 'light';
  applyTheme(savedTheme);

  const toggleBtn = document.getElementById('themeToggleBtn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('atelier_theme', theme);

  const toggleBtn = document.getElementById('themeToggleBtn');
  if (toggleBtn) {
    const isDark = theme === 'dark';
    toggleBtn.setAttribute('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    toggleBtn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    toggleBtn.innerHTML = isDark
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  }
}

// ==========================================================================
// 2. MOBILE NAVIGATION DRAWER
// ==========================================================================
function initMobileDrawer() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  const closeBtn = document.getElementById('mobileDrawerClose');

  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', () => drawer.classList.add('open'));
  }
  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', () => drawer.classList.remove('open'));
  }
}

// ==========================================================================
// 3. DATA LOADING & LOCAL STORAGE
// ==========================================================================
function loadCollection() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const existingIds = new Set(parsed.map(item => item.id));
      const missingSeed = FRAGRANCE_DATABASE.filter(seed => !existingIds.has(seed.id));

      // Synchronize clean studio images and note profiles from seed
      collection = parsed.map(item => {
        const seedMatch = FRAGRANCE_DATABASE.find(s => s.id === item.id);
        if (seedMatch) {
          return {
            ...item,
            image: seedMatch.image,
            userPhoto: item.userUploadedCustomPhoto ? item.userPhoto : seedMatch.image,
            occasions: seedMatch.occasions || item.occasions,
            notes: seedMatch.notes || item.notes
          };
        }
        return item;
      });

      if (missingSeed.length > 0) {
        collection = [...collection, ...missingSeed];
        saveCollection();
      }
    } else {
      collection = [...FRAGRANCE_DATABASE];
      saveCollection();
    }
  } catch (err) {
    console.error('Error parsing stored collection, falling back to seed database:', err);
    collection = [...FRAGRANCE_DATABASE];
  }
}

function saveCollection() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collection));
  } catch (err) {
    console.warn('LocalStorage error or quota exceeded', err);
  }
}

// ==========================================================================
// 4. SCENT OF THE DAY (SEASONAL TIME-OF-YEAR RECOMMENDATION ENGINE)
// ==========================================================================
let sotdActiveSeason = null;

function getCalendarSeasonInfo() {
  const monthIdx = new Date().getMonth();
  let season = 'spring';
  if (monthIdx >= 2 && monthIdx <= 4) season = 'spring';
  else if (monthIdx >= 5 && monthIdx <= 7) season = 'summer';
  else if (monthIdx >= 8 && monthIdx <= 10) season = 'autumn';
  else season = 'winter';

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const hour = new Date().getHours();
  const isEvening = (hour >= 18 || hour < 6);
  const timeKey = isEvening ? 'night' : 'day';
  const timeLabel = isEvening ? 'Evening' : 'Daytime';

  return {
    calendarSeason: season,
    monthName: monthNames[monthIdx],
    isEvening,
    timeKey,
    timeLabel
  };
}

function getInSeasonCandidates(seasonKey) {
  if (!collection || collection.length === 0) return [];

  const normSeason = (seasonKey || 'autumn').toLowerCase();

  // Strict seasonal match: at least 20% compatibility rating
  let matched = collection.filter(item => {
    const score = item.seasons?.[normSeason] || 0;
    return score >= 20;
  });

  // Safe fallback if collection has fewer items
  if (matched.length === 0) {
    matched = collection.filter(item => (item.seasons?.[normSeason] || 0) > 0);
  }
  if (matched.length === 0) {
    matched = [...collection];
  }

  const { timeKey } = getCalendarSeasonInfo();

  return matched.map(item => {
    const seasonScore = item.seasons?.[normSeason] || 0;
    const timeScore = item.timeOfDay?.[timeKey] || 30;
    const ratingBonus = (item.rating || 4.5) * 10;
    // Weighted scoring: Season match is primary, followed by time of day & rating
    const totalScore = (seasonScore * 2.5) + timeScore + ratingBonus;
    return { item, totalScore, seasonScore };
  }).sort((a, b) => b.totalScore - a.totalScore);
}

function initSotdRecommendation(forceReroll = false, targetId = null, newSeason = null) {
  if (!collection || collection.length === 0) return;

  const cal = getCalendarSeasonInfo();

  if (newSeason) {
    sotdActiveSeason = newSeason.toLowerCase();
  } else if (!sotdActiveSeason) {
    sotdActiveSeason = cal.calendarSeason;
  }

  const candidates = getInSeasonCandidates(sotdActiveSeason);
  if (candidates.length === 0) return;

  let selected;
  if (targetId) {
    const match = candidates.find(c => c.item.id === targetId);
    selected = match ? match.item : collection.find(c => c.id === targetId) || candidates[0].item;
  } else if (forceReroll && candidates.length > 1) {
    // Pick another in-season candidate excluding the currently shown bottle
    const otherCandidates = candidates.filter(c => c.item.id !== currentSotdFragranceId);
    const pool = otherCandidates.length > 0 ? otherCandidates : candidates;
    const randIdx = Math.floor(Math.random() * pool.length);
    selected = pool[randIdx].item;
  } else {
    selected = candidates[0].item;
  }

  currentSotdFragranceId = selected.id;

  const capSeason = sotdActiveSeason.charAt(0).toUpperCase() + sotdActiveSeason.slice(1);
  const isCurrentCalendar = (sotdActiveSeason === cal.calendarSeason);

  // Update Section Header & Badges
  const sotdSeasonBadgeText = document.getElementById('sotdSeasonBadgeText');
  if (sotdSeasonBadgeText) {
    sotdSeasonBadgeText.textContent = isCurrentCalendar
      ? `${capSeason} Selection // ${cal.monthName} (${cal.timeLabel} Wear)`
      : `${capSeason} Selection // Custom Season (${cal.timeLabel} Wear)`;
  }

  const sotdSectionDesc = document.getElementById('sotdSectionDesc');
  if (sotdSectionDesc) {
    sotdSectionDesc.textContent = isCurrentCalendar
      ? `Curated for ${capSeason} weather in ${cal.monthName} (${cal.timeLabel} wear). Picked strictly from the ${candidates.length} bottles in your collection rated for this season.`
      : `Curated for ${capSeason} weather (${cal.timeLabel} wear). Picked strictly from the ${candidates.length} bottles in your collection rated for this season.`;
  }

  const sotdPhotoSeasonTag = document.getElementById('sotdPhotoSeasonTag');
  if (sotdPhotoSeasonTag) {
    const matchPct = selected.seasons?.[sotdActiveSeason] || 0;
    sotdPhotoSeasonTag.textContent = `${capSeason} Match ${matchPct}%`;
  }

  // Update Season Switcher Buttons & Counts
  const allSeasons = ['autumn', 'winter', 'spring', 'summer'];
  allSeasons.forEach(s => {
    const capS = s.charAt(0).toUpperCase() + s.slice(1);
    const btn = document.querySelector(`.sotd-season-btn[data-season="${s}"]`);
    const countEl = document.getElementById(`sotdCount${capS}`);
    const tagEl = document.getElementById(`sotdTag${capS}`);

    const count = collection.filter(b => (b.seasons?.[s] || 0) >= 20).length;
    if (countEl) countEl.textContent = count;
    if (tagEl) tagEl.style.display = (s === cal.calendarSeason) ? 'inline-block' : 'none';

    if (btn) {
      if (s === sotdActiveSeason) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
      btn.onclick = () => initSotdRecommendation(false, null, s);
    }
  });

  // Update SOTD Bottle Card Details
  const sotdImg = document.getElementById('sotdImg');
  const sotdTitle = document.getElementById('sotdTitle');
  const sotdCloneMeta = document.getElementById('sotdCloneMeta');
  const sotdSubtitle = document.getElementById('sotdSubtitle');
  const sotdTopNotes = document.getElementById('sotdTopNotes');
  const sotdHeartNotes = document.getElementById('sotdHeartNotes');
  const sotdBaseNotes = document.getElementById('sotdBaseNotes');
  const sotdBlueprint = document.getElementById('sotdBlueprint');

  if (sotdImg) {
    sotdImg.src = selected.image || selected.userPhoto || 'assets/bottles/default-bottle.svg';
    sotdImg.alt = selected.name;
  }
  if (sotdTitle) sotdTitle.textContent = selected.name;
  if (sotdCloneMeta) {
    sotdCloneMeta.textContent = selected.isClone && selected.cloneOf
      ? `Inspired by ${selected.cloneOf.originalName} by ${selected.cloneOf.originalHouse}`
      : `${selected.brand} — Original`;
  }
  if (sotdSubtitle) {
    const matchPct = selected.seasons?.[sotdActiveSeason] || 0;
    sotdSubtitle.textContent = selected.description || `${selected.name} is a versatile ${selected.crg} fragrance with a ${matchPct}% compatibility rating for ${capSeason} wear.`;
  }

  if (sotdTopNotes) {
    sotdTopNotes.textContent = (selected.notes?.top || []).map(n => n.name).join(', ') || 'Fresh Citrus';
  }
  if (sotdHeartNotes) {
    sotdHeartNotes.textContent = (selected.notes?.heart || []).map(n => n.name).join(', ') || 'Florals, Warm Spices';
  }
  if (sotdBaseNotes) {
    sotdBaseNotes.textContent = (selected.notes?.base || []).map(n => n.name).join(', ') || 'Woods, Vanilla, Amber';
  }

  if (sotdBlueprint) {
    const bpText = selected.sprayBlueprint ? selected.sprayBlueprint.join(', ') : 'Behind Ears, Back of Neck';
    sotdBlueprint.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
        <circle cx="12" cy="12" r="9"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <span>Spray Routine: ${selected.recommendedSprays || '3-4 Sprays'} applied to ${bpText}.</span>
    `;
  }

  const inspectBtn = document.getElementById('sotdInspectBtn');
  if (inspectBtn) inspectBtn.onclick = () => openDetailModal(currentSotdFragranceId);

  const refreshBtn = document.getElementById('sotdRefreshBtn');
  if (refreshBtn) refreshBtn.onclick = () => initSotdRecommendation(true);

  // Render the In-Season Options Rail
  const optionsTitle = document.getElementById('sotdOptionsTitle');
  if (optionsTitle) {
    optionsTitle.textContent = `${capSeason} Options in Your Collection (${candidates.length} Bottles)`;
  }

  const optionsRail = document.getElementById('sotdOptionsRail');
  if (optionsRail) {
    optionsRail.innerHTML = candidates.map(c => {
      const b = c.item;
      const isSelected = (b.id === selected.id);
      const score = b.seasons?.[sotdActiveSeason] || 0;
      return `
        <div class="sotd-option-card ${isSelected ? 'active' : ''}" data-id="${b.id}" role="button" tabindex="0" title="Set ${b.name} as Scent of the Day">
          ${isSelected ? '<span class="sotd-option-active-badge">Active</span>' : ''}
          <img class="sotd-option-thumb" src="${b.image || b.userPhoto || 'assets/bottles/default-bottle.svg'}" alt="${b.name}" loading="lazy">
          <span class="sotd-option-name">${b.name}</span>
          <span class="sotd-option-match">${score}% ${capSeason}</span>
        </div>
      `;
    }).join('');

    // Attach click handlers to option cards
    optionsRail.querySelectorAll('.sotd-option-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.id;
        if (id) {
          initSotdRecommendation(false, id);
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });
  }
}

// ==========================================================================
// 5. ALL FRAGRANCES: EXPANDED NATURAL LANGUAGE FILTERS
// ==========================================================================
function initCollectionPage() {
  // Read query params like ?occasion=Gym or ?scenario=Running
  const params = new URLSearchParams(window.location.search);
  const occParam = params.get('occasion') || params.get('scenario');
  if (occParam) {
    vaultFilters.occasion = occParam;
  }

  // Bind filter button clicks
  const filterRows = document.querySelectorAll('.filter-pills-wrap');
  filterRows.forEach(row => {
    const group = row.dataset.group;
    const buttons = row.querySelectorAll('.filter-chip-btn');

    buttons.forEach(btn => {
      // Pre-select if matches URL parameter
      if (group === 'occasion' && occParam && btn.dataset.filter.toLowerCase() === occParam.toLowerCase()) {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        vaultFilters.occasion = btn.dataset.filter;
      }

      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        vaultFilters[group] = btn.dataset.filter;
        renderCollectionGrid();
      });
    });
  });

  // Search input
  const searchInput = document.getElementById('vaultSearchInput') || document.getElementById('boutiqueSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      vaultFilters.search = e.target.value.trim().toLowerCase();
      renderCollectionGrid();
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.activeElement === searchInput) {
        searchInput.value = '';
        vaultFilters.search = '';
        renderCollectionGrid();
      }
    });
  }

  // Sorter
  const sortSelect = document.getElementById('vaultSortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      vaultFilters.sort = e.target.value;
      renderCollectionGrid();
    });
  }

  renderCollectionGrid();
}

function renderCollectionGrid() {
  const grid = document.getElementById('boutiqueProductGrid');
  const countBadge = document.getElementById('vaultFilteredCount');
  const chipsContainer = document.getElementById('activeFilterChipsContainer');
  if (!grid) return;

  const filtered = collection.filter(item => {
    // 1. Text Search
    if (vaultFilters.search) {
      const q = vaultFilters.search;
      const matchName = item.name.toLowerCase().includes(q);
      const matchBrand = item.brand.toLowerCase().includes(q);
      const matchClone = item.cloneOf && (
        item.cloneOf.originalName.toLowerCase().includes(q) ||
        item.cloneOf.originalHouse.toLowerCase().includes(q)
      );
      const matchNotes = [
        ...(item.notes?.top || []),
        ...(item.notes?.heart || []),
        ...(item.notes?.base || [])
      ].some(n => n.name.toLowerCase().includes(q));
      const matchAccords = (item.mainAccords || []).some(a => a.name.toLowerCase().includes(q));

      if (!matchName && !matchBrand && !matchClone && !matchNotes && !matchAccords) {
        return false;
      }
    }

    // 2. Occasion (e.g. Gym, Running, Walking, Work, Dates)
    if (vaultFilters.occasion !== 'all') {
      const occList = (item.occasions || []).map(o => o.toLowerCase());
      const targetOcc = vaultFilters.occasion.toLowerCase();
      
      const hasOccasion = occList.some(o => o.includes(targetOcc) || targetOcc.includes(o));
      if (!hasOccasion) return false;
    }

    // 3. Scent Type
    if (vaultFilters.scentType !== 'all') {
      const type = vaultFilters.scentType.toLowerCase();
      const allText = [
        item.crg || '',
        item.description || '',
        ...(item.mainAccords || []).map(a => a.name),
        ...(item.notes?.top || []).map(n => n.name),
        ...(item.notes?.heart || []).map(n => n.name),
        ...(item.notes?.base || []).map(n => n.name)
      ].join(' ').toLowerCase();

      if (type === 'fresh') {
        if (!allText.includes('fresh') && !allText.includes('aquatic') && !allText.includes('clean') && !allText.includes('mineral')) return false;
      } else if (type === 'woody') {
        if (!allText.includes('wood') && !allText.includes('cedar') && !allText.includes('oud') && !allText.includes('sandalwood')) return false;
      } else if (type === 'sweet') {
        if (!allText.includes('sweet') && !allText.includes('vanilla') && !allText.includes('tonka') && !allText.includes('caramel') && !allText.includes('chocolate')) return false;
      } else if (type === 'spicy') {
        if (!allText.includes('spic') && !allText.includes('cinnamon') && !allText.includes('pepper') && !allText.includes('cardamom')) return false;
      } else if (type === 'tobacco') {
        if (!allText.includes('tobacco') && !allText.includes('rum') && !allText.includes('boozy') && !allText.includes('cognac')) return false;
      } else if (type === 'citrus') {
        if (!allText.includes('citrus') && !allText.includes('mandarin') && !allText.includes('lemon') && !allText.includes('bergamot') && !allText.includes('grapefruit')) return false;
      } else if (type === 'aquatic') {
        if (!allText.includes('aquatic') && !allText.includes('marine') && !allText.includes('sea') && !allText.includes('water')) return false;
      }
    }

    // 4. Season
    if (vaultFilters.season !== 'all') {
      const score = item.seasons?.[vaultFilters.season.toLowerCase()] || 0;
      if (score < 20) return false;
    }

    // 5. Time of Day
    if (vaultFilters.timeOfDay !== 'all') {
      const timeScore = item.timeOfDay?.[vaultFilters.timeOfDay.toLowerCase()] || 0;
      if (timeScore < 35) return false;
    }

    // 6. Type (Clone vs Original)
    if (vaultFilters.originType !== 'all') {
      const isClone = item.isClone === true || item.brand === 'Perfume Parlour';
      if (vaultFilters.originType === 'clone' && !isClone) return false;
      if (vaultFilters.originType === 'original' && isClone) return false;
    }

    // 7. Brand
    if (vaultFilters.brand !== 'all') {
      if (item.brand !== vaultFilters.brand) return false;
    }

    // 8. Concentration
    if (vaultFilters.concentration !== 'all') {
      if (item.concentration !== vaultFilters.concentration) return false;
    }

    return true;
  }).sort((a, b) => {
    switch (vaultFilters.sort) {
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'brand':
        return a.brand.localeCompare(b.brand);
      case 'volume':
        return (b.remainingMl / b.bottleSize) - (a.remainingMl / a.bottleSize);
      default:
        return 0;
    }
  });

  // Update Live Counter
  if (countBadge) countBadge.textContent = filtered.length;

  // Render Active Filter Badges
  if (chipsContainer) {
    chipsContainer.innerHTML = '';
    const activeEntries = Object.entries(vaultFilters).filter(([k, v]) => v && v !== 'all' && k !== 'sort');

    activeEntries.forEach(([key, val]) => {
      const chip = document.createElement('span');
      chip.className = 'active-filter-badge';
      chip.innerHTML = `
        <span>${formatFilterLabel(key, val)}</span>
        <span class="active-filter-remove" data-key="${key}" title="Remove filter">&times;</span>
      `;
      chip.querySelector('.active-filter-remove').addEventListener('click', () => {
        resetSpecificFilter(key);
      });
      chipsContainer.appendChild(chip);
    });

    if (activeEntries.length > 0) {
      const clearAllBtn = document.createElement('button');
      clearAllBtn.className = 'clear-all-filters-btn';
      clearAllBtn.textContent = 'Clear All';
      clearAllBtn.addEventListener('click', resetAllFilters);
      chipsContainer.appendChild(clearAllBtn);
    }
  }

  // Render Product Cards
  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 4.5rem 2rem; text-align: center; background: var(--canvas-card); border: 1px dashed var(--canvas-border); border-radius: var(--radius-xl);">
        <h3 style="font-family: var(--font-display); font-size: 1.35rem; color: var(--gold-primary); margin-bottom: 0.5rem;">No bottles match these filters</h3>
        <p style="color: var(--text-secondary); font-size: 0.95rem; max-width: 48ch; margin: 0 auto 1.5rem;">Try unchecking some filters or clearing your search term to see more bottles.</p>
        <button onclick="resetAllFilters()" class="btn-luxury btn-luxury-primary" style="margin: 0 auto;">Show All 20 Bottles</button>
      </div>
    `;
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement('article');
    card.className = 'boutique-product-card';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `View details for ${item.name}`);

    const bottleSrc = item.image || item.userPhoto || 'assets/bottles/default-bottle.svg';

    const brandLine = item.brand === 'Perfume Parlour' && item.perfumeParlourCode
      ? `Perfume Parlour (Ref. ${item.perfumeParlourCode})`
      : item.brand;

    const lineageText = item.isClone && item.cloneOf
      ? `Clone of: ${item.cloneOf.originalName}`
      : `Original Formulation`;

    const topNoteNames = (item.notes?.top || []).slice(0, 2).map(n => n.name);
    const heartNoteNames = (item.notes?.heart || []).slice(0, 2).map(n => n.name);
    const notesSummary = [...topNoteNames, ...heartNoteNames].join(' • ') || 'Aromatic Woods';

    card.innerHTML = `
      <div class="boutique-pedestal-stage">
        <img class="boutique-bottle-img" src="${bottleSrc}" alt="${item.name}" loading="lazy">
      </div>
      <div class="boutique-card-info">
        <span class="boutique-brand-name">${brandLine}</span>
        <h3 class="boutique-fragrance-name">${item.name}</h3>
        <span class="boutique-lineage-note">${lineageText}</span>
        <span class="boutique-notes-summary">Notes: ${notesSummary}</span>
        <div class="boutique-card-footer">
          <span class="boutique-concentration-badge">${item.concentration}</span>
          <span style="font-family: var(--font-mono); font-size: 10px; color: var(--gold-primary); text-transform: uppercase; font-weight: 600;">Details &rarr;</span>
        </div>
      </div>
    `;

    card.addEventListener('click', () => openDetailModal(item.id));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openDetailModal(item.id);
      }
    });

    grid.appendChild(card);
  });
}

function formatFilterLabel(key, val) {
  if (key === 'originType') {
    return val === 'clone' ? 'Type: Clones' : 'Type: Originals';
  }
  if (key === 'timeOfDay') {
    return val === 'day' ? 'Daytime' : 'Nighttime';
  }
  return val;
}

function resetSpecificFilter(key) {
  vaultFilters[key] = key === 'search' ? '' : 'all';

  if (key === 'search') {
    const input = document.getElementById('vaultSearchInput') || document.getElementById('boutiqueSearchInput');
    if (input) input.value = '';
  } else {
    const row = document.querySelector(`.filter-pills-wrap[data-group="${key}"]`);
    if (row) {
      row.querySelectorAll('.filter-chip-btn').forEach(b => b.classList.remove('active'));
      const allBtn = row.querySelector('[data-filter="all"]');
      if (allBtn) allBtn.classList.add('active');
    }
  }

  renderCollectionGrid();
}

window.resetAllFilters = function() {
  vaultFilters = {
    occasion: 'all',
    scentType: 'all',
    season: 'all',
    timeOfDay: 'all',
    originType: 'all',
    brand: 'all',
    concentration: 'all',
    search: '',
    sort: 'rating'
  };

  const input = document.getElementById('vaultSearchInput') || document.getElementById('boutiqueSearchInput');
  if (input) input.value = '';

  document.querySelectorAll('.filter-pills-wrap').forEach(row => {
    row.querySelectorAll('.filter-chip-btn').forEach(b => b.classList.remove('active'));
    const allBtn = row.querySelector('[data-filter="all"]');
    if (allBtn) allBtn.classList.add('active');
  });

  renderCollectionGrid();
};

// ==========================================================================
// 6. LAYERING COMBINATIONS & INTERACTIVE PAIRING TOOL
// ==========================================================================
function initLayeringPage() {
  renderLayeringDuos();

  const curatedBtn = document.getElementById('modeCuratedDuosBtn');
  const studioBtn = document.getElementById('modeInteractiveStudioBtn');
  const curatedView = document.getElementById('curatedDuosView');
  const studioView = document.getElementById('interactiveStudioView');

  if (curatedBtn && studioBtn) {
    curatedBtn.addEventListener('click', () => {
      curatedBtn.classList.add('active');
      studioBtn.classList.remove('active');
      if (curatedView) curatedView.style.display = 'block';
      if (studioView) studioView.style.display = 'none';
    });

    studioBtn.addEventListener('click', () => {
      studioBtn.classList.add('active');
      curatedBtn.classList.remove('active');
      if (studioView) studioView.style.display = 'block';
      if (curatedView) curatedView.style.display = 'none';
      initInteractivePairingStudio();
    });
  }

  initInteractivePairingStudio();
}

function renderLayeringDuos() {
  const container = document.getElementById('layeringDuosContainer');
  if (!container) return;

  container.innerHTML = '';

  CURATED_SIGNATURE_DUOS.forEach(duo => {
    const base = collection.find(c => c.id === duo.baseId);
    const comp = collection.find(c => c.id === duo.companionId);
    if (!base || !comp) return;

    const baseSrc = base.image || base.userPhoto || 'assets/bottles/default-bottle.svg';
    const compSrc = comp.image || comp.userPhoto || 'assets/bottles/default-bottle.svg';

    const card = document.createElement('article');
    card.className = 'duo-editorial-card';

    card.innerHTML = `
      <div>
        <div class="duo-card-header">
          <span class="world-badge-code">${duo.vibe}</span>
          <span class="world-badge-code" style="color: var(--gold-primary);">${duo.score}% Compatibility</span>
        </div>
        <h3 class="duo-card-title">${duo.title}</h3>
        
        <div class="duo-bottles-duplex">
          <div class="duplex-flacon" onclick="openDetailModal('${base.id}')" style="cursor: pointer;" title="View ${base.name}">
            <img src="${baseSrc}" alt="${base.name}">
            <span>${base.name}</span>
          </div>
          <span class="duplex-ampersand">&amp;</span>
          <div class="duplex-flacon" onclick="openDetailModal('${comp.id}')" style="cursor: pointer;" title="View ${comp.name}">
            <img src="${compSrc}" alt="${comp.name}">
            <span>${comp.name}</span>
          </div>
        </div>

        <p class="duo-poetry-copy">${duo.narrative}</p>
      </div>

      <div class="duo-application-steps">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
          <circle cx="12" cy="12" r="9"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <span>${duo.sequence}</span>
      </div>
    `;

    container.appendChild(card);
  });
}

function initInteractivePairingStudio() {
  const baseSelect = document.getElementById('baseFragranceSelect');
  if (!baseSelect || collection.length === 0) return;

  if (baseSelect.children.length === 0) {
    collection.forEach(item => {
      const opt = document.createElement('option');
      opt.value = item.id;
      opt.textContent = `${item.name} (${item.brand})`;
      baseSelect.appendChild(opt);
    });

    baseSelect.addEventListener('change', (e) => {
      updateInteractivePairings(e.target.value);
    });
  }

  const currentVal = baseSelect.value || collection[0].id;
  updateInteractivePairings(currentVal);
}

function updateInteractivePairings(baseId) {
  const baseItem = collection.find(c => c.id === baseId);
  if (!baseItem) return;

  const preview = document.getElementById('baseFlaconPreview');
  if (preview) {
    const baseSrc = baseItem.image || baseItem.userPhoto || 'assets/bottles/default-bottle.svg';
    preview.innerHTML = `
      <img src="${baseSrc}" class="base-flacon-preview-img" alt="${baseItem.name}">
      <div>
        <span class="boutique-brand-name">${baseItem.brand}</span>
        <h4 style="font-family: var(--font-display); font-size: 1.15rem; font-weight: 700; color: var(--text-primary);">${baseItem.name}</h4>
        <span style="font-family: var(--font-mono); font-size: 11px; color: var(--gold-primary);">${baseItem.concentration}</span>
      </div>
    `;
  }

  const candidates = collection.filter(c => c.id !== baseItem.id);
  const countBadge = document.getElementById('companionsCountBadge');
  if (countBadge) countBadge.textContent = `${candidates.length} Pairings Ranked`;

  const scored = candidates.map(candidate => {
    const synergy = calculatePairingSynergy(baseItem, candidate);
    return { candidate, ...synergy };
  }).sort((a, b) => b.score - a.score);

  const container = document.getElementById('rankedCompanionsContainer');
  if (!container) return;

  container.innerHTML = '';
  scored.forEach(res => {
    const cand = res.candidate;
    const candSrc = cand.image || cand.userPhoto || 'assets/bottles/default-bottle.svg';

    const card = document.createElement('div');
    card.className = 'companion-rank-card';
    card.innerHTML = `
      <img src="${candSrc}" class="companion-rank-img" alt="${cand.name}" onclick="openDetailModal('${cand.id}')" style="cursor: pointer;">
      <div class="companion-rank-meta">
        <span class="world-badge-code" style="font-size: 9px;">${res.synergyType}</span>
        <h4 style="font-family: var(--font-display); font-size: 1.1rem; font-weight: 700; color: var(--text-primary); cursor: pointer;" onclick="openDetailModal('${cand.id}')">${cand.name}</h4>
        <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">${res.rationale}</p>
        <span style="font-family: var(--font-mono); font-size: 11px; color: var(--gold-primary); margin-top: 0.25rem;">${res.sequence}</span>
      </div>
      <div class="companion-synergy-column">
        <span class="companion-synergy-score">${res.score}%</span>
        <span style="font-family: var(--font-mono); font-size: 9px; text-transform: uppercase; color: var(--text-tertiary);">Match</span>
      </div>
    `;

    container.appendChild(card);
  });
}

function calculatePairingSynergy(base, companion) {
  let score = 72;
  let synergyType = "Harmonious Complement";
  let rationale = "Balanced interplay of complementary notes and accords.";
  let sequence = `Step 1: 2 sprays ${base.name} on neck. Step 2: 1-2 sprays ${companion.name} on collar.`;

  const bId = base.id;
  const cId = companion.id;

  // 1. Single-Molecule Primers (Iso E Super & Ambroxan)
  if (cId === 'user-pp-particle-iso-e-super' || cId === 'user-pp-second-particle-1980') {
    score = 98;
    synergyType = cId === 'user-pp-particle-iso-e-super' ? "Iso E Super Sillage Amplifier" : "Ambroxan Projection Booster";
    rationale = `Pure ${cId === 'user-pp-particle-iso-e-super' ? 'Iso E Super' : 'Ambroxan'} binds to skin lipids and extends the projection of ${base.name} without altering its scent profile.`;
    sequence = `Step 1: Apply 2 sprays ${companion.name} on pulse points as primer. Step 2: Mist 2 sprays ${base.name} over top.`;
    return { score, synergyType, rationale, sequence };
  } else if (bId === 'user-pp-particle-iso-e-super' || bId === 'user-pp-second-particle-1980') {
    score = 96;
    synergyType = "Molecular Fixative Primer";
    rationale = `Locks ${companion.name} to the skin with a warm cedarwood or ambergris glow, preventing premature drydown fade.`;
    sequence = `Step 1: Apply 2 sprays ${base.name} as primer on skin. Step 2: Mist 2 sprays ${companion.name} over collar.`;
    return { score, synergyType, rationale, sequence };
  }

  // 2. Fresh Citrus Top Note Contrast over Warm Rich Bases
  if (cId === 'user-pp-citrus-particle-0616') {
    score = 97;
    synergyType = "Fresh Citrus & Warm Base Contrast";
    rationale = `Sparkling mandarin orange cuts cleanly through the warmth of ${base.name}, adding a crisp opening before settling into deep base notes.`;
    sequence = `Step 1: Apply 2 sprays ${base.name} on neck. Step 2: Apply 2 sprays Citrus Particle on shirt collar and wrists.`;
    return { score, synergyType, rationale, sequence };
  } else if (bId === 'user-pp-citrus-particle-0616') {
    score = 95;
    synergyType = "Zesty Top Note Layer";
    rationale = `Lifts ${companion.name} with natural mandarin zest over its existing heart notes.`;
    sequence = `Step 1: Apply 2 sprays ${companion.name} on neck. Step 2: Apply 1-2 sprays Citrus Particle on wrists.`;
    return { score, synergyType, rationale, sequence };
  }

  // 3. Hand-Crafted Iconic Pairings
  if ((bId === 'user-after-effect-fa-paris' && cId === 'user-pp-astray-fruit-1947') ||
      (bId === 'user-pp-astray-fruit-1947' && cId === 'user-after-effect-fa-paris')) {
    score = 97;
    synergyType = "Boozy Rum & Dark Cherry";
    rationale = `Side Effect's aged rum and tobacco blend seamlessly with Lost Cherry's sweet griotte cherry and almond syrup. An intoxicating evening combination.`;
    sequence = `Step 1: 2 sprays After Effect behind ears. Step 2: 1 spray Astray Fruit on chest and collar.`;
    return { score, synergyType, rationale, sequence };
  }

  if ((bId === 'user-tf-oud-wood-spray' && cId === 'user-after-effect-fa-paris') ||
      (bId === 'user-after-effect-fa-paris' && cId === 'user-tf-oud-wood-spray')) {
    score = 97;
    synergyType = "Smoked Oud & Warm Rum";
    rationale = `Side Effect's warm rum, cinnamon, and tobacco layer over Tom Ford Oud Wood's dry smoked woods for a masculine evening presence.`;
    sequence = `Step 1: 3 sprays Oud Wood body spray on chest and shirt. Step 2: 2 sprays After Effect on pulse points.`;
    return { score, synergyType, rationale, sequence };
  }

  if ((bId === 'user-pp-intenso-water-1329' && cId === 'user-pp-sweet-water-1262') ||
      (bId === 'user-pp-sweet-water-1262' && cId === 'user-pp-intenso-water-1329')) {
    score = 96;
    synergyType = "Deep Marine & Smoky Incense";
    rationale = `Acqua Di Giò Profondo's bright mineral sea notes merge with Profumo's dark smoky incense and patchouli for a rich Mediterranean aquatic.`;
    sequence = `Step 1: 2 sprays Sweet Water on base of neck. Step 2: 2 sprays Intenso Water on shoulders.`;
    return { score, synergyType, rationale, sequence };
  }

  if ((bId === 'user-pp-noire-illusion-1746' && cId === 'user-tf-noir-extreme') ||
      (bId === 'user-tf-noir-extreme' && cId === 'user-pp-noire-illusion-1746')) {
    score = 95;
    synergyType = "Dark Chocolate & Kulfi Amber";
    rationale = `Tom Ford Noir Extreme's milky kulfi dessert blends with Kilian Black Phantom's roasted coffee, bitter dark chocolate, and rum.`;
    sequence = `Step 1: 2 sprays Noir Extreme on neck. Step 2: 1 spray Noire Illusion on collar.`;
    return { score, synergyType, rationale, sequence };
  }

  if ((bId === 'user-pp-herb-garden-1598' && cId === 'user-pp-intense-aroma-exploding') ||
      (bId === 'user-pp-intense-aroma-exploding' && cId === 'user-pp-herb-garden-1598')) {
    score = 96;
    synergyType = "Crisp Apple & Spiced Vanilla";
    rationale = `Layton's green apple and lavender notes complement Spicebomb Extreme's black pepper, cinnamon, and dark bourbon vanilla.`;
    sequence = `Step 1: 2 sprays Herb Garden on neck. Step 2: 1-2 sprays Intense Aroma Exploding on coat or scarf.`;
    return { score, synergyType, rationale, sequence };
  }

  if ((bId === 'user-voux-elegante' && cId === 'user-pp-herb-garden-1598') ||
      (bId === 'user-pp-herb-garden-1598' && cId === 'user-voux-elegante')) {
    score = 94;
    synergyType = "Honey Lavender & Crisp Apple";
    rationale = `Naxos's golden honey and blonde tobacco pair with Layton's crisp orchard apple, lavender, and sandalwood.`;
    sequence = `Step 1: 2 sprays Herb Garden on neck. Step 2: 2 sprays Voux Elegante on collar.`;
    return { score, synergyType, rationale, sequence };
  }

  // 4. Dynamic Clash Detection
  const baseAccords = (base.mainAccords || []).map(a => a.name.toLowerCase());
  const compAccords = (companion.mainAccords || []).map(a => a.name.toLowerCase());
  const isBaseMarine = baseAccords.some(a => a.includes('marine') || a.includes('aquatic'));
  const isCompMarine = compAccords.some(a => a.includes('marine') || a.includes('aquatic'));
  const isBaseDarkGourmand = baseAccords.some(a => a.includes('chocolate') || a.includes('coffee') || a.includes('rum') || a.includes('boozy'));
  const isCompDarkGourmand = compAccords.some(a => a.includes('chocolate') || a.includes('coffee') || a.includes('rum') || a.includes('boozy'));

  if ((isBaseMarine && isCompDarkGourmand) || (isCompMarine && isBaseDarkGourmand)) {
    score = 58;
    synergyType = "Opposing Notes (Clash Risk)";
    rationale = `Crisp salty marine notes and dense boozy chocolate notes pull in opposite directions. Recommended to test with 1 light spray before wearing out.`;
    sequence = `Step 1: 1 spray ${base.name} on skin. Step 2: 1 spray ${companion.name} on jacket hem only.`;
    return { score, synergyType, rationale, sequence };
  }

  // 5. Shared Accord Harmony
  const baseAccordSet = new Set(baseAccords);
  const sharedAccords = compAccords.filter(a => baseAccordSet.has(a));

  if (sharedAccords.length >= 2) {
    score = 88 + Math.min(8, sharedAccords.length * 3);
    const prettyShared = sharedAccords.slice(0, 3).map(a => a.charAt(0).toUpperCase() + a.slice(1)).join(' and ');
    synergyType = `Shared ${prettyShared} Harmony`;
    rationale = `Both fragrances share strong ${prettyShared} notes, ensuring a smooth transition as the top notes fade into a rich drydown.`;
    sequence = base.concentration === 'Extrait de Parfum' || base.concentration === 'Eau de Parfum'
      ? `Step 1: 2 sprays ${base.name} on neck. Step 2: 1-2 sprays ${companion.name} on collar.`
      : `Step 1: 2 sprays ${companion.name} on neck. Step 2: 2 sprays ${base.name} over top.`;
    return { score, synergyType, rationale, sequence };
  } else if (sharedAccords.length === 1) {
    score = 82;
    const match = sharedAccords[0].charAt(0).toUpperCase() + sharedAccords[0].slice(1);
    synergyType = `Complementary ${match} Accord`;
    rationale = `Connected by a shared ${match} foundation that anchors both scents without competing for attention.`;
    sequence = `Step 1: 2 sprays ${base.name} on pulse points. Step 2: 1 spray ${companion.name} on shirt.`;
    return { score, synergyType, rationale, sequence };
  }

  // 6. Woody / Amber Balance
  const isBaseWoody = baseAccords.some(a => a.includes('wood') || a.includes('cedar') || a.includes('amber'));
  const isCompWoody = compAccords.some(a => a.includes('wood') || a.includes('cedar') || a.includes('amber'));
  if (isBaseWoody && isCompWoody) {
    score = 84;
    synergyType = "Warm Woody Foundation";
    rationale = `Both scents share clean woody and amber drydown bases that create depth and extended projection.`;
    sequence = `Step 1: 2 sprays ${base.name} on neck. Step 2: 1-2 sprays ${companion.name} on chest.`;
    return { score, synergyType, rationale, sequence };
  }

  score = 75;
  synergyType = "Balanced Complement";
  rationale = `Distinct note profiles that offer an intriguing, well-rounded combination throughout the day.`;
  sequence = `Step 1: 2 sprays ${base.name} on pulse points. Step 2: 1 spray ${companion.name} on shirt collar.`;
  return { score, synergyType, rationale, sequence };
}

// ==========================================================================
// 7. BOTTLE DETAILS MODAL
// ==========================================================================
function initDetailModal() {
  const modal = document.getElementById('detailModal');
  const closeBtn = document.getElementById('modalCloseBtn');

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      modal.classList.remove('open');
    }
  });
}

window.openDetailModal = function(fragranceId) {
  const item = collection.find(c => c.id === fragranceId);
  if (!item) return;

  const modal = document.getElementById('detailModal');
  if (!modal) return;

  const bottleImg = document.getElementById('modalBottleImg');
  if (bottleImg) {
    bottleImg.src = item.image || item.userPhoto || 'assets/bottles/default-bottle.svg';
    bottleImg.alt = item.name;
  }

  const titleEl = document.getElementById('modalTitle');
  if (titleEl) titleEl.textContent = item.name;

  const concentrationEl = document.getElementById('modalConcentration');
  if (concentrationEl) {
    concentrationEl.textContent = item.flaconFormat || `${item.concentration} • ${item.bottleSize}ml`;
  }

  const cloneOriginEl = document.getElementById('modalCloneOrigin');
  if (cloneOriginEl) {
    cloneOriginEl.textContent = item.isClone && item.cloneOf
      ? `Inspired by: ${item.cloneOf.originalName} (${item.cloneOf.originalHouse})`
      : `${item.brand} — Original Formulation`;
  }

  const descEl = document.getElementById('modalDescription');
  if (descEl) {
    descEl.textContent = item.description || `${item.name} is part of Otis Powell's personal collection. Hand-selected for distinctive projection and exceptional accords.`;
  }

  // Notes Triad
  const topEl = document.getElementById('modalTopNotes');
  const heartEl = document.getElementById('modalHeartNotes');
  const baseEl = document.getElementById('modalBaseNotes');

  if (topEl) {
    topEl.textContent = (item.notes?.top || []).map(n => n.name).join(', ') || 'Fresh Citrus';
  }
  if (heartEl) {
    heartEl.textContent = (item.notes?.heart || []).map(n => n.name).join(', ') || 'Florals, Warm Spices';
  }
  if (baseEl) {
    baseEl.textContent = (item.notes?.base || []).map(n => n.name).join(', ') || 'Woods, Vanilla, Amber';
  }

  // Spray Routine
  const blueprintTextEl = document.getElementById('modalSprayBlueprintText');
  if (blueprintTextEl) {
    const bp = item.sprayBlueprint ? item.sprayBlueprint.join(', ') : 'Behind Ears, Back of Neck';
    blueprintTextEl.textContent = `Recommended: ${item.recommendedSprays || '3-4 Sprays'} applied to ${bp}.`;
  }

  // Layering
  const layeringEl = document.getElementById('modalLayeringPartner');
  if (layeringEl) {
    layeringEl.textContent = item.layeringPartner
      ? `Layering Tip: ${item.layeringPartner}`
      : 'Layering Tip: Pairs great with Particle (Iso E Super) as a primer.';
  }

  modal.classList.add('open');
};

// ==========================================================================
// 8. ADD BOTTLE MODAL
// ==========================================================================
function initAddBottleModal() {
  const addBtn = document.getElementById('addFragranceBtn');
  const modal = document.getElementById('addBottleModal');
  const closeBtn = document.getElementById('addModalCloseBtn');
  const cancelBtn = document.getElementById('cancelAddBtn');
  const form = document.getElementById('addFragranceForm');

  if (addBtn && modal) {
    addBtn.addEventListener('click', () => modal.classList.add('open'));
  }

  const closeModal = () => {
    if (modal) modal.classList.remove('open');
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('newName')?.value.trim();
      const brand = document.getElementById('newBrand')?.value.trim();
      const cloneOf = document.getElementById('newCloneOf')?.value.trim();

      if (!name || !brand) return;

      const newId = `user-custom-${Date.now()}`;
      const newBottle = {
        id: newId,
        name,
        brand,
        perfumeParlourCode: brand === 'Perfume Parlour' ? 'Custom' : 'N/A',
        isClone: Boolean(cloneOf),
        cloneOf: cloneOf ? { originalName: cloneOf, originalHouse: 'Designer', similarityScore: 90 } : null,
        concentration: 'Eau de Parfum',
        bottleSize: 50,
        bottleType: 'Spray',
        remainingMl: 50,
        purchaseSource: 'Personal Collection',
        rating: 4.8,
        gender: 'Unisex',
        crg: 'Aromatic Fougere',
        wardrobeArchetype: 'Everyday Office',
        recommendedSprays: '3-4 Sprays',
        sprayBlueprint: ['Behind Ears', 'Back of Neck'],
        maturationWeeks: 4,
        macerationStatus: 'Matured',
        macerationTips: 'Store in a cool dark drawer.',
        layeringPartner: 'Pairs with Particle (Iso E-Super).',
        seasons: { spring: 30, summer: 30, autumn: 30, winter: 10 },
        timeOfDay: { day: 60, night: 40 },
        occasions: ['Gym', 'Office / Work', 'Walking', 'Casual'],
        longevity: 'Long Lasting (8h+)',
        sillage: 'Moderate',
        mainAccords: [
          { name: 'Woody', percentage: 90, color: '#854d0e' },
          { name: 'Aromatic', percentage: 80, color: '#10b981' }
        ],
        notes: {
          top: [{ name: 'Bergamot' }],
          heart: [{ name: 'Lavender' }],
          base: [{ name: 'Cedarwood' }, { name: 'Amber' }]
        },
        description: `${name} added to collection.`,
        image: 'assets/bottles/studio/molecule_01.jpg',
        batchYear: 2026
      };

      collection.unshift(newBottle);
      saveCollection();

      const page = document.body.dataset.page;
      if (page === 'collection' || page === 'vault') {
        renderCollectionGrid();
      }

      form.reset();
      closeModal();
    });
  }
}
