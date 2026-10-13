# Otis Powell Fragrance Collection

A five-page personal fragrance dashboard with a local browser inventory. HTML, CSS and vanilla JavaScript; the Node build and tests use only the standard library.

## Run and verify

Use Node.js 22 or later. No dependency installation is required.

```sh
node --test test/*.test.js
node test/validate-inventory.js
node scripts/build.js
python -m http.server 62872 --bind 127.0.0.1 --directory public
```

Open http://127.0.0.1:62872. Serve the generated `public/` directory, never the repository root. The same checks are available through `npm test` and `npm run build`.

[Published collection](https://fragrance-dashboard.vercel.app/collection) — verify production parity separately from this branch.

## Inventory and estimates

The application keeps owner changes in browser storage on the current origin; it does not synchronize between devices. JSON export/import is the backup and transfer workflow. Keep an exported backup before clearing browser data. Unknown custom bottle fields stay unknown.

Fragrance scores, volumes, performance and layering recommendations are provisional curated estimates, not chemical measurements, authenticity verification or guaranteed outcomes.

## Publication

Vercel builds `public/` from an explicit allowlist in `scripts/build.js`. Source photographs, historical third-party studio images, internal documentation, installed skills and Git metadata are excluded. The code has no package dependencies. Clean URLs and legacy redirects are defined in `vercel.json`; stable image filenames use a one-hour revalidating cache. Security headers prohibit inline scripts; inline styles remain allowed for current UI rendering. HTTPS/HSTS is provided by the hosting platform.

The verified GitHub default branch is `master`, while Vercel's configured production branch is `main`. Develop and review on `master`; publishing the existing production site requires a normal fast-forward push of the same verified commit to `main`. Preserve both histories; never force-push or change cloud branch settings by habit. A successful push/build does not establish production parity; inspect the deployed routes, headers and source responses after deployment.

The project-configured historical tailnet endpoint is https://desktop-smsroim.tail0be63c.ts.net/; its availability is not verified. Read-only status on this PC identifies `gaming-pc.tail0be63c.ts.net` and existing unrelated routes on 18765, 8765 and 33463 plus TCP 53677. No 62872 route exists. Preserve those routes. If the owner configures a separate fragrance HTTPS port, current installed Tailscale supports:

```sh
tailscale serve --bg --https=62872 http://127.0.0.1:62872
tailscale serve status
```

The prospective endpoint would be https://gaming-pc.tail0be63c.ts.net:62872/. It is not configured or verified. These are operator reference commands, not instructions to change configuration during routine development. Never use Funnel without explicit public-access authorization.

## Sources and continuity

See [assets/README.md](assets/README.md) for photography provenance and exclusions. MIT covers project code; photographs retain separate ownership. Public repository history may still contain original images; no history rewrite has been performed.

[docs/HANDOFF.md](docs/HANDOFF.md) is the current continuation record. [docs/DECISIONS.md](docs/DECISIONS.md) records enduring choices; audits remain in [docs/audit/](docs/audit/).

## Source evidence and browser checks

[Collection data](js/data.js), [inventory storage/schema](js/inventory.js), [interaction code](js/app.js), and [integrity validator](test/validate-inventory.js) are the implementation evidence. The optional `test/browser-smoke.js` uses an already-installed Playwright module and Chromium executable supplied with `--playwright <module path> --browser <executable path>`; it starts/stops an isolated loopback server and runs full manager, CSP, focus, cross-tab and layout checks. Browser fixtures never change the seed data.

Built and curated by [Otis Powell](https://github.com/passportpowell) · [LinkedIn](https://www.linkedin.com/in/otispowell/). 

## Review scope

The earlier bounded live review recorded a Noir Extreme search/detail check on 12 October. The current source has additional security and keyboard fixes with 23 automated tests and 28 Chromium checks; this is not a full physical-device, screen-reader or scientific certification. Scores remain subjective heuristics, and clearing browser storage can remove owner changes unless a JSON backup is retained.
