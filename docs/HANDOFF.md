# Fragrance Dashboard — current state
Updated: 2026-10-16 17:23 UTC | Codex / GPT-6.1 Sol

## Request order
- Minimum90 layering separately pushed: ce185b9 on master and main.
- Initial NQ64 advice delivered, then revised after review: Navy Intense solo, start2 sprays.
- Accuracy audit separately pushed: d737b3e; Vercel production Ready.
- New request: three model exchanges, refine pair accuracy/copy and rebuild dashboard. Implementation complete; publishing next.

## Reviewed release
- All6 review calls succeeded through Gemini CLI,3 rounds each, high effort.
- Model IDs: gemini-3.8-flash-high and claude-sonnet-5-5-high. No Claude CLI fallback needed.
- Retained4 exploratory pairs: After Effect/Particle; Astray Fruit/After Effect; Voux Elegante/Particle; Oud Wood spray/After Effect.
-14 weaker overrides removed. Existing96/95/94/93 scores are hand-assigned editorial preferences, untested; small differences are not meaningful.
- Specific rationale/caution per pair; no deterministic order, ratio, timing or performance claims.
- Automatic tag scores capped89; edited scent identity/profile cannot inherit curated scores.
- Inclusive90 filter enforced on home, curated, interactive and detail views. Empty means no listed suggestion, not proven incompatibility.
- Improved all5 pages, layering metadata, view labels and guide.
- Earlier audit fixed104g/ml error, unverified maturation/purity claims and footer counts.

## Verification
-27 Node tests passed;20-record/5-page source validation passed;37-file build passed.
-29 Chromium checks passed: four-pair rendering, cautions, Navy no-result, minimum90,20 layout/theme cases and storage/editor/focus checks; no page errors.
- Snapshot refs/agent-checkpoints/layering-review-20261016 and mechanical change review completed.
- Publish reviewed release next, then verify remote refs and live source/behaviour.

## Evidence
- docs/audit/LAYERING-REVIEW-Codex-2026-10-16_18-22-BST.md
- docs/audit/layering-review-2026-10-16/README.md and6 raw model responses
- docs/audit/ACCURACY-AUDIT-Codex-2026-10-16_17-58-BST.md

## Operations and limits
- GitHub default master; Vercel production main. Push both normally, no force.
- Public https://fragrance-dashboard.vercel.app
- SMB index writes unreliable. Temporary index E:/fragrance-audit-git/index allowed commit-tree then update-ref with expected parent. Sources remain in original project.
- Storage schema unchanged; owner edits/backups preserved. Detailed bottle facts and personal performance still provisional.
- Dedicated Tailscale route remains unconfigured; unrelated routes untouched.

## Routing
JEV inline/Luna medium (confidence0.50); actual integration GPT-6.1 Sol current session. User explicitly selected review models/high effort.
