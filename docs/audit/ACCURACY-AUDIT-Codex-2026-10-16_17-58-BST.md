# Project accuracy audit — Codex

Date: 16 October 2026, 17:58 BST.
Scope: five pages, active JavaScript/data/storage, build/publication configuration, tests, and reconciliation with the three existing audits and remediation report. This audit establishes software behaviour and corrects substantiated content defects; it does not certify every bottle or subjective score.

## Findings and implemented corrections

1. **P1 — Layering threshold bypass in bottle details.** Detail tips used historical free text outside the ranked recommendation pipeline. All detail tips now use the same minimum-90 selector as home and layering views. No qualifying option explicitly recommends solo wear. Added regression coverage for the 89/90 boundary and empty results.
2. **P1 — Mass incorrectly represented as volume.** Mahogany Woods recorded its 104g aerosol packaging as 104ml, with an invented remaining volume. Both ml fields are now unknown; the recorded 104g format remains visible. No density conversion is inferred. Owner overrides remain explicit and recoverable under the existing storage rules.
3. **P1 — Unsupported maturation and projection assertions.** All 20 seed records now leave resting observations unrecorded and timed maturation unknown. Removed unsupported claims that layering extends projection or longevity. Removed molecular purity claims, universal praise and a misleading cold-weather protection statement. Editorial scent descriptions remain; note names do not certify raw ingredients or geographic sourcing.
4. **P2 — Score terminology.** Curated and homepage copy explicitly identify editorial scores, not measured compatibility percentages. The new threshold is 90 points out of 100, inclusive. Existing curated scores present on entry were preserved, not independently validated or inflated by this audit.
5. **P2 — Footer counts drift after inventory changes.** Converted remaining fixed twenty-bottle footer statements to the existing dynamic collection-count hook.
6. **P2 — Provenance incomplete.** Seed notices now include notes, accords, packaging and years among provisional fields, alongside ratings, volume, similarity and wear/performance estimates. Existing explicit owner edits are preserved.

## Manufacturer cross-checks

- [Intenso Water 1329](https://perfume-parlour.co.uk/products/intenso-water-for-men-1329): Profondo reference confirmed. Existing green/citrus/marine profile is consistent; the dashboard note list is not represented as exhaustive.
- [Sweet Water 1262](https://perfume-parlour.co.uk/products/sweet-water-for-men-1262): Profumo reference and aromatic/incense profile confirmed. These two references should not be swapped.
- [Citrus Particle 0616](https://perfume-parlour.co.uk/products/citrus-particle-0616): manufacturer describes Iso E Super and mandarin. This does not establish the purity or exact concentration of the owner's finished spray.
- [Second Particle 1980](https://perfume-parlour.co.uk/products/second-particle-ambroxan-1980): Ambroxan-based profile confirmed. Removed the unsupported claim of a pure finished product.
- [Noir Extreme EDP](https://www.tomfordbeauty.com/products/noir-extreme-eau-de-parfum): kulfi/spice/woody amber description supported; universal ranking claim removed.
- [Voux Elegante](https://www.pariscornerperfumes.com/products/voux-elegante-emir): 100ml and honey/tobacco/citrus/lavender profile supported.

Manufacturer listings offer multiple formats and cannot prove the concentration, remaining volume, age or authenticity of an individual owned bottle. The prior black-flacon Extrait decisions were retained as provisional inventory records. No source found in this bounded check established Laya's detailed composition. Remaining clone references and detailed notes are curated, not individually manufacturer-certified. Ratings, seasons, similarity, projection and numerical compatibility remain subjective.

## Software and historical audit reconciliation

Reviewed existing audit findings against current implementation and validation seams. Injection escaping, URL filters, input/schema bounds, image restrictions, recovery export, stale-tab protection, JSON round trips, editor controls, dynamic occasions, focus handling, responsive pages, CSP, redirects and publication exclusions remain covered by the current tests. Historical reports remain unchanged. No new server, dependency, authentication surface or storage schema was introduced.

## Verification

- 26 Node tests passed, including new threshold/view/data regressions.
- Source validator passed for all 20 records and five pages.
- 28 Chromium integration checks passed, including 20 page/viewport/theme combinations, editor/photo/backup recovery, focus and stale-tab behaviour; no page errors.
- Production build passed as part of deployment tests.
- Independent Claude review attempted but unavailable due weekly limit. Fresh-context same-family reviewer identified the homepage score-label inconsistency; corrected. No other concrete regression reported.
- First requested push completed separately: ce185b97c764d8f40b07b0cee9103b4045b61ef8 on both master and main. Vercel production reported Ready. Audit changes are published in a separate subsequent commit; final remote/live evidence is reported after publication.

## Limits and follow-up evidence

Real bottle labels, measured remaining volumes, personal wear tests and screen-reader/physical-device acceptance still require owner evidence. Existing Tailscale endpoint is a required historical reference, not verified fragrance service connectivity. No blanket claim of factual certification is made.

Routing: JEV inline / GPT-6 Luna medium (0.76 worker confidence); actual work current GPT-6.1 Sol session, model switching unavailable. Reviewer: fresh-context same-family fallback.
