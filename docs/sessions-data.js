// Shared CC Fest session metadata.
// Keep this in sync with REDESIGN_IMPLEMENTATION_PLAN.md Phase 4.
(function() {
  const SESSIONS = [
    {
      id: "01",
      href: "sessions/01/",
      label: "Session 01",
      title: "Your Canvas, Your Voice",
      subtitle: "Make your first marks and find your canvas voice.",
      topic: "Your Canvas,\nYour Voice",
      date: "\u2014 2026 \u2014",
      accent: "#f5a800",
      seed: 1001,
      suitGlyph: "\u2726",
      suitId: "marks",
      anchorBridge: "color-numbers-become-feeling",
      featuredTools: ["coordinate-system-explorer", "interactive-shape-explorer", "shape-and-color-explorer"],
      featuredSketches: ["draw-your-name-seed", "hsb-color-seed", "code-postcard-from-my-world"]
    },
    {
      id: "02",
      href: "sessions/02/",
      label: "Session 02",
      title: "Things That Move, Things That Listen",
      subtitle: "Build things that move, react, and respond.",
      topic: "Things That Move,\nThings That Listen",
      date: "\u2014 2026 \u2014",
      accent: "#e07a5f",
      seed: 1002,
      suitGlyph: "\u25ce",
      suitId: "motion",
      anchorBridge: "how-p5-thinks-about-time",
      featuredTools: ["animation-explorer", "map-explorer", "if-else-decision-studio"],
      featuredSketches: ["bouncing-ball-starter", "lerp-follow-seed", "framecount-animation-seed"]
    },
    {
      id: "03",
      href: "sessions/03/",
      label: "Session 03",
      title: "Patterns, Systems, and What They Say",
      subtitle: "Let the code repeat, branch, and think for itself.",
      topic: "Patterns, Systems,\nand What They Say",
      date: "\u2014 2026 \u2014",
      accent: "#7f9d7a",
      seed: 1003,
      suitGlyph: "\u2b21",
      suitId: "systems",
      anchorBridge: "noise-smooth-randomness",
      featuredTools: ["for-loop-stepper", "noise-lab", "rows-and-columns"],
      featuredSketches: ["generative-tile-pattern-seed", "wander-agent-seed", "noise-walker"]
    },
    {
      id: "04",
      href: "sessions/04/",
      label: "Session 04",
      title: "Data as Material",
      subtitle: "Turn numbers into pictures that mean something personal.",
      topic: "Data as\nMaterial",
      date: "\u2014 2026 \u2014",
      accent: "#49627a",
      seed: 1004,
      suitGlyph: "\u25a6",
      suitId: "data",
      anchorBridge: "data-as-argument",
      featuredTools: ["bar-chart-studio", "data-mapper", "csv-loadtable-data-explorer"],
      featuredSketches: ["hover-data-bar-chart-seed", "data-self-portrait-seed", "parallel-arrays-bar-chart-seed"]
    },
    {
      id: "05",
      href: "sessions/05/",
      label: "Session 05",
      title: "Open Studio",
      subtitle: "Remix, share, reflect, teach.",
      topic: "Open\nStudio",
      date: "\u2014 2026 \u2014",
      accent: "#7a5ea8",
      seed: 1005,
      suitGlyph: "\u263d",
      suitId: "open",
      anchorBridge: "state-machines-sketches-have-modes",
      featuredTools: ["image-remix-studio", "game-state-studio", "pixel-webcam-remix-studio"],
      featuredSketches: ["game-state-starter", "particle-system-seed", "wander-agent-seed"]
    },
    {
      id: "template",
      href: "sessions/template/",
      label: "Template",
      title: "Session Template",
      subtitle: "Start here to build a new session.",
      topic: "Your Session\nTopic Here",
      date: "Month DD, YYYY",
      accent: "#c8391d",
      seed: 42
    }
  ];

  window.CCFestSessions = SESSIONS;
})();
