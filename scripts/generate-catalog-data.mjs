import fs from "node:fs";
import path from "node:path";

const repoRoot = process.cwd();
const sourceRoot = path.join(repoRoot, "cc-fest-coding-camp-pages");
const indexPath = path.join(sourceRoot, "index.html");
const outPath = path.join(sourceRoot, "catalog-data.js");

const html = fs.readFileSync(indexPath, "utf8");

function stripTags(value = "") {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function attr(attrs, name) {
  const match = attrs.match(new RegExp(`${name}\\s*=\\s*"([^"]*)"`, "i"));
  return match ? match[1] : "";
}

function firstMatch(source, pattern) {
  const match = source.match(pattern);
  return match ? match[1] : "";
}

function cardPrimaryHref(body) {
  const actions = firstMatch(body, /<div class="tool-actions">([\s\S]*?)<\/div>/i);
  return firstMatch(actions, /href="([^"]+)"/) || firstMatch(body, /href="([^"]+)"/);
}

function slugFromUrl(url) {
  return url
    .replace(/^(\.\.\/)+/, "")
    .replace(/\/index\.html$/, "/")
    .replace(/\/$/, "")
    .split("/")
    .pop();
}

function typeFromUrl(url) {
  if (url.startsWith("concept-bridges/")) return "bridge";
  if (url.startsWith("tools/")) return "tool";
  return "unknown";
}

function sectionFromOffset(offset) {
  const before = html.slice(0, offset);
  const sectionMatches = [...before.matchAll(/<section id="([^"]+)"/g)];
  return sectionMatches.at(-1)?.[1] || "";
}

function stationFromOffset(offset) {
  const before = html.slice(0, offset);
  const stationNameMatches = [...before.matchAll(/<span class="station-name">([^<]+)<\/span>/g)];
  return stripTags(stationNameMatches.at(-1)?.[1] || "");
}

function suitFromClass(className) {
  return className.match(/\bsuit-([a-z-]+)/)?.[1] || "";
}

const BRIDGE_METADATA = {
  "arrays-loops-as-system": {
    suit: "systems", level: "extension", pathways: ["first-time", "stuck"], session: "03",
    group: "Programming Fundamentals",
  },
  "arrays-one-thing-to-many-things": {
    suit: "systems", level: "extension", pathways: ["first-time", "animation"], session: "03",
    group: "Programming Fundamentals",
  },
  "color-numbers-become-feeling": {
    suit: "marks", level: "beginner", pathways: ["first-time"], session: "01",
    group: "Visual + Trig Foundations",
  },
  "conditionals-code-makes-choices": {
    suit: "systems", level: "beginner", pathways: ["first-time", "stuck", "games"], session: "03",
    group: "Programming Fundamentals",
  },
  "data-as-argument": {
    suit: "data", level: "extension", pathways: ["data", "final"], session: "04",
    group: "Data + Media",
  },
  "data-in-drawing-out": {
    suit: "data", level: "extension", pathways: ["data"], session: "04",
    group: "Data + Media",
  },
  "distance-becomes-behavior": {
    suit: "motion", level: "extension", pathways: ["animation", "games"], session: "02",
    group: "p5.js Core",
  },
  "events-sketches-listen": {
    suit: "motion", level: "beginner", pathways: ["first-time", "games"], session: "02",
    group: "Events + Interaction",
  },
  "functions-make-your-own-commands": {
    suit: "systems", level: "extension", pathways: ["stuck", "final"], session: "03",
    group: "Programming Fundamentals",
  },
  "how-p5-thinks-about-time": {
    suit: "motion", level: "beginner", pathways: ["first-time", "animation"], session: "02",
    group: "p5.js Core",
  },
  "map-range-translator": {
    suit: "motion", level: "beginner", pathways: ["animation", "data"], session: "02",
    group: "p5.js Core",
  },
  "modulo-counting-in-cycles": {
    suit: "systems", level: "extension", pathways: ["animation", "final"], session: "03",
    group: "Programming Fundamentals",
  },
  "noise-smooth-randomness": {
    suit: "systems", level: "extension", pathways: ["animation", "final"], session: "03",
    group: "p5.js Core",
  },
  "objects-data-plus-behavior": {
    suit: "systems", level: "extension", pathways: ["games", "final"], session: "03",
    group: "Programming Fundamentals",
  },
  "pixels-pictures-are-data": {
    suit: "open", level: "extension", pathways: ["data", "final"], session: "05",
    group: "Data + Media",
  },
  "random-controlled-surprise": {
    suit: "systems", level: "beginner", pathways: ["first-time", "animation"], session: "03",
    group: "p5.js Core",
  },
  "state-machines-sketches-have-modes": {
    suit: "open", level: "capstone", pathways: ["games", "final"], session: "05",
    group: "Programming Fundamentals",
  },
  "triangle-circle-wave-explorer": {
    suit: "motion", level: "extension", pathways: ["animation"], session: "02",
    group: "Visual + Trig Foundations",
  },
  "variable-scope-where-variables-live": {
    suit: "support", level: "extension", pathways: ["stuck"], session: "support",
    group: "Debugging + Confidence",
  },
  "vectors-arrows-that-store-motion": {
    suit: "motion", level: "capstone", pathways: ["animation", "games"], session: "02",
    group: "Programming Fundamentals",
  },
  "world-vs-local-coordinates": {
    suit: "marks", level: "extension", pathways: ["animation"], session: "01",
    group: "p5.js Core",
  },
};

const SKETCH_CODE_PEEKS = {
  "angle-to-mouse-seed": "let angle = atan2(mouseY - y, mouseX - x);",
  "bouncing-ball-starter": "x += speedX;",
  "circular-motion-orbit-seed": "x = cos(angle) * radius;",
  "color-from-position": "let hue = map(mouseX, 0, width, 0, 360);",
  "data-self-portrait-seed": "let size = map(value, 0, 10, 20, 120);",
  "framecount-animation-seed": "let pulse = sin(frameCount * 0.05);",
  "hsb-color-seed": "let hue = frameCount % 360;",
  "lerp-follow-seed": "x = lerp(x, mouseX, 0.08);",
  "noise-walker": "x += map(noise(t), 0, 1, -2, 2);",
  "simple-collision-game-seed": "if (dist(x, y, targetX, targetY) < 24) score++;",
  "sound-pulse-seed": "let radius = map(level, 0, 1, 20, 240);",
  "state-machine-game-seed": "if (gameState === 'play') updateGame();",
  "wander-agent-seed": "let turn = random(-0.15, 0.15);",
};

const SUIT_GROUP = {
  marks: "Draw + Color",
  motion: "Motion + Interaction",
  systems: "Patterns + Systems",
  data: "Stories + Data",
  open: "Remix + Media",
  support: "Debugging + Confidence",
};

function codePeekForSketch(item) {
  if (SKETCH_CODE_PEEKS[item.id]) return SKETCH_CODE_PEEKS[item.id];

  const hay = `${item.id} ${item.title} ${item.tags.join(" ")}`.toLowerCase();
  if (/csv|loadtable|dataset|data|bar chart/.test(hay)) return "let h = map(value, 0, maxValue, 0, height);";
  if (/parallel arrays/.test(hay)) return "let label = labels[i];";
  if (/nested loop|grid|tile/.test(hay)) return "for (let row = 0; row < rows; row++)";
  if (/array|trail/.test(hay)) return "points.push(createVector(mouseX, mouseY));";
  if (/click|event/.test(hay)) return "shapes.push({ x: mouseX, y: mouseY });";
  if (/class|object|creature/.test(hay)) return "creatures.push(new Creature(x, y));";
  if (/function|parameter/.test(hay)) return "drawCreature(x, y, scaleAmount);";
  if (/state|game/.test(hay)) return "gameState = 'play';";
  if (/random|poetry|sentence|language/.test(hay)) return "let choice = random(words);";
  if (/image|tint/.test(hay)) return "image(img, x, y, tileSize, tileSize);";
  if (/font|typography/.test(hay)) return "textFont(displayFont);";
  if (/keyboard/.test(hay)) return "x += keyIsDown(RIGHT_ARROW) ? speed : 0;";
  if (/particle|emitter|lifespan/.test(hay)) return "particles.push(new Particle(mouseX, mouseY));";
  if (/sine|cosine|sin|oscillation/.test(hay)) return "let y = sin(angle) * amplitude;";
  if (/dist|proximity/.test(hay)) return "let d = dist(mouseX, mouseY, x, y);";
  if (/gravity|velocity|bounce/.test(hay)) return "vy += gravity;";
  if (/shape|color|identity|postcard|name/.test(hay)) return "fill(palette[i % palette.length]);";
  if (/text/.test(hay)) return "text(words[i], x, y);";

  const suitFallback = {
    marks: "fill(palette[index]);",
    motion: "x += velocity;",
    systems: "for (let i = 0; i < count; i++)",
    data: "let value = values[i];",
    open: "drawRemixLayer(layer);",
    support: "console.log(currentState);",
  };
  return suitFallback[item.suit] || "drawSketchStep();";
}

function inferSession(item) {
  const suitSession = {
    marks: "01",
    motion: "02",
    systems: "03",
    data: "04",
    open: "05",
    support: "support",
  };
  if (item.type === "tool" || item.type === "sketch") return suitSession[item.suit] || "";

  const bridgeSessionHints = [
    [/color|canvas|text|shape|rgb|hsb/i, "01"],
    [/time|motion|distance|map|events|triangle|circle|wave/i, "02"],
    [/noise|random|vector|modulo|array|object|function|conditional|state|scope/i, "03"],
    [/data|pixel|picture|json|table|argument/i, "04"],
  ];
  const hay = `${item.title} ${item.summary} ${item.tags.join(" ")}`;
  return bridgeSessionHints.find(([pattern]) => pattern.test(hay))?.[1] || "";
}

function cueForItem(item) {
  if (item.type === "bridge") {
    const tagCue = item.tags.slice(0, 2).join(" · ");
    return {
      bridgeIdea: item.summary || "A fuzzy idea becomes a coding concept.",
      bridgeConcept: tagCue || item.title,
    };
  }
  if (item.type === "tool") {
    return {
      controlCue: item.tags.slice(0, 2).join(" / ") || "slider / toggle",
    };
  }
  if (item.type === "sketch") {
    return {
      codePeek: codePeekForSketch(item),
    };
  }
  return {};
}

function applyMetadataOverrides(item) {
  if (item.type === "bridge" && BRIDGE_METADATA[item.id]) {
    Object.assign(item, BRIDGE_METADATA[item.id]);
  }
  if (item.type === "sketch") {
    item.group = SUIT_GROUP[item.suit] || item.group;
  }
  return item;
}

const items = [];
const cardPattern = /<article class="tool-card([^"]*)"([^>]*)>([\s\S]*?)<\/article>/g;
let match;
while ((match = cardPattern.exec(html))) {
  const [, classTail, attrs, body] = match;
  const url = cardPrimaryHref(body);
  if (!url || url.startsWith("http")) continue;

  const section = sectionFromOffset(match.index);
  const rawType = typeFromUrl(url);
  const type = section === "starter-sketches" ? "sketch" : rawType;
  const className = `tool-card${classTail}`;
  const title = stripTags(firstMatch(body, /<h3>([\s\S]*?)<\/h3>/));
  const summary = stripTags(firstMatch(body, /<p class="tool-description">([\s\S]*?)<\/p>/));
  const tags = [...body.matchAll(/<span class="tag">([\s\S]*?)<\/span>/g)].map((tag) => stripTags(tag[1]));
  const suit = suitFromClass(className);
  const item = {
    id: slugFromUrl(url),
    title,
    type,
    url,
    suit,
    level: attr(attrs, "data-difficulty"),
    pathways: attr(attrs, "data-pathway").split(/\s+/).filter(Boolean),
    session: "",
    summary,
    tags,
    section,
    group: stationFromOffset(match.index),
  };
  item.session = inferSession(item);
  applyMetadataOverrides(item);
  Object.assign(item, cueForItem(item));
  items.push(item);
}

const knownIds = new Set(items.map((item) => item.id));
const bridgeRoot = path.join(sourceRoot, "concept-bridges");
for (const dirent of fs.readdirSync(bridgeRoot, { withFileTypes: true })) {
  if (!dirent.isDirectory() || knownIds.has(dirent.name)) continue;
  const pagePath = path.join(bridgeRoot, dirent.name, "index.html");
  if (!fs.existsSync(pagePath)) continue;

  const page = fs.readFileSync(pagePath, "utf8");
  const title = stripTags(firstMatch(page, /<h1[^>]*>([\s\S]*?)<\/h1>/i)) ||
    stripTags(firstMatch(page, /<title>([\s\S]*?)<\/title>/i));
  const summary = stripTags(firstMatch(page, /<meta name="description" content="([^"]+)"/i)) ||
    stripTags(firstMatch(page, /<p class="lede[^"]*">([\s\S]*?)<\/p>/i)) ||
    "A concept bridge for connecting a fuzzy idea to p5.js syntax and patterns.";
  const tags = [...page.matchAll(/<code[^>]*>([\s\S]*?)<\/code>/g)]
    .map((tag) => stripTags(tag[1]))
    .filter(Boolean)
    .slice(0, 3);
  const item = {
    id: dirent.name,
    title,
    type: "bridge",
    url: `concept-bridges/${dirent.name}/`,
    suit: "",
    level: "",
    pathways: [],
    session: "",
    summary,
    tags,
    section: "concept-bridges",
    group: "Concept Bridges",
  };
  item.session = inferSession(item);
  applyMetadataOverrides(item);
  Object.assign(item, cueForItem(item));
  items.push(item);
}

items.sort((a, b) => {
  const typeOrder = { bridge: 0, tool: 1, sketch: 2 };
  return (typeOrder[a.type] ?? 9) - (typeOrder[b.type] ?? 9) ||
    a.url.localeCompare(b.url);
});

const content = `// Generated by scripts/generate-catalog-data.mjs from index.html.
// Edit index.html metadata or this generator, then regenerate.
(function() {
  const CATALOG_ITEMS = ${JSON.stringify(items, null, 2)};

  const CATALOG_FACETS = {
    types: [
      { id: "bridge", label: "Concept Bridge", plural: "Concept Bridges", verb: "Understand the idea" },
      { id: "tool", label: "Workshop Tool", plural: "Workshop Tools", verb: "Play before you read" },
      { id: "sketch", label: "Starter Sketch", plural: "Starter Sketches", verb: "Change one value" }
    ],
    suits: [
      { id: "marks", label: "Marks", glyph: "✦", summary: "drawing and color" },
      { id: "motion", label: "Motion", glyph: "◎", summary: "animation and interaction" },
      { id: "systems", label: "Systems", glyph: "⬡", summary: "loops and generative systems" },
      { id: "data", label: "Data", glyph: "▦", summary: "visualization and data" },
      { id: "open", label: "Open", glyph: "☽", summary: "images, sound, 3D, and games" },
      { id: "support", label: "Support", glyph: "⊕", summary: "debugging and confidence" }
    ],
    levels: [
      { id: "beginner", label: "Beginner" },
      { id: "extension", label: "Extension" },
      { id: "capstone", label: "Capstone" }
    ],
    pathways: [
      { id: "first-time", label: "First time with p5" },
      { id: "animation", label: "I want animation" },
      { id: "data", label: "I want data" },
      { id: "games", label: "I want games" },
      { id: "stuck", label: "I'm stuck" },
      { id: "final", label: "Final project" }
    ],
    sessions: [
      { id: "01", title: "Your Canvas, Your Voice", focus: "Make your first marks and find your canvas voice." },
      { id: "02", title: "Things That Move & Listen", focus: "Build things that move, react, and respond." },
      { id: "03", title: "Patterns & Systems", focus: "Let the code repeat, branch, and think for itself." },
      { id: "04", title: "Data as Material", focus: "Turn numbers into pictures that mean something personal." },
      { id: "05", title: "Open Studio", focus: "Remix, share, reflect, teach." },
      { id: "support", title: "Cross-session Support", focus: "Debugging and confidence tools that help throughout the arc." }
    ]
  };

  window.CCFestCatalog = { items: CATALOG_ITEMS, facets: CATALOG_FACETS };
})();
`;

fs.writeFileSync(outPath, content);
console.log(`Wrote ${path.relative(repoRoot, outPath)} with ${items.length} items.`);
