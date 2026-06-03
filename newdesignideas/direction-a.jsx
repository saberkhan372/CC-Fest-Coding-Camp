// Direction A — "Reading List"
// Editorial magazine. Fraunces serif headlines, Source Serif body, DM Mono captions.
// Warm cream paper. Two-column. Tools as a numbered index, no cards.

const DirectionA = ({ t, C }) => {
  const c = window.CC_CONTENT;
  const palette = C; // resolved palette from host
  const dense = t.density === 'compact';
  const spacious = t.density === 'spacious';

  // Body cell padding scales with density
  const pad = dense ? 18 : spacious ? 36 : 26;
  const gap = dense ? 28 : spacious ? 64 : 44;

  // Filter UI variant
  const filterUI = t.filterUI;

  // Tools layout
  const layout = t.layout;

  // Background texture
  const bgStyle = bgPatternStyle(t.bgPattern, palette);

  return (
    <div
      data-screen-label="A · Reading List"
      style={{
        width: '100%',
        background: palette.paper,
        color: palette.ink,
        fontFamily: '"Source Serif Pro","Source Serif 4",Georgia,serif',
        fontSize: dense ? 14 : spacious ? 17 : 15.5,
        lineHeight: 1.55,
        ...bgStyle,
      }}
    >
      {/* TOPBAR */}
      <div style={{
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
        padding: `22px ${pad + 14}px 18px`,
        borderBottom: `1px solid ${palette.rule}`,
        fontFamily: '"DM Mono",ui-monospace,monospace',
        fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase',
        color: palette.muted,
      }}>
        <span>{c.brand}</span>
        <span style={{ display: 'flex', gap: 20 }}>
          <span>Vol. III</span><span>·</span><span>Spring {c.year}</span><span>·</span><span>Free</span>
        </span>
      </div>

      {/* MASTHEAD */}
      <header style={{ padding: `${spacious ? 80 : 56}px ${pad + 14}px ${spacious ? 56 : 40}px`, position: 'relative' }}>
        <div style={{
          fontFamily: '"DM Mono",ui-monospace,monospace',
          fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase',
          color: palette.accent, marginBottom: 28,
        }}>
          A reading list for creative coding · p5.js
        </div>
        <h1 style={{
          margin: 0,
          fontFamily: '"Fraunces",Georgia,serif',
          fontWeight: 400,
          fontStyle: 'italic',
          fontSize: 'clamp(72px, 9vw, 116px)',
          lineHeight: 1.02,
          letterSpacing: '-0.035em',
          color: palette.ink,
        }}>
          A free workshop<br/>
          for creative coding,<br/>
          <span style={{ fontStyle: 'normal', fontWeight: 600 }}>open to anyone curious.</span>
        </h1>

        {/* Two-column lede */}
        <div style={{
          marginTop: 56,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 56,
          maxWidth: 920,
        }}>
          <p style={{ margin: 0, fontSize: spacious ? 19 : 17.5, lineHeight: 1.55, color: palette.ink }}>
            You don't need to be a programmer to start. Use a <em>concept bridge</em> when an idea feels fuzzy, open a <em>workshop tool</em> when you want guided practice, then remix a <em>starter sketch</em> into something of your own.
          </p>
          <p style={{ margin: 0, color: palette.muted, fontStyle: 'italic', fontSize: 15 }}>
            21 bridges. 66 tools. 44 sketches. Five sessions, one arc, from first marks to open studio. Everything here is free, and everything here is yours to remix.
          </p>
        </div>

        {/* Stats row */}
        <div style={{
          display: 'flex',
          marginTop: 56,
          borderTop: `1px solid ${palette.rule}`,
          borderBottom: `1px solid ${palette.rule}`,
        }}>
          {c.stats.map((s, i) => (
            <div key={i} style={{
              flex: 1,
              padding: '22px 16px 22px 0',
              borderRight: i < c.stats.length - 1 ? `1px solid ${palette.rule}` : 'none',
              paddingLeft: i === 0 ? 0 : 22,
            }}>
              <div style={{
                fontFamily: '"Fraunces",Georgia,serif',
                fontWeight: 700,
                fontSize: 64,
                lineHeight: 0.9,
                letterSpacing: '-0.04em',
                color: palette.accent,
              }}>{s.n}</div>
              <div style={{
                marginTop: 8,
                fontFamily: '"DM Mono",ui-monospace,monospace',
                fontSize: 11, letterSpacing: '.06em', textTransform: 'uppercase',
                color: palette.ink,
              }}>{s.label}</div>
              <div style={{
                marginTop: 4, fontStyle: 'italic', color: palette.muted, fontSize: 13,
              }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Byline */}
        <div style={{
          marginTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          fontFamily: '"DM Mono",ui-monospace,monospace', fontSize: 11,
          color: palette.muted, letterSpacing: '.08em', textTransform: 'uppercase',
        }}>
          <span>Edited by {c.byline}</span>
          <span style={{ display: 'flex', gap: 18 }}>
            <a href="#bridges" style={{ color: palette.ink, textDecoration: 'none', borderBottom: `1px solid ${palette.ink}` }}>Bridges →</a>
            <a href="#tools" style={{ color: palette.ink, textDecoration: 'none', borderBottom: `1px solid ${palette.ink}` }}>Tools →</a>
            <a href="#sketches" style={{ color: palette.ink, textDecoration: 'none', borderBottom: `1px solid ${palette.ink}` }}>Sketches →</a>
          </span>
        </div>
      </header>

      {/* THE CAMP ARC — 5 sessions */}
      <section style={{ padding: `${gap}px ${pad + 14}px`, borderTop: `2px solid ${palette.ink}` }}>
        <SectionHead palette={palette} eyebrow="The Camp Arc" title="Five sessions. One arc." subtitle="From first marks to open studio. Each session builds on the last — but every tool stands alone. Jump in anywhere." />

        <div style={{ marginTop: 40 }}>
          {c.sessions.map((s, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '90px 1fr 2fr',
              gap: 32,
              padding: `${spacious ? 32 : 22}px 0`,
              borderTop: `1px solid ${palette.rule}`,
              borderBottom: i === c.sessions.length - 1 ? `1px solid ${palette.rule}` : 'none',
              alignItems: 'baseline',
            }}>
              <div style={{
                fontFamily: '"Fraunces",Georgia,serif',
                fontWeight: 400,
                fontStyle: 'italic',
                fontSize: 56,
                lineHeight: 0.9,
                color: palette.accent,
                letterSpacing: '-0.03em',
              }}>{s.n}</div>
              <div>
                <h3 style={{
                  margin: '0 0 6px',
                  fontFamily: '"Fraunces",Georgia,serif',
                  fontWeight: 600,
                  fontSize: 24,
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                }}>{s.title}</h3>
                <p style={{ margin: 0, color: palette.muted, fontStyle: 'italic', fontSize: 14 }}>{s.blurb}</p>
              </div>
              <div>
                <div style={{
                  fontFamily: '"DM Mono",ui-monospace,monospace',
                  fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase',
                  color: palette.muted, marginBottom: 10,
                }}>Stations</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 14px', fontSize: 14 }}>
                  {s.tools.map((t, j) => (
                    <span key={j}>
                      <a href="#" style={{ color: palette.ink, textDecoration: 'none', borderBottom: `1px solid ${palette.rule}` }}>{t}</a>
                      {j < s.tools.length - 1 && <span style={{ color: palette.muted, marginLeft: 14 }}>·</span>}
                    </span>
                  ))}
                </div>
                <div style={{ marginTop: 12, fontSize: 13, color: palette.muted, fontStyle: 'italic' }}>
                  <span style={{ color: palette.accent, fontStyle: 'normal', fontFamily: '"DM Mono",monospace', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase' }}>Bridge </span>
                  {s.bridge}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONCEPT BRIDGES — typographic index */}
      <section id="bridges" style={{ padding: `${gap}px ${pad + 14}px`, borderTop: `2px solid ${palette.ink}`, background: palette.paperAlt }}>
        <SectionHead palette={palette} eyebrow="Concept Bridges · 21" title="Understand the idea before you chase the syntax." subtitle="Not output tools, not starter sketches. Experiential bridges between a fuzzy idea and the p5.js function or programming pattern behind it." />

        <div style={{ marginTop: 40, columnCount: 2, columnGap: 56, columnRule: `1px solid ${palette.rule}` }}>
          {c.bridges.map((b, i) => (
            <div key={i} style={{
              breakInside: 'avoid',
              padding: `${dense ? 10 : 14}px 0`,
              borderBottom: `1px dotted ${palette.rule}`,
              display: 'grid',
              gridTemplateColumns: '52px 1fr',
              gap: 16,
              alignItems: 'baseline',
            }}>
              <div style={{
                fontFamily: '"DM Mono",ui-monospace,monospace',
                fontSize: 11, letterSpacing: '.06em', color: palette.accent,
              }}>{b.roman}</div>
              <div>
                <div style={{
                  fontFamily: '"Fraunces",Georgia,serif',
                  fontWeight: 500,
                  fontSize: 17,
                  letterSpacing: '-0.01em',
                  lineHeight: 1.25,
                }}>{b.name}</div>
                <div style={{
                  marginTop: 4,
                  fontFamily: '"DM Mono",ui-monospace,monospace',
                  fontSize: 11, color: palette.muted,
                }}>{b.fns}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WORKSHOP TOOLS — numbered index */}
      <section id="tools" style={{ padding: `${gap}px ${pad + 14}px`, borderTop: `2px solid ${palette.ink}` }}>
        <SectionHead palette={palette} eyebrow="Workshop Tools · 66" title="Try the idea at a live demo station." subtitle="Each tool focuses on one concept. Move a slider, predict, then read the code with the canvas still in mind." />

        {/* Rhythm */}
        <div style={{
          marginTop: 28,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 18,
          padding: '18px 0',
          borderTop: `1px solid ${palette.rule}`,
          borderBottom: `1px solid ${palette.rule}`,
        }}>
          {c.rhythm.map((r, i) => (
            <div key={i}>
              <div style={{
                fontFamily: '"DM Mono",ui-monospace,monospace',
                fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase',
                color: palette.accent, marginBottom: 4,
              }}>0{i + 1} · {r.k}</div>
              <div style={{ fontStyle: 'italic', color: palette.muted, fontSize: 14 }}>{r.v}</div>
            </div>
          ))}
        </div>

        {/* Filter */}
        <FilterBar palette={palette} variant={filterUI} suits={c.suits} />

        {/* Tools */}
        <ToolsList palette={palette} tools={c.tools} layout={layout} suits={c.suits} dense={dense} spacious={spacious} />
      </section>

      {/* STARTER SKETCHES */}
      <section id="sketches" style={{ padding: `${gap}px ${pad + 14}px`, borderTop: `2px solid ${palette.ink}`, background: palette.paperAlt }}>
        <SectionHead palette={palette} eyebrow="Starter Sketches · 44" title="Start from a working sketch. Make it yours." subtitle="Open a sketch in the p5.js editor. Change the smallest thing first. Then change a slightly bigger thing. Then change a name in a way that makes it yours." />

        <div style={{
          marginTop: 32,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '6px 56px',
        }}>
          {c.sketches.map((s, i) => (
            <div key={i} style={{
              padding: '10px 0',
              borderBottom: `1px dotted ${palette.rule}`,
              display: 'flex',
              gap: 16,
              alignItems: 'baseline',
            }}>
              <span style={{
                fontFamily: '"DM Mono",ui-monospace,monospace',
                fontSize: 11, color: palette.muted, width: 28,
              }}>{String(i + 1).padStart(2, '0')}</span>
              <span style={{ fontFamily: '"Fraunces",Georgia,serif', fontSize: 16, fontWeight: 500 }}>{s}</span>
            </div>
          ))}
        </div>
      </section>

      {/* MANIFESTO / FOOTER */}
      <footer style={{ padding: `${gap}px ${pad + 14}px ${spacious ? 80 : 56}px`, borderTop: `2px solid ${palette.ink}` }}>
        <div style={{
          fontFamily: '"DM Mono",ui-monospace,monospace',
          fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase',
          color: palette.accent, marginBottom: 28,
        }}>Tool norms</div>

        <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 18, maxWidth: 840 }}>
          {c.manifesto.map((m, i) => (
            <li key={i} style={{
              display: 'grid',
              gridTemplateColumns: '52px 1fr',
              gap: 16,
              alignItems: 'baseline',
              borderTop: `1px solid ${palette.rule}`,
              paddingTop: 18,
            }}>
              <span style={{
                fontFamily: '"DM Mono",ui-monospace,monospace',
                fontSize: 11, letterSpacing: '.06em', color: palette.muted,
              }}>0{i + 1}</span>
              <span style={{
                fontFamily: '"Fraunces",Georgia,serif',
                fontWeight: 400,
                fontStyle: 'italic',
                fontSize: 28,
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
              }}>{m}</span>
            </li>
          ))}
        </ol>

        <div style={{
          marginTop: 56,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          fontFamily: '"DM Mono",ui-monospace,monospace',
          fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase',
          color: palette.muted,
          borderTop: `1px solid ${palette.rule}`,
          paddingTop: 22,
        }}>
          <span>{c.brand} · {c.year}</span>
          <span style={{ display: 'flex', gap: 22 }}>
            <span>ccfest.rocks</span>
            <span>Notion notes</span>
            <span>GitHub</span>
          </span>
        </div>
      </footer>
    </div>
  );
};

// ── shared subcomponents ────────────────────────────────────────────────

const SectionHead = ({ palette, eyebrow, title, subtitle }) => (
  <div style={{ maxWidth: 880 }}>
    <div style={{
      fontFamily: '"DM Mono",ui-monospace,monospace',
      fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase',
      color: palette.accent, marginBottom: 18,
    }}>{eyebrow}</div>
    <h2 style={{
      margin: 0,
      fontFamily: '"Fraunces",Georgia,serif',
      fontWeight: 500,
      fontSize: 'clamp(36px, 4vw, 52px)',
      lineHeight: 1.05,
      letterSpacing: '-0.025em',
      maxWidth: '20ch',
      textWrap: 'balance',
    }}>{title}</h2>
    {subtitle && (
      <p style={{ marginTop: 18, marginBottom: 0, fontSize: 16.5, color: palette.muted, maxWidth: '60ch' }}>
        {subtitle}
      </p>
    )}
  </div>
);

const FilterBar = ({ palette, variant, suits }) => {
  if (variant === 'sidebar') {
    return (
      <div style={{
        marginTop: 28,
        display: 'grid', gridTemplateColumns: '200px 1fr', gap: 32,
        alignItems: 'start',
      }}>
        <div style={{ borderLeft: `2px solid ${palette.ink}`, paddingLeft: 14 }}>
          <div style={{
            fontFamily: '"DM Mono",monospace', fontSize: 10.5, letterSpacing: '.12em',
            textTransform: 'uppercase', color: palette.muted, marginBottom: 12,
          }}>Filter</div>
          {[{ id: 'all', sym: '◇', name: 'All', sub: '66 tools' }, ...suits].map(s => (
            <div key={s.id} style={{
              padding: '8px 0', display: 'flex', alignItems: 'baseline', gap: 10,
              borderBottom: `1px dotted ${palette.rule}`,
            }}>
              <span style={{ color: palette.accent, fontSize: 14, width: 14 }}>{s.sym}</span>
              <span style={{ fontFamily: '"Fraunces",serif', fontSize: 15, fontWeight: 500 }}>{s.name}</span>
              <span style={{ marginLeft: 'auto', fontSize: 11, color: palette.muted, fontFamily: '"DM Mono",monospace' }}>{s.sub || ''}</span>
            </div>
          ))}
        </div>
        <div></div>
      </div>
    );
  }
  if (variant === 'tabs') {
    return (
      <div style={{
        marginTop: 28, display: 'flex', borderBottom: `2px solid ${palette.ink}`,
      }}>
        {[{ id: 'all', sym: '◇', name: 'All', n: 66 }, ...suits].map((s, i) => (
          <div key={s.id} style={{
            padding: '14px 22px 12px',
            borderRight: `1px solid ${palette.rule}`,
            borderBottom: i === 0 ? `3px solid ${palette.accent}` : 'none',
            marginBottom: i === 0 ? -2 : 0,
            background: i === 0 ? palette.paper : 'transparent',
          }}>
            <div style={{ fontSize: 16, color: palette.accent }}>{s.sym}</div>
            <div style={{
              fontFamily: '"Fraunces",serif', fontSize: 16, fontWeight: 600, marginTop: 4,
            }}>{s.name}</div>
            <div style={{ fontFamily: '"DM Mono",monospace', fontSize: 10, color: palette.muted, marginTop: 2 }}>
              {s.n || ''}
            </div>
          </div>
        ))}
      </div>
    );
  }
  // chips (default)
  return (
    <div style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {[{ id: 'all', sym: '', name: 'All 66' }, ...suits].map(s => (
        <span key={s.id} style={{
          fontFamily: '"DM Mono",monospace',
          fontSize: 12, padding: '7px 14px',
          border: `1px solid ${palette.rule}`,
          borderRadius: 999,
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

const ToolsList = ({ palette, tools, layout, suits, dense, spacious }) => {
  const suitMap = Object.fromEntries(suits.map(s => [s.id, s]));

  if (layout === 'grid') {
    return (
      <div style={{
        marginTop: 36,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: dense ? 18 : 28,
      }}>
        {tools.map(tool => (
          <div key={tool.n} style={{
            padding: dense ? 16 : 22,
            background: palette.paper,
            border: `1px solid ${palette.rule}`,
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
              fontFamily: '"DM Mono",monospace', fontSize: 10.5, letterSpacing: '.08em',
              textTransform: 'uppercase', color: palette.muted, marginBottom: 12,
            }}>
              <span>№ {tool.n}</span>
              <span style={{ color: palette.accent }}>{suitMap[tool.suit].sym} {suitMap[tool.suit].name}</span>
            </div>
            <div style={{
              fontFamily: '"Fraunces",serif', fontWeight: 500, fontSize: 19,
              letterSpacing: '-0.015em', lineHeight: 1.2, marginBottom: 8,
            }}>{tool.name}</div>
            <div style={{ fontSize: 13.5, color: palette.muted, lineHeight: 1.5 }}>{tool.blurb}</div>
          </div>
        ))}
      </div>
    );
  }

  if (layout === 'masonry') {
    // 3 columns CSS columns
    return (
      <div style={{ marginTop: 36, columnCount: 3, columnGap: 28 }}>
        {tools.map(tool => (
          <div key={tool.n} style={{
            breakInside: 'avoid',
            marginBottom: 20,
            padding: dense ? 14 : 18,
            background: palette.paper,
            border: `1px solid ${palette.rule}`,
          }}>
            <div style={{
              fontFamily: '"DM Mono",monospace', fontSize: 10.5,
              color: palette.accent, marginBottom: 8,
            }}>{suitMap[tool.suit].sym} {tool.n}</div>
            <div style={{
              fontFamily: '"Fraunces",serif', fontWeight: 500, fontSize: 17,
              marginBottom: 6, lineHeight: 1.2,
            }}>{tool.name}</div>
            <div style={{ fontSize: 13, color: palette.muted }}>{tool.blurb}</div>
          </div>
        ))}
      </div>
    );
  }

  // list (default — most editorial)
  return (
    <ol style={{ margin: '36px 0 0', padding: 0, listStyle: 'none' }}>
      {tools.map((tool, i) => (
        <li key={tool.n} style={{
          display: 'grid',
          gridTemplateColumns: '54px 110px 1.4fr 2fr 140px',
          gap: 22,
          padding: `${dense ? 14 : spacious ? 26 : 18}px 0`,
          borderTop: `1px solid ${palette.rule}`,
          borderBottom: i === tools.length - 1 ? `1px solid ${palette.rule}` : 'none',
          alignItems: 'baseline',
        }}>
          <span style={{
            fontFamily: '"DM Mono",monospace', fontSize: 12,
            color: palette.muted, letterSpacing: '.04em',
          }}>{tool.n}</span>
          <span style={{
            fontFamily: '"DM Mono",monospace', fontSize: 11, letterSpacing: '.06em',
            textTransform: 'uppercase', color: palette.accent,
          }}>{suitMap[tool.suit].sym} {suitMap[tool.suit].name}</span>
          <span style={{
            fontFamily: '"Fraunces",serif', fontWeight: 500, fontSize: 19,
            letterSpacing: '-0.015em', lineHeight: 1.2,
          }}>{tool.name}</span>
          <span style={{ fontSize: 14.5, color: palette.muted, lineHeight: 1.5 }}>{tool.blurb}</span>
          <span style={{
            fontFamily: '"DM Mono",monospace', fontSize: 11, color: palette.ink,
            letterSpacing: '.02em', textAlign: 'right',
          }}>Launch →</span>
        </li>
      ))}
    </ol>
  );
};

function bgPatternStyle(kind, palette) {
  if (kind === 'none') return {};
  if (kind === 'dots') {
    return {
      backgroundImage: `radial-gradient(circle, ${palette.rule} 1px, transparent 1px)`,
      backgroundSize: '24px 24px',
    };
  }
  if (kind === 'grid') {
    return {
      backgroundImage: `linear-gradient(${palette.rule} 1px, transparent 1px), linear-gradient(90deg, ${palette.rule} 1px, transparent 1px)`,
      backgroundSize: '36px 36px',
    };
  }
  if (kind === 'hairlines') {
    return {
      backgroundImage: `linear-gradient(${palette.rule} 1px, transparent 1px)`,
      backgroundSize: '100% 8px',
    };
  }
  return {};
}

window.DirectionA = DirectionA;
window.bgPatternStyle = bgPatternStyle;
window.SectionHead = SectionHead;
window.FilterBar = FilterBar;
window.ToolsList = ToolsList;
