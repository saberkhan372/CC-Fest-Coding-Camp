// Direction C — "Almanac"
// Old-book typography. EB Garamond + Cormorant Garamond + Inter for utility.
// Cream paper. Drop caps, hand-set chapter heads, marginalia in the left gutter.
// Tools as a back-of-book index. Quiet, contemplative.

const DirectionC = ({ t, C }) => {
  const c = window.CC_CONTENT;
  const palette = C;
  const dense = t.density === 'compact';
  const spacious = t.density === 'spacious';

  const pad = dense ? 48 : spacious ? 92 : 72;
  const gap = dense ? 56 : spacious ? 120 : 80;

  const filterUI = t.filterUI;
  const layout = t.layout;
  const bgStyle = bgPatternStyleC(t.bgPattern, palette);

  const suitMap = Object.fromEntries(c.suits.map(s => [s.id, s]));

  // Gutter for marginalia — left column of text body
  const gutter = 160;

  return (
    <div
      data-screen-label="C · Almanac"
      style={{
        width: '100%',
        background: palette.paper,
        color: palette.ink,
        fontFamily: '"EB Garamond",Garamond,Georgia,serif',
        fontSize: dense ? 15 : spacious ? 18 : 16.5,
        lineHeight: 1.55,
        ...bgStyle,
      }}
    >
      {/* TITLE PAGE */}
      <header style={{ padding: `${spacious ? 96 : 72}px ${pad}px ${spacious ? 64 : 48}px`, textAlign: 'center' }}>
        <div style={{
          fontFamily: '"Inter Tight",sans-serif',
          fontSize: 10.5, letterSpacing: '.28em', textTransform: 'uppercase',
          color: palette.muted, marginBottom: 28,
        }}>
          ✦ &nbsp; an almanac for &nbsp; ✦
        </div>

        <h1 style={{
          margin: 0,
          fontFamily: '"Cormorant Garamond","EB Garamond",serif',
          fontWeight: 400,
          fontSize: 'clamp(76px, 10vw, 136px)',
          lineHeight: 1.02,
          letterSpacing: '-0.025em',
          color: palette.ink,
        }}>
          <span style={{ display: 'block', fontStyle: 'italic' }}>Creative</span>
          <span style={{ display: 'block', fontWeight: 500 }}>Coding,</span>
        </h1>
        <h2 style={{
          margin: '20px 0 0',
          fontFamily: '"EB Garamond",serif',
          fontWeight: 400,
          fontStyle: 'italic',
          fontSize: 'clamp(28px, 3.4vw, 44px)',
          color: palette.accent,
          letterSpacing: '-0.01em',
        }}>
          for anyone curious.
        </h2>

        <div style={{
          margin: '56px auto 0', maxWidth: 620,
          fontSize: spacious ? 19 : 17,
          lineHeight: 1.6,
          color: palette.ink,
          fontStyle: 'italic',
        }}>
          Being a small library of <strong style={{ fontStyle: 'normal' }}>twenty-one bridges</strong>, <strong style={{ fontStyle: 'normal' }}>sixty-six workshop tools</strong>, and <strong style={{ fontStyle: 'normal' }}>forty-four starter sketches</strong>, gathered over five sessions, from first marks to open studio. Free, open, and very much yours to remix.
        </div>

        {/* Ornamental rule */}
        <div style={{
          margin: '56px auto 0', maxWidth: 480,
          display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'center',
          color: palette.accent,
        }}>
          <span style={{ flex: 1, borderTop: `1px solid ${palette.rule}` }}></span>
          <span style={{ fontSize: 16 }}>✦ &nbsp; ❋ &nbsp; ✦</span>
          <span style={{ flex: 1, borderTop: `1px solid ${palette.rule}` }}></span>
        </div>

        <div style={{
          marginTop: 32,
          fontFamily: '"Inter Tight",sans-serif',
          fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase',
          color: palette.muted,
        }}>
          Edited by Saber Khan · CC Fest · Edition Three · MMXXVI
        </div>

        {/* Stats */}
        <div style={{
          marginTop: 64,
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 32, maxWidth: 800, margin: '64px auto 0',
        }}>
          {c.stats.map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: '"Cormorant Garamond",serif',
                fontWeight: 400, fontStyle: 'italic',
                fontSize: 72, lineHeight: 0.9, letterSpacing: '-0.02em',
                color: palette.accent,
              }}>{s.n}</div>
              <div style={{
                marginTop: 14,
                fontFamily: '"Inter Tight",sans-serif',
                fontSize: 10.5, letterSpacing: '.18em', textTransform: 'uppercase',
                color: palette.ink,
              }}>{s.label}</div>
              <div style={{ marginTop: 6, fontStyle: 'italic', color: palette.muted, fontSize: 13.5 }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </header>

      {/* TABLE OF CONTENTS */}
      <section style={{
        padding: `${gap}px ${pad}px`,
        borderTop: `1px solid ${palette.rule}`,
        borderBottom: `1px solid ${palette.rule}`,
        background: palette.paperAlt,
      }}>
        <AlmanacChapterHead palette={palette} chapter="Contents" leaf="❦" />

        <div style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0 80px' }}>
          {[
            ['I.', 'The Camp Arc', 'Five sessions, one arc'],
            ['II.', 'Concept Bridges', 'Twenty-one experiential explanations'],
            ['III.', 'Workshop Tools', 'Sixty-six demos and stations'],
            ['IV.', 'Starter Sketches', 'Forty-four working sketches'],
            ['V.', 'Norms of the House', 'Four rules for the curious'],
            ['VI.', 'Colophon', 'Credits & gratitudes'],
          ].map((row, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '46px 1fr auto 1fr',
              gap: 10,
              padding: '14px 0',
              borderBottom: `1px dotted ${palette.rule}`,
              alignItems: 'baseline',
            }}>
              <span style={{
                fontFamily: '"Inter Tight",sans-serif', fontSize: 11,
                letterSpacing: '.08em', color: palette.muted,
              }}>{row[0]}</span>
              <span style={{ fontFamily: '"EB Garamond",serif', fontSize: 18, fontWeight: 500 }}>{row[1]}</span>
              <span style={{ fontStyle: 'italic', color: palette.muted, fontSize: 14 }}>{row[2]}</span>
              <span style={{
                fontFamily: '"Inter Tight",sans-serif', fontSize: 11, color: palette.muted,
                textAlign: 'right', letterSpacing: '.04em',
              }}>p. {String((i + 1) * 7).padStart(3, '·')}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CHAPTER I — THE ARC */}
      <section style={{ padding: `${gap}px ${pad}px`, position: 'relative' }}>
        <AlmanacChapterHead palette={palette} num="I." chapter="The Camp Arc" sub="Wherein five sessions become one arc, and the curious begin." leaf="❦" />

        {/* Body with drop cap */}
        <div style={{
          marginTop: 40,
          maxWidth: 720, margin: '40px auto 0',
          display: 'grid', gridTemplateColumns: `${gutter}px 1fr`,
          gap: 32,
        }}>
          <aside style={{
            textAlign: 'right',
            fontFamily: '"Inter Tight",sans-serif',
            fontSize: 11, color: palette.muted,
            fontStyle: 'italic',
            paddingTop: spacious ? 24 : 12,
            lineHeight: 1.4,
          }}>
            <div style={{ marginBottom: 14 }}>An invitation:<br/>jump in anywhere.</div>
            <div style={{
              fontFamily: '"EB Garamond",serif',
              fontStyle: 'italic',
              fontSize: 13, color: palette.accent,
            }}>“Every tool stands alone.”</div>
          </aside>
          <div>
            <p style={{
              margin: 0,
              fontSize: spacious ? 18.5 : 17,
              lineHeight: 1.62,
              color: palette.ink,
            }}>
              <span style={{
                float: 'left',
                fontFamily: '"Cormorant Garamond",serif',
                fontWeight: 500,
                fontSize: 84,
                lineHeight: 0.85,
                color: palette.accent,
                paddingRight: 14, paddingTop: 6,
                marginLeft: -4,
              }}>F</span>
              ive sessions are gathered here, in order, like chapters in a small book. They move from first marks on the canvas through motion, system, data, and at last open studio. Each builds upon the last, yet every session — and every tool within it — also stands alone. <em>Jump in anywhere</em>; the canvas, after all, is yours.
            </p>
          </div>
        </div>

        {/* Sessions */}
        <div style={{ marginTop: 64, maxWidth: 920, margin: '64px auto 0' }}>
          {c.sessions.map((s, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: `${gutter}px 1fr`,
              gap: 32,
              padding: `${spacious ? 36 : 24}px 0`,
              borderBottom: `1px solid ${palette.rule}`,
            }}>
              <aside style={{
                textAlign: 'right',
                fontFamily: '"Inter Tight",sans-serif',
                fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase',
                color: palette.muted,
              }}>
                <div style={{
                  fontFamily: '"Cormorant Garamond",serif',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 46,
                  letterSpacing: '-0.02em',
                  color: palette.accent,
                  marginBottom: 8,
                  lineHeight: 1,
                }}>{['I','II','III','IV','V'][i]}.</div>
                <div>Session {s.n}</div>
              </aside>
              <div>
                <h3 style={{
                  margin: 0,
                  fontFamily: '"Cormorant Garamond",serif',
                  fontWeight: 500, fontSize: 32,
                  letterSpacing: '-0.015em',
                  lineHeight: 1.1,
                }}>{s.title}</h3>
                <p style={{
                  margin: '10px 0 18px', fontSize: 16, color: palette.muted, fontStyle: 'italic',
                }}>{s.blurb}</p>

                <div style={{
                  display: 'flex', flexWrap: 'wrap', gap: '6px 18px',
                  fontFamily: '"EB Garamond",serif', fontSize: 15,
                }}>
                  {s.tools.map((tool, j) => (
                    <span key={j} style={{ color: palette.ink, borderBottom: `1px solid ${palette.rule}` }}>
                      {tool}
                    </span>
                  ))}
                </div>

                <div style={{
                  marginTop: 18,
                  fontFamily: '"Inter Tight",sans-serif',
                  fontSize: 11, letterSpacing: '.12em', textTransform: 'uppercase',
                  color: palette.accent,
                }}>
                  ❦ &nbsp; Bridge: <span style={{ fontFamily: '"EB Garamond",serif', textTransform: 'none', letterSpacing: 0, fontSize: 14, color: palette.ink, fontStyle: 'italic' }}>{s.bridge}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CHAPTER II — BRIDGES */}
      <section id="bridges" style={{
        padding: `${gap}px ${pad}px`,
        borderTop: `1px solid ${palette.rule}`,
        background: palette.paperAlt,
      }}>
        <AlmanacChapterHead palette={palette} num="II." chapter="Concept Bridges" sub="Twenty-one short crossings between a fuzzy idea and the p5.js function or pattern behind it." leaf="❦" />

        <div style={{
          marginTop: 56, maxWidth: 980, margin: '56px auto 0',
          columnCount: 2, columnGap: 64,
          columnRule: `1px solid ${palette.rule}`,
        }}>
          {c.bridges.map((b, i) => (
            <div key={i} style={{
              breakInside: 'avoid',
              padding: `${dense ? 8 : 12}px 0`,
              display: 'grid',
              gridTemplateColumns: '54px 1fr',
              gap: 14,
              alignItems: 'baseline',
              borderBottom: `1px dotted ${palette.rule}`,
            }}>
              <span style={{
                fontFamily: '"Cormorant Garamond",serif',
                fontStyle: 'italic',
                fontSize: 18,
                color: palette.accent,
                textAlign: 'right',
              }}>{b.roman}.</span>
              <div>
                <div style={{
                  fontFamily: '"EB Garamond",serif',
                  fontWeight: 500, fontSize: 17.5,
                  lineHeight: 1.25,
                }}>{b.name}</div>
                <div style={{
                  marginTop: 2,
                  fontFamily: '"Inter Tight",sans-serif',
                  fontSize: 11, color: palette.muted, letterSpacing: '.02em',
                }}>{b.fns}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CHAPTER III — TOOLS */}
      <section id="tools" style={{ padding: `${gap}px ${pad}px`, borderTop: `1px solid ${palette.rule}` }}>
        <AlmanacChapterHead palette={palette} num="III." chapter="Workshop Tools" sub="Sixty-six small machines, organized by suit. Each tool focuses on one idea." leaf="❦" />

        {/* Rhythm */}
        <div style={{
          marginTop: 40, maxWidth: 920, margin: '40px auto 0',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 36, padding: '24px 0',
          borderTop: `1px solid ${palette.rule}`,
          borderBottom: `1px solid ${palette.rule}`,
          textAlign: 'center',
        }}>
          {c.rhythm.map((r, i) => (
            <div key={i}>
              <div style={{
                fontFamily: '"Cormorant Garamond",serif',
                fontStyle: 'italic',
                fontSize: 32,
                color: palette.accent,
                lineHeight: 1,
                marginBottom: 8,
              }}>{['i.','ii.','iii.','iv.'][i]}</div>
              <div style={{ fontFamily: '"EB Garamond",serif', fontSize: 17, fontWeight: 500 }}>{r.k}</div>
              <div style={{ marginTop: 4, fontStyle: 'italic', color: palette.muted, fontSize: 13.5 }}>{r.v}</div>
            </div>
          ))}
        </div>

        <AlmanacFilterBar palette={palette} variant={filterUI} suits={c.suits} />
        <AlmanacToolsList palette={palette} tools={c.tools} layout={layout} suitMap={suitMap} dense={dense} spacious={spacious} gutter={gutter} />
      </section>

      {/* CHAPTER IV — STARTER SKETCHES */}
      <section id="sketches" style={{
        padding: `${gap}px ${pad}px`,
        borderTop: `1px solid ${palette.rule}`,
        background: palette.paperAlt,
      }}>
        <AlmanacChapterHead palette={palette} num="IV." chapter="Starter Sketches" sub="A starting place. Open one, change the smallest thing first, make it yours." leaf="❦" />

        <div style={{
          marginTop: 48, maxWidth: 980, margin: '48px auto 0',
          columnCount: 3, columnGap: 56,
          columnRule: `1px solid ${palette.rule}`,
        }}>
          {c.sketches.map((s, i) => (
            <div key={i} style={{
              breakInside: 'avoid',
              padding: '10px 0',
              display: 'grid',
              gridTemplateColumns: '38px 1fr',
              gap: 12,
              alignItems: 'baseline',
              borderBottom: `1px dotted ${palette.rule}`,
            }}>
              <span style={{
                fontFamily: '"Inter Tight",sans-serif',
                fontSize: 10.5, color: palette.muted, letterSpacing: '.06em',
              }}>№ {String(i + 1).padStart(2, '0')}</span>
              <span style={{ fontFamily: '"EB Garamond",serif', fontWeight: 500, fontSize: 16.5 }}>{s}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CHAPTER V — NORMS */}
      <section style={{ padding: `${gap}px ${pad}px`, borderTop: `1px solid ${palette.rule}` }}>
        <AlmanacChapterHead palette={palette} num="V." chapter="Norms of the House" sub="Four small rules for the curious. None of them are about programming." leaf="❦" />

        <ol style={{
          margin: '56px auto 0', padding: 0, listStyle: 'none',
          maxWidth: 760,
        }}>
          {c.manifesto.map((m, i) => (
            <li key={i} style={{
              display: 'grid', gridTemplateColumns: '90px 1fr', gap: 28,
              padding: '24px 0',
              borderTop: `1px solid ${palette.rule}`,
              borderBottom: i === c.manifesto.length - 1 ? `1px solid ${palette.rule}` : 'none',
              alignItems: 'baseline',
            }}>
              <span style={{
                fontFamily: '"Cormorant Garamond",serif',
                fontWeight: 400, fontStyle: 'italic',
                fontSize: 48, color: palette.accent,
                textAlign: 'right', lineHeight: 1, letterSpacing: '-0.02em',
              }}>{['i.','ii.','iii.','iv.'][i]}</span>
              <span style={{
                fontFamily: '"EB Garamond",serif',
                fontSize: spacious ? 24 : 22, lineHeight: 1.35, fontWeight: 500,
              }}>{m}</span>
            </li>
          ))}
        </ol>

        {/* Colophon */}
        <div style={{
          margin: '72px auto 0', maxWidth: 680, textAlign: 'center',
          paddingTop: 36, borderTop: `1px solid ${palette.rule}`,
        }}>
          <div style={{
            fontFamily: '"Inter Tight",sans-serif',
            fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase',
            color: palette.muted, marginBottom: 18,
          }}>Colophon</div>
          <p style={{
            margin: 0, fontStyle: 'italic',
            fontSize: 15.5, color: palette.muted, lineHeight: 1.6,
          }}>
            Set in EB Garamond and Cormorant Garamond, with Inter Tight for utility. Built with the help of LLMs, classroom testing, and learning from Dan Shiffman, Lauren Lee McCarthy, Casey Reas, Patt Vira, Allison Parrish, the p5.js community, and the many people that have shared their teaching materials. <span style={{ fontStyle: 'normal', color: palette.accent }}>❦</span>
          </p>
          <div style={{
            marginTop: 28,
            fontFamily: '"Inter Tight",sans-serif',
            fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase',
            color: palette.muted,
          }}>
            CC Fest · {c.year} · ccfest.rocks
          </div>
        </div>
      </section>
    </div>
  );
};

const AlmanacChapterHead = ({ palette, num, chapter, sub, leaf }) => (
  <div style={{ textAlign: 'center' }}>
    {num && (
      <div style={{
        fontFamily: '"Cormorant Garamond",serif',
        fontStyle: 'italic',
        fontWeight: 400,
        fontSize: 38,
        color: palette.accent,
        letterSpacing: '-0.015em',
        marginBottom: 6,
      }}>Chapter {num}</div>
    )}
    <h2 style={{
      margin: 0,
      fontFamily: '"Cormorant Garamond","EB Garamond",serif',
      fontWeight: 500,
      fontSize: 'clamp(48px, 6vw, 76px)',
      lineHeight: 1,
      letterSpacing: '-0.025em',
      color: palette.ink,
    }}>{chapter}</h2>
    {sub && (
      <p style={{
        margin: '18px auto 0', maxWidth: 600,
        fontFamily: '"EB Garamond",serif',
        fontStyle: 'italic', fontSize: 17,
        color: palette.muted, lineHeight: 1.5,
      }}>{sub}</p>
    )}
    {leaf && (
      <div style={{
        margin: '24px auto 0', display: 'flex',
        alignItems: 'center', gap: 14, maxWidth: 280, justifyContent: 'center',
        color: palette.accent,
      }}>
        <span style={{ flex: 1, borderTop: `1px solid ${palette.rule}` }}></span>
        <span>{leaf}</span>
        <span style={{ flex: 1, borderTop: `1px solid ${palette.rule}` }}></span>
      </div>
    )}
  </div>
);

const AlmanacFilterBar = ({ palette, variant, suits }) => {
  if (variant === 'sidebar') {
    return (
      <div style={{
        marginTop: 48, maxWidth: 980, margin: '48px auto 0',
        display: 'grid', gridTemplateColumns: '220px 1fr',
        gap: 48, alignItems: 'start',
      }}>
        <div style={{ borderLeft: `2px solid ${palette.accent}`, paddingLeft: 18 }}>
          <div style={{
            fontFamily: '"Inter Tight",sans-serif',
            fontSize: 10.5, letterSpacing: '.18em', textTransform: 'uppercase',
            color: palette.muted, marginBottom: 16,
          }}>By suit</div>
          {[{id: 'all', sym: '◇', name: 'All sixty-six'}, ...suits].map(s => (
            <div key={s.id} style={{
              padding: '8px 0', display: 'flex', alignItems: 'baseline', gap: 12,
              borderBottom: `1px dotted ${palette.rule}`,
            }}>
              <span style={{ color: palette.accent, width: 14, fontSize: 14 }}>{s.sym}</span>
              <span style={{ fontFamily: '"EB Garamond",serif', fontSize: 17, fontWeight: 500 }}>{s.name}</span>
              <span style={{
                marginLeft: 'auto',
                fontFamily: '"Cormorant Garamond",serif',
                fontStyle: 'italic', fontSize: 13, color: palette.muted,
              }}>{s.sub || ''}</span>
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
        marginTop: 48, maxWidth: 980, margin: '48px auto 0',
        display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
        borderBottom: `2px solid ${palette.accent}`,
      }}>
        {[{id: 'all', sym: '◇', name: 'All', n: 66}, ...suits].map((s, i) => (
          <div key={s.id} style={{
            padding: '18px 12px 14px',
            borderRight: i < 6 ? `1px solid ${palette.rule}` : 'none',
            textAlign: 'center',
            position: 'relative',
          }}>
            <div style={{ fontSize: 18, color: palette.accent, marginBottom: 6 }}>{s.sym}</div>
            <div style={{ fontFamily: '"EB Garamond",serif', fontSize: 16, fontWeight: 500 }}>{s.name}</div>
            <div style={{
              marginTop: 4,
              fontFamily: '"Cormorant Garamond",serif',
              fontStyle: 'italic', fontSize: 12, color: palette.muted,
            }}>{s.sub || ''}</div>
            {i === 0 && (
              <div style={{
                position: 'absolute', left: 0, right: 0, bottom: -3, height: 6,
                background: palette.accent, borderRadius: 999,
              }}></div>
            )}
          </div>
        ))}
      </div>
    );
  }
  // chips
  return (
    <div style={{
      marginTop: 48, maxWidth: 980, margin: '48px auto 0',
      display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center',
    }}>
      {[{id: 'all', sym: '', name: 'All sixty-six'}, ...suits].map(s => (
        <span key={s.id} style={{
          fontFamily: '"EB Garamond",serif',
          fontSize: 15, padding: '7px 18px',
          border: `1px solid ${palette.rule}`,
          borderRadius: 999,
          color: s.id === 'all' ? palette.paper : palette.ink,
          background: s.id === 'all' ? palette.accent : 'transparent',
          borderColor: s.id === 'all' ? palette.accent : palette.rule,
        }}>
          {s.sym && <span style={{ marginRight: 6, color: s.id === 'all' ? palette.paper : palette.accent }}>{s.sym}</span>}
          {s.name}
        </span>
      ))}
    </div>
  );
};

const AlmanacToolsList = ({ palette, tools, layout, suitMap, dense, spacious, gutter }) => {
  if (layout === 'grid') {
    return (
      <div style={{
        marginTop: 48, maxWidth: 1080, margin: '48px auto 0',
        display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 0,
        borderTop: `1px solid ${palette.rule}`,
      }}>
        {tools.map((tool, i) => (
          <div key={tool.n} style={{
            padding: dense ? 18 : spacious ? 32 : 24,
            borderRight: i % 2 === 0 ? `1px solid ${palette.rule}` : 'none',
            borderBottom: `1px solid ${palette.rule}`,
            display: 'grid', gridTemplateColumns: '52px 1fr', gap: 16, alignItems: 'baseline',
          }}>
            <div style={{
              fontFamily: '"Cormorant Garamond",serif',
              fontStyle: 'italic', fontSize: 26,
              color: palette.accent, lineHeight: 1, textAlign: 'right',
            }}>{tool.n}.</div>
            <div>
              <div style={{
                fontFamily: '"Inter Tight",sans-serif',
                fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase',
                color: palette.muted, marginBottom: 4,
              }}>{suitMap[tool.suit].sym} &nbsp; {suitMap[tool.suit].name}</div>
              <div style={{
                fontFamily: '"EB Garamond",serif',
                fontWeight: 500, fontSize: 19, letterSpacing: '-0.01em',
                lineHeight: 1.2, marginBottom: 6,
              }}>{tool.name}</div>
              <div style={{ fontSize: 14.5, color: palette.muted, lineHeight: 1.5, fontStyle: 'italic' }}>{tool.blurb}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (layout === 'masonry') {
    return (
      <div style={{
        marginTop: 48, maxWidth: 1080, margin: '48px auto 0',
        columnCount: 3, columnGap: 48,
        columnRule: `1px solid ${palette.rule}`,
      }}>
        {tools.map(tool => (
          <div key={tool.n} style={{
            breakInside: 'avoid',
            padding: `${dense ? 10 : 14}px 0`,
            borderBottom: `1px dotted ${palette.rule}`,
          }}>
            <div style={{
              display: 'flex', gap: 10, alignItems: 'baseline',
              fontFamily: '"Inter Tight",sans-serif', fontSize: 10.5,
              color: palette.muted, marginBottom: 4,
            }}>
              <span style={{ color: palette.accent }}>{suitMap[tool.suit].sym}</span>
              <span>№ {tool.n}</span>
            </div>
            <div style={{
              fontFamily: '"EB Garamond",serif',
              fontWeight: 500, fontSize: 17, marginBottom: 4, lineHeight: 1.2,
            }}>{tool.name}</div>
            <div style={{ fontSize: 13.5, color: palette.muted, fontStyle: 'italic' }}>{tool.blurb}</div>
          </div>
        ))}
      </div>
    );
  }
  // list (default) — back-of-book index style, with marginalia
  return (
    <ol style={{ margin: '48px auto 0', padding: 0, listStyle: 'none', maxWidth: 980 }}>
      {tools.map((tool, i) => (
        <li key={tool.n} style={{
          display: 'grid',
          gridTemplateColumns: `${gutter}px 1fr ${dense ? '80px' : '100px'}`,
          gap: 28,
          padding: `${dense ? 12 : spacious ? 24 : 16}px 0`,
          borderBottom: `1px dotted ${palette.rule}`,
          alignItems: 'baseline',
        }}>
          <aside style={{
            textAlign: 'right',
            fontFamily: '"Inter Tight",sans-serif',
            fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase',
            color: palette.muted,
          }}>
            <span style={{ color: palette.accent, fontSize: 14 }}>{suitMap[tool.suit].sym}</span>
            &nbsp; {suitMap[tool.suit].name}
          </aside>
          <div>
            <div style={{
              fontFamily: '"EB Garamond",serif',
              fontWeight: 500, fontSize: 19.5, letterSpacing: '-0.01em',
              lineHeight: 1.2,
              display: 'flex', alignItems: 'baseline', gap: 12,
            }}>
              <span style={{
                fontFamily: '"Cormorant Garamond",serif',
                fontStyle: 'italic',
                fontSize: 22, color: palette.accent,
              }}>{tool.n}.</span>
              {tool.name}
            </div>
            <div style={{ marginTop: 4, fontSize: 14.5, color: palette.muted, fontStyle: 'italic' }}>
              {tool.blurb}
            </div>
          </div>
          <div style={{
            fontFamily: '"Inter Tight",sans-serif',
            fontSize: 11, color: palette.accent, letterSpacing: '.04em',
            textAlign: 'right',
          }}>p. {String((i + 1) * 3 + 12).padStart(3, '·')}</div>
        </li>
      ))}
    </ol>
  );
};

function bgPatternStyleC(kind, palette) {
  if (kind === 'none') return {};
  if (kind === 'dots') {
    return {
      backgroundImage: `radial-gradient(circle, ${palette.rule} 1px, transparent 1px)`,
      backgroundSize: '28px 28px',
    };
  }
  if (kind === 'grid') {
    return {
      backgroundImage: `linear-gradient(${palette.rule} 1px, transparent 1px), linear-gradient(90deg, ${palette.rule} 1px, transparent 1px)`,
      backgroundSize: '32px 32px',
    };
  }
  if (kind === 'hairlines') {
    // Antique ruled-paper feel
    return {
      backgroundImage: `linear-gradient(${palette.rule} 1px, transparent 1px)`,
      backgroundSize: '100% 28px',
    };
  }
  return {};
}

window.DirectionC = DirectionC;
