# Verdict: ACCEPT the maintainer's 4-pair cut, and reject Gemini's 6-pair roster and its copy

**Measured evidence: none.** There are no wear tests and no chemistry data. Everything below is subjective aesthetic judgment from listed notes. Agreement between models is not validation.

## Critique of Gemini round 3
- **Right:** keep 96/95/94/93 and don't invent adjustments. Say that small differences mean nothing.
- **Wrong:** keeping Laya and Astray+Noir Extreme. Laya's pyramid is odd (vanilla top, oud base) and unverified, and Astray+Noir is a dessert-on-dessert stack. Gemini itself labels the second one borderline.
- **Wrong:** "manufacturer-unverified". We have no manufacturer evidence, so say "unverified listing".
- **Invented claims** to delete:
  - "Never spray directly over each other"
  - "evaporation rates differ significantly"
  - "may mute Voux's citrus"
  - "high risk of cloying"
  - "performs best alone" and "best experienced solo"
  - the arcade/venue reasoning
  - "Iso E adds woody depth"
- **Inaccurate:** "based on accord affinity". The curated scores are hand-assigned, not computed.
- **Tone:** "Theoretical Accord Trials" overstates rigor. Use "ideas to try".

## Code changes
1. Keep only these four `CURATED_SIGNATURE_DUOS` entries (96, 95, 94, 93). Delete the other 14.
2. Add `rationale` and `caution` strings to each kept entry.
3. Change the automatic cap from `Math.min(90, …)` to `Math.min(89, …)`. Right now a shared-tag pair can hit exactly 90 and pass `MIN_LAYERING_SCORE`.
4. Delete `ordered`, `sequence` and the primer ordering. Return `sequence:''`.
5. Return `curated:true` only for pairs in the list. Every surface, including the detail view, must show a score only when `curated && score>=MIN_LAYERING_SCORE`. Otherwise show the no-trial copy.
6. Keep the marine penalty (45) and primer bonus (≤82). Both stay below the cutoff.

## Exact pair copy
Score label for all four: **"{n}/100 editorial score, untested"**.

| Pair | Rationale | Caution |
|---|---|---|
| After Effect + Particle (96) | After Effect lists rum, cinnamon, tobacco and vanilla. Particle lists only Iso E Super, cedar and ambergris notes, a sparse woody-amber profile. | Particle is minimal, so it may add little. The effect is unknown. |
| Astray Fruit + After Effect (95) | Both list boozy, sweet notes (cherry liqueur, rum) over vanilla/tonka and sandalwood. | Both are sweet and dense, so they may overlap or feel heavy. Judge by smell. |
| Voux Elegante + Particle (94) | Voux lists honey, tobacco, vanilla and lavender. Particle's listed woody-amber notes are a plain backdrop. | Whether Particle changes Voux's opening is unknown. |
| Oud Wood Spray + After Effect (93) | Both list vanilla and warm spice, and both include sandalwood or oud woods. | Spice notes overlap (cardamom, Sichuan pepper, cinnamon, saffron) and may read sharp. The concentrations also differ (body spray vs extrait). |

## Page-level copy
- **Subtitle:** "Layering ideas to try. Based on listed notes and the maintainer's taste. Not tested on skin."
- **Score disclaimer:** "Scores are hand-assigned editorial ratings of how plausible a pairing smells on paper. They are not measured compatibility, chemistry or wear-test results. Differences of a few points are not meaningful."
- **Application note:** "No order or timing has been tested. Try a small amount of each and adjust to taste."
- **`layeringAdvice`:** `` `Idea to try: ${option.partner.name} (${option.score}/100 editorial score, untested). Start lightly; results vary.` ``
- **No-qualifying-pair copy:** "No trial is listed for this fragrance. That means we haven't suggested one. It doesn't mean it clashes with anything or is better worn alone."
- **Navy Intense:** "Starting suggestion: wear Navy Intense on its own. This is a personal starting point, not evidence that it performs better solo."

## Confidence split
- **Subjective aesthetic confidence:** moderate, and only for these four pairs. The basis is note overlap plus taste.
- **Measured evidence:** zero. Don't use "validated", "synergy" or "best" anywhere.

No files were touched. Say so if you want this turned into a formal implementation plan before any edits.

rtk: Failed to resolve 'gemini' via PATH, falling back to direct exec: Binary 'gemini' not found on PATH
