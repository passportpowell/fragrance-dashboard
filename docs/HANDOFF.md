# Current Handoff
- Project: Fragrance Dashboard -> L'Atelier Olfactif
- Updated by: Antigravity; Gemini 3.8 Flash (High); inline; Antigravity
- Updated at: 2026-10-11T01:53:00Z
- Root: S:\Otis Projects\fragrance-dashboard
- Branch: master
- HEAD: in-progress (Luxury Maison Pivot & Studio Imagery)
- Status: READY — Luxury Editorial Website Live over Tailscale
- Tree: Clean workspace with active Tailscale daemon
- Workspace ID: initial
- Routing: Luxury Editorial Website Overhaul — JEV: inline, gemini-3.8-flash:medium -> used: inline, Gemini 3.8 Flash (High)
- Usage: not measured; 0 retries; 0 escalations

## Objective
Transform the project from an admin dashboard into an upscale, editorial luxury maison website ("L'Atelier Olfactif"). Default to Light Mode with Dark Mode toggle, replace user photos with studio-grade packshot imagery, and preserve the Layering Atelier, Occasions (Running & Walking), and mandatory footer link.

## Done
- **Luxury Editorial Maison Pivot**:
  - Eliminated the SaaS/admin dashboard feel in favor of a high-fashion editorial digital boutique inspired by Kilian, Le Labo, and Tom Ford.
  - Implemented asymmetric split Hero section ("THE PRIVATE ARCHIVE // L'Art de la Haute Parfumerie") with SOTD spotlight pedestal.
  - Added horizontal Lifestyle Occasions Ribbon with icons and flacon count tags (Running, Walking, Date Night, Office, Evening Soirée, Summer, Winter, Wedding, Gym, City Centre, Malls, Casual).
- **Dual-Theme System (Default Light Mode + Dark Mode)**:
  - Default: Warm Alabaster & Ecru (`#FDFBF7`, `#F8F5EE`), deep caviar espresso typography (`#141518`), warm champagne gold accents (`#A8812D`, `#C5A059`), and diffused soft shadows.
  - Dark Mode Toggle: OLED Obsidian (`#090A0D`), dark bronze, radiant champagne gold (`#D4AF37`), and ivory text.
  - Theme switcher button in floating island navigation bar with smooth SVG sun/moon icon transition and localStorage persistence.
- **Studio-Grade Bottle Imagery**:
  - Replaced phone camera shelf crops with high-resolution, studio-lit packshot images for all 20 fragrances in `assets/bottles/studio/`.
  - Updated `js/data.js` and `js/app.js` to reference and prioritize studio packshots.
- **Preserved Core Features**:
  - 20 flacons with full Fragrantica pyramids, accords, clone lineages, and batch years.
  - Layering Atelier & Olfactory Synergy Lab (Interactive Pairing Studio + 6 Curator Signature Duos).
  - Scent Codex & Field Guide modal (Voj spray blueprint, Reddit maturation, concentration spectrum, Arabian layering).
  - Mandatory footer GitHub icon linking to `https://www.passportpowell.com/card`.
  - Zero-emoji policy strictly maintained with vector SVGs.
- **Testing & Verification**:
  - `node test/validate-inventory.js` -> 100% PASS.
  - All 20 studio images verified on disk.
  - Server active on port 62872 and Tailscale HTTPS at `https://desktop-smsroim.tail0be63c.ts.net/`.

## In progress
- None.

## Next steps
- User to review the new luxury editorial aesthetic on mobile and desktop via Tailscale.

## Tests
- Passed: `node test/validate-inventory.js` (20 flacons, 11 occasions, 5 archetypes).
- Passed: `curl -I http://127.0.0.1:62872/` -> HTTP 200 OK.
- Passed: `curl -k -I https://desktop-smsroim.tail0be63c.ts.net/` -> HTTP 200 OK.
- Passed: All 20 studio images verified on disk and served over HTTP.

## Gotchas / do not undo
- Tailscale serve is proxying `http://127.0.0.1:62872` to `https://desktop-smsroim.tail0be63c.ts.net/`.
- Mandatory footer GitHub icon links to `https://www.passportpowell.com/card`.
- Light Mode must remain the default on initial load.
