# CC Fest Coding Camp Tools

Source files for the CC Fest Coding Camp GitHub Pages site: p5.js teaching tools, concept bridges, and starter sketches.

## Role of this directory

This directory is the source of truth. Make normal edits here first:

- homepage content and layout
- shared CSS and JavaScript
- concept bridge pages
- workshop tool pages
- starter sketch pages
- images and public assets

After editing source, sync to `docs/` with the root deploy script:

```sh
./deploy.sh "Describe the update"
```

## Live site

The live site is published from the repository `main` branch using the `/docs` folder:

https://saberkhan372.github.io/CC-Fest-Coding-Camp/

## Structure

### Pages
- `index.html` — homepage gallery and learning pathway
- `about.html` — local About page (linked from topbar, hero, and footer)
- `concept-map.html` — swimlane SVG concept map (41 nodes, mobile list fallback)
- `sessions/` — sessions listing and generative poster template

### Shared stylesheets
- `site.css` — homepage and shared design tokens
- `site-components.css` — reusable component layer (`.teaching-note`, `.try-next`, `.maker-credit`, `.poster-proof`)
- `tool-page.css` — shared layout shell for standalone workshop tool pages
- `starter-sketch.css` — lighter shell for starter sketch seed pages
- `sessions.css` — sessions listing and poster page styles
- `concept-bridges/concept-bridge.css` — shared stylesheet for all concept bridge pages

### Shared JavaScript
- `site.js` — homepage: suit filtering, search, collapsible sections, curated paths, "Best first" row. Pathway and difficulty filter composition is planned in Phase 12 of the roadmap.
- `workshop-tool-pages.js` — data and renderer for the 11 JS-rendered workshop tool pages
- `starter-seed-pages.js` — data and renderer for the 44 JS-rendered starter sketch pages
- `preview-sketches.js` — card-level canvas previews using IntersectionObserver
- `p5-export-helper.js` — "Copy Code", "↗ p5 Editor", "Save Image", "⛶ Fullscreen", and "Copy link" buttons injected on every tool page. Also handles `?embed=1` projection mode (hides nav, rhythm strip, and teaching panels).
- `tool-state-utils.js` — URL hash state sync for workshop tool controls. Exposes `window.CCFestToolState = { syncToURL, loadFromURL }`. Loaded by the 11 JS-rendered workshop tool shell pages.
- `concept-map-data.js` — node and edge graph data for the concept map page (41 nodes, 44 edges from 6 priority bridge try-next links). Loaded by `concept-map.html`.
- `hero-sketch.js` — interactive code-token parallax poster in the homepage hero

### Tool directories
- `tools/` — one folder per workshop tool or starter sketch; each contains `index.html`
- `concept-bridges/` — one folder per concept bridge page; each contains `index.html`

## Library organization

- `Interactive Tools` are the workshop-ready experiences with a shared teaching layout:
  workspace, controls, code preview, sketch state, and Try / Notice / Remix prompts.
- `Starter Sketches` are lighter remix seeds for live coding, demos, and extensions.

## Publishing notes

- GitHub Pages serves the synced `docs/` directory, not this directory directly.
- `deploy.sh` copies this source directory into `docs/`, stages both sides, commits, and pushes.
- Keep source and `docs/` in lockstep so local review and the published site match.

## Notes

Most tools still load `p5.js` from a CDN. If you want fully offline-downloadable tool folders later, add a shared `assets/` or `libraries/` folder and update each tool to use a local p5 file.
