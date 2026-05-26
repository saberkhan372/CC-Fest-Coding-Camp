(() => {
  const BLUE = "#3d5a80";
  const ORANGE = "#e07a5f";
  const GREEN = "#81b29a";
  const GOLD = "#f2cc8f";
  const CREAM = "#faf6f0";
  const LINE = "#e5dfd5";
  const INK = "#2c2a26";
  const MUTED = "#6b6760";

  const TOOLS = {
    "gravity-acceleration-playground": {
      title: "Gravity + Acceleration Playground",
      session: "◎ Motion · XIV",
      type: "Interactive",
      subtitle: "Make the position <- velocity <- acceleration chain visible with a bouncing ball, gravity, damping, and vector overlays.",
      tags: ["gravity", "acceleration", "velocity", "physics", "bounce"],
      relatedBridges: ["vectors-arrows-that-store-motion"],
      relatedSketches: ["gravity-bounce-seed", "particle-system-seed"],
      teachingNote: {
        prompt: "Ask learners to narrate the chain out loud: acceleration changes velocity, velocity changes position.",
        misconception: "If the ball falls faster, the velocity slider did not necessarily change; gravity may be adding speed every frame.",
        ask: "What would have to change if this were a balloon, a raindrop, or a character jumping on a moon?"
      },
      controls: [
        { id: "gravity", label: "gravity", type: "range", min: 0, max: 0.9, step: 0.01, value: 0.22 },
        { id: "vx", label: "x velocity", type: "range", min: -8, max: 8, step: 0.1, value: 3.4 },
        { id: "damping", label: "damping", type: "range", min: 0.4, max: 1, step: 0.01, value: 0.78 },
        { id: "vectors", label: "show vectors", type: "checkbox", value: true }
      ],
      lessons: [
        ["Try", "Set gravity near 0.05, then 0.7. The same ball suddenly has a different kind of world."],
        ["Notice", "Acceleration changes velocity. Velocity changes position. That chain is the whole physics model."],
        ["Remix", "Turn the ball into a jumper, raindrop, bouncing character, or falling data point."]
      ]
    },
    "atan2-rotation-studio": {
      title: "Rotate-Around-Point / atan2 Studio",
      session: "◎ Motion · XV",
      type: "Interactive",
      subtitle: "Point an arrow, eye, creature, or spaceship toward the cursor while seeing the translate() -> rotate() -> draw sequence.",
      tags: ["atan2()", "rotate()", "translate()", "push()", "pop()"],
      controls: [
        { id: "originX", label: "origin x", type: "range", min: 80, max: 560, step: 1, value: 320 },
        { id: "originY", label: "origin y", type: "range", min: 70, max: 350, step: 1, value: 210 },
        { id: "offset", label: "nose offset", type: "range", min: 0, max: 90, step: 1, value: 36 },
        { id: "shape", label: "shape", type: "select", value: "arrow", options: [["arrow", "Arrow"], ["eye", "Eye"], ["ship", "Ship"]] }
      ],
      lessons: [
        ["Try", "Move your mouse around the canvas, then drag the origin sliders. Rotation follows the local origin."],
        ["Notice", "atan2() takes y first, then x. The offsets are mouseY - y and mouseX - x."],
        ["Remix", "Use this for eyes, turrets, creatures, compass needles, and game characters."]
      ]
    },
    "sine-cosine-motion-explorer": {
      title: "Sine + Cosine Motion Explorer",
      session: "◎ Motion · XVI",
      type: "Interactive",
      subtitle: "Connect the unit circle, a moving point, and a wave so sin() and cos() become visible motion instead of copied formulas.",
      tags: ["sin()", "cos()", "amplitude", "frequency", "waves"],
      relatedBridges: ["triangle-circle-wave-explorer", "how-p5-thinks-about-time"],
      relatedTools: ["easing-types-comparison"],
      relatedSketches: ["sine-oscillation-seed", "circular-motion-orbit-seed"],
      teachingNote: {
        prompt: "Have everyone freeze the animation and point to center, radius, angle, and wave height before naming sin() or cos().",
        misconception: "Sine is not random wiggling. It is a repeated relationship between angle and position.",
        ask: "Which control changes the size of the motion, and which one changes how quickly the cycle repeats?"
      },
      controls: [
        { id: "amplitude", label: "amplitude", type: "range", min: 20, max: 150, step: 1, value: 92 },
        { id: "frequency", label: "frequency", type: "range", min: 0.01, max: 0.12, step: 0.005, value: 0.04 },
        { id: "phase", label: "phase", type: "range", min: 0, max: 6.28, step: 0.01, value: 0 },
        { id: "mode", label: "mode", type: "select", value: "circle", options: [["circle", "Circular path"], ["horizontal", "Horizontal oscillation"], ["figure8", "Figure-8"]] }
      ],
      lessons: [
        ["Try", "Set amplitude low, then high. Amplitude means how far from the center."],
        ["Notice", "sin() and cos() are the same cycle shifted around the circle."],
        ["Remix", "Make orbiting planets, floating text, waving lines, pendulums, and breathing shapes."]
      ]
    },
    "object-lifecycle-visualizer": {
      title: "Object Lifecycle Visualizer",
      session: "⬡ Systems · XIII",
      type: "Interactive",
      subtitle: "Watch objects get born, age, fade, and leave the array. The array length counter makes lifespan and splice() concrete.",
      tags: ["arrays", "objects", "lifespan", "splice()", "particles"],
      relatedBridges: ["arrays-one-thing-to-many-things", "objects-data-plus-behavior"],
      relatedTools: ["agents-rules-playground"],
      relatedSketches: ["particle-system-seed", "particle-emitter-seed"],
      teachingNote: {
        prompt: "Pause aging, raise the spawn rate, and let learners predict what the array length will do before unpausing.",
        misconception: "Removing an object from the canvas and removing it from the array are two different ideas.",
        ask: "Why does this loop count backward when it removes old particles?"
      },
      controls: [
        { id: "spawnRate", label: "spawn rate", type: "range", min: 1, max: 12, step: 1, value: 4 },
        { id: "lifespan", label: "lifespan", type: "range", min: 40, max: 240, step: 1, value: 120 },
        { id: "gravity", label: "gravity", type: "range", min: -0.05, max: 0.22, step: 0.01, value: 0.06 },
        { id: "paused", label: "pause aging", type: "checkbox", value: false }
      ],
      lessons: [
        ["Try", "Raise spawn rate and lifespan together. The array length grows because objects live longer."],
        ["Notice", "The loop runs backward so splice() can remove dead objects without skipping the next one."],
        ["Remix", "Use the same lifecycle for sparks, bubbles, messages, ghosts, snow, or collectible items."]
      ]
    },
    "hover-data-chart": {
      title: "Hover-to-Reveal Interactive Data Chart",
      session: "▦ Data · VI",
      type: "Interactive",
      subtitle: "Turn a simple chart into an interface: hover near a data point, highlight it, and reveal a label/value tooltip.",
      tags: ["data", "hover", "tooltip", "dist()", "interaction"],
      relatedBridges: ["distance-becomes-behavior", "data-in-drawing-out"],
      relatedSketches: ["parallel-arrays-bar-chart-seed", "one-dataset-three-views"],
      controls: [
        { id: "chart", label: "chart", type: "select", value: "bars", options: [["bars", "Bars"], ["dots", "Dots"]] },
        { id: "radius", label: "hover radius", type: "range", min: 18, max: 90, step: 1, value: 46 },
        { id: "labels", label: "show labels", type: "checkbox", value: true }
      ],
      lessons: [
        ["Try", "Move slowly across the chart. Notice the nearest mark becomes the one with a story."],
        ["Notice", "Interaction is also a visual mapping: mouse position chooses which data becomes visible."],
        ["Remix", "Use this in a data portrait, survey result, habit tracker, or classroom chart."]
      ]
    },
    "easing-types-comparison": {
      title: "Easing Types Comparison",
      session: "◎ Motion · XVII",
      type: "Interactive",
      subtitle: "Compare linear, ease-in, ease-out, ease-in-out, elastic, and bounce motion side by side with curve graphs and code snippets.",
      tags: ["easing", "motion design", "animation", "curves"],
      controls: [
        { id: "duration", label: "duration", type: "range", min: 40, max: 180, step: 1, value: 100 },
        { id: "distance", label: "distance", type: "range", min: 120, max: 420, step: 1, value: 270 },
        { id: "curve", label: "focus", type: "select", value: "all", options: [["all", "All curves"], ["linear", "Linear"], ["in", "Ease in"], ["out", "Ease out"], ["inout", "Ease in-out"], ["elastic", "Elastic"], ["bounce", "Bounce"]] }
      ],
      lessons: [
        ["Try", "Focus one curve, then switch back to all. The distance is the same; the personality changes."],
        ["Notice", "Easing maps time to progress. It is a data mapping for motion."],
        ["Remix", "Use ease-out for friendly UI, elastic for playful motion, and linear when rhythm matters."]
      ]
    },
    "game-state-studio": {
      title: "Game State Studio",
      session: "☽ Open · IX",
      type: "Interactive",
      subtitle: "See a game as modes controlled by one state variable: start, play, pause, win, lose, and restart.",
      tags: ["state", "games", "conditionals", "screens"],
      relatedBridges: ["state-machines-sketches-have-modes", "conditionals-code-makes-choices"],
      relatedSketches: ["game-state-starter", "state-machine-game-seed"],
      teachingNote: {
        prompt: "Ask learners to draw the screen map first: start, play, pause, win, lose, and the button or rule that moves between them.",
        misconception: "A state variable is not the whole game; it is the label that decides which rules are active right now.",
        ask: "What should be impossible in each state? For example, can the player score on the win screen?"
      },
      controls: [
        { id: "state", label: "state", type: "select", value: "start", options: [["start", "start"], ["play", "play"], ["pause", "pause"], ["win", "win"], ["lose", "lose"]] },
        { id: "score", label: "score", type: "range", min: 0, max: 5, step: 1, value: 2 },
        { id: "diagram", label: "show diagram", type: "checkbox", value: true }
      ],
      lessons: [
        ["Try", "Switch the state. The canvas changes because a different code block is active."],
        ["Notice", "State stops every part of the game from happening at once."],
        ["Remix", "Add states like intro, level2, credits, tutorial, or inventory."]
      ]
    },
    "agents-rules-playground": {
      title: "Agents + Rules Playground",
      session: "☽ Open · X",
      type: "Interactive",
      subtitle: "Give many simple agents one rule at a time and watch local behavior create global patterns.",
      tags: ["agents", "rules", "emergence", "systems", "simulation"],
      controls: [
        { id: "count", label: "agents", type: "range", min: 8, max: 80, step: 1, value: 32 },
        { id: "speed", label: "speed", type: "range", min: 0.2, max: 3, step: 0.1, value: 1.2 },
        { id: "rule", label: "rule", type: "select", value: "wander", options: [["wander", "Wander"], ["seek", "Seek food"], ["flee", "Flee center"], ["flock", "Flock-ish"]] }
      ],
      lessons: [
        ["Try", "Switch from wander to seek. The agents did not get smarter; the rule changed."],
        ["Notice", "Emergence means many small local decisions can look like a larger pattern."],
        ["Remix", "Make ants, crowds, birds, bacteria, classroom moods, or ecological systems."]
      ]
    },
    "readable-code-coach": {
      title: "Readable Code Coach",
      session: "⊕ Support · III",
      type: "Practice Lab",
      subtitle: "Compare cryptic and readable versions of the same sketch. Naming, comments, and structure become debugging tools.",
      tags: ["debugging", "naming", "comments", "structure"],
      controls: [
        { id: "view", label: "view", type: "select", value: "compare", options: [["compare", "Compare"], ["cryptic", "Cryptic only"], ["readable", "Readable only"]] },
        { id: "highlight", label: "highlight changes", type: "checkbox", value: true }
      ],
      lessons: [
        ["Try", "Read the cryptic version first, then the readable one. Which would you rather fix?"],
        ["Notice", "Readable code does not mean more comments everywhere. It means names and structure carry meaning."],
        ["Remix", "Rename one old sketch so the variables explain the idea before the comments do."]
      ]
    },
    "string-text-manipulation-studio": {
      title: "String + Text Manipulation Studio",
      session: "▦ Data · VII",
      type: "Interactive",
      subtitle: "Treat language as data with split(), join(), slice(), replace(), template literals, and controlled sentence generation.",
      tags: ["strings", "split()", "join()", "text data", "generative text"],
      controls: [
        { id: "input", label: "text", type: "text", value: "creative coding connects people" },
        { id: "operation", label: "operation", type: "select", value: "split", options: [["split", "split words"], ["join", "join with +"], ["slice", "slice first 12"], ["replace", "replace coding"], ["template", "template literal"]] }
      ],
      lessons: [
        ["Try", "Change the input sentence. The text is not just drawn; it is transformed."],
        ["Notice", "split() turns one string into an array. join() turns the array back into a string."],
        ["Remix", "Use these operations for poetry generators, labels, data cleanup, and title cards."]
      ]
    },
    "class-inheritance-explorer": {
      title: "Class Inheritance Explorer",
      session: "⬡ Systems · XIV",
      type: "Advanced",
      subtitle: "See parent and child classes side by side, with inherited properties, overridden methods, and super() highlighted.",
      tags: ["classes", "extends", "super()", "inheritance", "OOP"],
      controls: [
        { id: "child", label: "child class", type: "select", value: "enemy", options: [["enemy", "Enemy extends Character"], ["sparkle", "Sparkle extends Particle"], ["button", "Button extends Widget"]] },
        { id: "showDupes", label: "show duplication", type: "checkbox", value: false }
      ],
      lessons: [
        ["Try", "Toggle duplication. Inheritance is useful when child classes share real behavior."],
        ["Notice", "super() runs the parent constructor so the child starts with the shared setup."],
        ["Remix", "Use extends only after a pattern repeats. It is a cleanup move, not a starting move."]
      ]
    }
  };

  const RESOURCE_LINKS = {
    bridges: {
      "arrays-one-thing-to-many-things": "Arrays: One Thing to Many Things",
      "conditionals-code-makes-choices": "Conditionals: Code Makes Choices",
      "data-in-drawing-out": "Data In, Drawing Out",
      "distance-becomes-behavior": "Distance Becomes Behavior",
      "how-p5-thinks-about-time": "How p5.js Thinks About Time",
      "objects-data-plus-behavior": "Objects: Data + Behavior",
      "state-machines-sketches-have-modes": "State Machines: Sketches Have Modes",
      "triangle-circle-wave-explorer": "Triangle to Circle to Wave Explorer",
      "vectors-arrows-that-store-motion": "Vectors: Arrows That Store Motion"
    },
    tools: {
      "agents-rules-playground": "Agents + Rules Playground",
      "easing-types-comparison": "Easing Types Comparison"
    },
    sketches: {
      "circular-motion-orbit-seed": "Circular Motion Orbit Seed",
      "one-dataset-three-views": "One Dataset, Three Views",
      "game-state-starter": "Game State Starter",
      "gravity-bounce-seed": "Gravity Bounce Seed",
      "parallel-arrays-bar-chart-seed": "Parallel Arrays Bar Chart Seed",
      "particle-emitter-seed": "Particle Emitter Seed",
      "particle-system-seed": "Particle System Seed",
      "sine-oscillation-seed": "Sine Oscillation Seed",
      "state-machine-game-seed": "State Machine Game Seed"
    }
  };

  const sim = {
    gravity: { x: 120, y: 70, vy: 0 },
    particles: [],
    agents: []
  };

  const sampleData = [
    ["sleep", 8],
    ["school", 7],
    ["screen", 4],
    ["reading", 2],
    ["movement", 3],
    ["friends", 5]
  ];

  function clamp(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
  }

  function fmt(v) {
    if (typeof v !== "number") return v;
    return Number(v).toFixed(Math.abs(v) < 1 ? 2 : 1).replace(/\.0$/, "");
  }

  function rounded(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function arrow(ctx, x1, y1, x2, y2, color) {
    const a = Math.atan2(y2 - y1, x2 - x1);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.save();
    ctx.translate(x2, y2);
    ctx.rotate(a);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-10, -5);
    ctx.lineTo(-10, 5);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function grid(ctx, w, h, step = 40) {
    ctx.strokeStyle = "rgba(61,90,128,.08)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= w; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y <= h; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
  }

  function ease(name, t) {
    if (name === "linear") return t;
    if (name === "in") return t * t;
    if (name === "out") return 1 - Math.pow(1 - t, 2);
    if (name === "inout") return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    if (name === "elastic") return t === 0 || t === 1 ? t : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1;
    if (name === "bounce") {
      const n1 = 7.5625;
      const d1 = 2.75;
      if (t < 1 / d1) return n1 * t * t;
      if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
      if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
      return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
    return t;
  }

  function resetSim(slug) {
    if (slug === "gravity-acceleration-playground") sim.gravity = { x: 120, y: 70, vy: 0 };
    if (slug === "object-lifecycle-visualizer") sim.particles = [];
    if (slug === "agents-rules-playground") {
      sim.agents = [];
      for (let i = 0; i < 90; i++) {
        sim.agents.push({ x: 80 + Math.random() * 480, y: 70 + Math.random() * 280, a: Math.random() * Math.PI * 2 });
      }
    }
  }

  function stateFrom(tool) {
    const s = {};
    tool.controls.forEach((control) => { s[control.id] = control.value; });
    return s;
  }

  function renderWorkshopToolPage(slug) {
    const tool = TOOLS[slug];
    if (!tool) {
      document.getElementById("app").innerHTML = '<main class="tool-shell"><a href="../../index.html">Back</a><h1>Tool not found</h1></main>';
      return;
    }

    const lessonCards = workshopLessons(tool).map(([heading, body]) => `<div class="lesson-card"><h3>${heading}</h3><p>${body}</p></div>`).join("");
    const relatedPanel = renderRelatedResources(tool);
    const teachingPanel = renderTeachingNote(tool);
    const state = stateFrom(tool);
    document.title = `${tool.title} - CC Fest Coding Camp`;
    document.getElementById("app").innerHTML = `
      <main class="tool-shell">
        <nav class="tool-topbar">
          <a href="../../index.html">← Back to tool library</a>
          <a href="https://github.com/saberkhan372/CC-Fest-Coding-Camp" target="_blank" rel="noopener">CC Fest on GitHub</a>
        </nav>
        <header class="tool-header">
          <div class="tool-header-meta"><span class="tool-pill session">${tool.session}</span><span class="tool-pill type">${tool.type}</span></div>
          <h1>${tool.title}</h1>
          <p class="tool-subtitle">${tool.subtitle}</p>
          <div class="tool-tags">${tool.tags.map((tag) => `<span class="tool-tag">${tag}</span>`).join("")}</div>
          <section class="tool-rhythm" aria-label="How to use this workshop tool">
            <span class="tool-rhythm-card"><strong>Open it</strong> Start with the canvas before the code.</span>
            <span class="tool-rhythm-card"><strong>Change it</strong> Move one control or value at a time.</span>
            <span class="tool-rhythm-card"><strong>Predict it</strong> Name what you expect before you run it.</span>
            <span class="tool-rhythm-card"><strong>Remix it</strong> Turn the pattern toward your own sketch.</span>
            <span class="tool-rhythm-card"><strong>Teach it</strong> Ask what changed and why.</span>
          </section>
        </header>
        <section class="tool-layout">
          <div class="workspace-panel">
            <article class="card">
              <div class="card-inner">
                <div class="card-header"><div><h2>Try the Sketch</h2><p>Move the pointer over the canvas and adjust the controls.</p></div><button class="button ghost" id="resetBtn">Reset</button></div>
                <div class="canvas-frame"><div id="canvas-container"><canvas id="toolCanvas" width="640" height="420"></canvas></div></div>
              </div>
            </article>
            <article class="card">
              <div class="card-inner">
                <div class="card-header"><div><h2>What the Canvas Is Saying in Code</h2><p>Copy this pattern into a p5.js sketch and remix the values.</p></div></div>
                <div class="code-panel"><pre id="codeOutput"></pre></div>
              </div>
            </article>
          </div>
          <aside class="stack-panel">
            <article class="card"><div class="card-inner"><div class="card-header"><div><h2>Change One Thing</h2><p>Small changes, visible consequences.</p></div></div><div class="controls-grid" id="controls"></div></div></article>
            <article class="card"><div class="card-inner"><div class="card-header"><div><h2>What Changed?</h2><p>Watch the values change as the sketch runs.</p></div></div><div class="stat-list" id="stats"></div></div></article>
            <article class="card"><div class="card-inner"><div class="card-header"><div><h2>Open / Change / Predict / Remix / Teach</h2><p>A workshop rhythm for using the tool with beginners.</p></div></div><div class="lesson-grid">${lessonCards}</div></div></article>
            ${relatedPanel}
            ${teachingPanel}
          </aside>
        </section>
        <footer class="tool-footer">CC Fest Coding Camp · Workshop Tool · ${tool.title}</footer>
      </main>
    `;

    const canvas = document.getElementById("toolCanvas");
    const ctx = canvas.getContext("2d");
    const pointer = { x: 430, y: 210, active: false };
    const controls = document.getElementById("controls");
    tool.controls.forEach((control) => controls.appendChild(controlEl(control, state, updateCode)));
    document.getElementById("resetBtn").addEventListener("click", () => resetSim(slug));
    canvas.addEventListener("pointermove", (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) * canvas.width / rect.width;
      pointer.y = (event.clientY - rect.top) * canvas.height / rect.height;
      pointer.active = true;
    });
    canvas.addEventListener("pointerleave", () => { pointer.active = false; });
    canvas.addEventListener("pointerdown", () => {
      pointer.active = true;
      if (slug === "object-lifecycle-visualizer") spawnBurst(state, pointer.x, pointer.y, 10);
    });

    resetSim(slug);
    const start = performance.now();

    function updateCode() {
      document.getElementById("codeOutput").textContent = codeFor(slug, state);
    }

    function frame(now) {
      const t = (now - start) / 1000;
      drawTool(slug, ctx, canvas.width, canvas.height, state, pointer, t);
      document.getElementById("stats").innerHTML = statsFor(slug, state, pointer).map(([key, value]) => `<div class="stat"><strong>${key}</strong><code>${value}</code></div>`).join("");
      updateCode();
      requestAnimationFrame(frame);
    }

    updateCode();
    requestAnimationFrame(frame);
  }

  function renderRelatedResources(tool) {
    const groups = [
      ["Bridge", "relatedBridges", "bridges", "../../concept-bridges/"],
      ["Tool", "relatedTools", "tools", "../"],
      ["Sketch", "relatedSketches", "sketches", "../"]
    ].map(([label, key, type, base]) => {
      const items = (tool[key] || []).map((slug) => {
        const title = RESOURCE_LINKS[type][slug] || titleize(slug);
        return `<a class="related-link" href="${base}${slug}/"><span>${label}</span><strong>${title}</strong></a>`;
      }).join("");
      return items ? `<div class="related-group">${items}</div>` : "";
    }).join("");

    if (!groups.trim()) return "";
    return `
      <article class="card try-next">
        <div class="card-inner">
          <div class="card-header">
            <div>
              <h2>Try next</h2>
              <p>Follow this idea from concept to tool to remix.</p>
            </div>
          </div>
          <div class="related-grid">${groups}</div>
        </div>
      </article>
    `;
  }

  function renderTeachingNote(tool) {
    if (!tool.teachingNote) return "";
    const note = tool.teachingNote;
    return `
      <article class="teaching-note">
        <h2>Teacher move</h2>
        <p>A focused way to turn this tool into a short classroom conversation.</p>
        <div class="teaching-note-grid">
          <div class="teaching-note-card">
            <strong>Prompt</strong>
            <span>${note.prompt}</span>
          </div>
          <div class="teaching-note-card">
            <strong>Misconception</strong>
            <span>${note.misconception}</span>
          </div>
          <div class="teaching-note-card">
            <strong>Ask</strong>
            <span>${note.ask}</span>
          </div>
        </div>
      </article>
    `;
  }

  function titleize(slug) {
    return slug.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
  }

  function workshopLessons(tool) {
    const find = (name, fallback) => {
      const hit = tool.lessons.find(([heading]) => heading.toLowerCase() === name);
      return hit ? hit[1] : fallback;
    };
    return [
      ["Open", find("try", "Start with the running sketch and describe what the canvas is doing before touching the code.")],
      ["Change", "Adjust one control or value, then pause long enough to see the consequence."],
      ["Predict", find("notice", "Name the relationship between the control, the code, and the visible behavior.")],
      ["Remix", find("remix", "Borrow the pattern for a personal sketch, classroom prompt, or tiny experiment.")],
      ["Teach", "Invite learners to explain the change in their own words before moving to the next idea."]
    ];
  }

  function controlEl(control, state, onUpdate) {
    const wrap = document.createElement("div");
    wrap.className = "control";
    const id = `ctrl-${control.id}`;
    if (control.type === "range") {
      wrap.innerHTML = `<label for="${id}">${control.label}<span id="${id}-v">${fmt(state[control.id])}</span></label><input id="${id}" type="range" min="${control.min}" max="${control.max}" step="${control.step}" value="${control.value}">`;
      const input = wrap.querySelector("input");
      const value = wrap.querySelector("span");
      input.addEventListener("input", () => {
        state[control.id] = Number(input.value);
        value.textContent = fmt(state[control.id]);
        onUpdate();
      });
    } else if (control.type === "select") {
      wrap.innerHTML = `<label for="${id}">${control.label}<span>${state[control.id]}</span></label><select id="${id}">${control.options.map(([value, label]) => `<option value="${value}" ${value === control.value ? "selected" : ""}>${label}</option>`).join("")}</select>`;
      const input = wrap.querySelector("select");
      const value = wrap.querySelector("span");
      input.addEventListener("change", () => {
        state[control.id] = input.value;
        value.textContent = input.value;
        onUpdate();
      });
    } else if (control.type === "checkbox") {
      wrap.innerHTML = `<label for="${id}">${control.label}<span>${control.value ? "on" : "off"}</span></label><input id="${id}" type="checkbox" ${control.value ? "checked" : ""}>`;
      const input = wrap.querySelector("input");
      const value = wrap.querySelector("span");
      input.addEventListener("change", () => {
        state[control.id] = input.checked;
        value.textContent = state[control.id] ? "on" : "off";
        onUpdate();
      });
    } else if (control.type === "text") {
      wrap.innerHTML = `<label for="${id}">${control.label}<span>string</span></label><input id="${id}" type="text" value="${String(control.value).replace(/"/g, "&quot;")}">`;
      const input = wrap.querySelector("input");
      input.addEventListener("input", () => {
        state[control.id] = input.value;
        onUpdate();
      });
    }
    return wrap;
  }

  function drawTool(slug, ctx, w, h, state, pointer, t) {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#fffdf9";
    ctx.fillRect(0, 0, w, h);
    if (!["readable-code-coach", "string-text-manipulation-studio", "class-inheritance-explorer"].includes(slug)) grid(ctx, w, h, 40);
    if (slug === "gravity-acceleration-playground") drawGravity(ctx, w, h, state);
    if (slug === "atan2-rotation-studio") drawAtan2(ctx, state, pointer);
    if (slug === "sine-cosine-motion-explorer") drawSine(ctx, w, h, state, t);
    if (slug === "object-lifecycle-visualizer") drawLifecycle(ctx, w, h, state, pointer);
    if (slug === "hover-data-chart") drawHoverData(ctx, w, h, state, pointer);
    if (slug === "easing-types-comparison") drawEasing(ctx, w, h, state, t);
    if (slug === "game-state-studio") drawGameState(ctx, w, h, state);
    if (slug === "agents-rules-playground") drawAgents(ctx, w, h, state, t);
    if (slug === "readable-code-coach") drawReadable(ctx, state);
    if (slug === "string-text-manipulation-studio") drawStrings(ctx, state);
    if (slug === "class-inheritance-explorer") drawInheritance(ctx, state);
  }

  function drawGravity(ctx, w, h, state) {
    const ball = sim.gravity;
    ball.vy += Number(state.gravity);
    ball.x += Number(state.vx) * 0.55;
    ball.y += ball.vy;
    const r = 24;
    const floor = h - 58;
    if (ball.x > w - r || ball.x < r) {
      state.vx *= -1;
      ball.x = clamp(ball.x, r, w - r);
    }
    if (ball.y > floor - r) {
      ball.y = floor - r;
      ball.vy *= -Number(state.damping);
    }
    ctx.strokeStyle = LINE;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(30, floor);
    ctx.lineTo(w - 30, floor);
    ctx.stroke();
    ctx.fillStyle = ORANGE;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, r, 0, Math.PI * 2);
    ctx.fill();
    if (state.vectors) {
      arrow(ctx, ball.x, ball.y, ball.x + Number(state.vx) * 10, ball.y, BLUE);
      arrow(ctx, ball.x, ball.y, ball.x, ball.y + ball.vy * 10, GREEN);
    }
  }

  function drawAtan2(ctx, state, pointer) {
    const x = Number(state.originX);
    const y = Number(state.originY);
    const angle = Math.atan2(pointer.y - y, pointer.x - x);
    ctx.strokeStyle = "rgba(224,122,95,.35)";
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(pointer.x, pointer.y);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = ORANGE;
    ctx.beginPath();
    ctx.arc(pointer.x, pointer.y, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillStyle = BLUE;
    if (state.shape === "eye") {
      ctx.beginPath();
      ctx.ellipse(0, 0, 48, 26, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(Number(state.offset), 0, 13, 0, Math.PI * 2);
      ctx.fill();
    } else if (state.shape === "ship") {
      ctx.beginPath();
      ctx.moveTo(58, 0);
      ctx.lineTo(-28, -24);
      ctx.lineTo(-12, 0);
      ctx.lineTo(-28, 24);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.moveTo(60, 0);
      ctx.lineTo(-24, -20);
      ctx.lineTo(-8, 0);
      ctx.lineTo(-24, 20);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
    ctx.fillStyle = INK;
    ctx.font = "13px DM Mono";
    ctx.fillText(`angle: ${(angle * 180 / Math.PI).toFixed(1)} deg / ${angle.toFixed(2)} rad`, 24, 30);
  }

  function drawSine(ctx, w, h, state, t) {
    const cx = 210;
    const cy = 210;
    const amp = Number(state.amplitude);
    const a = t * Number(state.frequency) * 60 + Number(state.phase);
    let px = cx + Math.cos(a) * amp;
    let py = cy + Math.sin(a) * amp;
    if (state.mode === "horizontal") {
      px = cx + Math.sin(a) * amp;
      py = cy;
    }
    if (state.mode === "figure8") {
      px = cx + Math.sin(a) * amp;
      py = cy + Math.sin(a * 2) * amp * 0.45;
    }
    ctx.strokeStyle = "rgba(61,90,128,.22)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, amp, 0, Math.PI * 2);
    ctx.stroke();
    arrow(ctx, cx, cy, px, py, "rgba(224,122,95,.65)");
    ctx.fillStyle = BLUE;
    ctx.beginPath();
    ctx.arc(px, py, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = GREEN;
    ctx.beginPath();
    for (let i = 0; i < 180; i++) {
      const x = 400 + i;
      const y = h / 2 + Math.sin(a + i * 0.08) * 65;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    ctx.fillStyle = INK;
    ctx.font = "13px DM Mono";
    ctx.fillText("unit circle -> wave", 400, 120);
  }

  function spawnBurst(state, x, y, count) {
    for (let i = 0; i < count; i++) {
      sim.particles.push({ x, y, vx: (Math.random() - 0.5) * 4, vy: -Math.random() * 3, life: Number(state.lifespan), max: Number(state.lifespan) });
    }
  }

  function drawLifecycle(ctx, w, h, state, pointer) {
    if (!state.paused && Math.random() < Number(state.spawnRate) / 30) {
      spawnBurst(state, pointer.active ? pointer.x : w / 2, pointer.active ? pointer.y : h / 2, 1);
    }
    for (let i = sim.particles.length - 1; i >= 0; i--) {
      const particle = sim.particles[i];
      if (!state.paused) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += Number(state.gravity);
        particle.life -= 1;
      }
      if (particle.life <= 0) sim.particles.splice(i, 1);
    }
    sim.particles.slice(-140).forEach((particle) => {
      const alpha = clamp(particle.life / particle.max, 0, 1);
      ctx.fillStyle = `rgba(61,90,128,${alpha})`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 6 + alpha * 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = `rgba(224,122,95,${alpha})`;
      ctx.fillRect(particle.x - 16, particle.y + 18, 32 * alpha, 3);
    });
    ctx.fillStyle = INK;
    ctx.font = "14px DM Mono";
    ctx.fillText(`particles.length = ${sim.particles.length}`, 24, 32);
  }

  function drawHoverData(ctx, w, h, state, pointer) {
    const max = 8;
    const base = h - 70;
    let nearest = -1;
    let nearestDistance = 9999;
    sampleData.forEach((datum, index) => {
      const x = 75 + index * 88;
      const barHeight = datum[1] / max * 250;
      const y = base - barHeight;
      const distance = state.chart === "dots" ? Math.hypot(pointer.x - x, pointer.y - y) : Math.abs(pointer.x - x);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearest = index;
      }
    });
    sampleData.forEach((datum, index) => {
      const x = 75 + index * 88;
      const barHeight = datum[1] / max * 250;
      const y = base - barHeight;
      const hot = index === nearest && nearestDistance < Number(state.radius);
      ctx.fillStyle = hot ? ORANGE : BLUE;
      if (state.chart === "dots") {
        ctx.beginPath();
        ctx.arc(x, y, hot ? 20 : 14, 0, Math.PI * 2);
        ctx.fill();
      } else {
        rounded(ctx, x - 24, y, 48, barHeight, 10);
        ctx.fill();
      }
      if (state.labels) {
        ctx.fillStyle = MUTED;
        ctx.font = "12px DM Sans";
        ctx.textAlign = "center";
        ctx.fillText(datum[0], x, base + 24);
      }
      if (hot) {
        ctx.fillStyle = "#fff";
        rounded(ctx, x - 42, y - 54, 84, 36, 10);
        ctx.fill();
        ctx.strokeStyle = LINE;
        ctx.stroke();
        ctx.fillStyle = INK;
        ctx.font = "700 12px DM Mono";
        ctx.fillText(`${datum[0]}: ${datum[1]}`, x, y - 32);
      }
    });
  }

  function drawEasing(ctx, w, h, state, t) {
    const names = state.curve === "all" ? ["linear", "in", "out", "inout", "elastic", "bounce"] : [state.curve];
    const progress = (t * 60 % Number(state.duration)) / Number(state.duration);
    names.forEach((name, index) => {
      const y = 50 + index * ((h - 90) / Math.max(1, names.length - 1));
      const x0 = 120;
      const x1 = x0 + Number(state.distance);
      ctx.strokeStyle = LINE;
      ctx.beginPath();
      ctx.moveTo(x0, y);
      ctx.lineTo(x1, y);
      ctx.stroke();
      const eased = clamp(ease(name, progress), 0, 1.1);
      ctx.fillStyle = ORANGE;
      ctx.beginPath();
      ctx.arc(x0 + (x1 - x0) * eased, y, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = INK;
      ctx.font = "12px DM Mono";
      ctx.textAlign = "right";
      ctx.fillText(name, x0 - 18, y + 4);
    });
  }

  function drawGameState(ctx, w, h, state) {
    const states = ["start", "play", "pause", "win", "lose"];
    states.forEach((name, index) => {
      const x = 70 + index * 118;
      const y = 80;
      ctx.fillStyle = name === state.state ? BLUE : "#fff";
      ctx.strokeStyle = name === state.state ? BLUE : LINE;
      rounded(ctx, x, y, 88, 44, 12);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = name === state.state ? "#fff" : INK;
      ctx.font = "700 13px DM Mono";
      ctx.textAlign = "center";
      ctx.fillText(name, x + 44, y + 27);
      if (index < states.length - 1) arrow(ctx, x + 92, y + 22, x + 112, y + 22, MUTED);
    });
    ctx.fillStyle = CREAM;
    rounded(ctx, 170, 190, 300, 140, 18);
    ctx.fill();
    ctx.fillStyle = INK;
    ctx.font = "700 24px DM Sans";
    ctx.textAlign = "center";
    ctx.fillText(state.state.toUpperCase(), 320, 250);
    ctx.font = "14px DM Mono";
    ctx.fillText(`score = ${state.score}`, 320, 282);
  }

  function drawAgents(ctx, w, h, state, t) {
    const count = Number(state.count);
    const speed = Number(state.speed);
    const cx = w / 2;
    const cy = h / 2;
    ctx.fillStyle = GOLD;
    ctx.beginPath();
    ctx.arc(cx, cy, 16, 0, Math.PI * 2);
    ctx.fill();
    for (let i = 0; i < count; i++) {
      const agent = sim.agents[i] || (sim.agents[i] = { x: Math.random() * w, y: Math.random() * h, a: Math.random() * 6 });
      if (state.rule === "seek") agent.a = Math.atan2(cy - agent.y, cx - agent.x) + Math.sin(t + i) * 0.3;
      else if (state.rule === "flee") agent.a = Math.atan2(agent.y - cy, agent.x - cx);
      else if (state.rule === "flock") agent.a += Math.sin(t * 0.7 + i) * 0.05;
      else agent.a += Math.sin(t + i) * 0.12;
      agent.x = (agent.x + Math.cos(agent.a) * speed + w) % w;
      agent.y = (agent.y + Math.sin(agent.a) * speed + h) % h;
      ctx.save();
      ctx.translate(agent.x, agent.y);
      ctx.rotate(agent.a);
      ctx.fillStyle = i % 3 ? BLUE : ORANGE;
      ctx.beginPath();
      ctx.moveTo(10, 0);
      ctx.lineTo(-7, -5);
      ctx.lineTo(-7, 5);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  function drawReadable(ctx, state) {
    const bad = ["let x = 5;", "let y = 2;", "function d(){", "  x = x + y;", "  circle(x, 200, 20);", "}"];
    const good = ["let ballX = 5;", "let speed = 2;", "function drawBall(){", "  ballX += speed;", "  circle(ballX, 200, 20);", "}"];
    const both = state.view === "compare";
    function box(lines, x, title, color) {
      ctx.fillStyle = "#fff";
      rounded(ctx, x, 55, 260, 285, 14);
      ctx.fill();
      ctx.fillStyle = color;
      ctx.font = "700 13px DM Mono";
      ctx.fillText(title, x + 18, 82);
      lines.forEach((line, index) => {
        if (state.highlight && /x|y|ballX|speed/.test(line)) {
          ctx.fillStyle = "rgba(224,122,95,.12)";
          ctx.fillRect(x + 14, 100 + index * 30, 230, 22);
        }
        ctx.fillStyle = INK;
        ctx.font = "13px DM Mono";
        ctx.fillText(line, x + 18, 116 + index * 30);
      });
    }
    if (both || state.view === "cryptic") box(bad, both ? 48 : 190, "cryptic", ORANGE);
    if (both || state.view === "readable") box(good, both ? 336 : 190, "readable", GREEN);
  }

  function drawStrings(ctx, state) {
    const text = String(state.input);
    const parts = text.split(" ");
    let result = JSON.stringify(parts);
    if (state.operation === "join") result = parts.join(" + ");
    if (state.operation === "slice") result = text.slice(0, 12);
    if (state.operation === "replace") result = text.replace(/coding/gi, "making");
    if (state.operation === "template") result = `My phrase is: ${text}`;
    ctx.fillStyle = "#fff";
    rounded(ctx, 50, 70, 540, 90, 18);
    ctx.fill();
    ctx.fillStyle = INK;
    ctx.font = "18px DM Sans";
    ctx.fillText(text, 76, 122);
    arrow(ctx, 320, 178, 320, 232, ORANGE);
    ctx.fillStyle = CREAM;
    rounded(ctx, 50, 250, 540, 110, 18);
    ctx.fill();
    ctx.fillStyle = BLUE;
    ctx.font = "16px DM Mono";
    wrapText(ctx, result, 76, 292, 480, 24);
  }

  function drawInheritance(ctx, state) {
    const parent = state.child === "sparkle" ? "Particle" : state.child === "button" ? "Widget" : "Character";
    const child = state.child === "sparkle" ? "Sparkle" : state.child === "button" ? "Button" : "Enemy";
    function classBox(title, x, y, color, rows) {
      ctx.fillStyle = "#fff";
      rounded(ctx, x, y, 220, 180, 18);
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.fillStyle = color;
      ctx.font = "800 18px DM Mono";
      ctx.fillText(title, x + 20, y + 36);
      ctx.fillStyle = INK;
      ctx.font = "13px DM Mono";
      rows.forEach((row, index) => ctx.fillText(row, x + 22, y + 70 + index * 25));
    }
    classBox(parent, 90, 105, BLUE, ["x, y", "move()", "display()"]);
    classBox(child, 330, 105, ORANGE, ["super(x, y)", "extra property", "override display()"]);
    arrow(ctx, 330, 195, 310, 195, MUTED);
    if (state.showDupes) {
      ctx.fillStyle = "rgba(224,122,95,.12)";
      rounded(ctx, 86, 310, 470, 55, 12);
      ctx.fill();
      ctx.fillStyle = INK;
      ctx.font = "13px DM Mono";
      ctx.fillText("Without extends, both classes repeat x, y, move(), and display().", 110, 343);
    }
  }

  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(" ");
    let line = "";
    for (const word of words) {
      const test = `${line}${word} `;
      if (ctx.measureText(test).width > maxWidth) {
        ctx.fillText(line, x, y);
        line = `${word} `;
        y += lineHeight;
      } else {
        line = test;
      }
    }
    ctx.fillText(line, x, y);
  }

  function statsFor(slug, state, pointer) {
    if (slug === "gravity-acceleration-playground") return [["acceleration", state.gravity], ["velocity y", sim.gravity.vy.toFixed(2)], ["position", `${sim.gravity.x.toFixed(0)}, ${sim.gravity.y.toFixed(0)}`]];
    if (slug === "atan2-rotation-studio") {
      const angle = Math.atan2(pointer.y - state.originY, pointer.x - state.originX);
      return [["angle deg", (angle * 180 / Math.PI).toFixed(1)], ["angle rad", angle.toFixed(2)], ["formula", "atan2(mouseY-y, mouseX-x)"]];
    }
    if (slug === "object-lifecycle-visualizer") return [["array length", sim.particles.length], ["spawn rate", state.spawnRate], ["lifespan", state.lifespan]];
    if (slug === "hover-data-chart") return [["data rows", sampleData.length], ["hover radius", state.radius], ["logic", "dist(mouse, mark) < radius"]];
    if (slug === "agents-rules-playground") return [["agents", state.count], ["rule", state.rule], ["speed", state.speed]];
    if (slug === "string-text-manipulation-studio") return [["operation", state.operation], ["input length", String(state.input).length], ["words", String(state.input).split(" ").filter(Boolean).length]];
    return Object.entries(state).slice(0, 4).map(([key, value]) => [key, fmt(value)]);
  }

  function codeFor(slug, state) {
    const code = {
      "gravity-acceleration-playground": `let x = 120, y = 70;
let vx = ${state.vx};
let vy = 0;
let gravity = ${state.gravity};
let damping = ${state.damping};

function draw() {
  background(245);
  vy += gravity;       // acceleration changes velocity
  x += vx;
  y += vy;             // velocity changes position

  if (y > height - 40) {
    y = height - 40;
    vy *= -damping;
  }
  circle(x, y, 48);
}`,
      "atan2-rotation-studio": `let x = ${state.originX};
let y = ${state.originY};

function draw() {
  background(245);
  let angle = atan2(mouseY - y, mouseX - x);

  push();
  translate(x, y);
  rotate(angle);
  triangle(60, 0, -20, -20, -20, 20);
  pop();
}`,
      "sine-cosine-motion-explorer": `let amplitude = ${state.amplitude};
let frequency = ${state.frequency};
let phase = ${state.phase};

function draw() {
  background(245);
  let angle = frameCount * frequency + phase;
  let x = width / 2 + cos(angle) * amplitude;
  let y = height / 2 + sin(angle) * amplitude;
  circle(x, y, 32);
}`,
      "object-lifecycle-visualizer": `let particles = [];

function draw() {
  background(245);
  particles.push(new Particle(mouseX, mouseY));

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].life <= 0) {
      particles.splice(i, 1);
    }
  }
}`,
      "hover-data-chart": `let data = [
  { label: "sleep", value: 8 },
  { label: "school", value: 7 },
  { label: "screen", value: 4 }
];

function draw() {
  background(245);
  for (let i = 0; i < data.length; i++) {
    let x = 60 + i * 70;
    let h = map(data[i].value, 0, 8, 0, 220);
    let hovering = abs(mouseX - x) < ${state.radius};
    fill(hovering ? "#e07a5f" : "#3d5a80");
    rect(x - 20, height - 50 - h, 40, h);
    if (hovering) text(data[i].label + ": " + data[i].value, x, height - 70 - h);
  }
}`,
      "easing-types-comparison": `function easeOut(t) {
  return 1 - pow(1 - t, 2);
}

function draw() {
  let t = (frameCount % ${state.duration}) / ${state.duration};
  let progress = easeOut(t);
  let x = map(progress, 0, 1, 80, 80 + ${state.distance});
  circle(x, height / 2, 30);
}`,
      "game-state-studio": `let state = "${state.state}";

function draw() {
  if (state === "start") drawStart();
  else if (state === "play") drawPlay();
  else if (state === "pause") drawPause();
  else if (state === "win") drawWin();
  else if (state === "lose") drawLose();
}`,
      "agents-rules-playground": `for (let agent of agents) {
  agent.applyRule("${state.rule}");
  agent.update();
  agent.display();
}

// Many small local rules can create a larger pattern.`,
      "readable-code-coach": `// Cryptic
let x = 5;
let y = 2;

// Clearer
let ballX = 5;
let speed = 2;

function drawBall() {
  ballX += speed;
  circle(ballX, 200, 20);
}`,
      "string-text-manipulation-studio": `let phrase = "${String(state.input).replace(/"/g, '\\"')}";
let words = phrase.split(" ");
let result = words.join(" + ");
text(result, 40, 80);`,
      "class-inheritance-explorer": `class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Enemy extends Character {
  constructor(x, y, speed) {
    super(x, y);
    this.speed = speed;
  }
}`
    };
    return code[slug] || "";
  }

  window.renderWorkshopToolPage = renderWorkshopToolPage;
})();
