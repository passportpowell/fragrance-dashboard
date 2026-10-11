/**
   ==========================================================================
   L'ATELIER OLFACTIF — CORE MAISON APPLICATION ENGINE
   Architected for High-End Editorial Luxury, Double-Bezel Hardware Components,
   Default Light Mode with Dark Mode Toggle, Zero-Emoji Visuals,
   Studio Bottle Imagery, Multi-Factor Scenario Filtering (Running & Walking),
   Curator SOTD Assistant, and Interactive Layering Atelier.
   ==========================================================================
*/

// Local Storage Key (v3 to enforce clean studio imagery update)
const STORAGE_KEY = 'fragrance_atelier_collection_v3';

// Application State
let collection = [];
let activeFilters = {
  search: '',
  sort: 'rating',
  occasions: new Set(),
  seasons: new Set(),
  timesOfDay: new Set(),
  houses: new Set(),
  archetypes: new Set()
};

let currentModalFragranceId = null;

// Clean Vector Icons (Zero Emojis Directive)
const ICONS = {
  star: `<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  spray: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
  leaf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`,
  droplet: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>`,
  sparkle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3v18M3 12h18M6.5 6.5l11 11M6.5 17.5l11-11"/></svg>`,
  layer: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  inspect: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  loadCollection();
  initScenarioRibbon();
  setupEventListeners();
  updateDashboard();
  initSotdRecommendation();
  initLayeringAtelier();
});

// ==========================================================================
// THEME MANAGEMENT (DEFAULT: LIGHT MODE, TOGGLE: DARK MODE)
// ==========================================================================
function initTheme() {
  const savedTheme = localStorage.getItem('atelier_theme') || 'light';
  applyTheme(savedTheme);

  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('atelier_theme', theme);

  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeToggleBtn) {
    const isDark = theme === 'dark';
    themeToggleBtn.setAttribute('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    themeToggleBtn.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    themeToggleBtn.innerHTML = isDark
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  }
}

// ==========================================================================
// DATA LOADING & PERSISTENCE
// ==========================================================================
function loadCollection() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const existingIds = new Set(parsed.map(item => item.id));
      const missingSeedItems = FRAGRANCE_DATABASE.filter(seed => !existingIds.has(seed.id));

      // Always synchronize studio image paths from seed
      collection = parsed.map(item => {
        const seedMatch = FRAGRANCE_DATABASE.find(s => s.id === item.id);
        if (seedMatch) {
          return {
            ...item,
            image: seedMatch.image,
            userPhoto: item.userUploadedCustomPhoto ? item.userPhoto : seedMatch.image,
            occasions: seedMatch.occasions || item.occasions
          };
        }
        return item;
      });

      if (missingSeedItems.length > 0) {
        collection = [...collection, ...missingSeedItems];
        saveCollection();
      }
    } else {
      collection = [...FRAGRANCE_DATABASE];
      saveCollection();
    }
  } catch (err) {
    console.error('Could not parse localStorage, falling back to seed database', err);
    collection = [...FRAGRANCE_DATABASE];
  }
}

function saveCollection() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collection));
  } catch (err) {
    console.warn('Storage quota reached or localStorage disabled', err);
  }
}

// ==========================================================================
// SCENARIO RIBBON (HORIZONTAL LIFESTYLE OCCASIONS BAR)
// ==========================================================================
function initScenarioRibbon() {
  const ribbon = document.getElementById('scenarioRibbon');
  if (!ribbon) return;

  const buttons = ribbon.querySelectorAll('.scenario-pill');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const scenario = btn.dataset.scenario;
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (scenario === 'all') {
        activeFilters.occasions.clear();
      } else {
        activeFilters.occasions.clear();
        activeFilters.occasions.add(scenario);
      }
      updateDashboard();
    });
  });
}

// ==========================================================================
// EVENT LISTENERS & CONCIERGE CONTROLS
// ==========================================================================
function setupEventListeners() {
  // Concierge Search
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      activeFilters.search = e.target.value.trim().toLowerCase();
      updateDashboard();
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.activeElement === searchInput) {
        searchInput.value = '';
        activeFilters.search = '';
        updateDashboard();
      }
    });
  }

  // Sorter
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      activeFilters.sort = e.target.value;
      updateDashboard();
    });
  }

  // Clear Filters
  const clearFiltersBtn = document.getElementById('clearFiltersBtn');
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', resetAllFilters);
  }

  // Detail Modal Closers
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const detailModal = document.getElementById('detailModal');
  if (modalCloseBtn && detailModal) {
    modalCloseBtn.addEventListener('click', () => detailModal.classList.remove('open'));
    detailModal.addEventListener('click', (e) => {
      if (e.target === detailModal) detailModal.classList.remove('open');
    });
  }

  // SOTD Inspect Button
  const sotdInspectBtn = document.getElementById('sotdInspectBtn');
  if (sotdInspectBtn) {
    sotdInspectBtn.addEventListener('click', () => {
      if (currentSotdFragranceId) {
        openDetailModal(currentSotdFragranceId);
      }
    });
  }

  // SOTD Recalibrate Button
  const sotdRefreshBtn = document.getElementById('sotdRefreshBtn');
  if (sotdRefreshBtn) {
    sotdRefreshBtn.addEventListener('click', () => {
      initSotdRecommendation(true);
    });
  }

  // Pro Tips / Scent Codex Modal
  const proTipsBtn = document.getElementById('proTipsBtn');
  const proTipsModal = document.getElementById('proTipsModal');
  const proTipsCloseBtn = document.getElementById('proTipsCloseBtn');
  if (proTipsBtn && proTipsModal) {
    proTipsBtn.addEventListener('click', () => proTipsModal.classList.add('open'));
  }
  if (proTipsCloseBtn && proTipsModal) {
    proTipsCloseBtn.addEventListener('click', () => proTipsModal.classList.remove('open'));
  }
  if (proTipsModal) {
    proTipsModal.addEventListener('click', (e) => {
      if (e.target === proTipsModal) proTipsModal.classList.remove('open');
    });
  }

  // Scent Codex Tab Switching
  document.querySelectorAll('.tips-tabs-nav .tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tips-tabs-nav .tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const targetPane = document.getElementById(btn.dataset.tab);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // Layering Atelier Mode Switcher
  const modeUserPickBtn = document.getElementById('modeUserPickBtn');
  const modeAutoCuratedBtn = document.getElementById('modeAutoCuratedBtn');
  const layeringStudioMode = document.getElementById('layeringStudioMode');
  const layeringAutoMode = document.getElementById('layeringAutoMode');

  if (modeUserPickBtn && modeAutoCuratedBtn) {
    modeUserPickBtn.addEventListener('click', () => {
      modeUserPickBtn.classList.add('active');
      modeAutoCuratedBtn.classList.remove('active');
      layeringStudioMode.classList.add('active');
      layeringAutoMode.classList.remove('active');
    });

    modeAutoCuratedBtn.addEventListener('click', () => {
      modeAutoCuratedBtn.classList.add('active');
      modeUserPickBtn.classList.remove('active');
      layeringAutoMode.classList.add('active');
      layeringStudioMode.classList.remove('active');
    });
  }

  // Base Flacon Select change
  const baseFragranceSelect = document.getElementById('baseFragranceSelect');
  if (baseFragranceSelect) {
    baseFragranceSelect.addEventListener('change', (e) => {
      onBaseFlaconSelected(e.target.value);
    });
  }

  // Add Bottle Modal
  const addFragranceBtn = document.getElementById('addFragranceBtn');
  const addBottleModal = document.getElementById('addBottleModal');
  const addModalCloseBtn = document.getElementById('addModalCloseBtn');
  const cancelAddBtn = document.getElementById('cancelAddBtn');
  if (addFragranceBtn && addBottleModal) {
    addFragranceBtn.addEventListener('click', () => addBottleModal.classList.add('open'));
  }
  if (addModalCloseBtn && addBottleModal) {
    addModalCloseBtn.addEventListener('click', () => addBottleModal.classList.remove('open'));
  }
  if (cancelAddBtn && addBottleModal) {
    cancelAddBtn.addEventListener('click', () => addBottleModal.classList.remove('open'));
  }
  if (addBottleModal) {
    addBottleModal.addEventListener('click', (e) => {
      if (e.target === addBottleModal) addBottleModal.classList.remove('open');
    });
  }

  // Add Form Submit
  const addForm = document.getElementById('addFragranceForm');
  if (addForm) {
    addForm.addEventListener('submit', handleAddFragrance);
  }

  // Export JSON
  const exportBtn = document.getElementById('exportJsonBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', exportCollectionJson);
  }

  // Import JSON
  const importInput = document.getElementById('importJsonInput');
  if (importInput) {
    importInput.addEventListener('change', importCollectionJson);
  }
}

// Reset All Filters
function resetAllFilters() {
  activeFilters.search = '';
  activeFilters.occasions.clear();
  activeFilters.seasons.clear();
  activeFilters.timesOfDay.clear();
  activeFilters.houses.clear();
  activeFilters.archetypes.clear();

  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';

  const ribbon = document.getElementById('scenarioRibbon');
  if (ribbon) {
    ribbon.querySelectorAll('.scenario-pill').forEach(b => b.classList.remove('active'));
    const allBtn = ribbon.querySelector('[data-scenario="all"]');
    if (allBtn) allBtn.classList.add('active');
  }

  updateDashboard();
}

// Update Active Filters Display Bar
function updateActiveFiltersBar() {
  const summaryEl = document.getElementById('filterSummaryText');
  if (!summaryEl) return;

  const totalActive = activeFilters.occasions.size +
                      activeFilters.seasons.size +
                      activeFilters.timesOfDay.size +
                      activeFilters.houses.size +
                      activeFilters.archetypes.size +
                      (activeFilters.search ? 1 : 0);

  if (totalActive === 0) {
    summaryEl.textContent = `Displaying full collection (${collection.length} flacons)`;
  } else {
    const parts = [];
    if (activeFilters.search) parts.push(`"${activeFilters.search}"`);
    if (activeFilters.occasions.size) parts.push(`${Array.from(activeFilters.occasions).join(', ')}`);
    summaryEl.textContent = `Filtered by: ${parts.join(', ')}`;
  }
}

// Filter Engine
function getFilteredFragrances() {
  return collection.filter(item => {
    // Search query
    if (activeFilters.search) {
      const q = activeFilters.search;
      const matchName = item.name.toLowerCase().includes(q);
      const matchBrand = item.brand.toLowerCase().includes(q);
      const matchClone = item.cloneOf && (
        item.cloneOf.originalName.toLowerCase().includes(q) ||
        item.cloneOf.originalHouse.toLowerCase().includes(q)
      );
      const matchCode = item.perfumeParlourCode && item.perfumeParlourCode.toLowerCase().includes(q);
      const matchNotes = [
        ...(item.notes?.top || []),
        ...(item.notes?.heart || []),
        ...(item.notes?.base || [])
      ].some(n => n.name.toLowerCase().includes(q));
      const matchAccords = (item.mainAccords || []).some(a => a.name.toLowerCase().includes(q));

      if (!matchName && !matchBrand && !matchClone && !matchCode && !matchNotes && !matchAccords) {
        return false;
      }
    }

    // Occasions (Running, Walking, Gym, Dates, etc.)
    if (activeFilters.occasions.size > 0) {
      const hasOccasion = Array.from(activeFilters.occasions).some(occ => 
        item.occasions && item.occasions.includes(occ)
      );
      if (!hasOccasion) return false;
    }

    return true;
  }).sort((a, b) => {
    switch (activeFilters.sort) {
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'brand':
        return a.brand.localeCompare(b.brand);
      case 'volume':
        return (b.remainingMl / b.bottleSize) - (a.remainingMl / a.bottleSize);
      case 'clonesFirst':
        if (a.isClone && !b.isClone) return -1;
        if (!a.isClone && b.isClone) return 1;
        return b.rating - a.rating;
      default:
        return 0;
    }
  });
}

// Render Flacon Boutique Pedestals Grid
function renderFragranceGrid(items) {
  const grid = document.getElementById('fragranceGrid');
  const countEl = document.getElementById('resultsCount');
  if (countEl) countEl.textContent = items.length;
  if (!grid) return;

  grid.innerHTML = '';

  if (items.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 4rem 2rem; text-align: center; background: var(--surface-card); border: 1px dashed var(--border-hairline); border-radius: var(--radius-shell-lg);">
        <h3 style="font-family: var(--font-display); font-size: 1.25rem; color: var(--gold-primary); margin-bottom: 0.5rem;">No Flacons Match This Criteria</h3>
        <p style="color: var(--text-secondary); font-size: 0.88rem; max-width: 45ch; margin: 0 auto 1.5rem;">Adjust your scenario filters or clear keywords to view your archived collection.</p>
        <button onclick="resetAllFilters()" class="btn-island btn-island-primary">Reset Filters</button>
      </div>
    `;
    return;
  }

  items.forEach(item => {
    const cardShell = document.createElement('article');
    cardShell.className = 'bezel-shell fragrance-card-shell';

    // Prioritize studio imagery
    const bottleSrc = item.image || item.userPhoto || 'assets/bottles/default-bottle.svg';

    // Top 3 Accords preview
    const topAccordsHtml = (item.mainAccords || []).slice(0, 3).map(acc => `
      <div class="accord-micro-row">
        <span class="accord-label">${acc.name}</span>
        <div class="accord-bar-track">
          <div class="accord-bar-progress" style="width: ${acc.percentage}%; background-color: ${acc.color || 'var(--gold-primary)'};"></div>
        </div>
      </div>
    `).join('');

    // Occasion chips (top 3)
    const occasionsHtml = (item.occasions || []).slice(0, 3).map(occ => `
      <span class="micro-chip">${occ}</span>
    `).join('');

    // Clone pill
    const cloneHtml = item.isClone && item.cloneOf ? `
      <div class="card-clone-pill">
        <span>Clone of <strong>${item.cloneOf.originalName}</strong></span>
        <span class="clone-match-rate">${item.cloneOf.similarityScore}%</span>
      </div>
    ` : `
      <div class="card-clone-pill">
        <span>Original Formulation // <strong>${item.brand}</strong></span>
      </div>
    `;

    // Remaining volume percentage
    const volumePercent = Math.round((item.remainingMl / item.bottleSize) * 100);

    cardShell.innerHTML = `
      <div class="bezel-core fragrance-card-core">
        
        <!-- Flacon Pedestal Stage -->
        <div class="card-pedestal-stage">
          <div class="card-top-badges">
            <span class="badge-code">${item.brand === 'Perfume Parlour' ? `PP #${item.perfumeParlourCode || 'Clone'}` : item.brand}</span>
            <span class="badge-rating-pill">${ICONS.star} ${item.rating.toFixed(1)}</span>
          </div>

          <img class="card-bottle-img" src="${bottleSrc}" alt="${item.name}" loading="lazy">
          
          <span class="card-volume-guage">${item.remainingMl} / ${item.bottleSize} ml (${volumePercent}%)</span>
        </div>

        <!-- Card Body -->
        <div class="card-details-stack">
          <span class="card-concentration-tag">${item.concentration}</span>
          <div class="card-title-row">
            <h3 class="card-fragrance-name">${item.name}</h3>
          </div>

          ${cloneHtml}

          <!-- Micro Accord Progress Bars -->
          <div class="card-accords-box">
            ${topAccordsHtml}
          </div>

          <!-- Occasion Tags -->
          <div class="card-occasions-wrap">
            ${occasionsHtml}
            ${(item.occasions || []).length > 3 ? `<span class="micro-chip">+${item.occasions.length - 3}</span>` : ''}
          </div>
        </div>

        <!-- Card Meta Footer -->
        <div class="card-meta-footer">
          <span>${item.wardrobeArchetype || item.crg}</span>
          <div class="seasonal-dots-indicator" title="Spring / Summer / Autumn / Winter affinity">
            <span class="season-pip ${item.seasons?.spring >= 20 ? 'active' : ''}" style="background: var(--accent-spring);" title="Spring"></span>
            <span class="season-pip ${item.seasons?.summer >= 20 ? 'active' : ''}" style="background: var(--accent-summer);" title="Summer"></span>
            <span class="season-pip ${item.seasons?.autumn >= 20 ? 'active' : ''}" style="background: var(--accent-autumn);" title="Autumn"></span>
            <span class="season-pip ${item.seasons?.winter >= 20 ? 'active' : ''}" style="background: var(--accent-winter);" title="Winter"></span>
          </div>
        </div>

        <!-- Card Actions -->
        <div class="card-action-bar">
          <button class="btn-island btn-island-ghost inspect-flacon-btn" data-id="${item.id}" title="Examine Olfactory Dossier">
            <span>Dossier</span>
            <div class="icon-orb">${ICONS.inspect}</div>
          </button>
          <button class="btn-island btn-island-primary pair-flacon-btn" data-id="${item.id}" title="Pair this bottle in Layering Atelier">
            <span>Layer</span>
            <div class="icon-orb">${ICONS.layer}</div>
          </button>
        </div>

      </div>
    `;

    // Attach card action listeners
    const inspectBtn = cardShell.querySelector('.inspect-flacon-btn');
    if (inspectBtn) {
      inspectBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openDetailModal(item.id);
      });
    }

    const pairBtn = cardShell.querySelector('.pair-flacon-btn');
    if (pairBtn) {
      pairBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        setLayeringBaseFlacon(item.id);
      });
    }

    cardShell.addEventListener('click', () => openDetailModal(item.id));

    grid.appendChild(cardShell);
  });
}

// Update Overview Stats
function updateStatsBanner() {
  const totalCountEl = document.getElementById('statTotalCount');
  const cloneCountEl = document.getElementById('statCloneCount');

  if (totalCountEl) totalCountEl.textContent = collection.length;
  if (cloneCountEl) {
    const cloneCount = collection.filter(c => c.brand === 'Perfume Parlour' || c.isClone).length;
    cloneCountEl.textContent = cloneCount;
  }
}

// Master Dashboard Refresh
function updateDashboard() {
  const filtered = getFilteredFragrances();
  renderFragranceGrid(filtered);
  updateActiveFiltersBar();
  updateStatsBanner();
}

// ==========================================================================
// SOTD (SCENT OF THE DAY) CURATOR ASSISTANT
// ==========================================================================
let currentSotdFragranceId = null;

function initSotdRecommendation(forceReroll = false) {
  if (collection.length === 0) return;

  const month = new Date().getMonth();
  let currentSeason = 'spring';
  if (month >= 2 && month <= 4) currentSeason = 'spring';
  else if (month >= 5 && month <= 7) currentSeason = 'summer';
  else if (month >= 8 && month <= 10) currentSeason = 'autumn';
  else currentSeason = 'winter';

  const hour = new Date().getHours();
  const isNight = hour >= 18 || hour < 6;
  const timeKey = isNight ? 'night' : 'day';

  const candidates = collection.map(item => {
    const seasonScore = item.seasons?.[currentSeason] || 10;
    const timeScore = item.timeOfDay?.[timeKey] || 30;
    const ratingBonus = (item.rating || 4.5) * 10;
    const totalScore = seasonScore + timeScore + ratingBonus;
    return { item, totalScore };
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

  // Render to SOTD Card
  const sotdImg = document.getElementById('sotdImg');
  const sotdTitle = document.getElementById('sotdTitle');
  const sotdCloneMeta = document.getElementById('sotdCloneMeta');
  const sotdSubtitle = document.getElementById('sotdSubtitle');
  const sotdBlueprint = document.getElementById('sotdBlueprint');

  if (sotdImg) {
    sotdImg.src = selected.image || selected.userPhoto || 'assets/bottles/default-bottle.svg';
  }
  if (sotdTitle) sotdTitle.textContent = selected.name;
  if (sotdCloneMeta) {
    sotdCloneMeta.textContent = selected.isClone && selected.cloneOf
      ? `Inspired by ${selected.cloneOf.originalName} // ${selected.cloneOf.originalHouse}`
      : `${selected.brand} // Signature Formulation`;
  }
  if (sotdSubtitle) {
    sotdSubtitle.textContent = selected.description || `${selected.crg} formulation. Ideal for today's temperature and versatile schedule.`;
  }
  if (sotdBlueprint) {
    const bpText = selected.sprayBlueprint ? selected.sprayBlueprint.join(', ') : 'Behind Ears, Back of Neck';
    sotdBlueprint.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width: 14px; height: 14px; color: var(--gold-primary);">
        <circle cx="12" cy="12" r="9"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <span>Voj Blueprint: ${selected.recommendedSprays || '3-4 Sprays'} (${bpText})</span>
    `;
  }
}

// ==========================================================================
// DEEP INSPECTION DOSSIER MODAL
// ==========================================================================
function openDetailModal(fragranceId) {
  const item = collection.find(c => c.id === fragranceId);
  if (!item) return;

  currentModalFragranceId = fragranceId;
  const modal = document.getElementById('detailModal');
  if (!modal) return;

  // Studio Image
  const bottleImg = document.getElementById('modalBottleImg');
  if (bottleImg) {
    bottleImg.src = item.image || item.userPhoto || 'assets/bottles/default-bottle.svg';
  }

  document.getElementById('modalTitle').textContent = item.name;
  document.getElementById('modalConcentration').textContent = `${item.concentration} // BATCH ${item.batchYear || '2024'}`;
  document.getElementById('modalBrand').textContent = item.brand;
  document.getElementById('modalCloneOrigin').textContent = item.isClone && item.cloneOf 
    ? `${item.cloneOf.originalName} (${item.cloneOf.originalHouse})` 
    : 'Original Formulation';
  document.getElementById('modalSimilarity').textContent = item.isClone && item.cloneOf 
    ? `${item.cloneOf.similarityScore}% Match Rating` 
    : 'N/A';
  document.getElementById('modalVolume').textContent = `${item.remainingMl} / ${item.bottleSize} ml`;
  document.getElementById('modalCrg').textContent = item.crg || 'Aromatic';
  document.getElementById('modalPerformance').textContent = `${item.longevity || '8h+'} // ${item.sillage || 'Strong'}`;
  document.getElementById('modalDescription').textContent = item.description || 'Private formulation in personal archive.';

  // Main Accords
  const accordsList = document.getElementById('modalAccordsList');
  if (accordsList) {
    accordsList.innerHTML = (item.mainAccords || []).map(acc => `
      <div style="display: flex; align-items: center; justify-content: space-between; font-size: 11px; gap: 0.75rem;">
        <span style="width: 110px; color: var(--text-secondary); font-weight: 500;">${acc.name}</span>
        <div style="flex: 1; height: 6px; background: var(--surface-shell); border-radius: 9999px; overflow: hidden;">
          <div style="height: 100%; width: ${acc.percentage}%; background-color: ${acc.color || 'var(--gold-primary)'}; border-radius: 9999px;"></div>
        </div>
        <span style="font-family: var(--font-mono); color: var(--text-tertiary); width: 35px; text-align: right;">${acc.percentage}%</span>
      </div>
    `).join('');
  }

  // Notes Pyramid (Top, Heart, Base) with clean vector typography
  const topNotesEl = document.getElementById('modalTopNotes');
  const heartNotesEl = document.getElementById('modalHeartNotes');
  const baseNotesEl = document.getElementById('modalBaseNotes');

  if (topNotesEl) {
    topNotesEl.innerHTML = (item.notes?.top || []).map(n => `
      <span class="note-capsule">${n.name}</span>
    `).join('') || '<span style="color: var(--text-tertiary); font-size: 11px;">Unlisted top notes</span>';
  }

  if (heartNotesEl) {
    heartNotesEl.innerHTML = (item.notes?.heart || []).map(n => `
      <span class="note-capsule">${n.name}</span>
    `).join('') || '<span style="color: var(--text-tertiary); font-size: 11px;">Unlisted heart notes</span>';
  }

  if (baseNotesEl) {
    baseNotesEl.innerHTML = (item.notes?.base || []).map(n => `
      <span class="note-capsule">${n.name}</span>
    `).join('') || '<span style="color: var(--text-tertiary); font-size: 11px;">Unlisted base notes</span>';
  }

  // Voj Spray Blueprint
  const sprayCountEl = document.getElementById('modalSpraysCount');
  if (sprayCountEl) sprayCountEl.textContent = `${item.recommendedSprays || '3-4 Sprays'} Recommended by Voj Protocol`;

  const blueprintList = document.getElementById('modalSprayBlueprint');
  if (blueprintList) {
    blueprintList.innerHTML = (item.sprayBlueprint || []).map(pt => `
      <span class="note-capsule" style="background: var(--surface-card); border-color: var(--gold-pill-border); color: var(--gold-primary);">${pt}</span>
    `).join('');
  }

  // Reddit Maceration
  const macStatus = document.getElementById('modalMacerationStatus');
  if (macStatus) macStatus.textContent = item.macerationStatus || 'Fully Matured';

  const macTips = document.getElementById('modalMacerationTips');
  if (macTips) macTips.textContent = item.macerationTips || 'Store in a cool dark cupboard. Standard maturation completed.';

  const layeringEl = document.getElementById('modalLayeringPartner');
  if (layeringEl) {
    layeringEl.textContent = item.layeringPartner ? `Layering Synergy: ${item.layeringPartner}` : '';
  }

  modal.classList.add('open');
}

// ==========================================================================
// THE LAYERING ATELIER & PAIRING STUDIO
// ==========================================================================
const CURATED_SIGNATURE_DUOS = [
  {
    title: "The Sicilian Emperor",
    vibe: "Opulent Golden Tobacco & Honey",
    baseId: "user-voux-elegante",
    companionId: "user-pp-particle-iso-e-super",
    score: 98,
    synergyType: "Molecular Fixation & Sillage Multiplication",
    narrative: "Xerjoff Naxos's decadent golden honey, Calabrian lemon, and blonde tobacco anchored by Iso E Super cedarwood radiance for 16-hour boardroom presence.",
    sequence: "Step 1: 2 sprays Particle (primer) on throat and collar. Step 2: 2 sprays Voux Elegante behind ears."
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
    sequence: "Step 1: 2 sprays Noir Extreme. Step 2: 1 spray Noire Illusion."
  }
];

function initLayeringAtelier() {
  const baseSelect = document.getElementById('baseFragranceSelect');
  if (!baseSelect || collection.length === 0) return;

  baseSelect.innerHTML = '';
  collection.forEach(item => {
    const opt = document.createElement('option');
    opt.value = item.id;
    opt.textContent = `${item.name} (${item.brand})`;
    baseSelect.appendChild(opt);
  });

  const defaultBase = collection.find(c => c.id === 'user-voux-elegante') || collection[0];
  baseSelect.value = defaultBase.id;

  onBaseFlaconSelected(defaultBase.id);
  renderAutoCuratedDuos();
}

function setLayeringBaseFlacon(flaconId) {
  const baseSelect = document.getElementById('baseFragranceSelect');
  if (baseSelect) {
    baseSelect.value = flaconId;
    onBaseFlaconSelected(flaconId);
  }

  // Switch to Interactive Mode if not active
  const modeUserPickBtn = document.getElementById('modeUserPickBtn');
  const modeAutoCuratedBtn = document.getElementById('modeAutoCuratedBtn');
  const layeringStudioMode = document.getElementById('layeringStudioMode');
  const layeringAutoMode = document.getElementById('layeringAutoMode');

  if (modeUserPickBtn && layeringStudioMode) {
    modeUserPickBtn.classList.add('active');
    modeAutoCuratedBtn.classList.remove('active');
    layeringStudioMode.classList.add('active');
    layeringAutoMode.classList.remove('active');
  }

  // Smooth scroll to Layering Atelier
  const labSection = document.getElementById('layeringLabSection');
  if (labSection) {
    labSection.scrollIntoView({ behavior: 'smooth' });
  }
}

function onBaseFlaconSelected(baseId) {
  const baseItem = collection.find(c => c.id === baseId);
  if (!baseItem) return;

  renderBaseFlaconPreview(baseItem);
  renderRankedCompanions(baseItem);
}

function renderBaseFlaconPreview(baseItem) {
  const preview = document.getElementById('baseFlaconPreview');
  if (!preview) return;

  const imgSrc = baseItem.image || baseItem.userPhoto || 'assets/bottles/default-bottle.svg';
  const cloneText = baseItem.isClone && baseItem.cloneOf ? `Clone of ${baseItem.cloneOf.originalName}` : baseItem.brand;

  preview.innerHTML = `
    <div style="display: flex; gap: 1.25rem; align-items: center;">
      <div style="width: 100px; height: 100px; border-radius: 12px; background: var(--surface-shell); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
        <img src="${imgSrc}" style="max-width: 80px; max-height: 85px; object-fit: contain; filter: drop-shadow(0 8px 12px rgba(0,0,0,0.15));" alt="${baseItem.name}">
      </div>
      <div style="display: flex; flex-direction: column; gap: 0.25rem;">
        <span class="card-concentration-tag">${baseItem.concentration}</span>
        <h3 style="font-family: var(--font-display); font-size: 1.15rem; font-weight: 700; color: var(--text-primary);">${baseItem.name}</h3>
        <span style="font-size: 0.8rem; color: var(--text-secondary);">${cloneText} &bull; ${baseItem.crg}</span>
        <span style="font-family: var(--font-mono); font-size: 11px; color: var(--gold-primary); margin-top: 0.25rem;">Recommended: ${baseItem.recommendedSprays || '3-4 Sprays'}</span>
      </div>
    </div>
  `;
}

function calculateSynergy(base, companion) {
  let score = 70;
  let synergyType = "Harmonious Complement";
  let rationale = "Balanced interplay of complementary notes and accords.";
  let sequence = `Step 1: 2 sprays ${base.name} on base of neck. Step 2: 1-2 sprays ${companion.name} on collarbones.`;

  const bId = base.id;
  const cId = companion.id;

  // 1. Molecular Primers / Boosters (Particle 1365 & Second Particle 1980)
  if (cId === 'user-pp-particle-iso-e-super' || cId === 'user-pp-second-particle-1980') {
    const isHeavy = ['Sweet Tobacco / Boozy Gourmand', 'Gourmand / Amber Woody', 'Woody Leather / Fruity Animalic'].includes(base.crg);
    score = isHeavy ? 98 : 94;
    synergyType = cId === 'user-pp-particle-iso-e-super' ? "Iso E Super Molecular Amplifier" : "Ambroxan Radiant Sillage Booster";
    rationale = `Pure ${cId === 'user-pp-particle-iso-e-super' ? 'Iso E Super' : 'Ambroxan'} acts as a magnetic projection engine, doubling the diffusive sillage radius of ${base.name} without altering its notes.`;
    sequence = `Step 1: Apply 2 sprays ${companion.name} onto pulse points as primer. Step 2: Mist 2 sprays ${base.name} over collar and chest.`;
  }
  else if (bId === 'user-pp-particle-iso-e-super' || bId === 'user-pp-second-particle-1980') {
    score = 96;
    synergyType = "Molecular Fixative Primer";
    rationale = `Locks ${companion.name} to the skin with warm cedarwood / ambergris radiance, preventing premature evaporation.`;
    sequence = `Step 1: Apply 2 sprays ${base.name} as primer. Step 2: Mist 2 sprays ${companion.name} on top.`;
  }
  // 2. Citrus Particle 0616 (Molecule 01 + Mandarin)
  else if (cId === 'user-pp-citrus-particle-0616') {
    if (base.crg.includes('Tobacco') || base.crg.includes('Gourmand') || base.crg.includes('Amber')) {
      score = 97;
      synergyType = "Photorealistic Citrus & Spiced Contrast";
      rationale = `Sparkling mandarin orange cuts straight through the warm density of ${base.name}, delivering an electrifying top-note explosion before resolving into rich warmth.`;
      sequence = `Step 1: Apply 2 sprays ${base.name} on neck. Step 2: Apply 2 sprays Citrus Particle on shirt & wrists.`;
    } else {
      score = 93;
      synergyType = "Bright Citrus Elevation";
      rationale = `Infuses crisp mandarin zest and airy cedar projection into ${base.name}'s structure.`;
      sequence = `Step 1: Apply ${base.name}. Step 2: Top with Citrus Particle.`;
    }
  }
  // 3. Decadent Boozy Rum & Cherry Liqueur (After Effect + Astray Fruit 1947)
  else if ((bId === 'user-after-effect-fa-paris' && cId === 'user-pp-astray-fruit-1947') ||
           (bId === 'user-pp-astray-fruit-1947' && cId === 'user-after-effect-fa-paris')) {
    score = 97;
    synergyType = "Decadent Boozy Cherry & Rum Liqueur";
    rationale = `Initio Side Effect's boozy Martinique rum, cinnamon, and tobacco harmonize luxuriously with Lost Cherry's tart griotte syrup and bitter almond. Pure intoxicating night-time seduction.`;
    sequence = `Step 1: 2 sprays After Effect behind ears. Step 2: 1 spray Astray Fruit on chest & collar.`;
  }
  // 4. Parfums de Marly Layton (Herb Garden 1598) + Spiced Tobacco (Leaf Flavour or Voux Elegante)
  else if (bId === 'user-pp-herb-garden-1598' && (cId === 'user-pp-leaf-flavour-0401' || cId === 'user-voux-elegante')) {
    score = 95;
    synergyType = "Crisp Apple & Blonde Tobacco Fusion";
    rationale = `Layton's crisp green apple and bourbon vanilla creates an aristocratic contrast with golden honey and warm pipe tobacco.`;
    sequence = `Step 1: 2 sprays ${base.name}. Step 2: 1 spray ${companion.name} on jacket/wrists.`;
  }
  // 5. Marine Aquatic Synergy (Intenso Water 1329 + Sweet Water 1262)
  else if ((bId === 'user-pp-intenso-water-1329' && cId === 'user-pp-sweet-water-1262') ||
           (bId === 'user-pp-sweet-water-1262' && cId === 'user-pp-intenso-water-1329')) {
    score = 94;
    synergyType = "Deep Oceanic & Incense Mineral Interplay";
    rationale = `ADG Profondo's bright sparkling sea notes merge with ADG Profumo's smoky incense and patchouli base for the ultimate 3D oceanic signature.`;
    sequence = `Step 1: 2 sprays Sweet Water on base of neck. Step 2: 2 sprays Intenso Water on shoulders.`;
  }
  // 6. Kilian Black Phantom (Noire Illusion 1746) + Tom Ford Noir Extreme
  else if ((bId === 'user-pp-noire-illusion-1746' && cId === 'user-tf-noir-extreme') ||
           (bId === 'user-tf-noir-extreme' && cId === 'user-pp-noire-illusion-1746')) {
    score = 95;
    synergyType = "Milky Kulfi & Roasted Espresso Gourmand";
    rationale = `Tom Ford's pistachio-cardamom kulfi creaminess blends into Kilian's roasted coffee, bitter dark chocolate, and Martinique rum for an elite winter dessert aroma.`;
    sequence = `Step 1: 2 sprays Noir Extreme. Step 2: 1 spray Noire Illusion.`;
  }
  // 7. General Shared / Complementary Logic
  else {
    const baseAccords = new Set((base.mainAccords || []).map(a => a.name.toLowerCase()));
    const compAccords = new Set((companion.mainAccords || []).map(a => a.name.toLowerCase()));
    let sharedCount = 0;
    baseAccords.forEach(a => { if (compAccords.has(a)) sharedCount++; });

    if (sharedCount >= 2) {
      score += 12;
      synergyType = "Harmonious Accord Alignment";
      rationale = `Both flacons share prominent aromatic bridges, creating a seamless, natural transition throughout drydown.`;
    } else if (base.gender === companion.gender) {
      score += 5;
    }

    if ((base.crg.includes('Aquatic') && companion.crg.includes('Tobacco')) ||
        (base.crg.includes('Tobacco') && companion.crg.includes('Aquatic'))) {
      score = Math.max(48, score - 15);
      synergyType = "Experimental Contrast";
      rationale = `High olfactory contrast between marine sea-salt and dense warm tobacco. Requires minimal dosing to avoid discordance.`;
      sequence = `Step 1: 1 spray only of ${base.name}. Step 2: 1 spray of ${companion.name} on opposite wrist.`;
    }
  }

  score = Math.min(99, Math.max(45, score));
  return { score, synergyType, rationale, sequence };
}

function renderRankedCompanions(baseItem) {
  const container = document.getElementById('rankedOptionsContainer');
  const countBadge = document.getElementById('companionsCountBadge');
  if (!container) return;

  const candidates = collection.filter(c => c.id !== baseItem.id);
  if (countBadge) countBadge.textContent = `${candidates.length} Candidates`;

  const scored = candidates.map(candidate => {
    const synergy = calculateSynergy(baseItem, candidate);
    return { candidate, ...synergy };
  }).sort((a, b) => b.score - a.score);

  container.innerHTML = '';
  scored.forEach(res => {
    const cand = res.candidate;
    const thumbSrc = cand.image || cand.userPhoto || 'assets/bottles/default-bottle.svg';

    const card = document.createElement('div');
    card.className = 'companion-card';
    card.innerHTML = `
      <img src="${thumbSrc}" class="companion-bottle-thumb" alt="${cand.name}">
      <div class="companion-meta">
        <span class="card-concentration-tag" style="font-size: 9px;">${res.synergyType}</span>
        <h4 class="companion-name">${cand.name}</h4>
        <p class="companion-sub">${res.rationale}</p>
        <span style="font-family: var(--font-mono); font-size: 11px; color: var(--gold-primary); margin-top: 0.25rem;">${res.sequence}</span>
      </div>
      <div class="companion-synergy-tag">
        <span class="synergy-score-num">${res.score}%</span>
        <span class="synergy-score-label">Synergy</span>
      </div>
    `;

    container.appendChild(card);
  });
}

function renderAutoCuratedDuos() {
  const grid = document.getElementById('autoDuosGrid');
  if (!grid) return;

  grid.innerHTML = '';

  CURATED_SIGNATURE_DUOS.forEach(duo => {
    const base = collection.find(c => c.id === duo.baseId);
    const comp = collection.find(c => c.id === duo.companionId);
    if (!base || !comp) return;

    const baseSrc = base.image || base.userPhoto || 'assets/bottles/default-bottle.svg';
    const compSrc = comp.image || comp.userPhoto || 'assets/bottles/default-bottle.svg';

    const cardShell = document.createElement('article');
    cardShell.className = 'bezel-shell duo-card-shell';
    cardShell.innerHTML = `
      <div class="bezel-core duo-card-core">
        <div>
          <div class="duo-headline-strip">
            <div>
              <span class="card-concentration-tag" style="font-size: 9px;">${duo.vibe}</span>
              <h3 class="duo-signature-title">${duo.title}</h3>
            </div>
            <span class="duo-compatibility-badge">${duo.score}% Synergy</span>
          </div>

          <div class="duo-flacons-row">
            <div class="duo-flacon-item">
              <img src="${baseSrc}" class="duo-bottle-img" alt="${base.name}">
              <span style="font-family: var(--font-display); font-size: 0.85rem; font-weight: 700; color: var(--text-primary);">${base.name}</span>
            </div>
            <span class="duo-plus-sign">+</span>
            <div class="duo-flacon-item">
              <img src="${compSrc}" class="duo-bottle-img" alt="${comp.name}">
              <span style="font-family: var(--font-display); font-size: 0.85rem; font-weight: 700; color: var(--text-primary);">${comp.name}</span>
            </div>
          </div>

          <p class="duo-notes-summary">${duo.narrative}</p>
        </div>

        <div class="duo-sprays-protocol">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width: 14px; height: 14px; color: var(--gold-primary);">
            <circle cx="12" cy="12" r="9"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span>${duo.sequence}</span>
        </div>
      </div>
    `;

    grid.appendChild(cardShell);
  });
}

// ==========================================================================
// ADD BOTTLE & JSON BACKUP
// ==========================================================================
function handleAddFragrance(e) {
  e.preventDefault();
  const name = document.getElementById('newName').value.trim();
  const brand = document.getElementById('newBrand').value.trim();
  const cloneOf = document.getElementById('newCloneOf').value.trim();
  const size = parseInt(document.getElementById('newSize').value, 10) || 50;
  const remaining = parseInt(document.getElementById('newRemaining').value, 10) || size;

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
    bottleSize: size,
    bottleType: 'Spray',
    remainingMl: remaining,
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
    occasions: ['Office / Work', 'Walking', 'Casual', 'City Centre'],
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
    description: `${name} archived in private vault.`,
    image: 'assets/bottles/default-bottle.svg',
    batchYear: 2026
  };

  collection.unshift(newBottle);
  saveCollection();
  updateDashboard();

  document.getElementById('addFragranceForm').reset();
  const modal = document.getElementById('addBottleModal');
  if (modal) modal.classList.remove('open');
}

function exportCollectionJson() {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(collection, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `atelier-olfactif-vault-${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

function importCollectionJson(e) {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const parsed = JSON.parse(event.target.result);
      if (Array.isArray(parsed) && parsed.length > 0) {
        collection = parsed;
        saveCollection();
        updateDashboard();
        initSotdRecommendation();
        initLayeringAtelier();
        alert(`Successfully imported ${parsed.length} flacons!`);
      }
    } catch (err) {
      alert('Error parsing JSON file. Please check file format.');
    }
  };
  reader.readAsText(file);
}
