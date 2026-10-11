# Handover Notes — Otis Powell Fragrance Collection

- **Project**: Otis Powell Fragrance Collection (`fragrance-dashboard`)
- **Author / Curator**: Otis Powell
- **Updated At**: 2026-10-12
- **Root Directory**: `S:\Otis Projects\fragrance-dashboard`
- **GitHub Repository**: [`passportpowell/fragrance-dashboard`](https://github.com/passportpowell/fragrance-dashboard)
- **Git Branches**: `master` (default) and `main`
- **Live Vercel Production URL**: [https://fragrance-dashboard.vercel.app](https://fragrance-dashboard.vercel.app)
- **Tailscale HTTPS Endpoint**: `https://desktop-smsroim.tail0be63c.ts.net/` (proxying `127.0.0.1:62872`)
- **Local Dev Server**: `http://127.0.0.1:62872` (Python HTTP server daemon)

---

## 1. Project Overview
A multi-page website showcasing Otis Powell's personal collection of 20 fragrances. Built with pure semantic HTML5, CSS3, and vanilla JavaScript without heavy framework dependencies.

Key highlights:
- **Default Light Mode** with persistent Dark Mode toggle.
- **Natural, Plain English Nomenclature**: Simple, clear terms used everywhere: "Home", "All Fragrances", "Occasions", "Layering", and "Guide".
- **Zero Emojis**: 100% SVG vector iconography throughout the entire codebase.
- **Dedicated Multi-Page Architecture**: 5 dedicated pages with clean URLs, complete SEO metadata, Open Graph preview tags, and vector flacon favicons.
- **Permanent 308 Redirects**: Legacy URLs (`/vault`, `/scentscapes`, `/codex`) redirect seamlessly to `/collection`, `/occasions`, and `/guide` via `vercel.json`. Duplicate mirror files have been removed.
- **Mandatory Footer Link**: GitHub icon linking to `https://www.passportpowell.com/card` (`target="_blank" rel="noopener noreferrer"`).

---

## 2. Multi-Page Structure & Sitemap

| Page | File | URL Route | Purpose |
| :--- | :--- | :--- | :--- |
| **Home** | `index.html` | `/` | Editorial hero showcase, seasonal Scent of the Day recommendation engine (matched strictly to time of year, with interactive in-season options picker), and 6 preview cards for occasions (including Gym). |
| **All Fragrances** | `collection.html` | `/collection` | Complete 20-bottle catalog with 7 multi-dimensional filter rows, live search, sort options, and bottle detail modal. |
| **Occasions** | `occasions.html` | `/occasions` | "When to Wear" guide with complete bottle lists for **Gym & Workouts**, **Running**, **Walking**, **Work / Office**, **Dates & Evenings**, and **Weddings & Special Events**. |
| **Layering** | `layering.html` | `/layering` | 6 hand-tested signature combinations in plain English plus an interactive pairing calculator ranking all 19 partner bottles with compatibility percentages, molecular primer boosts, and spray sequencing. |
| **Guide** | `guide.html` | `/guide` | Practical advice covering the Voj anti-noseblind routine, bottle maceration, Extrait vs EDP vs Body Spray concentrations, proper bottle storage, and transparent single-molecule primers. |

*(Note: Clean URLs are enabled in `vercel.json` alongside 308 permanent redirects for legacy paths `/vault`, `/scentscapes`, and `/codex`).*

---

## 3. Physical Bottle Matching & Packaging Verification

Every fragrance in `js/data.js` has been matched against real shelf photos and official manufacturer packaging specifications (including distinguishing Perfume Parlour Extrait bottles from Eau de Parfum flacons and travel sprays):

1. **Perfume Parlour Extrait de Parfum Formats**:
   - `Wood Miracle (1872)`: 50ml Faceted Black Flacon with heavy black wooden cap (Extrait de Parfum, 20-25% oil concentration).
   - `Intense Aroma Exploding`: 50ml Black Flacon with metallic gold foil label (Extrait de Parfum).
2. **Perfume Parlour Clear Glass Eau de Parfum Formats**:
   - `Particle (ISO E-SUPER)`: 50ml Clear Glass Flacon with silver atomiser (Eau de Parfum, 46ml remaining).
   - `Herb Garden (1598)`: 50ml Clear Glass Flacon with silver atomiser (Eau de Parfum, 46ml remaining).
   - `Astray Fruit (1947)`: 30ml Clear Glass Flacon with white minimalist label (Eau de Parfum).
   - `Leaf Flavour (0401)`: 30ml Clear Glass Flacon with white minimalist label (Eau de Parfum).
   - `Noire Illusion (1746)`: 30ml Clear Glass Flacon with white minimalist label (Eau de Parfum).
   - `Second Particle (1980)`: 30ml Clear Glass Flacon with white minimalist label (Eau de Parfum).
3. **Perfume Parlour Cylindrical Travel Sprays**:
   - `Citrus Particle (0616)`: 13ml Cylindrical Travel Spray (Eau de Parfum, 12ml remaining).
4. **Perfume Parlour Opaque Black Eau de Parfum Formats**:
   - `Navy Intense (0061)`: 50ml Black Flacon (Eau de Parfum).
   - `Intenso Water (1329)`: 30ml Black Flacon (Eau de Parfum).
   - `Sweet Water`: 50ml Black Flacon with gold lettering (Eau de Parfum).
5. **Designer & Clones Studio Packshots Verified**:
   - **Voux Elegante (`assets/bottles/studio/voux_elegante.jpg`)**: Authentic Paris Corner Emir Voux Elegante heavy glass flacon and presentation box.
   - **Tom Ford Oud Wood (`assets/bottles/studio/tf_oud_wood.jpg`)**: Authentic Tom Ford Oud Wood All Over Body Spray (150ml matte aerosol can).
   - **Lynx Signature Oud Wood & Dark Vanilla (`assets/bottles/studio/lynx_oud_vanilla.jpg`)**: Authentic Lynx Signature Daily Fragrance 100ml precision pump bottle.
   - **After Effect (`assets/bottles/studio/fa_after_effect.jpg`)**: Authentic FA Paris / French Avenue 80ml Extrait de Parfum flacon.
   - **Laya (`assets/bottles/studio/neemah_laya.jpg`)**: Authentic Ne'emah 100ml frosted glass EDP flacon.

---

## 4. Complete Fragrance Database (20 Bottles)

| # | Name | Brand | Concentration | Packaging / Bottle Format | Key Occasions |
| :-: | :--- | :--- | :--- | :--- | :--- |
| 1 | **After Effect** | French Avenue / FA Paris | Extrait de Parfum | 80ml Luxury Flacon (Extrait de Parfum) | Dates, Evenings, Winter |
| 2 | **Navy Intense (0061)** | Perfume Parlour | Eau de Parfum | 50ml Black Flacon (Eau de Parfum) | Office, Casual, Walking |
| 3 | **Voux Elegante** | Paris Corner / Emir | Eau de Parfum | 100ml Heavy Glass Flacon (Eau de Parfum) | Office, Dates, Weddings |
| 4 | **Noir Extreme** | Tom Ford | Eau de Parfum | 100ml Designer Flacon (Eau de Parfum) | Dates, Winter, Evenings |
| 5 | **Intense Aroma Exploding** | Perfume Parlour | Extrait de Parfum | 50ml Black Flacon with Gold Label (Extrait de Parfum) | Winter, Evenings, Formal |
| 6 | **Laya (Eau de Parfum)** | Ne'emah | Eau de Parfum | 100ml Frosted Flacon (Eau de Parfum) | Walking, Casual, Dates |
| 7 | **Wood Miracle (1872)** | Perfume Parlour | Extrait de Parfum | 50ml Faceted Black Flacon with Wood Cap (Extrait de Parfum) | Office, Walking, Casual |
| 8 | **Particle (ISO E-SUPER)** | Perfume Parlour | Eau de Parfum | 50ml Clear Glass Flacon (Eau de Parfum) | Gym, Running, Booster |
| 9 | **Citrus Particle (0616)** | Perfume Parlour | Eau de Parfum | 13ml Cylindrical Travel Spray (Eau de Parfum) | Gym, Running, Summer |
| 10 | **Intenso Water (1329)** | Perfume Parlour | Eau de Parfum | 30ml Black Flacon (Eau de Parfum) | Gym, Running, Casual |
| 11 | **Sweet Water** | Perfume Parlour | Eau de Parfum | 50ml Black Flacon with Gold Lettering (Eau de Parfum) | Running, Casual, Office |
| 12 | **The One for Men (EDP)** | Dolce & Gabbana | Eau de Parfum | 100ml Glass Flacon with Wood Cap (Eau de Parfum) | Dates, Evenings |
| 13 | **Oud Wood (All Over Body Spray)** | Tom Ford | Body Spray | 150ml Aerosol Body Spray | Gym, Casual, Layering |
| 14 | **Mahogany Woods** | Bath & Body Works | Body Spray | 104g Aerosol Body Spray | Walking, Autumn, Casual |
| 15 | **Signature Oud Wood & Dark Vanilla** | Lynx | Daily Fragrance | 100ml Precision Pump Bottle | Gym, Casual, Daily |
| 16 | **Herb Garden (1598)** | Perfume Parlour | Eau de Parfum | 50ml Clear Glass Flacon (Eau de Parfum) | Office, Walking, Dates |
| 17 | **Astray Fruit (1947)** | Perfume Parlour | Eau de Parfum | 30ml Clear Glass Flacon (Eau de Parfum) | Dates, Evenings, Layering |
| 18 | **Leaf Flavour (0401)** | Perfume Parlour | Eau de Parfum | 30ml Clear Glass Flacon (Eau de Parfum) | Winter, Dates, Evenings |
| 19 | **Noire Illusion (1746)** | Perfume Parlour | Eau de Parfum | 30ml Clear Glass Flacon (Eau de Parfum) | Dates, Night Out, Layering |
| 20 | **Second Particle (1980)** | Perfume Parlour | Eau de Parfum | 30ml Clear Glass Flacon (Eau de Parfum) | Gym, Running, Booster |

---

## 5. Filtering & Search Engine

Located on `collection.html`, the filter bar supports multi-criteria selection across 7 rows:
1. **Occasion / Activity**: All, **Gym** (6 tagged bottles), **Running** (4 bottles), **Walking** (6 bottles), **Work / Office** (6 bottles), **Dates & Evenings** (8 bottles), **Formal / Weddings** (6 bottles), **Casual / Everyday**.
2. **Scent Profile**: All, Fresh & Clean, Woody, Sweet & Vanilla, Spicy & Warm, Tobacco & Boozy, Citrus, Aquatic / Marine.
3. **Season**: All, Summer, Winter, Autumn, Spring.
4. **Time of Day**: Any Time, Daytime, Nighttime.
5. **Bottle Type**: All, Clones, Originals.
6. **Brand**: All, Perfume Parlour, Tom Ford, French Avenue, Paris Corner (Emir), Bath & Body Works, Ne'emah, Lynx.
7. **Strength**: All, Extrait de Parfum, Eau de Parfum, Body Spray / Daily Fragrance.

URL query parameter synchronization is supported (e.g., `collection.html?occasion=Gym` or `collection.html?scenario=Running`).

---

## 6. How to Run & Deploy

### Local Development
```bash
# Run local HTTP server from project root
python -m http.server 62872
# Open in browser:
http://localhost:62872
```

### Tailscale Access
```bash
# Serves local port 62872 through Tailscale HTTPS
tailscale serve https / http://127.0.0.1:62872
# Access from any authorized device:
https://desktop-smsroim.tail0be63c.ts.net/
```

### Automated Inventory & Integrity Validation
```bash
node test/validate-inventory.js
```
Validates:
- All 20 fragrances have required schema attributes, valid ratings, notes pyramids, and flacon formats.
- All interactive modal triggers across all 5 HTML pages correspond to valid bottle IDs.
- Zero empty `src=""` image tags exist.

### GitHub & Vercel Deployment
```bash
# Push updates to both branches (Vercel automatically triggers production deployment)
git push origin master
git push origin master:main
```
The repository includes a root [`vercel.json`](file:///s:/Otis%20Projects/fragrance-dashboard/vercel.json) configuration for clean URL routing, 308 redirects, and long-term asset caching.
