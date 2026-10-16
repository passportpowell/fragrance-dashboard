# Active checklist — layering review and rebuild

## Destination
Complete requested90+ recommendation rule, NQ64 advice, accuracy audit, then three-round model review and improved dashboard rebuild.

## Frontier
- [x] Threshold implemented and separately pushed: ce185b9.
- [x] NQ64 advice delivered; revised to Navy Intense solo after review.
- [x] Accuracy audit fixed and separately pushed: d737b3e.
- [x] Three exchanges between requested models via Gemini CLI, six successful calls.
- [x] Four-pair shortlist, per-pair rationale/caution, truthful score labels and page copy.
- [x] 27 Node tests,29 Chromium checks, source validation and rebuild passed.
- [~] Publish reviewed release and verify live bodies and behaviour.

## Fog of war
Pair scores are subjective, untested editorial ratings. Detailed owned-bottle facts still require owner evidence.

## Blockers
No source blocker. SMB Git index writes were unreliable; prior audit committed using a local temporary index and compare-and-swap update-ref. No source reset, deletion or history rewrite.
