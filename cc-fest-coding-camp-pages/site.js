(() => {
  const poster = document.querySelector("[data-hero-poster]");
  if (!poster) return;

  const tokens = Array.from(poster.querySelectorAll("[data-token]"));
  const dots = Array.from(poster.querySelectorAll(".poster-dot"));
  const tokenSets = [
    ["mouseX", "noise()", "circle()", "map()", "draw()", "fill()"],
    ["lerp()", "random()", "translate()", "push()", "rotate()", "text()"],
    ["frameCount", "dist()", "arc()", "colorMode()", "sin()", "rect()"],
    ["setup()", "background()", "noStroke()", "if / else", "for loop", "HSB"]
  ];
  const palettes = [
    ["#d83a24", "#f5a800", "#e97a5f", "#2d6a4f", "#211f1c", "#5c4084"],
    ["#315c92", "#f0b43c", "#c94f7c", "#2f7f6f", "#222222", "#7d4e9e"],
    ["#c8391d", "#95c94a", "#e07a5f", "#457b9d", "#1d1d1b", "#8d6a9f"],
    ["#7149a3", "#f28c28", "#2f8f83", "#d9534f", "#232323", "#3762a3"]
  ];
  let remixIndex = 0;

  const setPush = (items, rect, clientX, clientY) => {
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const x = (clientX - cx) / rect.width;
    const y = (clientY - cy) / rect.height;
    const localX = ((clientX - rect.left) / rect.width) * 100;
    const localY = ((clientY - rect.top) / rect.height) * 100;

    poster.style.setProperty("--tilt-x", `${x * 8}deg`);
    poster.style.setProperty("--tilt-y", `${y * -8}deg`);
    poster.style.setProperty("--mouse-x", `${localX}%`);
    poster.style.setProperty("--mouse-y", `${localY}%`);

    items.forEach((item, index) => {
      const depth = index % 2 === 0 ? 18 : -14;
      item.style.setProperty("--push-x", `${x * depth}px`);
      item.style.setProperty("--push-y", `${y * depth}px`);
    });
  };

  const resetPush = () => {
    poster.style.setProperty("--tilt-x", "0deg");
    poster.style.setProperty("--tilt-y", "0deg");
    poster.style.setProperty("--mouse-x", "50%");
    poster.style.setProperty("--mouse-y", "50%");
    [...tokens, ...dots].forEach((item) => {
      item.style.setProperty("--push-x", "0px");
      item.style.setProperty("--push-y", "0px");
    });
  };

  const remixPoster = () => {
    remixIndex = (remixIndex + 1) % tokenSets.length;
    const labels = tokenSets[remixIndex];
    const colors = palettes[remixIndex];

    tokens.forEach((token, index) => {
      token.textContent = labels[index];
      token.style.background = colors[index];
      token.style.color = index === 1 ? "#211f1c" : "#fff";
      token.style.setProperty("--rotate", `${-10 + Math.random() * 20}deg`);
      token.style.setProperty("--rotate-mid", `${-6 + Math.random() * 12}deg`);
    });

    poster.classList.remove("is-remixing");
    window.requestAnimationFrame(() => {
      poster.classList.add("is-remixing");
      window.setTimeout(() => poster.classList.remove("is-remixing"), 260);
    });
  };

  // Draggable tokens
  const draggableTokens = Array.from(poster.querySelectorAll("[data-draggable]"));
  draggableTokens.forEach((token) => {
    let dragging = false;
    let startX = 0, startY = 0, origLeft = 0, origTop = 0;

    token.addEventListener("pointerdown", (e) => {
      e.stopPropagation();
      dragging = true;
      token.setPointerCapture(e.pointerId);
      const rect = poster.getBoundingClientRect();
      const tokRect = token.getBoundingClientRect();
      startX = e.clientX;
      startY = e.clientY;
      origLeft = tokRect.left - rect.left;
      origTop = tokRect.top - rect.top;
      token.style.position = "absolute";
      token.style.left = origLeft + "px";
      token.style.top = origTop + "px";
      token.style.zIndex = "10";
      token.style.transition = "none";
      token.style.animation = "none";
      token.style.transform = "none";
      token.style.cursor = "grabbing";
    });

    token.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      e.stopPropagation();
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      const rect = poster.getBoundingClientRect();
      const newLeft = Math.max(0, Math.min(rect.width - token.offsetWidth, origLeft + dx));
      const newTop = Math.max(0, Math.min(rect.height - token.offsetHeight, origTop + dy));
      token.style.left = newLeft + "px";
      token.style.top = newTop + "px";
    });

    token.addEventListener("pointerup", (e) => {
      if (!dragging) return;
      dragging = false;
      token.style.zIndex = "";
      token.style.cursor = "";
      token.style.transition = "";
      token.style.animation = "";
      token.style.transform = "";
    });
  });

  // Parallax tilt (only when not dragging a token)
  poster.addEventListener("pointermove", (event) => {
    if (event.target.hasAttribute("data-draggable")) return;
    setPush([...tokens, ...dots], poster.getBoundingClientRect(), event.clientX, event.clientY);
  });

  poster.addEventListener("pointerleave", resetPush);
  poster.addEventListener("click", (e) => {
    if (e.target.hasAttribute("data-draggable")) return;
    remixPoster();
  });
  poster.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    remixPoster();
  });

  const makeCollapsible = ({ container, header, grid, label, openByDefault = false }) => {
    if (!container || !header || !grid) return;
    container.classList.add("is-collapsible");
    if (openByDefault) container.classList.add("is-open");
    header.setAttribute("role", "button");
    header.setAttribute("tabindex", "0");
    header.setAttribute("aria-controls", grid.id);
    header.setAttribute("aria-expanded", String(openByDefault));
    header.setAttribute("aria-label", `${openByDefault ? "Hide" : "Show"} ${label}`);

    const toggle = () => {
      const isOpen = container.classList.toggle("is-open");
      header.setAttribute("aria-expanded", String(isOpen));
      header.setAttribute("aria-label", `${isOpen ? "Hide" : "Show"} ${label}`);
      if (isOpen) {
        // Re-animate cards and fix preview canvas sizes (were 0 while display:none)
        grid.querySelectorAll(".tool-card").forEach((card, i) => {
          card.style.animationDelay = `${i * 0.07}s`;
          card.style.animation = "none";
          card.offsetHeight;
          card.style.animation = "";
        });
        requestAnimationFrame(() => window.dispatchEvent(new Event("resize")));
      }
    };

    header.addEventListener("click", toggle);
    header.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      toggle();
    });
  };

  const addSectionPeek = ({ section, label, itemLabel, emptyLabel }) => {
    const header = section?.querySelector(".gallery-header");
    const stationList = section?.querySelector(".station-list");
    if (!section || !header || !stationList) return;

    const peekCards = Array.from(section.querySelectorAll(".station .tool-card")).slice(0, 3);
    if (peekCards.length === 0) return;

    const peekGrid = document.createElement("div");
    peekGrid.className = "gallery-peek tool-grid";
    peekGrid.id = `${section.id}-peek-grid`;

    peekCards.forEach((card) => {
      peekGrid.appendChild(card.cloneNode(true));
    });

    const totalItems = section.querySelectorAll(".station .tool-card").length;
    const remaining = Math.max(0, totalItems - peekCards.length);
    const trigger = document.createElement("div");
    trigger.className = "station-peek-trigger";
    trigger.setAttribute("aria-hidden", "true");
    const btn = document.createElement("span");
    btn.className = "station-peek-btn";
    btn.textContent = remaining > 0
      ? `Show ${remaining} more ${itemLabel} →`
      : emptyLabel;
    trigger.appendChild(btn);
    peekGrid.appendChild(trigger);

    stationList.before(peekGrid);

    makeCollapsible({
      container: section,
      header,
      grid: peekGrid,
      label,
      openByDefault: false
    });

    trigger.addEventListener("click", () => header.click());
  };

  addSectionPeek({
    section: document.querySelector("#concept-bridges"),
    label: "concept bridges",
    itemLabel: "concept bridges by section",
    emptyLabel: "Show concept bridges by section →"
  });

  addSectionPeek({
    section: document.querySelector("#interactive-tools"),
    label: "workshop tools",
    itemLabel: "workshop tools by section",
    emptyLabel: "Show workshop tools by section →"
  });

  document.querySelectorAll("#interactive-tools .station, #concept-bridges .station").forEach((station, index) => {
    const header = station.querySelector(".station-header");
    const grid = station.querySelector(".tool-grid");
    if (!header || !grid) return;

    const label = station.querySelector(".station-name")?.textContent?.trim() || `Tool section ${index + 1}`;
    const sectionType = station.closest("#concept-bridges") ? "bridge" : "tool";
    const gridId = `station-${sectionType}s-${index + 1}`;
    grid.id = grid.id || gridId;
    makeCollapsible({
      container: station,
      header,
      grid,
      label: `${label} ${sectionType}s`,
      openByDefault: false
    });

    const totalCards = grid.querySelectorAll(".tool-card").length;
    const previewCount = 3;
    const remaining = totalCards - previewCount;
    if (totalCards === 1) {
      station.setAttribute("data-card-count", "1");
    } else if (totalCards === 2) {
      station.setAttribute("data-card-count", "2");
    } else {
      station.removeAttribute("data-card-count");
    }
    if (remaining <= 0) {
      return;
    }
    const trigger = document.createElement("div");
    trigger.className = "station-peek-trigger";
    trigger.setAttribute("aria-hidden", "true");
    const btn = document.createElement("span");
    btn.className = "station-peek-btn";
    btn.textContent = `Show ${remaining} more ${label} ${sectionType}${remaining !== 1 ? "s" : ""} →`;
    trigger.appendChild(btn);
    grid.appendChild(trigger);
    trigger.addEventListener("click", () => header.click());
  });

  const starterSection = document.querySelector("#starter-sketches");
  const starterHeader = starterSection?.querySelector(".gallery-header");
  const starterGrid = starterSection?.querySelector(".tool-grid");
  if (starterSection && starterHeader && starterGrid) {
    starterGrid.id = starterGrid.id || "starter-sketch-grid";
    makeCollapsible({
      container: starterSection,
      header: starterHeader,
      grid: starterGrid,
      label: "starter sketches",
      openByDefault: false
    });
  }
})();

// Core tool badges
(function() {
  const CORE = new Set([
    "coordinate-system-explorer", "shape-and-color-explorer", "text-basics-studio", "rgb-hsb-color-lab",
    "animation-explorer", "framerate-visualizer", "map-explorer", "lerp-explorer", "if-else-decision-studio",
    "for-loop-stepper", "rows-and-columns", "function-builder", "noise-vs-random-explorer",
    "data-story-planner", "data-mapper", "csv-loadtable-data-explorer",
    "image-remix-studio", "sound-shape-visualizer", "postcard-studio", "game-state-starter", "particle-system-seed"
  ]);
  document.querySelectorAll(".tool-card").forEach(card => {
    const link = card.querySelector(".tool-actions a");
    if (!link) return;
    const slug = link.getAttribute("href").replace(/^tools\/|\/$/g, "");
    if (!CORE.has(slug)) return;
    card.dataset.core = "";
    const meta = card.querySelector(".tool-meta");
    if (meta) {
      const pill = document.createElement("span");
      pill.className = "pill core";
      pill.textContent = "Core";
      meta.appendChild(pill);
    }
  });
})();

// Suit filter bar
(function() {
  const filterBar = document.querySelector(".suit-filter-bar");
  if (!filterBar) return;

  const stations = document.querySelectorAll("#interactive-tools .station");
  const sketchCards = document.querySelectorAll("#starter-sketches .tool-card");
  const toolSection = document.querySelector("#interactive-tools");

  filterBar.addEventListener("click", function(e) {
    const btn = e.target.closest(".suit-btn");
    if (!btn) return;

    const filter = btn.dataset.filter;
    filterBar.querySelectorAll(".suit-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    if (filter === "all") {
      toolSection?.classList.remove("is-open");
      stations.forEach(s => s.hidden = false);
      sketchCards.forEach(c => c.hidden = false);
    } else {
      toolSection?.classList.add("is-open");
      stations.forEach(s => { s.hidden = s.dataset.suit !== filter; });
      sketchCards.forEach(c => { c.hidden = !c.classList.contains("suit-" + filter); });
    }
  });
})();

// Live search
(function() {
  const searchInput = document.querySelector(".tool-search");
  if (!searchInput) return;

  const allCards = document.querySelectorAll(".tool-card");
  const stations = document.querySelectorAll("#interactive-tools .station, #concept-bridges .station");
  const bridgeSection = document.querySelector("#concept-bridges");
  const toolSection = document.querySelector("#interactive-tools");
  const sketchSection = document.querySelector("#starter-sketches");

  searchInput.addEventListener("input", function() {
    const q = this.value.trim().toLowerCase();

    document.querySelector(".suit-filter-bar")?.querySelectorAll(".suit-btn")
      .forEach(b => b.classList.toggle("active", b.dataset.filter === "all"));

    if (!q) {
      document.body.classList.remove("search-active");
      allCards.forEach(c => c.hidden = false);
      stations.forEach(s => s.hidden = false);
      bridgeSection?.classList.remove("is-open");
      toolSection?.classList.remove("is-open");
      sketchSection?.classList.remove("is-open");
      if (bridgeSection) bridgeSection.hidden = false;
      if (toolSection) toolSection.hidden = false;
      if (sketchSection) sketchSection.hidden = false;
      return;
    }

    document.body.classList.add("search-active");
    bridgeSection?.classList.add("is-open");
    toolSection?.classList.add("is-open");
    allCards.forEach(c => {
      const title = c.querySelector("h3")?.textContent.toLowerCase() || "";
      const desc  = c.querySelector(".tool-description")?.textContent.toLowerCase() || "";
      const meta  = Array.from(c.querySelectorAll(".pill")).map(t => t.textContent.toLowerCase()).join(" ");
      const tags  = Array.from(c.querySelectorAll(".tag")).map(t => t.textContent.toLowerCase()).join(" ");
      c.hidden = !(title.includes(q) || desc.includes(q) || tags.includes(q) || meta.includes(q));
    });

    stations.forEach(s => {
      const visible = Array.from(s.querySelectorAll(".tool-card")).some(c => !c.hidden);
      s.hidden = !visible;
      if (!s.hidden) s.classList.add("is-open");
    });
    if (bridgeSection) {
      const visible = Array.from(bridgeSection.querySelectorAll(".tool-card")).some(c => !c.hidden);
      bridgeSection.hidden = !visible;
      if (!bridgeSection.hidden) bridgeSection.classList.add("is-open");
    }
    if (toolSection) {
      const visible = Array.from(toolSection.querySelectorAll(".tool-card")).some(c => !c.hidden);
      toolSection.hidden = !visible;
      if (!toolSection.hidden) toolSection.classList.add("is-open");
    }
    if (sketchSection) {
      const visible = Array.from(sketchSection.querySelectorAll(".tool-card")).some(c => !c.hidden);
      sketchSection.hidden = !visible;
      if (!sketchSection.hidden) sketchSection.classList.add("is-open");
    }
  });
})();
