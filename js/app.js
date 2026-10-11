/**
   ==========================================================================
   ATELIER PARFUM — CORE APPLICATION ENGINE (AWWWARDS-TIER)
   Architected for Double-Bezel Hardware Components, Zero-Emoji Visuals,
   Multi-Factor Filtering (including Running & Walking), SOTD Assistant,
   and Fragrantica Accord Visualizations.
   ==========================================================================
*/

// Local Storage Key
const STORAGE_KEY = 'fragrance_atelier_collection_v2';

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
  sparkle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3v18M3 12h18M6.5 6.5l11 11M6.5 17.5l11-11"/></svg>`
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  loadCollection();
  initFilterPills();
  setupEventListeners();
  updateDashboard();
  initSotdRecommendation();
  initLayeringAtelier();
});

// Load Collection from LocalStorage or Seed Data
function loadCollection() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      const existingIds = new Set(parsed.map(item => item.id));
      const missingSeedItems = FRAGRANCE_DATABASE.filter(seed => !existingIds.has(seed.id));

      // Synchronize updated image paths & occasions from seed
      collection = parsed.map(item => {
        const seedMatch = FRAGRANCE_DATABASE.find(s => s.id === item.id);
        if (seedMatch) {
          return {
            ...item,
            image: seedMatch.image,
            userPhoto: item.userUploadedCustomPhoto ? item.userPhoto : seedMatch.userPhoto,
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

// Persist Collection to LocalStorage
function saveCollection() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collection));
  } catch (err) {
    console.warn('Storage quota reached or localStorage disabled', err);
  }
}

// Initialize Dynamic Filter Pills from FILTER_DIMENSIONS
function initFilterPills() {
  // Occasions (including Running and Walking)
  const occasionContainer = document.getElementById('occasionPills');
  if (occasionContainer && FILTER_DIMENSIONS.occasions) {
    occasionContainer.innerHTML = '';
    const occCount = document.getElementById('occasionCount');
    if (occCount) occCount.textContent = `${FILTER_DIMENSIONS.occasions.length} Dimensions`;

    FILTER_DIMENSIONS.occasions.forEach(occ => {
      const pill = document.createElement('button');
      pill.className = 'filter-pill';
      pill.textContent = occ;
      pill.dataset.dimension = 'occasions';
      pill.dataset.value = occ;
      pill.addEventListener('click', () => toggleFilter('occasions', occ, pill));
      occasionContainer.appendChild(pill);
    });
  }

  // Wardrobe Archetypes
  const archetypeContainer = document.getElementById('archetypePills');
  if (archetypeContainer && FILTER_DIMENSIONS.wardrobeArchetypes) {
    archetypeContainer.innerHTML = '';
    FILTER_DIMENSIONS.wardrobeArchetypes.forEach(arch => {
      const pill = document.createElement('button');
      pill.className = 'filter-pill';
      pill.textContent = arch;
      pill.dataset.dimension = 'archetypes';
      pill.dataset.value = arch;
      pill.addEventListener('click', () => toggleFilter('archetypes', arch, pill));
      archetypeContainer.appendChild(pill);
    });
  }

  // Seasons
  const seasonContainer = document.getElementById('seasonPills');
  if (seasonContainer && FILTER_DIMENSIONS.seasons) {
    seasonContainer.innerHTML = '';
    FILTER_DIMENSIONS.seasons.forEach(season => {
      const pill = document.createElement('button');
      pill.className = 'filter-pill';
      pill.textContent = season;
      pill.dataset.dimension = 'seasons';
      pill.dataset.value = season;
      pill.addEventListener('click', () => toggleFilter('seasons', season, pill));
      seasonContainer.appendChild(pill);
    });
  }

  // Time of Day
  const timeContainer = document.getElementById('timeOfDayPills');
  if (timeContainer && FILTER_DIMENSIONS.timesOfDay) {
    timeContainer.innerHTML = '';
    FILTER_DIMENSIONS.timesOfDay.forEach(time => {
      const pill = document.createElement('button');
      pill.className = 'filter-pill';
      pill.textContent = time;
      pill.dataset.dimension = 'timesOfDay';
      pill.dataset.value = time;
      pill.addEventListener('click', () => toggleFilter('timesOfDay', time, pill));
      timeContainer.appendChild(pill);
    });
  }

  // Houses / Brands
  const houseContainer = document.getElementById('housePills');
  if (houseContainer && FILTER_DIMENSIONS.brands) {
    houseContainer.innerHTML = '';
    FILTER_DIMENSIONS.brands.forEach(house => {
      const pill = document.createElement('button');
      pill.className = 'filter-pill';
      pill.textContent = house;
      pill.dataset.dimension = 'houses';
      pill.dataset.value = house;
      pill.addEventListener('click', () => toggleFilter('houses', house, pill));
      houseContainer.appendChild(pill);
    });
  }
}

// Toggle Filter Helper
function toggleFilter(dimension, value, element) {
  if (activeFilters[dimension].has(value)) {
    activeFilters[dimension].delete(value);
    element.classList.remove('active');
  } else {
    activeFilters[dimension].add(value);
    element.classList.add('active');
  }
  updateDashboard();
}

// Setup Event Listeners
function setupEventListeners() {
  // Search
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      activeFilters.search = e.target.value.trim().toLowerCase();
      updateDashboard();
    });
    // ESC to clear
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.activeElement === searchInput) {
        searchInput.value = '';
        activeFilters.search = '';
        updateDashboard();
      }
    });
  }

  // Sort
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

  // Modal Closers
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const detailModal = document.getElementById('detailModal');
  if (modalCloseBtn && detailModal) {
    modalCloseBtn.addEventListener('click', () => detailModal.classList.remove('open'));
    detailModal.addEventListener('click', (e) => {
      if (e.target === detailModal) detailModal.classList.remove('open');
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
    exportBtn.addEventListener('click', exportInventoryJSON);
  }

  // Import JSON
  const importInput = document.getElementById('importJsonInput');
  if (importInput) {
    importInput.addEventListener('change', handleImportJSON);
  }

  // Photo Upload in Detail Modal
  const modalPhotoInput = document.getElementById('modalPhotoInput');
  if (modalPhotoInput) {
    modalPhotoInput.addEventListener('change', handleModalPhotoUpload);
  }

  // Pro Tips & Field Guide Modal
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

  // Pro Tips Tab Navigation
  const tabBtns = document.querySelectorAll('.tips-tabs-nav .tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const targetId = btn.dataset.tab;
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');
    });
  });

  // SOTD Buttons
  const sotdRefreshBtn = document.getElementById('sotdRefreshBtn');
  if (sotdRefreshBtn) {
    sotdRefreshBtn.addEventListener('click', () => initSotdRecommendation(true));
  }
  const sotdPickerBtn = document.getElementById('sotdPickerBtn');
  if (sotdPickerBtn) {
    sotdPickerBtn.addEventListener('click', () => {
      initSotdRecommendation(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Layering Navigation Button
  const layeringNavBtn = document.getElementById('layeringNavBtn');
  if (layeringNavBtn) {
    layeringNavBtn.addEventListener('click', () => {
      const target = document.getElementById('layeringLabSection');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Layering Mode Tabs (Studio vs Auto Duos)
  const modeUserPickBtn = document.getElementById('modeUserPickBtn');
  const modeAutoCuratedBtn = document.getElementById('modeAutoCuratedBtn');
  const layeringStudioMode = document.getElementById('layeringStudioMode');
  const layeringAutoMode = document.getElementById('layeringAutoMode');

  if (modeUserPickBtn && modeAutoCuratedBtn) {
    modeUserPickBtn.addEventListener('click', () => {
      modeUserPickBtn.classList.add('active');
      modeAutoCuratedBtn.classList.remove('active');
      if (layeringStudioMode) layeringStudioMode.classList.add('active');
      if (layeringAutoMode) layeringAutoMode.classList.remove('active');
    });

    modeAutoCuratedBtn.addEventListener('click', () => {
      modeAutoCuratedBtn.classList.add('active');
      modeUserPickBtn.classList.remove('active');
      if (layeringAutoMode) layeringAutoMode.classList.add('active');
      if (layeringStudioMode) layeringStudioMode.classList.remove('active');
    });
  }

  // Base Fragrance Selection Change
  const baseFragranceSelect = document.getElementById('baseFragranceSelect');
  if (baseFragranceSelect) {
    baseFragranceSelect.addEventListener('change', (e) => {
      onBaseFlaconSelected(e.target.value);
    });
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

  document.querySelectorAll('.filter-pill.active').forEach(p => p.classList.remove('active'));
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
    summaryEl.textContent = `Displaying full vault (${collection.length} flacons)`;
  } else {
    const parts = [];
    if (activeFilters.search) parts.push(`"${activeFilters.search}"`);
    if (activeFilters.occasions.size) parts.push(`${activeFilters.occasions.size} occasions`);
    if (activeFilters.seasons.size) parts.push(`${activeFilters.seasons.size} seasons`);
    if (activeFilters.archetypes.size) parts.push(`${activeFilters.archetypes.size} archetypes`);
    summaryEl.textContent = `Filtered by: ${parts.join(', ')}`;
  }
}

// Multi-Dimension Filter Engine
function getFilteredFragrances() {
  return collection.filter(item => {
    // Text search query
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

    // Seasons
    if (activeFilters.seasons.size > 0) {
      const hasSeason = Array.from(activeFilters.seasons).some(season => {
        const key = season.toLowerCase();
        return item.seasons && item.seasons[key] && item.seasons[key] >= 20;
      });
      if (!hasSeason) return false;
    }

    // Time of Day
    if (activeFilters.timesOfDay.size > 0) {
      const hasTime = Array.from(activeFilters.timesOfDay).some(time => {
        const key = time.toLowerCase();
        return item.timeOfDay && item.timeOfDay[key] && item.timeOfDay[key] >= 30;
      });
      if (!hasTime) return false;
    }

    // Perfumer Houses
    if (activeFilters.houses.size > 0) {
      if (!activeFilters.houses.has(item.brand)) return false;
    }

    // Wardrobe Archetype
    if (activeFilters.archetypes.size > 0) {
      if (!activeFilters.archetypes.has(item.wardrobeArchetype)) return false;
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

// Render Museum Exhibition Flacons Grid
function renderFragranceGrid(items) {
  const grid = document.getElementById('fragranceGrid');
  const countEl = document.getElementById('resultsCount');
  if (countEl) countEl.textContent = items.length;
  if (!grid) return;

  grid.innerHTML = '';

  if (items.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 4rem 2rem; text-align: center; background: rgba(255,255,255,0.02); border: 1px dashed var(--border-hairline); border-radius: var(--radius-shell-lg);">
        <h3 style="font-family: var(--font-display); font-size: 1.25rem; color: var(--gold-primary); margin-bottom: 0.5rem;">No Flacons Match This Criteria</h3>
        <p style="color: var(--text-secondary); font-size: 0.85rem; max-width: 45ch; margin: 0 auto 1.5rem;">Adjust your scenario filters or clear search keywords to browse your collection.</p>
        <button onclick="resetAllFilters()" class="btn-island btn-island-primary">Reset Filters</button>
      </div>
    `;
    return;
  }

  items.forEach(item => {
    const cardShell = document.createElement('article');
    cardShell.className = 'bezel-shell fragrance-card-shell';
    cardShell.addEventListener('click', () => openDetailModal(item.id));

    const bottleSrc = item.userPhoto || item.image || 'assets/bottles/default-bottle.svg';

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

    // Remaining volume
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

      </div>
    `;

    grid.appendChild(cardShell);
  });
}

// Update Overview Stats Banner
function updateStatsBanner() {
  const totalCountEl = document.getElementById('statTotalCount');
  const totalVolumeEl = document.getElementById('statTotalVolume');
  const cloneCountEl = document.getElementById('statCloneCount');
  const versatileNameEl = document.getElementById('statVersatileName');
  const versatileScoreEl = document.getElementById('statVersatileScore');

  if (totalCountEl) totalCountEl.textContent = collection.length;

  const totalJuice = collection.reduce((sum, item) => sum + (item.remainingMl || 0), 0);
  if (totalVolumeEl) totalVolumeEl.textContent = `${totalJuice} ml Total Juice in Vault`;

  const cloneCount = collection.filter(c => c.brand === 'Perfume Parlour' || c.isClone).length;
  if (cloneCountEl) cloneCountEl.textContent = cloneCount;

  // Most versatile fragrance
  let mostVersatile = null;
  let maxOccasions = -1;
  collection.forEach(item => {
    const occLen = (item.occasions || []).length;
    if (occLen > maxOccasions) {
      maxOccasions = occLen;
      mostVersatile = item;
    }
  });

  if (mostVersatile && versatileNameEl) {
    versatileNameEl.textContent = mostVersatile.name;
    if (versatileScoreEl) versatileScoreEl.textContent = `Active across ${maxOccasions} distinct lifestyle scenarios`;
  }
}

// Master Dashboard Refresh
function updateDashboard() {
  const filtered = getFilteredFragrances();
  renderFragranceGrid(filtered);
  updateActiveFiltersBar();
  updateStatsBanner();
}

// SOTD (Scent of the Day) Assistant
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

  let picked = candidates[0]?.item;
  if (forceReroll && candidates.length > 1) {
    const pool = candidates.slice(0, 4);
    picked = pool[Math.floor(Math.random() * pool.length)].item;
  }

  if (picked) {
    const titleEl = document.getElementById('sotdTitle');
    const cloneMetaEl = document.getElementById('sotdCloneMeta');
    const subEl = document.getElementById('sotdSubtitle');
    const imgEl = document.getElementById('sotdImg');
    const blueprintEl = document.getElementById('sotdBlueprint');
    const inspectBtn = document.getElementById('sotdInspectBtn');

    if (titleEl) titleEl.textContent = picked.name;
    if (cloneMetaEl) {
      cloneMetaEl.textContent = picked.isClone && picked.cloneOf 
        ? `Inspired by ${picked.cloneOf.originalName} // ${picked.cloneOf.originalHouse}`
        : `Original Masterpiece // ${picked.brand}`;
    }
    if (imgEl) {
      imgEl.src = picked.userPhoto || picked.image || 'assets/bottles/default-bottle.svg';
    }
    if (subEl) {
      const seasonCapital = currentSeason.charAt(0).toUpperCase() + currentSeason.slice(1);
      const timeCapital = isNight ? 'Evening' : 'Daytime';
      subEl.textContent = `${picked.description} Optimized for ${seasonCapital} ${timeCapital} wear.`;
    }
    if (blueprintEl) {
      blueprintEl.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width: 14px; height: 14px; color: var(--gold-primary);">
          <circle cx="12" cy="12" r="9"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <span>Voj Blueprint: ${picked.recommendedSprays || '3-4 Sprays'} (${(picked.sprayBlueprint || []).join(', ')})</span>
      `;
    }
    if (inspectBtn) {
      inspectBtn.onclick = () => openDetailModal(picked.id);
    }
  }
}

// Open Detailed Dossier Modal
function openDetailModal(fragranceId) {
  const item = collection.find(c => c.id === fragranceId);
  if (!item) return;

  currentModalFragranceId = fragranceId;
  const modal = document.getElementById('detailModal');
  if (!modal) return;

  // Header & Visual
  const bottleImg = document.getElementById('modalBottleImg');
  if (bottleImg) {
    bottleImg.src = item.userPhoto || item.image || 'assets/bottles/default-bottle.svg';
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
        <span style="width: 110px; color: var(--text-secondary);">${acc.name}</span>
        <div style="flex: 1; height: 6px; background: rgba(255,255,255,0.06); border-radius: 9999px; overflow: hidden;">
          <div style="height: 100%; width: ${acc.percentage}%; background-color: ${acc.color || 'var(--gold-primary)'}; border-radius: 9999px;"></div>
        </div>
        <span style="font-family: var(--font-mono); color: var(--text-tertiary); width: 35px; text-align: right;">${acc.percentage}%</span>
      </div>
    `).join('');
  }

  // Notes Pyramid (Top, Heart, Base) with clean typography
  const topNotesEl = document.getElementById('modalTopNotes');
  const heartNotesEl = document.getElementById('modalHeartNotes');
  const baseNotesEl = document.getElementById('modalBaseNotes');

  if (topNotesEl) {
    topNotesEl.innerHTML = (item.notes?.top || []).map(n => `
      <span class="note-capsule"><span class="note-capsule-icon">${ICONS.sparkle}</span> ${n.name}</span>
    `).join('') || '<span style="color: var(--text-tertiary); font-size: 11px;">Unlisted top notes</span>';
  }

  if (heartNotesEl) {
    heartNotesEl.innerHTML = (item.notes?.heart || []).map(n => `
      <span class="note-capsule"><span class="note-capsule-icon">${ICONS.leaf}</span> ${n.name}</span>
    `).join('') || '<span style="color: var(--text-tertiary); font-size: 11px;">Unlisted heart notes</span>';
  }

  if (baseNotesEl) {
    baseNotesEl.innerHTML = (item.notes?.base || []).map(n => `
      <span class="note-capsule"><span class="note-capsule-icon">${ICONS.droplet}</span> ${n.name}</span>
    `).join('') || '<span style="color: var(--text-tertiary); font-size: 11px;">Unlisted base notes</span>';
  }

  // Voj Spray Blueprint
  const sprayCountEl = document.getElementById('modalSpraysCount');
  if (sprayCountEl) sprayCountEl.textContent = `${item.recommendedSprays || '3-4 Sprays'} Recommended by Voj Protocol`;

  const blueprintList = document.getElementById('modalSprayBlueprint');
  if (blueprintList) {
    blueprintList.innerHTML = (item.sprayBlueprint || []).map(pt => `
      <span class="spray-point-badge">${pt}</span>
    `).join('');
  }

  // Reddit Maceration
  const macStatus = document.getElementById('modalMacerationStatus');
  if (macStatus) macStatus.textContent = item.macerationStatus || 'Fully Matured';

  const macTips = document.getElementById('modalMacerationTips');
  if (macTips) macTips.textContent = item.macerationTips || 'Store in a cool dark drawer. Standard maturation completed.';

  const layeringEl = document.getElementById('modalLayeringPartner');
  if (layeringEl) {
    layeringEl.textContent = item.layeringPartner ? `Layering Synergy: ${item.layeringPartner}` : '';
  }

  modal.classList.add('open');
}

// Handle Custom Bottle Photo Upload
function handleModalPhotoUpload(e) {
  const file = e.target.files?.[0];
  if (!file || !currentModalFragranceId) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const base64Data = event.target.result;
    const item = collection.find(c => c.id === currentModalFragranceId);
    if (item) {
      item.userPhoto = base64Data;
      item.userUploadedCustomPhoto = true;
      saveCollection();
      updateDashboard();

      const modalImg = document.getElementById('modalBottleImg');
      if (modalImg) modalImg.src = base64Data;
    }
  };
  reader.readAsDataURL(file);
}

// Add New Flacon Form Handler
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
    purchaseSource: 'Personal Collection',
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
      { name: 'Citrus', percentage: 80, color: '#f59e0b' },
      { name: 'Aromatic', percentage: 70, color: '#06b6d4' }
    ],
    notes: {
      top: [{ name: 'Citrus Zest' }],
      heart: [{ name: 'Aromatic Spices' }],
      base: [{ name: 'Cedarwood' }]
    },
    description: `${name} by ${brand}. Indexed directly in your vault.`,
    image: 'assets/bottles/default-bottle.svg',
    userPhoto: 'assets/bottles/default-bottle.svg',
    batchYear: 2024
  };

  collection.unshift(newBottle);
  saveCollection();
  updateDashboard();

  const addBottleModal = document.getElementById('addBottleModal');
  if (addBottleModal) addBottleModal.classList.remove('open');
  e.target.reset();
}

// Export Inventory JSON
function exportInventoryJSON() {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(collection, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `atelier_parfum_vault_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

// Import Inventory JSON
function handleImportJSON(e) {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const imported = JSON.parse(event.target.result);
      if (Array.isArray(imported) && imported.length > 0) {
        collection = imported;
        saveCollection();
        updateDashboard();
      }
    } catch (err) {
      console.error('Invalid JSON file format', err);
    }
  };
  reader.readAsText(file);
}

// ==========================================================================
// LAYERING ATELIER & OLFACTORY SYNERGY ENGINE
// ==========================================================================

const CURATED_SIGNATURE_DUOS = [
  {
    title: "The Modern Alchemist",
    vibe: "Cold Weather Elegance // Spiced Zest",
    baseId: "user-pp-leaf-flavour-0401",
    companionId: "user-pp-citrus-particle-0616",
    score: 98,
    synergyType: "Mandarin Spark Over Spiced Cavendish Tobacco",
    narrative: "Photorealistic mandarin zest explodes in the opening, cutting clean through dense vanilla and pipe tobacco before settling into velvety Iso E Super cedarwood.",
    sequence: "Step 1: 2 sprays Leaf Flavour on neck. Step 2: 2 sprays Citrus Particle on shirt & wrists."
  },
  {
    title: "The Velvet Shadow",
    vibe: "Forbidden Date Night Seduction",
    baseId: "user-after-effect-fa-paris",
    companionId: "user-pp-astray-fruit-1947",
    score: 97,
    synergyType: "Dark Rum Liqueur Laced with Tart Griotte Cherry",
    narrative: "Initio Side Effect's boozy Martinique rum, cinnamon, and tobacco harmonize luxuriously with Lost Cherry's tart syrup and bitter almond.",
    sequence: "Step 1: 2 sprays After Effect behind ears. Step 2: 1 spray Astray Fruit on chest."
  },
  {
    title: "The Royal Vanguard",
    vibe: "Aristocratic Autumn Versatility",
    baseId: "user-pp-herb-garden-1598",
    companionId: "user-pp-particle-iso-e-super",
    score: 96,
    synergyType: "Green Apple & 12-Hour Diffusive Cedar Cloud",
    narrative: "Parfums de Marly Layton's crisp green apple, lavender, and bourbon vanilla are amplified 2x in sillage by pure Molecule 01 Iso E Super.",
    sequence: "Step 1: 2 sprays Particle 1365 as molecular primer. Step 2: 2 sprays Herb Garden over collar."
  },
  {
    title: "The Mediterranean Sovereign",
    vibe: "Prestige Formal & Black Tie",
    baseId: "user-voux-elegante",
    companionId: "user-pp-second-particle-1980",
    score: 96,
    synergyType: "Honeyed Lavender & Ambergris Skin Radiance",
    narrative: "Xerjoff Naxos golden honey and blonde tobacco gain an ethereal, velvety skin warmth from pure Molecule 02 Ambroxan.",
    sequence: "Step 1: 2 sprays Voux Elegante behind ears. Step 2: 1 spray Second Particle on collarbones."
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

  // Default to Leaf Flavour or first item
  const defaultBase = collection.find(c => c.id === 'user-pp-leaf-flavour-0401') || collection[0];
  baseSelect.value = defaultBase.id;

  onBaseFlaconSelected(defaultBase.id);
  renderAutoCuratedDuos();
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

  const imgSrc = baseItem.userPhoto || baseItem.image || 'assets/bottles/default-bottle.svg';
  const cloneText = baseItem.isClone && baseItem.cloneOf ? `Clone of ${baseItem.cloneOf.originalName}` : baseItem.brand;

  preview.innerHTML = `
    <div class="base-preview-stage">
      <img src="${imgSrc}" class="base-preview-img" alt="${baseItem.name}">
    </div>
    <div class="base-preview-info">
      <span class="card-concentration-tag">${baseItem.concentration}</span>
      <h3 class="base-preview-name">${baseItem.name}</h3>
      <span class="base-preview-meta">${cloneText} &bull; ${baseItem.crg}</span>
      <div style="font-size: 11px; color: var(--text-secondary); margin-top: 0.35rem; font-family: var(--font-mono);">
        Recommended Sprays: ${baseItem.recommendedSprays || '3-4 Sprays'}
      </div>
    </div>
  `;
}

function calculateSynergy(base, companion) {
  let score = 70;
  let synergyType = "Harmonious Complement";
  let rationale = "Balanced interplay of complementary accords.";
  let sequence = `Step 1: 2 sprays ${base.name} on base of neck. Step 2: 1-2 sprays ${companion.name} on collarbones.`;

  const bId = base.id;
  const cId = companion.id;

  // 1. Molecular Primers / Boosters (Particle 1365 & Second Particle 1980)
  if (cId === 'user-pp-particle-iso-e-super' || cId === 'user-pp-second-particle-1980') {
    const isHeavy = ['Sweet Tobacco / Boozy Gourmand', 'Gourmand / Amber Woody', 'Woody Leather / Fruity Animalic'].includes(base.crg);
    score = isHeavy ? 98 : 94;
    synergyType = cId === 'user-pp-particle-iso-e-super' ? "Iso E Super Molecular Amplifier" : "Ambroxan Radiant Sillage Booster";
    rationale = `Pure ${cId === 'user-pp-particle-iso-e-super' ? 'Iso E Super' : 'Ambroxan'} acts as a magnetic projection engine, doubling the diffusive sillage radius of ${base.name} without altering its notes.`;
    sequence = `Step 1: Apply 2 sprays ${companion.name} onto pulse points as a primer. Step 2: Mist 2 sprays ${base.name} over collar and chest.`;
  }
  // If base is a molecular booster and companion is anything else
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
  let tier = 'low';
  if (score >= 95) tier = 'transcendent';
  else if (score >= 85) tier = 'harmonious';
  else if (score >= 70) tier = 'moderate';

  return { score, tier, synergyType, rationale, sequence };
}

function renderRankedCompanions(baseItem) {
  const container = document.getElementById('rankedOptionsContainer');
  const countBadge = document.getElementById('companionsCountBadge');
  if (!container) return;

  const candidates = collection.filter(c => c.id !== baseItem.id);
  if (countBadge) countBadge.textContent = `${candidates.length} Vault Candidates`;

  const scored = candidates.map(candidate => {
    const synergy = calculateSynergy(baseItem, candidate);
    return { candidate, ...synergy };
  }).sort((a, b) => b.score - a.score);

  container.innerHTML = '';
  scored.forEach(res => {
    const cand = res.candidate;
    const thumbSrc = cand.userPhoto || cand.image || 'assets/bottles/default-bottle.svg';

    const card = document.createElement('div');
    card.className = 'pairing-candidate-card';
    card.innerHTML = `
      <div class="candidate-top-row">
        <div class="candidate-left-meta">
          <div class="candidate-thumb-wrapper">
            <img src="${thumbSrc}" class="candidate-thumb-img" alt="${cand.name}">
          </div>
          <div class="candidate-name-col">
            <h4 class="candidate-title">${cand.name}</h4>
            <span class="candidate-house-meta">${cand.brand} &bull; ${cand.crg}</span>
          </div>
        </div>
        <div class="synergy-score-gauge synergy-score-tier-${res.tier}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 12px; height: 12px;">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          <span>${res.score}% SYNERGY</span>
        </div>
      </div>

      <div class="candidate-narrative">
        <span class="candidate-synergy-type">${res.synergyType}</span>
        <p class="candidate-rationale">${res.rationale}</p>
      </div>

      <div class="candidate-sequence-tag">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width: 13px; height: 13px; color: var(--gold-primary);">
          <circle cx="12" cy="12" r="9"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
        <span>${res.sequence}</span>
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

    const baseSrc = base.userPhoto || base.image || 'assets/bottles/default-bottle.svg';
    const compSrc = comp.userPhoto || comp.image || 'assets/bottles/default-bottle.svg';

    const card = document.createElement('div');
    card.className = 'auto-duo-card';
    card.innerHTML = `
      <div class="auto-duo-top-meta">
        <span class="brand-eyebrow">${duo.vibe}</span>
        <div class="synergy-score-gauge synergy-score-tier-transcendent">
          <span>${duo.score}% SYNERGY</span>
        </div>
      </div>

      <h3 class="auto-duo-title">${duo.title}</h3>

      <div class="auto-duo-flacons-stage">
        <div class="duo-flacon-unit">
          <img src="${baseSrc}" class="duo-flacon-img" alt="${base.name}">
          <span class="duo-flacon-label">${base.name}</span>
        </div>

        <div class="duo-synergy-orb">
          <span>${duo.score}%</span>
          <span class="duo-synergy-orb-label">LINK</span>
        </div>

        <div class="duo-flacon-unit">
          <img src="${compSrc}" class="duo-flacon-img" alt="${comp.name}">
          <span class="duo-flacon-label">${comp.name}</span>
        </div>
      </div>

      <p class="auto-duo-notes">${duo.narrative}</p>

      <div class="auto-duo-action-bar">
        <span style="font-family: var(--font-mono); font-size: 10px; color: var(--text-tertiary);">${duo.sequence}</span>
        <button class="btn-island btn-island-ghost" style="padding: 0.35rem 0.85rem; font-size: 0.72rem;" onclick="loadDuoInStudio('${base.id}', '${comp.id}')">
          <span>Load In Studio</span>
        </button>
      </div>
    `;

    grid.appendChild(card);
  });
}

function loadDuoInStudio(baseId, companionId) {
  const modeUserPickBtn = document.getElementById('modeUserPickBtn');
  const modeAutoCuratedBtn = document.getElementById('modeAutoCuratedBtn');
  const layeringStudioMode = document.getElementById('layeringStudioMode');
  const layeringAutoMode = document.getElementById('layeringAutoMode');
  const baseSelect = document.getElementById('baseFragranceSelect');

  if (modeUserPickBtn && modeAutoCuratedBtn && layeringStudioMode && layeringAutoMode && baseSelect) {
    modeUserPickBtn.classList.add('active');
    modeAutoCuratedBtn.classList.remove('active');
    layeringStudioMode.classList.add('active');
    layeringAutoMode.classList.remove('active');

    baseSelect.value = baseId;
    onBaseFlaconSelected(baseId);

    const target = document.getElementById('layeringLabSection');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  }
}

