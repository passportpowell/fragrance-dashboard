# Fragrance Dashboard — Full Project Audit

- Auditor: Claude Code (claude-opus-5-5), Claude desktop app
- Date: 2026-10-13 15:13 local (14:13Z)
- Root: `N:\Otis Projects\fragrance-dashboard`. Branch `master`, HEAD `7474212`. Tree: ` M AGENTS.md` (uncommitted, not mine)
- Routing: JEV said `inline`, `claude-sonnet-5-5:medium` (conf 0.72/0.84). I used opus-5-5 inline because the session was already on it.
- Scope: bundle protocol compliance, git/repo, code (`js/`, `css/`, `test/`, `scripts/`), data, every page's rendered content, deploy config, docs.
- Method: read bundle `00-START-HERE.md`, `BOOT.md`, `local-routing/README.md` and `templates/`. Ran `node test/validate-inventory.js`. Ran node cross-checks of HTML against `data.js`. Read all 1429 lines of `app.js`. Rendered each page on a local `http.server` in the built-in browser. Compared the live Vercel deploy with local files.
- No source files were changed. This file is the only addition.

## What changed since the 2026-10-11 audit (`docs/[PC] AUDIT-2026-10-11.md`)
Fixed in commits `53b648c` to `7474212`:
- Concentrations now agree across data, occasions page and HANDOFF.
- Occasions page now has a Weddings section.
- The broken Laya modal id is fixed.
- The occasions page cards are now complete lists.
- SEO meta, favicon, OG tags and canonical are on all 5 pages.
- The mirror pages were deleted and replaced with 308 redirects. The redirects work live: `/vault` returns 308.
- The empty `src=""` is gone.
- The validator now also checks HTML data-ids and empty src.
- Live Vercel `index.html` and `app.js` are byte-identical to local HEAD.

Still open, and covered below: the home page occasion previews, the layering calculator, overclaims, docs drift.

---

## P0 — hard-rule / legal / data-integrity

1. **GitHub footer icon removed (rule violation).** Commit `7474212` replaced the footer icon with a contact-card SVG (`footer-contact-card-btn`, path `M14 9h4…`). The second link (`footer-bottom-card-link`) has no icon at all. No page has a GitHub SVG in its footer. Both BOOT.md §7 and AGENTS.md say *"The GitHub icon is mandatory for this link."* The link target and `rel`/`target` attributes are correct.
2. **Tailscale link missing from the UI (rule violation).** BOOT.md §7 and the new AGENTS.md line require the MagicDNS URL `https://desktop-smsroim.tail0be63c.ts.net/` in the UI (footer, status or settings). No page contains `ts.net`. HANDOFF already documents the serve command, which is correct.
3. **Uncommitted AGENTS.md edit drops a safety rule.** The working-tree diff adds the Tailscale rule. It also deletes *"Never put credentials, secrets or private keys in any file here; refer to variable names only."* That looks like an accidental template sync, because the bundle template lacks the line. Restore it before committing.
4. **Third-party product images on a public site under MIT.** `scripts/download_studio_images.py` pulls the bottle shots from `fimgs.net` (Fragrantica's CDN, 375×500 thumbs). Some are retail packshots. The repo is public, the site is public on Vercel, and `LICENSE` is MIT. Meanwhile the footer says "© 2026 Otis Powell. All rights reserved." Two problems follow:
   - the image licensing is unclear;
   - the license and copyright notices contradict each other.
   
   Options are your own photos (the `cropped/` and `user_photos/` folders already exist but are unused), attribution, or excluding images from the MIT grant.
5. **Returning visitors see stale data (bug).** `loadCollection()` (`js/app.js:168`) keeps the localStorage copy (`fragrance_atelier_collection_v3`). It re-syncs only `image`, `userPhoto`, `occasions` and `notes` from `data.js`. Every other edit made since a visitor's first load never reaches them:
   - `concentration`, `bottleSize`, `remainingMl`, `seasons`, `rating`, `description` and `flaconFormat` all stay stale;
   - for example, the 53b648c concentration and size fixes (Particle 30→50 ml, Citrus Particle 30→13 ml) don't show.
   
   Bottles removed from `data.js` would also persist forever. Fix: always rebuild from seed, and keep only user-added bottles from storage. Or bump the key on every data change.

## P1 — wrong / misleading content

6. **Home page occasion previews don't match the data tags**, so "Explore" lands on a list without the bottle shown:
   - the Running preview shows Sweet Water, which isn't tagged Running;
   - the Walking preview shows "Laya EDP", which isn't tagged Walking;
   - the Weddings preview shows "TF Oud Wood", which isn't tagged Wedding.
   
   Generate these previews from `data.js` instead of hard-coding them.
7. **The layering engine is mostly hard-coded rules.** `calculatePairingSynergy` (`app.js:1099`) returns before looking at accords:
   - Particle and Second Particle score 98% with every bottle, and 96% with each other;
   - Citrus Particle scores 97% with everything. On any base, including aquatics like Sweet Water and Intenso Water, it says it "cuts through the warmth of ${base}".
   - Result: every home-page "Recommended Layering Options" block shows the same three boosters, as seen live for Lynx Signature Oud.
   - The six curated pairs are defined twice, in `CURATED_SIGNATURE_DUOS` and in the hard-coded `if` blocks, with different scores. Sweet Water + Intenso Water is 95 in one and 96 in the other.
8. **Spray advice contradicts the guide.** The guide's anti-noseblind routine says never chest or front of neck, yet:
   - Lynx is set to "Neck Base, Wrists, Torso";
   - the Oud Wood combo says "3 sprays … on chest";
   - the home page renders duplicated text: "3-4 Sprays across neck and wrists applied to Neck Base, Wrists, Torso."
9. **Unsupported claims are presented as fact:**
   - "binds to skin lipids", "extends projection without altering its scent", "without olfactory fatigue (anosmia)";
   - star ratings of 4.6–4.9;
   - clone similarity of 92–96%;
   - longevity figures.
   
   Label these as personal estimates, or soften them.
10. **The Scent of the Day logic reads odd.** It says it is "Picked strictly from the 18 bottles rated for this season", but the threshold is ≥20%, so 18 of 20 bottles qualify. Daytime weighting picks Lynx (35% autumn) over 45% autumn bottles. The guide says rest bottles 3–6 weeks; ACTIVE says 2–6; `maturationWeeks` varies per bottle.
11. **The "Add Bottle" form invents data.** Every added bottle gets:
    - fixed fake tags: Gym, Office, Walking, Casual;
    - rating 4.8 and similarity 90%;
    - the Molecule 01 image.
    
    It saves only to the local browser. There is no edit, delete, photo upload or JSON import/export, which PLAN requires.
12. **Naming is inconsistent across pages.** The same bottle appears as "Particle (ISO E-SUPER)" in data, "Particle (1365)" on occasions, and "Particle" on home. Laya's brand is "Ne'emah / Ene'emahe", which looks like a typo, and the brand filter label repeats it.
13. **Dead tags.** "City Centre" is on all 20 bottles, so it is meaningless. Parks, Malls and Clubbing are tagged but have no filter or page. Also, `occasions.html` has both an `id="office"` `<a>` and an `id="work"` section.

## P2 — code quality / UX

14. **innerHTML templating with unescaped data.** Names, notes and descriptions go into `innerHTML` in about 15 places. Today that only allows self-XSS via the Add Bottle name, because it is stored in localStorage on one machine. It becomes real if data ever comes from a shared source. Escape the data, or use `textContent` like the modal already does.
15. **Unused data.** Fields that `data.js` carries but no page shows:
    - `mainAccords` percentages and colours (PLAN's headline "Fragrantica accord bars");
    - `longevity`, `sillage` and `wardrobeArchetype`;
    - the maceration fields;
    - `purchaseSource` and `gender`.
    
    Either render them or drop them.
16. **Hard-coded counts.** "Show All 20 Bottles", "ALL 20 FRAGRANCES", "View All 6 Gym Bottles" and "ranks all 19" will go wrong once a bottle is added.
17. **Collection filters have loose matching:**
    - occasion matching is two-way substring (`o.includes(t) || t.includes(o)`);
    - the "aquatic" filter matches any note containing "water", e.g. Wood Miracle's "Water Jasmine";
    - "Sort: Bottle Volume" actually sorts by fraction remaining.
18. **Dark-mode flash.** The theme is applied on `DOMContentLoaded` from external JS, so dark-mode users get a white flash. An inline `<head>` snippet would fix it.
19. **Mobile header.** At 375 px the header "Add Bottle" button sits against the right edge and the hero paragraph looked clipped in the screenshot. The browser emulation reported a 463 px viewport, so check this on a real device.
20. **Long immutable cache on images.** `vercel.json` sets `/assets/*` to `max-age=31536000, immutable`, but filenames aren't hashed. Image swaps (the whole 10-11 image fix round) won't reach repeat visitors for a year. Use a shorter max-age or versioned filenames.
21. **One-off scripts left in `scripts/`.** `add_occasions.js`, `update_data_images.js`, `crop_bottles.py`, `process_fixed_studio_images.py` and `download_studio_images.py` are undocumented, and some are now stale. `assets/bottles/` holds 23 studio images, but only about 20 are used; `initio_side_effect`, `xerjoff_naxos` and `maison_hero` look unused. 20 `cropped/` and 9 `user_photos/` files are unused too.
22. **No `package.json`.** Tests are a single node script with no lint. That is acceptable for the size; just noting it.

## Docs / protocol compliance (bundle `00-START-HERE` / `BOOT` / templates)

23. **`docs/HANDOFF.md` is not in template format.** It is about 140 lines of project overview. It has no Updated-by, Branch, HEAD, Status, Tree, Workspace ID, Routing, Next steps, Tests or Blockers lines, and the template limit is about 60 lines. It is also still byte-identical to root `HANDOVER.md`, which AGENTS says should not exist as a second source. HANDOFF also references `assets/bottles/studio/fa_after_effect.jpg`; the real file is `after_effect_fa_paris.jpg`.
24. **`SHARED_NOTES.md` is stale.** The last entry is 2026-10-11 01:59Z. At least 8 later commits have no entries, including the 10-11 audit, README, SOTD, the 10-12 overhauls and the footer. The top entry still mentions a pending Vercel device code; the deploy is live now.
25. **Wrong root path.** `AGENTS.md`, `HANDOFF.md` and `HANDOVER.md` give the root as `S:\Otis Projects\…`; the drive is `N:` now. BOOT says to locate by folder name, so write it drive-agnostic.
26. **`docs/PLAN.md` and `docs/ACTIVE.md` are outdated.** They still describe the dark admin dashboard (upload, import/export, accord bars, volume slider), and all PLAN acceptance boxes are unchecked. The real product is a light editorial showcase. Mark the plan superseded or rewrite it. There is also no `docs/DECISIONS.md` despite lasting choices: the multi-page pivot, light default, plain-English naming, Vercel + redirects, localStorage.
27. **Branch drift.** Only `master` exists locally. `main` exists only on the remote, and HANDOFF says to push both. Pick one default.
28. **Missing protocol extras.** Neither the Routing line nor `docs/routing-log.jsonl` exists. `.agents/skills` exists but is empty, while ACTIVE claims skills were installed (impeccable, taste-skill, etc.).
29. **Audit file location.** `docs/[PC] AUDIT-2026-10-11.md` sits in `docs/`, not `docs/audit/`. Move it if you want one folder.
30. **What is fine:**
    - `.gitignore` covers `.env*`, `.vercel` and the bundle;
    - `.env.local` exists but is untracked;
    - no secrets were found in tracked files;
    - CLAUDE.md and GEMINI.md correctly contain `@AGENTS.md`.

## Tests
- Passed: `node test/validate-inventory.js` → "ALL … CHECKS PASSED" (20 bottles, 11 occasion tags, data-ids across 5 pages).
- Passed (manual): no console errors on any page; all referenced assets exist; no dead in-site anchors; `/vault` returns 308 on prod.
- Not run: real-device mobile check, dark-mode visual pass, Lighthouse/accessibility audit.
- Validator gaps: it does not check the home-page preview tags (#6), footer rule compliance (#1, #2), or the localStorage sync (#5).

## Suggested order
1. Restore the GitHub icon and add the Tailscale link in the footer (#1, #2). Restore the AGENTS secret rule, then commit (#3).
2. Fix the localStorage sync (#5). It is a one-function change and unblocks every future data fix.
3. Decide the image licensing approach (#4). That decision is yours.
4. Build the home-page previews from data (#6). Rework the calculator so boosters stop dominating, and use one source for the curated pairs (#7). Align the spray advice (#8).
5. Bring the docs back to protocol: template HANDOFF, delete or merge HANDOVER.md, add SHARED_NOTES entries, update PLAN/ACTIVE, add DECISIONS.md, and use drive-agnostic paths (#23–28).
6. Extend the validator to cover the footer rules and the preview-tag consistency.

## Questions for owner
- Images: own photos, attributed third-party, or keep as is?
- Should the license be MIT or "All rights reserved"?
- Should "Add Bottle" stay, given it is local-only and fills in fake defaults, or be removed for a public showcase?
- Default branch: `master` or `main`?
