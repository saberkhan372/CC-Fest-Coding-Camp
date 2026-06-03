// Direction B · Catalog — additional page types
// Tool page · Concept Bridge page · Sessions page · About page
// Shares Catalog visual language (Inter Tight + JetBrains Mono, hairlines, ochre accent).

const _bShared = (palette) => ({
  page: {
    width: '100%',
    background: palette.paper,
    color: palette.ink,
    fontFamily: '"Inter Tight","Inter",system-ui,sans-serif',
    fontSize: 14,
    lineHeight: 1.5,
  },
  monoLbl: {
    fontFamily: '"JetBrains Mono",ui-monospace,monospace',
    fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase',
    color: palette.muted,
  },
  tableHd: {
    background: palette.ink, color: palette.paper,
    fontFamily: '"JetBrains Mono",monospace',
    fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase',
  },
});

// ── Topbar (shared across all Catalog pages) ──
const CatalogTopbar = ({ palette, here }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: '120px 1fr auto auto auto auto',
    borderBottom: `1px solid ${palette.ink}`,
    fontFamily: '"JetBrains Mono",ui-monospace,monospace',
    fontSize: 10.5, letterSpacing: '.06em', textTransform: 'uppercase',
    color: palette.ink,
  }}>
    <div style={{ padding: '14px 16px', borderRight: `1px solid ${palette.rule}`, fontWeight: 600 }}>CC/2026</div>
    <div style={{ padding: '14px 16px', borderRight: `1px solid ${palette.rule}` }}>Coding Camp · p5.js catalog</div>
    {['Catalog', 'Sessions', 'Bridges', 'About'].map((label, i) => (
      <div key={label} style={{
        padding: '14px 18px',
        borderRight: i < 3 ? `1px solid ${palette.rule}` : 'none',
        background: label === here ? palette.ink : 'transparent',
        color: label === here ? palette.paper : palette.ink,
      }}>{label}</div>
    ))}
  </div>
);

// ── Footer (shared) ──
const CatalogFooter = ({ palette }) => (
  <footer style={{ borderTop: `1px solid ${palette.ink}` }}>
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      borderBottom: `1px solid ${palette.rule}`,
    }}>
      {[
        { k: 'Site', v: 'ccfest.rocks' },
        { k: 'Notes', v: 'Notion · teaching notes' },
        { k: 'Code', v: 'github.com/saberkhan372' },
        { k: 'Year', v: 'Edition III · 2026' },
      ].map((b, i) => (
        <div key={i} style={{
          padding: '20px 22px',
          borderRight: i < 3 ? `1px solid ${palette.rule}` : 'none',
        }}>
          <div style={{
            fontFamily: '"JetBrains Mono",monospace',
            fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase',
            color: palette.muted, marginBottom: 8,
          }}>{b.k}</div>
          <div style={{ fontWeight: 500, fontSize: 14 }}>{b.v}</div>
        </div>
      ))}
    </div>
    <div style={{
      padding: '14px 22px',
      display: 'flex', justifyContent: 'space-between',
      fontFamily: '"JetBrains Mono",monospace',
      fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase',
      color: palette.muted,
    }}>
      <span>CC Fest · Coding Camp Catalog</span>
      <span>Free. Open. Yours to remix.</span>
    </div>
  </footer>
);

// ── Breadcrumb row ──
const Breadcrumb = ({ palette, crumbs }) => (
  <div style={{
    display: 'flex', alignItems: 'baseline', gap: 14,
    padding: '12px 0',
    borderBottom: `1px solid ${palette.rule}`,
    fontFamily: '"JetBrains Mono",monospace',
    fontSize: 10.5, letterSpacing: '.08em', textTransform: 'uppercase',
    color: palette.muted,
  }}>
    {crumbs.map((c, i) => (
      <React.Fragment key={i}>
        <span style={{ color: i === crumbs.length - 1 ? palette.ink : palette.muted }}>{c}</span>
        {i < crumbs.length - 1 && <span style={{ color: palette.rule }}>→</span>}
      </React.Fragment>
    ))}
  </div>
);

// ─────────────────────────────────────────────────────────────────────
// B · TOOL PAGE — Coordinate System Explorer
// ─────────────────────────────────────────────────────────────────────
const BToolPage = ({ t, C }) => {
  const palette = C;
  const dense = t.density === 'compact';
  const spacious = t.density === 'spacious';
  const pad = dense ? 32 : spacious ? 72 : 52;
  const gap = dense ? 52 : spacious ? 120 : 84;
  const bgStyle = window.bgPatternStyleB(t.bgPattern, palette);

  return (
    <div data-screen-label="B · Tool page" style={{ ...bgStyle, ..._bShared(palette).page }}>
      <CatalogTopbar palette={palette} here="Catalog" />

      <div style={{ padding: `0 ${pad}px` }}>
        <Breadcrumb palette={palette} crumbs={['Catalog', 'Marks · I', 'Coordinate System Explorer']} />
      </div>

      {/* ── Title block ── */}
      <section style={{ padding: `${spacious ? 64 : 48}px ${pad}px ${spacious ? 32 : 24}px` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 56, alignItems: 'end' }}>
          <div>
            <div style={{
              fontFamily: '"JetBrains Mono",monospace',
              fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase',
              color: palette.accent, marginBottom: 16,
            }}>
              № 01 · Workshop tool · ✦ Marks
            </div>
            <h1 style={{
              margin: 0,
              fontFamily: '"Inter Tight",sans-serif',
              fontWeight: 500,
              fontSize: 'clamp(56px, 6.5vw, 88px)',
              lineHeight: 1.02,
              letterSpacing: '-0.04em',
            }}>
              Coordinate System Explorer
            </h1>
            <p style={{
              margin: '24px 0 0', maxWidth: '52ch',
              fontSize: spacious ? 19 : 17, lineHeight: 1.5, color: palette.muted,
            }}>
              Click anywhere on the canvas and see the x/y coordinate. Once you're placing your own points, the grid stops feeling abstract.
            </p>
          </div>

          <div style={{ border: `1px solid ${palette.ink}` }}>
            <div style={{
              padding: '10px 14px', background: palette.ink, color: palette.paper,
              fontFamily: '"JetBrains Mono",monospace',
              fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase',
            }}>Catalog record</div>
            {[
              ['Catalog №', '01 / 66'],
              ['Suit', '✦ Marks · Roman I'],
              ['Session', '01 · Your Canvas, Your Voice'],
              ['Difficulty', 'Beginner · first time with p5'],
              ['Pairs with', 'Shape + Color · Variable Playground'],
              ['Bridge', '◇ How p5 Thinks About Time'],
            ].map((row, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '100px 1fr',
                borderTop: i > 0 ? `1px solid ${palette.rule}` : 'none',
              }}>
                <div style={{
                  padding: '9px 12px',
                  borderRight: `1px solid ${palette.rule}`,
                  fontFamily: '"JetBrains Mono",monospace',
                  fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase',
                  color: palette.muted,
                }}>{row[0]}</div>
                <div style={{ padding: '9px 12px', fontSize: 12.5, fontWeight: 500 }}>{row[1]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sketch canvas + controls ── */}
      <section style={{ padding: `${gap / 2}px ${pad}px`, borderTop: `1px solid ${palette.ink}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 0, border: `1px solid ${palette.ink}` }}>
          {/* Sketch placeholder */}
          <div style={{
            background: palette.paperAlt,
            borderRight: `1px solid ${palette.ink}`,
            position: 'relative',
            minHeight: 540,
          }}>
            <div style={{
              padding: '10px 14px',
              borderBottom: `1px solid ${palette.rule}`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              fontFamily: '"JetBrains Mono",monospace',
              fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase',
              color: palette.muted,
            }}>
              <span>Sketch · 600 × 480</span>
              <span>Live · p5.js</span>
            </div>
            <div style={{ position: 'relative', height: 460, padding: 40 }}>
              <CoordPlaceholder palette={palette} />
              <div style={{
                position: 'absolute', bottom: 18, left: 18,
                fontFamily: '"JetBrains Mono",monospace',
                fontSize: 11, background: palette.ink, color: palette.paper,
                padding: '6px 10px',
              }}>x: 348 &nbsp; y: 207</div>
            </div>
          </div>

          {/* Controls */}
          <div>
            <div style={{
              padding: '10px 14px',
              borderBottom: `1px solid ${palette.ink}`,
              fontFamily: '"JetBrains Mono",monospace',
              fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase',
              background: palette.ink, color: palette.paper,
            }}>Controls</div>
            {[
              { k: 'Grid spacing', v: '40 px', range: 0.45 },
              { k: 'Dot size',     v: '14 px', range: 0.7 },
              { k: 'Label color',  v: palette.accent, swatch: true },
              { k: 'Show origin',  v: 'ON', toggle: true },
              { k: 'Snap to grid', v: 'OFF', toggle: false },
            ].map((r, i) => (
              <div key={i} style={{
                padding: '14px 16px',
                borderBottom: `1px solid ${palette.rule}`,
              }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                  marginBottom: 8,
                }}>
                  <span style={{ fontSize: 12.5, fontWeight: 600 }}>{r.k}</span>
                  <span style={{
                    fontFamily: '"JetBrains Mono",monospace',
                    fontSize: 11, color: r.swatch ? 'transparent' : palette.muted,
                  }}>{!r.swatch && r.v}</span>
                </div>
                {r.range !== undefined && (
                  <div style={{ position: 'relative', height: 6, background: palette.paperAlt }}>
                    <div style={{
                      position: 'absolute', left: 0, top: 0, bottom: 0,
                      width: `${r.range * 100}%`, background: palette.accent,
                    }}></div>
                    <div style={{
                      position: 'absolute', left: `calc(${r.range * 100}% - 7px)`,
                      top: -4, width: 14, height: 14,
                      background: palette.paper, border: `2px solid ${palette.accent}`,
                    }}></div>
                  </div>
                )}
                {r.swatch && (
                  <div style={{
                    display: 'flex', gap: 6, marginTop: 4,
                  }}>
                    {[palette.accent, palette.ink, palette.muted, '#1f5c3f', '#1d5b8e'].map((c, j) => (
                      <div key={j} style={{
                        width: 22, height: 22, background: c,
                        border: c === palette.accent ? `2px solid ${palette.ink}` : `1px solid ${palette.rule}`,
                      }}></div>
                    ))}
                  </div>
                )}
                {r.toggle !== undefined && (
                  <div style={{
                    display: 'inline-flex', border: `1px solid ${palette.ink}`, marginTop: 4,
                  }}>
                    {['OFF', 'ON'].map(opt => (
                      <span key={opt} style={{
                        padding: '4px 12px',
                        fontFamily: '"JetBrains Mono",monospace',
                        fontSize: 10.5, letterSpacing: '.08em',
                        background: opt === r.v ? palette.ink : 'transparent',
                        color: opt === r.v ? palette.paper : palette.ink,
                        borderRight: opt === 'OFF' ? `1px solid ${palette.ink}` : 'none',
                      }}>{opt}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div style={{
              padding: '14px 16px',
              display: 'flex', gap: 8,
            }}>
              <span style={{
                padding: '8px 16px', background: palette.accent, color: palette.paper,
                fontSize: 12, fontWeight: 600, letterSpacing: '-0.005em',
              }}>↗ Open full sketch</span>
              <span style={{
                padding: '8px 16px', background: 'transparent', color: palette.ink,
                border: `1px solid ${palette.ink}`,
                fontSize: 12, fontWeight: 600,
              }}>↓ Download .p5</span>
            </div>
          </div>
        </div>

        {/* Code block under canvas */}
        <div style={{ marginTop: 0, border: `1px solid ${palette.ink}`, borderTop: 'none' }}>
          <div style={{
            display: 'flex', borderBottom: `1px solid ${palette.ink}`,
            background: palette.paperAlt,
          }}>
            {['sketch.js', 'index.html', 'style.css', '— teaching notes'].map((tab, i) => (
              <div key={i} style={{
                padding: '10px 18px',
                borderRight: i < 3 ? `1px solid ${palette.rule}` : 'none',
                background: i === 0 ? palette.paper : 'transparent',
                fontFamily: '"JetBrains Mono",monospace',
                fontSize: 11, letterSpacing: '.04em',
                color: i === 0 ? palette.ink : palette.muted,
                fontWeight: i === 0 ? 600 : 400,
                borderBottom: i === 0 ? `2px solid ${palette.accent}` : 'none',
                marginBottom: i === 0 ? -2 : 0,
              }}>{tab}</div>
            ))}
          </div>
          <pre style={{
            margin: 0, padding: '20px 24px',
            fontFamily: '"JetBrains Mono",monospace',
            fontSize: 13, lineHeight: 1.7,
            background: palette.paper, color: palette.ink,
            overflow: 'auto',
          }}>
{`function setup() {
  createCanvas(600, 480);
  background(${palette.paperAlt === '#efece4' ? '"#efece4"' : '240'});
}

function draw() {
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

      {/* ── Teaching prompts (rhythm) ── */}
      <section style={{ padding: `${gap}px ${pad}px`, borderTop: `1px solid ${palette.ink}` }}>
        <window.CatalogSectionHead palette={palette} num="A" eyebrow="How to use this tool" title="A four-beat rhythm." sub="Repeat this loop with every tool: open it, change one thing, predict, teach." />

        <div style={{ marginTop: 40, border: `1px solid ${palette.ink}` }}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            background: palette.ink, color: palette.paper,
            fontFamily: '"JetBrains Mono",monospace',
            fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase',
          }}>
            {['01 · Open', '02 · Change', '03 · Predict', '04 · Teach'].map((h, i) => (
              <div key={i} style={{
                padding: '10px 16px',
                borderRight: i < 3 ? `1px solid ${palette.paper}` : 'none',
              }}>{h}</div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {[
              ['Play before reading.',  'Open the sketch and click around. Notice what changes when you move the mouse, before reading a single line of code.'],
              ['Move one control.',     'Change one slider — grid spacing — and predict before you let go. Did the picture do what you thought?'],
              ['Say what should happen.', "Before you change a value, say out loud what should happen. Knowing what breaks is knowing how it works."],
              ['Turn it into a prompt.', 'Hand it to a student: change grid spacing to 80, then add a second dot at (300, 240). What questions do they ask first?'],
            ].map((row, i) => (
              <div key={i} style={{
                padding: spacious ? 22 : 18,
                borderRight: i < 3 ? `1px solid ${palette.rule}` : 'none',
              }}>
                <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8, letterSpacing: '-0.015em' }}>{row[0]}</div>
                <div style={{ color: palette.muted, fontSize: 13.5, lineHeight: 1.55 }}>{row[1]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pairs with / Related ── */}
      <section style={{ padding: `${gap}px ${pad}px`, borderTop: `1px solid ${palette.ink}`, background: palette.paperAlt }}>
        <window.CatalogSectionHead palette={palette} num="B" eyebrow="Pairs with" title="What to open next." sub="A few tools and one concept bridge that pair well with this one. Open them in any order." />

        <div style={{
          marginTop: 36,
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          border: `1px solid ${palette.ink}`, background: palette.paper,
        }}>
          {[
            { kind: 'Tool', n: '02', name: 'Shape + Color Explorer', blurb: 'Mix color and shape with a live code preview below.', accent: 'Marks · II' },
            { kind: 'Tool', n: '07', name: 'Animation Explorer', blurb: 'Watch a variable change every frame and become motion.', accent: 'Motion · I' },
            { kind: 'Tool', n: '13', name: 'For Loop Stepper', blurb: 'Step through a loop one iteration at a time.', accent: 'Systems · I' },
            { kind: 'Bridge', n: 'III', name: 'How p5.js Thinks About Time', blurb: 'setup() runs once, draw() runs sixty times a second.', accent: 'Bridge · III' },
          ].map((card, i) => (
            <div key={i} style={{
              padding: spacious ? 24 : 18,
              borderRight: i < 3 ? `1px solid ${palette.rule}` : 'none',
            }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                fontFamily: '"JetBrains Mono",monospace',
                fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase',
                color: palette.muted, marginBottom: 14,
              }}>
                <span>№ {card.n}</span>
                <span style={{ color: palette.accent }}>{card.accent}</span>
              </div>
              <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 6, letterSpacing: '-0.015em' }}>{card.name}</div>
              <div style={{ color: palette.muted, fontSize: 13, lineHeight: 1.5, marginBottom: 14 }}>{card.blurb}</div>
              <div style={{
                fontFamily: '"JetBrains Mono",monospace',
                fontSize: 11, color: palette.accent,
              }}>↗ Open {card.kind}</div>
            </div>
          ))}
        </div>
      </section>

      <CatalogFooter palette={palette} />
    </div>
  );
};

// ── small SVG placeholder for the coord sketch ──
const CoordPlaceholder = ({ palette }) => {
  const W = 520, H = 380;
  const step = 40;
  const lines = [];
  for (let x = 0; x <= W; x += step) lines.push(<line key={'vx' + x} x1={x} y1={0} x2={x} y2={H} stroke={palette.rule} strokeWidth="1" />);
  for (let y = 0; y <= H; y += step) lines.push(<line key={'hy' + y} x1={0} y1={y} x2={W} y2={y} stroke={palette.rule} strokeWidth="1" />);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
      {lines}
      <line x1="0" y1="0" x2={W} y2="0" stroke={palette.ink} strokeWidth="1.5" />
      <line x1="0" y1="0" x2="0" y2={H} stroke={palette.ink} strokeWidth="1.5" />
      <text x="6" y="14" fontFamily="JetBrains Mono, monospace" fontSize="10" fill={palette.muted}>0,0</text>
      <text x={W - 30} y="14" fontFamily="JetBrains Mono, monospace" fontSize="10" fill={palette.muted}>x→</text>
      <text x="4" y={H - 6} fontFamily="JetBrains Mono, monospace" fontSize="10" fill={palette.muted}>y↓</text>
      {/* clicked dots */}
      <circle cx="140" cy="100" r="7" fill={palette.accent} />
      <text x="150" y="98" fontFamily="JetBrains Mono, monospace" fontSize="10" fill={palette.muted}>(140, 100)</text>
      <circle cx="280" cy="220" r="7" fill={palette.accent} />
      <text x="290" y="218" fontFamily="JetBrains Mono, monospace" fontSize="10" fill={palette.muted}>(280, 220)</text>
      <circle cx="400" cy="160" r="7" fill={palette.accent} />
      <text x="410" y="158" fontFamily="JetBrains Mono, monospace" fontSize="10" fill={palette.muted}>(400, 160)</text>
      {/* current mouse */}
      <line x1="348" y1="0" x2="348" y2={H} stroke={palette.ink} strokeWidth="0.5" strokeDasharray="3,3" />
      <line x1="0" y1="207" x2={W} y2="207" stroke={palette.ink} strokeWidth="0.5" strokeDasharray="3,3" />
      <circle cx="348" cy="207" r="9" fill="none" stroke={palette.ink} strokeWidth="1.5" />
    </svg>
  );
};

// ─────────────────────────────────────────────────────────────────────
// B · CONCEPT BRIDGE PAGE — Color: Numbers Become Feeling
// ─────────────────────────────────────────────────────────────────────
const BBridgePage = ({ t, C }) => {
  const palette = C;
  const dense = t.density === 'compact';
  const spacious = t.density === 'spacious';
  const pad = dense ? 32 : spacious ? 72 : 52;
  const gap = dense ? 52 : spacious ? 120 : 84;
  const bgStyle = window.bgPatternStyleB(t.bgPattern, palette);

  return (
    <div data-screen-label="B · Concept bridge" style={{ ...bgStyle, ..._bShared(palette).page }}>
      <CatalogTopbar palette={palette} here="Bridges" />

      <div style={{ padding: `0 ${pad}px` }}>
        <Breadcrumb palette={palette} crumbs={['Catalog', 'Concept bridges', 'I · Color: Numbers Become Feeling']} />
      </div>

      {/* Title block */}
      <section style={{ padding: `${spacious ? 80 : 56}px ${pad}px ${spacious ? 40 : 28}px` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 48, alignItems: 'start' }}>
          <div>
            <div style={{
              fontFamily: '"Inter Tight",sans-serif',
              fontWeight: 500,
              fontSize: 'clamp(120px, 16vw, 220px)',
              lineHeight: 0.85,
              letterSpacing: '-0.06em',
              color: palette.accent,
            }}>I</div>
            <div style={{
              fontFamily: '"JetBrains Mono",monospace',
              fontSize: 10.5, letterSpacing: '.16em', textTransform: 'uppercase',
              color: palette.muted, marginTop: 8,
            }}>Bridge № 01 of 21</div>
          </div>
          <div>
            <div style={{
              fontFamily: '"JetBrains Mono",monospace',
              fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase',
              color: palette.accent, marginBottom: 16,
            }}>◇ Concept bridge · Visual foundations</div>
            <h1 style={{
              margin: 0,
              fontFamily: '"Inter Tight",sans-serif',
              fontWeight: 500,
              fontSize: 'clamp(54px, 6.5vw, 88px)',
              lineHeight: 1.02,
              letterSpacing: '-0.04em',
            }}>
              Color: Numbers<br/>Become Feeling.
            </h1>
            <p style={{
              margin: '24px 0 0', maxWidth: '52ch',
              fontSize: spacious ? 20 : 18, lineHeight: 1.5, color: palette.muted,
            }}>
              A bridge for <code style={codeC(palette)}>fill()</code>, <code style={codeC(palette)}>stroke()</code>, grayscale, RGB, HSB, alpha, and <code style={codeC(palette)}>lerpColor()</code>, so color stops feeling like raw numbers and starts feeling expressive.
            </p>

            {/* Meta strip */}
            <div style={{
              marginTop: 36,
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
              border: `1px solid ${palette.ink}`,
            }}>
              {[
                ['Functions', 'fill() · stroke()'],
                ['Color models', 'RGB · HSB · Alpha'],
                ['Reading time', '8 minutes'],
                ['Open next', '✦ Shape + Color'],
              ].map(([k, v], i) => (
                <div key={i} style={{
                  padding: '12px 14px',
                  borderRight: i < 3 ? `1px solid ${palette.rule}` : 'none',
                }}>
                  <div style={{
                    fontFamily: '"JetBrains Mono",monospace',
                    fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase',
                    color: palette.muted, marginBottom: 4,
                  }}>{k}</div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bridge rhythm (4 beats) */}
      <section style={{ padding: `${gap}px ${pad}px`, borderTop: `1px solid ${palette.ink}` }}>
        <window.CatalogSectionHead palette={palette} num="A" eyebrow="The bridge rhythm" title="Fuzzy idea → see it → connect it → go next." />

        <div style={{
          marginTop: 40, border: `1px solid ${palette.ink}`,
        }}>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            background: palette.ink, color: palette.paper,
            fontFamily: '"JetBrains Mono",monospace',
            fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase',
          }}>
            {['01 · Fuzzy idea', '02 · See it', '03 · Connect it', '04 · Go next'].map((h, i) => (
              <div key={i} style={{
                padding: '10px 16px',
                borderRight: i < 3 ? `1px solid ${palette.paper}` : 'none',
              }}>{h}</div>
            ))}
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            minHeight: 180,
          }}>
            {[
              { kicker: 'I see a color and feel something — how is that just three numbers?', body: 'Color in code feels mechanical. We pick numbers, but we want feelings. The bridge is how those numbers become feelings.' },
              { kicker: 'Drag the sliders. Watch the same number become warmth, calm, alarm.', body: 'A color block updates as you drag R, G, B and a separate H, S, B. Notice when one model "moves with you" and the other doesn\'t.' },
              { kicker: 'Now meet fill(), stroke(), and lerpColor() — same numbers, named places.', body: 'Each slider corresponds to one argument. The code block updates with the canvas; canvas and code stay in sync.' },
              { kicker: 'Open Shape + Color, RGB / HSB Color Lab, or remix a Postcard.', body: 'A bridge ends by handing you off to a workshop tool or starter sketch where you can practice the idea immediately.' },
            ].map((step, i) => (
              <div key={i} style={{
                padding: spacious ? 22 : 18,
                borderRight: i < 3 ? `1px solid ${palette.rule}` : 'none',
                display: 'flex', flexDirection: 'column', gap: 12,
              }}>
                <div style={{ fontSize: 15.5, fontWeight: 600, letterSpacing: '-0.015em', lineHeight: 1.3 }}>
                  “{step.kicker}”
                </div>
                <div style={{ color: palette.muted, fontSize: 13.5, lineHeight: 1.55 }}>{step.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive demo + code */}
      <section style={{ padding: `${gap}px ${pad}px`, borderTop: `1px solid ${palette.ink}`, background: palette.paperAlt }}>
        <window.CatalogSectionHead palette={palette} num="B" eyebrow="The visual model" title="Three numbers become a feeling." sub="Drag a slider. The block changes. The code beneath changes. Eventually the slider and the code feel like the same thing." />

        <div style={{
          marginTop: 40,
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0,
          border: `1px solid ${palette.ink}`, background: palette.paper,
        }}>
          {/* Color blocks */}
          <div style={{ borderRight: `1px solid ${palette.ink}`, padding: 32 }}>
            <div style={{
              fontFamily: '"JetBrains Mono",monospace',
              fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase',
              color: palette.muted, marginBottom: 18,
            }}>The block</div>
            <div style={{
              height: 240, background: palette.accent,
              border: `1px solid ${palette.ink}`,
              position: 'relative',
              marginBottom: 18,
            }}>
              <div style={{
                position: 'absolute', bottom: 10, left: 10,
                fontFamily: '"JetBrains Mono",monospace',
                fontSize: 11, color: palette.paper,
                background: 'rgba(0,0,0,.35)', padding: '4px 8px',
              }}>fill(184, 101, 40)</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
              {['#b46528', '#c97824', '#deb84a', '#7a8e4a', '#3b6a7b'].map((c, i) => (
                <div key={i} style={{ aspectRatio: '1', background: c, border: `1px solid ${palette.ink}` }}></div>
              ))}
            </div>
            <div style={{ marginTop: 18, fontSize: 13, color: palette.muted, fontStyle: 'italic' }}>
              A palette interpolated with <code style={codeC(palette)}>lerpColor(a, b, t)</code>.
            </div>
          </div>

          {/* Slider trio */}
          <div style={{ padding: 32 }}>
            <div style={{
              fontFamily: '"JetBrains Mono",monospace',
              fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase',
              color: palette.muted, marginBottom: 18,
            }}>The numbers</div>
            {[
              { lbl: 'R', val: '184', range: 0.72 },
              { lbl: 'G', val: '101', range: 0.40 },
              { lbl: 'B', val: '040', range: 0.16 },
              { lbl: 'A', val: '255', range: 1.00 },
            ].map((s, i) => (
              <div key={i} style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                  <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 14, fontWeight: 600, color: palette.accent }}>{s.lbl}</span>
                  <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 12, color: palette.muted }}>{s.val} / 255</span>
                </div>
                <div style={{ position: 'relative', height: 8, background: palette.paperAlt }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${s.range * 100}%`, background: palette.accent }}></div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 24, paddingTop: 16, borderTop: `1px solid ${palette.rule}` }}>
              <div style={{
                fontFamily: '"JetBrains Mono",monospace',
                fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase',
                color: palette.muted, marginBottom: 8,
              }}>Same color, different model</div>
              <div style={{ display: 'inline-flex', border: `1px solid ${palette.ink}` }}>
                {['RGB', 'HSB'].map((m, i) => (
                  <span key={m} style={{
                    padding: '5px 14px',
                    fontFamily: '"JetBrains Mono",monospace',
                    fontSize: 11, letterSpacing: '.06em',
                    background: i === 0 ? palette.ink : 'transparent',
                    color: i === 0 ? palette.paper : palette.ink,
                    borderRight: i === 0 ? `1px solid ${palette.ink}` : 'none',
                  }}>{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Code */}
        <div style={{ marginTop: 0, border: `1px solid ${palette.ink}`, borderTop: 'none' }}>
          <pre style={{
            margin: 0, padding: '20px 24px',
            fontFamily: '"JetBrains Mono",monospace',
            fontSize: 13, lineHeight: 1.7,
            background: palette.paper, color: palette.ink,
          }}>
{`// The bridge: three numbers, one feeling.
let r = 184;
let g = 101;
let b = 40;

fill(r, g, b);                   // ← drag the sliders above
rect(120, 120, 360, 240);

// One color crossfading into another:
let c1 = color(184, 101, 40);    // warm ochre
let c2 = color(63, 105, 122);    // cool slate
fill(lerpColor(c1, c2, 0.35));   // ← what does 0.35 feel like?`}
          </pre>
        </div>
      </section>

      {/* Body paragraphs */}
      <section style={{ padding: `${gap}px ${pad}px`, borderTop: `1px solid ${palette.ink}` }}>
        <window.CatalogSectionHead palette={palette} num="C" eyebrow="Why this is a bridge" title="Color is the first place numbers feel something." />

        <div style={{
          marginTop: 40, maxWidth: 1000, margin: '40px auto 0',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56,
        }}>
          <p style={{ margin: 0, fontSize: spacious ? 17.5 : 16, lineHeight: 1.65, color: palette.ink }}>
            For most people, color isn't a number — it's a memory. A warm October light. A bright cold morning. A sweater someone once wore. When students first see <code style={codeC(palette)}>fill(184, 101, 40)</code>, the code feels arbitrary. The work of the bridge is to <em>make the connection short</em>: this number raises this slider, this slider raises this feeling.
          </p>
          <p style={{ margin: 0, fontSize: spacious ? 17.5 : 16, lineHeight: 1.65, color: palette.muted }}>
            Once that short loop closes — drag, feel, name — the gap between syntax and intent is gone. Students stop asking <em>what number do I write?</em> and start asking <em>what feeling do I want?</em> That move is what every concept bridge is for, and color is usually the easiest place to make it.
          </p>
        </div>
      </section>

      {/* Go next */}
      <section style={{ padding: `${gap}px ${pad}px`, borderTop: `1px solid ${palette.ink}`, background: palette.paperAlt }}>
        <window.CatalogSectionHead palette={palette} num="D" eyebrow="Go next" title="Pick a tool, open a sketch, or read the next bridge." />

        <div style={{
          marginTop: 36,
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
          border: `1px solid ${palette.ink}`, background: palette.paper,
        }}>
          {[
            { kind: 'Tool', n: '03', name: 'Shape + Color Explorer', blurb: 'Mix color and shape controls live, with code below.' },
            { kind: 'Tool', n: '04', name: 'RGB / HSB Color Lab', blurb: 'Switch models. Feel how each thinks about color.' },
            { kind: 'Bridge', n: 'II', name: 'Triangle → Circle → Wave', blurb: 'From right triangles to sine and cosine waves.' },
          ].map((card, i) => (
            <div key={i} style={{
              padding: spacious ? 24 : 18,
              borderRight: i < 2 ? `1px solid ${palette.rule}` : 'none',
            }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                fontFamily: '"JetBrains Mono",monospace',
                fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase',
                color: palette.muted, marginBottom: 14,
              }}>
                <span>№ {card.n}</span>
                <span style={{ color: palette.accent }}>{card.kind}</span>
              </div>
              <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 6, letterSpacing: '-0.015em' }}>{card.name}</div>
              <div style={{ color: palette.muted, fontSize: 13.5, lineHeight: 1.5, marginBottom: 14 }}>{card.blurb}</div>
              <div style={{
                fontFamily: '"JetBrains Mono",monospace',
                fontSize: 11, color: palette.accent,
              }}>↗ Open</div>
            </div>
          ))}
        </div>
      </section>

      <CatalogFooter palette={palette} />
    </div>
  );
};

const codeC = (palette) => ({
  fontFamily: '"JetBrains Mono",monospace',
  fontSize: '0.92em',
  background: palette.paperAlt,
  padding: '1px 6px',
  border: `1px solid ${palette.rule}`,
  color: palette.ink,
});

// ─────────────────────────────────────────────────────────────────────
// B · SESSIONS PAGE
// ─────────────────────────────────────────────────────────────────────
const BSessionsPage = ({ t, C }) => {
  const c = window.CC_CONTENT;
  const palette = C;
  const dense = t.density === 'compact';
  const spacious = t.density === 'spacious';
  const pad = dense ? 32 : spacious ? 72 : 52;
  const gap = dense ? 52 : spacious ? 120 : 84;
  const bgStyle = window.bgPatternStyleB(t.bgPattern, palette);

  return (
    <div data-screen-label="B · Sessions" style={{ ...bgStyle, ..._bShared(palette).page }}>
      <CatalogTopbar palette={palette} here="Sessions" />

      <div style={{ padding: `0 ${pad}px` }}>
        <Breadcrumb palette={palette} crumbs={['Catalog', 'The Camp Arc', 'Sessions']} />
      </div>

      {/* Hero */}
      <header style={{ padding: `${spacious ? 80 : 56}px ${pad}px ${spacious ? 40 : 28}px` }}>
        <div style={{
          fontFamily: '"JetBrains Mono",monospace',
          fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase',
          color: palette.accent, marginBottom: 16,
        }}>The Arc · Five sessions over five weeks</div>
        <h1 style={{
          margin: 0,
          fontFamily: '"Inter Tight",sans-serif',
          fontWeight: 500,
          fontSize: 'clamp(68px, 8.5vw, 112px)',
          lineHeight: 1.0,
          letterSpacing: '-0.045em',
        }}>
          From first marks to <span style={{ color: palette.accent }}>open studio.</span>
        </h1>
        <p style={{
          margin: '32px 0 0', maxWidth: '60ch',
          fontSize: spacious ? 19 : 17, lineHeight: 1.5, color: palette.muted,
        }}>
          One arc. Five sessions. Each builds upon the last. Every tool and sketch also stands alone — jump in anywhere. The arc is a suggestion; the catalog is the ground truth.
        </p>
      </header>

      {/* Roadmap strip */}
      <section style={{ padding: `${gap / 2}px ${pad}px`, borderTop: `1px solid ${palette.ink}`, borderBottom: `1px solid ${palette.ink}` }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 0,
        }}>
          {c.sessions.map((s, i) => (
            <div key={i} style={{
              padding: '18px 16px',
              borderRight: i < 4 ? `1px solid ${palette.rule}` : 'none',
              position: 'relative',
            }}>
              {/* dot + connector */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14,
              }}>
                <div style={{
                  width: 14, height: 14, borderRadius: 999,
                  background: palette.accent, border: `2px solid ${palette.ink}`,
                  position: 'relative', zIndex: 2,
                }}></div>
                <div style={{ flex: 1, height: 2, background: palette.ink }}></div>
              </div>
              <div style={{
                fontFamily: '"JetBrains Mono",monospace',
                fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase',
                color: palette.muted, marginBottom: 6,
              }}>Week 0{i + 1}</div>
              <div style={{ fontWeight: 600, fontSize: 14.5, letterSpacing: '-0.015em', lineHeight: 1.25 }}>{s.title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Each session as a deep card */}
      {c.sessions.map((s, i) => (
        <section key={i} style={{
          padding: `${gap}px ${pad}px`,
          borderTop: i > 0 ? `1px solid ${palette.ink}` : 'none',
          background: i % 2 === 1 ? palette.paperAlt : palette.paper,
        }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '200px 1fr', gap: 56, alignItems: 'start',
          }}>
            {/* huge number */}
            <div>
              <div style={{
                fontFamily: '"Inter Tight",sans-serif',
                fontWeight: 500,
                fontSize: 'clamp(120px, 14vw, 180px)',
                lineHeight: 0.85,
                letterSpacing: '-0.06em',
                color: palette.accent,
              }}>{s.n}</div>
              <div style={{
                fontFamily: '"JetBrains Mono",monospace',
                fontSize: 10.5, letterSpacing: '.16em', textTransform: 'uppercase',
                color: palette.muted, marginTop: 10,
              }}>Session of five</div>
            </div>

            <div>
              <h2 style={{
                margin: 0,
                fontFamily: '"Inter Tight",sans-serif',
                fontWeight: 500,
                fontSize: 'clamp(36px, 4.5vw, 56px)',
                lineHeight: 1.05,
                letterSpacing: '-0.035em',
              }}>{s.title}</h2>
              <p style={{
                margin: '14px 0 0', maxWidth: '52ch',
                fontSize: spacious ? 19 : 17, color: palette.muted,
              }}>{s.blurb}</p>

              {/* learning goals + tools + bridge as tabular block */}
              <div style={{
                marginTop: 36, border: `1px solid ${palette.ink}`,
                display: 'grid', gridTemplateColumns: '1fr 1fr',
              }}>
                <div style={{ borderRight: `1px solid ${palette.ink}` }}>
                  <div style={{
                    padding: '10px 16px', background: palette.ink, color: palette.paper,
                    fontFamily: '"JetBrains Mono",monospace',
                    fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase',
                  }}>Learning goals</div>
                  <ul style={{ margin: 0, padding: '14px 16px 14px 32px' }}>
                    {goalsFor(i).map((g, j) => (
                      <li key={j} style={{
                        fontSize: 14, marginBottom: 6, lineHeight: 1.45,
                      }}>{g}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div style={{
                    padding: '10px 16px', background: palette.ink, color: palette.paper,
                    fontFamily: '"JetBrains Mono",monospace',
                    fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase',
                  }}>Stations · {s.tools.length} tools</div>
                  <div style={{ padding: '14px 16px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {s.tools.map((tool, j) => (
                      <span key={j} style={{
                        padding: '5px 10px',
                        border: `1px solid ${palette.rule}`,
                        fontFamily: '"JetBrains Mono",monospace',
                        fontSize: 11, color: palette.ink,
                      }}>{tool}</span>
                    ))}
                  </div>
                </div>

                <div style={{
                  gridColumn: '1 / -1',
                  borderTop: `1px solid ${palette.rule}`,
                  padding: '14px 16px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: palette.paper,
                }}>
                  <div>
                    <span style={{
                      fontFamily: '"JetBrains Mono",monospace',
                      fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase',
                      color: palette.accent, marginRight: 12,
                    }}>◇ Concept bridge</span>
                    <span style={{ fontWeight: 500, fontSize: 15 }}>{s.bridge}</span>
                  </div>
                  <div style={{
                    fontFamily: '"JetBrains Mono",monospace',
                    fontSize: 11, color: palette.accent,
                  }}>↗ Open session {s.n}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <CatalogFooter palette={palette} />
    </div>
  );
};

const goalsFor = (i) => ([
  ['Place a first mark with confidence.', 'Read x/y as the language of canvas.', 'Pick a color that means something to you.', 'Compose a small drawing from primitives.'],
  ['See variables change frame by frame.', 'Use map() and lerp() as translators.', 'Listen to mouse and keyboard.', 'Predict before you change a number.'],
  ['Repeat with loops, branch with conditionals.', 'Compose your own functions.', 'Feel the difference between random() and noise().', 'Read a system as much as a sketch.'],
  ['Move from numbers to story.', 'Load CSV and JSON into the canvas.', 'Pick a chart that says one thing well.', 'Argue with your own dataset.'],
  ['Choose a small piece to finish.', 'Share unfinished work with care.', 'Teach the thing you just learned.', 'Reflect on the arc, not the artifact.'],
][i]);

// ─────────────────────────────────────────────────────────────────────
// B · ABOUT PAGE
// ─────────────────────────────────────────────────────────────────────
const BAboutPage = ({ t, C }) => {
  const c = window.CC_CONTENT;
  const palette = C;
  const dense = t.density === 'compact';
  const spacious = t.density === 'spacious';
  const pad = dense ? 32 : spacious ? 72 : 52;
  const gap = dense ? 52 : spacious ? 120 : 84;
  const bgStyle = window.bgPatternStyleB(t.bgPattern, palette);

  return (
    <div data-screen-label="B · About" style={{ ...bgStyle, ..._bShared(palette).page }}>
      <CatalogTopbar palette={palette} here="About" />

      <div style={{ padding: `0 ${pad}px` }}>
        <Breadcrumb palette={palette} crumbs={['Catalog', 'About']} />
      </div>

      {/* Hero */}
      <header style={{ padding: `${spacious ? 88 : 64}px ${pad}px ${spacious ? 48 : 32}px` }}>
        <div style={{
          fontFamily: '"JetBrains Mono",monospace',
          fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase',
          color: palette.accent, marginBottom: 18,
        }}>About this catalog</div>
        <h1 style={{
          margin: 0,
          fontFamily: '"Inter Tight",sans-serif',
          fontWeight: 500,
          fontSize: 'clamp(72px, 9vw, 124px)',
          lineHeight: 1.0,
          letterSpacing: '-0.045em',
          maxWidth: '14ch',
        }}>
          A small, slow,<br/>
          <span style={{ color: palette.accent }}>open library</span><br/>
          for creative code.
        </h1>

        <div style={{
          marginTop: 56,
          display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 64, alignItems: 'start',
        }}>
          <p style={{
            margin: 0, fontSize: spacious ? 21 : 19, lineHeight: 1.55, color: palette.ink,
            maxWidth: '46ch',
          }}>
            CC Fest Coding Camp is a free workshop for creative coding. <span style={{ color: palette.muted }}>Open to anyone curious about creative code — you don't need to be a programmer to start. It's a small library of bridges, tools, and sketches we build together, edition after edition.</span>
          </p>
          <div style={{
            border: `1px solid ${palette.ink}`, padding: 22, background: palette.paperAlt,
          }}>
            <div style={{
              fontFamily: '"JetBrains Mono",monospace',
              fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase',
              color: palette.muted, marginBottom: 12,
            }}>What this is</div>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.55 }}>
              <strong>21 concept bridges</strong>, <strong>66 workshop tools</strong>, and <strong>44 starter sketches</strong>, gathered into five sessions, edited by Saber Khan for CC Fest. Free, openly licensed, very much yours to remix.
            </p>
          </div>
        </div>
      </header>

      {/* Manifesto */}
      <section style={{ padding: `${gap}px ${pad}px`, borderTop: `1px solid ${palette.ink}` }}>
        <window.CatalogSectionHead palette={palette} num="A" eyebrow="What we believe" title="Four small rules for the curious." />

        <ol style={{
          margin: '40px 0 0', padding: 0, listStyle: 'none',
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
          border: `1px solid ${palette.ink}`,
        }}>
          {c.manifesto.map((m, i) => (
            <li key={i} style={{
              padding: spacious ? '36px 28px' : '28px 22px',
              borderRight: i % 2 === 0 ? `1px solid ${palette.rule}` : 'none',
              borderBottom: i < 2 ? `1px solid ${palette.rule}` : 'none',
              display: 'grid', gridTemplateColumns: '60px 1fr', gap: 18, alignItems: 'baseline',
            }}>
              <span style={{
                fontFamily: '"Inter Tight",sans-serif',
                fontWeight: 500, fontSize: 42, lineHeight: 1,
                letterSpacing: '-0.04em', color: palette.accent,
              }}>0{i+1}</span>
              <span style={{
                fontSize: spacious ? 22 : 19, fontWeight: 500,
                letterSpacing: '-0.02em', lineHeight: 1.3,
              }}>{m}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Who this is for */}
      <section style={{ padding: `${gap}px ${pad}px`, borderTop: `1px solid ${palette.ink}`, background: palette.paperAlt }}>
        <window.CatalogSectionHead palette={palette} num="B" eyebrow="Who this is for" title="Three readers. One catalog." sub="The library is sequenced for first-timers, but the same shelf serves educators and self-directed learners just as well." />

        <div style={{
          marginTop: 36,
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          border: `1px solid ${palette.ink}`, background: palette.paper,
        }}>
          {[
            {
              k: 'Reader I',
              t: 'Absolute beginners',
              sub: 'You\'ve never written code. You came in because someone said you might like this.',
              path: ['Bridge: How p5 Thinks About Time', 'Tool: Coordinate System Explorer', 'Sketch: Bouncing Ball Seed'],
            },
            {
              k: 'Reader II',
              t: 'Educators in classrooms',
              sub: 'You teach. You need lesson plans, station rotations, and prompts you can hand to a student.',
              path: ['Sessions overview', 'Teaching notes for every tool', 'Station kits: Marks, Motion, Systems'],
            },
            {
              k: 'Reader III',
              t: 'Self-directed learners',
              sub: 'You know some code. You\'re here for the well-edited library, the prompts, and the small ideas.',
              path: ['Browse the catalog by suit', 'Concept bridges, one per night', 'Open Studio: pick a project'],
            },
          ].map((r, i) => (
            <div key={i} style={{
              padding: spacious ? 28 : 22,
              borderRight: i < 2 ? `1px solid ${palette.rule}` : 'none',
            }}>
              <div style={{
                fontFamily: '"JetBrains Mono",monospace',
                fontSize: 10.5, letterSpacing: '.16em', textTransform: 'uppercase',
                color: palette.accent, marginBottom: 12,
              }}>{r.k}</div>
              <div style={{ fontWeight: 600, fontSize: 22, marginBottom: 10, letterSpacing: '-0.02em' }}>{r.t}</div>
              <div style={{ color: palette.muted, fontSize: 14, lineHeight: 1.55, marginBottom: 20 }}>{r.sub}</div>

              <div style={{
                fontFamily: '"JetBrains Mono",monospace',
                fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase',
                color: palette.muted, marginBottom: 8,
              }}>A path through the catalog</div>
              <ol style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {r.path.map((p, j) => (
                  <li key={j} style={{
                    padding: '8px 0',
                    borderTop: `1px dotted ${palette.rule}`,
                    display: 'grid', gridTemplateColumns: '28px 1fr', gap: 8,
                    alignItems: 'baseline',
                  }}>
                    <span style={{
                      fontFamily: '"JetBrains Mono",monospace',
                      fontSize: 11, color: palette.accent,
                    }}>0{j+1}</span>
                    <span style={{ fontSize: 13.5, fontWeight: 500 }}>{p}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {/* Editions / timeline */}
      <section style={{ padding: `${gap}px ${pad}px`, borderTop: `1px solid ${palette.ink}` }}>
        <window.CatalogSectionHead palette={palette} num="C" eyebrow="Editions" title="A catalog grown across cohorts." sub="Every cohort tests the tools, edits the bridges, and adds to the library. This is edition three. Edition four begins this spring." />

        <div style={{ marginTop: 40, border: `1px solid ${palette.ink}` }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '120px 1fr 1fr 1fr',
            background: palette.ink, color: palette.paper,
            fontFamily: '"JetBrains Mono",monospace',
            fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase',
          }}>
            {['Edition', 'Term', 'Cohort', 'What we learned'].map((h, i) => (
              <div key={i} style={{
                padding: '10px 16px',
                borderRight: i < 3 ? `1px solid ${palette.paper}` : 'none',
              }}>{h}</div>
            ))}
          </div>
          {[
            ['00', 'Fall 2024', 'Art + Code · Teacher Camp', 'The right order is bridge → tool → sketch.'],
            ['I',  'Spring 2025', 'Coding Camp · Cohort 1', 'Tools should focus on one idea, not six.'],
            ['II', 'Fall 2025', 'Coding Camp · Cohort 2', 'The arc matters as much as any one session.'],
            ['III', 'Spring 2026', 'Coding Camp · Cohort 3 — now', '(in progress — this edition)'],
            ['IV', 'Fall 2026', 'Coding Camp · Cohort 4', 'TBD. Apply by August.'],
          ].map((row, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '120px 1fr 1fr 1fr',
              borderTop: i > 0 ? `1px solid ${palette.rule}` : 'none',
              background: i === 3 ? palette.paperAlt : 'transparent',
            }}>
              <div style={{
                padding: '16px',
                borderRight: `1px solid ${palette.rule}`,
                fontFamily: '"Inter Tight",sans-serif',
                fontWeight: 500, fontSize: 24, lineHeight: 1, letterSpacing: '-0.03em',
                color: palette.accent,
              }}>{row[0]}</div>
              <div style={{ padding: '20px 16px', borderRight: `1px solid ${palette.rule}`, fontSize: 14, fontWeight: 500 }}>{row[1]}</div>
              <div style={{ padding: '20px 16px', borderRight: `1px solid ${palette.rule}`, fontSize: 14 }}>{row[2]}</div>
              <div style={{ padding: '20px 16px', fontSize: 14, color: palette.muted, fontStyle: i === 3 ? 'italic' : 'normal' }}>{row[3]}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Colophon + contact */}
      <section style={{ padding: `${gap}px ${pad}px`, borderTop: `1px solid ${palette.ink}`, background: palette.paperAlt }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start',
        }}>
          <div>
            <window.CatalogSectionHead palette={palette} num="D" eyebrow="Colophon" title="Edited, set, and shared." />
            <p style={{
              margin: '32px 0 0', maxWidth: '52ch',
              fontSize: spacious ? 17.5 : 16, lineHeight: 1.65, color: palette.ink,
            }}>
              Edited by <strong>Saber Khan</strong> for <strong>CC Fest</strong>. Set in <em>Inter Tight</em> and <em>JetBrains Mono</em>. Built with the help of LLMs, classroom testing, and learning from <strong>Dan Shiffman, Lauren Lee McCarthy, Casey Reas, Patt Vira, Allison Parrish, Kevin Workman, Tim Rodenbröker</strong>, the <strong>p5.js</strong> and <strong>Processing Foundation</strong> communities, and the many people that have shared their teaching materials. Anything good here is theirs. The mistakes are mine.
            </p>
          </div>
          <div style={{
            border: `1px solid ${palette.ink}`, padding: 24, background: palette.paper,
          }}>
            <div style={{
              fontFamily: '"JetBrains Mono",monospace',
              fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase',
              color: palette.muted, marginBottom: 16,
            }}>Get in touch</div>
            {[
              ['Site', 'ccfest.rocks'],
              ['Notes', 'Notion · teaching workspace'],
              ['Code', 'github.com/saberkhan372/CC-Fest-Coding-Camp'],
              ['Cohort IV', 'Apply by August 2026'],
              ['License', 'Open · free to remix'],
            ].map((row, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '120px 1fr',
                padding: '12px 0',
                borderTop: i > 0 ? `1px solid ${palette.rule}` : 'none',
                alignItems: 'baseline',
              }}>
                <span style={{
                  fontFamily: '"JetBrains Mono",monospace',
                  fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase',
                  color: palette.muted,
                }}>{row[0]}</span>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{row[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CatalogFooter palette={palette} />
    </div>
  );
};

window.BToolPage = BToolPage;
window.BBridgePage = BBridgePage;
window.BSessionsPage = BSessionsPage;
window.BAboutPage = BAboutPage;
