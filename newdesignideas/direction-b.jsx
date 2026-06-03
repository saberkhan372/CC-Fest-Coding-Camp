// Direction B — "Catalog"
// Swiss tabular. Inter Tight + JetBrains Mono. Pristine. Black + one accent (ochre by default).
// Rows, hairline rules, big numerals. Designed to feel like a museum object label or library catalog.

const DirectionB = ({ t, C }) => {
  const c = window.CC_CONTENT;
  const palette = C;
  const dense = t.density === 'compact';
  const spacious = t.density === 'spacious';

  const pad = dense ? 32 : spacious ? 72 : 52;
  const gap = dense ? 52 : spacious ? 120 : 84;

  const filterUI = t.filterUI;
  const layout = t.layout;
  const bgStyle = bgPatternStyleB(t.bgPattern, palette);

  // suit map
  const suitMap = Object.fromEntries(c.suits.map(s => [s.id, s]));

  return (
    <div
      data-screen-label="B · Catalog"
      style={{
        width: '100%',
        background: palette.paper,
        color: palette.ink,
        fontFamily: '"Inter Tight","Inter",system-ui,sans-serif',
        fontSize: dense ? 13 : spacious ? 15.5 : 14,
        lineHeight: 1.5,
        ...bgStyle,
      }}
    >
      {/* HAIRLINE TOPBAR */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '120px 1fr 1fr 1fr 120px',
        borderBottom: `1px solid ${palette.ink}`,
        fontFamily: '"JetBrains Mono",ui-monospace,monospace',
        fontSize: 10.5, letterSpacing: '.06em', textTransform: 'uppercase',
        color: palette.ink,
      }}>
        <div style={{ padding: '14px 16px', borderRight: `1px solid ${palette.rule}` }}>CC/{c.year}</div>
        <div style={{ padding: '14px 16px', borderRight: `1px solid ${palette.rule}` }}>Coding Camp</div>
        <div style={{ padding: '14px 16px', borderRight: `1px solid ${palette.rule}` }}>p5.js teaching catalog</div>
        <div style={{ padding: '14px 16px', borderRight: `1px solid ${palette.rule}` }}>Edition III · Spring</div>
        <div style={{ padding: '14px 16px', textAlign: 'right' }}>Free</div>
      </div>

      {/* MASTHEAD */}
      <header style={{ padding: `${spacious ? 80 : 56}px ${pad}px ${spacious ? 40 : 32}px` }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 0,
          borderBottom: `1px solid ${palette.rule}`, paddingBottom: 18, marginBottom: 32,
        }}>
          <Meta palette={palette} k="Catalog" v="Teaching tools" />
          <Meta palette={palette} k="Audience" v="Anyone curious" />
          <Meta palette={palette} k="Format" v="Web · self-paced" />
          <Meta palette={palette} k="License" v="Open, remix" />
        </div>

        <h1 style={{
          margin: 0,
          fontFamily: '"Inter Tight",sans-serif',
          fontWeight: 500,
          fontSize: 'clamp(68px, 8.5vw, 112px)',
          lineHeight: 1.0,
          letterSpacing: '-0.045em',
        }}>
          Creative<br/>
          coding,<br/>
          <span style={{ color: palette.accent }}>cataloged.</span>
        </h1>

        <div style={{
          marginTop: 48,
          display: 'grid',
          gridTemplateColumns: '1fr 320px',
          gap: 56,
          alignItems: 'start',
        }}>
          <p style={{
            margin: 0,
            fontSize: spacious ? 20 : 18,
            lineHeight: 1.45,
            color: palette.ink,
            maxWidth: '38ch',
            fontWeight: 400,
          }}>
            A free workshop for creative coding, open to anyone curious. <span style={{ color: palette.muted }}>21 concept bridges, 66 workshop tools, 44 starter sketches. Five sessions, one arc, from first marks to open studio.</span>
          </p>

          <div style={{
            border: `1px solid ${palette.ink}`,
            background: palette.paperAlt,
          }}>
            <div style={{
              padding: '10px 14px',
              borderBottom: `1px solid ${palette.ink}`,
              fontFamily: '"JetBrains Mono",monospace',
              fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase',
              background: palette.ink, color: palette.paper,
            }}>How to use this catalog</div>
            <ol style={{ margin: 0, padding: 0, listStyle: 'none' }}>
              {c.rhythm.map((r, i) => (
                <li key={i} style={{
                  display: 'grid', gridTemplateColumns: '38px 80px 1fr', gap: 8,
                  padding: '9px 14px',
                  borderBottom: i < c.rhythm.length - 1 ? `1px solid ${palette.rule}` : 'none',
                  alignItems: 'baseline',
                }}>
                  <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 11, color: palette.muted }}>0{i+1}</span>
                  <span style={{ fontWeight: 600 }}>{r.k}</span>
                  <span style={{ color: palette.muted, fontSize: 12.5 }}>{r.v}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Stats table */}
        <div style={{
          marginTop: 56,
          border: `1px solid ${palette.ink}`,
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            background: palette.ink, color: palette.paper,
            fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase',
          }}>
            {c.stats.map((s, i) => (
              <div key={i} style={{
                padding: '10px 18px',
                borderRight: i < c.stats.length - 1 ? `1px solid ${palette.paper}` : 'none',
              }}>{s.label}</div>
            ))}
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
          }}>
            {c.stats.map((s, i) => (
              <div key={i} style={{
                padding: '22px 18px',
                borderRight: i < c.stats.length - 1 ? `1px solid ${palette.rule}` : 'none',
              }}>
                <div style={{
                  fontFamily: '"Inter Tight",sans-serif',
                  fontWeight: 500,
                  fontSize: 72,
                  lineHeight: 0.9,
                  letterSpacing: '-0.05em',
                  color: palette.accent,
                  fontFeatureSettings: '"tnum"',
                }}>{s.n}</div>
                <div style={{
                  marginTop: 12, fontSize: 12.5, color: palette.muted, maxWidth: '20ch',
                }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* CAMP ARC */}
      <section style={{ padding: `${gap}px ${pad}px`, borderTop: `1px solid ${palette.ink}` }}>
        <CatalogSectionHead palette={palette} num="A" eyebrow="The arc" title="Five sessions." sub="The arc moves from first marks to open studio. Jump in anywhere; every tool stands alone." />

        <div style={{ marginTop: 48, border: `1px solid ${palette.ink}` }}>
          {/* Table header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '60px 1fr 1.4fr 2fr 1.4fr',
            background: palette.ink, color: palette.paper,
            fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase',
          }}>
            {['№', 'Session', 'Focus', 'Stations', 'Bridge'].map((h, i) => (
              <div key={i} style={{
                padding: '10px 16px',
                borderRight: i < 4 ? `1px solid ${palette.paper}` : 'none',
              }}>{h}</div>
            ))}
          </div>
          {c.sessions.map((s, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '60px 1fr 1.4fr 2fr 1.4fr',
              borderTop: i > 0 ? `1px solid ${palette.rule}` : 'none',
            }}>
              <div style={{
                padding: `${spacious ? 26 : 18}px 16px`,
                borderRight: `1px solid ${palette.rule}`,
                fontFamily: '"Inter Tight",sans-serif',
                fontWeight: 500,
                fontSize: 32,
                lineHeight: 1,
                letterSpacing: '-0.04em',
                color: palette.accent,
              }}>{s.n}</div>
              <div style={{
                padding: `${spacious ? 26 : 18}px 16px`,
                borderRight: `1px solid ${palette.rule}`,
              }}>
                <div style={{ fontWeight: 600, fontSize: 16, letterSpacing: '-0.015em' }}>{s.title}</div>
              </div>
              <div style={{
                padding: `${spacious ? 26 : 18}px 16px`,
                borderRight: `1px solid ${palette.rule}`,
                color: palette.muted, fontSize: 13.5,
              }}>{s.blurb}</div>
              <div style={{
                padding: `${spacious ? 26 : 18}px 16px`,
                borderRight: `1px solid ${palette.rule}`,
                fontFamily: '"JetBrains Mono",monospace', fontSize: 12,
              }}>{s.tools.join('  ·  ')}</div>
              <div style={{
                padding: `${spacious ? 26 : 18}px 16px`,
                color: palette.accent, fontSize: 13,
              }}>{s.bridge}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CONCEPT BRIDGES */}
      <section id="bridges" style={{ padding: `${gap}px ${pad}px`, borderTop: `1px solid ${palette.ink}` }}>
        <CatalogSectionHead palette={palette} num="B" eyebrow="Concept bridges · 21" title="Understand the idea before you chase the syntax." sub="Experiential bridges between a fuzzy idea and a p5.js function or programming pattern." />

        <div style={{ marginTop: 40, border: `1px solid ${palette.ink}` }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '60px 1fr 1fr',
            background: palette.ink, color: palette.paper,
            fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase',
          }}>
            {['№', 'Bridge', 'Pattern / function'].map((h, i) => (
              <div key={i} style={{ padding: '10px 16px', borderRight: i < 2 ? `1px solid ${palette.paper}` : 'none' }}>{h}</div>
            ))}
          </div>
          {c.bridges.map((b, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '60px 1fr 1fr',
              borderTop: i > 0 ? `1px solid ${palette.rule}` : 'none',
              alignItems: 'baseline',
            }}>
              <div style={{
                padding: `${dense ? 10 : 14}px 16px`,
                borderRight: `1px solid ${palette.rule}`,
                fontFamily: '"JetBrains Mono",monospace',
                fontSize: 12, color: palette.muted,
              }}>{b.roman}</div>
              <div style={{
                padding: `${dense ? 10 : 14}px 16px`,
                borderRight: `1px solid ${palette.rule}`,
                fontWeight: 500, fontSize: 15.5, letterSpacing: '-0.01em',
              }}>{b.name}</div>
              <div style={{
                padding: `${dense ? 10 : 14}px 16px`,
                fontFamily: '"JetBrains Mono",monospace',
                fontSize: 12, color: palette.muted,
              }}>{b.fns}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WORKSHOP TOOLS */}
      <section id="tools" style={{ padding: `${gap}px ${pad}px`, borderTop: `1px solid ${palette.ink}` }}>
        <CatalogSectionHead palette={palette} num="C" eyebrow="Workshop tools · 66" title="Try the idea at a live demo station." sub="Each tool focuses on one concept. Move a slider, predict, then read the code." />

        <CatalogFilterBar palette={palette} variant={filterUI} suits={c.suits} />
        <CatalogToolsList palette={palette} tools={c.tools} layout={layout} suitMap={suitMap} dense={dense} spacious={spacious} />
      </section>

      {/* STARTER SKETCHES */}
      <section id="sketches" style={{ padding: `${gap}px ${pad}px`, borderTop: `1px solid ${palette.ink}` }}>
        <CatalogSectionHead palette={palette} num="D" eyebrow="Starter sketches · 44" title="Open. Change one thing. Make it yours." sub="A working sketch is a head start. Start from one. Change the smallest thing first. Then change something bigger." />

        <div style={{
          marginTop: 36,
          border: `1px solid ${palette.ink}`,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
        }}>
          {c.sketches.map((s, i) => (
            <div key={i} style={{
              padding: `${dense ? 18 : 24}px 18px`,
              borderRight: (i + 1) % 4 !== 0 ? `1px solid ${palette.rule}` : 'none',
              borderBottom: i < c.sketches.length - 4 ? `1px solid ${palette.rule}` : 'none',
            }}>
              <div style={{
                fontFamily: '"JetBrains Mono",monospace',
                fontSize: 10.5, color: palette.muted, marginBottom: 10,
              }}>S/{String(i + 1).padStart(2, '0')}</div>
              <div style={{ fontWeight: 600, fontSize: 15, letterSpacing: '-0.01em' }}>{s}</div>
              <div style={{
                marginTop: 12,
                fontFamily: '"JetBrains Mono",monospace',
                fontSize: 11, color: palette.accent,
              }}>↗ Open</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: `${gap}px ${pad}px ${spacious ? 80 : 56}px`, borderTop: `1px solid ${palette.ink}` }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start',
        }}>
          <div>
            <CatalogSectionHead palette={palette} num="E" eyebrow="Norms" title="Four rules for using this catalog." />
            <ol style={{
              margin: '32px 0 0', padding: 0, listStyle: 'none',
              border: `1px solid ${palette.ink}`,
            }}>
              {c.manifesto.map((m, i) => (
                <li key={i} style={{
                  display: 'grid', gridTemplateColumns: '60px 1fr', gap: 0,
                  borderTop: i > 0 ? `1px solid ${palette.rule}` : 'none',
                }}>
                  <span style={{
                    padding: '14px 16px',
                    borderRight: `1px solid ${palette.rule}`,
                    fontFamily: '"JetBrains Mono",monospace',
                    fontSize: 13, color: palette.accent,
                  }}>0{i+1}</span>
                  <span style={{ padding: '14px 16px', fontSize: 16, fontWeight: 500 }}>{m}</span>
                </li>
              ))}
            </ol>
          </div>
          <div style={{
            border: `1px solid ${palette.ink}`,
            padding: 24, background: palette.paperAlt,
          }}>
            <div style={{
              fontFamily: '"JetBrains Mono",monospace',
              fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase',
              color: palette.muted, marginBottom: 18,
            }}>Colophon</div>
            <p style={{ margin: 0, fontSize: 14, color: palette.ink, lineHeight: 1.55 }}>
              Edited by <strong>Saber Khan</strong> for <strong>CC Fest</strong>. Built with the help of LLMs, classroom testing, and learning from Dan Shiffman, Lauren Lee McCarthy, Casey Reas, Patt Vira, Allison Parrish, the p5.js community, and the many people that have shared their teaching materials.
            </p>
            <div style={{
              marginTop: 28, paddingTop: 18, borderTop: `1px solid ${palette.rule}`,
              display: 'flex', justifyContent: 'space-between',
              fontFamily: '"JetBrains Mono",monospace', fontSize: 11, color: palette.muted,
            }}>
              <span>ccfest.rocks</span>
              <span>github</span>
              <span>{c.year}</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Meta = ({ palette, k, v }) => (
  <div style={{ padding: '0 24px 0 0' }}>
    <div style={{
      fontFamily: '"JetBrains Mono",monospace',
      fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase',
      color: palette.muted, marginBottom: 4,
    }}>{k}</div>
    <div style={{ fontSize: 14, color: palette.ink, fontWeight: 500 }}>{v}</div>
  </div>
);

const CatalogSectionHead = ({ palette, num, eyebrow, title, sub }) => (
  <div style={{
    display: 'grid', gridTemplateColumns: '70px 1fr', gap: 24, alignItems: 'start',
  }}>
    <div>
      <div style={{
        width: 56, height: 56,
        background: palette.accent,
        color: palette.paper,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: '"Inter Tight",sans-serif',
        fontWeight: 600, fontSize: 28, letterSpacing: '-0.02em',
      }}>{num}</div>
    </div>
    <div>
      <div style={{
        fontFamily: '"JetBrains Mono",monospace',
        fontSize: 10.5, letterSpacing: '.16em', textTransform: 'uppercase',
        color: palette.muted, marginBottom: 12,
      }}>{eyebrow}</div>
      <h2 style={{
        margin: 0,
        fontFamily: '"Inter Tight",sans-serif',
        fontWeight: 500,
        fontSize: 'clamp(40px, 5vw, 64px)',
        lineHeight: 1.05,
        letterSpacing: '-0.035em',
        maxWidth: '20ch',
      }}>{title}</h2>
      {sub && (
        <p style={{
          margin: '16px 0 0', maxWidth: '55ch', color: palette.muted, fontSize: 15.5,
        }}>{sub}</p>
      )}
    </div>
  </div>
);

const CatalogFilterBar = ({ palette, variant, suits }) => {
  if (variant === 'sidebar') {
    return (
      <div style={{
        marginTop: 32,
        border: `1px solid ${palette.ink}`,
        display: 'grid', gridTemplateColumns: '240px 1fr',
      }}>
        <div style={{ borderRight: `1px solid ${palette.ink}` }}>
          <div style={{
            padding: '12px 16px',
            background: palette.ink, color: palette.paper,
            fontFamily: '"JetBrains Mono",monospace',
            fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase',
          }}>Filter by suit</div>
          {[{id: 'all', sym: '◇', name: 'All', n: 66}, ...suits].map((s, i) => (
            <div key={s.id} style={{
              padding: '11px 16px',
              borderTop: `1px solid ${palette.rule}`,
              display: 'flex', alignItems: 'baseline', gap: 12,
              background: i === 0 ? palette.paperAlt : 'transparent',
            }}>
              <span style={{ color: palette.accent, width: 16, fontSize: 14 }}>{s.sym}</span>
              <span style={{ fontWeight: 500, fontSize: 14 }}>{s.name}</span>
              <span style={{
                marginLeft: 'auto',
                fontFamily: '"JetBrains Mono",monospace',
                fontSize: 11, color: palette.muted,
              }}>{s.n || ''}</span>
            </div>
          ))}
        </div>
        <div style={{
          padding: '14px 18px', background: palette.paperAlt,
          fontFamily: '"JetBrains Mono",monospace', fontSize: 11, color: palette.muted,
        }}>
          <span>Showing all 66 tools.</span>
        </div>
      </div>
    );
  }
  if (variant === 'tabs') {
    return (
      <div style={{
        marginTop: 32, display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        border: `1px solid ${palette.ink}`,
      }}>
        {[{id: 'all', sym: '◇', name: 'All', n: 66}, ...suits].map((s, i) => (
          <div key={s.id} style={{
            padding: '18px 16px',
            borderRight: i < 6 ? `1px solid ${palette.rule}` : 'none',
            background: i === 0 ? palette.ink : 'transparent',
            color: i === 0 ? palette.paper : palette.ink,
          }}>
            <div style={{ fontSize: 18, color: i === 0 ? palette.paper : palette.accent }}>{s.sym}</div>
            <div style={{ fontSize: 13, fontWeight: 600, marginTop: 6 }}>{s.name}</div>
            <div style={{
              fontFamily: '"JetBrains Mono",monospace',
              fontSize: 10, color: i === 0 ? palette.paper : palette.muted,
              marginTop: 4, opacity: 0.7,
            }}>{s.sub || `${s.n} tools`}</div>
          </div>
        ))}
      </div>
    );
  }
  // chips
  return (
    <div style={{ marginTop: 32, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {[{id: 'all', sym: '', name: 'All 66'}, ...suits].map(s => (
        <span key={s.id} style={{
          fontFamily: '"JetBrains Mono",monospace',
          fontSize: 11.5, padding: '7px 14px',
          border: `1px solid ${palette.ink}`,
          color: s.id === 'all' ? palette.paper : palette.ink,
          background: s.id === 'all' ? palette.ink : 'transparent',
        }}>
          {s.sym && <span style={{ marginRight: 6, color: s.id === 'all' ? palette.paper : palette.accent }}>{s.sym}</span>}
          {s.name}
        </span>
      ))}
    </div>
  );
};

const CatalogToolsList = ({ palette, tools, layout, suitMap, dense, spacious }) => {
  if (layout === 'grid') {
    return (
      <div style={{
        marginTop: 36,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 0,
        border: `1px solid ${palette.ink}`,
      }}>
        {tools.map((tool, i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          const totalRows = Math.ceil(tools.length / 3);
          return (
            <div key={tool.n} style={{
              padding: dense ? 16 : spacious ? 28 : 22,
              borderRight: col < 2 ? `1px solid ${palette.rule}` : 'none',
              borderBottom: row < totalRows - 1 ? `1px solid ${palette.rule}` : 'none',
            }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                fontFamily: '"JetBrains Mono",monospace', fontSize: 10.5,
                letterSpacing: '.06em', color: palette.muted, marginBottom: 14,
              }}>
                <span>№ {tool.n}</span>
                <span style={{ color: palette.accent }}>{suitMap[tool.suit].sym}</span>
              </div>
              <div style={{
                fontWeight: 600, fontSize: 17, letterSpacing: '-0.015em', marginBottom: 8,
              }}>{tool.name}</div>
              <div style={{ fontSize: 13.5, color: palette.muted, lineHeight: 1.5 }}>{tool.blurb}</div>
              <div style={{
                marginTop: 14,
                fontFamily: '"JetBrains Mono",monospace',
                fontSize: 10, color: palette.muted, letterSpacing: '.06em', textTransform: 'uppercase',
              }}>{suitMap[tool.suit].name} · {tool.tags.slice(0, 2).join(' · ')}</div>
            </div>
          );
        })}
      </div>
    );
  }
  if (layout === 'masonry') {
    return (
      <div style={{ marginTop: 36, columnCount: 3, columnGap: 0 }}>
        {tools.map(tool => (
          <div key={tool.n} style={{
            breakInside: 'avoid',
            padding: dense ? 14 : 18,
            borderTop: `1px solid ${palette.rule}`,
            borderRight: `1px solid ${palette.rule}`,
          }}>
            <div style={{
              fontFamily: '"JetBrains Mono",monospace', fontSize: 10.5,
              color: palette.accent, marginBottom: 8,
            }}>{tool.n} · {suitMap[tool.suit].sym} {suitMap[tool.suit].name}</div>
            <div style={{ fontWeight: 600, fontSize: 15.5, letterSpacing: '-0.01em', marginBottom: 6 }}>{tool.name}</div>
            <div style={{ fontSize: 13, color: palette.muted }}>{tool.blurb}</div>
          </div>
        ))}
      </div>
    );
  }
  // list (default)
  return (
    <div style={{ marginTop: 36, border: `1px solid ${palette.ink}` }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '60px 80px 1.4fr 2.2fr 1fr 110px',
        background: palette.ink, color: palette.paper,
        fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase',
      }}>
        {['№', 'Suit', 'Tool', 'Description', 'Tags', ''].map((h, i) => (
          <div key={i} style={{
            padding: '10px 16px',
            borderRight: i < 5 ? `1px solid ${palette.paper}` : 'none',
            textAlign: i === 5 ? 'right' : 'left',
          }}>{h}</div>
        ))}
      </div>
      {tools.map((tool, i) => (
        <div key={tool.n} style={{
          display: 'grid',
          gridTemplateColumns: '60px 80px 1.4fr 2.2fr 1fr 110px',
          borderTop: i > 0 ? `1px solid ${palette.rule}` : 'none',
          alignItems: 'baseline',
        }}>
          <div style={{
            padding: `${dense ? 10 : 14}px 16px`,
            borderRight: `1px solid ${palette.rule}`,
            fontFamily: '"JetBrains Mono",monospace', fontSize: 12, color: palette.muted,
          }}>{tool.n}</div>
          <div style={{
            padding: `${dense ? 10 : 14}px 16px`,
            borderRight: `1px solid ${palette.rule}`,
            fontSize: 16, color: palette.accent,
          }}>{suitMap[tool.suit].sym}</div>
          <div style={{
            padding: `${dense ? 10 : 14}px 16px`,
            borderRight: `1px solid ${palette.rule}`,
            fontWeight: 600, fontSize: 14.5, letterSpacing: '-0.01em',
          }}>{tool.name}</div>
          <div style={{
            padding: `${dense ? 10 : 14}px 16px`,
            borderRight: `1px solid ${palette.rule}`,
            color: palette.muted, fontSize: 13.5,
          }}>{tool.blurb}</div>
          <div style={{
            padding: `${dense ? 10 : 14}px 16px`,
            borderRight: `1px solid ${palette.rule}`,
            fontFamily: '"JetBrains Mono",monospace', fontSize: 11, color: palette.ink,
          }}>{tool.tags.slice(0, 2).join(' · ')}</div>
          <div style={{
            padding: `${dense ? 10 : 14}px 16px`,
            fontFamily: '"JetBrains Mono",monospace',
            fontSize: 11, color: palette.accent, textAlign: 'right',
          }}>↗ Open</div>
        </div>
      ))}
    </div>
  );
};

function bgPatternStyleB(kind, palette) {
  if (kind === 'none') return {};
  if (kind === 'dots') {
    return {
      backgroundImage: `radial-gradient(circle, ${palette.rule} 1px, transparent 1px)`,
      backgroundSize: '30px 30px',
    };
  }
  if (kind === 'grid') {
    return {
      backgroundImage: `linear-gradient(${palette.rule} 1px, transparent 1px), linear-gradient(90deg, ${palette.rule} 1px, transparent 1px)`,
      backgroundSize: '48px 48px',
    };
  }
  if (kind === 'hairlines') {
    return {
      backgroundImage: `linear-gradient(${palette.rule} 1px, transparent 1px)`,
      backgroundSize: '100% 12px',
    };
  }
  return {};
}

window.DirectionB = DirectionB;
window.CatalogMeta = Meta;
window.CatalogSectionHead = CatalogSectionHead;
window.CatalogFilterBar = CatalogFilterBar;
window.CatalogToolsList = CatalogToolsList;
window.bgPatternStyleB = bgPatternStyleB;
