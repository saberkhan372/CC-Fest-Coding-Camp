// Direction D · Workshop Refined — subpages
// Tool page · Concept Bridge · Sessions · About
// Carries D's cream + accent + gold visual language with 2px ink borders and offset shadows.

const _dShared = (palette) => ({
  page: {
    width: '100%',
    background: palette.paper,
    color: palette.ink,
    fontFamily: '"DM Sans",system-ui,sans-serif',
    fontSize: 15,
    lineHeight: 1.55,
  },
  panel: {
    background: palette.panel,
    border: `2px solid ${palette.ink}`,
    borderRadius: 14,
    boxShadow: '6px 6px 0 rgba(32,28,26,.14)',
  },
  innerPanel: {
    background: palette.paper,
    border: `2px solid ${palette.ink}`,
    borderRadius: 10,
    boxShadow: '3px 3px 0 rgba(32,28,26,.1)',
  },
});

// ── Topbar (with current page pilled) ──
const DTopbar = ({ palette, here }) => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: 24,
  }}>
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 12,
      fontSize: 12, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase',
      color: palette.accent,
    }}>
      <span style={{
        width: 14, height: 14, borderRadius: 3,
        background: palette.gold,
        border: `2px solid ${palette.ink}`,
        boxShadow: `3px 3px 0 ${palette.accent}`,
      }}></span>
      CC Fest · Coding Camp Tools
    </div>
    <nav style={{ display: 'flex', gap: 6 }}>
      {['Sessions', 'Bridges', 'Tools', 'Sketches', 'About'].map(label => (
        <span key={label} style={{
          padding: '6px 14px',
          borderRadius: 999,
          fontSize: 13, fontWeight: 600,
          color: label === here ? palette.paper : palette.muted,
          background: label === here ? palette.ink : 'transparent',
          border: label === here ? `2px solid ${palette.ink}` : `2px solid transparent`,
        }}>{label}</span>
      ))}
    </nav>
  </div>
);

// ── Breadcrumb row of pills ──
const DBreadcrumb = ({ palette, crumbs }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
    marginBottom: 22,
  }}>
    {crumbs.map((c, i) => (
      <React.Fragment key={i}>
        <span style={{
          fontFamily: '"DM Mono",monospace',
          fontSize: 11, fontWeight: 500, letterSpacing: '.06em',
          padding: '4px 11px', borderRadius: 999,
          border: `1.5px solid ${i === crumbs.length - 1 ? palette.ink : palette.line}`,
          background: i === crumbs.length - 1 ? palette.ink : 'transparent',
          color: i === crumbs.length - 1 ? palette.paper : palette.muted,
        }}>{c}</span>
        {i < crumbs.length - 1 && <span style={{ color: palette.line, fontSize: 12 }}>›</span>}
      </React.Fragment>
    ))}
  </div>
);

// ── Footer ──
const DFooter = ({ palette }) => (
  <footer style={{
    marginTop: 36,
    paddingTop: 22,
    borderTop: `2px solid ${palette.ink}`,
    display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
    flexWrap: 'wrap', gap: 16,
  }}>
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 12,
      fontFamily: '"DM Mono",monospace',
      fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase',
      color: palette.muted,
    }}>
      <span style={{
        width: 12, height: 12, borderRadius: 2,
        background: palette.gold, border: `2px solid ${palette.ink}`,
      }}></span>
      CC Fest · Coding Camp · 2026
    </div>
    <div style={{ display: 'flex', gap: 22, fontSize: 13, color: palette.muted }}>
      <span>ccfest.rocks</span>
      <span>Notion notes</span>
      <span>GitHub</span>
    </div>
  </footer>
);

// ── Pills (mirrors homepage style) ──
const dPillStyle = (palette, variant) => {
  const base = {
    padding: '3px 9px', borderRadius: 999,
    fontSize: 10.5, fontWeight: 700, letterSpacing: '.06em',
    display: 'inline-block',
  };
  const variants = {
    session: { background: palette.gold_soft, color: palette.ink, border: `1px solid rgba(32,28,26,.15)` },
    bridge:  { background: 'rgba(45,106,79,.08)', color: '#2d6a4f', border: '1px solid rgba(45,106,79,.2)' },
    type:    { background: palette.accent_soft, color: palette.accent, border: '1px solid rgba(200,57,29,.2)' },
    suit:    { background: palette.panel, color: palette.accent, border: `1.5px solid ${palette.line}` },
  };
  return { ...base, ...(variants[variant] || {}) };
};

// ── Shared header used inside content panels ──
const DPanelHead = ({ palette, label, title, sub, count }) => (
  <div style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
    flexWrap: 'wrap', gap: 12, marginBottom: 6,
  }}>
    <div>
      <window.DBoldBlockLabel palette={palette}>{label}</window.DBoldBlockLabel>
      <h2 style={{
        ...window.dHeadStyle(),
        marginTop: 14,
      }}>{title}</h2>
      {sub && (
        <p style={{
          margin: '8px 0 0', maxWidth: '70ch', color: palette.muted, fontSize: 15.5,
        }}>{sub}</p>
      )}
    </div>
    {count && (
      <span style={{
        fontFamily: '"DM Mono",monospace',
        fontSize: 12, color: palette.muted, fontWeight: 500,
      }}>{count}</span>
    )}
  </div>
);

// ─────────────────────────────────────────────────────────────────────
// D · TOOL PAGE
// ─────────────────────────────────────────────────────────────────────
const DToolPage = ({ t, C }) => {
  const palette = C;
  const spacious = t.density === 'spacious';
  const dense = t.density === 'compact';
  const pad = dense ? 32 : spacious ? 64 : 44;
  const gap = dense ? 32 : spacious ? 56 : 40;
  const sh = _dShared(palette);
  const bgStyle = window.bgPatternStyleD(t.bgPattern, palette);

  return (
    <div data-screen-label="D · Tool page" style={{ ...sh.page, ...bgStyle }}>
      <div style={{ padding: `${spacious ? 36 : 28}px ${pad}px ${spacious ? 72 : 56}px` }}>
        <DTopbar palette={palette} here="Tools" />
        <DBreadcrumb palette={palette} crumbs={['CC Fest', 'Workshop Tools', '✦ Marks · I', 'Coordinate System Explorer']} />

        {/* ── Hero card ── */}
        <section style={{
          ...sh.panel,
          padding: spacious ? 40 : 32, marginBottom: gap,
          ...window.bgPatternStyleD('dots-quiet', palette),
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 36, alignItems: 'start' }}>
            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                <span style={dPillStyle(palette, 'session')}>✦ Marks · I</span>
                <span style={dPillStyle(palette, 'type')}>Interactive tool</span>
                <span style={dPillStyle(palette, 'suit')}>Session 01 · Your Canvas</span>
                <span style={dPillStyle(palette, 'suit')}>Beginner</span>
              </div>
              <h1 style={{
                margin: 0,
                fontFamily: '"Fraunces",Georgia,serif',
                fontWeight: 800,
                fontSize: 'clamp(48px, 6vw, 76px)',
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
                color: palette.ink,
              }}>Coordinate System Explorer</h1>
              <p style={{
                margin: '20px 0 0', maxWidth: '52ch',
                fontSize: spacious ? 18 : 16.5, color: palette.muted, lineHeight: 1.55,
              }}>
                Click anywhere on the canvas and see the x/y coordinate. Once you're placing your own points, the grid stops feeling abstract.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 24 }}>
                <window.DButton palette={palette} primary>↗ Launch tool</window.DButton>
                <window.DButton palette={palette}>Open in p5 editor</window.DButton>
                <window.DButton palette={palette}>Teaching notes</window.DButton>
                <window.DButton palette={palette} ghost>Download .p5 →</window.DButton>
              </div>
            </div>

            {/* Catalog record sidebar (gold-soft, slight tilt) */}
            <aside style={{
              background: palette.gold_soft,
              border: `2px solid ${palette.ink}`,
              borderRadius: 10,
              padding: 20,
              boxShadow: '4px 4px 0 rgba(32,28,26,.14)',
              transform: 'rotate(.6deg)',
            }}>
              <div style={{
                fontFamily: '"DM Mono",monospace',
                fontSize: 11, fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase',
                color: palette.accent, marginBottom: 12,
              }}>Catalog record</div>
              {[
                ['№', '01 of 66'],
                ['Suit', '✦ Marks · Roman I'],
                ['Session', '01 · Your Canvas, Your Voice'],
                ['Difficulty', 'Beginner'],
                ['Pairs with', 'Shape + Color · For Loop'],
                ['Bridge', '⬡ How p5 Thinks About Time'],
              ].map((row, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '80px 1fr', gap: 10,
                  padding: '8px 0',
                  borderTop: i > 0 ? `1px solid rgba(32,28,26,.12)` : 'none',
                }}>
                  <span style={{
                    fontFamily: '"DM Mono",monospace',
                    fontSize: 10.5, letterSpacing: '.08em', textTransform: 'uppercase',
                    color: palette.muted, fontWeight: 600,
                  }}>{row[0]}</span>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{row[1]}</span>
                </div>
              ))}
            </aside>
          </div>
        </section>

        {/* ── Sketch + controls ── */}
        <section style={{ ...sh.panel, padding: 0, marginBottom: gap, overflow: 'hidden' }}>
          <div style={{
            padding: '14px 22px',
            borderBottom: `2px solid ${palette.ink}`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            background: palette.panel,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={dPillStyle(palette, 'suit')}>● Live</span>
              <span style={{
                fontFamily: '"DM Mono",monospace', fontSize: 12,
                color: palette.muted, fontWeight: 500,
              }}>Sketch · 600 × 480 · p5.js</span>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <span style={dPillStyle(palette, 'suit')}>↻ Restart</span>
              <span style={dPillStyle(palette, 'suit')}>⤓ Save</span>
              <span style={dPillStyle(palette, 'suit')}>⌜ Fullscreen</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr' }}>
            <div style={{
              background: palette.paper,
              borderRight: `2px solid ${palette.ink}`,
              position: 'relative',
              padding: 32,
              minHeight: 480,
            }}>
              <DCoordSketch palette={palette} />
              <div style={{
                position: 'absolute', bottom: 22, left: 22,
                fontFamily: '"DM Mono",monospace',
                fontSize: 11, fontWeight: 600,
                background: palette.ink, color: palette.paper,
                padding: '6px 10px', borderRadius: 6,
              }}>x: 348 &nbsp; y: 207</div>
            </div>
            <div style={{ background: palette.panel }}>
              <div style={{
                padding: '12px 18px',
                borderBottom: `1px solid ${palette.line}`,
                fontFamily: '"DM Mono",monospace',
                fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase',
                color: palette.muted, fontWeight: 600,
              }}>Controls</div>
              {[
                { k: 'Grid spacing', v: '40 px', range: 0.45 },
                { k: 'Dot size',     v: '14 px', range: 0.7 },
                { k: 'Label color',  swatch: true },
                { k: 'Show origin',  v: 'ON', toggle: true },
                { k: 'Snap to grid', v: 'OFF', toggle: false },
              ].map((r, i) => (
                <div key={i} style={{
                  padding: '14px 18px',
                  borderBottom: `1px solid ${palette.line}`,
                }}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                    marginBottom: 8,
                  }}>
                    <span style={{ fontSize: 12.5, fontWeight: 700 }}>{r.k}</span>
                    {r.v && !r.swatch && (
                      <span style={{
                        fontFamily: '"DM Mono",monospace', fontSize: 11, color: palette.muted,
                      }}>{r.v}</span>
                    )}
                  </div>
                  {r.range !== undefined && (
                    <div style={{ position: 'relative', height: 8, background: palette.line, borderRadius: 4 }}>
                      <div style={{
                        position: 'absolute', left: 0, top: 0, bottom: 0,
                        width: `${r.range * 100}%`, background: palette.accent, borderRadius: 4,
                      }}></div>
                      <div style={{
                        position: 'absolute', left: `calc(${r.range * 100}% - 8px)`,
                        top: -3, width: 16, height: 16, borderRadius: 999,
                        background: palette.panel, border: `2px solid ${palette.accent}`,
                        boxShadow: '2px 2px 0 rgba(32,28,26,.14)',
                      }}></div>
                    </div>
                  )}
                  {r.swatch && (
                    <div style={{ display: 'flex', gap: 6, marginTop: 2 }}>
                      {[palette.accent, palette.ink, palette.gold, '#2d6a4f', '#1a5276'].map((c, j) => (
                        <div key={j} style={{
                          width: 22, height: 22, borderRadius: 6,
                          background: c,
                          border: j === 0 ? `2px solid ${palette.ink}` : `1.5px solid ${palette.line}`,
                          boxShadow: j === 0 ? '2px 2px 0 rgba(32,28,26,.14)' : 'none',
                        }}></div>
                      ))}
                    </div>
                  )}
                  {r.toggle !== undefined && (
                    <div style={{
                      display: 'inline-flex',
                      borderRadius: 6, overflow: 'hidden',
                      border: `2px solid ${palette.ink}`,
                    }}>
                      {['OFF', 'ON'].map(opt => (
                        <span key={opt} style={{
                          padding: '5px 14px',
                          fontFamily: '"DM Mono",monospace',
                          fontSize: 11, fontWeight: 700, letterSpacing: '.06em',
                          background: opt === r.v ? palette.ink : palette.panel,
                          color: opt === r.v ? palette.paper : palette.ink,
                          borderRight: opt === 'OFF' ? `1px solid ${palette.ink}` : 'none',
                        }}>{opt}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div style={{ padding: '16px 18px' }}>
                <window.DButton palette={palette} primary>Apply changes</window.DButton>
              </div>
            </div>
          </div>

          {/* Code tabs */}
          <div style={{ borderTop: `2px solid ${palette.ink}` }}>
            <div style={{ display: 'flex', background: palette.gold_soft, borderBottom: `2px solid ${palette.ink}` }}>
              {['sketch.js', 'index.html', 'style.css', 'teaching notes'].map((tab, i) => (
                <span key={tab} style={{
                  padding: '10px 18px',
                  borderRight: i < 3 ? `1px solid rgba(32,28,26,.15)` : 'none',
                  background: i === 0 ? palette.panel : 'transparent',
                  fontFamily: '"DM Mono",monospace',
                  fontSize: 12, fontWeight: i === 0 ? 700 : 500,
                  color: i === 0 ? palette.ink : palette.muted,
                  borderTop: i === 0 ? `3px solid ${palette.accent}` : 'none',
                  marginTop: i === 0 ? -3 : 0,
                }}>{tab}</span>
              ))}
            </div>
            <pre style={{
              margin: 0, padding: '22px 26px',
              fontFamily: '"DM Mono",monospace',
              fontSize: 13, lineHeight: 1.7,
              background: palette.panel, color: palette.ink,
              overflow: 'auto',
            }}>
{`function setup() {
  createCanvas(600, 480);
}

function draw() {
  background("${palette.paper}");
  drawGrid(40);              // ← change to 20 — what happens?

  fill("${palette.accent}");
  noStroke();
  circle(mouseX, mouseY, 14);

  fill(0);
  text("x: " + mouseX + "  y: " + mouseY, 18, height - 18);
}

function drawGrid(step) {
  stroke(200);
  for (let x = 0; x < width;  x += step) line(x, 0, x, height);
  for (let y = 0; y < height; y += step) line(0, y, width, y);
}`}
            </pre>
          </div>
        </section>

        {/* ── Teaching rhythm ── */}
        <section style={{ ...sh.panel, padding: spacious ? 32 : 26, marginBottom: gap }}>
          <DPanelHead
            palette={palette}
            label="How to use this tool"
            title="A four-beat rhythm: open, change, predict, teach."
            sub="Repeat this loop with every tool. Predicting before you let go is the move that turns a slider into understanding."
          />
          <div style={{
            marginTop: 18,
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12,
          }}>
            {[
              { sym: '①', k: 'Open',    body: 'Click around before reading a single line. Notice what changes when you move the mouse.' },
              { sym: '②', k: 'Change',  body: 'Move one slider — grid spacing — and predict before you let go.' },
              { sym: '③', k: 'Predict', body: 'Say what should happen. Knowing what breaks is knowing how it works.' },
              { sym: '④', k: 'Teach',   body: 'Hand it to a student: change spacing to 80, add a dot at (300, 240). Watch what they ask.' },
            ].map((step, i) => (
              <div key={i} style={{
                background: palette.gold_soft,
                border: `2px solid ${palette.ink}`,
                borderRadius: 10,
                padding: spacious ? 18 : 14,
                boxShadow: '3px 3px 0 rgba(32,28,26,.12)',
              }}>
                <div style={{
                  fontFamily: '"Fraunces",serif',
                  fontWeight: 800, fontSize: 32, lineHeight: 1, color: palette.accent,
                  marginBottom: 10,
                }}>{step.sym}</div>
                <div style={{
                  fontFamily: '"Fraunces",serif',
                  fontWeight: 800, fontSize: 18, letterSpacing: '-0.01em',
                  marginBottom: 6,
                }}>{step.k}</div>
                <div style={{ fontSize: 13.5, color: palette.muted, lineHeight: 1.5 }}>{step.body}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Pairs with ── */}
        <section style={{ ...sh.panel, padding: spacious ? 32 : 26, marginBottom: gap }}>
          <DPanelHead
            palette={palette}
            label="Pairs with"
            title="What to open next."
            sub="Three tools and one concept bridge that pair well with this one. Open them in any order."
          />
          <div style={{
            marginTop: 22,
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14,
          }}>
            {[
              { kind: 'Tool', n: 'II',  name: 'Shape + Color Explorer',          blurb: 'Mix color and shape with a live code preview.', pill: '✦ Marks · II' },
              { kind: 'Tool', n: 'VII', name: 'Animation Explorer',              blurb: 'Watch a variable change every frame and become motion.', pill: '◎ Motion · I' },
              { kind: 'Tool', n: 'XIII',name: 'For Loop Stepper',                blurb: 'Step through a loop one iteration at a time.', pill: '⬡ Systems · I' },
              { kind: 'Bridge', n: 'III', name: 'How p5.js Thinks About Time',   blurb: 'setup() runs once, draw() runs 60× a second.', pill: '⬡ Bridge · III' },
            ].map((card, i) => (
              <article key={i} style={{
                ..._dShared(palette).innerPanel,
                padding: spacious ? 18 : 14,
                display: 'flex', flexDirection: 'column', gap: 8,
                transform: i === 3 ? 'rotate(.4deg)' : 'none',
              }}>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 4 }}>
                  <span style={dPillStyle(palette, card.kind === 'Bridge' ? 'bridge' : 'session')}>{card.pill}</span>
                  <span style={dPillStyle(palette, 'type')}>{card.kind}</span>
                </div>
                <h3 style={{
                  margin: 0, fontFamily: '"Fraunces",serif', fontWeight: 800,
                  fontSize: 17, letterSpacing: '-0.01em', lineHeight: 1.2,
                }}>{card.name}</h3>
                <p style={{ margin: 0, fontSize: 13.5, color: palette.muted, lineHeight: 1.5 }}>{card.blurb}</p>
                <span style={{
                  marginTop: 'auto', alignSelf: 'flex-start',
                  padding: '5px 12px',
                  borderRadius: 8, border: `2px solid ${palette.accent}`,
                  background: palette.accent, color: palette.paper,
                  fontWeight: 700, fontSize: 12,
                  boxShadow: '2px 2px 0 rgba(32,28,26,.14)',
                }}>Open {card.kind}</span>
              </article>
            ))}
          </div>
        </section>

        <DFooter palette={palette} />
      </div>
    </div>
  );
};

// Small mock canvas for the coord tool
const DCoordSketch = ({ palette }) => {
  const W = 540, H = 380, step = 40;
  const lines = [];
  for (let x = 0; x <= W; x += step) lines.push(<line key={'vx' + x} x1={x} y1={0} x2={x} y2={H} stroke={palette.line} strokeWidth="1" />);
  for (let y = 0; y <= H; y += step) lines.push(<line key={'hy' + y} x1={0} y1={y} x2={W} y2={y} stroke={palette.line} strokeWidth="1" />);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
      {lines}
      <line x1="0" y1="0" x2={W} y2="0" stroke={palette.ink} strokeWidth="1.5" />
      <line x1="0" y1="0" x2="0" y2={H} stroke={palette.ink} strokeWidth="1.5" />
      <text x="6" y="14" fontFamily="DM Mono, monospace" fontSize="10" fill={palette.muted}>0,0</text>
      <text x={W - 30} y="14" fontFamily="DM Mono, monospace" fontSize="10" fill={palette.muted}>x→</text>
      <text x="4" y={H - 6} fontFamily="DM Mono, monospace" fontSize="10" fill={palette.muted}>y↓</text>
      <circle cx="140" cy="100" r="8" fill={palette.accent} />
      <circle cx="280" cy="220" r="8" fill={palette.accent} />
      <circle cx="400" cy="160" r="8" fill={palette.accent} />
      <text x="150" y="98" fontFamily="DM Mono, monospace" fontSize="11" fill={palette.muted}>(140, 100)</text>
      <text x="290" y="218" fontFamily="DM Mono, monospace" fontSize="11" fill={palette.muted}>(280, 220)</text>
      <text x="410" y="158" fontFamily="DM Mono, monospace" fontSize="11" fill={palette.muted}>(400, 160)</text>
      <line x1="348" y1="0" x2="348" y2={H} stroke={palette.ink} strokeWidth="0.5" strokeDasharray="3,4" />
      <line x1="0" y1="207" x2={W} y2="207" stroke={palette.ink} strokeWidth="0.5" strokeDasharray="3,4" />
      <circle cx="348" cy="207" r="11" fill="none" stroke={palette.ink} strokeWidth="1.5" />
      <circle cx="348" cy="207" r="3" fill={palette.gold} stroke={palette.ink} strokeWidth="1.5" />
    </svg>
  );
};

// ─────────────────────────────────────────────────────────────────────
// D · CONCEPT BRIDGE PAGE
// ─────────────────────────────────────────────────────────────────────
const DBridgePage = ({ t, C }) => {
  const palette = C;
  const spacious = t.density === 'spacious';
  const dense = t.density === 'compact';
  const pad = dense ? 32 : spacious ? 64 : 44;
  const gap = dense ? 32 : spacious ? 56 : 40;
  const sh = _dShared(palette);
  const bgStyle = window.bgPatternStyleD(t.bgPattern, palette);

  return (
    <div data-screen-label="D · Concept bridge" style={{ ...sh.page, ...bgStyle }}>
      <div style={{ padding: `${spacious ? 36 : 28}px ${pad}px ${spacious ? 72 : 56}px` }}>
        <DTopbar palette={palette} here="Bridges" />
        <DBreadcrumb palette={palette} crumbs={['CC Fest', 'Concept Bridges', '⬡ I', 'Color: Numbers Become Feeling']} />

        {/* Hero card */}
        <section style={{
          ...sh.panel, padding: spacious ? 40 : 32, marginBottom: gap,
          ...window.bgPatternStyleD('dots-quiet', palette),
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 36, alignItems: 'start' }}>
            <div style={{ textAlign: 'center', transform: 'rotate(-1.2deg)' }}>
              <div style={{
                fontFamily: '"Fraunces",serif',
                fontWeight: 900,
                fontSize: 'clamp(120px, 14vw, 180px)',
                lineHeight: 0.85,
                letterSpacing: '-0.05em',
                color: palette.accent,
              }}>I</div>
              <div style={{
                marginTop: 8,
                fontFamily: '"DM Mono",monospace',
                fontSize: 11, fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase',
                color: palette.muted,
              }}>Bridge № 01 of 21</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 16 }}>
                <span style={dPillStyle(palette, 'bridge')}>⬡ Concept Bridge</span>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                <span style={dPillStyle(palette, 'session')}>Foundations</span>
                <span style={dPillStyle(palette, 'suit')}>Visual + Color</span>
                <span style={dPillStyle(palette, 'suit')}>~ 8 min read</span>
              </div>
              <h1 style={{
                margin: 0,
                fontFamily: '"Fraunces",Georgia,serif',
                fontWeight: 800,
                fontSize: 'clamp(48px, 6vw, 76px)',
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
              }}>Color: Numbers<br/>Become Feeling.</h1>
              <p style={{
                margin: '20px 0 0', maxWidth: '52ch',
                fontSize: spacious ? 18.5 : 17, color: palette.muted, lineHeight: 1.55,
              }}>
                A bridge for <code style={codeD(palette)}>fill()</code>, <code style={codeD(palette)}>stroke()</code>, grayscale, RGB, HSB, alpha, and <code style={codeD(palette)}>lerpColor()</code> — so color stops feeling like raw numbers and starts feeling expressive.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 22 }}>
                <window.DButton palette={palette} primary>↗ Open Bridge</window.DButton>
                <window.DButton palette={palette}>Bridge transcript</window.DButton>
                <window.DButton palette={palette} ghost>Next bridge →</window.DButton>
              </div>

              {/* Meta strip */}
              <div style={{
                marginTop: 24,
                display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
                background: palette.panel,
                border: `2px solid ${palette.ink}`, borderRadius: 10,
                boxShadow: '3px 3px 0 rgba(32,28,26,.1)',
              }}>
                {[
                  ['Functions', 'fill() · stroke()'],
                  ['Models', 'RGB · HSB · Alpha'],
                  ['Pairs tool', '✦ Shape + Color'],
                  ['Next bridge', '⬡ II Wave'],
                ].map(([k, v], i) => (
                  <div key={i} style={{
                    padding: '12px 14px',
                    borderRight: i < 3 ? `1px solid ${palette.line}` : 'none',
                  }}>
                    <div style={{
                      fontFamily: '"DM Mono",monospace',
                      fontSize: 10.5, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase',
                      color: palette.muted, marginBottom: 4,
                    }}>{k}</div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4-beat rhythm */}
        <section style={{ ...sh.panel, padding: spacious ? 32 : 26, marginBottom: gap }}>
          <DPanelHead
            palette={palette}
            label="The bridge rhythm"
            title="Fuzzy idea → see it → connect it → go next."
            sub="Every concept bridge runs this little loop, in this order. Stay on each beat long enough that the next one feels earned."
          />
          <div style={{
            marginTop: 18,
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12,
          }}>
            {[
              { rot: '-0.7deg', sym: '◇', kicker: 'A color and a number — same thing?', body: 'Color feels mechanical when you write it. The bridge is making three numbers feel like a sweater you once owned.' },
              { rot: '0.4deg', sym: '✦', kicker: 'Drag a slider. Watch warmth become alarm.', body: 'A color block updates as you move R, G, B. A second block uses H, S, B. Notice which one feels intuitive.' },
              { rot: '-0.3deg', sym: '⬡', kicker: 'Meet fill() and lerpColor(): same numbers, named places.', body: 'Code beside canvas. Each slider corresponds to one argument. Sliders and code move together.' },
              { rot: '0.5deg', sym: '↗', kicker: 'Open Shape + Color or RGB/HSB Lab next.', body: 'A bridge ends by handing you to a workshop tool or starter sketch where you can practice the idea.' },
            ].map((step, i) => (
              <div key={i} style={{
                background: i === 0 ? palette.gold_soft : palette.paper,
                border: `2px solid ${palette.ink}`,
                borderRadius: 10,
                padding: spacious ? 20 : 16,
                boxShadow: '3px 3px 0 rgba(32,28,26,.12)',
                transform: `rotate(${step.rot})`,
              }}>
                <div style={{
                  fontFamily: '"Fraunces",serif', fontWeight: 800, fontSize: 26,
                  color: palette.accent, lineHeight: 1, marginBottom: 8,
                }}>{step.sym}</div>
                <div style={{
                  fontFamily: '"DM Mono",monospace',
                  fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase',
                  color: palette.muted, marginBottom: 6, fontWeight: 600,
                }}>Beat 0{i + 1}</div>
                <div style={{
                  fontFamily: '"Fraunces",serif', fontWeight: 800, fontSize: 17,
                  letterSpacing: '-0.015em', lineHeight: 1.25, marginBottom: 8,
                }}>“{step.kicker}”</div>
                <div style={{ fontSize: 13.5, color: palette.muted, lineHeight: 1.5 }}>{step.body}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Visual model */}
        <section style={{ ...sh.panel, padding: 0, marginBottom: gap, overflow: 'hidden' }}>
          <div style={{
            padding: '14px 22px',
            borderBottom: `2px solid ${palette.ink}`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            background: palette.panel,
          }}>
            <div>
              <window.DBoldBlockLabel palette={palette}>The visual model</window.DBoldBlockLabel>
              <h2 style={{ ...window.dHeadStyle(), marginTop: 12 }}>Three numbers become a feeling.</h2>
            </div>
            <span style={dPillStyle(palette, 'suit')}>● Live</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            {/* color blocks */}
            <div style={{
              padding: spacious ? 32 : 26,
              borderRight: `2px solid ${palette.ink}`,
              background: palette.paper,
            }}>
              <div style={{
                fontFamily: '"DM Mono",monospace',
                fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase',
                color: palette.muted, marginBottom: 14, fontWeight: 600,
              }}>The block</div>
              <div style={{
                height: 220, background: palette.accent,
                border: `2px solid ${palette.ink}`, borderRadius: 10,
                boxShadow: '4px 4px 0 rgba(32,28,26,.14)',
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', bottom: 10, left: 10,
                  fontFamily: '"DM Mono",monospace',
                  fontSize: 11, color: palette.paper, fontWeight: 600,
                  background: 'rgba(0,0,0,.35)', padding: '4px 8px', borderRadius: 6,
                }}>fill(184, 101, 40)</div>
              </div>
              <div style={{
                marginTop: 18,
                fontFamily: '"DM Mono",monospace',
                fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase',
                color: palette.muted, marginBottom: 10, fontWeight: 600,
              }}>A palette via lerpColor()</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
                {['#b46528', '#c97824', '#deb84a', '#7a8e4a', '#3b6a7b'].map((c, i) => (
                  <div key={i} style={{
                    aspectRatio: '1', background: c,
                    border: `2px solid ${palette.ink}`, borderRadius: 8,
                  }}></div>
                ))}
              </div>
            </div>

            {/* sliders */}
            <div style={{ padding: spacious ? 32 : 26 }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginBottom: 16,
              }}>
                <span style={{
                  fontFamily: '"DM Mono",monospace',
                  fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase',
                  color: palette.muted, fontWeight: 600,
                }}>The numbers</span>
                <div style={{
                  display: 'inline-flex',
                  borderRadius: 6, overflow: 'hidden',
                  border: `2px solid ${palette.ink}`,
                }}>
                  {['RGB', 'HSB'].map((m, i) => (
                    <span key={m} style={{
                      padding: '4px 12px',
                      fontFamily: '"DM Mono",monospace',
                      fontSize: 10.5, fontWeight: 700, letterSpacing: '.06em',
                      background: i === 0 ? palette.ink : palette.panel,
                      color: i === 0 ? palette.paper : palette.ink,
                      borderRight: i === 0 ? `1px solid ${palette.ink}` : 'none',
                    }}>{m}</span>
                  ))}
                </div>
              </div>
              {[
                { lbl: 'R', val: '184', range: 0.72, color: '#c8391d' },
                { lbl: 'G', val: '101', range: 0.40, color: '#2d6a4f' },
                { lbl: 'B', val: '040', range: 0.16, color: '#1a5276' },
                { lbl: 'A', val: '255', range: 1.00, color: palette.ink },
              ].map((s, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                    marginBottom: 6,
                  }}>
                    <span style={{
                      fontFamily: '"Fraunces",serif', fontWeight: 800,
                      fontSize: 22, lineHeight: 1, color: s.color,
                    }}>{s.lbl}</span>
                    <span style={{
                      fontFamily: '"DM Mono",monospace', fontSize: 12,
                      color: palette.muted, fontWeight: 600,
                    }}>{s.val} / 255</span>
                  </div>
                  <div style={{ position: 'relative', height: 8, background: palette.line, borderRadius: 4 }}>
                    <div style={{
                      position: 'absolute', left: 0, top: 0, bottom: 0,
                      width: `${s.range * 100}%`, background: s.color, borderRadius: 4,
                    }}></div>
                    <div style={{
                      position: 'absolute', left: `calc(${s.range * 100}% - 8px)`, top: -3,
                      width: 16, height: 16, borderRadius: 999,
                      background: palette.panel, border: `2px solid ${s.color}`,
                      boxShadow: '2px 2px 0 rgba(32,28,26,.14)',
                    }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Code under */}
          <div style={{ borderTop: `2px solid ${palette.ink}` }}>
            <div style={{
              padding: '10px 22px',
              borderBottom: `1px solid ${palette.line}`,
              background: palette.gold_soft,
              fontFamily: '"DM Mono",monospace',
              fontSize: 12, fontWeight: 700, color: palette.ink,
            }}>color-bridge.js</div>
            <pre style={{
              margin: 0, padding: '22px 26px',
              fontFamily: '"DM Mono",monospace',
              fontSize: 13, lineHeight: 1.7,
              background: palette.panel, color: palette.ink,
            }}>
{`// The bridge: three numbers, one feeling.
let r = 184;
let g = 101;
let b = 40;

fill(r, g, b);                    // ← drag the sliders above
rect(120, 120, 360, 240);

// One color crossfading into another:
let c1 = color(184, 101, 40);     // warm ochre
let c2 = color(63, 105, 122);     // cool slate
fill(lerpColor(c1, c2, 0.35));    // ← what does 0.35 feel like?`}
            </pre>
          </div>
        </section>

        {/* Body paragraphs */}
        <section style={{ ...sh.panel, padding: spacious ? 32 : 26, marginBottom: gap }}>
          <DPanelHead
            palette={palette}
            label="Why this is a bridge"
            title="Color is the first place numbers feel something."
          />
          <div style={{
            marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36,
          }}>
            <p style={{ margin: 0, fontSize: spacious ? 17 : 16, lineHeight: 1.65, color: palette.ink }}>
              For most people, color isn't a number — it's a memory. A warm October light. A bright cold morning. A sweater someone once wore. When students first see <code style={codeD(palette)}>fill(184, 101, 40)</code>, the code feels arbitrary. The work of the bridge is to <em>make the connection short</em>: this number raises this slider, this slider raises this feeling.
            </p>
            <p style={{ margin: 0, fontSize: spacious ? 17 : 16, lineHeight: 1.65, color: palette.muted }}>
              Once that short loop closes — drag, feel, name — the gap between syntax and intent is gone. Students stop asking <em>what number do I write?</em> and start asking <em>what feeling do I want?</em> That move is what every concept bridge is for, and color is usually the easiest place to make it.
            </p>
          </div>
        </section>

        {/* Go next */}
        <section style={{ ...sh.panel, padding: spacious ? 32 : 26, marginBottom: gap }}>
          <DPanelHead
            palette={palette}
            label="Go next"
            title="Pick a tool, open a sketch, or read the next bridge."
          />
          <div style={{
            marginTop: 22,
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14,
          }}>
            {[
              { kind: 'Tool',   pill: '✦ Marks · III',  name: 'Shape + Color Explorer',     blurb: 'Mix color and shape controls with code below.' },
              { kind: 'Tool',   pill: '✦ Marks · VI',   name: 'RGB / HSB Color Lab',        blurb: 'Switch models. Feel how each thinks about color.' },
              { kind: 'Bridge', pill: '⬡ Bridge · II',  name: 'Triangle → Circle → Wave',   blurb: 'From right triangles to sine and cosine.' },
            ].map((card, i) => (
              <article key={i} style={{
                ..._dShared(palette).innerPanel,
                padding: spacious ? 18 : 14,
                display: 'flex', flexDirection: 'column', gap: 8,
              }}>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  <span style={dPillStyle(palette, card.kind === 'Bridge' ? 'bridge' : 'session')}>{card.pill}</span>
                  <span style={dPillStyle(palette, 'type')}>{card.kind}</span>
                </div>
                <h3 style={{
                  margin: '4px 0 0', fontFamily: '"Fraunces",serif', fontWeight: 800,
                  fontSize: 17, letterSpacing: '-0.01em', lineHeight: 1.2,
                }}>{card.name}</h3>
                <p style={{ margin: 0, fontSize: 13.5, color: palette.muted, lineHeight: 1.5 }}>{card.blurb}</p>
                <span style={{
                  marginTop: 4, alignSelf: 'flex-start',
                  padding: '5px 12px',
                  borderRadius: 8, border: `2px solid ${palette.accent}`,
                  background: palette.accent, color: palette.paper,
                  fontWeight: 700, fontSize: 12,
                  boxShadow: '2px 2px 0 rgba(32,28,26,.14)',
                }}>Open {card.kind}</span>
              </article>
            ))}
          </div>
        </section>

        <DFooter palette={palette} />
      </div>
    </div>
  );
};

const codeD = (palette) => ({
  fontFamily: '"DM Mono",monospace',
  fontSize: '0.92em',
  background: palette.gold_soft,
  padding: '1px 6px',
  borderRadius: 4,
  border: `1px solid rgba(32,28,26,.12)`,
  color: palette.ink,
});

// ─────────────────────────────────────────────────────────────────────
// D · SESSIONS PAGE
// ─────────────────────────────────────────────────────────────────────
const DSessionsPage = ({ t, C }) => {
  const c = window.CC_CONTENT;
  const palette = C;
  const spacious = t.density === 'spacious';
  const dense = t.density === 'compact';
  const pad = dense ? 32 : spacious ? 64 : 44;
  const gap = dense ? 32 : spacious ? 56 : 40;
  const sh = _dShared(palette);
  const bgStyle = window.bgPatternStyleD(t.bgPattern, palette);

  return (
    <div data-screen-label="D · Sessions" style={{ ...sh.page, ...bgStyle }}>
      <div style={{ padding: `${spacious ? 36 : 28}px ${pad}px ${spacious ? 72 : 56}px` }}>
        <DTopbar palette={palette} here="Sessions" />
        <DBreadcrumb palette={palette} crumbs={['CC Fest', 'The Camp Arc', 'Sessions']} />

        {/* Hero */}
        <section style={{
          ...sh.panel, padding: spacious ? 40 : 32, marginBottom: gap,
          ...window.bgPatternStyleD('dots-quiet', palette),
        }}>
          <div style={{
            fontFamily: '"DM Mono",monospace',
            fontSize: 11.5, fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase',
            color: palette.accent, marginBottom: 16,
          }}>The Arc · Five sessions over five weeks</div>
          <h1 style={{
            margin: 0,
            fontFamily: '"Fraunces",Georgia,serif',
            fontWeight: 800,
            fontSize: 'clamp(56px, 7vw, 92px)',
            lineHeight: 0.98,
            letterSpacing: '-0.035em',
            maxWidth: '14ch',
          }}>From first marks to open studio.</h1>
          <p style={{
            margin: '22px 0 0', maxWidth: '54ch',
            fontSize: spacious ? 19 : 17, color: palette.muted, lineHeight: 1.55,
          }}>
            One arc. Five sessions. Each builds on the last. Every tool and sketch also stands alone — jump in anywhere. The arc is a suggestion; the catalog is the ground truth.
          </p>

          {/* Roadmap dots */}
          <div style={{
            marginTop: 36, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8,
          }}>
            {c.sessions.map((s, i) => (
              <div key={i} style={{
                position: 'relative',
                padding: '14px 14px 12px',
                background: palette.paper,
                border: `2px solid ${palette.ink}`,
                borderRadius: 10,
                boxShadow: '3px 3px 0 rgba(32,28,26,.1)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div style={{
                    width: 16, height: 16, borderRadius: 999,
                    background: ['#c8391d', '#1a5276', '#2d6a4f', '#7a5ea8', '#f5a800'][i],
                    border: `2px solid ${palette.ink}`,
                  }}></div>
                  {i < 4 && <div style={{ flex: 1, height: 2, background: palette.ink }}></div>}
                </div>
                <div style={{
                  fontFamily: '"DM Mono",monospace',
                  fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase',
                  color: palette.muted, marginBottom: 4, fontWeight: 600,
                }}>Week 0{i + 1}</div>
                <div style={{
                  fontFamily: '"Fraunces",serif', fontWeight: 800, fontSize: 14,
                  letterSpacing: '-0.015em', lineHeight: 1.2,
                }}>{s.title}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Each session */}
        {c.sessions.map((s, i) => (
          <section key={i} style={{
            ...sh.panel,
            padding: spacious ? 36 : 28,
            marginBottom: gap,
            transform: i % 2 === 0 ? 'rotate(-0.15deg)' : 'rotate(0.15deg)',
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 36, alignItems: 'start' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: '"Fraunces",serif',
                  fontWeight: 900,
                  fontSize: 'clamp(120px, 13vw, 160px)',
                  lineHeight: 0.85,
                  letterSpacing: '-0.05em',
                  color: ['#c8391d', '#1a5276', '#2d6a4f', '#7a5ea8', '#c96f4a'][i],
                  transform: i % 2 === 0 ? 'rotate(-2deg)' : 'rotate(2deg)',
                }}>{s.n}</div>
                <div style={{
                  fontFamily: '"DM Mono",monospace',
                  fontSize: 11, fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase',
                  color: palette.muted, marginTop: 8,
                }}>Session of five</div>
              </div>

              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                  <span style={dPillStyle(palette, 'session')}>Week 0{i + 1}</span>
                  <span style={dPillStyle(palette, 'suit')}>{s.tools.length} tools</span>
                  <span style={dPillStyle(palette, 'bridge')}>⬡ {s.bridge}</span>
                </div>
                <h2 style={{
                  margin: 0,
                  fontFamily: '"Fraunces",serif',
                  fontWeight: 800,
                  fontSize: 'clamp(32px, 4vw, 48px)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.025em',
                }}>{s.title}</h2>
                <p style={{
                  margin: '12px 0 0', maxWidth: '52ch',
                  fontSize: spacious ? 18 : 16, color: palette.muted,
                }}>{s.blurb}</p>

                {/* Goals + tools */}
                <div style={{
                  marginTop: 24,
                  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12,
                }}>
                  <div style={{ ..._dShared(palette).innerPanel, padding: 16 }}>
                    <div style={{
                      fontFamily: '"DM Mono",monospace',
                      fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase',
                      color: palette.accent, marginBottom: 10, fontWeight: 600,
                    }}>Learning goals</div>
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
                      {goalsForD(i).map((g, j) => (
                        <li key={j} style={{
                          fontSize: 13.5, lineHeight: 1.5,
                          display: 'grid', gridTemplateColumns: '14px 1fr', gap: 8,
                        }}>
                          <span style={{ color: palette.accent }}>→</span>
                          <span>{g}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ ..._dShared(palette).innerPanel, padding: 16 }}>
                    <div style={{
                      fontFamily: '"DM Mono",monospace',
                      fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase',
                      color: palette.accent, marginBottom: 10, fontWeight: 600,
                    }}>Stations</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                      {s.tools.map((tool, j) => (
                        <span key={j} style={{
                          fontFamily: '"DM Mono",monospace',
                          fontSize: 11, fontWeight: 500,
                          padding: '4px 10px', borderRadius: 999,
                          background: palette.panel,
                          border: `1.5px solid ${palette.line}`,
                          color: palette.ink,
                        }}>{tool}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 10, marginTop: 22, flexWrap: 'wrap' }}>
                  <window.DButton palette={palette} primary>Open Session {s.n}</window.DButton>
                  <window.DButton palette={palette}>Lesson plan</window.DButton>
                  <window.DButton palette={palette} ghost>Station kit →</window.DButton>
                </div>
              </div>
            </div>
          </section>
        ))}

        <DFooter palette={palette} />
      </div>
    </div>
  );
};

const goalsForD = (i) => ([
  ['Place a first mark with confidence.', 'Read x/y as the language of canvas.', 'Pick a color that means something.', 'Compose from primitives.'],
  ['See variables change frame by frame.', 'Use map() and lerp() as translators.', 'Listen to mouse and keyboard.', 'Predict before you change a number.'],
  ['Repeat with loops; branch with if.', 'Compose your own functions.', 'Feel random() vs noise().', 'Read a system, not just a sketch.'],
  ['Move from numbers to story.', 'Load CSV and JSON into the canvas.', 'Pick a chart that says one thing.', 'Argue with your own dataset.'],
  ['Choose a small piece to finish.', 'Share unfinished work with care.', 'Teach what you just learned.', 'Reflect on the arc, not the artifact.'],
][i]);

// ─────────────────────────────────────────────────────────────────────
// D · ABOUT PAGE
// ─────────────────────────────────────────────────────────────────────
const DAboutPage = ({ t, C }) => {
  const c = window.CC_CONTENT;
  const palette = C;
  const spacious = t.density === 'spacious';
  const dense = t.density === 'compact';
  const pad = dense ? 32 : spacious ? 64 : 44;
  const gap = dense ? 32 : spacious ? 56 : 40;
  const sh = _dShared(palette);
  const bgStyle = window.bgPatternStyleD(t.bgPattern, palette);

  return (
    <div data-screen-label="D · About" style={{ ...sh.page, ...bgStyle }}>
      <div style={{ padding: `${spacious ? 36 : 28}px ${pad}px ${spacious ? 72 : 56}px` }}>
        <DTopbar palette={palette} here="About" />
        <DBreadcrumb palette={palette} crumbs={['CC Fest', 'About']} />

        {/* Hero */}
        <section style={{
          ...sh.panel, padding: spacious ? 40 : 32, marginBottom: gap,
          ...window.bgPatternStyleD('dots-quiet', palette),
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 36, alignItems: 'start' }}>
            <div>
              <div style={{
                fontFamily: '"DM Mono",monospace',
                fontSize: 11.5, fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase',
                color: palette.accent, marginBottom: 16,
              }}>About this catalog</div>
              <h1 style={{
                margin: 0,
                fontFamily: '"Fraunces",Georgia,serif',
                fontWeight: 800,
                fontSize: 'clamp(56px, 7vw, 96px)',
                lineHeight: 0.98,
                letterSpacing: '-0.035em',
                maxWidth: '13ch',
              }}>A small, slow, <span style={{ color: palette.accent }}>open library</span> for creative code.</h1>
              <p style={{
                margin: '22px 0 0', maxWidth: '54ch',
                fontSize: spacious ? 19 : 17, color: palette.muted, lineHeight: 1.55,
              }}>
                CC Fest Coding Camp is a free workshop for creative coding. Open to anyone curious about creative code — you don't need to be a programmer to start. It's a small library of bridges, tools, and sketches we build together, edition after edition.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 24 }}>
                <window.DButton palette={palette} primary>Apply to Cohort IV</window.DButton>
                <window.DButton palette={palette}>Read the philosophy</window.DButton>
                <window.DButton palette={palette} ghost>Email Saber →</window.DButton>
              </div>
            </div>

            <aside style={{
              background: palette.gold_soft,
              border: `2px solid ${palette.ink}`,
              borderRadius: 10,
              padding: 22,
              boxShadow: '4px 4px 0 rgba(32,28,26,.14)',
              transform: 'rotate(.6deg)',
            }}>
              <div style={{
                fontFamily: '"DM Mono",monospace',
                fontSize: 11, fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase',
                color: palette.accent, marginBottom: 14,
              }}>What this is</div>
              {[
                ['21', 'Concept bridges', 'For intuition before syntax'],
                ['66', 'Workshop tools',  'For guided demos and stations'],
                ['44', 'Starter sketches','For editing and remixing'],
                ['05', 'Sessions',        'One arc, five weeks'],
              ].map((row, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '52px 1fr',
                  gap: 12,
                  padding: '8px 0',
                  borderTop: i > 0 ? `1px solid rgba(32,28,26,.12)` : 'none',
                  alignItems: 'baseline',
                }}>
                  <span style={{
                    fontFamily: '"Fraunces",serif', fontWeight: 800,
                    fontSize: 28, lineHeight: 0.9, letterSpacing: '-0.04em',
                    color: palette.ink,
                  }}>{row[0]}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{row[1]}</div>
                    <div style={{ fontSize: 12, color: palette.muted }}>{row[2]}</div>
                  </div>
                </div>
              ))}
            </aside>
          </div>
        </section>

        {/* Manifesto */}
        <section style={{ ...sh.panel, padding: spacious ? 32 : 26, marginBottom: gap }}>
          <DPanelHead
            palette={palette}
            label="What we believe"
            title="Four small rules for the curious."
            sub="None of them are about programming. All of them are about how you walk in."
          />
          <div style={{
            marginTop: 22,
            display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14,
          }}>
            {c.manifesto.map((m, i) => (
              <div key={i} style={{
                background: i % 2 === 0 ? palette.paper : palette.gold_soft,
                border: `2px solid ${palette.ink}`, borderRadius: 10,
                padding: spacious ? 24 : 18,
                boxShadow: '3px 3px 0 rgba(32,28,26,.12)',
                display: 'grid', gridTemplateColumns: '54px 1fr', gap: 14, alignItems: 'baseline',
                transform: ['rotate(-.3deg)', 'rotate(.2deg)', 'rotate(.3deg)', 'rotate(-.2deg)'][i],
              }}>
                <span style={{
                  fontFamily: '"Fraunces",serif', fontWeight: 900,
                  fontSize: 40, lineHeight: 1, letterSpacing: '-0.04em',
                  color: palette.accent,
                }}>0{i + 1}</span>
                <span style={{
                  fontFamily: '"Fraunces",serif', fontWeight: 700,
                  fontSize: spacious ? 22 : 20, letterSpacing: '-0.015em', lineHeight: 1.3,
                }}>{m}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Who this is for */}
        <section style={{ ...sh.panel, padding: spacious ? 32 : 26, marginBottom: gap }}>
          <DPanelHead
            palette={palette}
            label="Who this is for"
            title="Three readers. One catalog."
            sub="The library is sequenced for first-timers, but the same shelf serves educators and self-directed learners just as well."
          />
          <div style={{
            marginTop: 22,
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14,
          }}>
            {[
              {
                sym: '◎', tag: 'Reader I',
                t: 'Absolute beginners',
                sub: 'You\'ve never written code. You came in because someone said you might like this.',
                path: ['Bridge: How p5 Thinks About Time', 'Tool: Coordinate System Explorer', 'Sketch: Bouncing Ball Seed'],
              },
              {
                sym: '⬡', tag: 'Reader II',
                t: 'Educators in classrooms',
                sub: 'You teach. You need lesson plans, station rotations, and prompts you can hand to a student.',
                path: ['Sessions overview', 'Teaching notes for every tool', 'Station kits by suit'],
              },
              {
                sym: '✦', tag: 'Reader III',
                t: 'Self-directed learners',
                sub: 'You know some code. You\'re here for the well-edited library, prompts, and small ideas.',
                path: ['Browse the catalog by suit', 'Concept bridges, one per night', 'Open Studio: pick a project'],
              },
            ].map((r, i) => (
              <article key={i} style={{
                ..._dShared(palette).innerPanel,
                padding: spacious ? 22 : 18,
                display: 'flex', flexDirection: 'column', gap: 10,
              }}>
                <div style={{
                  fontSize: 24, color: palette.accent, lineHeight: 1,
                }}>{r.sym}</div>
                <div style={{
                  fontFamily: '"DM Mono",monospace',
                  fontSize: 10.5, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase',
                  color: palette.muted,
                }}>{r.tag}</div>
                <h3 style={{
                  margin: 0, fontFamily: '"Fraunces",serif', fontWeight: 800,
                  fontSize: 22, letterSpacing: '-0.02em',
                }}>{r.t}</h3>
                <p style={{ margin: 0, fontSize: 13.5, color: palette.muted, lineHeight: 1.55 }}>{r.sub}</p>
                <div style={{
                  marginTop: 6, paddingTop: 12,
                  borderTop: `1px solid ${palette.line}`,
                }}>
                  <div style={{
                    fontFamily: '"DM Mono",monospace',
                    fontSize: 10, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase',
                    color: palette.muted, marginBottom: 8,
                  }}>A path through the catalog</div>
                  <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 6 }}>
                    {r.path.map((p, j) => (
                      <li key={j} style={{
                        display: 'grid', gridTemplateColumns: '24px 1fr', gap: 8,
                        fontSize: 13, alignItems: 'baseline',
                      }}>
                        <span style={{
                          fontFamily: '"DM Mono",monospace',
                          fontSize: 11, color: palette.accent, fontWeight: 700,
                        }}>0{j + 1}</span>
                        <span style={{ fontWeight: 500 }}>{p}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Editions timeline */}
        <section style={{ ...sh.panel, padding: spacious ? 32 : 26, marginBottom: gap }}>
          <DPanelHead
            palette={palette}
            label="Editions"
            title="A catalog grown across cohorts."
            sub="Every cohort tests the tools, edits the bridges, and adds to the library. This is edition three. Edition four begins this spring."
          />
          <div style={{
            marginTop: 22,
            display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12,
          }}>
            {[
              { ed: '0',  term: 'Fall 2024',   cohort: 'Art + Code · Teacher Camp', note: 'Right order: bridge → tool → sketch.' },
              { ed: 'I',  term: 'Spring 2025', cohort: 'Coding Camp · Cohort 1',    note: 'Tools focus on one idea, not six.' },
              { ed: 'II', term: 'Fall 2025',   cohort: 'Coding Camp · Cohort 2',    note: 'The arc matters as much as any one session.' },
              { ed: 'III',term: 'Spring 2026', cohort: 'Coding Camp · Cohort 3',    note: 'In progress — this edition.', current: true },
              { ed: 'IV', term: 'Fall 2026',   cohort: 'Coding Camp · Cohort 4',    note: 'Apply by August.' },
            ].map((row, i) => (
              <div key={i} style={{
                ..._dShared(palette).innerPanel,
                padding: 14,
                background: row.current ? palette.gold_soft : palette.paper,
                transform: row.current ? 'rotate(-0.8deg)' : 'rotate(0)',
              }}>
                <div style={{
                  fontFamily: '"Fraunces",serif', fontWeight: 900,
                  fontSize: 36, lineHeight: 0.9, letterSpacing: '-0.04em',
                  color: palette.accent, marginBottom: 6,
                }}>{row.ed}</div>
                <div style={{
                  fontFamily: '"DM Mono",monospace',
                  fontSize: 10.5, fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase',
                  color: palette.muted, marginBottom: 4,
                }}>{row.term}</div>
                <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 8, lineHeight: 1.25 }}>{row.cohort}</div>
                <div style={{ fontSize: 12, color: palette.muted, lineHeight: 1.45 }}>{row.note}</div>
                {row.current && (
                  <div style={{ marginTop: 10 }}>
                    <span style={dPillStyle(palette, 'type')}>Now</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Colophon + contact */}
        <section style={{
          ...sh.panel, padding: spacious ? 32 : 26, marginBottom: gap,
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 36, alignItems: 'start' }}>
            <div>
              <DPanelHead palette={palette} label="Colophon" title="Edited, set, and shared." />
              <p style={{
                margin: '22px 0 0', maxWidth: '52ch',
                fontSize: spacious ? 17 : 16, lineHeight: 1.65, color: palette.ink,
              }}>
                Edited by <strong>Saber Khan</strong> for <strong>CC Fest</strong>. Set in <em>Fraunces</em>, <em>DM Sans</em>, and <em>DM Mono</em>. Built with the help of LLMs, classroom testing, and learning from <strong>Dan Shiffman, Lauren Lee McCarthy, Casey Reas, Patt Vira, Allison Parrish, Kevin Workman, Tim Rodenbröker</strong>, the <strong>p5.js</strong> and <strong>Processing Foundation</strong> communities, and the many people that have shared their teaching materials. Anything good here is theirs. The mistakes are mine.
              </p>
            </div>
            <aside style={{
              ..._dShared(palette).innerPanel,
              padding: 22, background: palette.gold_soft,
              transform: 'rotate(-.4deg)',
            }}>
              <div style={{
                fontFamily: '"DM Mono",monospace',
                fontSize: 11, fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase',
                color: palette.accent, marginBottom: 14,
              }}>Get in touch</div>
              {[
                ['Site', 'ccfest.rocks'],
                ['Notes', 'Notion · teaching workspace'],
                ['Code', 'github.com/saberkhan372'],
                ['Cohort IV', 'Apply by August 2026'],
                ['License', 'Open · free to remix'],
              ].map((row, i) => (
                <div key={i} style={{
                  display: 'grid', gridTemplateColumns: '100px 1fr',
                  padding: '9px 0',
                  borderTop: i > 0 ? `1px solid rgba(32,28,26,.12)` : 'none',
                  alignItems: 'baseline',
                }}>
                  <span style={{
                    fontFamily: '"DM Mono",monospace',
                    fontSize: 10.5, letterSpacing: '.08em', textTransform: 'uppercase',
                    color: palette.muted, fontWeight: 600,
                  }}>{row[0]}</span>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{row[1]}</span>
                </div>
              ))}
            </aside>
          </div>
        </section>

        <DFooter palette={palette} />
      </div>
    </div>
  );
};

window.DToolPage = DToolPage;
window.DBridgePage = DBridgePage;
window.DSessionsPage = DSessionsPage;
window.DAboutPage = DAboutPage;
