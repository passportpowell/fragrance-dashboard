# Implementation Plan — Fragrance Dashboard (Fragrantica-Style)

## Goal
Build an ultra-luxurious, responsive Fragrance Dashboard tailored for fragrance collectors, featuring bottles from Perfume Parlour, designer houses, niche brands, and Middle Eastern perfumeries. The dashboard replicates and enhances Fragrantica's core analytical tools (accords breakdown, note pyramid, seasonal/time distributions, sillage/longevity meters) while offering multi-dimensional filtering by Occasion (Wedding, Office/Work, Gym, Parks, City Centre, Malls, Dates, etc.), Season, Time of Day, Note, Clone Reference (CRG), and inventory management with bottle photo upload/preview.

## Scope
- **Interactive Dashboard UI**:
  - Dark luxury obsidian & warm champagne gold editorial styling.
  - Fragrantica-inspired Accord Breakdown bars with signature accord colors (Citrus, Woody, Amber, Warm Spicy, Fresh Spicy, Sweet, Vanilla, Aromatic, Fruity, Leather, Marine/Aquatic, etc.).
  - Detailed Note Pyramid: Top, Heart/Middle, and Base notes with visual icons.
  - Multi-factor filtering:
    - Season: Spring, Summer, Autumn, Winter.
    - Time of Day: Day, Night.
    - Occasion / Event: Wedding, Office / Work, Gym, Parks, City Centre, Malls, Dates / Date Night, Evening / Clubbing, Casual Outing.
    - Clone / Original / CRG classification: Clone vs Original, Inspired By (e.g. Creed Aventus, MFK Baccarat Rouge 540, Kilian Angels' Share, etc.), Perfume Parlour item codes, Concentration (Extrait, EDP, Oil, EDT).
    - Longevity & Sillage tiers.
    - Scent Family / Main Accords / Specific Notes search.
  - SOTD (Scent of the Day) & Recommendation Engine: "What should I wear?" based on event, season, and time of day.
  - Inventory & Bottle Tracking: Bottle size (ml), volume remaining slider/meter, format (Spray, Roll-on Oil, Extrait), purchase source (Perfume Parlour, Niche, Designer).
  - Bottle Photo Integration: Clean dedicated folder `assets/bottles/` with sleek high-res fallback renders, plus interactive in-browser bottle photo uploader/preview for bottles the user photographs.
  - Export & Import JSON inventory so the user's edits, new additions, and photo links persist cleanly.
  - Mandatory footer with GitHub icon linking to `https://www.passportpowell.com/card` (`target="_blank" rel="noopener noreferrer"`).

## Out of Scope
- Server-side database backend required to run (the application will be completely zero-dependency and runnable directly in any browser via client-side storage + static server or file load, with automated JSON data validation).

## Deliverables
1. `index.html`: Main dashboard application with responsive layout, filter sidebar, search, SOTD recommendation widget, stats bar, and fragrance grid.
2. `css/styles.css`: Luxury editorial styling with CSS variables, accord color maps, glassmorphism, smooth animations.
3. `js/data.js`: Rich seed dataset of popular Perfume Parlour clones and iconic fragrances, including accords, note pyramids, occasions, seasons, clone mappings, and bottle specs.
4. `js/app.js`: Filtering engine, search, drawer/modal detail renderer, SOTD picker, inventory manager, image upload handler, and JSON import/export.
5. `assets/bottles/`: Dedicated image directory with SVG luxury bottle renders and placeholders ready for user photos.
6. `test/validate-inventory.js`: Automated schema & integrity validator for the fragrance database.
7. Protocol docs: `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `SHARED_NOTES.md`, `docs/HANDOFF.md`, `docs/ACTIVE.md`, `docs/PLAN.md`.

## Acceptance Criteria
- [ ] Responsive, ultra-clean UI matching modern luxury fragrance aesthetics.
- [ ] Real-time filtering by Season, Time of Day, Occasion, Notes, Accords, and Clone details.
- [ ] Fragrantica-style note pyramid and visual accord breakdown bars for each fragrance.
- [ ] User can inspect details in an interactive modal with full accords, notes, performance, and clone info.
- [ ] User can add new bottles or edit existing bottles, including uploading photos of their bottles.
- [ ] User can export/import the inventory database to JSON.
- [ ] SOTD "Scent of the Day" recommendation tool works dynamically based on current season/occasion.
- [ ] Mandatory GitHub footer link to `https://www.passportpowell.com/card` is present with GitHub icon.
- [ ] Automated validation test passes cleanly.
