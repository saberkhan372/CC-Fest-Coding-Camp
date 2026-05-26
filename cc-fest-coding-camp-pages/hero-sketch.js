/**
 * Hero background sketch — CC Fest Coding Camp
 *
 * A Perlin-style flow field: particles follow smooth noise vectors,
 * drawing thin ink lines on cream. The generative sketch IS the visual.
 *
 * Plain canvas 2D — no libraries. Readable by a beginner.
 * Pauses off-screen (IntersectionObserver) and on prefers-reduced-motion.
 */
(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const CREAM     = '#faf6f0';
  const INK_ALPHA = 'rgba(44, 42, 38, ';

  // Reduced-motion: static pattern only, no animation
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let W = 0;
  let H = 0;
  let animId = null;
  let t = 0;

  // ── Particles ────────────────────────────────────────────────────────────
  const NUM = 140;
  const particles = [];

  function makeParticle() {
    return { x: Math.random() * W, y: Math.random() * H, age: Math.random() * 260 };
  }

  function resetParticle(p) {
    p.x   = Math.random() * W;
    p.y   = Math.random() * H;
    p.age = 0;
  }

  // ── Smooth noise ─────────────────────────────────────────────────────────
  // Layered sines give a smooth, Perlin-like flow without a library.
  // The angle returned steers each particle.
  function flowAngle(x, y, time) {
    const scale = 0.0055;
    return (
      Math.sin(x * scale + time * 0.35) * Math.cos(y * scale * 0.9 + time * 0.25) +
      Math.sin((x + y) * scale * 0.6  + time * 0.18) * 0.5
    ) * Math.PI * 2;
  }

  // ── Static fallback (reduced-motion or first frame) ───────────────────
  function drawStatic() {
    ctx.fillStyle = CREAM;
    ctx.fillRect(0, 0, W, H);
    ctx.lineWidth   = 0.75;
    ctx.strokeStyle = INK_ALPHA + '0.15)';
    const gap = 32;
    for (let x = gap / 2; x < W; x += gap) {
      for (let y = gap / 2; y < H; y += gap) {
        const angle = flowAngle(x, y, 0);
        const len   = 16;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + Math.cos(angle) * len, y + Math.sin(angle) * len);
        ctx.stroke();
      }
    }
  }

  // ── Animation frame ───────────────────────────────────────────────────
  function draw() {
    // Soft cream fade — leaves particle trails that slowly dissolve
    ctx.fillStyle = 'rgba(250, 246, 240, 0.055)';
    ctx.fillRect(0, 0, W, H);

    ctx.lineWidth = 0.85;

    for (const p of particles) {
      const angle = flowAngle(p.x, p.y, t);
      const speed = 1.3;
      const nx    = p.x + Math.cos(angle) * speed;
      const ny    = p.y + Math.sin(angle) * speed;

      ctx.beginPath();
      ctx.strokeStyle = INK_ALPHA + '0.2)';
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(nx, ny);
      ctx.stroke();

      p.x   = nx;
      p.y   = ny;
      p.age += 1;

      if (p.x < -4 || p.x > W + 4 || p.y < -4 || p.y > H + 4 || p.age > 280) {
        resetParticle(p);
      }
    }

    t     += 0.0038;
    animId = requestAnimationFrame(draw);
  }

  // ── Resize ────────────────────────────────────────────────────────────
  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;

    particles.length = 0;
    for (let i = 0; i < NUM; i++) particles.push(makeParticle());

    if (prefersReduced) {
      drawStatic();
    } else {
      // Fresh cream background when resizing so trails don't smear
      ctx.fillStyle = CREAM;
      ctx.fillRect(0, 0, W, H);
    }
  }

  // ── Visibility pause / resume ─────────────────────────────────────────
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        if (!animId && !prefersReduced) animId = requestAnimationFrame(draw);
      } else {
        if (animId) { cancelAnimationFrame(animId); animId = null; }
      }
    }
  }, { threshold: 0.05 });

  // ── Init ─────────────────────────────────────────────────────────────
  resize();
  window.addEventListener('resize', resize, { passive: true });
  observer.observe(canvas);

  if (!prefersReduced) {
    animId = requestAnimationFrame(draw);
  }
})();
