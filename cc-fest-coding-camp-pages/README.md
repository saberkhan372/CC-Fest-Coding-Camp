# CC Fest Coding Camp Tools

A static GitHub Pages library of p5.js teaching tools and starter sketches for CC Fest Coding Camp.

## Live site

The live site is published from the repository `main` branch using the `/docs` folder:

https://saberkhan372.github.io/CC-Fest-Coding-Camp/

## Structure

- `index.html` — homepage gallery and learning pathway
- `site.css` — shared homepage styling and design tokens
- `tool-page.css` — shared layout shell for the main interactive tools
- `starter-sketch.css` — lighter shell for sketch seeds and remix prompts
- `tools/` — one folder per tool or starter sketch

## Library organization

- `Interactive Tools` are the workshop-ready experiences with a shared teaching layout:
  workspace, controls, code preview, sketch state, and Try / Notice / Remix prompts.
- `Starter Sketches` are lighter remix seeds for live coding, demos, and extensions.

## Publishing notes

- GitHub Pages serves the `docs/` directory in the repo root.
- This folder is the original source copy kept alongside the published Pages version.
- If you edit both copies manually, keep `docs/` and this folder in sync.

## Notes

Most tools still load `p5.js` from a CDN. If you want fully offline-downloadable tool folders later, add a shared `assets/` or `libraries/` folder and update each tool to use a local p5 file.
