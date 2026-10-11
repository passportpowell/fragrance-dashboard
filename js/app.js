/**
 * ==========================================================================
 * L'ATELIER OLFACTIF — MULTI-PAGE APPLICATION ENGINE
 * High-End Luxury Editorial Website Architecture
 * Serving:
 *   1. The Salon (index.html) - Daily Curator Selection & Architectural Entryway
 *   2. The Flacon Vault (vault.html) - Multi-Dimensional Filter Suite & Catalog
 *   3. Olfactory Scentscapes (scentscapes.html) - 5 Atmospheric Lifestyle Realms
 *   4. The Layering Atelier (layering.html) - Duos & Interactive Pairing Studio
 *   5. The Scent Codex (codex.html) - Foundations, Voj Protocol & Maturation
 * ==========================================================================
 */

// Local Storage Key (v3 enforces pristine studio packshot synchronization)
const STORAGE_KEY = 'fragrance_atelier_collection_v3';

// Master Application State
let collection = [];
let currentSotdFragranceId = null;

// Vault Multi-Dimensional Filter State
let vaultFilters = {
  scenario: 'all',
  accord: 'all',
  season: 'all',
  house: 'all',
  concentration: 'all',
  search: '',
  sort: 'rating'
};

// 6 Curator Signature Duos (Duplex Magazine Spreads)
const CURATED_SIGNATURE_DUOS = [
  {
    title: "The Sicilian Emperor",
    vibe: "Opulent Golden Tobacco & Honey",
    baseId: "user-voux-elegante",
    companionId: "user-pp-particle-iso-e-super",
    score: 98,
    synergyType: "Molecular Fixation & Sillage Multiplication",
    narrative: "Xerjoff Naxos's decadent golden honey, Calabrian lemon, and blonde tobacco anchored by Iso E Super cedarwood radiance for 16-hour boardroom presence.",
    sequence: "Step 1: 2 sprays Particle (primer) on throat & collar. Step 2: 2 sprays Voux Elegante behind ears."
  },
  {
    title: "Black Tie Smoked Leather",
    vibe: "Dark Luxury Seduction",
    baseId: "user-tf-oud-wood-spray",
    companionId: "user-after-effect-fa-paris",
    score: 97,
    synergyType: "Smoky Cardamom Oud meets Boozy Tobacco Rum",
    narrative: "Initio Side Effect's intoxicating aged rum and cinnamon infused over Tom Ford Oud Wood's dry smoked rosewood and creamy sandalwood.",
    sequence: "Step 1: 3 sprays Oud Wood body mist on chest & shirt. Step 2: 2 sprays After Effect on pulse points."
  },
  {
    title: "Bourbon Orchard",
    vibe: "Autumn Aristocratic Gourmand",
    baseId: "user-pp-herb-garden-1598",
    companionId: "user-pp-intense-aroma-exploding",
    score: 96,
    synergyType: "Crisp Green Apple & Exploding Bourbon Vanilla",
    narrative: "Layton's crisp apple and lavender contrast with Spicebomb Extreme's black pepper, toasted cinnamon, and dark bourbon vanilla.",
    sequence: "Step 1: 2 sprays Herb Garden on neck. Step 2: 1-2 sprays Intense Aroma Exploding on coat or scarf."
  },
  {
    title: "Velvet Shadow",
    vibe: "Narcotic Nightlife & Cherry Liqueur",
    baseId: "user-pp-astray-fruit-1947",
    companionId: "user-after-effect-fa-paris",
    score: 97,
    synergyType: "Tart Griotte Cherry meets Dark Martinique Rum",
    narrative: "Lost Cherry's almond-cherry syrup folded directly into Side Effect's narcotic tobacco and rum. Hypnotic in winter dates.",
    sequence: "Step 1: 2 sprays After Effect behind ears. Step 2: 1 spray Astray Fruit on chest & collarbones."
  },
  {
    title: "The Oceanic Abyss",
    vibe: "High-Heat Aquatic Mastery",
    baseId: "user-pp-sweet-water-1262",
    companionId: "user-pp-intenso-water-1329",
    score: 95,
    synergyType: "Deep Marine Mineral & Incense Interplay",
    narrative: "ADG Profondo's sparkling green mandarin and sea notes anchored by ADG Profumo's smoky incense, rosemary, and patchouli.",
    sequence: "Step 1: 2 sprays Sweet Water on base of neck. Step 2: 2 sprays Intenso Water on shoulders."
  },
  {
    title: "The Midnight Barista",
    vibe: "Sensual Winter Decadence",
    baseId: "user-pp-noire-illusion-1746",
    companionId: "user-tf-noir-extreme",
    score: 95,
    synergyType: "Pistachio Kulfi & Roasted Espresso Gourmand",
    narrative: "Tom Ford's Indian kulfi dessert and saffron creaminess infused with Kilian Black Phantom's bitter dark chocolate, rum, and roasted coffee.",
    sequence: "Step 1: 2 sprays Noir Extreme. Step 2: 1 spray Noire Illusion on collar."
  }
];

// Document Initialization
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  loadCollection();
  initMobileDrawer();
  initDetailModal();
  initAddFlaconModal();

  const page = document.body.dataset.page;

  if (page === 'salon') {
    initSotdSpread();
  } else if (page === 'vault') {
    initVaultPage();
  } else if (page === 'layering') {
    initLayeringPage();
  }
});

// ==========================================================================
// 1. THEME ENGINE: DEFAULT LIGHT MODE & DARK MODE TOGGLE
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
// 3. DATA SYNCHRONIZATION & STORAGE
// ==========================================================================
function loadCollection() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const existingIds = new Set(parsed.map(item => item.id));
      const missingSeed = FRAGRANCE_DATABASE.filter(seed => !existingIds.has(seed.id));

      // Synchronize pristine studio bottle images and note profiles from seed
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
// 4. THE SALON: SOTD CURATOR SPREAD (INDEX.HTML)
// ==========================================================================
function initSotdSpread(forceReroll = false) {
  if (!collection || collection.length === 0) return;

  const month = new Date().getMonth();
  let currentSeason = 'spring';
  if (month >= 2 && month <= 4) currentSeason = 'spring';
  else if (month >= 5 && month <= 7) currentSeason = 'summer';
  else if (month >= 8 && month <= 10) currentSeason = 'autumn';
  else currentSeason = 'winter';

  const hour = new Date().getHours();
  const timeKey = (hour >= 18 || hour < 6) ? 'night' : 'day';

  // Atmospheric ranking algorithm
  const candidates = collection.map(item => {
    const seasonScore = item.seasons?.[currentSeason] || 15;
    const timeScore = item.timeOfDay?.[timeKey] || 30;
    const ratingBonus = (item.rating || 4.5) * 10;
    return { item, totalScore: seasonScore + timeScore + ratingBonus };
  }).sort((a, b) => b.totalScore - a.totalScore);

  let selected;
  if (forceReroll && candidates.length > 1) {
    const topCandidates = candidates.slice(0, 5);
    const randIndex = Math.floor(Math.random() * topCandidates.length);
    selected = topCandidates[randIndex].item;
  } else {
    selected = candidates[0].item;
  }

  currentSotdFragranceId = selected.id;

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
      ? `Inspired by ${selected.cloneOf.originalName} // ${selected.cloneOf.originalHouse}`
      : `${selected.brand} // Signature Formulation`;
  }
  if (sotdSubtitle) {
    sotdSubtitle.textContent = selected.description || `${selected.crg} formulation. Ideal for today's atmospheric temperature and versatile lifestyle agenda.`;
  }

  if (sotdTopNotes) {
    sotdTopNotes.textContent = (selected.notes?.top || []).map(n => n.name).join(', ') || 'Bergamot, Crisp Citrus';
  }
  if (sotdHeartNotes) {
    sotdHeartNotes.textContent = (selected.notes?.heart || []).map(n => n.name).join(', ') || 'Lavender, Spiced Florals';
  }
  if (sotdBaseNotes) {
    sotdBaseNotes.textContent = (selected.notes?.base || []).map(n => n.name).join(', ') || 'Cedarwood, Amber, Bourbon Vanilla';
  }

  if (sotdBlueprint) {
    const bpText = selected.sprayBlueprint ? selected.sprayBlueprint.join(', ') : 'Behind Ears, Back of Neck';
    sotdBlueprint.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
        <circle cx="12" cy="12" r="9"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <span>Voj Ritual: ${selected.recommendedSprays || '3-4 Sprays'} applied across ${bpText}.</span>
    `;
  }

  const inspectBtn = document.getElementById('sotdInspectBtn');
  if (inspectBtn) inspectBtn.onclick = () => openDetailModal(currentSotdFragranceId);

  const refreshBtn = document.getElementById('sotdRefreshBtn');
  if (refreshBtn) refreshBtn.onclick = () => initSotdSpread(true);
}

// ==========================================================================
// 5. THE FLACON VAULT: MULTI-DIMENSIONAL FILTER SUITE (VAULT.HTML)
// ==========================================================================
function initVaultPage() {
  // Read initial query parameter (e.g. ?scenario=Running or ?scenario=Walking)
  const params = new URLSearchParams(window.location.search);
  const scenarioParam = params.get('scenario');
  if (scenarioParam) {
    vaultFilters.scenario = scenarioParam;
  }

  // Bind all filter pill buttons
  const filterRows = document.querySelectorAll('.filter-pills-wrap');
  filterRows.forEach(row => {
    const group = row.dataset.group;
    const buttons = row.querySelectorAll('.filter-chip-btn');

    buttons.forEach(btn => {
      // Sync active state from URL params
      if (group === 'scenario' && scenarioParam && btn.dataset.filter === scenarioParam) {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      }

      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        vaultFilters[group] = btn.dataset.filter;
        renderVaultGrid();
      });
    });
  });

  // Search input
  const searchInput = document.getElementById('vaultSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      vaultFilters.search = e.target.value.trim().toLowerCase();
      renderVaultGrid();
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.activeElement === searchInput) {
        searchInput.value = '';
        vaultFilters.search = '';
        renderVaultGrid();
      }
    });
  }

  // Sorter
  const sortSelect = document.getElementById('vaultSortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      vaultFilters.sort = e.target.value;
      renderVaultGrid();
    });
  }

  renderVaultGrid();
}

function renderVaultGrid() {
  const grid = document.getElementById('boutiqueProductGrid');
  const countBadge = document.getElementById('vaultFilteredCount');
  const chipsContainer = document.getElementById('activeFilterChipsContainer');
  if (!grid) return;

  // Filter items
  const filtered = collection.filter(item => {
    // 1. Search Query
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

    // 2. Scenario
    if (vaultFilters.scenario !== 'all') {
      const hasOccasion = (item.occasions || []).includes(vaultFilters.scenario);
      if (!hasOccasion) return false;
    }

    // 3. Olfactory Family / Accord
    if (vaultFilters.accord !== 'all') {
      const hasAccord = (item.mainAccords || []).some(a => a.name.toLowerCase().includes(vaultFilters.accord.toLowerCase())) ||
                        (item.crg || '').toLowerCase().includes(vaultFilters.accord.toLowerCase());
      if (!hasAccord) return false;
    }

    // 4. Seasonality
    if (vaultFilters.season !== 'all') {
      const score = item.seasons?.[vaultFilters.season] || 0;
      if (score < 25) return false;
    }

    // 5. Maison / House
    if (vaultFilters.house !== 'all') {
      if (item.brand !== vaultFilters.house) return false;
    }

    // 6. Concentration
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

  // Render Active Filter Chips
  if (chipsContainer) {
    chipsContainer.innerHTML = '';
    const activeEntries = Object.entries(vaultFilters).filter(([k, v]) => v && v !== 'all' && k !== 'sort');
    
    activeEntries.forEach(([key, val]) => {
      const chip = document.createElement('span');
      chip.className = 'active-filter-badge';
      chip.innerHTML = `
        <span>${val}</span>
        <span class="active-filter-remove" data-key="${key}">&times;</span>
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
      clearAllBtn.addEventListener('click', resetAllVaultFilters);
      chipsContainer.appendChild(clearAllBtn);
    }
  }

  // Render Cards
  grid.innerHTML = '';

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 4.5rem 2rem; text-align: center; background: var(--canvas-card); border: 1px dashed var(--canvas-border); border-radius: var(--radius-xl);">
        <h3 style="font-family: var(--font-display); font-size: 1.35rem; color: var(--gold-primary); margin-bottom: 0.5rem;">No Flacons Match This Configuration</h3>
        <p style="color: var(--text-secondary); font-size: 0.95rem; max-width: 48ch; margin: 0 auto 1.5rem;">Adjust your filter criteria or clear keywords to view your archived collection.</p>
        <button onclick="resetAllVaultFilters()" class="btn-luxury btn-luxury-primary" style="margin: 0 auto;">Reset All Filters</button>
      </div>
    `;
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement('article');
    card.className = 'boutique-product-card';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Examine dossier for ${item.name}`);

    const bottleSrc = item.image || item.userPhoto || 'assets/bottles/default-bottle.svg';

    const brandLine = item.brand === 'Perfume Parlour' && item.perfumeParlourCode
      ? `Perfume Parlour // Ref. ${item.perfumeParlourCode}`
      : `${item.brand} // Maison Privée`;

    const lineageText = item.isClone && item.cloneOf
      ? `Lineage: Inspired by ${item.cloneOf.originalName}`
      : `Lineage: Master Signature Formulation`;

    const topNoteNames = (item.notes?.top || []).slice(0, 2).map(n => n.name);
    const heartNoteNames = (item.notes?.heart || []).slice(0, 2).map(n => n.name);
    const notesSummary = [...topNoteNames, ...heartNoteNames].join(' • ') || 'Aromatic Woods & Resins';

    card.innerHTML = `
      <div class="boutique-pedestal-stage">
        <img class="boutique-bottle-img" src="${bottleSrc}" alt="${item.name}" loading="lazy">
      </div>
      <div class="boutique-card-info">
        <span class="boutique-brand-name">${brandLine}</span>
        <h3 class="boutique-fragrance-name">${item.name}</h3>
        <span class="boutique-lineage-note">${lineageText}</span>
        <span class="boutique-notes-summary">${notesSummary}</span>
        <div class="boutique-card-footer">
          <span class="boutique-concentration-badge">${item.concentration}</span>
          <span style="font-family: var(--font-mono); font-size: 10px; color: var(--gold-primary); text-transform: uppercase; font-weight: 600;">Dossier &rarr;</span>
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

function resetSpecificFilter(key) {
  vaultFilters[key] = key === 'search' ? '' : 'all';
  
  if (key === 'search') {
    const input = document.getElementById('vaultSearchInput');
    if (input) input.value = '';
  } else {
    const row = document.querySelector(`.filter-pills-wrap[data-group="${key}"]`);
    if (row) {
      row.querySelectorAll('.filter-chip-btn').forEach(b => b.classList.remove('active'));
      const allBtn = row.querySelector('[data-filter="all"]');
      if (allBtn) allBtn.classList.add('active');
    }
  }

  renderVaultGrid();
}

window.resetAllVaultFilters = function() {
  vaultFilters = {
    scenario: 'all',
    accord: 'all',
    season: 'all',
    house: 'all',
    concentration: 'all',
    search: '',
    sort: 'rating'
  };

  const input = document.getElementById('vaultSearchInput');
  if (input) input.value = '';

  document.querySelectorAll('.filter-pills-wrap').forEach(row => {
    row.querySelectorAll('.filter-chip-btn').forEach(b => b.classList.remove('active'));
    const allBtn = row.querySelector('[data-filter="all"]');
    if (allBtn) allBtn.classList.add('active');
  });

  renderVaultGrid();
};

// ==========================================================================
// 6. THE LAYERING ATELIER: DUOS & PAIRING STUDIO (LAYERING.HTML)
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

  // Populate base select
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
          <div class="duplex-flacon" onclick="openDetailModal('${base.id}')" style="cursor: pointer;" title="Examine ${base.name}">
            <img src="${baseSrc}" alt="${base.name}">
            <span>${base.name}</span>
          </div>
          <span class="duplex-ampersand">&amp;</span>
          <div class="duplex-flacon" onclick="openDetailModal('${comp.id}')" style="cursor: pointer;" title="Examine ${comp.name}">
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

  // Render Base Preview
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

  // Calculate and Rank Candidates
  const candidates = collection.filter(c => c.id !== baseItem.id);
  const countBadge = document.getElementById('companionsCountBadge');
  if (countBadge) countBadge.textContent = `${candidates.length} Candidates Ranked`;

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
        <span style="font-family: var(--font-mono); font-size: 9px; text-transform: uppercase; color: var(--text-tertiary);">Synergy</span>
      </div>
    `;

    container.appendChild(card);
  });
}

function calculatePairingSynergy(base, companion) {
  let score = 70;
  let synergyType = "Harmonious Complement";
  let rationale = "Balanced interplay of complementary notes and accords.";
  let sequence = `Step 1: 2 sprays ${base.name} on base of neck. Step 2: 1-2 sprays ${companion.name} on collarbones.`;

  const bId = base.id;
  const cId = companion.id;

  // Molecular Primers (Iso E Super & Ambroxan)
  if (cId === 'user-pp-particle-iso-e-super' || cId === 'user-pp-second-particle-1980') {
    score = 98;
    synergyType = cId === 'user-pp-particle-iso-e-super' ? "Iso E Super Sillage Amplifier" : "Ambroxan Radiant Booster";
    rationale = `Pure ${cId === 'user-pp-particle-iso-e-super' ? 'Iso E Super' : 'Ambroxan'} binds to skin lipids and doubles the diffusive projection radius of ${base.name} without altering its notes.`;
    sequence = `Step 1: Apply 2 sprays ${companion.name} on pulse points as primer. Step 2: Mist 2 sprays ${base.name} over collar.`;
  } else if (bId === 'user-pp-particle-iso-e-super' || bId === 'user-pp-second-particle-1980') {
    score = 96;
    synergyType = "Molecular Fixative Primer";
    rationale = `Locks ${companion.name} to the skin with warm cedarwood/ambergris radiance, preventing premature evaporation.`;
    sequence = `Step 1: Apply 2 sprays ${base.name} as primer. Step 2: Mist 2 sprays ${companion.name} on top.`;
  }
  // Citrus Particle
  else if (cId === 'user-pp-citrus-particle-0616') {
    score = 97;
    synergyType = "Photorealistic Citrus Contrast";
    rationale = `Sparkling mandarin orange cuts straight through the warm density of ${base.name}, delivering an electrifying top-note explosion before resolving into rich warmth.`;
    sequence = `Step 1: Apply 2 sprays ${base.name} on neck. Step 2: Apply 2 sprays Citrus Particle on shirt & wrists.`;
  }
  // Boozy Rum & Cherry (After Effect + Astray Fruit)
  else if ((bId === 'user-after-effect-fa-paris' && cId === 'user-pp-astray-fruit-1947') ||
           (bId === 'user-pp-astray-fruit-1947' && cId === 'user-after-effect-fa-paris')) {
    score = 97;
    synergyType = "Decadent Boozy Cherry & Rum Liqueur";
    rationale = `Initio Side Effect's boozy Martinique rum, cinnamon, and tobacco harmonize luxuriously with Lost Cherry's tart griotte syrup and bitter almond. Pure intoxicating night-time seduction.`;
    sequence = `Step 1: 2 sprays After Effect behind ears. Step 2: 1 spray Astray Fruit on chest & collar.`;
  }
  // Layton (Herb Garden) + Spiced Tobacco
  else if (bId === 'user-pp-herb-garden-1598' && (cId === 'user-pp-leaf-flavour-0401' || cId === 'user-voux-elegante')) {
    score = 95;
    synergyType = "Crisp Apple & Blonde Tobacco Fusion";
    rationale = `Layton's crisp green apple and bourbon vanilla creates an aristocratic contrast with golden honey and warm pipe tobacco.`;
    sequence = `Step 1: 2 sprays ${base.name}. Step 2: 1 spray ${companion.name} on jacket/wrists.`;
  }
  // Marine Aquatic (Sweet Water + Intenso Water)
  else if ((bId === 'user-pp-intenso-water-1329' && cId === 'user-pp-sweet-water-1262') ||
           (bId === 'user-pp-sweet-water-1262' && cId === 'user-pp-intenso-water-1329')) {
    score = 95;
    synergyType = "Deep Oceanic & Incense Mineral Interplay";
    rationale = `ADG Profondo's bright sea notes merge with ADG Profumo's smoky incense and patchouli base for a 3D marine signature.`;
    sequence = `Step 1: 2 sprays Sweet Water on base of neck. Step 2: 2 sprays Intenso Water on shoulders.`;
  }
  // General Shared Accords
  else {
    const baseAccords = new Set((base.mainAccords || []).map(a => a.name.toLowerCase()));
    const compAccords = new Set((companion.mainAccords || []).map(a => a.name.toLowerCase()));
    let sharedCount = 0;
    baseAccords.forEach(a => { if (compAccords.has(a)) sharedCount++; });

    if (sharedCount >= 2) {
      score += 15;
      synergyType = "Harmonious Accord Alignment";
      rationale = `Both compositions share prominent aromatic bridges, creating a seamless, natural transition throughout drydown.`;
    } else {
      score += 5;
    }
  }

  score = Math.min(99, Math.max(50, score));
  return { score, synergyType, rationale, sequence };
}

// ==========================================================================
// 7. DEEP INSPECTION DOSSIER (SLIDE-OVER / MODAL)
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
    concentrationEl.textContent = `${item.concentration} // BATCH ${item.batchYear || '2026'}`;
  }

  const cloneOriginEl = document.getElementById('modalCloneOrigin');
  if (cloneOriginEl) {
    cloneOriginEl.textContent = item.isClone && item.cloneOf
      ? `Inspired by ${item.cloneOf.originalName} (${item.cloneOf.originalHouse})`
      : `${item.brand} // Original Formulation`;
  }

  const descEl = document.getElementById('modalDescription');
  if (descEl) {
    descEl.textContent = item.description || `${item.name} is preserved in Otis Powell's private olfactory archive. Hand-selected for distinctive projection and exceptional accords.`;
  }

  // Notes Triad
  const topEl = document.getElementById('modalTopNotes');
  const heartEl = document.getElementById('modalHeartNotes');
  const baseEl = document.getElementById('modalBaseNotes');

  if (topEl) {
    topEl.textContent = (item.notes?.top || []).map(n => n.name).join(', ') || 'Bergamot, Solar Citrus';
  }
  if (heartEl) {
    heartEl.textContent = (item.notes?.heart || []).map(n => n.name).join(', ') || 'Warm Florals, Spices';
  }
  if (baseEl) {
    baseEl.textContent = (item.notes?.base || []).map(n => n.name).join(', ') || 'Cedarwood, Amber, Vanilla';
  }

  // Voj Blueprint
  const blueprintTextEl = document.getElementById('modalSprayBlueprintText');
  if (blueprintTextEl) {
    const bp = item.sprayBlueprint ? item.sprayBlueprint.join(', ') : 'Behind Ears, Back of Neck';
    blueprintTextEl.textContent = `Voj Ritual: ${item.recommendedSprays || '3-4 Sprays'} applied across ${bp}.`;
  }

  // Layering
  const layeringEl = document.getElementById('modalLayeringPartner');
  if (layeringEl) {
    layeringEl.textContent = item.layeringPartner
      ? `Synergy: ${item.layeringPartner}`
      : 'Synergy: Pairs effortlessly with Molecule 01 / Iso E Super molecular primer.';
  }

  modal.classList.add('open');
};

// ==========================================================================
// 8. INDEX NEW FLACON MODAL
// ==========================================================================
function initAddFlaconModal() {
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
        cloneOf: cloneOf ? { originalName: cloneOf, originalHouse: 'Designer/Niche', similarityScore: 90 } : null,
        concentration: 'Eau de Parfum',
        bottleSize: 50,
        bottleType: 'Spray',
        remainingMl: 50,
        purchaseSource: 'Personal Vault',
        rating: 4.8,
        gender: 'Unisex',
        crg: 'Aromatic Fougere',
        wardrobeArchetype: 'Everyday Office / Versatile Signature',
        recommendedSprays: '3-4 Sprays',
        sprayBlueprint: ['Behind Ears', 'Back of Neck'],
        maturationWeeks: 4,
        macerationStatus: 'Matured',
        macerationTips: 'Store in cool dark cupboard.',
        layeringPartner: 'Pairs with Particle (ISO E-Super).',
        seasons: { spring: 30, summer: 30, autumn: 30, winter: 10 },
        timeOfDay: { day: 60, night: 40 },
        occasions: ['Office / Work', 'Walking', 'Casual'],
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
        description: `${name} archived in private collection.`,
        image: 'assets/bottles/studio/molecule_01.jpg',
        batchYear: 2026
      };

      collection.unshift(newBottle);
      saveCollection();

      // If on vault page, re-render
      if (document.body.dataset.page === 'vault') {
        renderVaultGrid();
      }

      form.reset();
      closeModal();
    });
  }
}
