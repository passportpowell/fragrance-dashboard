# Active checklist — Multi-Skill Audit & Upgrade Roadmap

## Destination
Execute all 6 tracer-bullet tickets from [docs/audit/PROJECT-AUDIT-2026-11-18.md](audit/PROJECT-AUDIT-2026-11-18.md) to restore the working tree, resolve all P0/P1/P2 audit findings across `UIUX Pro Max → Taste → Impeccable`, implement P3 product upgrades, and serve the live dashboard on a local port.

## Frontier
- [x] Run multi-skill audit (`ui-ux-pro-max`, `taste-skill` `copy-lint.mjs`, `impeccable` `detect --json`, `web-design-guidelines`, `review-animations`, `transitions-polish`, `break-ui`, `seo_audit.py`, `codebase-design`) and save findings to `docs/audit/PROJECT-AUDIT-2026-11-18.md`.
- [x] **T1 (P0):** Rescued `public/js/app.js` & `public/layering.html` to root, restored all 61 deleted working-tree files & 52 bottle photos from Git `HEAD` (`54bdef3`), and rebuilt `public/` with all 20 cropped bottle photos (`37` allowlisted files).
- [x] **T2 (P1):** Updated `test/browser-smoke.js` for the 30 non-particle curated duos (`4` companions for `Navy Intense`, `6` for `After Effect`); resolved all `Taste` `copy-lint.mjs` issues (`0 FAIL, 0 WARN` across all 5 HTML pages).
- [x] **T3 (P1/P2):** Applied `UIUX Pro Max` + `Impeccable` + `web-design-guidelines` fixes: `--canvas-base`/`--font-sans` token fixes, `>=11px` UI text floor (all 50 instances fixed), `>=44px` touch targets, sequential heading hierarchy (`<h1>`→`<h2>`→`<h3>`, all 6 skipped-heading warnings fixed), `aria-current="page"`, `aria-hidden="true"` on decorative SVGs, `color-scheme: light/dark`, `<meta name="theme-color">`, `tabular-nums`, `text-wrap: balance`, `overscroll-behavior: contain`, and collapsible `<details>` mobile filter drawer on `collection.html`.
- [x] **T4 (P2):** Applied `transitions-polish` & `review-animations`: added `:root` motion tokens, replaced all 20 `transition: all` declarations with explicit GPU/color property lists, added `@starting-style` modal open (`250ms`)/close (`150ms`) asymmetry, gated `:hover` transforms for touch devices, and preserved `150ms` opacity/color feedback under `prefers-reduced-motion: reduce`.
- [x] **T5 (P1/P2):** Applied `break-ui` & `seo-ai-visibility` fixes: singular/plural helper (`"1 tagged bottle"`, `"1 suggestion"`), `.sotd-option-name` descender clipping fix, intrinsic `width`/`height`/`fetchpriority` on all images (`0` `IMG_DIMENSIONS_MISSING`), `hidden` attribute on `layering.html` (`0` `HIDDEN_TEXT_REVIEW`), `<lastmod>` in `sitemap.xml`, and `Schema.org` JSON-LD across all 5 pages.
- [x] **T6 (P3):** Formatted `js/app.js` with clean deep-module structure and CommonJS export seam, added Curated Layering Category Filter Bar (`All`, `Daytime & Fresh`, `Evening & Dates`, `Work & Office`, `Autumn & Winter`, `Spring & Summer`) on `layering.html`, shared accord bridge pills on all pairing cards, and one-tap `"Log 1 wear (-0.3ml)"` button in the bottle details modal.

## Fog of war
- None. All 28 automated Node unit/deployment/inventory tests pass (`npm test`), `copy-lint.mjs` passes with `0 FAIL, 0 WARN` on all 5 pages, and `seo_audit.py` passes with `0` layout-shift or hidden-text findings.

## Blockers
- None.
