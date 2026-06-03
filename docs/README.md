# CC Fest Coding Camp Tools

Published GitHub Pages output for the CC Fest Coding Camp p5.js teaching tools, concept bridges, and starter sketches.

## Important

This directory is synced output. Make normal content, design, tool, and shared asset edits in `cc-fest-coding-camp-pages/`, then run the root deploy script:

```sh
./deploy.sh "Describe the update"
```

Direct edits in `docs/` should be rare live-site hotfixes. If you make one, immediately backfill the same change into `cc-fest-coding-camp-pages/`.

## Live site

The live site is published from the repository `main` branch using the `/docs` folder:

https://saberkhan372.github.io/CC-Fest-Coding-Camp/

## Structure

### Pages
- `index.html` — homepage catalog with card cues, search, lens filters, goal shelves, and live resource counts
- `about.html` — local About page
- `concept-map.html` — swimlane SVG concept map (41 nodes, mobile list fallback)
- `sessions/` — five-session arc, side spine, real session pages, and generative poster template

### Shared stylesheets
- `site.css` — homepage and shared design tokens
- `site-components.css` — reusable component layer (`.teaching-note`, `.try-next`, `.maker-credit`, `.poster-proof`)
- `tool-page.css` — shared layout shell for standalone workshop tool pages
- `starter-sketch.css` — lighter shell for starter sketch seed pages
- `sessions.css` — sessions listing and poster page styles
- `concept-bridges/concept-bridge.css` — shared stylesheet for all concept bridge pages

### Shared JavaScript
- `site.js` — homepage search, lens filters, live counts, catalog card cues, and goal shelves
- `catalog-data.js` — generated catalog metadata for all 135 bridge/tool/sketch resources
- `sessions-data.js` — shared five-session arc metadata used by listings, strips, and session pages
- `spine.js` — session spine wayfinding and sibling station rails
- `session-strip.js` — compact "Part of Session" strip for tools, bridges, and sketches
- `catalog-meta-strip.js` — runtime suit/level/pathway strip for static tools and concept bridges
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

- GitHub Pages serves this `docs/` directory.
- The source copy lives in `cc-fest-coding-camp-pages/`.
- Keep source and this published copy synced through `deploy.sh`.

## Notes

Most tools still load `p5.js` from a CDN. If you want fully offline-downloadable tool folders later, add a shared `assets/` or `libraries/` folder and update each tool to use a local p5 file.
