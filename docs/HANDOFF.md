# Fragrance Dashboard — current state

Updated: 2026-10-16 16:58 UTC | Codex / GPT-6.1 Sol

## Current request and sequence
1. Enforce >=90/100 layering options and push separately: complete, ce185b9 on master and main.
2. NQ64 Birmingham recommendation: Navy Intense + Particle; start 2 + 1 sprays. Given to user before audit. Score91 is editorial.
3. Accuracy audit and separate publication: fixes complete and tests passed; publishing next.

## Changes
- Home, curated, interactive and bottle-detail recommendations use inclusive90 threshold; honest solo fallback.
- Existing uncommitted curated scores were preserved. They are not measured probabilities.
- Corrected104g aerosol wrongly treated104ml; unknown ml remains blank.
- Removed unverified maturation, molecular purity and projection guarantees; expanded provisional provenance.
- Dynamic footer counts; consistent editorial-score copy.

## Verification
- 26 Node tests passed;20-record/five-page source validator passed; build passed.
- 28 Chromium checks passed including20 page/viewport/theme combinations; no page errors.
- Claude review unavailable: weekly limit. Fresh-context same-family review found score-label gap; fixed.
- First release Vercel production Ready. Verify audit release bodies after second push.

## Evidence
- docs/audit/ACCURACY-AUDIT-Codex-2026-10-16_17-58-BST.md
- docs/audit/LAYERING-Codex-2026-10-16.md
- Historical closure: docs/audit/REMEDIATION-Codex-2026-10-13_18-07-30-BST.md

## Publication
- GitHub master default; existing Vercel production branch main. Push both by normal fast-forward.
- Public URL: https://fragrance-dashboard.vercel.app
- No storage schema changes; preserve explicit owner edits and backups.

## Limits
- Detailed source profiles, scores, concentrations, years and volumes remain provisional unless confirmed.
- Manufacturer checks in audit support selected references/profiles, not every owned-bottle fact.
- Dedicated Tailscale route remains unconfigured; existing unrelated routes unchanged.

## Routing
JEV inline / GPT-6 Luna medium; actual GPT-6.1 Sol current session, no model switch available.
