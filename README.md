# Otis Powell Fragrance Collection

A five-page personal fragrance dashboard and local browser inventory manager built with semantic HTML, custom CSS tokens, and vanilla JavaScript. The static production build and automated test suite rely exclusively on the Node.js standard library with zero external runtime dependencies.

## Features & Architecture

- **Pages (`index.html`, `collection.html`, `occasions.html`, `layering.html`, `guide.html`)**
  - **Home (`index.html`)**: Architectural hero dossier with live collection telemetry (bottle count, curated pairings, wear contexts, and tracked millilitres), an interactive Scent of the Day workbench with calendar-season/occasion/time filtering, live Fragrantica-style accord bars, a 3-column note pyramid, and an occasions matrix.
  - **All Fragrances (`collection.html`)**: Rich spec cards displaying house, rating, inspiration reference, top 3 color-coded accord strength bars, top notes, concentration, and remaining volume, backed by search, sorting, primary filter chips, and a collapsible secondary filter drawer (`Time of Day`, `Bottle Type`, `Brand`, `Concentration`, `Wardrobe Archetype`, `Longevity`, `Sillage`).
  - **Occasions (`occasions.html`)**: Sticky quick-jump navigation rail across 11 wear contexts (`Gym`, `Running`, `Walking`, `Office / Work`, `Dates`, `Wedding`, `Parks`, `City Centre`, `Malls`, `Clubbing / Evening`, `Casual`).
  - **Layering (`layering.html`)**: 30 curated non-particle pairings rated 90/100 or above with category filters (`Daytime & Fresh`, `Evening & Dates`, `Work & Office`, `Autumn & Winter`, `Spring & Summer`), shared accord pills, spray sequences, cautions, and an Interactive Pairing Studio.
  - **Guide (`guide.html`)**: Practical wear guidance on considerate application, testing new bottles, concentration labels, storage, and layering experiments.
- **Data & Client Modules (`js/`)**
  - [`js/data.js`](js/data.js): Seed catalog of 20 fragrance records with note pyramids, accord strengths, season/time scores, and cropped owner bottle photographs.
  - [`js/inventory.js`](js/inventory.js): Versioned `localStorage` persistence (`fragrance_atelier_collection_v4`), schema validation, legacy migration, and JSON backup export/import.
  - [`js/app.js`](js/app.js): UI rendering, Scent of the Day selector, symmetric layering matrix, bottle dossier modal (with slider/input volume editor and one-tap `-0.3ml` wear logger), and photo resize/compression upload pipeline.
  - [`js/theme.js`](js/theme.js): Flash-free light (`Le Laboratoire Architectural`) / dark (`Nocturne Extrait`) theme initialization.
- **Design System (`css/styles.css`)**
  - `Bodoni Moda` display typography, `Manrope` body/UI sans, and `JetBrains Mono` (`tabular-nums`) metadata tokens with WCAG AA+ contrast across both light and dark modes, `>=44px` touch targets, and `prefers-reduced-motion` support.

## Run and Verify

Use **Node.js 22 or later**. No `npm install` or dependency installation is required.

```sh
# Build the allowlisted production output into public/
npm run build

# Run all unit, inventory schema, and deployment tests (28 tests + source integrity validator)
npm test

# Serve the generated public/ directory locally (never serve the repository root)
python -m http.server 62872 --bind 127.0.0.1 --directory public
```

Open `http://127.0.0.1:62872` in your browser.

[Published collection](https://fragrance-dashboard.vercel.app/collection) — verify production parity separately after pushing to `main`.

## Inventory and Estimates

- Owner edits, custom bottles, uploaded JPEG/PNG/WebP photos, and volume updates stay in browser `localStorage` on the current origin and do not synchronize across devices. Use **Export collection** / **Import collection JSON** for backups and cross-device transfers.
- Fragrance scores, volumes, longevity/sillage estimates, and layering ratings are subjective curated heuristics rather than chemical measurements or guaranteed wear performance.

## Deployment & Publication

- [`scripts/build.js`](scripts/build.js) validates sources via `scripts/verify-source.js` and populates `public/` strictly from an explicit allowlist. Source shelf photos, historical studio imagery, internal documentation, and test files remain excluded from `public/`.
- [`vercel.json`](vercel.json) enables `cleanUrls`, legacy route redirects (`/vault`, `/scentscapes`, `/codex`), one-hour revalidating asset caching, and strict security headers (`Content-Security-Policy` forbidding inline scripts, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, and `Permissions-Policy`).
- GitHub's default branch is `master`, and Vercel deploys production from `main`. Fast-forward push verified commits to both `master` and `main` without force-pushing.
- Tailscale reference: historical reference endpoint `https://desktop-smsroim.tail0be63c.ts.net/` (availability unverified). If exposing a local preview server over a private tailnet, bind to loopback and serve with `tailscale serve --bg --https=62872 http://127.0.0.1:62872` (never use public Funnel without explicit authorization).

## Sources and Licensing

- See [`assets/README.md`](assets/README.md) for photography provenance and exclusions.
- Source code is licensed under MIT ([`LICENSE`](LICENSE)); bottle photography rights remain separate.
- Built and curated by [Otis Powell](https://github.com/passportpowell) · [Digital Card](https://www.passportpowell.com/card) · [LinkedIn](https://www.linkedin.com/in/otispowell/).
