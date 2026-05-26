# CC Fest / Saber Khan Design Language Agent Guide

## Purpose

Use this guide when helping Saber Khan design, revise, or generate public-facing materials for **CC Fest**, **CC Fest Coding Camp**, **CC Fest Teacher Camp**, or related creative coding programs.

This is not a generic brand guide. It is a working design language for an evolving creative coding community. The goal is to help an AI agent avoid default "vibe-coded" landing-page aesthetics and instead produce work that feels like Saber, CC Fest, and the Coding Camp community.

The core design thesis:

> **CC Fest design should feel like a generous invitation into a living creative coding practice: poster-bright, human-first, beginner-safe, artifact-rich, and open to remix.**

Short version:

> **Poster-bright. Human-first. Open to remix.**

---

## The North Star

CC Fest is not a startup, an ed-tech product, or a polished corporate brand.

It is closer to:

- an indie art festival
- a community zine
- a teacher's planning binder
- a workshop table
- a creative coding sketchbook
- an archive of posters, recaps, forms, tools, and unfinished work

The page or artifact should feel like someone is saying:

> "Come in. You can learn here. You can ask questions. You can make something. You do not have to be an expert."

Avoid making CC Fest feel like a sleek product launch, a conference marketing site, or a generic AI-generated educational platform.

---

## Key Identity Phrases

Use these phrases often and visibly:

- **creative coding for all**
- **free and friendly**
- **anyone curious about creative code**
- **you don't have to be a coder**
- **learn, make, ask questions, and try creative coding**
- **unfinished work is welcome**
- **questions count as participation**
- **open to remix**

The phrase **"creative coding for all"** should appear in major public-facing pages, ideally in the hero, closing section, or footer.

---

## Core Aesthetic: The Workshop Archive

Think of the design as a **generous workshop table** where all of the following can be visible together:

- posters
- code sketches
- handwritten-style notes
- forms
- feedback quotes
- tools
- p5.js sketches
- Zoom/session traces
- participant work
- recaps
- classroom adaptations
- links and resources

The artifact should show process and community, not just final polish.

### Design feeling

Aim for:

- warm
- handmade
- structured
- generous
- colorful
- accessible
- playful
- pedagogical
- archival
- remixable

Avoid:

- generic SaaS polish
- tech conference slickness
- vague AI-generated gradients
- over-designed dashboards
- fake complexity
- "dark mode startup" styling unless there is a strong reason

---

## Two Related Modes

CC Fest design has two modes. Choose the right balance for the task.

### 1. CC Fest Public Mode

Use for event pages, social posts, public essays, recaps, invitations, and public-facing story pages.

**Feel:** poster, zine, archive, community board  
**Visuals:** posters, flyers, photos, bold color blocks, artifact grids  
**Voice:** simple, warm, invitational  
**Best for:** inviting people in

Common phrases:

- "free and friendly"
- "come spend time with us"
- "anyone curious"
- "creative coding for all"

### 2. Coding Camp Learning Mode

Use for tools, assignments, session pages, recaps, lesson materials, and interactive explainers.

**Feel:** workshop handout + interactive sketchbook  
**Visuals:** tool embeds, code snippets, diagrams, examples, starter sketches  
**Voice:** scaffolded, reflective, practical  
**Best for:** helping people learn, teach, remix, and return

Common structures:

- Try this
- What changed?
- What does this teach?
- How could students enter this idea?
- Open → change → predict → remix → teach

### For the Coding Camp interactive story page

Use **Public Mode as the outer frame** and **Learning Mode as the internal content system**.

That means:

- The hero, navigation, footer, and overall mood should feel like CC Fest: poster-bright, simple, welcoming.
- The tool sections, session rhythm, and participant-work sections can be more structured and interactive.

---

## Visual Language

### Color

Use a poster-inspired palette rather than a slick token system.

Recommended roles:

| Role | Color feeling |
|---|---|
| Paper | warm cream / off-white |
| Ink | near-black / dark brown-black |
| Red | coral / poster red |
| Yellow | saturated flyer yellow |
| Green | creative coding green |
| Blue | electric event blue |
| Pink | playful poster pink |
| Purple | optional accent, used sparingly |

Guidelines:

- Use cream + dark ink as the base.
- Use saturated color in large confident blocks.
- Do not scatter tiny rainbow accents everywhere.
- Prefer flat poster color over soft gradients.
- If using gradients, make them feel like poster art, not generic AI glow.

### Typography

Use typography that feels direct and legible.

Recommended:

- giant, heavy headlines
- tight letter spacing for major headlines
- simple readable body type
- small uppercase labels for archive/category markers
- occasional monospace only when showing real code or p5.js references

Avoid:

- too many fonts
- delicate typography
- overly polished corporate type hierarchy
- decorative code-font chips that do not teach anything

### Shapes and surfaces

Use:

- black or near-black borders
- simple cards
- poster/flyer blocks
- slight rotations for artifact/poster cards (desktop only — flatten on mobile)
- visible dividers
- box shadows that feel like printed paper or pinned cards

Avoid:

- glassmorphism
- blurry translucent cards
- neon glows
- too many rounded gradient boxes
- "AI landing page" effects

---

## Layout Patterns

Use these reusable modules.

### 1. Poster Stack

Best for hero sections, event histories, or timeline entries.

Use real posters when possible. If real posters are not available yet, use clear placeholder slots labeled with the exact artifact needed — written as visitor-facing labels, not authoring instructions.

Good placeholder: `"Art + Code / Teacher Camp · event flyer"`  
Bad placeholder: `"Add the Art + Code / Teacher Camp event flyer or poster here"`

### 2. Archive Wall

A grid of artifacts:

- poster
- form
- tool
- recap
- sketch
- feedback quote
- session slide
- classroom adaptation

Each card should explain why the artifact matters.

### 3. Workshop Table

Use for tools, starter sketches, and classroom materials.

Each item should include:

- what it is
- what you can see
- what code idea it teaches
- what to try
- how to use it in class
- link to open it

### 4. Care Callout (Tool-Specific)

Use visible callouts for tool-use norms — not generic camp norms. Make them specific to how the tools work.

Current implementation in `docs/index.html`:

- Change one thing at a time.
- Predict before you move the slider.
- Try a value that breaks your guess — knowing what breaks is knowing how it works.
- You don't need to understand everything to make something.
- Unfinished work counts.

Do not bury care language in the footer.

### 5. Pathway Strip

Use when a page has multiple audiences or entry points.

Recommended pathways:

- Foundation
- Creative Exploration
- Classroom Adaptation
- Stretch / Tool Building
- Community Contribution

Keep pathways simple. Do not overbuild elaborate persona pickers unless the interaction genuinely helps.

### 6. Evidence Card

Use for timeline and impact sections.

Structure:

- What happened?
- What changed?
- What we learned
- Artifact / evidence

### 7. Try-It Card

Use for tool pages and interactive sections.

Structure:

1. Open the tool.
2. Change one thing.
3. Predict what will happen.
4. Remix it in code.
5. Reflect on how someone else could learn it.

### 8. Bridge Rhythm Strip

Use at the top of every concept bridge page (above the interactive tool).

Five cards in a horizontal row (collapses to single column on mobile):

- **Fuzzy idea** — the misconception or confusion before using the bridge
- **See it** — what becomes visible when you interact
- **Change it** — what the learner can adjust
- **Code idea** — the core p5.js insight
- **Go next** — remix directions

---

## Voice and Copy Rules

The voice should be plainspoken, warm, and direct.

It should sound like a thoughtful teacher welcoming people into a workshop, not a program brochure.

### Prefer

- "A free place to learn, make, ask questions, and try creative coding with other curious people."
- "You can just watch."
- "Bring a sketch, a question, or an unfinished idea."
- "We learn code, then ask how someone else could learn it too."
- "The camp is still becoming."

### Avoid

- "Participants engage in differentiated learning pathways."
- "This program supports technical and pedagogical fluency."
- "A robust ecosystem of interactive resources."
- "Scalable instructional innovation."
- "Transformational ed-tech experience."

### Bridge card description pattern

When writing concept bridge card descriptions on the homepage, lead with what the learner experiences or the core insight — not a list of API names.

Good: `"Randomness isn't chaos — it's a choice. This bridge shows random() in ranges, seeded runs, and the key difference between calling it once in setup() versus every frame in draw()."`

Less good: `"A bridge for random(), floor(random(N)), seeded randomness, and the difference between one-time and every-frame calls."`

Vary the sentence opener across 21 cards. Not every card should begin with "A bridge for."

### Rewrite pattern

| Too brochure-like | Better CC Fest voice |
|---|---|
| "Participants engage in differentiated pathways." | "People can enter the work in different ways." |
| "This program supports technical and pedagogical fluency." | "We learn code, then ask how someone else could learn it too." |
| "The camp has evolved into a creative coding ecosystem." | "The camp has become more than a class." |
| "Submit polished final artifacts." | "Share what you made, even if it is unfinished." |

---

## Saber Khan's Design Signature

Saber's strongest design pattern is:

> **Make the abstract visible. Make the task doable. Then invite people to go further.**

This should shape the structure of pages, tools, assignments, and recaps.

Every major section should answer:

1. What is this?
2. Why might I care?
3. How can I try it?
4. How could I teach or adapt it?
5. Where can I go next?

This is the "open door, then ladder" pattern.

---

## Pedagogical Patterns to Preserve

CC Fest/Coding Camp design should make learning visible.

Use structures like:

- concept → example → remix → reflection
- see → change → predict → code → teach
- tool → sketch → classroom adaptation
- live coding → debugging → reflection
- participant work → teaching lens
- feedback → design change

Good CC Fest pages do not just show what happened. They show how someone could enter, learn from, remix, or teach from it.

---

## Interaction Rules

Interactivity should be used only when it helps learning, exploration, or navigation.

Good interactions:

- timeline tabs
- tool filters
- before/after comparisons
- simple "teaching lens" modals
- live embedded p5.js tools
- small try-it prompts
- copyable invitation text

Avoid:

- complex pathway pickers that feel like product onboarding
- animation for its own sake
- decorative canvas backgrounds that distract from real artifacts
- too many hover effects
- interaction that hides important content

Interaction should feel like:

> "Try this."

Not:

> "Look how fancy this interface is."

---

## Code Aesthetic

Creative coding should appear when it teaches or reveals something.

Use code for:

- short p5.js snippets
- tool embeds
- starter sketches
- "change this value" moments
- real examples from sessions
- comments that explain thinking

Avoid code as wallpaper.

Do not use random code-like decoration unless it serves a learning purpose.

### Good tool card structure

```markdown
### Sine / Cosine Motion Explorer

**See:** circular motion becoming wave motion  
**Code idea:** `sin()`, `cos()`, `frameCount`  
**Try this:** change speed, radius, and phase  
**Use in class:** connect trigonometry to animation and visual rhythm  
**Open:** [Launch tool]
```

---

## Community Care Rules

Community care is not decorative. It is part of the design system.

Make these values visible:

- share resources freely
- be generous with beginners
- everyone belongs
- people make mistakes
- repair is possible
- consent matters
- participants control what they share
- AI use should be transparent and optional when possible

Tool-specific norms (not generic camp norms) belong in the `.tool-norms` strip on the homepage and at the top of tool pages. See the Care Callout pattern above.

When discussing AI in the camp, use a balanced human-first stance:

### AI can support

- recap drafts
- documentation
- debugging hints
- code examples
- tool prototypes
- curriculum planning

### AI should not replace

- live coding
- human explanation
- participant reasoning
- creative agency
- consent
- naming accuracy
- community conversation
- care

Use language like:

> Tools are optional. People come first.

---

## What to Show Publicly

When making a public page, essay, or interactive story, prioritize real artifacts.

Use:

1. CC Fest event posters
2. Coding Camp flyers
3. session screenshots
4. participant work, with permission
5. tool screenshots
6. Notion recap screenshots
7. feedback quote cards
8. Google Form / application traces
9. classroom adaptation examples
10. GitHub/tool repository links

Do not rely on abstract placeholders longer than necessary.

If placeholders are needed, write them as visitor-facing labels, not authoring notes:

- `"Art + Code / Teacher Camp · event flyer"` — good
- `"Add Fall 2024 Art + Code / Teacher Camp flyer here."` — authoring note, not for public pages

Move authoring notes into HTML comments.

---

## Page-Level Guidance for the Coding Camp Interactive Story

The Coding Camp interactive story should feel like:

> **a public CC Fest archive page with interactive learning moments inside it.**

### Recommended structure

1. **Hero**
   - Big plain headline
   - "free and friendly" label
   - "creative coding for all" visible
   - poster stack or real poster collage

2. **What this is**
   - camp + tool library + community archive
   - short, human copy

3. **Archive wall**
   - posters, forms, tools, recaps, participant work

4. **Why it matters**
   - creative coding makes CS feel human
   - art, learning, personal expression, classroom practice

5. **Timeline**
   - Fall 2024
   - Spring 2025
   - Fall 2025
   - Spring 2026
   - Each era: what happened, what changed, artifact slot

6. **Inside a session**
   - welcome
   - concept
   - live coding
   - guest
   - tool/demo
   - guided remix
   - work time
   - reflection
   - recap

7. **Tools**
   - filterable, but simple
   - each tool framed as bridge from seeing to coding

8. **Participant work**
   - show process, not just polish
   - include teaching lens

9. **Community**
   - quotes and values
   - kindness, care, mutual support

10. **AI / consent / human-first learning**
   - transparent and careful

11. **Join / contribute**
   - join, share, contribute, support

12. **Closing**
   - "The camp is still becoming."
   - "creative coding for all"

---

## Do / Don't Checklist

### Do

- Use real posters first.
- Use screenshots as evidence.
- Let unfinished work appear.
- Keep copy short.
- Make links obvious.
- Make "creative coding for all" visible.
- Make consent visible.
- Show people, guests, and process.
- Use interaction only when it teaches or reveals.
- Let the page feel like a community archive.
- Write like a thoughtful teacher, not a marketer.
- Flatten `transform:rotate()` on mobile — rotated cards at full width cause horizontal overflow.

### Don't

- Don't make it look like a startup.
- Don't hide behind abstract gradients.
- Don't overuse cards.
- Don't turn everything into a dashboard.
- Don't make interactivity the point.
- Don't overstate scale.
- Don't make the code aesthetic more important than people.
- Don't polish away the workshop feeling.
- Don't use AI-generated visual tropes unless intentionally revised.
- Don't use fake community language without evidence or artifacts.
- Don't put authoring instructions ("Add X here") in visible copy on public pages.

---

## Quality Test

Before finalizing any CC Fest/Coding Camp design, ask:

1. Does this feel free and friendly?
2. Would a beginner feel invited rather than judged?
3. Is "creative coding for all" visible or implied strongly?
4. Are real artifacts doing visual work?
5. Does the page feel like CC Fest, not generic ed-tech?
6. Is the copy plainspoken?
7. Is the structure useful to educators?
8. Does it show process, not just polish?
9. Are community care and consent visible?
10. Could someone remix, teach from, or contribute to this?

If the answer to several of these is no, simplify and make it more human.

---

## Agent Behavior Instructions

When acting as a design/code/writing agent for Saber and CC Fest:

1. Start from the design thesis: **poster-bright, human-first, open to remix**.
2. Use CC Fest Public Mode for invitations and story pages.
3. Use Coding Camp Learning Mode for tools, assignments, and recaps.
4. Prefer real artifacts over abstract decoration.
5. Keep language warm, short, and direct.
6. Make scaffolding visible.
7. Treat care, consent, and beginner safety as design requirements.
8. Avoid generic landing-page aesthetics.
9. Avoid over-engineering interactions.
10. Build pages that feel useful, revisitable, and alive.
11. **Always check the actual CSS custom properties in `docs/site.css` before adding new colors or tokens.** The project has a defined token set — use it, don't invent new ones.
12. **On mobile, flatten all `transform:rotate()` rules.** Rotated elements at full mobile width cause horizontal overflow and clip visible content.

---

## Example Prompt for Another Agent

Use this prompt when asking another AI agent to revise a CC Fest page:

```text
You are helping revise a CC Fest / CC Fest Coding Camp page for Saber Khan.
Follow the CC Fest design language: poster-bright, human-first, beginner-safe, artifact-rich, and open to remix.
The page should feel like an indie creative coding festival archive mixed with a teacher's workshop table, not a startup landing page or generic ed-tech product.

Use warm cream backgrounds, dark ink borders, bold poster colors, real artifact slots, plainspoken copy, and visible community-care language.
Use the phrase "creative coding for all" visibly.
Prefer real posters, forms, recaps, tools, screenshots, and participant work over abstract gradients or decorative cards.
Use interactivity only when it helps someone explore, learn, or navigate.

Avoid glassmorphism, vague gradients, generic SaaS cards, excessive animation, fake code decoration, and marketing language.

Before finalizing, check that the page feels free, friendly, useful to educators, welcoming to beginners, and open to remix.

Refer to the actual CSS token set in docs/site.css before adding colors or layout classes.
```

---

## The Actual Implementation: How This Project Meets the Aesthetic

This section documents how the CC Fest design language is realized in the current codebase (`docs/` directory, served from GitHub Pages). Use this as the ground truth when editing existing pages or building new ones.

### CSS files

| File | Scope |
|---|---|
| `docs/site.css` | Homepage and shared shell |
| `docs/concept-bridges/concept-bridge.css` | All 21 concept bridge pages |
| `docs/tool-page.css` | All 60+ workshop tool pages |
| `docs/starter-sketch.css` | All 40 starter sketch pages |

### Actual CSS custom properties

**`docs/site.css` (homepage)**

```css
:root {
  --cream: #f6f0e7;        /* warm paper base */
  --cream-dark: #efe6da;
  --cream-deep: #e4dccf;
  --panel: #fffdf7;        /* slightly whiter panel surface */
  --ink: #201c1a;          /* near-black ink */
  --ink-light: #5c5751;    /* muted text */
  --accent: #c8391d;       /* poster red — primary action color */
  --accent-soft: #fde8e3;
  --gold: #f5a800;         /* saturated flyer yellow */
  --gold-soft: #fef3d4;    /* pale yellow for callout backgrounds */
  --highlight: #e07a5f;    /* warm orange-coral */
  --orange: #c96f4a;
  --slate: #49627a;
  --purple: #7a5ea8;
  --success: #7f9d7a;
  --line: #d8cdbf;         /* dividers and subtle borders */
  --blue: #1a6fb0;
  --pink: #d94f7f;
  --radius: 14px;
  --radius-sm: 8px;
  --shadow: 6px 6px 0 rgba(32,28,26,.12);  /* printed-paper shadow */
}
```

**`docs/concept-bridges/concept-bridge.css` (bridge pages)**

```css
:root {
  --bridge-paper: #f6f0e7;
  --bridge-paper-strong: #efe6da;
  --bridge-panel: rgba(255, 250, 242, 0.94);
  --bridge-white: #fffdf8;
  --bridge-ink: #201c1a;
  --bridge-muted: #5c5751;
  --bridge-line: #d8cdbf;
  --bridge-accent: #c8391d;
  --bridge-slate: #49627a;
  --bridge-purple: #7a5ea8;
  --bridge-shadow: 0 18px 55px rgba(0, 0, 0, 0.07);
}
```

**`docs/tool-page.css` (workshop tools)**

```css
:root {
  --cream: #faf6f0;
  --ink: #2c2a26;
  --ink-light: #6b6760;
  --accent: #c8391d;   /* same red across all pages */
  --gold: #f5a800;
  --shadow: 6px 6px 0 rgba(44,42,38,.12);
}
```

The same `--accent` red (`#c8391d`) and warm cream base appear in all three stylesheets. This is the consistent throughline of the design system.

### Fonts

All pages use:

- **Fraunces** — headlines (`h1`, `h2`, `h3`), weight 700–900. Optical-size range 9–144. Gives the heavy, ink-press quality.
- **DM Sans** — body text, labels, UI copy. Weight 400–700.
- **DM Mono** — code only (`<code>`, `<pre>`, `.formula`). Never used decoratively.

Google Fonts import string (same across all pages):

```
family=Fraunces:opsz,wght@9..144,700;9..144,800;9..144,900
&family=DM+Sans:wght@400;500;600;700
&family=DM+Mono:wght@400;500
```

### Background texture

Both the homepage and all bridge pages use two `body` pseudo-elements for paper texture:

- `body::before` — a faint 22×22px grid drawn in near-transparent ink lines (`opacity: 0.2–0.28`). Gives the graph-paper / workshop-table feeling.
- `body::after` — an inline SVG fractal noise filter at `opacity: 0.05`. Adds grain that makes the cream feel like paper, not a screen.

Do not remove these — they are what makes the background feel warm and handmade instead of flat and digital.

### Homepage hero — what it does and why

**HTML class:** `.hero` inside `.shell`

The hero panel is a warm white card (`--panel`) with a 2px solid ink border and a `6px 6px 0` offset shadow — the "printed paper" shadow pattern that runs throughout the site. It is not a full-bleed banner.

Inside the hero, a two-column grid (`.hero-grid`) shows the headline and lede on the left and an interactive poster tile grid (`.hero-poster`) on the right. On mobile (≤980px) this collapses to a single column; the poster drops below the text.

**Current headline:** `"A free workshop for creative coding."`

This replaced the earlier `"Tools for Creative Coding."` — the change moves from product-catalog language to invitational language. The hero eyebrow reads: `"CC Fest Coding Camp · Free · Open to everyone"`.

**Lede:** `"Open to anyone curious about creative code — you don't need to be a programmer to start."`

The lede leads with the invitation ("open to anyone"), not with the feature list.

The hero poster (`.hero-poster`) uses floating `.poster-card` tokens (`mouseX`, `noise()`, `circle()`, etc.) in an animated 3D-parallax grid. On desktop, it responds to mouse movement. On mobile, the 3D transform is disabled (`transform: none; transform-style: flat`) so `overflow: hidden` works correctly and nothing clips outside the viewport.

### The tool norms strip

**HTML class:** `.tool-norms`  
**Location:** `docs/index.html`, between the "Where to start" panel and the global search

A horizontal strip on a `--gold-soft` background, bordered top and bottom with 2px solid `--ink`. Five norms written as direct tool-use instructions — not generic camp norms:

```
→ Change one thing at a time.
→ Predict before you move the slider.
→ Try a value that breaks your guess — knowing what breaks is knowing how it works.
→ You don't need to understand everything to make something.
→ Unfinished work counts.
```

These are tool-specific. Do not replace them with generic social norms like "cameras optional."

On mobile (≤600px) the strip stacks vertically.

### The Camp Archive artifact wall

**HTML class:** `.camp-archive` containing `.camp-archive-wall`  
**Location:** inside the Camp Arc section on the homepage

A 5-column grid of `.artifact-slot` cards, one per cohort era. Each slot has:

- `.artifact-era` — uppercase era label in `--accent` red
- `.artifact-what` — italic description of the artifact (visitor-facing, not an authoring note)
- `.artifact-caption` — small muted caption below the frame

Frames use `border: 2px dashed var(--line)` to signal "placeholder" without looking broken. On hover the border becomes solid `--accent` and the frame lifts.

Slight rotation (±0.8deg) on alternating frames gives the pinned-card feeling. **On mobile, rotation is disabled** — rotated full-width elements cause horizontal overflow.

Current slot labels (correct visitor-facing form):

| Era | Label |
|---|---|
| Fall 2024 | `Art + Code / Teacher Camp · event flyer` |
| Spring 2025 | `Coding Camp Cohort 1 · session work` |
| Fall 2025 | `Coding Camp Cohort 2 · participant work` |
| Spring 2026 | `Coding Camp Cohort 3 · invite coming` |
| Participant work | `Made in camp · shared with permission` |

Replace the frame content with a real `<img>` when the artifact is available.

### Section labels

**HTML class:** `.section-label`

All major sections use a small uppercase label above the heading. Structure:

```html
<div class="section-label">The Camp Arc</div>
<h2>Five sessions. One arc.</h2>
```

The section label has a small colored dot (`::before` with `--highlight`). A `.bold-block` variant uses a solid `--accent` red background for higher emphasis.

### The five-session sequence

**HTML class:** `.sequence` → `.sequence-card`

A 5-column grid of cards, one per camp session. Cards are cream-to-white gradient with subtle shadow and slight rotations (`-1.2deg` through `+1.1deg`). On hover, rotation resets and the card lifts. On mobile, rotations are disabled and the grid collapses to a single column.

Each card contains:
- A bold session title
- A short description span
- `.sequence-tools` — pill links to the tools used in that session
- `.sequence-bridge` — a link to the relevant concept bridge

### Concept bridge pages — shared structure

All 21 concept bridge pages share `concept-bridge.css`. Each bridge page has:

1. **Bridge rhythm strip** (`.bridge-rhythm`) — five cards at the top: Fuzzy idea / See it / Change it / Code idea / Go next. On desktop, 5-column grid. On mobile, single column stack.
2. **The interactive tool** — a p5.js canvas with sliders, tabs, and presets. Tab navigation uses `role="tab"` / `aria-selected`. The `.main-grid` two-column layout (controls left, canvas right) collapses to single column on mobile.
3. **Tab progress bar** — a 3px `--accent`-filled bar that updates as the learner moves through tabs. Shows where they are in the concept sequence.
4. **Snapshot button** — captures the canvas + DOM labels as a PNG download. Label: `"📷 Save snapshot"`.
5. **Break presets** — on supported bridges, a preset that deliberately breaks the visual to show where the concept boundary is.

### Workshop tool pages — shared structure

All 60 workshop tool pages share `tool-page.css`. Each tool page has:

1. **Tool header** (`.tool-header`) — cream panel with ink border, containing the tool name, subtitle, and a 3-step rhythm strip.
2. **Five-step rhythm** — `Open it / Change it / Predict it / Remix it / Teach it`. This appears either in the tool header or as a sidebar strip.
3. **Canvas + controls** — the main interactive area. Controls use `accent-color: var(--accent)` on range inputs.

### Starter sketch pages

All 40 starter sketch pages share `starter-sketch.css`. The rhythm uses: `See it / Change it / Remix it / Teach it` — one step shorter than workshop tools, since the starting point is a working sketch rather than a demo.

### Mobile overflow rules

This is a hard-won rule — do not remove it:

```css
html { overflow-x: hidden }    /* html level, not just body */
body { overflow-x: hidden }
```

On mobile (≤720px) in the site CSS:

```css
.hero-poster {
  transform: none;
  transform-style: flat;   /* re-enables overflow:hidden */
}
.sequence-card:nth-child(n) { transform: none }
.artifact-slot:nth-child(n) .artifact-frame { transform: none }
```

`transform-style: preserve-3d` on `.hero-poster` at desktop breaks `overflow: hidden`, allowing absolutely-positioned poster cards to paint outside their container. Setting `transform-style: flat` on mobile restores containment. Rotated full-width cards also extend their painted bounds and clip content — flattening them on mobile prevents this.

Any new component that uses `transform: rotate()` or `transform-style: preserve-3d` should receive a `transform: none` reset inside the `@media(max-width:720px)` block.

### Card and border pattern

The consistent card surface across all pages:

```css
.card, .tool-header, .hero {
  background: var(--panel);       /* #fffdf7 */
  border: 2px solid var(--ink);   /* #201c1a */
  border-radius: var(--radius);   /* 14px */
  box-shadow: var(--shadow);      /* 6px 6px 0 rgba(32,28,26,.12) */
}
```

The offset shadow (`6x 6px 0`) reads as a printed card pinned to a board, not a soft floating layer. Keep the shadow offset hard (not blurred) to maintain the workshop-archive feeling.

---

## Saber Khan's Actual Design Practice: Evidence from the Archive

This section comes from a deep read of Saber's iCloud poster folder, Processing sketches, the Coding the Canvas codebase, VCV Rack patches, and desktop files. It grounds the design principles in what he has actually made across eight years.

---

### The CC Fest poster tradition (2017–2020)

CC Fest posters exist from NYC (2017, 2018 Spring, 2018 Fall, 2019 Spring, 2019 Fall), LA (2017), SF (2018), and Virtual (2020). Read together they reveal a consistent method — not a brand system, but a practice.

**The generative sketch IS the visual.** Every poster background is a p5.js (or Processing) sketch made by a participant or collaborator:

- 2017 NYC/LA: A particle explosion / light-ray sketch on black. High contrast. Photo-quality.
- 2018 NYC: A recursive fractal triangle pattern in lime green on hot coral/pink. The code IS the poster.
- 2018 SF: A concentric circles-and-squares tiling pattern in pink, teal, purple on white. Playful, flat, generated.
- 2019 NYC Spring: Flat circle/flower forms in purple, green, dark red on black. Bold, West African textile energy.
- 2019 NYC Fall: Shifts to editorial color-block layout — blue rectangle, red accent squares. More graphic design influence.
- 2020 Virtual: Bright yellow-green, repeating panda tile (by Raenin Traver-Fallick using p5.js). Caption credits the maker by name.

**What this tells an agent:** The background image on a CC Fest artifact should feel generative — like code made it, not like stock photography or AI image generation. Tiling, recursion, motion-blur, circles, grids, particle systems: these are the right visual registers. When a real participant sketch is available, use it. When not, describe the empty slot specifically.

**The three-column info structure is a signature.** The bottom third of every poster is laid out identically:
- Left column: event name, date, time, venue address, RSVP link
- Middle and right columns: description copy ("CC Fest is an opportunity for students and teachers to **engage in creative coding**.")

This is the workshop flyer tradition — a printed announce, not a brand moment. The structure is functional and consistent: name, date, place, what it is, how to come.

**Typography: one big weight, high contrast, left-aligned.** Every poster uses bold sans-serif or display type at 60–70% of the vertical space. No hierarchy games. The headline is everything. The info block is in a small readable weight. There is no middle.

**Credit is built into the format.** The 2018 SF poster credits a sketch. The 2020 panda poster credits "Panda wallpaper design by Raenin Traver-Fallick using p5.js." The Tech Expo 2017 flyer credits "Sharks by Lucas Coffey (coffey.browning.edu/page_four)." Naming the maker is part of the design.

**Color comes from the sketch, not from a brand palette.** 2017 is orange text on dark. 2018 NYC is lime on coral. 2018 SF is black on white with pink/teal. 2019 is light blue on black. 2020 is pink text on yellow-green. No two posters share the same color identity. The palette each year is whatever the generative sketch produced. There is no fixed CC Fest red or CC Fest blue — those emerged in the web tools work but are not native to the poster tradition.

---

### The ethicalCS visual mode

The `#ethicalCS` Photoshop files (2019–2020 Twitter chat promotional animations) show a different mode:

- Photo-forward: real images of NYC / civic spaces as the background
- Text overlay: bold cyan/magenta/yellow on dark photo
- Short, social-media-formatted copy: `#ethicalCS / Open Data & Civic Tech / Wed, Nov 28, 8 pm ET`
- Animated (looping GIF/MP4), not static
- Guest names in the same bold color

This is Saber's social-media visual mode: high-contrast photo + bold overlay text + topic + date. Warmer and more immediate than the poster tradition, less formal, built for Twitter's layout.

---

### The Coding the Canvas design system (a second project)

Coding the Canvas (`~/Documents/coding/Coding The Canvas/`) is a separate project with its own design system, but it shares DNA with CC Fest tools and gives additional signals about Saber's design instincts.

**Font differences:** Caveat (handwritten) replaces Fraunces for display. Inter replaces DM Sans for body. JetBrains Mono replaces DM Mono.

**The key move: "creative coding for all" written in Caveat.** On the Coding the Canvas homepage, the phrase appears as a handwritten eyebrow above the H1. It reads like a margin note or inscription. This is intimate, not loud. The philosophy appears in the informal register.

**Token differences:**

```css
--paper:  #fff6e7    /* slightly warmer than CC Fest's #f6f0e7 */
--ink:    #17130f    /* slightly darker than CC Fest's #201c1a */
--accent: #ef4b3f    /* brighter red-orange than CC Fest's #c8391d */
--gold:   #ffc83d    /* brighter than CC Fest's #f5a800 */
```

The Coding the Canvas accent is closer to a pure red-orange. The CC Fest tools accent is a darker coral-red. Both are warm, poster-bright, and serve the same role. Neither is corporate.

**Card shadow is harder:** `.band` uses `box-shadow: 4px 5px 0 var(--ink)` — the offset shadow uses ink as the color directly, not a translucent rgba. This reads even more like a printed sticker or woodblock stamp than the tools site.

**The "about" page design promise section** reads:
- Visible: every abstraction should change something students can see.
- Doable: each page should offer a clear first move, not just an explanation.
- Remixable: examples should invite students and teachers to change them.
- Careful: creative agency, consent, and beginner safety are part of the design.

These four words — Visible, Doable, Remixable, Careful — are the tightest condensation of Saber's pedagogical design values anywhere in his work.

---

### The Processing sketch (`thing.pde`)

A small sketch in `~/Documents/thing/`:

```java
PShape thing;
import peasy.*;

PeasyCam cam;

int things = 0;
void setup() {
  size(500,500,P3D);
  cam = new PeasyCam(this, 100);
  thing = loadShape("The Thing.obj");
}
void draw() {
  pointLight(255, 100, 126, 140, 160, 144);
  rotateZ(600);
  background(0);
  scale(50);
  for(int i = 0; i <= things; i++){
    pushMatrix();
    translate(i*2,0);
    shape(thing);
    popMatrix();
  }
}
void keyPressed(){
  things = things + 1;
}
```

This is exploratory personal work. A 3D object loaded and duplicated across the screen, one keypress at a time. PeasyCam for interactive orbit. Pointlight for mood. The loop as accumulation rather than pattern. It is unfinished, playful, and genuinely curious. This is Saber in the sketchbook.

**What it tells an agent:** the personal sketching register is loose and experimental. Finished tools are structured and scaffolded. The design guide needs to honor both modes.

---

### VCV Rack patches

Two VCV Rack (modular synthesis) patches exist: `perlin.vcv` and `three piece kit.vcv`.

The `perlin.vcv` patch connects directly to the p5.js `noise()` concept — Perlin noise as a control signal in a synthesizer instead of as a canvas drawing. The same mathematical idea (smooth organic randomness) that Saber teaches in creative coding sessions also shapes how he builds sound. This is not coincidence. It is the same intellectual sensibility: make the abstract visible (or audible), explore the behavior at the edge cases, connect math to perception.

**What it tells an agent:** Saber's aesthetic interest in noise, randomness, and organic motion is not decorative. It is conceptually central to his practice across media.

---

### The game library

Desktop game library includes: Baldur's Gate 3, Crusader Kings III, Cyberpunk 2077, Cult of the Lamb, Frostpunk, HUMANKIND, Inscryption, NORCO, No Man's Sky, Old World, Prison Architect, Suzerain, Vampire Survivors, Total War WARHAMMER.

Several of these have very specific aesthetic identities worth noting:

- **Inscryption**: handmade card game aesthetic, folk horror, dark whimsy, unfinished-feeling world design, meta-narrative
- **NORCO**: Southern Gothic, industrial Louisiana, surrealist folk art, text-heavy, narrative-forward, working-class setting
- **Suzerain**: political text RPG, no illustration, pure typographic design, choices and consequences with no visual flourish
- **Cult of the Lamb**: cute + dark simultaneously, folk ritual imagery, management systems in a handmade world
- **Vampire Survivors**: lo-fi Italian horror aesthetic, retro, simple, made by one person, pure gameplay legibility over visual polish

The pattern: Saber gravitates toward games with **strong aesthetic identities made by small teams or individuals, with handmade or folk-art energy, that prioritize legibility and feeling over technical polish.** These are not AAA productions. They are indie games where aesthetic choices are intentional and weird.

This directly parallels his design work. CC Fest should not look like a well-funded ed-tech platform (equivalent to AAA). It should look like something made with intention by people who care about the specific texture of the thing.

---

### The teach-in flyer

In `~/Library/Mobile Documents/com~apple~CloudDocs/posters/Teach-in-flyer.jpg`: a photocopied 1960s anti-Vietnam War teach-in flyer. Letterpress or typewriter type. Hand-lettered title ("VIET-NAM / AND / U.S. POLICY"). Dense text schedule. Issued by the Faculty Committee to Stop the War in Vietnam.

Saber keeps this. It is in the same folder as CC Fest posters.

**What it tells an agent:** Saber's reference archive includes activist ephemera — photocopied flyers, handmade announcements, community organizing documents. The CC Fest poster tradition draws from this lineage, not from brand design or ed-tech marketing. The information structure (who, what, when, where, RSVP) is the same across the 1960s teach-in and the 2019 CC Fest poster. The aesthetic register (bold, direct, community-made, urgently practical) is the same.

The design is not about beauty. It is about getting people to show up.

---

### Synthesized aesthetic signals

From everything above, here is what distinguishes Saber's actual design sensibility:

**1. The sketch is the proof.** Code that runs, produces something visible, and teaches an idea is more important than any decorative element. The poster background IS the sketch. The tool IS the concept.

**2. Workshop flyer structure, not brand design.** Every artifact should be able to answer: Who made this? What is it? When and where? Why come? That structure — name, date, place, why — is as sacred as any visual rule.

**3. Handmade over polished.** Inscryption over Call of Duty. The teach-in flyer over the conference brochure. Generative sketch over stock photo. The texture of effort and intention should show.

**4. Credit the maker, always.** Student name. Participant sketch. Guest handle. Collaborator credit. This is not an afterthought — it is part of the information design.

**5. Color from the work, not from a brand system.** The palette should feel like it emerged from the sketch that drives the visual. Each artifact can have a different dominant color if the work calls for it. The fixed tokens in site.css are a practical constraint, not an aesthetic goal.

**6. The intimate register is handwriting.** When the philosophical core needs to appear — "creative coding for all," "you can learn here," "unfinished work is welcome" — it goes in the informal voice: Caveat font, smaller size, margin-note weight. Not a headline. A whisper.

**7. People at every scale.** Zoom grids. Keynote photos. Student portraits. First-class screenshots. The work is for and with people and they should appear.

**8. Noise and randomness are not decoration.** Perlin noise in VCV Rack. `noise()` in p5.js. The smooth organic randomness that Saber reaches for in code is the same quality he reaches for in sound, in games he likes, in the organic irregularity of handmade type. It is a core aesthetic value, not a tool choice.

**9. Small, intentional, weird over large, polished, generic.** The games that resonate. The posters that work. The tools that teach. All of them make a specific choice and commit to it rather than averaging toward acceptability.

---

## Final Reminder

CC Fest design should not hide the fact that it is made by real people, for real people, through ongoing creative and educational labor.

Let the work show.

Let the care show.

Let the unfinished edges remain.

> **creative coding for all**
