# Fragrance Dashboard ("L'Atelier Olfactif") — Full Multi-Skill Project Audit & Improvement Roadmap

- **Date:** 2026-11-18 UTC
- **Auditor:** Antigravity (`Gemini 4 Argon (High)`)
- **Project Root:** `N:\Otis Projects\Apps & Dev\fragrance-dashboard` (mirrored on `S:\Otis Projects\Apps & Dev\fragrance-dashboard`)
- **Bundle Referenced:** `N:\Otis Projects\AI & Prompts\- Base Prompts and Skill` (read-only)
- **Routing:** `Router (llm-gemini / gemini-flash-lite-latest): parallel_subagents, gemini-4-argon-high:high (conf 0.95) -> used: inline Gemini 4 Argon (High) + deterministic tool fan-out`

---

## 1. Executive Summary & Audit Health Score

We audited the entire **Fragrance Dashboard** repository against the mandatory Web/UI design pipeline (**`UIUX Pro Max → Taste → Impeccable`**) and supporting specialist skills from `- Base Prompts and Skill`:
1. **`ui-ux-pro-max`** (`scripts/search.py --design-system`) — Design system tokens, accessibility, touch targets, and layout rules.
2. **`taste-skill` (`design-taste-frontend` v2.5.1)** (`scripts/copy-lint.mjs` + House Rules) — Anti-slop copy, visual rendering truth, and section rhythm.
3. **`impeccable` (v4.8.2)** (`.agents/skills/impeccable/scripts/impeccable.cmd context` & `detect --json`) — 5-dimension technical audit score (`/20`), Craft Floor verification, and 105 mechanical detector findings.
4. **`web-design-guidelines`** (Vercel 17-category `file:line` compliance review).
5. **`emilkowalski-skills` (`review-animations`, `break-ui`) & `transitions-dev` (`transitions-polish`)** — Motion-token timing, open/close asymmetry, GPU compositor discipline, and worst-case data stress testing.
6. **`seo-ai-visibility` (`scripts/seo_audit.py`) & `claude-seo`** — Crawl/index hygiene, canonical/URL consistency, `Schema.org` structured data, and AI search readiness.
7. **`matt-pocock:codebase-design` & `diagnosing-bugs`** — Deep-module seam architecture, test-suite alignment, and build integrity.

### Impeccable 5-Dimension Audit Health Score

| # | Dimension | Score | Key Finding |
|---|---|---|---|
| 1 | **Accessibility (A11y)** | **2.5 / 4** | Good modal `inert`/focus trap, but 6 skipped heading levels (`<h2>`→`<h4>`), 50 UI labels below `11px` floor (`8px`–`10px`), missing `aria-current="page"`. |
| 2 | **Performance** | **3.0 / 4** | Zero runtime deps, fast static delivery, but 20 `transition: all` declarations, missing `width`/`height` on hero/SOTD/modal `<img>`, no LCP `fetchpriority="high"`. |
| 3 | **Responsive Design** | **2.5 / 4** | No horizontal overflow at `375px`, but `<44px` touch targets (`38.4px` icon buttons, `29px` filter pills) and 10 uncollapsed filter rows (`>1,400px` tall) above the mobile product grid. |
| 4 | **Theming** | **3.0 / 4** | Flash-free Light/Dark toggle, but missing `color-scheme: light dark`, missing `<meta name="theme-color">`, and undefined CSS tokens (`--canvas-bg`, `--font-body`). |
| 5 | **Implementation Integrity** | **1.5 / 4** | **P0 broken working tree** (61 root source/asset files deleted in working copy; 8 of 20 bottle images missing from `public/`), stale Playwright test assertions, 105 Impeccable detector warnings. |
| **Total** | | **12.5 / 20** | **Acceptable (Significant P0/P1 work needed to reach 18+/20 Excellent)** |

### Severity Breakdown
- **P0 Blocking (2):** Deleted root working-tree sources/assets (`npm test` and `npm run build` fail immediately); 8 of 20 bottle images (`40%`) missing from `public/assets/bottles/cropped/`.
- **P1 Major (9):** Stale `test/browser-smoke.js` & `index.html` copy; undefined CSS variables (`--canvas-bg`, `--font-body`); `<44px` touch targets; 50 undersized UI text elements (`<11px`); 6 skipped heading hierarchies; uncollapsed 10-row mobile filter wall; `.html` internal links vs `cleanUrls: true`; missing JSON-LD structured data; single-line minified functions in `js/app.js`.
- **P2 Minor (8):** 20 `transition: all` rules; global `0.01ms` reduced-motion kill; ungated `:hover` transforms on touch; non-animating `display: none` modal transition; `copy-lint` slop word (`"synergy"`) & `0/0/0/0` stat strip; pluralization bugs (`"1 tagged bottles"`, `"1 suggestions"`); clipped descenders in `.sotd-option-name`; `side-tab` (`border-left: 3px`) and `dark-glow` slop patterns.
- **P3 Polish (4):** Interactive layering filters by occasion/season; shared accord visual pills on pairing cards; one-tap `"Log Wear (-0.3ml)"` volume button; `/llms.txt` for AI search visibility.

---

## 2. P0 Blocking Findings — Workspace, Build & Asset Integrity

### [P0-1] Root Source Files & Assets Deleted from Working Tree (`npm test` & `npm run build` Broken)
- **Location:** Project root (`index.html`, `collection.html`, `layering.html`, `occasions.html`, `guide.html`, `css/styles.css`, `js/app.js`, `js/data.js`, `js/inventory.js`, `assets/bottles/cropped/*`, `assets/bottles/studio/*`, `assets/bottles/user_photos/*`)
- **Category:** Implementation Integrity / Build System (`diagnosing-bugs`)
- **Evidence:**
  - `git status --short` reports `D` (deleted) for 61 tracked root files after the 2026-11-06 folder move to `Apps & Dev\fragrance-dashboard`.
  - Running `npm test` crashes immediately: `Error: Cannot find module '../js/inventory.js'`.
  - Meanwhile, `public/` holds the built copies, including the uncommitted 2026-10-30 layering overhaul in `public/js/app.js` (69,573 bytes vs 48,594 bytes in `HEAD`) and `public/layering.html`.
  - **Danger:** If `scripts/build.js` were run without first rescuing `public/js/app.js` and `public/layering.html`, line 22 (`fs.rmSync(output, { recursive: true, force: true })`) would permanently delete the uncommitted 39-pair non-particle layering engine.
- **Recommendation:**
  1. Copy `public/js/app.js` → `js/app.js` and `public/layering.html` → `layering.html`.
  2. Restore all other missing tracked files (`index.html`, `collection.html`, `occasions.html`, `guide.html`, `css/styles.css`, `js/data.js`, `js/inventory.js`, and all 53 photos in `assets/bottles/**`) from `git checkout HEAD -- <paths>`.
  3. Run `npm run build` and `npm test` to verify 100% parity.

### [P0-2] 8 of 20 Owner Bottle Photographs Missing from `public/assets/bottles/cropped/`
- **Location:** `public/assets/bottles/cropped/` and `public/index.html:219`
- **Category:** Visual Integrity (`taste-skill` House Rule #2: *"Every visual renders, never an empty ground"*)
- **Evidence:**
  - `public/assets/bottles/cropped/` only contains 12 JPEG files.
  - 8 seed bottles in `FRAGRANCE_DATABASE` point to missing files in `public/assets/bottles/cropped/`:
    1. `bbw_mahogany_woods.jpg` (`Mahogany Woods`)
    2. `laya_edp.jpg` (`Laya EDP`)
    3. `pp_herb_garden_1598.jpg` (`Herb Garden 1598` — **also hardcoded as `#sotdImg` `src` on `public/index.html:219`!**)
    4. `pp_intense_aroma_exploding.jpg` (`Intense Aroma Exploding`)
    5. `pp_intenso_water.jpg` (`Intenso Water 1329`)
    6. `pp_leaf_flavour_0401.jpg` (`Leaf Flavour 0401`)
    7. `pp_sweet_water.jpg` (`Sweet Water 1262`)
    8. `pp_wood_miracle.jpg` (`Wood Miracle 1872`)
- **Impact:** 40% of the collection cards and the default Scent of the Day image fail with HTTP 404 and fall back to `default-bottle.svg`.
- **Recommendation:** Restore all 20 cropped images from Git `HEAD` (`54bdef3`) into `assets/bottles/cropped/` and run `npm run build`.

---

## 3. P1 Major Findings — UI/UX, Accessibility, SEO & Architecture

### [P1-1] Stale Browser Smoke Test Assertions & Home Layering Copy Drift
- **Location:** `test/browser-smoke.js:91-101`, `public/index.html:487`
- **Category:** Test Integrity / Content Truth (`BOOT.md` §7)
- **Evidence:**
  - `test/browser-smoke.js:92`: Asserts `.duo-editorial-card` count is `4`, whereas `CURATED_SIGNATURE_DUOS` now renders **30** non-particle curated pairs.
  - `test/browser-smoke.js:95-97`: Selects `user-pp-navy-intense-0061` and asserts `.companion-rank-card` count is `0` (`Navy Intense` now has **4** companions rated 92–94).
  - `test/browser-smoke.js:99`: Selects `user-after-effect-fa-paris` and asserts `.companion-rank-card` count is `3` (it now has **6** companions).
  - `public/index.html:487`: Still states *"Explore four editorial layering ideas..."* instead of reflecting the 30 curated combinations.
- **Recommendation:** Update `test/browser-smoke.js:91-101` to assert `30` curated cards, `4` companions for `Navy Intense`, `6` for `After Effect`, and `0` particle companions; update `index.html:487`.

### [P1-2] Undefined CSS Custom Properties (`--canvas-bg` and `--font-body`)
- **Location:** `public/css/styles.css:2047`, `2187`, `2366`
- **Category:** Theming / Token Integrity (`impeccable` Dimension 3)
- **Evidence:**
  - `css/styles.css:2047`: `.page-hero-banner` uses `background: radial-gradient(circle at 50% 0%, var(--canvas-surface) 0%, var(--canvas-bg) 75%);` — `--canvas-bg` is undefined (the token is `--canvas-base`).
  - `css/styles.css:2187` (`.vault-sort-select`) and `css/styles.css:2366` (`.base-selector-dropdown`): Use `font-family: var(--font-body);` — `--font-body` is undefined (the token is `--font-sans`).
- **Recommendation:** Replace `var(--canvas-bg)` with `var(--canvas-base)` and `var(--font-body)` with `var(--font-sans)`.

### [P1-3] Touch Targets Below 44×44px Floor Across Navigation, Modals & Filter Pills
- **Location:** `public/css/styles.css:374-376`, `1708-1709`, `1973-1974`, `2128-2131`, `2657`
- **Category:** Touch & Interaction (`ui-ux-pro-max` Priority 2 & `taste-skill` `[tap-size]`)
- **Evidence:**
  - `.theme-toggle-btn`, `.mobile-menu-toggle`, and `.modal-close-btn` are `2.4rem × 2.4rem` (`38.4px × 38.4px`).
  - `.filter-chip-btn` (`padding: 0.42rem 1rem; font-size: 0.8rem`) renders at `~29px` tall with `0.5rem` (`8px`) gap.
  - `.status-dismiss-btn` (`padding: 0.15rem 0.4rem`) renders at `~24px × 24px`.
- **Recommendation:** Increase icon buttons to `2.75rem × 2.75rem` (`44px × 44px`), set `min-height: 44px` (or `2.5rem` on desktop, `2.75rem` on `@media (pointer: coarse)`) on `.filter-chip-btn` and `.status-dismiss-btn`. (Suggested command: `$impeccable adapt`).

### [P1-4] 50 Instances of Functional UI Text Below the 11px Legibility Floor (`undersized-ui-text`)
- **Location:** `public/css/styles.css:157, 332, 671, 769, 810, 925, 963, 992, 1139, 1257, 1461, 1498, 1930, 2110, 2209, 2230, 2688`
- **Category:** Typography & Legibility (`impeccable` Craft Floor & Detector `undersized-ui-text`)
- **Evidence:**
  - `impeccable detect` flagged 50 instances across all 5 pages where functional labels use `8px`, `9px`, or `10px`:
    - `8px`: `.brand-subtitle` on mobile (`styles.css:2688`), `.sotd-option-active-badge` (`styles.css:925`)
    - `9px`: `.brand-subtitle` (`styles.css:332`), `.sotd-season-badge-tag` (`styles.css:769`), `.sotd-layering-flacon-role` (`styles.css:1139`)
    - `10px`: `.eyebrow-pill` (`styles.css:157`), `.triad-tier-label` (`styles.css:671`), `.sotd-quick-layer-badge` (`styles.css:992`), `.world-badge-code` (`styles.css:1257`), `.boutique-brand-name` (`styles.css:1461`), `.boutique-concentration-badge` (`styles.css:1498`), `.footer-card-btn-url` (`styles.css:1930`), `.filter-group-label` (`styles.css:2110`), `.active-filter-badge` (`styles.css:2209`).
- **Recommendation:** Establish a strict `--font-size-xs: 0.6875rem` (`11px`) floor for all micro-labels and badges, and `0.75rem` (`12px`) for secondary metadata. (Suggested command: `$impeccable typeset`).

### [P1-5] 6 Skipped Heading Levels Across All 5 Pages (`skipped-heading`)
- **Location:** `public/index.html:547->565`, `public/collection.html:107->148` & `171->189`, `public/layering.html:188->206`, `public/occasions.html:141->159`, `public/guide.html:139->157`
- **Category:** Accessibility (`ui-ux-pro-max` Priority 1, `web-design-guidelines`, `impeccable` Detector)
- **Evidence:**
  - Inside `#detailModal` on all 5 pages, `<h2 class="modal-flacon-name" id="modalTitle">` is followed by `<h4 class="modal-section-title">` (skipping `<h3>` whenever `#modalInventoryDetails` has not yet injected its `<h3>Accord profile</h3>`, or appearing as sibling `<h4>`s outside the `<h3>` scope).
  - On `collection.html`, `<h1 class="page-hero-title">ALL FRAGRANCES</h1>` is followed directly by `<h3 class="inventory-toolbar-title">Collection Data & Backup</h3>` because the catalog section (`collection.html:114`) has no `<h2>` and bottle cards use `<span class="boutique-fragrance-name">`.
- **Recommendation:** Change `<h4 class="modal-section-title">` to `<h3 class="modal-section-title">` across all 5 pages, and add a visually-hidden `<h2 class="sr-only">Fragrance Catalog</h2>` (or change `.inventory-toolbar-title` to `<h2>`) on `collection.html`, `layering.html`, `occasions.html`, and `guide.html`.

### [P1-6] Uncollapsed 10-Row Filter Matrix on Mobile Consumes >1,400px Above the Product Grid
- **Location:** `public/collection.html:115`, `public/css/styles.css:2089-2152`
- **Category:** Mobile UX & Progressive Disclosure (`ui-ux-pro-max` Priority 5 & 8)
- **Evidence:**
  - `collection.html` renders all 10 filter rows (`Occasion`, `Scent Profile`, `Season`, `Time of Day`, `Bottle Type`, `Brand`, `Concentration`, `Wardrobe Archetype`, `Longevity`, `Sillage`) expanded simultaneously.
  - On mobile (`375px`), users must scroll past ~2.5 full screens of filter chips before seeing the search bar or a single fragrance card, and cannot see the grid update as they tap filters at the top.
- **Recommendation:** Keep primary filters (`Occasion`, `Season`, `Scent Profile`) + Search/Sort visible at the top, and group secondary facets (`Time of Day`, `Bottle Type`, `Brand`, `Concentration`, `Wardrobe Archetype`, `Longevity`, `Sillage`) inside a collapsible `<details class="advanced-filters-drawer"><summary>More Filters (7)</summary>...</details>` disclosure with an active-filter count badge. (Suggested command: `$impeccable distill`).

### [P1-7] Internal Navigation Uses `.html` Extensions While `vercel.json` & Canonicals Use Clean URLs
- **Location:** All 5 HTML files (`nav`, `footer`, CTAs) and `public/js/app.js:581`
- **Category:** Technical SEO (`seo-ai-visibility`, `claude-seo:seo-technical`)
- **Evidence:**
  - `vercel.json:3` enables `"cleanUrls": true`, and `<link rel="canonical">` + `sitemap.xml` use `/`, `/collection`, `/occasions`, `/layering`, `/guide`.
  - However, all internal `<a href="...">` links point to `index.html`, `collection.html`, `occasions.html`, `layering.html`, `guide.html`, causing unnecessary redirect hops on production and URL mismatch in browser history.
- **Recommendation:** Standardize internal links or update the local dev server / `verify-source.js` link checker to support clean URLs alongside `.html` resolution.

### [P1-8] Missing `Schema.org` JSON-LD Structured Data & Image Dimensions (`seo_audit.py`)
- **Location:** All 5 HTML `<head>` blocks; `public/index.html:161, 219, 560`; `collection.html:184`; `layering.html:201`; `occasions.html:154`; `guide.html:152`
- **Category:** SEO & CLS Performance (`seo-ai-visibility`, `claude-seo:seo-schema`, `web-design-guidelines`)
- **Evidence:**
  - `seo_audit.py` flagged `IMG_DIMENSIONS_MISSING` on all 5 pages (`#modalBottleImg` lacks `width` and `height`), and `index.html:161` (`.hero-flacon-img`) + `index.html:219` (`#sotdImg`) also lack explicit `width`/`height` and `fetchpriority="high"`.
  - Zero `application/ld+json` blocks exist on any page.
- **Recommendation:**
  1. Add `width="320" height="380" fetchpriority="high"` to `.hero-flacon-img`, `width="280" height="380"` to `#sotdImg`, and `width="220" height="280"` to `#modalBottleImg` on all 5 pages.
  2. Add truthful `Schema.org` JSON-LD (`WebSite` + `CollectionPage` + `Person` on `index.html`, `ItemList` on `collection.html`, `HowTo`/`Article` on `guide.html`).

### [P1-9] Single-Line Minified Functions in `js/app.js` Impair Maintainability & Seam Testing
- **Location:** `public/js/app.js:463-675`
- **Category:** Software Architecture (`matt-pocock:codebase-design`)
- **Evidence:**
  - Lines 463–675 pack 20+ functions (including a 3,200-character `openDetailModal` HTML template and a 2,800-character `initInventoryManager` submit handler) into single unformatted lines, mixing domain calculations (`calculatePairingSynergy`, `getInSeasonCandidates`, `filteredCollection`) with raw DOM manipulation.
  - Because `js/app.js` executes top-level DOM queries and has no module export seam, `test/app.test.js` has to load `js/app.js` as a raw string into `node:vm` (`vm.runInContext(app, sandbox)`).
- **Recommendation:** Format `js/app.js` with clean multi-line indentation and expose a UMD/CommonJS seam (just like `js/inventory.js:162` does via `if (typeof module !== 'undefined' && module.exports)`) exporting the pure domain functions (`isParticleOrMolecular`, `calculatePairingSynergy`, `getTopLayeringOptionsForFragrance`, `getInSeasonCandidates`, `filteredCollection`, `scentMatches`).

---

## 4. P2 Minor Findings — Motion, Copy, Edge Cases & Craft Polish

### [P2-1] 20 `transition: all` Declarations & Non-Animating Modal Open/Close (`review-animations` & `transitions-polish`)
- **Location:** `public/css/styles.css:187, 299, 360, 385, 750, 902, 984, 1051, 1074, 1244, 1360, 1383, 1419, 1529, 1718, 1867, 1893, 2138, 2330, 2406` and `1659-1677`
- **Category:** Animation & Motion Craft (`emilkowalski-skills:review-animations`, `transitions-dev:transitions-polish`, `web-design-guidelines`)
- **Evidence:**
  - 20 CSS rules use `transition: all ...`, animating layout/paint properties instead of explicit GPU-composited `transform`, `opacity`, `background-color`, `border-color`, `color`, `box-shadow`.
  - `.modal-overlay` (`styles.css:1666-1677`) switches `display: none` ↔ `display: flex`, which cancels the `opacity 0.3s ease` transition unless `@starting-style` and `transition-behavior: allow-discrete` are used.
  - Per `transitions-polish`, modal open should use `--duration-fast` (`250ms`) with `scale(0.96) -> 1` and `--ease-smooth-out` (`cubic-bezier(0.22, 1, 0.36, 1)`), while modal close should use asymmetric `--duration-quick` (`150ms`).
- **Recommendation:** Import semantic motion tokens (`--duration-quick: 150ms`, `--duration-fast: 250ms`, `--ease-smooth-out: cubic-bezier(0.22, 1, 0.36, 1)`), replace all 20 `transition: all` rules with explicit property lists, and gate `:hover` transforms behind `@media (hover: hover) and (pointer: fine)`.

### [P2-2] Global `0.01ms` Reduced-Motion Kill Destroys State Feedback
- **Location:** `public/css/styles.css:2702-2704`
- **Category:** Accessibility & Motion (`impeccable` Audit §1, `review-animations` Standard #8)
- **Evidence:** `*, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }` kills color/opacity focus and active state transitions.
- **Recommendation:** Disable spatial movement (`transform: none !important; scroll-behavior: auto !important;`) under `prefers-reduced-motion: reduce` while keeping a gentle `150ms` `opacity`/`background-color`/`border-color` transition.

### [P2-3] `taste-skill` Copy-Lint Failures & Warnings (`layering.html`, `index.html`, `guide.html`)
- **Location:** `public/layering.html:109`, `public/index.html:121, 162, 194, 199, 204, 209, 472`, `public/guide.html:113`
- **Category:** UX Copy & Visual Rules (`taste-skill` `copy-lint.mjs`)
- **Evidence:**
  - `FAIL copy-slop-word` (`layering.html:109`): Uses `"synergy"` in `"Curated layering combinations with 90%+ scent synergy"`.
  - `WARN copy-stat-strip` (`index.html:194-209`): Hardcodes `0 / 0 / 0 / 0` in the 4 seasonal buttons and `0 Bottles` in hero/teaser badges before JS runs.
  - `WARN copy-contrast` (`guide.html:113`): 3 `"X, not Y"` / `"rather than"` contrast frames in one section (budget is 2).
  - Taste House Rule #1 (`index.html:162`): `.hero-frame-caption` (`"Featured Bottle // French Avenue After Effect"`) sits inside the image frame below the bottle photo, and duplicates the SOTD bottle when Autumn evening is active.
- **Recommendation:** Replace `"scent synergy"` with `"compatibility"` or `"shortlisted ratings"`, pre-render accurate seed counts (`20` bottles, `12 / 12 / 11 / 7` seasonal counts) in static HTML, rewrite one contrast sentence in `guide.html` into a direct positive statement, and remove `.hero-frame-caption`.

### [P2-4] Worst-Case Data & Pluralization Bugs (`emilkowalski-skills:break-ui`)
- **Location:** `public/js/app.js:521, 585, 596`, `public/css/styles.css:954-958, 1318-1321`
- **Category:** Edge-Case Resilience (`break-ui`)
- **Evidence:**
  1. **Pluralization (`app.js:521, 585`):** Renders `"1 tagged bottles"` and `"1 suggestions at 90/100 or above"` when count is `1`.
  2. **Clipped Descenders (`styles.css:954-958`):** `.sotd-option-name` sets `line-height: 1.25; -webkit-line-clamp: 2; height: 2.1em;` — `2 × 1.25em = 2.5em`, so `2.1em` slices off the bottom of `g`, `y`, `p` on line 2.
  3. **Truncated Thumbnail Labels Without Tooltip (`styles.css:1318-1321`):** `.world-flacon-thumb-name` truncates at `90px` with `text-overflow: ellipsis` and no `title` attribute on the button.
  4. **Null Accord Percentage Meter (`app.js:596`):** Renders `<meter value="0">` next to `"Unknown"` when a custom accord is saved without a percentage.
- **Recommendation:** Use singular/plural helper (`count === 1 ? '1 tagged bottle' : `${count} tagged bottles``), change `.sotd-option-name` `min-height: 2.5em; height: auto;`, add `title="${h(i.name)}"` to thumbnail buttons, and omit `<meter>` when `a.percentage == null`.

### [P2-5] Impeccable Craft Floor Slop Patterns (`side-tab`, `dark-glow`, `kicker-above-heading`)
- **Location:** `public/css/styles.css:170, 527, 917, 2255, 2488`
- **Category:** Visual Craft (`impeccable` `reference/craft-floor.md`)
- **Evidence:**
  - `.scentscape-realm-header` (`border-left: 3px solid var(--gold-primary)`) and `.codex-lead-quote` (`border-left: 2px solid var(--gold-primary)`) trigger 12 `side-tab` warnings (`craft-floor.md`: *"Refuse: A colored border-left or border-right above 1px"*).
  - `.eyebrow-pill-dot` (`box-shadow: 0 0 8px var(--gold-primary)`) and `.hero-stage-aura` trigger `dark-glow` / `radial-spotlight-glow` warnings (`craft-floor.md`: *"A zero-offset colored halo is decoration"*).
- **Recommendation:** Replace `3px` left borders with a `1px` subtle rule or spacing hierarchy, and replace zero-offset chromatic glows with physical offset elevation shadows. (Suggested commands: `$impeccable quieter`, `$impeccable polish`).

### [P2-6] Web Interface Guidelines Micro-Violations (`web-design-guidelines`)
- **Location:** `public/collection.html:132`, `public/layering.html:135`, `public/js/app.js:538-546`, `public/css/styles.css:102, 443, 1680, 1990`
- **Category:** Web Interface Guidelines Compliance
- **Evidence:**
  - `collection.html:132`: `placeholder="Search by name, note, or clone..."` uses `...` instead of `…`, and `type="text"` instead of `type="search" autocomplete="off" spellcheck="false"`.
  - `layering.html:135`: Uses `style="display: none;"` instead of the `hidden` attribute.
  - `js/app.js:538-546`: `initSotdControls()` injects bare `<label>` + `<select>` elements directly after `#sotdSeasonNav` without a `.sotd-filter-controls` flex wrapper.
  - `css/styles.css`: Missing `color-scheme: light` / `[data-theme="dark"] { color-scheme: dark; }`, missing `text-wrap: balance` on headings, missing `font-variant-numeric: tabular-nums` on numeric counters/scores, and missing `overscroll-behavior: contain` on `.modal-dossier-card` and `.mobile-drawer-overlay`.

---

## 5. P3 High-Value Feature Enhancements (Next-Level Product Roadmap)

1. **[P3-1] Interactive Layering Filter Bar on `layering.html` ("Recommended Combos" View)**
   - **Why:** With 30 non-particle curated pairs now rendered in `#layeringDuosContainer`, users scroll through a long wall of 30 cards mixing winter nightcap bombs (*After Effect + Noire Illusion*) with summer gym/daytime freshies (*Intenso Water + Sweet Water*).
   - **Feature:** Add filter chips above `#layeringDuosContainer`: **`All (30)`**, **`Daytime & Fresh`**, **`Date Night & Evening`**, **`Office & Smart Casual`**, **`Autumn & Winter`**, **`Spring & Summer`** (computed automatically from the base + companion bottles' `occasions`, `timeOfDay`, and `seasons` scores!).
2. **[P3-2] Shared & Complementary Accord Pills on Layering Cards**
   - **Why:** Users want to see *at a glance* why two bottles work together.
   - **Feature:** On each pairing card (`layering.html` and `index.html`), render 2–3 compact accord pills showing shared accords (e.g., `Shared: Woody · Warm Spicy`) and bridge notes.
3. **[P3-3] One-Tap "Log Wear (-0.3ml / 3 Sprays)" Button in Bottle Details Modal**
   - **Why:** Updating remaining volume currently requires typing a decimal number or dragging a tiny slider.
   - **Feature:** Add a `"Log Wear (-0.3ml)"` quick-action button next to `Save volume` in `openDetailModal()` that decrements `remainingMl` by `0.3ml` (approx. 3 sprays) and saves immediately.
4. **[P3-4] Weather/Context Quick-Picker in SOTD ("What's the Plan Today?")**
   - **Why:** As seen in real usage (e.g. *"walk + shopping in Birmingham in 11–13°C damp autumn"* or *"walk + gym"*), users often combine **two occasions** (e.g. `Walking` + `Gym`, or `Walking` + `Malls / City Centre`).
   - **Feature:** Allow selecting a primary + secondary occasion in the SOTD recommender (or a `"Transition Mode: Activity 1 → Activity 2"` selector) that ranks single bottles and non-particle layerings matching both activities!

---

## 6. Recommended Execution Plan (Tracer-Bullet Tickets)

| Ticket | Priority | Scope | Blocked By | Verification Gate |
|---|---|---|---|---|
| **T1: Restore Working Tree & Assets** | **P0** | Rescue `public/js/app.js` & `public/layering.html` to root; restore deleted root HTML/CSS/JS and all 53 `assets/bottles/**` from Git `HEAD`; rebuild `public/` with all 20 cropped bottle photos. | None | `npm test`, `npm run build`, `node scripts/verify-source.js` |
| **T2: Align Smoke Tests & Copy Truth** | **P1** | Update `test/browser-smoke.js` for 30 curated pairs & non-particle companion counts; fix `index.html:487`, `layering.html:109` (`copy-lint` `"synergy"`), `guide.html:113`, and static seed counts (`20`, seasonal counts). | T1 | `node copy-lint.mjs` (`0 FAIL, 0 WARN`), `npm test` |
| **T3: UIUX Pro Max + Impeccable Craft & A11y Pass** | **P1/P2** | Fix `--canvas-bg`/`--font-body` tokens, `>=11px` text floor, `>=44px` touch targets, heading hierarchy (`<h2>`→`<h3>`), `aria-current="page"`, `aria-hidden="true"` on decorative SVGs, `color-scheme`, `theme-color`, `tabular-nums`, `text-wrap: balance`, `overscroll-behavior: contain`, and mobile collapsible filter drawer on `collection.html`. | T1 | `impeccable.cmd detect --json`, `web-design-guidelines` |
| **T4: Motion Polish (`transitions-polish` & `review-animations`)** | **P2** | Add `:root` motion tokens, replace all 20 `transition: all` rules, implement `@starting-style` modal open (`250ms`)/close (`150ms`) asymmetry, gate `:hover` transforms with `@media (hover: hover)`, and refine `prefers-reduced-motion`. | T3 | Visual & CSS verification |
| **T5: Edge-Case Hardening & SEO (`break-ui` & `seo-ai-visibility`)** | **P1/P2** | Fix singular/plural strings, `.sotd-option-name` descender clipping, image `width`/`height`/`fetchpriority`, `hidden` attribute on `layering.html`, and add `Schema.org` JSON-LD across all 5 pages. | T2, T3 | `python seo_audit.py --source public`, `npm test` |
| **T6: Feature Upgrades & Deep-Module Seam (`codebase-design`)** | **P3** | Format `js/app.js` cleanly, export testable domain seam, add Occasion/Season filter chips on `layering.html`, shared accord pills on pairing cards, and one-tap `"Log Wear (-0.3ml)"` button. | T5 | `npm test`, `test/browser-smoke.js`, `npm run build` |
