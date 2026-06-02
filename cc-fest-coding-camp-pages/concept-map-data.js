// CC Fest Concept Map — node and edge data for Phase 17 renderer
//
// Source: hand-authored try-next cross-links from the 6 priority concept bridge pages.
// Audited 2026-06-02 against docs/concept-bridges/*/index.html.
//
// NODE TYPES
//   bridge  — concept bridge page (⬡ hexagon)
//   tool    — workshop tool page  (▭ card)
//   sketch  — starter sketch page (◉ circle)
//
// NODE FLAGS
//   priority: true  — one of the 6 fully-authored priority bridges (larger, full weight)
//   ref: true       — bridge referenced from a priority bridge but not itself a priority node
//                     (render smaller, lighter, at the edge of the bridge band)
//
// EDGE rel VALUES
//   "tool"    — bridge links to a workshop tool
//   "sketch"  — bridge links to a starter sketch
//   "bridge"  — bridge links to another bridge (cross-link)
//
// SHARED NODE
//   color-from-position appears as a sketch in both color-numbers-become-feeling
//   and map-range-translator. In the layout it sits between columns 3 and 4.
//
// PATH TO EACH PAGE (relative from site root)
//   bridge:  concept-bridges/{id}/
//   tool:    tools/{id}/
//   sketch:  tools/{id}/     (sketches live in tools/ directory)

const CONCEPT_MAP_DATA = {

  nodes: [

    // — Priority bridges ——————————————————————————————————————————————

    {
      id: "noise-smooth-randomness",
      type: "bridge",
      priority: true,
      title: "Noise: Smooth Randomness",
      col: 1
    },
    {
      id: "how-p5-thinks-about-time",
      type: "bridge",
      priority: true,
      title: "How p5.js Thinks About Time",
      col: 2
    },
    {
      id: "color-numbers-become-feeling",
      type: "bridge",
      priority: true,
      title: "Color: Numbers Become Feeling",
      col: 3
    },
    {
      id: "map-range-translator",
      type: "bridge",
      priority: true,
      title: "map() Range Translator",
      col: 4
    },
    {
      id: "arrays-one-thing-to-many-things",
      type: "bridge",
      priority: true,
      title: "Arrays: One Thing to Many Things",
      col: 5
    },
    {
      id: "state-machines-sketches-have-modes",
      type: "bridge",
      priority: true,
      title: "State Machines: Sketches Have Modes",
      col: 6
    },

    // — Referenced bridges (smaller, edge nodes) ——————————————————————

    {
      id: "events-sketches-listen",
      type: "bridge",
      ref: true,
      title: "Events: Sketches Listen"
      // referenced by: how-p5-thinks-about-time (col 2), state-machines (col 6)
    },
    {
      id: "distance-becomes-behavior",
      type: "bridge",
      ref: true,
      title: "Distance Becomes Behavior"
      // referenced by: map-range-translator (col 4)
    },
    {
      id: "arrays-loops-as-system",
      type: "bridge",
      ref: true,
      title: "Arrays + Loops: A System"
      // referenced by: arrays-one-thing-to-many-things (col 5)
    },

    // — Workshop tools ————————————————————————————————————————————————
    // suit mirrors the station group in index.html

    { id: "noise-lab",               type: "tool", suit: "systems", title: "Noise Lab",                         col: 1 },
    { id: "noise-walker",            type: "tool", suit: "systems", title: "Noise Walker",                      col: 1 },
    { id: "noise-vs-random-explorer",type: "tool", suit: "systems", title: "Noise vs Random Explorer",          col: 1 },

    { id: "animation-explorer",      type: "tool", suit: "motion",  title: "Animation Explorer",                col: 2 },
    { id: "framerate-visualizer",    type: "tool", suit: "motion",  title: "frameRate() Visualizer",            col: 2 },

    { id: "rgb-hsb-color-lab",       type: "tool", suit: "marks",   title: "RGB / HSB Color Lab",               col: 3 },
    { id: "color-blend-modes-explorer", type: "tool", suit: "open", title: "Color Blend Modes Explorer",        col: 3 },
    { id: "shape-and-color-explorer",type: "tool", suit: "marks",   title: "Shape + Color Explorer",            col: 3 },

    { id: "map-explorer",            type: "tool", suit: "motion",  title: "map() Explorer",                    col: 4 },
    { id: "dist-map-lerp-chain",     type: "tool", suit: "motion",  title: "dist() → map() → lerpColor()",     col: 4 },
    { id: "lerp-explorer",           type: "tool", suit: "motion",  title: "lerp() Explorer",                   col: 4 },

    { id: "simple-array-explorer",   type: "tool", suit: "systems", title: "Array Explorer",                    col: 5 },
    { id: "for-loop-stepper",        type: "tool", suit: "systems", title: "For Loop Stepper",                  col: 5 },
    { id: "polished-array-explorer", type: "tool", suit: "systems", title: "Array Explorer: Values Become Visuals", col: 5 },

    { id: "game-state-studio",       type: "tool", suit: "open",    title: "Game State Studio",                 col: 6 },
    { id: "if-else-decision-studio", type: "tool", suit: "motion",  title: "If / Else Decision Studio",         col: 6 },

    // — Starter sketches ——————————————————————————————————————————————
    // col matches the primary bridge that links them
    // suit is assigned by thematic affinity

    { id: "wander-agent-seed",             type: "sketch", suit: "systems", title: "Wander Agent",              col: 1 },
    { id: "generative-tile-pattern-seed",  type: "sketch", suit: "systems", title: "Generative Tile Pattern",   col: 1 },
    { id: "mini-generative-poster-seed",   type: "sketch", suit: "systems", title: "Mini Generative Poster",    col: 1 },

    { id: "framecount-animation-seed",     type: "sketch", suit: "motion",  title: "frameCount Animation",      col: 2 },
    { id: "sine-oscillation-seed",         type: "sketch", suit: "motion",  title: "Sine Oscillation",          col: 2 },

    { id: "hsb-color-seed",                type: "sketch", suit: "marks",   title: "HSB Color Expression",      col: 3 },
    {
      id: "color-from-position",
      type: "sketch",
      suit: "marks",
      title: "Color From Position",
      col: 3.5,   // shared node — sits between col 3 and col 4 in the layout
      shared: true
    },
    { id: "code-postcard-from-my-world",   type: "sketch", suit: "marks",   title: "Code Postcard",             col: 3 },

    { id: "dist-proximity-seed",           type: "sketch", suit: "motion",  title: "dist() Proximity",          col: 4 },
    { id: "lerp-follow-seed",              type: "sketch", suit: "motion",  title: "lerp() Follow",             col: 4 },

    { id: "click-to-create-shapes",        type: "sketch", suit: "systems", title: "Click to Create Shapes",    col: 5 },
    { id: "array-position-dot-field",      type: "sketch", suit: "systems", title: "Dot Field Position",        col: 5 },
    { id: "particle-system-seed",          type: "sketch", suit: "systems", title: "Particle System",           col: 5 },

    { id: "game-state-starter",            type: "sketch", suit: "open",    title: "Game State Starter",        col: 6 },
    { id: "state-machine-game-seed",       type: "sketch", suit: "open",    title: "State Machine Game",        col: 6 },
    { id: "keyboard-controlled-character", type: "sketch", suit: "open",    title: "Keyboard-Controlled Character", col: 6 }
  ],

  edges: [

    // noise-smooth-randomness (col 1)
    { from: "noise-smooth-randomness", to: "noise-lab",                rel: "tool" },
    { from: "noise-smooth-randomness", to: "noise-walker",             rel: "tool" },
    { from: "noise-smooth-randomness", to: "noise-vs-random-explorer", rel: "tool" },
    { from: "noise-smooth-randomness", to: "wander-agent-seed",        rel: "sketch" },
    { from: "noise-smooth-randomness", to: "generative-tile-pattern-seed", rel: "sketch" },
    { from: "noise-smooth-randomness", to: "mini-generative-poster-seed",  rel: "sketch" },
    { from: "noise-smooth-randomness", to: "map-range-translator",     rel: "bridge" },

    // how-p5-thinks-about-time (col 2)
    { from: "how-p5-thinks-about-time", to: "animation-explorer",       rel: "tool" },
    { from: "how-p5-thinks-about-time", to: "framerate-visualizer",     rel: "tool" },
    { from: "how-p5-thinks-about-time", to: "framecount-animation-seed", rel: "sketch" },
    { from: "how-p5-thinks-about-time", to: "sine-oscillation-seed",    rel: "sketch" },
    { from: "how-p5-thinks-about-time", to: "events-sketches-listen",   rel: "bridge" },

    // color-numbers-become-feeling (col 3)
    { from: "color-numbers-become-feeling", to: "rgb-hsb-color-lab",          rel: "tool" },
    { from: "color-numbers-become-feeling", to: "color-blend-modes-explorer",  rel: "tool" },
    { from: "color-numbers-become-feeling", to: "shape-and-color-explorer",    rel: "tool" },
    { from: "color-numbers-become-feeling", to: "hsb-color-seed",              rel: "sketch" },
    { from: "color-numbers-become-feeling", to: "color-from-position",         rel: "sketch" },
    { from: "color-numbers-become-feeling", to: "code-postcard-from-my-world", rel: "sketch" },
    { from: "color-numbers-become-feeling", to: "map-range-translator",        rel: "bridge" },

    // map-range-translator (col 4)
    { from: "map-range-translator", to: "map-explorer",            rel: "tool" },
    { from: "map-range-translator", to: "dist-map-lerp-chain",     rel: "tool" },
    { from: "map-range-translator", to: "lerp-explorer",           rel: "tool" },
    { from: "map-range-translator", to: "color-from-position",     rel: "sketch" },  // shared with col 3
    { from: "map-range-translator", to: "dist-proximity-seed",     rel: "sketch" },
    { from: "map-range-translator", to: "lerp-follow-seed",        rel: "sketch" },
    { from: "map-range-translator", to: "noise-smooth-randomness", rel: "bridge" },
    { from: "map-range-translator", to: "distance-becomes-behavior", rel: "bridge" },

    // arrays-one-thing-to-many-things (col 5)
    { from: "arrays-one-thing-to-many-things", to: "simple-array-explorer",  rel: "tool" },
    { from: "arrays-one-thing-to-many-things", to: "for-loop-stepper",       rel: "tool" },
    { from: "arrays-one-thing-to-many-things", to: "polished-array-explorer", rel: "tool" },
    { from: "arrays-one-thing-to-many-things", to: "click-to-create-shapes",  rel: "sketch" },
    { from: "arrays-one-thing-to-many-things", to: "array-position-dot-field", rel: "sketch" },
    { from: "arrays-one-thing-to-many-things", to: "particle-system-seed",    rel: "sketch" },
    { from: "arrays-one-thing-to-many-things", to: "arrays-loops-as-system",  rel: "bridge" },

    // state-machines-sketches-have-modes (col 6)
    { from: "state-machines-sketches-have-modes", to: "game-state-studio",          rel: "tool" },
    { from: "state-machines-sketches-have-modes", to: "if-else-decision-studio",    rel: "tool" },
    { from: "state-machines-sketches-have-modes", to: "game-state-starter",         rel: "sketch" },
    { from: "state-machines-sketches-have-modes", to: "state-machine-game-seed",    rel: "sketch" },
    { from: "state-machines-sketches-have-modes", to: "keyboard-controlled-character", rel: "sketch" },
    { from: "state-machines-sketches-have-modes", to: "events-sketches-listen",     rel: "bridge" }
  ]
};
