(() => {
  const poster = document.querySelector("[data-hero-poster]");
  if (!poster) return;

  const tokens = Array.from(poster.querySelectorAll("[data-token]"));
  const dots = Array.from(poster.querySelectorAll(".poster-dot"));
  const tokenSets = [
    ["x, y", "loop()", "remix +", "noise()", "p5.js", "draw()"],
    ["mouseX", "map()", "color", "random()", "click", "shape"],
    ["text()", "lerp()", "array[]", "frame", "save()", "move"],
    ["fill()", "if / else", "rotate()", "data", "play", "voice"]
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

  poster.addEventListener("pointermove", (event) => {
    setPush([...tokens, ...dots], poster.getBoundingClientRect(), event.clientX, event.clientY);
  });

  poster.addEventListener("pointerleave", resetPush);
  poster.addEventListener("click", remixPoster);
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
    };

    header.addEventListener("click", toggle);
    header.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      toggle();
    });
  };

  document.querySelectorAll("#interactive-tools .station").forEach((station, index) => {
    const header = station.querySelector(".station-header");
    const grid = station.querySelector(".tool-grid");
    if (!header || !grid) return;

    const label = station.querySelector(".station-name")?.textContent?.trim() || `Tool section ${index + 1}`;
    const gridId = `station-tools-${index + 1}`;
    grid.id = grid.id || gridId;
    makeCollapsible({
      container: station,
      header,
      grid,
      label: `${label} tools`,
      openByDefault: index === 0
    });
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
