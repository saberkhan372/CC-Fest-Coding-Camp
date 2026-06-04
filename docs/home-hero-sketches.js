// home-hero-sketches.js
// Three restrained, "creative-coding" hero sketches for the CC Fest homepage.
// Palette stays composed: ink marks on cream paper, poster-red used sparingly,
// flyer-gold rarer still. Each export takes a host element and returns the p5
// instance. Mouse-aware but calm; respects prefers-reduced-motion.
(function (global) {
  var PAPER = [246, 240, 231];
  var INK = [32, 28, 26];
  var RED = [200, 57, 29];
  var GOLD = [245, 168, 0];
  var reduce = global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ── A · FLOW FIELD ─ slow ink ribbons drifting through a noise field ────────
  function flowField(host) {
    return new p5(function (p) {
      var parts = [], W, H, NUM = 420;
      function reset() {
        parts = [];
        for (var i = 0; i < NUM; i++) parts.push({
          x: p.random(W), y: p.random(H),
          red: p.random() < 0.08, gold: p.random() < 0.03, w: p.random(0.8, 2.6)
        });
      }
      p.setup = function () {
        W = host.clientWidth; H = host.clientHeight;
        var c = p.createCanvas(W, H); c.parent(host); p.pixelDensity(2);
        p.background(PAPER); reset();
        if (reduce) { for (var k = 0; k < 600; k++) step(); p.noLoop(); }
      };
      function step() {
        var mx = p.mouseX > 0 ? p.mouseX / W : 0.5, my = p.mouseY > 0 ? p.mouseY / H : 0.5;
        for (var i = 0; i < parts.length; i++) {
          var pt = parts[i];
          var a = p.noise(pt.x * 0.0016, pt.y * 0.0016, p.frameCount * 0.0016) * Math.PI * 3;
          a += (mx - 0.5) * 1.2;
          var nx = pt.x + Math.cos(a) * 1.1, ny = pt.y + Math.sin(a) * 1.1;
          var col = pt.red ? RED : pt.gold ? GOLD : INK;
          p.stroke(col[0], col[1], col[2], pt.red || pt.gold ? 105 : 52);
          p.strokeWeight(pt.w);
          p.line(pt.x, pt.y, nx, ny);
          pt.x = nx; pt.y = ny;
          if (pt.x < 0 || pt.x > W || pt.y < 0 || pt.y > H) { pt.x = p.random(W); pt.y = p.random(H); }
        }
      }
      p.draw = function () {
        p.noStroke(); p.fill(PAPER[0], PAPER[1], PAPER[2], 4); p.rect(0, 0, W, H);
        step(); step();
      };
      p.windowResized = function () { W = host.clientWidth; H = host.clientHeight; p.resizeCanvas(W, H); p.background(PAPER); reset(); };
    });
  }

  // ── B · LIVING GRID ─ a quiet grid of marks pulsing with noise ──────────────
  function livingGrid(host) {
    return new p5(function (p) {
      var W, H, gap = 30;
      p.setup = function () {
        W = host.clientWidth; H = host.clientHeight;
        var c = p.createCanvas(W, H); c.parent(host); p.pixelDensity(2);
        if (reduce) p.noLoop();
      };
      p.draw = function () {
        p.background(PAPER);
        var t = p.frameCount * 0.012;
        var mx = p.mouseX, my = p.mouseY;
        for (var x = gap; x < W; x += gap) {
          for (var y = gap; y < H; y += gap) {
            var n = p.noise(x * 0.02, y * 0.02, t);
            var d = (mx > 0) ? p.dist(x, y, mx, my) : 9999;
            var near = p.constrain(1 - d / 150, 0, 1);
            var s = p.map(n, 0, 1, 2, 15) + near * 10;
            if (n > 0.62) {
              var accent = n > 0.78 ? RED : GOLD;
              p.noStroke(); p.fill(accent[0], accent[1], accent[2], 200);
              p.circle(x, y, s);
            } else {
              p.noFill(); p.stroke(INK[0], INK[1], INK[2], 150); p.strokeWeight(1.3);
              if (n > 0.4) p.circle(x, y, s);
              else { p.push(); p.translate(x, y); p.rotate(n * 6 + t); p.line(-s/2, 0, s/2, 0); p.pop(); }
            }
          }
        }
      };
      p.windowResized = function () { W = host.clientWidth; H = host.clientHeight; p.resizeCanvas(W, H); };
    });
  }

  // ── C · CONSTELLATION ─ drifting nodes, thin links, red near the cursor ─────
  function constellation(host) {
    return new p5(function (p) {
      var nodes = [], W, H, NUM = 60;
      function reset() {
        nodes = [];
        for (var i = 0; i < NUM; i++) nodes.push({
          x: p.random(W), y: p.random(H), vx: p.random(-0.3, 0.3), vy: p.random(-0.3, 0.3)
        });
      }
      p.setup = function () {
        W = host.clientWidth; H = host.clientHeight;
        var c = p.createCanvas(W, H); c.parent(host); p.pixelDensity(2); reset();
        if (reduce) p.noLoop();
      };
      p.draw = function () {
        p.background(PAPER);
        for (var i = 0; i < nodes.length; i++) {
          var n = nodes[i]; n.x += n.vx; n.y += n.vy;
          if (n.x < 0 || n.x > W) n.vx *= -1; if (n.y < 0 || n.y > H) n.vy *= -1;
        }
        for (var i = 0; i < nodes.length; i++) {
          for (var j = i + 1; j < nodes.length; j++) {
            var a = nodes[i], b = nodes[j], d = p.dist(a.x, a.y, b.x, b.y);
            if (d < 116) { p.stroke(INK[0], INK[1], INK[2], p.map(d, 0, 116, 60, 0)); p.strokeWeight(1); p.line(a.x, a.y, b.x, b.y); }
          }
        }
        for (var i = 0; i < nodes.length; i++) {
          var n = nodes[i], d = (p.mouseX > 0) ? p.dist(n.x, n.y, p.mouseX, p.mouseY) : 9999;
          if (d < 90) { p.noStroke(); p.fill(RED[0], RED[1], RED[2]); p.circle(n.x, n.y, 6); }
          else { p.noStroke(); p.fill(INK[0], INK[1], INK[2], 190); p.circle(n.x, n.y, 3.4); }
        }
      };
      p.windowResized = function () { W = host.clientWidth; H = host.clientHeight; p.resizeCanvas(W, H); reset(); };
    });
  }

  global.CCHeroSketches = { flowField: flowField, livingGrid: livingGrid, constellation: constellation };
})(window);
