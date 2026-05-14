(() => {
  const PREVIEW_MAP = {
    "coordinate-system-explorer": { family: "coordinates", label: "Coordinates" },
    "interactive-shape-explorer": { family: "shapes", label: "Shapes" },
    "shape-and-color-explorer": { family: "shapeColor", label: "Color" },
    "text-basics-studio": { family: "textBasics", label: "Text" },
    "variable-playground": { family: "variable", label: "Variables" },
    "rgb-hsb-color-lab": { family: "colorLab", label: "Color Lab" },
    "arc-visualizer": { family: "shapes", label: "Arc" },
    "layering-visualizer": { family: "layering", label: "Layers" },
    "push-pop-scope-visualizer": { family: "scope", label: "Scope" },
    "animation-explorer": { family: "bounce", label: "Motion" },
    "framerate-visualizer": { family: "frameRate", label: "FPS" },
    "draw-loop-visualizer": { family: "frameRate", label: "draw()" },
    "bounce-logic-explainer": { family: "bounce", label: "Bounce" },
    "motion-playground": { family: "mapping", label: "Motion Map" },
    "dist-map-lerp-chain": { family: "distPipeline", label: "Pipeline" },
    "trails-ghosting-studio": { family: "ghostTrail", label: "Trails" },
    "assets-preload-helper": { family: "assetLoader", label: "Assets" },
    "gravity-acceleration-playground": { family: "gravityPhysics", label: "Gravity" },
    "atan2-rotation-studio": { family: "angleMouse", label: "atan2()" },
    "sine-cosine-motion-explorer": { family: "sineWave", label: "Sine/Cos" },
    "easing-types-comparison": { family: "easingCurves", label: "Easing" },
    "transformations-explorer": { family: "transform", label: "Transforms" },
    "map-explorer": { family: "mapping", label: "Map" },
    "lerp-explorer": { family: "lerpSeed", label: "lerp()" },
    "if-else-decision-studio": { family: "threshold", label: "Logic" },
    "for-loop-stepper": { family: "gridSeed", label: "Loop" },
    "rows-and-columns": { family: "grid", label: "Patterns" },
    "modulo-pattern-explorer": { family: "hsbSeed", label: "Modulo" },
    "simple-array-explorer": { family: "arrays", label: "Arrays" },
    "polished-array-explorer": { family: "dataBars", label: "Data" },
    "grid-maker": { family: "gridSeed", label: "Grid" },
    "pattern-logic-explorer": { family: "grid", label: "Logic" },
    "noise-lab": { family: "noiseRandom", label: "Noise Lab" },
    "pattern-systems-lab": { family: "grid", label: "Systems" },
    "modulo-framecount-studio": { family: "moduloFrame", label: "Modulo Time" },
    "object-lifecycle-visualizer": { family: "lifecycle", label: "Lifecycle" },
    "class-inheritance-explorer": { family: "inheritancePreview", label: "Extends" },
    "function-builder": { family: "function", label: "Functions" },
    "noise-vs-random-explorer": { family: "noiseRandom", label: "Noise" },
    "data-story-planner": { family: "planner", label: "Planning" },
    "data-mapper": { family: "dataMap", label: "Mapping" },
    "csv-loadtable-data-explorer": { family: "dataBars", label: "CSV" },
    "api-loadjson-data-explorer": { family: "dataBars", label: "JSON" },
    "hover-data-chart": { family: "hoverData", label: "Hover Data" },
    "string-text-manipulation-studio": { family: "stringsPreview", label: "Strings" },
    "event-handler-studio": { family: "ripple", label: "Events" },
    "collision-detection-explorer": { family: "collision", label: "Collisions" },
    "interactive-shape-drawing-app": { family: "objects", label: "Objects" },
    "webgl-3d-workshop": { family: "cube", label: "3D" },
    "sound-shape-visualizer": { family: "sound", label: "Sound" },
    "image-remix-studio": { family: "image", label: "Remix" },
    "pixel-webcam-remix-studio": { family: "pixels", label: "Pixels" },
    "postcard-studio": { family: "postcard", label: "Postcard" },
    "remix-machine": { family: "poster", label: "Remix" },
    "class-builder": { family: "classBuilder", label: "Class" },
    "game-state-studio": { family: "gameState", label: "State" },
    "agents-rules-playground": { family: "agentsPreview", label: "Agents" },
    "debugging-playground": { family: "function", label: "Debug" },
    "array-objects-debugger": { family: "objectDebugger", label: "Object Debug" },
    "readable-code-coach": { family: "readablePreview", label: "Readable" },
    "color-numbers-become-feeling": { family: "colorLab", label: "Feeling" },
    "triangle-circle-wave-explorer": { family: "sineWave", label: "Trig" },
    "how-p5-thinks-about-time": { family: "frameRate", label: "Time" },
    "world-vs-local-coordinates": { family: "scope", label: "Local" },
    "map-range-translator": { family: "mapping", label: "map()" },
    "distance-becomes-behavior": { family: "distSeed", label: "dist()" },
    "noise-smooth-randomness": { family: "noiseRandom", label: "Noise" },
    "events-sketches-listen": { family: "ripple", label: "Events" },
    "vectors-arrows-that-store-motion": { family: "gravityPhysics", label: "Vectors" },
    "modulo-counting-in-cycles": { family: "moduloFrame", label: "%" },
    "arrays-one-thing-to-many-things": { family: "arrays", label: "Arrays" },
    "objects-data-plus-behavior": { family: "objects", label: "Objects" },
    "functions-make-your-own-commands": { family: "function", label: "Functions" },
    "conditionals-code-makes-choices": { family: "threshold", label: "if/else" },
    "state-machines-sketches-have-modes": { family: "gameState", label: "States" },
    "pixels-pictures-are-data": { family: "pixels", label: "Pixels" },
    "data-in-drawing-out": { family: "dataMap", label: "Data" },
    "mouse-trail-drawing-seed": { family: "trailSeed", label: "Trail" },
    "draw-your-name-seed": { family: "nameSeed", label: "Name" },
    "code-postcard-from-my-world": { family: "postcard", label: "Postcard" },
    "bouncing-ball-starter": { family: "bounceSeed", label: "Bounce" },
    "framecount-animation-seed": { family: "poster", label: "Clock" },
    "sine-cosine-motion-seed": { family: "lerpSeed", label: "Sine" },
    "gravity-bounce-seed": { family: "gravityPhysics", label: "Gravity" },
    "angle-to-mouse-seed": { family: "angleMouse", label: "atan2()" },
    "sine-oscillation-seed": { family: "sineWave", label: "Sine" },
    "particle-emitter-seed": { family: "lifecycle", label: "Emitter" },
    "hover-data-bar-chart-seed": { family: "hoverData", label: "Hover Data" },
    "wander-agent-seed": { family: "agentsPreview", label: "Agent" },
    "state-machine-game-seed": { family: "gameState", label: "State" },
    "circular-motion-orbit-seed": { family: "sineWave", label: "Orbit" },
    "generative-tile-pattern-seed": { family: "tilePattern", label: "Tiles" },
    "class-creature-stamp-seed": { family: "classBuilder", label: "Creature" },
    "click-to-create-shapes": { family: "stampSeed", label: "Click" },
    "color-from-position": { family: "shapeColor", label: "Color" },
    "noise-walker": { family: "noiseRandom", label: "Noise" },
    "function-creature-stamp": { family: "functionSeed", label: "Function" },
    "keyboard-controlled-character": { family: "keyboardSeed", label: "Keys" },
    "simple-collision-game-seed": { family: "collision", label: "Collision" },
    "data-self-portrait-seed": { family: "dataPortraitSeed", label: "Data" },
    "tiny-csv-portrait-seed": { family: "dataBars", label: "CSV" },
    "one-dataset-three-views": { family: "dataBars", label: "3 Views" },
    "classroom-grid-array-seed": { family: "gridSeed", label: "Grid Data" },
    "image-grid-remix-seed": { family: "image", label: "Image" },
    "sound-pulse-seed": { family: "sound", label: "Sound" },
    "mini-generative-poster-seed": { family: "poster", label: "Poster" },
    "particle-system-seed": { family: "trailSeed", label: "Particles" },
    "game-state-starter": { family: "gameState", label: "State" },
    "nested-loop-array-grid": { family: "gridSeed", label: "Seed" },
    "array-position-dot-field": { family: "dots", label: "Positions" },
    "random-poetry-generator": { family: "poetry", label: "Poetry" },
    "random-sentence-generator": { family: "words", label: "Words" },
    "arrays-in-motion": { family: "movingWords", label: "Text Motion" },
    "lerp-follow-seed": { family: "lerpSeed", label: "lerp()" },
    "dist-proximity-seed": { family: "distSeed", label: "dist()" },
    "hsb-color-seed": { family: "hsbSeed", label: "HSB" },
    "text-as-visual-seed": { family: "textVisual", label: "Text" }
  };

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const previews = [];

  function slugFromHref(href) {
    try {
      const url = new URL(href, window.location.href);
      return url.pathname.split("/").filter(Boolean).pop();
    } catch {
      return "";
    }
  }

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  function roundedRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function drawGrid(ctx, w, h, step, stroke) {
    ctx.save();
    ctx.strokeStyle = stroke;
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
    ctx.restore();
  }

  function arrow(ctx, x1, y1, x2, y2, color) {
    const angle = Math.atan2(y2 - y1, x2 - x1);
    ctx.save();
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.translate(x2, y2);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-8, -4);
    ctx.lineTo(-8, 4);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function createPreview(card) {
    const link = card.querySelector(".tool-actions a");
    if (!link) return null;
    const slug = slugFromHref(link.getAttribute("href"));
    const config = PREVIEW_MAP[slug];
    if (!config) return null;

    const stage = document.createElement("div");
    stage.className = "tool-preview";
    stage.dataset.preview = config.family;
    stage.setAttribute("aria-hidden", "true");

    const badge = document.createElement("div");
    badge.className = "preview-badge";
    badge.textContent = config.label;

    const canvas = document.createElement("canvas");
    stage.appendChild(badge);
    stage.appendChild(canvas);
    card.insertBefore(stage, card.firstChild);

    const preview = {
      slug,
      family: config.family,
      card,
      stage,
      canvas,
      ctx: canvas.getContext("2d"),
      pointerX: 0.5,
      pointerY: 0.5,
      hover: false,
      visible: false
    };

    const updateSize = () => {
      const rect = stage.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      preview.width = Math.max(180, Math.floor(rect.width));
      preview.height = Math.max(120, Math.floor(rect.height));
      canvas.width = Math.floor(preview.width * dpr);
      canvas.height = Math.floor(preview.height * dpr);
      preview.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(preview, 0);
    };

    stage.addEventListener("pointerenter", () => {
      preview.hover = true;
    });
    stage.addEventListener("pointerleave", () => {
      preview.hover = false;
      preview.pointerX = 0.5;
      preview.pointerY = 0.5;
      if (reduceMotion) draw(preview, 0);
    });
    stage.addEventListener("pointermove", (event) => {
      const rect = stage.getBoundingClientRect();
      preview.pointerX = clamp((event.clientX - rect.left) / rect.width, 0, 1);
      preview.pointerY = clamp((event.clientY - rect.top) / rect.height, 0, 1);
    });

    preview.updateSize = updateSize;
    updateSize();
    previews.push(preview);
    return preview;
  }

  function background(ctx, w, h) {
    const gradient = ctx.createLinearGradient(0, 0, 0, h);
    gradient.addColorStop(0, "#fffdf9");
    gradient.addColorStop(1, "#f4eee3");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);
  }

  function draw(preview, time) {
    const { ctx, width: w, height: h, family, pointerX: px, pointerY: py, hover } = preview;
    if (!ctx || !w || !h) return;

    background(ctx, w, h);
    const t = time * 0.001;
    const pulse = hover ? 1 : 0.55;
    ctx.save();

    switch (family) {
      case "coordinates": {
        drawGrid(ctx, w, h, 20, "rgba(61,90,128,.08)");
        const x = 22 + px * (w - 44);
        const y = 24 + py * (h - 48);
        ctx.strokeStyle = "rgba(61,90,128,.28)";
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
        ctx.fillStyle = "#3d5a80";
        ctx.beginPath();
        ctx.arc(x, y, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#2c2a26";
        ctx.font = "12px DM Mono, monospace";
        ctx.fillText(`(${Math.round(px * 100)}, ${Math.round(py * 100)})`, 14, h - 14);
        break;
      }
      case "shapes": {
        const mode = Math.floor((t * 1.4 + px * 2.4) % 4);
        ctx.fillStyle = "#f0ebe3";
        roundedRect(ctx, 18, 16, w - 36, h - 32, 18);
        ctx.fill();
        ctx.fillStyle = "#3d5a80";
        ctx.strokeStyle = "#e07a5f";
        ctx.lineWidth = 3;
        ctx.translate(w / 2, h / 2);
        const size = 26 + px * 18;
        if (mode === 0) {
          ctx.beginPath();
          ctx.arc(0, 0, size, 0, Math.PI * 2);
          ctx.fill();
        } else if (mode === 1) {
          ctx.fillRect(-size, -size, size * 2, size * 2);
        } else if (mode === 2) {
          ctx.beginPath();
          ctx.moveTo(0, -size - 4);
          ctx.lineTo(size + 6, size + 2);
          ctx.lineTo(-size - 6, size + 2);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, size, Math.PI * 0.2, Math.PI * 1.6);
          ctx.stroke();
        }
        break;
      }
      case "layering": {
        drawGrid(ctx, w, h, 22, "rgba(61,90,128,.06)");
        const order = hover ? [2, 0, 1] : [0, 1, 2];
        const layers = [
          { x: w * 0.38, y: h * 0.48, r: 28, c: "rgba(61,90,128,.78)", kind: "circle" },
          { x: w * 0.52, y: h * 0.44, r: 26, c: "rgba(224,122,95,.78)", kind: "square" },
          { x: w * 0.48, y: h * 0.6, r: 30, c: "rgba(129,178,154,.78)", kind: "tri" }
        ];
        order.forEach((index, depth) => {
          const layer = layers[index];
          ctx.fillStyle = layer.c;
          ctx.strokeStyle = `rgba(44,42,38,${0.08 + depth * 0.08})`;
          ctx.lineWidth = 2;
          if (layer.kind === "circle") {
            ctx.beginPath();
            ctx.arc(layer.x, layer.y, layer.r, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
          } else if (layer.kind === "square") {
            roundedRect(ctx, layer.x - layer.r, layer.y - layer.r, layer.r * 2, layer.r * 2, 12);
            ctx.fill();
            ctx.stroke();
          } else {
            ctx.beginPath();
            ctx.moveTo(layer.x, layer.y - layer.r);
            ctx.lineTo(layer.x + layer.r, layer.y + layer.r * 0.7);
            ctx.lineTo(layer.x - layer.r, layer.y + layer.r * 0.7);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
          }
        });
        ctx.fillStyle = "#2c2a26";
        ctx.font = "700 10px DM Mono, monospace";
        ctx.fillText(hover ? "last drawn = front" : "draw order", 14, h - 12);
        break;
      }
      case "textBasics": {
        drawGrid(ctx, w, h, 24, "rgba(61,90,128,.08)");
        const x = 22 + px * (w - 44);
        const y = 28 + py * (h - 56);
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate((px - 0.5) * 0.45);
        ctx.font = `800 ${Math.max(28, h * 0.34)}px Fraunces, serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#3d5a80";
        ctx.fillText("hello", 0, 0);
        ctx.restore();
        ctx.fillStyle = "#e07a5f";
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(44,42,38,.72)";
        ctx.font = "11px DM Mono, monospace";
        ctx.fillText(`text("hello", ${Math.round(x)}, ${Math.round(y)})`, 14, h - 12);
        break;
      }
      case "shapeColor": {
        const hueA = 210 + px * 80;
        const hueB = 14 + py * 30;
        ctx.fillStyle = `hsl(${hueA} 40% 84%)`;
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = `hsl(${hueB} 72% 62%)`;
        ctx.beginPath();
        ctx.arc(w * 0.34, h * 0.56, 26 + px * 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `hsl(${hueA + 30} 56% 48%)`;
        ctx.fillRect(w * 0.56, h * 0.28, 44, 44);
        break;
      }
      case "variable": {
        const x = 32 + px * (w - 64);
        const y = 24 + py * (h - 48);
        const r = 10 + px * 22;
        ctx.fillStyle = "#fff";
        roundedRect(ctx, 14, 14, w - 28, h - 28, 16);
        ctx.fill();
        ctx.fillStyle = `rgba(61,90,128,${0.15 + px * 0.4})`;
        ctx.fillRect(18, h - 18, x - 18, 4);
        ctx.fillStyle = `hsl(${15 + px * 180} 72% ${46 + py * 16}%)`;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case "colorLab": {
        for (let i = 0; i < 7; i++) {
          const hue = (i * 50 + t * 18 + px * 80) % 360;
          ctx.fillStyle = `hsl(${hue} 74% ${52 + Math.sin(t * 2 + i) * 8}%)`;
          roundedRect(ctx, 18 + i * ((w - 54) / 7), 26 + (i % 2 ? 8 : 0), (w - 72) / 7, h - 52, 10);
          ctx.fill();
        }
        break;
      }
      case "scope": {
        const leak = hover || px > 0.62;
        const cards = [
          { label: "push()", x: 20, y: 26, c: "#3d5a80" },
          { label: "draw", x: w * 0.38, y: h * 0.42, c: "#e07a5f" },
          { label: "pop()", x: w - 74, y: h - 48, c: "#81b29a" }
        ];
        ctx.strokeStyle = leak ? "rgba(224,122,95,.55)" : "rgba(61,90,128,.26)";
        ctx.setLineDash(leak ? [4, 5] : []);
        ctx.lineWidth = 2;
        roundedRect(ctx, 14, 14, w - 28, h - 28, 16);
        ctx.stroke();
        ctx.setLineDash([]);
        cards.forEach((card, i) => {
          ctx.fillStyle = i === 1 && leak ? "#e07a5f" : card.c;
          roundedRect(ctx, card.x, card.y, 54, 26, 9);
          ctx.fill();
          ctx.fillStyle = "#fff";
          ctx.font = "700 9px DM Mono, monospace";
          ctx.fillText(card.label, card.x + 8, card.y + 17);
        });
        ctx.fillStyle = leak ? "rgba(224,122,95,.18)" : "rgba(129,178,154,.18)";
        roundedRect(ctx, w * 0.43, h * 0.5, 58, 34, 10);
        ctx.fill();
        ctx.fillStyle = "#2c2a26";
        ctx.font = "700 10px DM Mono, monospace";
        ctx.fillText(leak ? "state leaks" : "state scoped", 14, h - 12);
        break;
      }
      case "bounce": {
        ctx.fillStyle = "#fff";
        roundedRect(ctx, 16, 14, w - 32, h - 28, 14);
        ctx.fill();
        const bx = 28 + ((t * 90) % (w - 56));
        const raw = Math.sin(t * 2.1) * 0.5 + 0.5;
        const by = 24 + raw * (h - 48);
        ctx.strokeStyle = "rgba(61,90,128,.16)";
        ctx.strokeRect(16, 14, w - 32, h - 28);
        ctx.fillStyle = "#e07a5f";
        ctx.beginPath();
        ctx.arc(bx, by, 11, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case "bounceSeed": {
        ctx.fillStyle = "#fff";
        roundedRect(ctx, 16, 14, w - 32, h - 28, 14);
        ctx.fill();
        ctx.strokeStyle = "rgba(61,90,128,.18)";
        ctx.lineWidth = 2;
        ctx.strokeRect(16, 14, w - 32, h - 28);
        const speed = hover ? 1.65 : 1;
        const bx = 30 + ((t * 110 * speed) % (w - 60));
        const by = 24 + ((Math.sin(t * 2.5 * speed) * 0.5 + 0.5) * (h - 48));
        ctx.fillStyle = "#e07a5f";
        ctx.beginPath();
        ctx.arc(bx, by, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#3d5a80";
        ctx.font = "700 10px DM Mono, monospace";
        ctx.fillText("if edge, reverse", 22, 28);
        break;
      }
      case "frameRate": {
        ctx.fillStyle = "#fff";
        roundedRect(ctx, 16, 14, w - 32, h - 28, 14);
        ctx.fill();
        const fps = hover ? 12 : 30;
        const ghostCount = hover ? 7 : 18;
        for (let i = 0; i < ghostCount; i++) {
          const x = 26 + ((t * fps * 3 + i * 18) % (w - 52));
          ctx.fillStyle = `rgba(61,90,128,${0.08 + i / ghostCount * 0.24})`;
          ctx.beginPath();
          ctx.arc(x, h * 0.58, 10, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = "#e07a5f";
        ctx.font = "700 10px DM Mono, monospace";
        ctx.fillText(`${fps} fps`, 18, 30);
        break;
      }
      case "moduloFrame": {
        const cycle = hover ? 8 : 12;
        const frame = Math.floor(t * 18);
        const remainder = frame % cycle;
        ctx.fillStyle = "#fff";
        roundedRect(ctx, 16, 14, w - 32, h - 28, 14);
        ctx.fill();
        for (let i = 0; i < cycle; i++) {
          const angle = (i / cycle) * Math.PI * 2 - Math.PI / 2;
          const x = w * 0.5 + Math.cos(angle) * 38;
          const y = h * 0.54 + Math.sin(angle) * 38;
          ctx.fillStyle = i === remainder ? "#e07a5f" : "rgba(61,90,128,.18)";
          ctx.beginPath();
          ctx.arc(x, y, i === remainder ? 8 : 5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = "#3d5a80";
        ctx.font = "700 10px DM Mono, monospace";
        ctx.fillText(`frame % ${cycle} = ${remainder}`, 18, 28);
        break;
      }
      case "transform": {
        drawGrid(ctx, w, h, 22, "rgba(61,90,128,.06)");
        ctx.save();
        ctx.translate(w * 0.52, h * 0.54);
        const angle = t * 1.6 + px * 1.4;
        ctx.strokeStyle = "#3d5a80";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-34, 0);
        ctx.lineTo(40, 0);
        ctx.moveTo(0, -34);
        ctx.lineTo(0, 34);
        ctx.stroke();
        ctx.rotate(angle);
        ctx.fillStyle = "rgba(224,122,95,.78)";
        ctx.fillRect(-22, -12, 44, 24);
        ctx.restore();
        break;
      }
      case "mapping": {
        const y = h * 0.72;
        const x = 22 + px * (w - 44);
        const size = 10 + px * 24;
        ctx.strokeStyle = "rgba(61,90,128,.3)";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(22, y);
        ctx.lineTo(w - 22, y);
        ctx.stroke();
        ctx.fillStyle = "#3d5a80";
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#e07a5f";
        ctx.beginPath();
        ctx.arc(w * 0.68, h * 0.38, size, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case "distPipeline": {
        const sourceX = 22 + px * (w - 44);
        const sourceY = 20 + py * (h - 40);
        const targetX = w * 0.68;
        const targetY = h * 0.5;
        const dx = sourceX - targetX;
        const dy = sourceY - targetY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = Math.sqrt(w * w + h * h) * 0.55;
        const amt = clamp(1 - dist / maxDist, 0, 1);
        ctx.strokeStyle = "rgba(61,90,128,.22)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(sourceX, sourceY);
        ctx.lineTo(targetX, targetY);
        ctx.stroke();
        const hue = 210 - amt * 185;
        ctx.fillStyle = `hsl(${hue} 70% ${52 + amt * 8}%)`;
        ctx.beginPath();
        ctx.arc(targetX, targetY, 14 + amt * 24, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#e07a5f";
        ctx.beginPath();
        ctx.arc(sourceX, sourceY, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#2c2a26";
        ctx.font = "700 10px DM Mono, monospace";
        ctx.fillText(`amt ${amt.toFixed(2)}`, 14, h - 12);
        break;
      }
      case "threshold": {
        const threshold = w * 0.58;
        const dotX = 22 + ((t * 58 + px * 140) % (w - 44));
        const active = dotX > threshold;
        ctx.fillStyle = active ? "rgba(129,178,154,.22)" : "rgba(224,122,95,.16)";
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = active ? "#81b29a" : "#e07a5f";
        ctx.setLineDash([6, 6]);
        ctx.beginPath();
        ctx.moveTo(threshold, 12);
        ctx.lineTo(threshold, h - 12);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = active ? "#81b29a" : "#e07a5f";
        ctx.beginPath();
        ctx.arc(dotX, h * 0.56, 11, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case "grid":
      case "gridSeed": {
        const cols = family === "grid" ? 8 : 10;
        const rows = family === "grid" ? 5 : 4;
        const cw = (w - 28) / cols;
        const ch = (h - 28) / rows;
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const wave = Math.sin(t * 2 + row * 0.8 + col * 0.45 + px * 3);
            const alpha = 0.18 + (wave + 1) * 0.18;
            ctx.fillStyle = row % 2 === 0 ? `rgba(61,90,128,${alpha})` : `rgba(224,122,95,${alpha})`;
            roundedRect(ctx, 14 + col * cw, 14 + row * ch, cw - 6, ch - 6, 8);
            ctx.fill();
          }
        }
        break;
      }
      case "arrays":
      case "dataBars": {
        const bars = family === "arrays" ? [0.52, 0.74, 0.38, 0.9, 0.58, 0.43] : [0.26, 0.45, 0.7, 0.82, 0.63, 0.48, 0.91];
        const shift = hover ? Math.sin(t * 2) * 0.5 + 0.5 : 0.2;
        const max = Math.max(...bars);
        const avg = bars.reduce((sum, v) => sum + v, 0) / bars.length;
        bars.forEach((base, index) => {
          const value = family === "arrays" ? bars[(index + Math.floor(t * 2)) % bars.length] : base;
          const x = 18 + index * ((w - 36) / bars.length);
          const bw = (w - 54) / bars.length;
          const bh = (h - 36) * value;
          ctx.fillStyle = value === max && family === "dataBars" ? "#e07a5f" : `rgba(61,90,128,${0.34 + (index / bars.length) * 0.5 + shift * 0.12})`;
          ctx.fillRect(x, h - 16 - bh, bw, bh);
        });
        if (family === "dataBars") {
          const y = h - 16 - avg * (h - 36);
          ctx.strokeStyle = "#81b29a";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(14, y);
          ctx.lineTo(w - 14, y);
          ctx.stroke();
        }
        break;
      }
      case "function":
      case "functionSeed": {
        ctx.save();
        const centers = family === "functionSeed"
          ? [[w * 0.24, h * 0.44], [w * 0.5, h * 0.58], [w * 0.76, h * 0.42]]
          : [[w * 0.28, h * 0.44], [w * 0.52, h * 0.58], [w * 0.76, h * 0.42]];
        centers.forEach(([cx, cy], i) => {
          const petalCount = family === "functionSeed" ? 5 : 6;
          const radius = family === "functionSeed" ? 13 + i * 1.5 : 15;
          for (let petal = 0; petal < petalCount; petal++) {
            const angle = petal * ((Math.PI * 2) / petalCount) + t * 0.6;
            const px2 = cx + Math.cos(angle) * radius;
            const py2 = cy + Math.sin(angle) * radius;
            ctx.fillStyle = i % 2 === 0 ? "rgba(224,122,95,.62)" : "rgba(61,90,128,.62)";
            ctx.beginPath();
            ctx.arc(px2, py2, family === "functionSeed" ? 8 + i : 9, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.fillStyle = "#2c2a26";
          ctx.beginPath();
          ctx.arc(cx, cy, 7, 0, Math.PI * 2);
          ctx.fill();
        });
        if (family === "functionSeed") {
          ctx.fillStyle = "#3d5a80";
          ctx.font = "700 10px DM Mono, monospace";
          ctx.fillText("drawCreature(x, y, size)", 18, h - 16);
        }
        ctx.restore();
        break;
      }
      case "noiseRandom": {
        const mid = w / 2;
        ctx.fillStyle = "rgba(61,90,128,.07)";
        ctx.fillRect(mid - 1, 0, 2, h);
        for (let i = 0; i < 13; i++) {
          const rx = 16 + (i % 6) * 18 + (Math.sin(t * 18 + i * 2) * 10);
          const ry = 18 + ((i * 17 + t * 130) % (h - 36));
          ctx.fillStyle = "rgba(224,122,95,.82)";
          ctx.beginPath();
          ctx.arc(rx, ry, 4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.strokeStyle = "#3d5a80";
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let i = 0; i <= 18; i++) {
          const x = mid + 12 + i * ((w - mid - 24) / 18);
          const y = h * 0.54 + Math.sin(t * 1.8 + i * 0.48 + px * 2) * 22;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        break;
      }
      case "planner": {
        const labels = ["Data", "Map", "Story"];
        labels.forEach((label, i) => {
          const x = 18 + i * ((w - 56) / 3);
          const y = 24 + (i % 2) * 16;
          ctx.fillStyle = i === 1 ? "rgba(61,90,128,.16)" : "rgba(255,255,255,.88)";
          roundedRect(ctx, x, y, (w - 70) / 3, 44, 12);
          ctx.fill();
          ctx.strokeStyle = "rgba(44,42,38,.08)";
          ctx.stroke();
          ctx.fillStyle = "#2c2a26";
          ctx.font = "700 11px DM Sans, sans-serif";
          ctx.fillText(label, x + 10, y + 25);
        });
        ctx.strokeStyle = "#e07a5f";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(56, h - 26);
        ctx.lineTo(w - 44, h - 26);
        ctx.stroke();
        break;
      }
      case "dataMap": {
        const values = [0.25, 0.48, 0.72, 0.36, 0.84];
        values.forEach((v, i) => {
          const x = 24 + i * ((w - 48) / (values.length - 1));
          const y = h - 18 - v * (h - 44);
          ctx.fillStyle = `rgba(61,90,128,${0.3 + v * 0.6})`;
          ctx.beginPath();
          ctx.arc(x, y, 5 + v * 10, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "rgba(44,42,38,.1)";
          ctx.beginPath();
          ctx.moveTo(x, h - 18);
          ctx.lineTo(x, y);
          ctx.stroke();
        });
        break;
      }
      case "dataPortraitSeed": {
        const labels = ["sleep", "energy", "focus", "joy"];
        const values = [0.42, 0.8, 0.56, 0.92];
        const bubbleMode = hover;
        values.forEach((v, i) => {
          const x = 18 + i * ((w - 38) / 4);
          const bw = 32;
          const hValue = 20 + v * (h - 52);
          if (bubbleMode) {
            ctx.fillStyle = i % 2 ? "rgba(224,122,95,.78)" : "rgba(61,90,128,.72)";
            ctx.beginPath();
            ctx.arc(x + 16, h - 26 - v * 44, 7 + v * 16, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillStyle = i % 2 ? "rgba(224,122,95,.78)" : "rgba(61,90,128,.72)";
            roundedRect(ctx, x, h - 18 - hValue, bw, hValue, 10);
            ctx.fill();
          }
          ctx.fillStyle = "#6b6760";
          ctx.font = "600 9px DM Sans, sans-serif";
          ctx.fillText(labels[i], x - 1, h - 6);
        });
        break;
      }
      case "ripple": {
        const x = 24 + px * (w - 48);
        const y = 20 + py * (h - 40);
        for (let i = 0; i < 3; i++) {
          ctx.strokeStyle = `rgba(61,90,128,${0.24 - i * 0.05})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(x, y, 10 + i * 14 + (hover ? (t * 30) % 10 : 0), 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.fillStyle = "#e07a5f";
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case "trail": {
        for (let i = 0; i < 9; i++) {
          const alpha = 0.1 + i * 0.08;
          const x = 26 + i * ((w - 52) / 8) + Math.sin(t * 2 + i * 0.4) * 4;
          const y = h * 0.48 + Math.cos(t * 2.1 + i * 0.45) * 18;
          ctx.fillStyle = `rgba(61,90,128,${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, 6 + i * 0.9, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
      }
      case "ghostTrail": {
        const alpha = hover ? 0.08 : 0.22;
        ctx.fillStyle = `rgba(255,253,249,${alpha})`;
        ctx.fillRect(0, 0, w, h);
        for (let i = 0; i < 18; i++) {
          const age = i / 17;
          const x = 28 + age * (w - 56);
          const y = h * 0.52 + Math.sin(t * 2.3 - age * 4.2) * (22 + py * 12);
          ctx.fillStyle = `rgba(61,90,128,${0.08 + age * 0.48})`;
          ctx.beginPath();
          ctx.arc(x, y, 6 + age * 8, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = "#e07a5f";
        ctx.font = "700 10px DM Mono, monospace";
        ctx.fillText(hover ? "alpha 8" : "alpha 22", 14, h - 12);
        break;
      }
      case "trailSeed": {
        const targetX = 24 + px * (w - 48);
        const targetY = 22 + py * (h - 44);
        for (let i = 0; i < 11; i++) {
          const mix = i / 10;
          const x = 20 + mix * (targetX - 20) + Math.sin(t * 2.6 + i * 0.4) * 2;
          const y = h - 22 - mix * ((h - 22) - targetY) + Math.cos(t * 2.2 + i * 0.35) * 2;
          ctx.fillStyle = `rgba(61,90,128,${0.08 + mix * 0.55})`;
          ctx.beginPath();
          ctx.arc(x, y, 4 + mix * 9, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = "#e07a5f";
        ctx.beginPath();
        ctx.arc(targetX, targetY, 7, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case "collision": {
        const aX = w * 0.38 + Math.sin(t * 1.7) * 18;
        const bX = w * 0.62 - Math.sin(t * 1.7) * 18;
        const overlap = Math.abs(aX - bX) < 28;
        ctx.fillStyle = overlap ? "rgba(129,178,154,.18)" : "rgba(240,235,227,.82)";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "rgba(61,90,128,.74)";
        ctx.beginPath();
        ctx.arc(aX, h * 0.56, 21, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(224,122,95,.78)";
        ctx.beginPath();
        ctx.arc(bX, h * 0.56, 21, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = overlap ? "#3f6d59" : "#6b6760";
        ctx.font = "700 11px DM Sans, sans-serif";
        ctx.fillText(overlap ? "collision: true" : "collision: false", 16, 22);
        break;
      }
      case "objects": {
        const nodes = [
          { x: w * 0.26, y: h * 0.42, c: "#3d5a80" },
          { x: w * 0.52, y: h * 0.62, c: "#e07a5f" },
          { x: w * 0.74, y: h * 0.38, c: "#81b29a" }
        ];
        nodes.forEach((node, i) => {
          const dx = Math.sin(t * (1.1 + i * 0.3)) * 6;
          const dy = Math.cos(t * (1.4 + i * 0.2)) * 6;
          ctx.fillStyle = node.c;
          roundedRect(ctx, node.x - 18 + dx, node.y - 14 + dy, 36, 28, 10);
          ctx.fill();
        });
        break;
      }
      case "classBuilder": {
        ctx.fillStyle = "#fff";
        roundedRect(ctx, 18, 16, w - 36, h - 32, 14);
        ctx.fill();
        const methodOn = hover || Math.sin(t * 1.6) > -0.2;
        ctx.fillStyle = "#2c2a26";
        ctx.font = "800 12px DM Mono, monospace";
        ctx.fillText("class Dot {", 30, 36);
        ctx.font = "700 10px DM Mono, monospace";
        const rows = ["constructor()", "update()", "display()"];
        rows.forEach((row, i) => {
          const y = 56 + i * 20;
          ctx.fillStyle = i === 1 && methodOn ? "rgba(224,122,95,.16)" : "rgba(61,90,128,.08)";
          roundedRect(ctx, 30, y - 12, w - 70, 17, 6);
          ctx.fill();
          ctx.fillStyle = i === 1 && methodOn ? "#c8391d" : "#3d5a80";
          ctx.fillText(row, 38, y);
        });
        ctx.fillStyle = "#81b29a";
        ctx.beginPath();
        ctx.arc(w - 42, h - 34, 13 + Math.sin(t * 2) * 2, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case "objectDebugger": {
        const selected = Math.floor((px * 8 + t * 0.4) % 8);
        for (let i = 0; i < 8; i++) {
          const col = i % 4;
          const row = Math.floor(i / 4);
          const x = 24 + col * ((w - 48) / 3);
          const y = 28 + row * ((h - 62) / 1);
          const bounce = Math.sin(t * 2 + i) * 6;
          ctx.fillStyle = i === selected ? "#e07a5f" : "rgba(61,90,128,.72)";
          ctx.beginPath();
          ctx.arc(x, y + bounce, i === selected ? 11 : 8, 0, Math.PI * 2);
          ctx.fill();
          if (i === selected) {
            ctx.strokeStyle = "rgba(224,122,95,.42)";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(x, y + bounce, 17, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
        ctx.fillStyle = "rgba(255,255,255,.86)";
        roundedRect(ctx, w - 98, h - 42, 82, 28, 8);
        ctx.fill();
        ctx.fillStyle = "#2c2a26";
        ctx.font = "700 10px DM Mono, monospace";
        ctx.fillText(`balls[${selected}]`, w - 88, h - 25);
        break;
      }
      case "stampSeed": {
        const stamps = [
          { x: w * 0.24, y: h * 0.38, kind: "circle", c: "#3d5a80" },
          { x: w * 0.52, y: h * 0.56, kind: "triangle", c: "#e07a5f" },
          { x: w * 0.74, y: h * 0.34, kind: "square", c: "#81b29a" }
        ];
        const hoverStamp = { x: 26 + px * (w - 52), y: 22 + py * (h - 44), kind: "circle", c: "#e07a5f" };
        [...stamps, hoverStamp].forEach((stamp, i) => {
          ctx.fillStyle = stamp.c;
          if (stamp.kind === "circle") {
            ctx.beginPath();
            ctx.arc(stamp.x, stamp.y, i === stamps.length ? 10 : 9 + i, 0, Math.PI * 2);
            ctx.fill();
          } else if (stamp.kind === "square") {
            roundedRect(ctx, stamp.x - 11, stamp.y - 11, 22, 22, 7);
            ctx.fill();
          } else {
            ctx.beginPath();
            ctx.moveTo(stamp.x, stamp.y - 12);
            ctx.lineTo(stamp.x + 12, stamp.y + 10);
            ctx.lineTo(stamp.x - 12, stamp.y + 10);
            ctx.closePath();
            ctx.fill();
          }
        });
        break;
      }
      case "keyboard":
      case "keyboardSeed": {
        ctx.fillStyle = "#fff";
        roundedRect(ctx, 18, 18, w - 36, h - 36, 16);
        ctx.fill();
        ctx.fillStyle = "rgba(61,90,128,.18)";
        [
          [w * 0.5, h * 0.3],
          [w * 0.38, h * 0.5],
          [w * 0.5, h * 0.5],
          [w * 0.62, h * 0.5]
        ].forEach(([x, y]) => {
          roundedRect(ctx, x - 18, y - 14, 36, 28, 10);
          ctx.fill();
        });
        ctx.fillStyle = "#e07a5f";
        const moveAmount = family === "keyboardSeed" ? (hover ? 20 : 10) : 14;
        roundedRect(ctx, w * 0.5 - 16 + Math.sin(t * 2) * moveAmount, h * 0.72 - 16, 32, 32, 10);
        ctx.fill();
        if (family === "keyboardSeed") {
          ctx.fillStyle = "#2c2a26";
          ctx.beginPath();
          ctx.arc(w * 0.5 - 6 + Math.sin(t * 2) * moveAmount, h * 0.72 - 3, 3, 0, Math.PI * 2);
          ctx.arc(w * 0.5 + 6 + Math.sin(t * 2) * moveAmount, h * 0.72 - 3, 3, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
      }
      case "cube": {
        ctx.save();
        ctx.translate(w * 0.5, h * 0.54);
        const angle = t * 1.25;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const size = 28;
        const front = [
          [-size + sin * 6, -size],
          [size + sin * 6, -size + cos * 4],
          [size + sin * 6, size],
          [-size + sin * 6, size - cos * 4]
        ];
        const back = front.map(([x, y]) => [x + 16, y - 14]);
        ctx.fillStyle = "rgba(61,90,128,.16)";
        ctx.strokeStyle = "#3d5a80";
        ctx.lineWidth = 2;
        [front, back].forEach((poly) => {
          ctx.beginPath();
          poly.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
          ctx.closePath();
          ctx.stroke();
        });
        front.forEach(([x, y], i) => {
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(back[i][0], back[i][1]);
          ctx.stroke();
        });
        ctx.restore();
        break;
      }
      case "sound": {
        const bars = 12;
        for (let i = 0; i < bars; i++) {
          const amp = 0.35 + (Math.sin(t * 3 + i * 0.65 + px * 4) + 1) * 0.22;
          const x = 16 + i * ((w - 32) / bars);
          const bh = amp * (h - 36);
          ctx.fillStyle = i % 3 === 0 ? "#e07a5f" : "#3d5a80";
          roundedRect(ctx, x, h - 16 - bh, 12, bh, 6);
          ctx.fill();
        }
        break;
      }
      case "image": {
        ctx.fillStyle = "#fff";
        roundedRect(ctx, 18, 16, w - 36, h - 32, 14);
        ctx.fill();
        ctx.fillStyle = "rgba(61,90,128,.22)";
        ctx.fillRect(28, 26, w - 56, h - 52);
        ctx.fillStyle = "rgba(224,122,95,.62)";
        ctx.fillRect(36 + Math.sin(t) * 8, 34, w * 0.28, h - 68);
        ctx.fillStyle = "rgba(129,178,154,.68)";
        ctx.fillRect(w * 0.48, 42 + Math.cos(t * 1.3) * 5, w * 0.22, h - 84);
        ctx.fillStyle = "rgba(255,255,255,.68)";
        ctx.fillRect(w * 0.68, 30, 8, h - 60);
        ctx.fillRect(w * 0.76, 30, 5, h - 60);
        break;
      }
      case "assetLoader": {
        ctx.fillStyle = "#fff";
        roundedRect(ctx, 18, 16, w - 36, h - 32, 14);
        ctx.fill();
        ctx.save();
        ctx.translate(42 + px * (w - 84), h * 0.52);
        ctx.rotate((px - 0.5) * 0.7 + Math.sin(t) * 0.08);
        const size = 30 + py * 22;
        ctx.fillStyle = "#f2cc8f";
        roundedRect(ctx, -size * 0.7, -size * 0.5, size * 1.4, size, 10);
        ctx.fill();
        ctx.fillStyle = "#3d5a80";
        ctx.beginPath();
        ctx.arc(-size * 0.25, -size * 0.08, 5, 0, Math.PI * 2);
        ctx.arc(size * 0.25, -size * 0.08, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#2c2a26";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, size * 0.06, size * 0.24, 0, Math.PI);
        ctx.stroke();
        ctx.restore();
        ctx.fillStyle = "#2c2a26";
        ctx.font = "700 10px DM Mono, monospace";
        ctx.fillText("preload() + image()", 18, h - 12);
        break;
      }
      case "pixels": {
        const cell = 18;
        for (let y = 18; y < h - 12; y += cell) {
          for (let x = 18; x < w - 12; x += cell) {
            const hue = (x * 1.5 + y * 2 + t * 28) % 360;
            const br = 42 + Math.sin(x * 0.04 + y * 0.08 + t) * 24;
            ctx.fillStyle = `hsl(${hue} 55% ${br + 18}%)`;
            if (hover) {
              ctx.beginPath();
              ctx.arc(x, y, 3 + (br / 90) * 7, 0, Math.PI * 2);
              ctx.fill();
            } else {
              ctx.fillRect(x - 5, y - 5, 12, 12);
            }
          }
        }
        ctx.fillStyle = "#2c2a26";
        ctx.font = "700 10px DM Mono, monospace";
        ctx.fillText("pixels[]", 14, h - 12);
        break;
      }
      case "postcard": {
        ctx.fillStyle = "#fff8f0";
        roundedRect(ctx, 16, 14, w - 32, h - 28, 14);
        ctx.fill();
        ctx.strokeStyle = "#e07a5f";
        ctx.lineWidth = 2;
        roundedRect(ctx, 28, 28, w - 56, h - 56, 12);
        ctx.stroke();
        ctx.fillStyle = "#f2cc8f";
        for (let i = 0; i < 10; i++) {
          ctx.beginPath();
          ctx.arc(42 + i * 22, 54 + Math.sin(t + i) * 8, 5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = "#3d5a80";
        ctx.font = "800 17px Fraunces, serif";
        ctx.fillText("hello", 42, h * 0.58);
        ctx.fillStyle = "#2c2a26";
        ctx.font = "10px DM Mono, monospace";
        ctx.fillText("save png", 42, h * 0.72);
        break;
      }
      case "poster": {
        ctx.fillStyle = "rgba(61,90,128,.14)";
        roundedRect(ctx, 18, 16, w - 36, h - 32, 14);
        ctx.fill();
        ctx.fillStyle = "#e07a5f";
        ctx.fillRect(32, 32, 56, 18);
        ctx.fillStyle = "#3d5a80";
        ctx.fillRect(w - 98, 32, 46, 64);
        ctx.fillStyle = "rgba(129,178,154,.92)";
        ctx.beginPath();
        ctx.arc(86 + Math.sin(t * 1.5) * 8, h - 42, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#2c2a26";
        ctx.font = "700 13px DM Sans, sans-serif";
        ctx.fillText("code", 32, 86);
        ctx.fillText("poster", 32, 104);
        break;
      }
      case "dots": {
        for (let i = 0; i < 18; i++) {
          const x = 20 + (i % 6) * ((w - 40) / 5);
          const y = 22 + Math.floor(i / 6) * ((h - 44) / 2);
          const offset = Math.sin(t * 1.6 + i) * 4;
          ctx.fillStyle = i % 2 ? "#3d5a80" : "#e07a5f";
          ctx.beginPath();
          ctx.arc(x + offset, y, 5, 0, Math.PI * 2);
          ctx.fill();
        }
        break;
      }
      case "poetry": {
        ctx.fillStyle = "#2c2a26";
        ctx.font = "700 13px DM Sans, sans-serif";
        ["soft", "electric", "echo", "drift"].forEach((word, i) => {
          ctx.fillText(word, 18 + (i % 2) * 82, 34 + Math.floor(i / 2) * 30 + Math.sin(t * 1.6 + i) * 4);
        });
        break;
      }
      case "words": {
        ctx.font = "700 12px DM Sans, sans-serif";
        const words = ["the", "blue", "robot", "sings"];
        words.forEach((word, i) => {
          ctx.fillStyle = i % 2 ? "#3d5a80" : "#e07a5f";
          ctx.fillText(word, 18 + i * 44, h * 0.56 + Math.sin(t * 1.8 + i) * 10);
        });
        break;
      }
      case "movingWords": {
        ctx.font = "700 14px DM Sans, sans-serif";
        ["move", "loop", "repeat"].forEach((word, i) => {
          const x = 18 + ((t * (28 + i * 8) + i * 54) % (w + 70)) - 40;
          ctx.fillStyle = i === 1 ? "#e07a5f" : "#3d5a80";
          ctx.fillText(word, x, 34 + i * 30);
        });
        break;
      }
      case "lerpSeed": {
        const tgtX = w * 0.5 + Math.cos(t * 1.1) * (w * 0.3);
        const tgtY = h * 0.5 + Math.sin(t * 0.85) * (h * 0.26);
        const lag = 0.55;
        const fX = w * 0.5 + Math.cos((t - lag) * 1.1) * (w * 0.3);
        const fY = h * 0.5 + Math.sin((t - lag) * 0.85) * (h * 0.26);
        ctx.strokeStyle = "rgba(224,122,95,.28)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(fX, fY);
        ctx.lineTo(tgtX, tgtY);
        ctx.stroke();
        ctx.strokeStyle = "rgba(224,122,95,.7)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(tgtX, tgtY, 9, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = "rgba(61,90,128,.18)";
        ctx.beginPath();
        ctx.arc(fX, fY, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#3d5a80";
        ctx.beginPath();
        ctx.arc(fX, fY, 11, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#3d5a80";
        ctx.font = "700 10px DM Mono, monospace";
        ctx.fillText("lerp()", 14, h - 14);
        break;
      }
      case "distSeed": {
        const mx = 22 + px * (w - 44);
        const my = 20 + py * (h - 40);
        const dotPositions = [
          [w * 0.25, h * 0.35], [w * 0.5, h * 0.28], [w * 0.75, h * 0.36],
          [w * 0.2, h * 0.62], [w * 0.5, h * 0.66], [w * 0.8, h * 0.6]
        ];
        dotPositions.forEach(([dx, dy]) => {
          const d = Math.sqrt((mx - dx) ** 2 + (my - dy) ** 2);
          const maxD = Math.sqrt(w * w + h * h) * 0.48;
          const size = 7 + (1 - Math.min(d / maxD, 1)) * 26;
          const alpha = 0.22 + (1 - Math.min(d / maxD, 1)) * 0.68;
          ctx.fillStyle = `rgba(61,90,128,${alpha})`;
          ctx.beginPath();
          ctx.arc(dx, dy, size, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.fillStyle = "rgba(224,122,95,.8)";
        ctx.beginPath();
        ctx.arc(mx, my, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#3d5a80";
        ctx.font = "700 10px DM Mono, monospace";
        ctx.fillText("dist()", 14, h - 14);
        break;
      }
      case "gravityPhysics": {
        ctx.fillStyle = "#fff";
        roundedRect(ctx, 16, 14, w - 32, h - 28, 14);
        ctx.fill();
        const floor = h - 24;
        const phase = (Math.sin(t * 1.5) + 1) / 2;
        const y = 30 + Math.pow(phase, 1.8) * (floor - 62);
        const x = 32 + ((t * 52) % (w - 64));
        ctx.strokeStyle = "rgba(44,42,38,.12)";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(18, floor);
        ctx.lineTo(w - 18, floor);
        ctx.stroke();
        ctx.fillStyle = "#e07a5f";
        ctx.beginPath();
        ctx.arc(x, y, 14, 0, Math.PI * 2);
        ctx.fill();
        arrow(ctx, x, y, x, Math.min(floor - 4, y + 34), "#81b29a");
        ctx.fillStyle = "#3d5a80";
        ctx.font = "700 10px DM Mono, monospace";
        ctx.fillText("vy += gravity", 16, 28);
        break;
      }
      case "angleMouse": {
        const ox = w * 0.48;
        const oy = h * 0.55;
        const tx = 24 + px * (w - 48);
        const ty = 22 + py * (h - 44);
        const angle = Math.atan2(ty - oy, tx - ox);
        ctx.strokeStyle = "rgba(224,122,95,.32)";
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(ox, oy);
        ctx.lineTo(tx, ty);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.save();
        ctx.translate(ox, oy);
        ctx.rotate(angle);
        ctx.fillStyle = "#3d5a80";
        ctx.beginPath();
        ctx.moveTo(42, 0);
        ctx.lineTo(-18, -16);
        ctx.lineTo(-7, 0);
        ctx.lineTo(-18, 16);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
        ctx.fillStyle = "#e07a5f";
        ctx.beginPath();
        ctx.arc(tx, ty, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#2c2a26";
        ctx.font = "700 10px DM Mono, monospace";
        ctx.fillText("atan2(dy, dx)", 14, h - 12);
        break;
      }
      case "sineWave": {
        const cx = w * 0.3;
        const cy = h * 0.54;
        const r = 34 + px * 18;
        const a = t * 2 + px * 2;
        const bx = cx + Math.cos(a) * r;
        const by = cy + Math.sin(a) * r;
        ctx.strokeStyle = "rgba(61,90,128,.2)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = "#e07a5f";
        ctx.beginPath();
        ctx.arc(bx, by, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#3d5a80";
        ctx.beginPath();
        for (let i = 0; i < 86; i++) {
          const x = w * 0.5 + i * ((w * 0.42) / 85);
          const y = cy + Math.sin(a + i * 0.2) * 24;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        break;
      }
      case "easingCurves": {
        const names = ["linear", "in", "out", "bounce"];
        const progress = (t * 0.65) % 1;
        names.forEach((name, i) => {
          const y = 28 + i * ((h - 56) / (names.length - 1));
          const x0 = 58;
          const x1 = w - 28;
          let e = progress;
          if (name === "in") e = progress * progress;
          if (name === "out") e = 1 - Math.pow(1 - progress, 2);
          if (name === "bounce") e = Math.abs(Math.sin(progress * Math.PI * 2)) * (1 - progress) + progress;
          ctx.strokeStyle = "rgba(44,42,38,.12)";
          ctx.beginPath();
          ctx.moveTo(x0, y);
          ctx.lineTo(x1, y);
          ctx.stroke();
          ctx.fillStyle = i % 2 ? "#3d5a80" : "#e07a5f";
          ctx.beginPath();
          ctx.arc(x0 + (x1 - x0) * e, y, 7, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#6b6760";
          ctx.font = "700 9px DM Mono, monospace";
          ctx.fillText(name, 14, y + 3);
        });
        break;
      }
      case "lifecycle": {
        for (let i = 0; i < 16; i++) {
          const age = (i / 15 + t * 0.18) % 1;
          const x = 22 + (i % 8) * ((w - 44) / 7);
          const y = 38 + Math.floor(i / 8) * 54 + Math.sin(t * 2 + i) * 5;
          const life = 1 - age;
          ctx.fillStyle = `rgba(61,90,128,${0.12 + life * 0.72})`;
          ctx.beginPath();
          ctx.arc(x, y, 5 + life * 13, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = `rgba(224,122,95,${0.28 + life * 0.6})`;
          ctx.fillRect(x - 16, y + 20, 32 * life, 4);
        }
        ctx.fillStyle = "#2c2a26";
        ctx.font = "700 10px DM Mono, monospace";
        ctx.fillText("born -> age -> splice", 14, h - 12);
        break;
      }
      case "hoverData": {
        const values = [8, 7, 4, 2, 3, 5];
        const labels = ["sleep", "school", "screen", "read", "move", "friends"];
        let nearest = 0;
        let nd = Infinity;
        values.forEach((value, i) => {
          const x = 24 + i * ((w - 48) / (values.length - 1));
          const d = Math.abs((22 + px * (w - 44)) - x);
          if (d < nd) { nd = d; nearest = i; }
        });
        values.forEach((value, i) => {
          const x = 24 + i * ((w - 48) / (values.length - 1));
          const bh = value / 8 * (h - 48);
          ctx.fillStyle = i === nearest ? "#e07a5f" : "#3d5a80";
          roundedRect(ctx, x - 10, h - 18 - bh, 20, bh, 7);
          ctx.fill();
        });
        const tx = 24 + nearest * ((w - 48) / (values.length - 1));
        ctx.fillStyle = "#fff";
        roundedRect(ctx, tx - 34, 16, 68, 28, 8);
        ctx.fill();
        ctx.fillStyle = "#2c2a26";
        ctx.font = "700 9px DM Mono, monospace";
        ctx.fillText(`${labels[nearest]} ${values[nearest]}`, tx - 26, 34);
        break;
      }
      case "agentsPreview": {
        ctx.fillStyle = "#f2cc8f";
        ctx.beginPath();
        ctx.arc(w * 0.5, h * 0.5, 13, 0, Math.PI * 2);
        ctx.fill();
        for (let i = 0; i < 24; i++) {
          const a = t * 0.7 + i * 1.7;
          const radius = 18 + (i % 6) * 12 + px * 20;
          const x = w * 0.5 + Math.cos(a + i) * radius;
          const y = h * 0.5 + Math.sin(a * 0.8 + i) * radius * 0.6;
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(a);
          ctx.fillStyle = i % 3 ? "#3d5a80" : "#e07a5f";
          ctx.beginPath();
          ctx.moveTo(8, 0);
          ctx.lineTo(-6, -4);
          ctx.lineTo(-6, 4);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
        break;
      }
      case "readablePreview": {
        const lines = hover ? ["let ballX", "let speed", "drawBall()"] : ["let x", "let y", "d()"];
        ctx.fillStyle = "#fff";
        roundedRect(ctx, 18, 16, w - 36, h - 32, 14);
        ctx.fill();
        lines.forEach((line, i) => {
          ctx.fillStyle = hover ? "rgba(129,178,154,.16)" : "rgba(224,122,95,.14)";
          roundedRect(ctx, 32, 30 + i * 28, w - 64, 20, 6);
          ctx.fill();
          ctx.fillStyle = hover ? "#2d6a4f" : "#c8391d";
          ctx.font = "700 11px DM Mono, monospace";
          ctx.fillText(line, 42, 44 + i * 28);
        });
        break;
      }
      case "stringsPreview": {
        const words = ["creative", "coding", "connects"];
        ctx.fillStyle = "#fff";
        roundedRect(ctx, 16, 16, w - 32, 34, 10);
        ctx.fill();
        ctx.fillStyle = "#2c2a26";
        ctx.font = "700 11px DM Sans, sans-serif";
        ctx.fillText(words.join(" "), 28, 38);
        words.forEach((word, i) => {
          const x = 18 + i * ((w - 36) / 3);
          ctx.fillStyle = i % 2 ? "#3d5a80" : "#e07a5f";
          roundedRect(ctx, x, 72 + Math.sin(t + i) * 4, (w - 54) / 3, 24, 8);
          ctx.fill();
          ctx.fillStyle = "#fff";
          ctx.font = "700 9px DM Mono, monospace";
          ctx.fillText(word, x + 8, 88 + Math.sin(t + i) * 4);
        });
        break;
      }
      case "inheritancePreview": {
        const boxes = [
          { x: 24, y: 34, w: 78, h: 48, label: "Parent", c: "#3d5a80" },
          { x: w - 104, y: 58, w: 78, h: 48, label: "Child", c: "#e07a5f" }
        ];
        boxes.forEach((box) => {
          ctx.fillStyle = "#fff";
          roundedRect(ctx, box.x, box.y, box.w, box.h, 10);
          ctx.fill();
          ctx.strokeStyle = box.c;
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.fillStyle = box.c;
          ctx.font = "700 10px DM Mono, monospace";
          ctx.fillText(box.label, box.x + 10, box.y + 28);
        });
        ctx.strokeStyle = "rgba(44,42,38,.28)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(w - 104, 82);
        ctx.lineTo(106, 58);
        ctx.stroke();
        ctx.fillStyle = "#2c2a26";
        ctx.font = "700 10px DM Mono, monospace";
        ctx.fillText("extends + super()", 18, h - 14);
        break;
      }
      case "tilePattern": {
        const cell = 24;
        for (let y = 12; y < h - 10; y += cell) {
          for (let x = 12; x < w - 10; x += cell) {
            const col = Math.floor(x / cell);
            const row = Math.floor(y / cell);
            const hue = (col * 28 + row * 18 + t * 30) % 360;
            ctx.fillStyle = `hsl(${hue} 58% ${56 + Math.sin(t + col + row) * 8}%)`;
            if ((col + row) % 3 === 0) {
              ctx.beginPath();
              ctx.arc(x, y, 7 + px * 5, 0, Math.PI * 2);
              ctx.fill();
            } else {
              roundedRect(ctx, x - 8, y - 8, 16, 16, 5);
              ctx.fill();
            }
          }
        }
        break;
      }
      case "gameState": {
        const states = ["start", "play", "win"];
        const active = Math.floor(t * 1.1) % states.length;
        states.forEach((label, i) => {
          const x = 28 + i * ((w - 56) / 3);
          const y = h * 0.42;
          ctx.fillStyle = i === active ? "#3d5a80" : "#f0ebe3";
          roundedRect(ctx, x, y, (w - 78) / 3, 34, 10);
          ctx.fill();
          ctx.fillStyle = i === active ? "#fff" : "#6b6760";
          ctx.font = "700 10px DM Mono, monospace";
          ctx.fillText(label, x + 12, y + 22);
        });
        ctx.fillStyle = "#e07a5f";
        ctx.beginPath();
        ctx.arc(36 + ((t * 40) % (w - 72)), h * 0.7, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#2c2a26";
        ctx.font = "700 10px DM Mono, monospace";
        ctx.fillText('state = "play"', 14, h - 12);
        break;
      }
      case "hsbSeed": {
        const sat = clamp((1 - py) * 100, 0, 100);
        for (let i = 0; i < 7; i++) {
          const hue = (i * 50 + t * 8) % 360;
          ctx.fillStyle = `hsl(${hue} ${sat}% 62%)`;
          const x = 14 + i * ((w - 28) / 7);
          roundedRect(ctx, x, 18, (w - 42) / 7, h - 36, 10);
          ctx.fill();
        }
        ctx.fillStyle = "rgba(44,42,38,.7)";
        ctx.font = "700 10px DM Mono, monospace";
        ctx.fillText(`sat: ${Math.round(sat)}%`, 14, h - 10);
        break;
      }
      case "textVisual": {
        const wds = ["make", "code", "remix", "play"];
        const positions = [
          [w * 0.26, h * 0.36], [w * 0.64, h * 0.28],
          [w * 0.34, h * 0.64], [w * 0.72, h * 0.7]
        ];
        wds.forEach((word, i) => {
          const [x, y] = positions[i];
          const sz = 13 + i * 4;
          const angle = Math.sin(t * 0.9 + i * 1.3) * 0.24;
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(angle);
          ctx.fillStyle = i % 2 ? "#e07a5f" : "#3d5a80";
          ctx.font = `700 ${sz}px Nunito, DM Sans, sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(word, 0, 0);
          ctx.restore();
        });
        break;
      }
      case "nameSeed": {
        ctx.fillStyle = "#f5f5f5";
        ctx.fillRect(0, 0, w, h);
        ctx.fillStyle = "#1e64dc";
        ctx.font = `800 ${Math.max(46, h * 0.48)}px DM Sans, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("SK", w / 2, h / 2);
        ctx.fillStyle = "#e07a5f";
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(44,42,38,.72)";
        ctx.font = "11px DM Mono, monospace";
        ctx.fillText("textAlign(CENTER, CENTER)", w / 2, h - 16);
        break;
      }
      default:
        break;
    }
    ctx.restore();
  }

  function animate(now) {
    previews.forEach((preview) => {
      if (preview.visible || preview.hover) {
        draw(preview, reduceMotion ? 0 : now);
      }
    });
    requestAnimationFrame(animate);
  }

  window.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".tool-card").forEach(createPreview);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const preview = previews.find((item) => item.stage === entry.target);
        if (preview) {
          if (entry.isIntersecting && !preview.visible) {
            preview.updateSize();
          }
          preview.visible = entry.isIntersecting;
          if (!entry.isIntersecting && reduceMotion) draw(preview, 0);
        }
      });
    }, { rootMargin: "120px 0px" });

    previews.forEach((preview) => observer.observe(preview.stage));
    window.addEventListener("resize", () => previews.forEach((preview) => preview.updateSize()));
    requestAnimationFrame(animate);
  });
})();
