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

- `index.html` — homepage gallery and learning pathway
- `site.css` — shared homepage styling and design tokens
- `tool-page.css` — shared layout shell for the main interactive tools
- `starter-sketch.css` — lighter shell for sketch seeds and remix prompts
- `concept-bridges/` — concept bridge pages and bridge-specific CSS
- `tools/` — one folder per tool or starter sketch
- `workshop-tool-pages.js` — data and renderer for JS-rendered workshop tools
- `starter-seed-pages.js` — data and renderer for JS-rendered starter sketches

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
