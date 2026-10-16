# Layering review and page rebuild — Codex

16 October 2026, 18:22 BST.

## Requested process

Completed three sequential back-and-forth rounds: Gemini first, Sonnet responding, then each responding to the preceding critique. All six calls succeeded through the installed Gemini CLI. Model IDs were selected from its live model list: gemini-3.8-flash-high and claude-sonnet-5-5-high, each with effort high and mode plan. No fallback to Claude CLI was needed for this review. The earlier general audit's separate Claude CLI attempt was weekly-limit blocked. CLI selection is recorded; provider-level reasoning/usage telemetry was not available.

Transcripts: [rounds and decisions](layering-review-2026-10-16/README.md). Outputs are proposals containing rejected claims, not established fragrance facts.

## Final decisions

Retained four exploratory pairs, each with a specific scent rationale and caution:

1. After Effect + Particle: rum/spice/tobacco against a simpler woody-amber profile. Existing editorial score96 retained. Extra diffusion or longevity is not established.
2. Astray Fruit + After Effect: cherry/almond and rum/tobacco, shared sandalwood and sweet accords. Score95 retained. Sweetness may overlap.
3. Voux Elegante + Particle: honey/tobacco/lavender with a simpler woody-amber profile. Score94 retained. The molecular layer is optional; its effect is unknown.
4. Oud Wood All Over Body Spray + After Effect: shared sandalwood/vanilla with woods, rum and tobacco. Score93 retained. Several spices overlap; format labels cannot establish actual wear.

These pre-existing numbers are subjective editorial preferences, not recalibrated measurements or probabilities. Small differences are not meaningful. No owner wear tests were supplied. Model agreement did not validate physical compatibility.

Removed14 curated overrides: Oud Wood/Laya, Leaf Flavour/Citrus Particle, Astray Fruit/Noir Extreme, Herb Garden/Particle, Herb Garden/Intense Aroma Exploding, Noire Illusion/Noir Extreme, Noire Illusion/Second Particle, Intense Aroma Exploding/Particle, Sweet Water/Intenso Water, Wood Miracle/Particle, Navy Intense/Particle, Mahogany Woods/After Effect, The One/Particle, Lynx/Noir Extreme. Reasons were insufficient basis, redundant profiles, unresolved note provenance or borderline dense combinations. Removal does not establish that a pairing smells bad.

## Rejected model claims

- Invented skin-pH, volatility, molecular aeration and projection-enhancement explanations.
- Lynx misidentified as aerosol despite recorded pump format.
- Fixed waiting times, mandatory application order and a never-spray-over rule.
- Unsupported two-shared-note gate and universal90 ceiling.
- Exact score adjustments presented as though calibrated.
- Concentration labels used to infer evaporation or longevity.
- Claims a fragrance is proven better alone or every removed pair is incompatible.

## Implementation

- Four curated definitions now hold actual rationale and caution copy instead of generic praise.
- Automatic tag-based scores are capped below90, preventing removed/untested combinations from resurfacing at the cutoff.
- Edited name, brand, concentration, notes or accords invalidate the original curated score; photo/volume edits do not.
- All four recommendation surfaces enforce the same inclusive90 threshold. Empty states explain that no pairing is listed.
- Removed deterministic spray order/timing. No ratio has been tested.
- Improved all five page introductions, layering metadata, view names, guide and homepage links. Removed promises to calculate measured compatibility, rank every bottle or prescribe spray orders.
- Scores explicitly labelled editorial and untested on all recommendation cards and advice.

## NQ64 recommendation revision

Personal starting recommendation: Navy Intense on its own, initially two sprays, assessing before adding more. This supersedes the earlier Navy+Particle suggestion, which no longer meets the curated shortlist policy. It is a considerate personal choice for the event, not evidence of superior solo performance. Venue context: [official NQ64 Birmingham](https://nq64.co.uk/birmingham/).

## Verification

- 27 Node tests passed, including boundary90, rejected89, all view filters, identical unreviewed tag matches, and edited-profile score invalidation.
- 29 Chromium checks passed, including actual four-pair rendering, cautions, Navy empty result, After Effect's three partners,20 page/viewport/theme combinations and existing manager/storage/focus workflows. No page errors.
- Source validator passed for20 records and5 pages; rebuilt37 allowlisted files.
- Git checkpoint refs/agent-checkpoints/layering-review-20261016 created before implementation; change_review snapshot/diff comparison run.
- Prior accuracy audit published separately at d737b3ebe897496b0f34c616be3bceaf5797cea5 after threshold release ce185b97c764d8f40b07b0cee9103b4045b61ef8.
- Final code and live publication verification follows this report; see HANDOFF and final response.

Routing: JEV inline/Luna medium recommendation; used current GPT-6.1 Sol session for integration. User explicitly selected the two external review models and high effort.

## Published verification

Release822712bdd4ded9a5e5d01fd1685d5cc6ee41482e reached master and main. Vercel built only a preview for that dual-ref push despite configured main production; its exact Git SHA and READY state were checked, then it was promoted to the existing production site. Production is Ready at fragrance-dashboard-qakl2wl7j-otisofro-3725s-projects.vercel.app. All12 checked production bodies match release Git blobs by SHA-256. Live Chromium:4 curated cards, Navy0 partners, After Effect scores96/95/93, no page errors or mobile overflow. Four private/source paths returned404; configured security headers were present. [Raw evidence](LIVE-VERIFICATION-Codex-2026-10-16.json).
