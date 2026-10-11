# Current Handoff
- Project: Fragrance Dashboard
- Updated by: Antigravity; Gemini 3.8 Flash (High); inline; Antigravity
- Updated at: 2026-10-11T00:20:45Z
- Root: S:\Otis Projects\fragrance-dashboard
- Branch: master
- HEAD: 2a26afd
- Status: READY — Tailscale active, 15 bottles integrated, initial commit 2a26afd
- Tree: Clean workspace with active Tailscale daemon
- Workspace ID: initial
- Routing: Tailscale serve & Voj Mega Guide integration — JEV: inline, gemini-3.8-flash:medium -> used: inline, Gemini 3.8 Flash (High)
- Usage: not measured; 0 retries; 0 escalations

## Objective
Provide an ultra-luxurious Fragrantica-style Fragrance Dashboard for Perfume Parlour and other bottles, accessible across the user's Tailnet with full bottle photos, note pyramids, and comprehensive guides.

## Done
- Spun up HTTP server on random port 62872.
- Configured Tailscale serve daemon (`https://desktop-smsroim.tail0be63c.ts.net/` proxying `127.0.0.1:62872`).
- Verified accessible via Tailnet and local IP (`100.92.173.32:62872`).
- Researched and integrated Voj's "MEGA Fragrance Guide" (`zFuOJ7q6UV4`):
  - Added "The Concentration Spectrum" (EDT 5-15%, EDP 15-20%, Extrait 20-40%, Perfume Oil 100%) to Pro Tips.
  - Added "Molecular Evaporation Physics" (heat amplification vs cold air compression) to Pro Tips.
- Verified test suite (`test/validate-inventory.js`) — 100% pass across all 14 bottles.

## In progress
- Awaiting user clarification on the black glossy PP bottle in photo 5 and front-row roll-on oil caps.

## Next steps
1. User can open the dashboard directly on mobile or tablet using their Tailscale HTTPS link.
2. If user provides names for the obscured bottles, add them to `js/data.js`.

## Tests
- Passed: `node test/validate-inventory.js` (14 bottles, 9 occasion tags, 5 wardrobe archetypes validated cleanly).
- Passed: `curl -k -I https://desktop-smsroim.tail0be63c.ts.net/` -> HTTP 200 OK.
- Failed: None.
- Not run: None.

## Gotchas / do not undo
- Tailscale serve is proxying `http://127.0.0.1:62872` to `https://desktop-smsroim.tail0be63c.ts.net/`.
- Mandatory footer GitHub icon links to `https://www.passportpowell.com/card`.

## Blockers / errors
- None.

## Open questions for user
- Which Perfume Parlour scent is the black glossy bottle in the back row of Photo 5?
- What scents are the roll-on oil caps in the front row?
