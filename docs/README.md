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

- `index.html` — homepage gallery and learning pathway
- `site.css` — shared homepage styling and design tokens
- `tool-page.css` — shared layout shell for the main interactive tools
- `starter-sketch.css` — lighter shell for sketch seeds and remix prompts
- `concept-bridges/` — published concept bridge pages and bridge-specific CSS
- `tools/` — one folder per tool or starter sketch
- `workshop-tool-pages.js` — published data and renderer for JS-rendered workshop tools
- `starter-seed-pages.js` — published data and renderer for JS-rendered starter sketches

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
