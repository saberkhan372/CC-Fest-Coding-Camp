(function() {
  const session = window.CCFestSession;
  if (!session) return;

  const catalogById = new Map((window.CCFestCatalog?.items || []).map((item) => [item.id, item]));
  const sessions = (window.CCFestSessions || []).filter((item) => item.id !== "template");
  let sketch = null;
  let currentSeed = session.seed;
  const POSTER_W = 600;
  const POSTER_H = 840;

  function itemLink(kind, slug) {
    const item = catalogById.get(slug);
    const label = item?.title || slug.replaceAll("-", " ");
    const href = kind === "bridge" ? `../../concept-bridges/${slug}/` : `../../tools/${slug}/`;
    const type = kind === "bridge" ? "Concept bridge" : item?.type === "sketch" ? "Starter sketch" : "Workshop tool";
    return `
      <li><a href="${href}">
        <span class="resource-type">${type}</span>
        <span>${label}</span>
      </a></li>
    `;
  }

  function renderResources() {
    const list = document.getElementById("resource-list");
    if (!list) return;
    list.innerHTML = [
      itemLink("bridge", session.anchorBridge),
      ...(session.featuredTools || []).map((slug) => itemLink("tool", slug)),
      ...(session.featuredSketches || []).map((slug) => itemLink("tool", slug))
    ].join("");
  }

  function renderNav() {
    const nav = document.getElementById("session-arc-nav");
    if (!nav) return;
    const index = sessions.findIndex((item) => item.id === session.id);
    const prev = sessions[index - 1];
    const next = sessions[index + 1];
    nav.innerHTML = `
      ${prev ? `<a href="../${prev.id}/"><span>Previous</span><strong>${prev.label}</strong></a>` : "<span></span>"}
      <a href="../index.html"><span>All sessions</span><strong>Session arc</strong></a>
      ${next ? `<a href="../${next.id}/"><span>Next</span><strong>${next.label}</strong></a>` : "<span></span>"}
    `;
  }

  function drawPoster(p) {
    const accent = p.color(session.accent);
    p.background(250, 246, 240);

    p.fill(44, 42, 38, 23);
    p.noStroke();
    for (let x = 2; x < POSTER_W; x += 20) {
      for (let y = 2; y < POSTER_H; y += 20) {
        p.circle(x, y, 3);
        p.circle(x + 10, y + 10, 3);
      }
    }

    p.fill(accent);
    p.noStroke();
    p.rect(0, 0, POSTER_W, 90);

    p.fill(255, 253, 247);
    p.textFont("DM Mono");
    p.textSize(12);
    p.textStyle(p.NORMAL);
    p.textAlign(p.LEFT, p.TOP);
    p.text("CC FEST / CODING CAMP", 28, 36);

    p.fill(44, 42, 38);
    p.textFont("DM Mono");
    p.textSize(11);
    p.textAlign(p.LEFT, p.TOP);
    p.text(session.label.toUpperCase(), 28, 118);

    p.stroke(44, 42, 38);
    p.strokeWeight(1.5);
    p.line(28, 134, POSTER_W - 28, 134);

    p.noStroke();
    p.fill(44, 42, 38);
    p.textFont("Fraunces");
    p.textAlign(p.LEFT, p.TOP);
    const maxW = POSTER_W - 56;
    let fontSize = 88;
    p.textSize(fontSize);
    p.textLeading(fontSize * 0.92);
    while (Math.max(...session.topic.split("\n").map((line) => p.textWidth(line))) > maxW && fontSize > 32) {
      fontSize -= 4;
      p.textSize(fontSize);
      p.textLeading(fontSize * 0.92);
    }
    p.text(session.topic, 28, 152, maxW);

    p.randomSeed(currentSeed);
    const circleY = 590;
    const margin = 28;
    const count = 8;
    const spacing = (POSTER_W - 2 * margin) / (count - 1);
    for (let i = 0; i < count; i++) {
      const x = margin + i * spacing;
      const d = 38 + p.random(-10, 10);
      const filled = p.random() > 0.52;
      const double = p.random() > 0.7;
      if (filled) {
        p.fill(accent);
        p.noStroke();
      } else {
        p.noFill();
        p.stroke(44, 42, 38);
        p.strokeWeight(2);
      }
      p.circle(x, circleY, d);
      if (double) {
        p.noFill();
        p.stroke(44, 42, 38);
        p.strokeWeight(1.5);
        p.circle(x, circleY, d * 0.5);
      }
    }

    p.randomSeed(currentSeed + 1);
    const count2 = 5;
    const spacing2 = (POSTER_W - 2 * margin) / (count2 - 1);
    for (let i = 0; i < count2; i++) {
      const x = margin + i * spacing2 + spacing2 * 0.5;
      if (x > POSTER_W - margin) continue;
      const d = 22 + p.random(-6, 6);
      if (p.random() > 0.6) {
        p.fill(accent);
        p.noStroke();
      } else {
        p.noFill();
        p.stroke(44, 42, 38);
        p.strokeWeight(1.5);
      }
      p.circle(x, circleY + 50, d);
    }

    p.stroke(44, 42, 38);
    p.strokeWeight(1);
    p.line(28, 730, POSTER_W - 28, 730);

    p.noStroke();
    p.fill(107, 103, 96);
    p.textFont("DM Mono");
    p.textSize(12);
    p.textAlign(p.LEFT, p.TOP);
    p.text(session.date, 28, 742);
    p.text(session.subtitle, 28, 762, POSTER_W - 56);

    p.textSize(10);
    p.textAlign(p.RIGHT, p.BOTTOM);
    p.text("CC FEST / 2026", POSTER_W - 28, POSTER_H - 22);
  }

  function redraw() {
    if (sketch) drawPoster(sketch);
  }

  window.savePoster = function() {
    if (sketch) sketch.saveCanvas(`cc-fest-session-${session.id}`, "png");
  };

  window.randomizeSeed = function() {
    currentSeed = Math.floor(Math.random() * 10000);
    redraw();
  };

  document.fonts.ready.then(() => {
    renderResources();
    renderNav();
    sketch = new p5((p) => {
      p.setup = () => {
        const canvas = p.createCanvas(POSTER_W, POSTER_H);
        canvas.parent("poster-canvas");
        p.noLoop();
        drawPoster(p);
      };
    });
  });
})();
