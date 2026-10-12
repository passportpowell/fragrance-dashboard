# Otis Powell Fragrance Collection

A personal fragrance collection website built with HTML, CSS and vanilla JavaScript. It demonstrates catalogue filtering, search, detail views, browser-local persistence and a responsive interface without a framework or build step.

## Explore

- [Live collection](https://fragrance-dashboard.vercel.app/collection): search, sorting and filters for occasion, season, brand and scent profile.
- Home: seasonal suggestions from a curated collection.
- Layering: suggestions based on authored tags and compatibility scores.
- Occasions and Guide: personal collection notes and usage guidance.

The recommendation and layering scores are **curated heuristics**, not measured chemical compatibility or guaranteed performance. Scent-of-the-Day can randomly choose among eligible seasonal options. Personal ratings and descriptions are subjective.

## Source evidence

- [Collection data](js/data.js): curated fragrance records.
- [Interaction code](js/app.js): filtering, sorting, suggestions, detail modals and browser storage.
- [Inventory validator](test/validate-inventory.js): record integrity and referenced assets across five HTML pages.

On 12 October 2026, the inventory validator passed for 20 seed fragrances. A bounded live review confirmed that searching for Noir Extreme reduced the collection to one result and opened its detail view. This is not a full accessibility or security certification.

## Run locally

Serve the folder with python -m http.server 5173 --bind 127.0.0.1, then open http://127.0.0.1:5173. No dependency installation is required. Run node test/validate-inventory.js for the inventory check.

Collection additions, photos and theme preferences are stored in the current browser's localStorage. They are not an account-backed cloud archive; clearing browser storage can remove local changes. User-entered records flow into HTML templates, so untrusted imports/shared storage need a dedicated validation review before being supported. Detail-modal keyboard focus and dialog semantics also need a broader accessibility review.

## License

Code is covered by the [MIT License](LICENSE). Photographs, product branding and upstream descriptions may have separate rights; the code license does not confer ownership of those assets.

Built and curated by [Otis Powell](https://github.com/passportpowell) · [LinkedIn](https://www.linkedin.com/in/otispowell/)
