# Fragrance dashboard: complete project audit

Author: Codex (GPT-6.1 Sol)  
Date: 13 October 2026, 15:15:44 BST (Europe/London; UTC+01:00)  
Project: `N:\Otis Projects\fragrance-dashboard`  
Repository: `passportpowell/fragrance-dashboard`, branch `master`, HEAD `7474212d3a635170852f33699d7e74e38ba680b4`  
Scope: audit and documentation only. No application fixes, commits, pushes, deployments, installs, or Tailscale configuration changes.

## Assessment

The project is a working, lightweight five-page fragrance showcase with a 20-bottle seed database, multi-dimensional collection filters, note detail dialogs, seasonal recommendations, and a layering calculator. It is **not yet the inventory-management dashboard described in the implementation plan**. The existing validator passes, but it does not establish feature completeness, security, accessibility, image identity, or visual quality.

The most urgent technical finding is HTML injection in filter badges, reachable through a crafted collection URL. The next priorities are resolving the inventory scope gap, handling storage failures, and correcting the collection filters and accessibility. Original shelf photos are also publicly served; their publication should be an explicit product decision.

## Scope, guidance, and evidence

Read the shared bundle's `00-START-HERE.md`, `BOOT.md`, `local-routing/README.md`, `local-routing/EXECUTION-POLICY.md`, relevant master-prompt guidance, and `SKILLS-MANIFEST.md`. The bundle was treated as read-only. Read project `AGENTS.md`, `docs/PLAN.md`, `docs/ACTIVE.md`, `docs/HANDOFF.md`, `HANDOVER.md`, `README.md`, recent shared notes, and the previous audit.

Reviewed all five application HTML pages, `js/app.js`, `js/data.js`, `css/styles.css`, `vercel.json`, `.gitignore`, the validator, all five maintenance scripts, asset references, and the installed skill inventory. Applied the bundle's `vibe-security/SKILL.md`, including secrets and deployment references. No security scanning of unrelated projects or active exploitation was performed.

JEV credential availability was verified without displaying credentials. JEV recommended `inline`, `gpt-6-luna:medium` (execution confidence 0.62, worker confidence 0.33). Work remained inline in the existing GPT-6.1 Sol session because this session cannot switch models; the worker recommendation was also below the guidance's 0.6 confidence threshold. No subagents were used. JEV reported advisor cost: USD 0.000035658. Worker usage and effort telemetry were unavailable.

Pre-existing work: `AGENTS.md` was already modified at entry. Its diff removes a secrets sentence and adds a Tailscale rule. That work was preserved; it is not an audit change.

A concurrent Claude audit and shared-note entry appeared during this session. Both were preserved. This report's findings were derived from the inspected source and checks above, not from assuming that concurrent audit's conclusions.

Companion evidence harness: `docs/audit/audit-checks-Codex-2026-10-13.js`. It reads project files, uses a Node VM with a minimal DOM/storage stub, and performs optional public HTTP comparisons. It never edits the application or browser inventory. A VM check proves the inspected code path, not full browser behavior.

## Verification performed

- **PASS:** `rtk node test/validate-inventory.js`: 20 fragrances, 11 occasion tags, 5 wardrobe archetypes, five HTML files.
- **PASS:** `rtk node --check js/app.js` and `rtk node --check js/data.js`.
- **PASS:** expanded static checks found no missing seed `image`/`userPhoto` files, broken local HTML links/fragments, duplicate page IDs, or invalid literal `openDetailModal(...)` IDs.
- **CONFIRMED:** storage-denied startup throws; malformed `[null]` inventory falls back to the 20 seed records; a saved custom photo is retained in state but its seed `image` is selected for display; raw search text reaches badge HTML.
- **CONFIRMED:** the same unescaped badge path accepts a malicious occasion value from query state. The validator also accepted an in-memory mutant with rating 999, remaining volume 99,999ml, accord percentage 999, and a missing image path. No source data was modified by this check.
- **MEASURED:** 57 asset files, 3,158,352 bytes in total. `app.js` 59,190 bytes; `data.js` 47,842 bytes; CSS 58,648 bytes, uncompressed local file sizes.
- **LIVE HTTP:** all five public Vercel routes returned HTTP 200. `/vault`, `/scentscapes`, and `/codex` returned HTTP 308 to `/collection`, `/occasions`, and `/guide`, respectively. `/.git/HEAD` returned 404. These are endpoint checks, not account-level deployment verification.
- **LIVE PARITY:** SHA-256 comparisons matched public response bodies to local files for all five HTML pages plus `js/app.js`, `js/data.js`, and `css/styles.css`. The audited application code was therefore present on the public site at verification time.
- **LIVE HTTP:** one original shelf photo returned HTTP 200 and `Content-Type: image/jpeg`, with a one-year immutable cache policy.
- **LIMITED SECRETS CHECK:** common key/private-key patterns returned no matches in application/document/script files, excluding `.env*`, Git internals, installed skill payloads, and Vercel internals. `.env*` and `.vercel` are ignored and absent from the tracked-file inventory. No environment values were opened or printed. Historical secrets scanning was not performed.
- **SKIPPED:** rendered desktop/mobile, dark-mode visual acceptance, screen-reader tests, actual browser keyboard traversal, and browser execution of the injection proof. Playwright failed with `ENOENT` creating its Chrome profile directory; the in-app browser timed out and reset. Source and VM checks do not replace these checks.
- **SKIPPED:** Tailscale connectivity, current daemon on port 62872, Vercel account settings, production branch selection, deployment history, external fragrance fact-checking, and third-party image licensing verification.

## High priority findings

### 1. Filter badges allow URL-driven DOM XSS

**Evidence:** `js/app.js:608-611` takes an arbitrary `occasion` or `scenario` query value. `js/app.js:779-789` interpolates active filter values into `chip.innerHTML`. Search text and custom bottle fields also enter HTML templates elsewhere, including `js/app.js:846`.

**Impact:** a crafted link can inject an image with an event handler into the collection page. Code running in that origin can read or modify the local fragrance collection. An attacker does not need a server-side database or login. Stored custom name/brand values create additional persistent injection surfaces within that browser.

**Reproduction:** on an isolated test origin, open `collection.html?occasion=%3Cimg%20src%3Dx%20onerror%3Dalert(1)%3E`. The invalid occasion still becomes an active badge. The VM harness confirmed raw HTML insertion; no payload was executed on the public site.

**Minimal remediation:** validate query filters against permitted values and construct badge text with `textContent`. Build user-controlled card text as text nodes and validate image URLs. Do not rely on an input being typed by the owner or on HTML form validation.

```js
// Before
chip.innerHTML = `<span>${formatFilterLabel(key, val)}</span>`;
// After: create removal control separately with createElement.
const label = document.createElement('span');
label.textContent = formatFilterLabel(key, val);
chip.appendChild(label);
```

### 2. The declared inventory product is incomplete

**Evidence:** `docs/PLAN.md` requires editing bottles, remaining-volume tracking, photo upload, and JSON export/import. `docs/ACTIVE.md` marks implementation of these capabilities complete. The actual Add Bottle form captures only name, brand, and clone inspiration; `js/app.js:1342-1428` creates a mostly hard-coded record. There is no edit/delete inventory workflow, remaining-volume control, photo upload handler, or JSON import/export implementation.

The detail dialog renders text notes and spray/layering advice (`js/app.js:1273-1336`), but no accord bar chart, performance meters, volume display, or maceration tracker. Data fields exist for many of these features; the UI does not expose them.

**Impact:** the collection cannot perform the management and backup tasks promised by the plan. Losing browser storage loses custom additions. Marking these features complete misleads subsequent agents.

**Recommendation:** decide whether the current product is a showcase or an inventory manager. Keep the original plan intact; record the agreed scope change or implement the missing workflows. Replace unsupported completion claims with verified status.

## Medium priority findings

### 3. Storage denial can stop the entire startup sequence

**Evidence:** `initTheme()` reads storage at `js/app.js:121`; `applyTheme()` writes at line 136 without error handling. Both execute before `loadCollection()` and page initialization. The VM storage-denied check threw `Error: Storage denied` before collection loading.

**Impact:** browsers or embedded contexts that deny storage may show empty dynamic sections and nonfunctional page controls. `saveCollection()` catches quota errors, but only logs them; an Add Bottle operation can appear successful although it will disappear after reload.

**Recommendation:** catch theme storage failures and continue with an in-memory/default theme. Make collection persistence return success/failure and expose a visible save failure with a recovery/export path.

### 4. Saved records lack schema validation and migration

**Evidence:** `js/app.js:168-201` assumes parsed storage is an array of valid records. Seed reconciliation updates only images, occasions, and notes. Bad records can trigger fallback; old concentration, packaging, and descriptive fields can survive seed corrections. Seed IDs removed from storage are automatically reintroduced.

**Impact:** different browsers can display different metadata for the same seed bottle. Invalid data produces silent fallback or later rendering failures. Future deletion and editing semantics will conflict with the current merge policy.

**Recommendation:** validate saved records before rendering, use a versioned migration policy, preserve recoverable invalid data, and define which fields belong to the user versus the curated seed.

### 5. Custom photos are ignored in favor of seed images

**Evidence:** `js/app.js:181-184` preserves `userPhoto` when `userUploadedCustomPhoto` is true, but renderers repeatedly choose `item.image || item.userPhoto`, including lines 442, 826, and 1282. The harness supplied a custom data URL and observed the original studio image selected instead.

**Impact:** even a previously saved custom photo cannot override an existing seed image. This remains relevant despite the current absence of an upload UI.

**Recommendation:** centralize the image selection rule and prefer a validated explicit user override, then the seed image, then a fallback. Add an image-error fallback; a nonempty broken path currently wins the expression.

### 6. Collection filters cannot select every brand or concentration

**Evidence:** `collection.html:178-188` has no Dolce & Gabbana button, despite The One in the database. `collection.html:193-201` has Body Spray but no Daily Fragrance button. `js/app.js:752-755` compares concentration exactly, so Lynx Daily Fragrance is excluded by the Body Spray filter.

**Recommendation:** generate these choices from actual collection values or map an explicitly labeled combined category. Update them when a custom brand is added. Also reconcile the omitted Parks, City Centre, Malls, Clubbing/Evening, and wardrobe/performance filters with the plan rather than assuming all data dimensions are exposed.

### 7. Keyboard and focus handling is incomplete

**Evidence:** collection cards implement keyboard activation, but clickable cards in `occasions.html` use `div` plus `onclick` without equivalent keyboard semantics. Layering duplexes and companion images/headings are also pointer-only (`js/app.js:990-1000`, `1083-1088`). Home layering flacons have `role="button"` and `tabindex="0"` but no Enter/Space handler (`506-522`).

Dialogs carry ARIA dialog attributes, but `initDetailModal()` (`1252-1271`) does not move, trap, or restore focus. The Add Bottle dialog has no Escape handling. Mobile navigation only adds/removes a class (`151-162`), with no expanded state, Escape handling, focus containment, or return focus. Individual remove-filter spans are not keyboard controls.

**Recommendation:** use native buttons for actions; implement consistent dialog/drawer focus management and Escape behavior. Add a persistent accessible name for collection search and pressed/selected state for filter and mode controls. Confirm the final result with keyboard and screen-reader checks.

### 8. Several small-text colors have insufficient contrast

**Evidence:** CSS tokens at `css/styles.css:18`, `28`, and `79` produce these computed sRGB ratios: gold `#A8812D` on light canvas `#FDFBF7`: **3.48:1**; light tertiary `#969083`: **3.07:1**; dark tertiary `#616775` on `#090A0D`: **3.49:1**. Gold is used for 9px brand subtitles; tertiary colors appear on small metadata. These combinations are below 4.5:1 for normal text. This is a token calculation, not a full rendered accessibility certification.

**Recommendation:** darken light-theme small text and lighten dark tertiary text; measure actual text/background pairs. CSS also enables smooth scrolling and transitions without a reduced-motion override; add a `prefers-reduced-motion` treatment.

### 9. Original shelf photographs are publicly downloadable

**Evidence:** `assets/bottles/user_photos/` contains nine tracked original shelf images. A HEAD request to [the first shelf photograph](https://fragrance-dashboard.vercel.app/assets/bottles/user_photos/shelf_1_pp_row.jpg) returned HTTP 200, 130,659 bytes, and `public, max-age=31536000, immutable`.

**Impact:** originals are publicly available even though current cards use studio images. No claim is made that they contain sensitive personal details; their publication should still be deliberate. Long cache lifetimes complicate withdrawal.

**Recommendation:** confirm which photographs should be public. Keep source originals out of the deployment output if they are only editing inputs; retain them locally. Do not delete originals as part of this audit.

### 10. Clone imagery can misrepresent the owned bottle

**Evidence:** `js/data.js:129` assigns Navy Intense a Bleu de Chanel studio packshot; lines 313 and 366 assign other records stock imagery. Other Perfume Parlour records similarly use imagery of the inspiration fragrance. `scripts/update_data_images.js` explicitly maps owned-bottle crops to original-designer images. The supplied cropped photographs are secondary `userPhoto` values and lose display priority.

**Impact:** a visitor can read the correct clone name while seeing another manufacturer's packaging. Documentation saying every packshot matches physical bottle format is too broad.

**Recommendation:** show the owned bottle first. If inspiration imagery is retained, present it as a separately labeled reference. Maintain source and permission records for retailer/Fragrantica images; the code's MIT license does not establish rights to third-party photography. Image authenticity and rights were not externally adjudicated.

### 11. Recommendations and fragrance claims lack explicit provenance

**Evidence:** ratings, similarity percentages, season/time percentages, longevity, remaining volumes, batch years, and maturation statuses in `js/data.js` have no per-record source or measured/estimated label. Custom additions fabricate a 4.8 rating, 50ml bottle, 8h+ longevity, notes, seasons, and mature status (`js/app.js:1373-1413`). Layering uses hard-coded percentages, and describes molecular primers as binding to skin lipids and extending projection (`1110-1123`). Guide claims include exact noseblind timing, concentration ranges, and performance guarantees (`guide.html:126-236`).

**Impact:** curated heuristics look like measured chemistry or verified owner inventory. Homepage copy calls combinations “tested,” but no wear-test evidence is recorded in the project.

**Recommendation:** distinguish owner-confirmed inventory, subjective personal ratings, algorithm scores, and sourced claims. Leave unknown custom fields blank or explicitly provisional. Describe compatibility as a heuristic score rather than a proven percentage outcome. Link original guidance and record verification dates before labeling scientific or packaging claims confirmed.

### 12. Layering scores disagree across views

**Evidence:** “Deep Marine & Smoky Incense” has a curated score of 95 in `CURATED_SIGNATURE_DUOS`, but the same pair receives 96 in `calculatePairingSynergy()`. Primer rules can also assign 98 in one order and 96 in the reverse order. This may be intentional sequencing, but no distinction is explained.

**Recommendation:** use one score source for curated pairs; either make compatibility symmetric or explicitly label directional application scores. Add regression checks for curated versus calculator output and invalid/missing IDs.

### 13. New bottles do not refresh all affected screens

**Evidence:** `js/app.js:1417-1424` saves the new record and rerenders only the collection page. Home recommendations, home counts, layering options, and the already-built base select are not refreshed. `initInteractivePairingStudio()` populates its options only when it has no children (`1022`). Metadata and collection counters hard-code 20.

**Impact:** an added bottle can exist in storage while remaining absent from the currently visible home or pairing interface; collection copy can say “21 of 20.”

**Recommendation:** refresh the active page's dependent views after successful persistence, update select choices without dropping the current selection, and derive visible totals from state. Static editorial occasion lists need a declared policy for custom additions.

### 14. The test suite overstates its coverage

**Evidence:** `test/validate-inventory.js:23-33` checks field presence, not rating/volume/percentage bounds or the full schema. `:64-90` checks literal `data-id` attributes, not `onclick` IDs, fragment destinations, or image existence. The final success message calls these “image sources” checks although it only rejects empty `src=""` strings.

**Impact:** passing does not prove the claims in README/HANDOFF. Required nested notes can also throw rather than produce a controlled diagnostic when absent. Custom Add Bottle records omit `flaconFormat`, which is required of seed records by this validator.

**Recommendation:** test numeric bounds, nested structures, asset existence, filter coverage, storage migrations, recommendation branches, and runtime record creation. Add a browser smoke check when the browser tool is available. Keep validation claims aligned with checks actually performed.

### 15. Asset caching prevents reliable image replacement

**Evidence:** `vercel.json:10-20` gives every `/assets/*` file a one-year immutable cache. Image filenames are stable and maintenance scripts overwrite them. The public shelf-photo response confirms the configured policy is active.

**Impact:** correcting a bottle photograph at the same URL may leave returning visitors on the old image for a year. This also affects withdrawing unintentionally public photos.

**Recommendation:** use content-versioned asset filenames for immutable caching, or use a revalidating/shorter policy for mutable assets. Define a withdrawal process before treating original photographs as disposable published files.

### 16. Deployment lacks application-specific security headers

**Evidence:** `vercel.json` configures caching only. Live homepage responses include Vercel HSTS but no Content-Security-Policy, frame restriction, X-Content-Type-Options, or explicit Referrer-Policy.

**Recommendation:** fix injection first, then add a policy compatible with the site's fonts, data images, and scripts. Inline event handlers must be removed or deliberately accommodated; copying `script-src 'self'` blindly would break them. Add frame restrictions if embedding is not required and `nosniff`. Public static CORS `*` was observed and is not, by itself, an authentication vulnerability here.

## Lower priority and operating findings

### 17. Required footer icon and Tailscale link are missing

**Evidence:** all pages link to `https://www.passportpowell.com/card` with the correct new-tab safety attributes, but the footer SVG is a contact-card rectangle/person icon, not the GitHub icon required by `AGENTS.md` and BOOT. The latest commit explicitly changed this footer. No application HTML contains the required Tailscale hostname or node IP.

**Recommendation:** reconcile the latest footer design with the explicit icon requirement; retain a GitHub icon in addition to the card button if both are wanted. Add the authorized Tailscale endpoint to the UI and README. This audit did not configure or verify Tailscale.

### 18. Handoff and completion records are stale

**Evidence:** `AGENTS.md`, `HANDOVER.md`, and the entry HANDOFF use `S:\Otis Projects`. The current root is `N:\Otis Projects`, resolving to the GL.iNet share. The entry HANDOFF duplicates a long narrative HANDOVER rather than the required concise state with Branch/HEAD/Tree/Workspace ID. No Workspace-ID command is present despite AGENTS referring to one. ACTIVE has old completion claims and a fog-of-war bottle-identification item, while reporting no blockers.

The narrative counts say 6 walking, 6 office, 8 dates, and 6 formal picks. Actual seed tags are Walking **9**, Office **9**, Dates **14**, Wedding **10**. The README still uses “L'Atelier Olfactif,” while current UI uses Otis Powell Fragrance Collection. Shared notes are older than recent commits.

**Recommendation:** use HANDOFF for current resumable state, retain HANDOVER as detailed background, and reconcile scope/counts after deciding the product direction. This audit checkpoints current status without changing the original plan or erasing old shared notes.

### 19. Maintenance scripts are not a reproducible current asset pipeline

**Evidence:** `scripts/crop_bottles.py:4-5` hard-codes `S:`. `scripts/process_fixed_studio_images.py` expects five root-level source JPGs that are absent from the current tracked inventory. The download script writes directly over destination files; the replacement scripts edit source via literal string/regex matching and do not require an expected replacement count.

**Impact:** rerunning scripts can fail, silently do nothing, or replace corrected photography with an older stock image. Python scripts depend on Pillow, but no pinned Python requirements file is supplied.

**Recommendation:** mark one-off scripts as historical or turn the needed subset into a documented, root-relative pipeline with preflight checks, temporary downloads, file verification, explicit replacement counts, and dependency guidance. These scripts were inspected but not executed because they modify source/assets.

### 20. Filter URL and sort state are inconsistent

**Evidence:** `initCollectionPage()` reads only an occasion/scenario query value; changing filter buttons does not update the URL. Unknown occasion values are accepted. `resetAllFilters()` resets internal sort to rating but does not reset the select's visible value. “Bottle Volume” sorts by remaining fraction (`js/app.js:768-769`), rather than remaining ml or bottle capacity.

**Recommendation:** validate and synchronize supported query state, reset the visible sorter, and name the volume sort according to the actual measure. These changes improve shareable views without requiring a framework.

### 21. Installed skills are broader than the documented project setup

**Evidence:** `.agents/skills` contains 18 skill entrypoints, including alternative minimalist/brutalist/high-end directions and both current and v1 design-taste guidance. ACTIVE names six installed capabilities and a `taste-skill` name that differs from current folder names. The bundle manifest records Impeccable 4.1.0 while the project entrypoint says 4.4.0; its scripts VERSION says 0.1.6 (a different component version, not proof of corruption). Current design-taste guidance explicitly excludes dashboards, while the preserved v1 has a different scope.

**Recommendation:** declare which small set is active for this project's current surface and record installation provenance. Verify the skill launcher/runtime separately before use. Presence of a skill is not evidence that its workflow ran; none of these design launchers was invoked for this audit. Do not delete preserved versions without confirming their purpose.

### 22. Performance and search hygiene still need a rendered check

**Evidence:** the project has no framework/build dependency, and local assets total only about 3.16MB. However, all pages load the full collection data and shared application script, Google Fonts load several families, imagery is mostly fixed-resolution JPG, and the hero is static markup. Basic descriptions, canonical URLs, Open Graph metadata, and favicons now exist. No sitemap or robots file is present in the project inventory.

**Recommendation:** measure initial requests, layout shift, responsive image quality, and font behavior in desktop/mobile light/dark views before optimizing. Decide whether this personal site needs a sitemap/search indexing policy; these are opportunities, not evidence that indexing is broken. Static-server clean routes also differ from Vercel, so local instructions should use `.html` URLs unless a route-aware server is chosen.

### 23. Occasion lists still show subsets of the tagged collection

**Evidence:** the static occasion sections contain Gym 6/6 and Running 4/4 tagged bottles, but Walking 6/9, Work 6/9, Dates 8/14, and Wedding 6/10. The entry HANDOFF describes these as complete bottle lists. The harness lists each omitted record. Walking, for example, omits Citrus Particle, Intenso Water, and Second Particle despite their Walking tags.

**Recommendation:** either label these as curated highlights and make the full filtered collection link explicit, or generate complete occasion cards from collection state. Maintain concentrations, imagery, and note copy from the same data source to avoid future drift.

## Previous audit reconciliation

The 11 October audit is retained as history; its assertions are not assumed current. Current static checks confirm the wedding anchor exists, Laya and other literal modal IDs resolve, all referenced seed images exist, page metadata exists, empty image sources were replaced, and duplicate mirror pages were replaced with live 308 redirects. The layering engine now has additional shared-accord and clash branches, so the earlier “everything else = flat 85%” statement is stale.

Still open: incomplete inventory features, unqualified quantitative/chemical claims, designer imagery for owned clones, weak verification coverage, stale continuity records, and unverified visual acceptance. The newer footer no longer satisfies the earlier audit's GitHub-icon conclusion.

## Recommended implementation order

1. Fix query/badge and user-field HTML injection, then verify encoded-query and stored-record cases.
2. Confirm source-photo publication policy; separate editing inputs from public output without deleting originals.
3. Decide showcase versus inventory scope and correct completion records; implement management and JSON backup if retained.
4. Fix storage errors, migrations, save feedback, photo precedence, and dependent-view refresh.
5. Complete brand/strength choices and consistent URL/sort state.
6. Fix keyboard/focus behavior, contrast, and reduced motion; run rendered desktop/mobile and dark-mode acceptance.
7. Label curated estimates and validate source/packaging claims; unify layering scores.
8. Improve tests, cache/versioning, headers, maintenance scripts, and the active skill/continuity record.

No finding in this report has been fixed in application code. The existing modified `AGENTS.md` remains preserved. The audit report and evidence harness are local and uncommitted.

## Reproduce the supplementary checks

From the project root:

```powershell
rtk node test/validate-inventory.js
rtk node --check js/app.js
rtk node --check js/data.js
rtk node docs/audit/audit-checks-Codex-2026-10-13.js
# Optional public HTTP body comparisons; no authentication or deployment writes.
rtk node docs/audit/audit-checks-Codex-2026-10-13.js --live
```

The harness outputs findings rather than treating every finding as a failing process exit. Its synthetic DOM cannot validate actual layout, focus traversal, image decoding, or JavaScript execution in a browser. All security proofs remain isolated VM/source checks.
