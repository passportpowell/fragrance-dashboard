## Verdict on Gemini's round 1

I didn't use tools or edit files, so there is no `/plan` artifact. Everything below comes from the supplied inventory and code.

**Gemini's errors**
- **Unsupported claims.** These have no basis in the evidence:
  - "Aerates heavy rum"
  - "Solves projection limits"
  - "Turn sour on skin"
  - "Skin pH"
  - "Balsamic" for Laya, which isn't listed
  - "Lactonic/milky" kulfi, which is inferred from "Kulfi Accord"
- **Invented timing.** "Spray must precede extrait by 10 minutes" and "3–5 minutes to settle" have no source.
- **Lynx is wrong.** It is a pump daily fragrance, so "harsh aerosol" is false. Its removal rested on that claim.
- **Scores drift.** It reshuffled scores with no rubric. For example, Rum/Cherry went from 95 to 91 and Amber Tobacco from 90 to 92. Several "REVISE" items were set to exactly 90, which looks like threshold-fitting.
- **Internal contradiction it missed.** The code caps uncurated primer pairs at 82 with the note "projection and longevity are not established". Yet curated Iso E duos score 90–96 for the same bottles.

Gemini and I agreeing is model agreement, not validation. My scores below are one model's reading of listed notes.

## Rubric (note-based, no wear tests)

A score of 90 means the pair passes all four gates. 90 is also the **ceiling**, because without owner wear tests no pair can honestly exceed it. A failed gate scores 85, or 80 for a hard fail.
1. **Bridge:** at least 2 shared listed notes or accords. A failure is a hard fail.
2. **Contrast:** the companion adds a listed family the base lacks, and doesn't mostly duplicate it.
3. **No listed clash:** no opposed focal notes.
4. **Evidence depth:** both bottles list enough specific notes.

## Pair decisions

| Pair | Action | Score | Basis (listed notes only) |
|---|---|---|---|
| Astray Fruit + After Effect | KEEP | 90 (was 95) | Shares sandalwood, boozy and vanilla accords. Adds cherry, almond and rose. Heavy. |
| Oud Wood + Laya | KEEP | 90 (was 94) | Shares agarwood, vanilla and amber. Adds rosewood, cardamom and vetiver. |
| Oud Wood + After Effect | KEEP | 90 (was 93) | Shares vanilla, sandalwood and a warm-spicy accord. No listed clash. |
| Astray Fruit + Noir Extreme | KEEP | 90 (was 93) | Shares sandalwood, rose, jasmine and vanilla. Adds saffron and cardamom. Very sweet. |
| Lynx + Noir Extreme | KEEP | 90 | Shares mandarin, vanilla, amber and spices. Adds smoky oud. Gemini's removal reason was false. |
| Herb Garden + Intense Aroma Exploding | REMOVE from ≥90 | 85 (was 92) | Shares vanilla, black pepper and lavender. Cumin and pimento against crisp apple is a plausible clash (subjective). |
| Mahogany Woods + After Effect | REMOVE | 85 (was 91) | Near-duplicate boozy, vanilla and wood profile. |
| Sweet Water + Intenso Water | REMOVE | 85 (was 91) | Shares sea notes, bergamot, rosemary and patchouli. Little contrast. |
| Navy Intense, Wood Miracle or The One + Iso E Super | REMOVE | 85 (was 90–91) | Shares cedar, woody and amber. Iso E mostly duplicates their woody bases. |
| Warm Rum, Honey Tobacco, Spiced Tobacco or Crisp Apple + Iso E Super | REMOVE | 80 (was 92–96) | No shared listed note or accord. Matches the code's own 82 cap. |
| Leaf Flavour + Citrus Particle | REMOVE | 80 (was 93) | Only a generic "Woody Notes" overlap. |
| Noire Illusion + Noir Extreme | REMOVE | 80 (was 92) | One shared note (sandalwood) and two competing dessert profiles. |
| Noire Illusion + Second Particle | REMOVE | 80 (was 92) | No shared listed note. |

**Implementation note:** deleting an entry from `CURATED_SIGNATURE_DUOS` is enough to hide a pair. The fallback can reach 90 only if every accord is shared, which is effectively never.

**Code checks to run**
- The inventory has `accords` as a string array, but the code reads `mainAccords[].name`. I can't verify the mapping.
- The primer list in `getTopLayeringOptionsForFragrance` includes Citrus Particle, but the one in `calculatePairingSynergy` doesn't.

## Exact copy

**Heading:** Layering pairs worth trying

**Subtitle:** These pairings are editorial judgments based on the notes and accords we have on record for each bottle. They are not wear-tested or measured. How two fragrances sit together depends on your skin, so test on your own skin first.

**Score label:** `{score} editorial fit (note-based; untested)`

**Card note, replacing `sequence`:** Order and amount are untested. Start with less than you think you need and trust your own nose.

**Rationale template:** `{title}: shares {shared notes}; {companion} adds {new family}. Based on listed notes only.`

**`layeringAdvice` text:**
- Match: `Worth trying: ${partner.name} (${score} editorial fit, untested). Start lightly.`
- Empty state: `No pairing meets our 90 editorial threshold. Wear this one on its own.`

## Confidence split

**Subjective aesthetic confidence:** the five KEEP pairs read as plausible fits on paper. Even those are only moderate confidence, and "sweet on sweet" risk remains.

**Measured evidence:** none.

rtk: Failed to resolve 'gemini' via PATH, falling back to direct exec: Binary 'gemini' not found on PATH
