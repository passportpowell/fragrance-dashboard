# Audit remediation specification

Requested 13 October 2026: reconcile both current audits and the older audit, implement justified repairs in full, verify, and push GitHub.

## Decisions
- Retain the original inventory-dashboard scope alongside the five-page editorial design.
- Use existing owner bottle crops, preserve originals, exclude source photos, stock photography, internal docs and skills from production output.
- Keep source code under MIT; describe photography rights separately. Do not infer third-party image permissions.
- Keep GitHub's verified default branch `master`; preserve remote `main` without force pushes or deletion.
- Label existing fragrance scores, volumes and performance as provisional curated estimates. Unknown new fields remain unknown.
- Implement stable, validated version-4 storage: current seed plus explicit owner overrides, custom bottles and deleted IDs. Migrate only identifiable owner data from v3, never stale seed descriptions.
- JSON import is validated and previewed before application; invalid import/save never destroys the current collection.
- Images accept JPEG/PNG/WebP only, with decoded/resized uploads and bounded stored data. No external image URLs or SVG uploads.

## Tickets and dependencies
1. Core inventory/schema and regression tests. Blocks 2 and 4.
2. Secure rendering, complete manager, recommendations, filters and keyboard behavior. Blocked by 1; blocks 4.
3. HTML/CSS, own-photo references, build allowlist, cache/headers, source pipeline and documentation. Shares documented core interface with 2; blocks 4.
4. Integration, browser checks, independent review, audit closure matrix and GitHub push. Blocked by 1–3.

## Acceptance
Every original finding receives a verified repair, an explicit reconciled decision, or a concrete remaining limitation. No speculative chemical or product authenticity claims. Existing notes/audits remain preserved. Verify data/schema bounds, migrations, JSON round trips, rejected unsafe input, transactional failures, dynamic lists, keyboard/dialog controls, light/dark desktop/mobile, allowlisted output, live parity and remote commit identity. Never report blocked checks as passed.

## Routing
JEV recommends inline / gpt-6-luna:medium (execution 0.92, worker 0.36). Actual coordinator: GPT-6.1 Sol, session model cannot switch. Implementation remains inline; separate review may use an available permitted runtime.
