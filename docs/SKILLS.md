# Skill inventory and relevance

**Updated:** 2026-11-18 UTC

## Selected Capabilities from `- Base Prompts and Skill`
Per `BOOT.md` and `docs/PROJECT-CAPABILITY-SELECTION.md`, the following skills are selected for the Fragrance Dashboard ("L'Atelier Olfactif"):

1. **Core Web/UI Sequence (`docs/DESIGN-UI-WORKFLOW.md`):**
   - **`ui-ux-pro-max`**: Design system tokens, accessibility, touch target sizing (`>=44px`), and responsive breakpoints (`scripts/search.py`).
   - **`taste-skill` (`design-taste-frontend` v2.5.1)**: Anti-slop copy linting (`scripts/copy-lint.mjs`), visual rendering truth (zero missing bottle photos), and section rhythm.
   - **`impeccable` (v4.8.2)**: 5-dimension technical audit (`reference/audit.md`), Craft Floor enforcement (`reference/craft-floor.md`), and mechanical anti-pattern detector (`.agents/skills/impeccable/scripts/impeccable.cmd detect --json`).
2. **Supporting UI, Motion & Edge-Case Skills:**
   - **`web-design-guidelines`**: Vercel 17-category `file:line` compliance (focus states, `color-scheme`, `theme-color`, `tabular-nums`, `text-wrap: balance`, `overscroll-behavior`).
   - **`emilkowalski-skills:review-animations` & `transitions-dev:transitions-polish`**: Motion-token scale, open/close asymmetry (`250ms` modal open / `150ms` close), GPU-only transitions (eliminating `transition: all`), hover media gating, and gentle `prefers-reduced-motion`.
   - **`emilkowalski-skills:break-ui`**: Worst-case data stress testing (pluralization, descender clipping, long names, null accord percentages).
3. **SEO & AI Search Visibility:**
   - **`seo-ai-visibility` (`scripts/seo_audit.py`) & `claude-seo` (`seo-schema`, `seo-technical`, `seo-geo`)**: Clean URL consistency, intrinsic image dimensions, `Schema.org` JSON-LD (`WebSite`, `CollectionPage`, `ItemList`), and AI search readiness.
4. **Architecture & Verification:**
   - **`matt-pocock:codebase-design` & `diagnosing-bugs`**: Deep-module seam extraction for `js/app.js` and red-to-green verification loops (`npm test`, `scripts/verify-source.js`, `test/browser-smoke.js`).
