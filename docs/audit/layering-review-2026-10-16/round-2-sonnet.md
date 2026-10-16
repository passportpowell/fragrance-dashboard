## Round 2 reply

**Concessions**
- My two-shared-note gate and flat "90 ceiling" were invented rules. Neither is measured or standard perfumery logic, and I withdraw both.
- Gemini is right that model agreement isn't validation. Two models agreeing on a text-pattern match proves nothing about skin.
- Keep the scores only as subjective editorial rankings. A 1–3 point gap (91 vs 93) means nothing, so the UI shouldn't imply it does.

**Gemini claims the inventory doesn't support**
- "Unequal longevity" for Oud Wood spray vs Laya EDP. The inventory gives only concentration labels, not longevity.
- "Double oud can skew medicinal." This is an invented sensory claim.
- Iso E Super gives "neutral structural space without clashing." Particle's listed notes are cedar, ambergris and amber. Neutrality is not in the evidence.
- "Lynx format mismatch." Lynx is a daily fragrance, but the format has no demonstrated effect on layering.
- The 84/83 scores for removed pairs don't come from the supplied scoring code. The code gives primer-only pairs at most 82, and the other fallback scores are formula-derived.
- Astray Fruit has no listed vanilla note, only a "Vanilla & Tonka" accord. Gemini's "shared vanilla" is overstated.

**Shortlist (keep existing curated scores; ordering within the list is not meaningful)**

1. **Astray Fruit + After Effect: KEEP (95).** Shared sandalwood and boozy accords. Cherry liqueur, almond and rose sit against rum, cinnamon and tobacco.
   - Copy: *"Dark Cherry & Warm Rum — Both are boozy and share sandalwood; cherry-almond-rose meets rum-cinnamon-tobacco. Editorial idea, untested on skin. Risk: very sweet and heavy."*
2. **Oud Wood spray + Laya: KEEP, REVISE copy (94).** Both list oud, amber and vanilla.
   - Copy: *"Smoked Oud & Creamy Vanilla — Both list oud, amber and vanilla; Oud Wood adds cardamom, pepper and vetiver. Editorial idea, untested. Risk: overlapping notes may feel redundant."*
3. **Oud Wood spray + After Effect: KEEP, REVISE copy (93).** Shared sandalwood, vanilla and warm-spicy accords.
   - Copy: *"Smoked Oud & Warm Rum — Shared sandalwood and vanilla; oud and rosewood alongside rum and tobacco. Untested. Risk: cinnamon, saffron and pepper may stack sharply."*
4. **Astray Fruit + Noir Extreme: KEEP, borderline (93).** Shared rose, jasmine and sandalwood. Cherry and almond sit against cardamom, saffron and kulfi.
   - Copy: *"Dark Cherry & Kulfi Amber — Shared rose, jasmine and sandalwood. Untested. Risk: two sweet gourmands with little fresh contrast."*
5. **After Effect + Particle: KEEP as optional molecular layer (96 → revise to 91).** I can't justify 96 from notes alone.
   - Copy: *"Rum & Iso E Super — Optional cedar-ambergris layer over a dense gourmand. Editorial idea only; projection and longevity unknown."*
6. **Voux Elegante + Particle: KEEP as optional (94 → revise to 91).** Same caveat; Voux already lists cashmeran and tobacco.

**REMOVE from the ≥90 list.** These fall to fallback scores and show "wear solo":
- **Sweet Water + Intenso Water.** The notes are heavily redundant (sea notes, bergamot, rosemary, patchouli), not contrasting.
- **Herb Garden + Intense Aroma Exploding.** Apple against cumin and pimento is a plausible clash.
- **Mahogany Woods + After Effect.** The boozy overlap is ambiguous.
- **Lynx + Noir Extreme.** The Lynx pyramid is sparse, so there is too little to judge.
- **Navy Intense, Wood Miracle and The One + Particle.** Each base already lists cedar, so Particle adds little by note overlap. That is plausibility, not measurement.
- **Herb Garden / Intense Aroma + Particle.** I can't justify ≥90 from the notes.
- **Dark Chocolate + Kulfi Amber and Dark Chocolate + Ambroxan.** I can't justify ≥90 from the notes.
- **Leaf Flavour + Citrus Particle.** I can't justify ≥90 from the notes.

**Navy Intense + Particle: indoor NQ64 event vs solo**
- Navy Intense already has cedar, amber and sandalwood, so Particle adds little new by notes. I assume a warm, crowded indoor setting, which would make a denser stack harder to judge.
- **Recommendation: REMOVE the pairing and wear Navy solo.** Layering for a first time at an event is the riskiest option.
- Copy: *"Navy Intense — No pairing meets our 90/100 editorial threshold. Best worn on its own."*

**Code/copy fixes**
- Drop "Start with one light spray of X…" ordering from `sequence`. The primer-first rule is unsupported.
- Replace it with: *"Application order and ratios are untested. Try each fragrance on separate pulse points first."*
- Use Gemini's heading and subtitle with "Editorial Fit (Untested)" labelling.
- Keep `layeringAdvice` as: *"Suggested trial: ${partner.name} (${score}/100 editorial fit; untested). Start lightly."*

**Evidence split**
- **Subjective aesthetic confidence:** moderate for #1–#3, low-to-moderate for #4–#6. These are paper judgments from note lists.
- **Measured evidence:** none. There are no wear tests, chemical data or longevity data, so no performance improvement is guaranteed.

rtk: Failed to resolve 'gemini' via PATH, falling back to direct exec: Binary 'gemini' not found on PATH
