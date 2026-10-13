# Project decisions

Updated 13 October 2026 by Codex.

1. Retain the five-page editorial design and complete the original inventory-manager scope. The light theme remains default with a persistent dark option.
2. Use plain-English page names: Home, All Fragrances, Occasions, Layering and Guide. Keep permanent legacy route redirects.
3. Use validated versioned browser storage for owner edits, custom bottles and explicit deletions. Seed metadata remains current; stale cached seed descriptions must not replace current source. JSON transfer requires validation and preview before mutation.
4. Uploaded photographs accept bounded decoded JPEG, PNG and WebP only. External image URLs and SVG uploads are excluded.
5. Display supplied owner bottle crops or original project SVG fallbacks. Preserve original source photographs and third-party studio material outside generated production output. Third-party permissions remain unverified; MIT applies to code, not those photographs.
6. Publish only an explicit build allowlist. Keep stable image caching revalidating at one hour; apply CSP, frame, MIME, referrer and permissions headers. Hosting supplies HTTPS/HSTS.
7. Label subjective fragrance ratings, volumes, performance and recommendation scores as provisional curated estimates. Unknown custom fields remain unknown. Layering compatibility is a heuristic, not a chemical or wear-performance guarantee.
8. Keep GitHub's verified default branch `master`. Preserve remote `main`; no forced branch changes or history rewrites. Push/build/live verification are separate states.
9. `docs/HANDOFF.md` owns current continuation state. Root `HANDOVER.md` is only a pointer. Preserve historical audits and notes as evidence.
10. Tailscale configuration remains an operator action. The desktop-smsroim endpoint is a historical project reference. Read-only status identifies this PC as gaming-pc with other project routes and no fragrance 62872 route. A prospective dedicated HTTPS 62872 route must preserve existing routes; no configuration was changed or fragrance connectivity verified.
11. Historical one-off rewriting/download scripts refuse writes and downloads. Future image work preserves sources and explicitly reviews intended crops before publication.
