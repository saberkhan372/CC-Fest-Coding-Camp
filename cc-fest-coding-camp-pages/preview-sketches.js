(() => {
  const PREVIEW_MAP = {
    "coordinate-system-explorer": { family: "coordinates", label: "Coordinates" },
    "interactive-shape-explorer": { family: "shapes", label: "Shapes" },
    "shape-and-color-explorer": { family: "shapeColor", label: "Color" },
    "variable-playground": { family: "variable", label: "Variables" },
    "rgb-hsb-color-lab": { family: "colorLab", label: "Color Lab" },
    "animation-explorer": { family: "bounce", label: "Motion" },
    "transformations-explorer": { family: "transform", label: "Transforms" },
    "map-explorer": { family: "mapping", label: "Map" },
    "if-else-decision-studio": { family: "threshold", label: "Logic" },
    "rows-and-columns": { family: "grid", label: "Patterns" },
    "simple-array-explorer": { family: "arrays", label: "Arrays" },
    "polished-array-explorer": { family: "dataBars", label: "Data" },
    "function-builder": { family: "function", label: "Functions" },
    "noise-vs-random-explorer": { family: "noiseRandom", label: "Noise" },
    "data-story-planner": { family: "planner", label: "Planning" },
    "data-mapper": { family: "dataMap", label: "Mapping" },
    "event-handler-studio": { family: "ripple", label: "Events" },
    "collision-detection-explorer": { family: "collision", label: "Collisions" },
    "interactive-shape-drawing-app": { family: "objects", label: "Objects" },
    "webgl-3d-workshop": { family: "cube", label: "3D" },
    "sound-shape-visualizer": { family: "sound", label: "Sound" },
    "image-remix-studio": { family: "image", label: "Remix" },
    "mouse-trail-drawing-seed": { family: "trailSeed", label: "Trail" },
    "bouncing-ball-starter": { family: "bounceSeed", label: "Bounce" },
    "click-to-create-shapes": { family: "stampSeed", label: "Click" },
    "color-from-position": { family: "shapeColor", label: "Color" },
    "noise-walker": { family: "noiseRandom", label: "Noise" },
    "function-creature-stamp": { family: "functionSeed", label: "Function" },
    "keyboard-controlled-character": { family: "keyboardSeed", label: "Keys" },
    "simple-collision-game-seed": { family: "collision", label: "Collision" },
    "data-self-portrait-seed": { family: "dataPortraitSeed", label: "Data" },
    "image-grid-remix-seed": { family: "image", label: "Image" },
    "sound-pulse-seed": { family: "sound", label: "Sound" },
    "mini-generative-poster-seed": { family: "poster", label: "Poster" },
    "nested-loop-array-grid": { family: "gridSeed", label: "Seed" },
    "array-position-dot-field": { family: "dots", label: "Positions" },
    "random-poetry-generator": { family: "poetry", label: "Poetry" },
    "random-sentence-generator": { family: "words", label: "Words" },
    "arrays-in-motion": { family: "movingWords", label: "Text Motion" }
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
