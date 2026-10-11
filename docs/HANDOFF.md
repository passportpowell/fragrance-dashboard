# Handover Notes — Otis Powell Fragrance Collection

- **Project**: Otis Powell Fragrance Collection (`fragrance-dashboard`)
- **Author / Curator**: Otis Powell
- **Updated At**: 2026-10-11
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
- **Natural, Plain English Nomenclature**: Stripped out all pretentious French jargon ("The Salon", "The Flacon Vault", "Scentscapes", "L'Art de la Superposition", "Dossier") in favor of simple, clear terms: "Home", "All Fragrances", "Occasions", "Layering", and "Guide".
- **Zero Emojis**: 100% SVG vector iconography throughout the entire codebase.
- **Dedicated Multi-Page Architecture**: Each section has its own clean URL instead of a single crowded page.
- **Mandatory Footer Link**: GitHub icon linking to `https://www.passportpowell.com/card` (`target="_blank" rel="noopener noreferrer"`).

---

## 2. Multi-Page Structure & Sitemap

| Page | File | Purpose |
| :--- | :--- | :--- |
| **Home** | `index.html` | Editorial hero showcase, live Scent of the Day recommendation engine (rerollable), and 6 preview cards for occasions (including Gym). |
| **All Fragrances** | `collection.html` / `vault.html` | Complete 20-bottle catalog with 7 multi-dimensional filter rows, live search, sort options, and bottle detail modal. |
| **Occasions** | `occasions.html` / `scentscapes.html` | "When to Wear" guide with dedicated sections for **Gym & Workouts**, Running, Walking, Work/Office, Dates, and Formal Events. |
| **Layering** | `layering.html` | 6 tested signature combinations plus an interactive pairing calculator ranking all 19 partner bottles with compatibility percentages and spray orders. |
| **Guide** | `guide.html` | Practical advice covering the Voj anti-noseblind routine, bottle maceration, EDT vs EDP vs Extrait concentrations, storage, and Molecule booster layering. |

*(Note: `vault.html`, `scentscapes.html`, and `codex.html` are retained as identical mirrors of `collection.html`, `occasions.html`, and `guide.html` to prevent any broken links or 404s).*

---

## 3. Image Audits & Fixes Applied

Every image in the collection has been audited against real shelf photos and retail packaging:

1. **Voux Elegante (`assets/bottles/studio/voux_elegante.jpg`)**:
   - *Issue*: Previously showed a random bottle labeled "DROPS" from Fragrantica.
   - *Fix*: Replaced with authentic Paris Corner Emir Voux Elegante flacon and presentation box.
2. **Citrus Particle 0616 (`assets/bottles/studio/molecule_01_mandarin.jpg`)**:
   - *Issue*: Previously showed an Arabic attar perfume oil with a gold filigree cap.
   - *Fix*: Replaced with official Escentric Molecules Molecule 01 + Mandarin studio bottle packshot.
3. **Second Particle 1980 (`assets/bottles/studio/molecule_02.jpg`)**:
   - *Issue*: Previously showed an image of "Escentric 01" with purple cap.
   - *Fix*: Replaced with official Escentric Molecules Molecule 02 studio packshot with orange text.
4. **Tom Ford Oud Wood (`assets/bottles/studio/tf_oud_wood.jpg`)**:
   - *Issue*: Previously showed a 50ml EDP glass perfume bottle.
   - *Fix*: Replaced with official Tom Ford Oud Wood All Over Body Spray (150ml matte aerosol can) matching Otis's actual product.
5. **Lynx Oud Wood & Dark Vanilla (`assets/bottles/studio/lynx_oud_vanilla.jpg`)**:
   - *Issue*: Previously had an AI-generated bottle with the made-up brand name "TOMER".
   - *Fix*: Replaced with authentic Lynx Signature Oud Wood & Dark Vanilla Daily Fragrance precision pump spray packshot.
6. **Weddings Section Preview (`index.html`)**:
   - *Issue*: Contained a 404 missing reference to `ch_mystery_tobacco.jpg` with non-existent placeholder "Bois Nocturne".
   - *Fix*: Replaced with Tom Ford Noir Extreme (`assets/bottles/studio/tf_noir_extreme.jpg`).

---

## 4. Complete Fragrance Database (20 Bottles)

| # | Name | Brand | Concentration | Clone Inspiration | Key Occasions |
| :-: | :--- | :--- | :--- | :--- | :--- |
| 1 | **After Effect** | French Avenue / FA Paris | Extrait de Parfum | Initio Side Effect | Dates, Evenings, Winter |
| 2 | **Navy Intense (0061)** | Perfume Parlour | Eau de Parfum | Bleu de Chanel EDP | Office, Casual, Walking |
| 3 | **Voux Elegante** | Paris Corner / Emir | Eau de Parfum | Xerjoff Naxos | Office, Dates, Weddings |
| 4 | **Noir Extreme** | Tom Ford | Eau de Parfum | *Original* | Dates, Winter, Evenings |
| 5 | **Intense Aroma Exploding** | Perfume Parlour | Extrait de Parfum | Spicebomb Extreme | Winter, Evenings, Formal |
| 6 | **Laya** | Ne'emah | Eau de Parfum | *Original* | Walking, Casual, Dates |
| 7 | **Wood Miracle (1872)** | Perfume Parlour | Extrait de Parfum | Mancera Cedrat Boise | Office, Walking, Casual |
| 8 | **Particle** | Perfume Parlour | Extrait de Parfum | Molecule 01 (Iso E Super) | Gym, Running, Booster |
| 9 | **Citrus Particle (0616)** | Perfume Parlour | Extrait de Parfum | Molecule 01 + Mandarin | Gym, Running, Summer |
| 10 | **Intenso Water (1329)** | Perfume Parlour | Eau de Parfum | ADG Profondo | Gym, Running, Casual |
| 11 | **Sweet Water** | Perfume Parlour | Eau de Parfum | ADG Profumo | Running, Casual, Office |
| 12 | **The One for Men** | Dolce & Gabbana | Eau de Parfum | *Original* | Dates, Evenings |
| 13 | **Oud Wood Body Spray** | Tom Ford | Body Spray | *Original* | Gym, Casual, Layering |
| 14 | **Mahogany Woods** | Bath & Body Works | Eau de Cologne | *Original* | Walking, Autumn, Casual |
| 15 | **Signature Oud & Vanilla** | Lynx | Body Spray | *Original* | Gym, Casual, Daily |
| 16 | **Herb Garden (1598)** | Perfume Parlour | Extrait de Parfum | PDM Layton | Office, Walking, Dates |
| 17 | **Astray Fruit (1947)** | Perfume Parlour | Extrait de Parfum | Tom Ford Lost Cherry | Dates, Evenings, Layering |
| 18 | **Leaf Flavour (0401)** | Perfume Parlour | Extrait de Parfum | Tom Ford Tobacco Vanille | Winter, Dates, Evenings |
| 19 | **Noire Illusion (1746)** | Perfume Parlour | Extrait de Parfum | Kilian Black Phantom | Dates, Night Out, Layering |
| 20 | **Second Particle (1980)** | Perfume Parlour | Extrait de Parfum | Molecule 02 (Ambroxan) | Gym, Running, Booster |

---

## 5. Filtering & Search Engine

Located on `collection.html`, the filter bar supports multi-criteria selection:
1. **Occasion / Activity**: All, **Gym** (6 tagged bottles), Running, Walking, Work / Office, Dates & Evenings, Formal / Weddings, Casual / Everyday.
2. **Scent Profile**: All, Fresh & Clean, Woody, Sweet & Vanilla, Spicy & Warm, Tobacco & Boozy, Citrus, Aquatic / Marine.
3. **Season**: All, Summer, Winter, Autumn, Spring.
4. **Time of Day**: Any Time, Daytime, Nighttime.
5. **Bottle Type**: All, Clones, Originals.
6. **Brand**: All, Perfume Parlour, Tom Ford, French Avenue, Paris Corner (Emir), Bath & Body Works, Ne'emah, Lynx.
7. **Strength**: All, Extrait de Parfum, Eau de Parfum, Body Spray.

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

### GitHub & Vercel
```bash
# Push updates to both branches
git push origin master
git push origin master:main
```
The repository includes a root [`vercel.json`](file:///s:/Otis%20Projects/fragrance-dashboard/vercel.json) configuration for clean URL routing and asset caching.
