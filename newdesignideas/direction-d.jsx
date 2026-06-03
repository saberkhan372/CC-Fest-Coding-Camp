// Direction D — "Workshop Refined"
// A subtle evolution of the existing CC Fest site.
// Keeps the warm cream palette, accent red + gold highlight, Fraunces / DM Sans / DM Mono,
// 2px ink borders with offset shadows, suit symbols, and the slightly-rotated sequence cards.
// Refines: removes the busy draggable poster, calms the hierarchy, breathes more, tightens type.

const DirectionD = ({ t, C }) => {
  const c = window.CC_CONTENT;
  const palette = C;
  const dense = t.density === 'compact';
  const spacious = t.density === 'spacious';

  const pad = dense ? 32 : spacious ? 64 : 44;
  const gap = dense ? 32 : spacious ? 56 : 40;

  const filterUI = t.filterUI;
  const layout = t.layout;
  const bgStyle = bgPatternStyleD(t.bgPattern, palette);

  const suitMap = Object.fromEntries(c.suits.map(s => [s.id, s]));

  // Card shadow used throughout (the brutalist offset, but a hair lighter)
  const cardShadow = '5px 5px 0 rgba(32,28,26,.12)';
  const heavyShadow = '6px 6px 0 rgba(32,28,26,.14)';

  return (
    <div
      data-screen-label="D · Workshop Refined"
      style={{
        width: '100%',
        background: palette.paper,
        color: palette.ink,
        fontFamily: '"DM Sans",system-ui,sans-serif',
        fontSize: dense ? 14 : spacious ? 16 : 15,
        lineHeight: 1.55,
        ...bgStyle,
      }}
    >
      <div style={{ padding: `${spacious ? 36 : 28}px ${pad}px ${spacious ? 72 : 56}px` }}>
        {/* ── Topbar ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 24,
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 12,
            fontFamily: '"DM Sans",sans-serif',
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
          <nav style={{
            display: 'flex', gap: 22,
            fontSize: 13.5, color: palette.muted,
          }}>
            <a style={{ textDecoration: 'none', color: palette.muted }}>Sessions</a>
            <a style={{ textDecoration: 'none', color: palette.muted }}>Bridges</a>
            <a style={{ textDecoration: 'none', color: palette.muted }}>Tools</a>
            <a style={{ textDecoration: 'none', color: palette.muted }}>Sketches</a>
            <a style={{ textDecoration: 'none', color: palette.muted }}>About</a>
          </nav>
        </div>

        {/* ── Hero ── */}
        <section style={{
          position: 'relative',
          background: palette.paper,
          border: `2px solid ${palette.ink}`,
          borderRadius: 14,
          boxShadow: heavyShadow,
          padding: spacious ? 56 : 40,
          marginBottom: gap,
          ...bgPatternStyleD('dots-quiet', palette),
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 40, alignItems: 'start' }}>
            <div>
              <div style={{
                fontFamily: '"DM Mono",ui-monospace,monospace',
                fontSize: 11.5, fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase',
                color: palette.accent, marginBottom: 18,
              }}>CC Fest Coding Camp · Free · Open to everyone</div>

              <h1 style={{
                margin: 0,
                fontFamily: '"Fraunces",Georgia,serif',
                fontWeight: 800,
                fontSize: 'clamp(60px, 8vw, 104px)',
                lineHeight: 0.96,
                letterSpacing: '-0.035em',
                color: palette.ink,
                maxWidth: '13ch',
              }}>
                A free workshop<br/>
                for creative coding.
              </h1>

              <p style={{
                margin: '22px 0 0', maxWidth: '50ch',
                fontSize: spacious ? 19 : 17,
                lineHeight: 1.55, color: palette.muted,
              }}>
                Open to anyone curious about creative code — you don't need to be a programmer to start. Use a <em>concept bridge</em> when an idea feels fuzzy, open a <em>tool</em> for guided practice, then remix a <em>starter sketch</em> into something of your own.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 26 }}>
                <DButton palette={palette} primary>Browse Tools</DButton>
                <DButton palette={palette}>Concept Bridges</DButton>
                <DButton palette={palette}>Starter Sketches</DButton>
                <DButton palette={palette} ghost>About the Camp →</DButton>
              </div>
            </div>

            {/* Quiet visual sidebar — the "anatomy of a tool" instead of draggable cards */}
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
              }}>Anatomy of a tool</div>

              <h3 style={{
                margin: 0, fontFamily: '"Fraunces",serif', fontWeight: 700,
                fontSize: 22, letterSpacing: '-0.015em', lineHeight: 1.15,
              }}>One idea. Three windows.</h3>

              <ol style={{ margin: '18px 0 0', padding: 0, listStyle: 'none', display: 'grid', gap: 12 }}>
                {[
                  { sym: '◇', k: 'Canvas', v: 'A live p5.js sketch you can click and drag.' },
                  { sym: '✦', k: 'Controls', v: 'Sliders, toggles, code preview — change one thing.' },
                  { sym: '⬡', k: 'Notes', v: 'Teaching prompts; what to ask before answering.' },
                ].map((row, i) => (
                  <li key={i} style={{
                    display: 'grid', gridTemplateColumns: '24px 78px 1fr', gap: 8,
                    alignItems: 'baseline',
                    padding: '10px 0',
                    borderTop: `1px solid rgba(32,28,26,.12)`,
                  }}>
                    <span style={{
                      color: palette.accent, fontSize: 13.5, fontWeight: 700,
                    }}>{row.sym}</span>
                    <span style={{
                      fontFamily: '"DM Mono",monospace',
                      fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase',
                      color: palette.ink, fontWeight: 600,
                    }}>{row.k}</span>
                    <span style={{ fontSize: 13.5, color: palette.muted, lineHeight: 1.45 }}>{row.v}</span>
                  </li>
                ))}
              </ol>

              <div style={{
                marginTop: 18, paddingTop: 14, borderTop: `1px solid rgba(32,28,26,.12)`,
                fontStyle: 'italic', fontSize: 13.5, color: palette.muted,
              }}>
                “You don't need to understand everything to make something.”
                <div style={{
                  marginTop: 6,
                  fontFamily: '"DM Mono",monospace', fontSize: 10.5,
                  letterSpacing: '.1em', textTransform: 'uppercase',
                  color: palette.accent, fontStyle: 'normal', fontWeight: 600,
                }}>— Tool norms</div>
              </div>
            </aside>
          </div>

          {/* Stats row */}
          <div style={{
            marginTop: 38,
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12,
          }}>
            {c.stats.map((s, i) => (
              <div key={i} style={{
                padding: '16px 16px 14px',
                borderRadius: 8,
                border: `2px solid ${palette.line}`,
                background: palette.panel,
                boxShadow: '3px 3px 0 rgba(32,28,26,.08)',
              }}>
                <div style={{
                  fontFamily: '"Fraunces",serif',
                  fontWeight: 800,
                  fontSize: 36, lineHeight: 0.95, letterSpacing: '-0.04em',
                  color: palette.ink,
                }}>{s.n}</div>
                <div style={{
                  marginTop: 6,
                  fontSize: 11.5, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase',
                  color: palette.ink,
                }}>{s.label}</div>
                <div style={{
                  marginTop: 4, fontSize: 12, color: palette.muted,
                }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Steps */}
          <div style={{
            marginTop: 30, paddingTop: 18,
            borderTop: `1px solid rgba(32,28,26,.1)`,
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 0,
          }}>
            {[
              { n: '1', k: 'Open a tool', v: 'Play before reading.' },
              { n: '2', k: 'Change one thing', v: 'Move a slider or edit a value.' },
              { n: '3', k: 'Read the code', v: 'Connect the visual to the syntax.' },
              { n: '4', k: 'Remix it', v: 'Make it yours.' },
            ].map((r, i) => (
              <div key={i} style={{
                paddingRight: 20,
                borderRight: i < 3 ? `1px solid rgba(32,28,26,.08)` : 'none',
                paddingLeft: i === 0 ? 0 : 20,
              }}>
                <strong style={{
                  display: 'block', color: palette.accent,
                  fontSize: 13, fontWeight: 700, marginBottom: 3,
                }}>{r.n}. {r.k}</strong>
                <span style={{ fontSize: 13, color: palette.muted }}>{r.v}</span>
              </div>
            ))}
          </div>

          {/* Maker credit */}
          <div style={{
            position: 'absolute', bottom: 12, right: 18,
            fontFamily: '"DM Mono",monospace', fontSize: 10.5,
            color: palette.muted, letterSpacing: '.04em',
          }}>CC Fest · 2026</div>
        </section>

        {/* ── The Camp Arc ── */}
        <section style={{
          background: palette.panel,
          border: `2px solid ${palette.ink}`,
          borderRadius: 14,
          padding: spacious ? 36 : 28,
          marginBottom: gap,
          boxShadow: heavyShadow,
        }}>
          <SectionLabel palette={palette}>The Camp Arc</SectionLabel>
          <h2 style={dHeadStyle()}>Five sessions. One arc.</h2>
          <p style={{ margin: '8px 0 0', maxWidth: '70ch', color: palette.muted, fontSize: 15.5 }}>
            CC Fest Coding Camp runs five sessions over five weeks. The sequence moves from first marks to open studio. Each session builds on the last — but every tool and sketch also stands alone. Jump in anywhere.
          </p>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 12, marginTop: 22,
          }}>
            {c.sessions.map((s, i) => {
              const rotations = ['-0.6deg', '0.4deg', '-0.25deg', '0.55deg', '0deg'];
              return (
                <div key={i} style={{
                  background: `linear-gradient(180deg, ${palette.panel}, ${palette.paper})`,
                  border: `1.5px solid ${palette.line}`,
                  borderRadius: 14,
                  padding: spacious ? 16 : 14,
                  boxShadow: '0 3px 10px rgba(53,43,32,.07)',
                  transform: `rotate(${rotations[i]})`,
                }}>
                  <div style={{
                    fontFamily: '"DM Mono",monospace',
                    fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase',
                    color: palette.accent, marginBottom: 6,
                  }}>Session {s.n}</div>
                  <div style={{
                    fontFamily: '"Fraunces",serif', fontWeight: 700, fontSize: 16,
                    letterSpacing: '-0.015em', lineHeight: 1.15, marginBottom: 6,
                  }}>{s.title}</div>
                  <div style={{ fontSize: 12.5, color: palette.muted, lineHeight: 1.4, marginBottom: 12 }}>{s.blurb}</div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {s.tools.map((tool, j) => (
                      <span key={j} style={{
                        fontFamily: '"DM Sans",sans-serif',
                        fontSize: 10, fontWeight: 700, letterSpacing: '.04em',
                        padding: '3px 8px',
                        borderRadius: 999,
                        background: palette.panel,
                        border: `1.5px solid rgba(32,28,26,.1)`,
                        color: palette.ink,
                        lineHeight: 1.2,
                      }}>{tool}</span>
                    ))}
                  </div>

                  <div style={{
                    marginTop: 10,
                    fontFamily: '"DM Sans",sans-serif',
                    fontSize: 10, fontWeight: 700, letterSpacing: '.04em',
                    padding: '3px 8px',
                    borderRadius: 999,
                    background: 'rgba(45,106,79,.08)',
                    border: '1.5px solid rgba(45,106,79,.2)',
                    color: '#2d6a4f',
                    display: 'inline-block',
                  }}>⬡ Bridge: {s.bridge}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Where to start ── */}
        <section style={{
          background: palette.panel,
          border: `2px solid ${palette.ink}`,
          borderRadius: 14,
          padding: spacious ? 36 : 28,
          marginBottom: gap,
          boxShadow: heavyShadow,
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 10, marginBottom: 20,
          }}>
            <SectionLabel palette={palette}>Where to start</SectionLabel>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              fontSize: 12.5, color: palette.muted,
            }}>
              <a style={{ color: palette.ink, fontWeight: 700, textDecoration: 'none' }}>21 concept bridges</a>
              <span aria-hidden="true">·</span>
              <a style={{ color: palette.ink, fontWeight: 700, textDecoration: 'none' }}>66 workshop tools</a>
              <span aria-hidden="true">·</span>
              <a style={{ color: palette.ink, fontWeight: 700, textDecoration: 'none' }}>44 starter sketches</a>
            </div>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14,
          }}>
            {[
              {
                icon: '◎', title: 'Understand the idea',
                body: 'Start with a concept bridge when an idea feels fuzzy. See the mental model before syntax.',
                links: ['Color: Numbers Become Feeling', 'How p5.js Thinks About Time', 'Conditionals: Code Makes Choices'],
                cta: 'Concept Bridges →',
              },
              {
                icon: '⬡', title: 'Try the idea',
                body: 'Open a workshop tool, move a slider, predict what changes, then connect the canvas to the code.',
                links: ['Coordinate System Explorer', 'Shape + Color Explorer', 'For Loop Stepper'],
                cta: 'Workshop Tools →',
              },
              {
                icon: '✦', title: 'Remix into a project',
                body: 'Start from a working sketch. Change the smallest thing first, then make it yours.',
                links: ['Bouncing Ball Seed', 'Gravity Bounce Seed', 'Postcard Studio'],
                cta: 'Starter Sketches →',
              },
            ].map((card, i) => (
              <div key={i} style={{
                background: palette.paper,
                border: `2px solid ${palette.ink}`,
                borderRadius: 10,
                padding: spacious ? 22 : 18,
                display: 'flex', flexDirection: 'column', gap: 8,
              }}>
                <div style={{ fontSize: 22, color: palette.accent, lineHeight: 1 }}>{card.icon}</div>
                <h3 style={{
                  margin: 0, fontFamily: '"Fraunces",serif', fontWeight: 800,
                  fontSize: 17, letterSpacing: '-0.01em',
                }}>{card.title}</h3>
                <p style={{ margin: 0, fontSize: 13.5, color: palette.muted, lineHeight: 1.55 }}>{card.body}</p>
                <ul style={{ margin: '4px 0 8px', padding: 0, listStyle: 'none', display: 'grid', gap: 4 }}>
                  {card.links.map((l, j) => (
                    <li key={j} style={{
                      fontSize: 13, color: palette.accent, fontWeight: 600,
                    }}>
                      <span style={{ color: palette.muted, fontSize: 11, marginRight: 6 }}>→</span>
                      {l}
                    </li>
                  ))}
                </ul>
                <span style={{
                  marginTop: 'auto',
                  display: 'inline-block',
                  alignSelf: 'flex-start',
                  padding: '6px 14px',
                  borderRadius: 8, border: `2px solid ${palette.ink}`,
                  background: palette.panel,
                  color: palette.accent, fontWeight: 700, fontSize: 12,
                  boxShadow: '3px 3px 0 rgba(32,28,26,.12)',
                }}>{card.cta}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Tool norms strip ── */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '6px 20px',
          padding: '16px 22px',
          borderTop: `2px solid ${palette.ink}`,
          borderBottom: `2px solid ${palette.ink}`,
          background: palette.gold_soft,
          margin: `0 0 ${gap}px`,
        }}>
          <span style={{
            fontFamily: '"DM Sans",sans-serif',
            fontSize: 11, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase',
            color: palette.muted, marginRight: 4,
          }}>How to use these</span>
          {[
            'Change one thing at a time.',
            'Predict before you move the slider.',
            'Try a value that breaks your guess.',
            "You don't need to understand everything to make something.",
            'Unfinished work counts.',
          ].map((line, i) => (
            <span key={i} style={{
              fontSize: 13.5, fontWeight: 500, color: palette.ink,
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              <span style={{ color: palette.accent, fontSize: 11 }}>→</span>{line}
            </span>
          ))}
        </div>

        {/* ── Concept Bridges section ── */}
        <section style={{
          background: palette.panel,
          border: `2px solid ${palette.ink}`,
          borderRadius: 14,
          padding: spacious ? 36 : 28,
          marginBottom: gap,
          boxShadow: heavyShadow,
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            flexWrap: 'wrap', gap: 12, marginBottom: 6,
          }}>
            <BoldBlockLabel palette={palette}>Concept Bridges</BoldBlockLabel>
            <span style={{
              fontFamily: '"DM Mono",monospace',
              fontSize: 12, color: palette.muted, fontWeight: 500,
            }}>21 bridges</span>
          </div>
          <h2 style={dHeadStyle()}>Understand the idea before you chase the syntax.</h2>
          <p style={{ margin: '8px 0 0', maxWidth: '70ch', color: palette.muted, fontSize: 15.5 }}>
            Experiential bridges between a fuzzy idea and the p5.js function or programming pattern behind it. Not output tools, not starter sketches.
          </p>

          {/* Rhythm */}
          <div style={{
            marginTop: 22, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14,
            padding: '14px 0',
            borderTop: `1px solid ${palette.line}`,
            borderBottom: `1px solid ${palette.line}`,
          }}>
            {[
              ['Fuzzy idea', 'Name what feels confusing.'],
              ['See it', 'Watch the model move.'],
              ['Connect it', 'Meet the p5.js concept.'],
              ['Go next', 'Open a tool or sketch.'],
            ].map(([k, v], i) => (
              <div key={i} style={{ fontSize: 13.5 }}>
                <strong style={{ color: palette.ink, fontWeight: 700, display: 'block', marginBottom: 2 }}>{k}</strong>
                <span style={{ color: palette.muted }}>{v}</span>
              </div>
            ))}
          </div>

          {/* Bridge grid — 6 sample bridges */}
          <div style={{
            marginTop: 22,
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14,
          }}>
            {c.bridges.slice(0, 6).map((b, i) => (
              <article key={i} style={{
                background: palette.paper,
                border: `2px solid ${palette.ink}`,
                borderRadius: 10,
                padding: spacious ? 18 : 14,
                boxShadow: '3px 3px 0 rgba(32,28,26,.1)',
              }}>
                <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
                  <Pill palette={palette} variant="session">Foundations</Pill>
                  <Pill palette={palette} variant="bridge">Concept Bridge</Pill>
                </div>
                <h3 style={{
                  margin: '0 0 8px', fontFamily: '"Fraunces",serif', fontWeight: 800,
                  fontSize: 17, letterSpacing: '-0.01em', lineHeight: 1.2,
                }}>{b.name}</h3>
                <div style={{
                  fontFamily: '"DM Mono",monospace', fontSize: 11.5,
                  color: palette.muted, marginBottom: 12, lineHeight: 1.5,
                }}>{b.fns}</div>
                <div style={{
                  display: 'inline-block',
                  padding: '7px 14px',
                  borderRadius: 8, border: `2px solid ${palette.accent}`,
                  background: palette.accent, color: palette.paper,
                  fontWeight: 700, fontSize: 12,
                  boxShadow: '2px 2px 0 rgba(32,28,26,.14)',
                }}>Open Bridge</div>
              </article>
            ))}
          </div>

          <div style={{
            marginTop: 22, textAlign: 'center',
            paddingTop: 14, borderTop: `1px solid ${palette.line}`,
            fontSize: 13, color: palette.muted,
          }}>
            + 15 more bridges &nbsp;·&nbsp; <span style={{ color: palette.accent, fontWeight: 600 }}>See all 21 →</span>
          </div>
        </section>

        {/* ── Workshop Tools section ── */}
        <section style={{
          background: palette.panel,
          border: `2px solid ${palette.ink}`,
          borderRadius: 14,
          padding: spacious ? 36 : 28,
          marginBottom: gap,
          boxShadow: heavyShadow,
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
            flexWrap: 'wrap', gap: 12, marginBottom: 6,
          }}>
            <BoldBlockLabel palette={palette}>Workshop Tools</BoldBlockLabel>
            <span style={{
              fontFamily: '"DM Mono",monospace',
              fontSize: 12, color: palette.muted, fontWeight: 500,
            }}>66 tools</span>
          </div>
          <h2 style={dHeadStyle()}>Try the idea at a live demo station.</h2>
          <p style={{ margin: '8px 0 0', maxWidth: '70ch', color: palette.muted, fontSize: 15.5 }}>
            Each tool focuses on one concept. Change a slider, see what happens, then read the code with the canvas still in mind.
          </p>

          {/* Filter */}
          <DFilterBar palette={palette} variant={filterUI} suits={c.suits} />

          {/* Suit legend */}
          <p style={{
            margin: '10px 0 0', fontSize: 12, color: palette.muted,
            lineHeight: 1.7,
          }}>
            {c.suits.map((s, i) => (
              <span key={i}>
                <span style={{ color: palette.accent, fontWeight: 700 }}>{s.sym} {s.name}</span>
                <span style={{ color: palette.muted }}> · {s.sub}</span>
                {i < c.suits.length - 1 && <span style={{ color: palette.line }}> &nbsp; ·&nbsp; </span>}
              </span>
            ))}
          </p>

          {/* Tools */}
          <DToolsList palette={palette} tools={c.tools.slice(0, 9)} layout={layout} suitMap={suitMap} dense={dense} spacious={spacious} />

          <div style={{
            marginTop: 22, textAlign: 'center',
            paddingTop: 14, borderTop: `1px solid ${palette.line}`,
            fontSize: 13, color: palette.muted,
          }}>
            + 57 more tools across all 6 suits &nbsp;·&nbsp; <span style={{ color: palette.accent, fontWeight: 600 }}>See all 66 →</span>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer style={{
          marginTop: gap,
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
          <div style={{
            display: 'flex', gap: 22, fontSize: 13, color: palette.muted,
          }}>
            <a style={{ color: palette.muted, textDecoration: 'none' }}>ccfest.rocks</a>
            <a style={{ color: palette.muted, textDecoration: 'none' }}>Notion notes</a>
            <a style={{ color: palette.muted, textDecoration: 'none' }}>GitHub</a>
          </div>
        </footer>
      </div>
    </div>
  );
};

// ── Subcomponents ─────────────────────────────────────────────────────

const DButton = ({ palette, primary, ghost, children }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 8,
    borderRadius: 8, padding: '10px 16px',
    fontSize: 13.5, fontWeight: 700,
    border: ghost ? 'none' : `2px solid ${palette.ink}`,
    background: primary ? palette.accent : (ghost ? 'transparent' : palette.panel),
    color: primary ? palette.paper : (ghost ? palette.ink : palette.accent),
    boxShadow: ghost ? 'none' : '3px 3px 0 rgba(32,28,26,.14)',
  }}>{children}</span>
);

const SectionLabel = ({ palette, children }) => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', gap: 8,
    fontFamily: '"DM Sans",sans-serif',
    fontSize: 12, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase',
    color: palette.accent,
    marginBottom: 12,
  }}>
    <span style={{
      width: 8, height: 8, borderRadius: 999,
      background: palette.highlight,
    }}></span>
    {children}
  </div>
);

const BoldBlockLabel = ({ palette, children }) => (
  <div style={{
    display: 'inline-block',
    background: palette.accent, color: palette.paper,
    padding: '7px 14px', borderRadius: 8,
    fontFamily: '"DM Sans",sans-serif',
    fontSize: 12.5, fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase',
    boxShadow: '3px 3px 0 rgba(0,0,0,.15)',
  }}>{children}</div>
);

const Pill = ({ palette, variant, children }) => {
  const styles = {
    session: { background: palette.gold_soft, color: palette.ink, border: `1px solid rgba(32,28,26,.15)` },
    bridge:  { background: 'rgba(45,106,79,.08)', color: '#2d6a4f', border: '1px solid rgba(45,106,79,.2)' },
    type:    { background: palette.accent_soft, color: palette.accent, border: '1px solid rgba(200,57,29,.2)' },
  }[variant] || {};
  return (
    <span style={{
      ...styles,
      padding: '3px 9px',
      borderRadius: 999,
      fontSize: 10.5, fontWeight: 700, letterSpacing: '.06em',
    }}>{children}</span>
  );
};

const dHeadStyle = () => ({
  margin: '4px 0 0',
  fontFamily: '"Fraunces",Georgia,serif',
  fontWeight: 800,
  fontSize: 28,
  letterSpacing: '-0.025em',
  lineHeight: 1.15,
});

const DFilterBar = ({ palette, variant, suits }) => {
  if (variant === 'sidebar') {
    return (
      <div style={{
        marginTop: 22,
        display: 'grid', gridTemplateColumns: '200px 1fr', gap: 22,
      }}>
        <div style={{
          border: `2px solid ${palette.ink}`, borderRadius: 10, overflow: 'hidden',
          background: palette.paper,
        }}>
          <div style={{
            padding: '10px 14px', background: palette.ink, color: palette.paper,
            fontFamily: '"DM Mono",monospace',
            fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase',
          }}>Filter by suit</div>
          {[{id: 'all', sym: '◇', name: 'All', n: '66'}, ...suits.map(s => ({ ...s, n: '—' }))].map((s, i) => (
            <div key={s.id} style={{
              padding: '8px 14px',
              borderTop: i > 0 ? `1px solid ${palette.line}` : 'none',
              display: 'flex', alignItems: 'baseline', gap: 10,
              background: i === 0 ? palette.accent_soft : 'transparent',
            }}>
              <span style={{ color: palette.accent, width: 14, fontSize: 13, fontWeight: 700 }}>{s.sym}</span>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{s.name}</span>
              <span style={{
                marginLeft: 'auto',
                fontFamily: '"DM Mono",monospace', fontSize: 10.5,
                color: palette.muted,
              }}>{s.n}</span>
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
        marginTop: 22,
        display: 'flex', gap: 0,
        borderBottom: `2px solid ${palette.ink}`,
      }}>
        {[{id: 'all', sym: '', name: 'All 66'}, ...suits].map((s, i) => (
          <div key={s.id} style={{
            padding: '10px 16px',
            borderRight: i < 6 ? `1px solid ${palette.line}` : 'none',
            borderBottom: i === 0 ? `4px solid ${palette.accent}` : 'none',
            marginBottom: i === 0 ? -2 : 0,
            background: i === 0 ? palette.panel : 'transparent',
            fontSize: 13, fontWeight: 600,
          }}>
            {s.sym && <span style={{ color: palette.accent, marginRight: 6 }}>{s.sym}</span>}
            {s.name}
          </div>
        ))}
      </div>
    );
  }
  // chips (the original site's pattern)
  return (
    <div style={{ marginTop: 22, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {[{id: 'all', sym: '', name: 'All'}, ...suits].map(s => (
        <span key={s.id} style={{
          fontFamily: '"DM Mono",monospace',
          fontSize: 12, fontWeight: 500,
          padding: '6px 14px',
          borderRadius: 999,
          border: `1.5px solid ${s.id === 'all' ? palette.ink : palette.line}`,
          color: s.id === 'all' ? palette.paper : palette.muted,
          background: s.id === 'all' ? palette.ink : 'transparent',
          display: 'inline-flex', alignItems: 'center', gap: 5,
        }}>
          {s.sym && <span style={{ color: s.id === 'all' ? palette.gold : palette.accent }}>{s.sym}</span>}
          {s.name}
        </span>
      ))}
    </div>
  );
};

const DToolsList = ({ palette, tools, layout, suitMap, dense, spacious }) => {
  if (layout === 'list') {
    return (
      <ol style={{ margin: '22px 0 0', padding: 0, listStyle: 'none' }}>
        {tools.map((tool, i) => (
          <li key={tool.n} style={{
            display: 'grid',
            gridTemplateColumns: '48px 110px 1.4fr 2fr 110px',
            gap: 18, alignItems: 'baseline',
            padding: `${dense ? 12 : spacious ? 20 : 16}px 0`,
            borderTop: `1px solid ${palette.line}`,
            borderBottom: i === tools.length - 1 ? `1px solid ${palette.line}` : 'none',
          }}>
            <span style={{
              fontFamily: '"DM Mono",monospace', fontSize: 12, color: palette.muted,
            }}>№ {tool.n}</span>
            <span style={{
              fontFamily: '"DM Mono",monospace', fontSize: 11, fontWeight: 600,
              letterSpacing: '.04em', color: palette.accent,
            }}>{suitMap[tool.suit].sym} {suitMap[tool.suit].name}</span>
            <span style={{
              fontFamily: '"Fraunces",serif', fontWeight: 800, fontSize: 18,
              letterSpacing: '-0.015em', lineHeight: 1.2,
            }}>{tool.name}</span>
            <span style={{ fontSize: 13.5, color: palette.muted, lineHeight: 1.5 }}>{tool.blurb}</span>
            <span style={{
              fontFamily: '"DM Mono",monospace', fontSize: 11, color: palette.accent,
              textAlign: 'right', fontWeight: 600,
            }}>Launch →</span>
          </li>
        ))}
      </ol>
    );
  }
  if (layout === 'masonry') {
    return (
      <div style={{ marginTop: 22, columnCount: 3, columnGap: 14 }}>
        {tools.map(tool => (
          <article key={tool.n} style={{
            breakInside: 'avoid',
            marginBottom: 14,
            background: palette.paper,
            border: `2px solid ${palette.ink}`,
            borderRadius: 10,
            padding: spacious ? 16 : 12,
            boxShadow: '3px 3px 0 rgba(32,28,26,.1)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
              <Pill palette={palette} variant="session">{suitMap[tool.suit].sym} {suitMap[tool.suit].name} · {tool.n}</Pill>
              <Pill palette={palette} variant="type">Interactive</Pill>
            </div>
            <h3 style={{
              margin: '0 0 6px', fontFamily: '"Fraunces",serif', fontWeight: 800,
              fontSize: 16, letterSpacing: '-0.01em', lineHeight: 1.2,
            }}>{tool.name}</h3>
            <div style={{ fontSize: 13, color: palette.muted, lineHeight: 1.5 }}>{tool.blurb}</div>
          </article>
        ))}
      </div>
    );
  }
  // grid (default — matches original site)
  return (
    <div style={{
      marginTop: 22,
      display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14,
    }}>
      {tools.map(tool => (
        <article key={tool.n} style={{
          background: palette.paper,
          border: `2px solid ${palette.ink}`,
          borderRadius: 10,
          padding: spacious ? 20 : 16,
          boxShadow: '3px 3px 0 rgba(32,28,26,.1)',
          position: 'relative',
          display: 'flex', flexDirection: 'column', gap: 8,
        }}>
          {/* Card pip — top-left and bottom-right, like a playing card */}
          <div style={{
            position: 'absolute', top: 10, left: 10,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            fontFamily: '"DM Mono",monospace', fontSize: 11, color: palette.accent,
            fontWeight: 700, letterSpacing: 0, lineHeight: 1,
          }}>
            <span>{tool.n}</span>
            <span style={{ fontSize: 14, marginTop: 2 }}>{suitMap[tool.suit].sym}</span>
          </div>
          <div style={{ marginLeft: 36, marginBottom: 2, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <Pill palette={palette} variant="session">{suitMap[tool.suit].sym} {suitMap[tool.suit].name}</Pill>
            <Pill palette={palette} variant="type">Interactive</Pill>
          </div>
          <h3 style={{
            margin: 0, fontFamily: '"Fraunces",serif', fontWeight: 800,
            fontSize: 18, letterSpacing: '-0.01em', lineHeight: 1.2,
          }}>{tool.name}</h3>
          <p style={{ margin: 0, fontSize: 13.5, color: palette.muted, lineHeight: 1.55 }}>{tool.blurb}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginTop: 2 }}>
            {tool.tags.map((tag, j) => (
              <span key={j} style={{
                fontFamily: '"DM Mono",monospace', fontSize: 10.5,
                padding: '3px 8px', borderRadius: 999,
                background: palette.paper, border: `1px solid ${palette.line}`,
                color: palette.muted,
              }}>{tag}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
            <span style={{
              padding: '6px 12px',
              borderRadius: 8, border: `2px solid ${palette.accent}`,
              background: palette.accent, color: palette.paper,
              fontWeight: 700, fontSize: 12,
            }}>Launch</span>
            <span style={{
              padding: '6px 12px',
              borderRadius: 8, border: `2px solid ${palette.line}`,
              background: palette.panel, color: palette.accent,
              fontWeight: 700, fontSize: 12,
            }}>Notes</span>
          </div>
        </article>
      ))}
    </div>
  );
};

function bgPatternStyleD(kind, palette) {
  if (kind === 'dots-quiet') {
    // The original site's hero dot pattern
    return {
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Ccircle cx='2' cy='2' r='1.1' fill='%232c2a26' fill-opacity='0.09'/%3E%3Ccircle cx='12' cy='12' r='1.1' fill='%232c2a26' fill-opacity='0.09'/%3E%3C/svg%3E")`,
      backgroundSize: '20px 20px',
    };
  }
  if (kind === 'none') return {};
  if (kind === 'dots') {
    return {
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Ccircle cx='2' cy='2' r='1' fill='%232c2a26' fill-opacity='0.08'/%3E%3Ccircle cx='12' cy='12' r='1' fill='%232c2a26' fill-opacity='0.08'/%3E%3C/svg%3E")`,
      backgroundSize: '20px 20px',
    };
  }
  if (kind === 'grid') {
    return {
      backgroundImage: `linear-gradient(${palette.line} 1px, transparent 1px), linear-gradient(90deg, ${palette.line} 1px, transparent 1px)`,
      backgroundSize: '24px 24px',
    };
  }
  if (kind === 'hairlines') {
    return {
      backgroundImage: `linear-gradient(${palette.line} 1px, transparent 1px)`,
      backgroundSize: '100% 10px',
    };
  }
  return {};
}

window.DirectionD = DirectionD;
window.DButton = DButton;
window.DSectionLabel = SectionLabel;
window.DBoldBlockLabel = BoldBlockLabel;
window.DPill = Pill;
window.dHeadStyle = dHeadStyle;
window.bgPatternStyleD = bgPatternStyleD;
