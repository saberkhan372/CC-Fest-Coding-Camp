# CC Fest Coding Camp

Creative coding teaching tools, concept bridges, and starter sketches for p5.js workshops.

## Where to edit

Edit source files in `cc-fest-coding-camp-pages/`.

The `docs/` directory is the GitHub Pages output copy. Do not make normal content, design, tool, or shared asset changes directly in `docs/`; those edits can be overwritten the next time source is synced.

## Deployment workflow

Make source changes first, then run:

```sh
./deploy.sh "Describe the update"
```

The deploy script copies the source site into `docs/`, commits the source and published output together, and pushes `main`.

## Project layout

- `cc-fest-coding-camp-pages/` - source site files.
- `docs/` - GitHub Pages output served at the public URL.
- `deploy.sh` - source-to-docs sync, commit, and push helper.
- `ccfest_design_language_agent_guide.md` - design language and implementation guidance.
- `ccfest_site_development_plan.md` - roadmap and phase notes.

If a hotfix is made in `docs/` to repair the live site, immediately backfill the same change into `cc-fest-coding-camp-pages/` before the next deploy.
