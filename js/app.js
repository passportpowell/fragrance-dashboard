/**
 * Fragrance Atelier - Core Application Engine
 * Fragrantica analytics, dynamic multi-factor filtering, bottle photo manager,
 * and SOTD (Scent of the Day) recommendation system.
 */

// Local Storage Key
const STORAGE_KEY = 'fragrance_atelier_collection_v1';

// App State
let collection = [];
let activeFilters = {
  search: '',
  sort: 'rating',
  occasions: new Set(),
  seasons: new Set(),
  timesOfDay: new Set(),
  crgs: new Set(),
  houses: new Set(),
  archetypes: new Set()
};

let currentModalFragranceId = null;

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  loadCollection();
  initFilterPills();
  setupEventListeners();
  updateDashboard();
  initSotdRecommendation();
});

// Load Collection from LocalStorage or Seed Data
function loadCollection() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure all seed fragrances from FRAGRANCE_DATABASE exist in collection
      const existingIds = new Set(parsed.map(item => item.id));
      const missingSeedItems = FRAGRANCE_DATABASE.filter(seed => !existingIds.has(seed.id));

      // Update any existing item with newer cropped images if seed was updated
      collection = parsed.map(item => {
        const seedMatch = FRAGRANCE_DATABASE.find(s => s.id === item.id);
        if (seedMatch && !item.userUploadedCustomPhoto) {
          return { ...item, image: seedMatch.image, userPhoto: seedMatch.userPhoto };
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
    console.error('Could not parse localStorage collection, falling back to seed data', err);
    collection = [...FRAGRANCE_DATABASE];
  }
}

// Persist Collection to LocalStorage
function saveCollection() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collection));
  } catch (err) {
    console.warn('Could not save collection to localStorage', err);
  }
}

// Initialize Filter Pills UI
function initFilterPills() {
  // 1. Occasion Pills
  const occasionContainer = document.getElementById('occasionPills');
  if (occasionContainer) {
    const occasionIcons = {
      'Wedding': '💍',
      'Office / Work': '💼',
      'Gym': '🏋️',
      'Parks': '🌲',
      'City Centre': '🏙️',
      'Malls': '🛍️',
      'Dates': '🍷',
      'Clubbing / Evening': '🍸',
      'Casual': '☕'
    };

    FILTER_DIMENSIONS.occasions.forEach(occ => {
      const pill = document.createElement('div');
      pill.className = 'filter-pill';
      pill.innerHTML = `<span>${occasionIcons[occ] || '🏷️'}</span> <span>${occ}</span>`;
      pill.dataset.dimension = 'occasions';
      pill.dataset.value = occ;
      pill.addEventListener('click', () => toggleFilter('occasions', occ, pill));
      occasionContainer.appendChild(pill);
    });
  }

  // 2. Season Pills
  const seasonContainer = document.getElementById('seasonPills');
  if (seasonContainer) {
    const seasonIcons = {
      'Spring': '🌸',
      'Summer': '☀️',
      'Autumn': '🍂',
      'Winter': '❄️'
    };

    FILTER_DIMENSIONS.seasons.forEach(season => {
      const pill = document.createElement('div');
      pill.className = 'filter-pill';
      pill.innerHTML = `<span>${seasonIcons[season] || '🌤️'}</span> <span>${season}</span>`;
      pill.dataset.dimension = 'seasons';
      pill.dataset.value = season;
      pill.addEventListener('click', () => toggleFilter('seasons', season, pill));
      seasonContainer.appendChild(pill);
    });
  }

  // 3. Time of Day & House Pills
  const timeAndHouseContainer = document.getElementById('timeAndHousePills');
  if (timeAndHouseContainer) {
    // Times
    ['Day', 'Night'].forEach(time => {
      const pill = document.createElement('div');
      pill.className = 'filter-pill';
      pill.innerHTML = `<span>${time === 'Day' ? '☀️' : '🌙'}</span> <span>${time}</span>`;
      pill.dataset.dimension = 'timesOfDay';
      pill.dataset.value = time;
      pill.addEventListener('click', () => toggleFilter('timesOfDay', time, pill));
      timeAndHouseContainer.appendChild(pill);
    });

    // Perfume Parlour Quick Filter
    const ppPill = document.createElement('div');
    ppPill.className = 'filter-pill';
    ppPill.innerHTML = `<span>👑</span> <span>Perfume Parlour Clones</span>`;
    ppPill.dataset.dimension = 'houses';
    ppPill.dataset.value = 'Perfume Parlour';
    ppPill.addEventListener('click', () => toggleFilter('houses', 'Perfume Parlour', ppPill));
    timeAndHouseContainer.appendChild(ppPill);
  }

  // 4. CRG / Scent Family Pills
  const crgContainer = document.getElementById('crgPills');
  if (crgContainer) {
    // Derive unique CRGs from collection
    const uniqueCrgs = Array.from(new Set(collection.map(c => c.crg).filter(Boolean)));
    uniqueCrgs.slice(0, 6).forEach(crg => {
      const pill = document.createElement('div');
      pill.className = 'filter-pill';
      pill.textContent = crg;
      pill.dataset.dimension = 'crgs';
      pill.dataset.value = crg;
      pill.addEventListener('click', () => toggleFilter('crgs', crg, pill));
      crgContainer.appendChild(pill);
    });
  }

  // 5. Wardrobe Archetype Pills (Voj & Reddit 5-Bottle Framework)
  const archetypeContainer = document.getElementById('archetypePills');
  if (archetypeContainer && FILTER_DIMENSIONS.wardrobeArchetypes) {
    const archetypeIcons = {
      'Everyday Office / Versatile Signature': '💼',
      'Cold Weather Beast': '❄️',
      'Date Night Seduction': '🍷',
      'Gym & High-Heat Freshie': '🏃',
      'Formal / Black Tie Elegance': '🎩'
    };

    FILTER_DIMENSIONS.wardrobeArchetypes.forEach(arch => {
      const pill = document.createElement('div');
      pill.className = 'filter-pill';
      pill.innerHTML = `<span>${archetypeIcons[arch] || '🏛️'}</span> <span>${arch}</span>`;
      pill.dataset.dimension = 'archetypes';
      pill.dataset.value = arch;
      pill.addEventListener('click', () => toggleFilter('archetypes', arch, pill));
      archetypeContainer.appendChild(pill);
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

  // SOTD Buttons
  const sotdRefreshBtn = document.getElementById('sotdRefreshBtn');
  if (sotdRefreshBtn) {
    sotdRefreshBtn.addEventListener('click', () => initSotdRecommendation(true));
  }
  const sotdPickerBtn = document.getElementById('sotdPickerBtn');
  if (sotdPickerBtn) {
    sotdPickerBtn.addEventListener('click', () => initSotdRecommendation(true));
  }
}

// Reset All Filters
function resetAllFilters() {
  activeFilters.search = '';
  activeFilters.occasions.clear();
  activeFilters.seasons.clear();
  activeFilters.timesOfDay.clear();
  activeFilters.crgs.clear();
  activeFilters.houses.clear();
  activeFilters.archetypes.clear();

  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';

  document.querySelectorAll('.filter-pill.active').forEach(p => p.classList.remove('active'));
  updateDashboard();
}

// Update Active Filters Display Bar
function updateActiveFiltersBar() {
  const bar = document.getElementById('activeFiltersBar');
  const list = document.getElementById('activeTagsList');
  if (!bar || !list) return;

  const totalActive = activeFilters.occasions.size +
                      activeFilters.seasons.size +
                      activeFilters.timesOfDay.size +
                      activeFilters.crgs.size +
                      activeFilters.houses.size +
                      activeFilters.archetypes.size +
                      (activeFilters.search ? 1 : 0);

  if (totalActive === 0) {
    bar.style.display = 'none';
    list.innerHTML = '';
    return;
  }

  bar.style.display = 'flex';
  list.innerHTML = '';

  const addTag = (text) => {
    const tag = document.createElement('span');
    tag.className = 'occasion-tag';
    tag.style.background = 'var(--gold-glow)';
    tag.style.borderColor = 'var(--gold-primary)';
    tag.style.color = 'var(--gold-light)';
    tag.textContent = text;
    list.appendChild(tag);
  };

  if (activeFilters.search) addTag(`Search: "${activeFilters.search}"`);
  activeFilters.occasions.forEach(o => addTag(`Occasion: ${o}`));
  activeFilters.seasons.forEach(s => addTag(`Season: ${s}`));
  activeFilters.timesOfDay.forEach(t => addTag(`Time: ${t}`));
  activeFilters.houses.forEach(h => addTag(`House: ${h}`));
  activeFilters.crgs.forEach(c => addTag(`CRG: ${c}`));
  activeFilters.archetypes.forEach(a => addTag(`Archetype: ${a}`));
}

// Filter and Sort Pipeline
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

    // Occasion filters (Match if item has ANY of the selected occasions)
    if (activeFilters.occasions.size > 0) {
      const hasOccasion = Array.from(activeFilters.occasions).some(occ => 
        item.occasions && item.occasions.includes(occ)
      );
      if (!hasOccasion) return false;
    }

    // Season filters
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

    // House / Brand
    if (activeFilters.houses.size > 0) {
      if (!activeFilters.houses.has(item.brand)) return false;
    }

    // CRG
    if (activeFilters.crgs.size > 0) {
      if (!activeFilters.crgs.has(item.crg)) return false;
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

// Render Fragrance Grid
function renderFragranceGrid(items) {
  const grid = document.getElementById('fragranceGrid');
  const countEl = document.getElementById('resultsCount');
  if (countEl) countEl.textContent = items.length;
  if (!grid) return;

  grid.innerHTML = '';

  if (items.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <h3>No Fragrances Match These Filters</h3>
        <p>Try resetting some occasions, seasons, or search keywords to view your collection.</p>
        <button onclick="resetAllFilters()" class="btn btn-gold" style="margin-top: 1rem;">Reset Filters</button>
      </div>
    `;
    return;
  }

  items.forEach(item => {
    const card = document.createElement('article');
    card.className = 'fragrance-card';
    card.addEventListener('click', () => openDetailModal(item.id));

    // Bottle Image fallback logic
    const bottleSrc = item.userPhoto || item.image || 'assets/bottles/default-bottle.svg';

    // Accords preview (top 3)
    const topAccordsHtml = (item.mainAccords || []).slice(0, 3).map(acc => `
      <div class="accord-bar-row">
        <span class="accord-name">${acc.name}</span>
        <div class="accord-track">
          <div class="accord-fill" style="width: ${acc.percentage}%; background-color: ${acc.color || 'var(--gold-primary)'};"></div>
        </div>
      </div>
    `).join('');

    // Occasions badges (top 3)
    const occasionsHtml = (item.occasions || []).slice(0, 3).map(occ => `
      <span class="occasion-tag">${occ}</span>
    `).join('');

    // Clone banner
    const cloneHtml = item.isClone && item.cloneOf ? `
      <div class="card-clone-banner">
        Inspired by <strong>${item.cloneOf.originalName}</strong> (${item.cloneOf.similarityScore}% Match)
      </div>
    ` : '';

    // Calculate volume remaining percentage
    const volumePercent = Math.round((item.remainingMl / item.bottleSize) * 100);

    card.innerHTML = `
      <div class="card-visual">
        <div class="card-badges">
          <span class="badge-pp">${item.brand === 'Perfume Parlour' ? `PP #${item.perfumeParlourCode || 'Clone'}` : item.brand}</span>
          <span class="badge-rating">⭐ ${item.rating.toFixed(1)}</span>
        </div>
        <img class="card-bottle-img" src="${bottleSrc}" alt="${item.name}" loading="lazy">
        <span class="card-level-pill">${item.remainingMl} / ${item.bottleSize} ml (${volumePercent}%)</span>
      </div>

      <div class="card-body">
        <div class="card-title-group">
          <span class="card-brand">${item.concentration}</span>
          <h3 class="card-name">${item.name}</h3>
          <div style="display: flex; gap: 0.35rem; align-items: center; margin-top: 0.25rem;">
            <span class="archetype-badge">${item.wardrobeArchetype || 'Signature'}</span>
            <span style="font-size: 0.68rem; color: var(--gold-light); margin-left: auto; font-weight: 600;">🎯 ${item.recommendedSprays || '3-4 Sprays'}</span>
          </div>
        </div>

        ${cloneHtml}

        <div class="accords-preview">
          ${topAccordsHtml}
        </div>

        <div class="card-occasions">
          ${occasionsHtml}
          ${(item.occasions || []).length > 3 ? `<span class="occasion-tag">+${item.occasions.length - 3}</span>` : ''}
        </div>
      </div>

      <div class="card-footer">
        <span>${item.crg || 'Signature Blend'}</span>
        <div class="seasons-dots" title="Spring / Summer / Autumn / Winter affinity">
          <span class="season-dot ${item.seasons?.spring >= 20 ? 'active' : ''}" style="background: var(--accent-spring);" title="Spring"></span>
          <span class="season-dot ${item.seasons?.summer >= 20 ? 'active' : ''}" style="background: var(--accent-summer);" title="Summer"></span>
          <span class="season-dot ${item.seasons?.autumn >= 20 ? 'active' : ''}" style="background: var(--accent-autumn);" title="Autumn"></span>
          <span class="season-dot ${item.seasons?.winter >= 20 ? 'active' : ''}" style="background: var(--accent-winter);" title="Winter"></span>
        </div>
      </div>
    `;

    grid.appendChild(card);
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
  if (totalVolumeEl) totalVolumeEl.textContent = `${totalJuice} ml Total Juice`;

  const cloneCount = collection.filter(c => c.brand === 'Perfume Parlour' || c.isClone).length;
  if (cloneCountEl) cloneCountEl.textContent = cloneCount;

  // Most versatile fragrance based on occasions count
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
    if (versatileScoreEl) versatileScoreEl.textContent = `${maxOccasions} Events & Occasions`;
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

  // Determine current season
  const month = new Date().getMonth(); // 0 to 11
  let currentSeason = 'spring';
  if (month >= 2 && month <= 4) currentSeason = 'spring';
  else if (month >= 5 && month <= 7) currentSeason = 'summer';
  else if (month >= 8 && month <= 10) currentSeason = 'autumn';
  else currentSeason = 'winter';

  // Determine current time of day
  const hour = new Date().getHours();
  const isNight = hour >= 18 || hour < 6;
  const timeKey = isNight ? 'night' : 'day';

  // Score fragrances based on season match, time match, and rating
  const candidates = collection.map(item => {
    const seasonScore = item.seasons?.[currentSeason] || 10;
    const timeScore = item.timeOfDay?.[timeKey] || 30;
    const ratingBonus = (item.rating || 4.5) * 10;
    const totalScore = seasonScore + timeScore + ratingBonus;
    return { item, totalScore };
  }).sort((a, b) => b.totalScore - a.totalScore);

  let picked = candidates[0]?.item;
  if (forceReroll && candidates.length > 1) {
    // Pick from top 3 random
    const pool = candidates.slice(0, 3);
    picked = pool[Math.floor(Math.random() * pool.length)].item;
  }

  if (picked) {
    const titleEl = document.getElementById('sotdTitle');
    const subEl = document.getElementById('sotdSubtitle');
    const inspectBtn = document.getElementById('sotdInspectBtn');

    if (titleEl) titleEl.textContent = picked.name;
    if (subEl) {
      const seasonCapital = currentSeason.charAt(0).toUpperCase() + currentSeason.slice(1);
      const timeCapital = isNight ? 'Evening / Night' : 'Daytime';
      subEl.textContent = `Optimized for ${seasonCapital} ${timeCapital} & ${picked.occasions?.[0] || 'Anytime'}`;
    }

    if (inspectBtn) {
      inspectBtn.onclick = () => openDetailModal(picked.id);
    }
  }
}

// Open Detailed Fragrantica Modal
function openDetailModal(fragranceId) {
  const item = collection.find(c => c.id === fragranceId);
  if (!item) return;

  currentModalFragranceId = fragranceId;
  const modal = document.getElementById('detailModal');
  if (!modal) return;

  // Populate Hero
  const bottleImg = document.getElementById('modalBottleImg');
  if (bottleImg) {
    bottleImg.src = item.userPhoto || item.image || 'assets/bottles/default-bottle.svg';
  }

  document.getElementById('modalTitle').textContent = item.name;
  document.getElementById('modalBrandBadge').textContent = item.brand.toUpperCase();
  document.getElementById('modalConcentrationBadge').textContent = item.concentration.toUpperCase();
  document.getElementById('modalRatingBadge').textContent = `⭐ ${item.rating.toFixed(1)}`;

  // Clone Box
  const cloneBox = document.getElementById('modalCloneBox');
  if (cloneBox) {
    if (item.isClone && item.cloneOf) {
      cloneBox.style.display = 'block';
      cloneBox.innerHTML = `Inspired by <strong>${item.cloneOf.originalName}</strong> by ${item.cloneOf.originalHouse} &bull; ${item.cloneOf.similarityScore}% Match &bull; PP Ref: <span id="modalPpCode">${item.perfumeParlourCode || 'N/A'}</span>`;
    } else {
      cloneBox.style.display = 'none';
    }
  }

  document.getElementById('modalDescription').textContent = item.description || 'Masterpiece formulation from the vault.';
  document.getElementById('modalLongevity').textContent = item.longevity || '8+ Hours';
  document.getElementById('modalSillage').textContent = item.sillage || 'Strong';
  document.getElementById('modalVolume').textContent = `${item.remainingMl} / ${item.bottleSize} ml Remaining`;

  // Populate Accords Bar Chart (Fragrantica Style)
  const accordsList = document.getElementById('modalAccordsList');
  if (accordsList) {
    accordsList.innerHTML = (item.mainAccords || []).map(acc => `
      <div class="accord-bar-row">
        <span class="accord-name" style="width: 90px; font-weight: 600; color: #fff;">${acc.name}</span>
        <div class="accord-track" style="height: 10px;">
          <div class="accord-fill" style="width: ${acc.percentage}%; background-color: ${acc.color || 'var(--gold-primary)'};"></div>
        </div>
        <span style="font-size: 0.7rem; color: var(--text-dim); width: 35px; text-align: right;">${acc.percentage}%</span>
      </div>
    `).join('');
  }

  // Populate Seasons Distribution
  const seasonsList = document.getElementById('modalSeasonsList');
  if (seasonsList) {
    const seasonsData = [
      { name: 'Spring', percent: item.seasons?.spring || 0, color: 'var(--accent-spring)' },
      { name: 'Summer', percent: item.seasons?.summer || 0, color: 'var(--accent-summer)' },
      { name: 'Autumn', percent: item.seasons?.autumn || 0, color: 'var(--accent-autumn)' },
      { name: 'Winter', percent: item.seasons?.winter || 0, color: 'var(--accent-winter)' }
    ];

    seasonsList.innerHTML = seasonsData.map(s => `
      <div class="season-vote-row">
        <span class="season-vote-label">${s.name}</span>
        <div class="season-vote-bar">
          <div class="season-vote-fill" style="width: ${s.percent}%; background-color: ${s.color};"></div>
        </div>
        <span style="font-size: 0.72rem; color: var(--text-dim);">${s.percent}%</span>
      </div>
    `).join('');
  }

  // Populate Notes Pyramid
  const renderNoteBadges = (notesArray, containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = (notesArray || []).map(note => `
      <span class="note-badge">
        <span>${note.icon || '✨'}</span>
        <span>${note.name}</span>
      </span>
    `).join('');
  };

  renderNoteBadges(item.notes?.top, 'modalTopNotes');
  renderNoteBadges(item.notes?.heart, 'modalHeartNotes');
  renderNoteBadges(item.notes?.base, 'modalBaseNotes');

  // Populate Occasions
  const occasionsList = document.getElementById('modalOccasionsList');
  if (occasionsList) {
    occasionsList.innerHTML = (item.occasions || []).map(occ => `
      <span class="occasion-tag" style="background: rgba(212, 175, 55, 0.15); border-color: var(--border-gold); color: var(--gold-light); font-size: 0.75rem; padding: 0.35rem 0.65rem;">
        ${occ}
      </span>
    `).join('');
  }

  // Populate Spray Blueprint (Voj Guide)
  const sprayCountEl = document.getElementById('modalSprayCount');
  if (sprayCountEl) {
    sprayCountEl.textContent = item.recommendedSprays || '3-4 Sprays';
  }

  const sprayZonesEl = document.getElementById('modalSprayZones');
  if (sprayZonesEl) {
    sprayZonesEl.innerHTML = (item.sprayBlueprint || ['Behind Ears', 'Back of Neck', 'Collarbones']).map(zone => `
      <span class="spray-zone-chip">📍 ${zone}</span>
    `).join('');
  }

  // Populate Maceration & Maturation Details (Reddit Wisdom)
  const macerationBadgeEl = document.getElementById('modalMacerationBadge');
  if (macerationBadgeEl) {
    macerationBadgeEl.textContent = item.macerationStatus || 'Matured & Settled';
  }

  const maturationWeeksEl = document.getElementById('modalMaturationWeeks');
  if (maturationWeeksEl) {
    maturationWeeksEl.textContent = `${item.maturationWeeks || 4} Weeks Rested`;
  }

  const macerationTipsEl = document.getElementById('modalMacerationTips');
  if (macerationTipsEl) {
    macerationTipsEl.textContent = item.macerationTips || 'Let rest in a cool dark drawer after 5-10 sprays to harmonize aromatic compounds.';
  }

  // Populate Layering Strategy
  const layeringTipsEl = document.getElementById('modalLayeringTips');
  if (layeringTipsEl) {
    layeringTipsEl.textContent = item.layeringPartner || 'Pair with matching perfume oil on pulse points for 14h+ endurance.';
  }

  modal.classList.add('open');
}

// Handle Bottle Photo Upload in Detail Modal
function handleModalPhotoUpload(e) {
  const file = e.target.files[0];
  if (!file || !currentModalFragranceId) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const dataUrl = event.target.result;
    
    // Update fragrance item in collection
    const item = collection.find(c => c.id === currentModalFragranceId);
    if (item) {
      item.userPhoto = dataUrl;
      saveCollection();

      // Update modal display
      const bottleImg = document.getElementById('modalBottleImg');
      if (bottleImg) bottleImg.src = dataUrl;

      // Update background grid
      updateDashboard();
    }
  };
  reader.readAsDataURL(file);
}

// Handle Add Fragrance Form Submission
function handleAddFragrance(e) {
  e.preventDefault();

  const name = document.getElementById('addName').value.trim();
  const brand = document.getElementById('addBrand').value.trim();
  const ppCode = document.getElementById('addPpCode').value.trim();
  const concentration = document.getElementById('addConcentration').value;
  const bottleSize = parseInt(document.getElementById('addSize').value, 10) || 50;
  const cloneOriginal = document.getElementById('addCloneOriginal').value.trim();
  const cloneHouse = document.getElementById('addCloneHouse').value.trim();
  const occasionsRaw = document.getElementById('addOccasions').value.split(',').map(s => s.trim()).filter(Boolean);
  const accordsRaw = document.getElementById('addAccords').value.split(',').map(s => s.trim()).filter(Boolean);
  const photoInput = document.getElementById('addPhotoInput');

  const newId = `frag-${Date.now()}`;
  const isClone = Boolean(cloneOriginal);

  const mainAccords = accordsRaw.map((acc, idx) => ({
    name: acc,
    percentage: Math.max(90 - idx * 12, 30),
    color: ['#f59e0b', '#854d0e', '#d97706', '#dc2626', '#10b981', '#ec4899'][idx % 6]
  }));

  const newFragrance = {
    id: newId,
    name,
    brand,
    perfumeParlourCode: ppCode || 'Vault Addition',
    isClone,
    cloneOf: isClone ? {
      originalName: cloneOriginal,
      originalHouse: cloneHouse || 'Designer / Niche',
      similarityScore: 92
    } : null,
    concentration,
    bottleSize,
    bottleType: 'Spray',
    remainingMl: bottleSize,
    purchaseSource: brand,
    rating: 4.8,
    gender: 'Unisex',
    crg: 'Curated Vault Addition',
    seasons: { spring: 25, summer: 25, autumn: 25, winter: 25 },
    timeOfDay: { day: 50, night: 50 },
    occasions: occasionsRaw.length > 0 ? occasionsRaw : ['Office / Work', 'Dates', 'Casual'],
    longevity: 'Long Lasting (8h+)',
    sillage: 'Moderate',
    mainAccords: mainAccords.length > 0 ? mainAccords : [{ name: 'Aromatic', percentage: 90, color: '#06b6d4' }],
    notes: {
      top: [{ name: 'Bergamot', icon: '🍋' }],
      heart: [{ name: 'Woody Notes', icon: '🪵' }],
      base: [{ name: 'Amber', icon: '🪨' }]
    },
    description: `Collector addition for ${name} by ${brand}.`,
    image: 'assets/bottles/default-bottle.svg',
    userPhoto: null,
    batchYear: new Date().getFullYear()
  };

  const finalizeSave = () => {
    collection.unshift(newFragrance);
    saveCollection();
    updateDashboard();
    document.getElementById('addBottleModal').classList.remove('open');
    document.getElementById('addFragranceForm').reset();
  };

  // If a photo was attached during add
  if (photoInput && photoInput.files && photoInput.files[0]) {
    const reader = new FileReader();
    reader.onload = (event) => {
      newFragrance.userPhoto = event.target.result;
      finalizeSave();
    };
    reader.readAsDataURL(photoInput.files[0]);
  } else {
    finalizeSave();
  }
}

// Export Inventory to JSON file
function exportInventoryJSON() {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(collection, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `fragrance-atelier-vault-${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

// Handle Import JSON file
function handleImportJSON(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const parsed = JSON.parse(event.target.result);
      if (Array.isArray(parsed) && parsed.length > 0) {
        collection = parsed;
        saveCollection();
        updateDashboard();
        alert(`Successfully imported ${parsed.length} fragrances into your vault!`);
      } else {
        alert('Invalid JSON file format: Expected an array of fragrance items.');
      }
    } catch (err) {
      alert('Error parsing JSON file.');
      console.error(err);
    }
  };
  reader.readAsText(file);
}
