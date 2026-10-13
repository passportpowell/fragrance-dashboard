# Audit remediation closure — Codex
Date: 13 October 2026. Scope: all three audit documents; source implementation, verification and GitHub publication.

## Implemented
1. Escaped owner text and generated attributes; rejected unknown URL filters; removed inline event handlers. Addresses Codex 1 and Claude 14.
2. Added full add/edit/remove inventory workflows with unknown fields left blank, structured notes/accords, bottle type/format/year, purchase source and owner observations. Addresses Codex 2, Claude 11/15.
3. Added validated JSON export, import preview and explicit Apply; invalid imports or failed writes retain existing data.
4. Added decoded/resized JPEG/PNG/WebP photo upload, size/signature/dimension limits, bounded compression and custom-photo priority. Late upload results cannot cross editors. Addresses Codex 5.
5. Added remaining-volume input/slider/meter and visible accord/performance/wardrobe details. Addresses Claude 15.
6. Replaced stale record caching with version4 seed-plus-owner-overrides/custom/deleted state. Version3 migration preserves identifiable owner changes while refreshing seed metadata. Addresses Codex 4, Claude 5.
7. Handled denied storage and quota failures visibly. Protected unreadable backups until recovery export; salvaged valid records from partial migration/schema failures. Old backups remain recoverable instead of being deleted silently. Addresses Codex 3–4.
8. Added Web Locks/revision checks and storage-event refresh to prevent stale-tab overwrite of another tab's saved collection.
9. Generated all brand, concentration, occasion, wardrobe, longevity and projection choices from actual inventory. Added missing Dolce & Gabbana, Daily Fragrance and custom tags. Addresses Codex 6, Claude 13.
10. Made matching exact, normalized known occasion labels, removed Water Jasmine's accidental aquatic match, synchronized filter URLs, reset visible sort state, and sorted volume by remaining ml. Addresses Codex 20, Claude 17.
11. Generated six home previews and eleven complete occasion sections from inventory. Dynamic counts update after mutation and reload. Addresses Codex 13/23 and Claude 6/16.
12. Made calendar season score primary; added occasion and day/evening controls; unrated/empty collections show no invented recommendation. Addresses Claude 10.
13. Unified curated/calculated pairing scores, made scores symmetric, compared recorded accords, and limited repeated booster suggestions. Removed chemical/performance guarantees and chest/front-neck contradictions. Addresses Codex 12, Claude 7–8.
14. Marked historical profiles and metrics provisional, removed fake defaults for additions, softened guide claims, normalized naming and retained original plan context. Addresses Codex 11 and Claude 9/12.
15. Used actual owner crops in active data, HTML and previews. Preserved stock/source originals outside production output; documented separate photograph rights and MIT code scope. Addresses Codex 9–10, Claude 4.
16. Restored the GitHub SVG/card link and required private-access reference; documented actual read-only Tailscale status and a separate prospective port. Addresses Codex 17, Claude 1–2.
17. Added native action buttons, dialog focus containment/return, Escape, prior inert-state restoration, unsaved-editor confirmation, skip links, search labels and pressed states. Addresses Codex 7.
18. Fixed contrast, reduced-motion support, mobile header/editor/dialog layouts and a measured three-pixel decorative-glow overflow. Bounded long owner labels and aligned the display font with the loaded family. Addresses Codex 8, Claude 18–19.
19. Added a dependency-free production build with input/output containment checks and an explicit allowlist. Excluded originals, stock, secrets, skills, docs and Git internals; preserved sources. Addresses Codex 9/22.
20. Added CSP/frame/MIME/referrer/permissions headers, one-hour revalidating asset caching and six exact legacy redirects. Addresses Codex 15–16, Claude 20.
21. Added robots/sitemap and retained existing basic metadata/canonical/favicon behavior. No ranking or search-performance claims are made.
22. Replaced unsafe historical rewriting/downloading scripts with explicit no-write historical wrappers; the supported photo workflow is the validated browser uploader. Addresses Codex 19, Claude 21.
23. Added shared schema validation, numeric bounds, asset/link/fragment/hook/script-order/footer checks, security/storage/recommendation regression tests and build exclusions. Build validation runs before generated output is removed. Addresses Codex 14.
24. Added a reproducible Chromium integration suite exercising manager operations, JSON recovery, CSP-safe text, multi-tab conflicts, focus, 20 layout/theme combinations and source-photo exclusion.
25. Updated README, handover pointer, accepted plan/checklist, decisions, installed-skill record and project instructions; restored the removed secrets rule and preserved historical audits/notes. Addresses Codex 18/21, Claude 3/23–26/28–29.
26. Kept GitHub's verified default master branch, preserved main and reconciled the concurrent README commit without force-pushing or rewriting history. Addresses Claude 27.

## Reconciled findings and decisions
- The other audit's “skills directory empty” and “complete occasion lists” assertions contradicted direct filesystem/tag checks. There are 18 installed skill entrypoints; the old lists were subsets. Both facts were verified and corrected.
- Earlier missing-wedding, broken-Laya, empty-image-source and duplicate-page findings had already been fixed. Those repairs were retained.
- A missing package.json was previously acceptable for a static site; the new package only exposes stdlib test/build commands. No dependency installation or framework was introduced.
- Imported record arrays are explicit full-record imports; version4 exported state is the preferred format. Both are validated before replacement.
- Original source photos and old browser backups were preserved. Public repository history and already-downloaded/cached copies cannot be withdrawn by a normal source change; no history rewrite was authorized or performed.
- Unknown manufacturing facts, exact oil percentages, authenticity and chemical performance were not inferred or externally certified. Active copy uses provisional owner/curated labels.
- Browser emulation covers desktop/mobile widths and light/dark, not physical-device or screen-reader certification. External fonts are blocked for deterministic offline regression checks; fallback typography is exercised.
- The current PC's Tailscale routes belong to other projects. A fragrance route is not configured; existing routes remain intact. The required historical private-access link is a reference, not a verified live endpoint.
- GitHub push, Vercel deployment and live parity are separate verification states. An account read confirmed the existing public production release was Ready from 12 October; no manual production deployment or cloud setting change is part of this source-only push.

## Verification
- Core test suite: 23 passing tests, plus expanded source integrity validator.
- Chromium integration: 28 passing checks, no page errors.
- Local build: allowlisted output; source original route returns 404 in the test server.
- Independent reviewer: installed Claude CLI, Sonnet alias, medium, tools disabled. Real recovery/tab/upload/focus issues were fixed and rechecked. UTF-8 UI text was checked in actual files/screens rather than accepting pipe-encoding artifacts as defects.
- Baseline protection: Git snapshot timed out on LAN SMB. An ignored 23-file source backup preserves the pre-remediation workspace. No source photos or unrelated work were discarded.
- Final Git commit/remote verification is recorded in HANDOFF and the final user response.
