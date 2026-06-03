// session-page.jsx
// Two destinations the spine points to:
//   SessionDetail — the panel for the currently-selected station (overview)
//   DeepToolPage  — a representative tool page, showing how the arc spine and a
//                   within-session station rail orient you on a deep page.

const PG = window.SessionData;
const PGS = window.SessionSpine;
const { useState: _pgUseState, useEffect: _pgUseEffect } = React;

// Compact station card used in the session grid.
function StationCard({ C, tool, num }) {
  return (
    <div style={{ border: `1px solid ${C.rule}`, background: C.paper, padding: 16, display: 'flex', flexDirection: 'column', minHeight: 116 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, color: C.muted }}>{num}</span>
        <span style={{ fontSize: 14, color: C.accent }}>{PG.SUIT_GLYPH[tool.suit]}</span>
      </div>
      <div style={{ fontFamily: '"Inter Tight",sans-serif', fontWeight: 600, fontSize: 15, letterSpacing: '-0.015em', lineHeight: 1.18, flex: 1, textWrap: 'pretty' }}>{tool.name}</div>
      <div style={{ marginTop: 12, fontFamily: '"JetBrains Mono",monospace', fontSize: 10, color: C.accent }}>↗ Launch</div>
    </div>
  );
}

function SessionDetail({ C, current, onSelect }) {
  const S = PG.SESSIONS, n = S.length, s = S[current];
  return (
    <div style={{ background: C.paper }}>
      {/* head */}
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', columnGap: 22, alignItems: 'start', borderBottom: `1px solid ${C.ink}`, paddingBottom: 22 }}>
        <div style={{
          fontFamily: '"Inter Tight",sans-serif', fontWeight: 500, fontSize: 76, lineHeight: 0.85,
          letterSpacing: '-0.05em', color: C.accent, fontFeatureSettings: '"tnum"',
        }}>{s.n}</div>
        <div>
          <div style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: C.muted, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: C.accent, fontSize: 13 }}>{s.glyph}</span> {PG.SUIT_NAME[s.suit]} · Station {current + 1} of {n}
          </div>
          <h2 style={{ margin: 0, fontFamily: '"Inter Tight",sans-serif', fontWeight: 500, fontSize: 'clamp(28px,3.2vw,40px)', letterSpacing: '-0.03em', lineHeight: 1.04 }}>{s.title}</h2>
          <p style={{ margin: '12px 0 0', fontSize: 16, color: C.ink, maxWidth: '40ch', lineHeight: 1.5 }}>{s.focus}</p>
        </div>
      </div>

      {/* anchoring bridge */}
      <div style={{ marginTop: 24, border: `1px solid ${C.accent}`, borderLeft: `3px solid ${C.accent}`, background: C.paperAlt, padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 20, color: C.accent }}>⬡</span>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 9.5, letterSpacing: '.12em', textTransform: 'uppercase', color: C.muted, marginBottom: 4 }}>Anchoring concept bridge</div>
          <div style={{ fontFamily: '"Inter Tight",sans-serif', fontWeight: 600, fontSize: 17, letterSpacing: '-0.015em' }}>{s.bridge.name}</div>
        </div>
        <div style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 12, color: C.ink }}>{s.bridge.fns}</div>
        <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, padding: '6px 11px', background: C.accent, color: '#fff' }}>Start here ↗</span>
      </div>

      {/* stations */}
      <div style={{ marginTop: 26 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10.5, letterSpacing: '.14em', textTransform: 'uppercase', color: C.muted }}>Stations in this session</div>
          <div style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 11, color: C.muted }}>{s.tools.length} tools · jump in anywhere</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
          {s.tools.map((tl, i) => <StationCard key={i} C={C} tool={tl} num={`${s.n}.${i + 1}`} />)}
        </div>
      </div>

      {/* prev / next session */}
      <div style={{ marginTop: 28, paddingTop: 18, borderTop: `1px solid ${C.rule}`, display: 'flex', justifyContent: 'space-between', gap: 12 }}>
        <button onClick={() => current > 0 && onSelect(current - 1)} disabled={current === 0} style={navBtn(C, current === 0)}>
          <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, color: C.muted }}>‹ Previous</span>
          <span style={{ fontWeight: 600, fontSize: 14 }}>{current > 0 ? S[current - 1].title : '—'}</span>
        </button>
        <button onClick={() => current < n - 1 && onSelect(current + 1)} disabled={current === n - 1} style={{ ...navBtn(C, current === n - 1), textAlign: 'right', alignItems: 'flex-end' }}>
          <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, color: C.muted }}>Next ›</span>
          <span style={{ fontWeight: 600, fontSize: 14 }}>{current < n - 1 ? S[current + 1].title : '—'}</span>
        </button>
      </div>
    </div>
  );
}

function navBtn(C, disabled) {
  return {
    appearance: 'none', border: `1px solid ${C.rule}`, background: 'transparent', color: disabled ? C.muted : C.ink,
    cursor: 'default', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 4,
    minWidth: 180, opacity: disabled ? 0.5 : 1, fontFamily: '"Inter Tight",sans-serif',
  };
}

// Striped placeholder for the live sketch area.
function SketchPlaceholder({ C, label }) {
  const stripe = `repeating-linear-gradient(135deg, ${C.rule} 0 1px, transparent 1px 11px)`;
  return (
    <div style={{ border: `1px solid ${C.rule}`, background: C.paperAlt, backgroundImage: stripe, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 11, color: C.muted, background: C.paper, padding: '4px 10px', border: `1px solid ${C.rule}` }}>{label}</span>
    </div>
  );
}

// A representative deep tool page: shows how the spine threads down to one tool.
function DeepToolPage({ C, current, onSelect }) {
  const S = PG.SESSIONS, s = S[current];
  const [station, setStation] = _pgUseState(0);
  _pgUseEffect(() => { setStation(0); }, [current]);
  const tool = s.tools[Math.min(station, s.tools.length - 1)];

  return (
    <div>
      {/* arc-level wayfinding */}
      <PGS.CompactSpine C={C} current={current} onSelect={onSelect} />

      <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '1fr 230px', gap: 24, alignItems: 'start' }}>
        {/* the tool */}
        <div>
          <div style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 11, color: C.muted, marginBottom: 12 }}>
            Camp <span style={{ color: C.rule }}>/</span> <span onClick={() => {}} style={{ color: C.muted }}>{s.n} {s.title}</span> <span style={{ color: C.rule }}>/</span> <span style={{ color: C.ink }}>{tool.name}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{ fontSize: 20, color: C.accent }}>{PG.SUIT_GLYPH[tool.suit]}</span>
            <h2 style={{ margin: 0, fontFamily: '"Inter Tight",sans-serif', fontWeight: 500, fontSize: 32, letterSpacing: '-0.03em' }}>{tool.name}</h2>
          </div>
          <SketchPlaceholder C={C} label="live p5.js sketch" />
          <div style={{ marginTop: 14, display: 'flex', gap: 8, fontFamily: '"JetBrains Mono",monospace', fontSize: 11, color: C.muted }}>
            <span style={{ border: `1px solid ${C.rule}`, padding: '4px 9px' }}>Open ↗</span>
            <span style={{ border: `1px solid ${C.rule}`, padding: '4px 9px' }}>Read the code</span>
            <span style={{ border: `1px solid ${C.rule}`, padding: '4px 9px' }}>Notion notes</span>
          </div>
        </div>

        {/* within-session station rail */}
        <aside style={{ border: `1px solid ${C.ink}`, padding: '14px 14px 16px' }}>
          <div style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 9.5, letterSpacing: '.12em', textTransform: 'uppercase', color: C.muted, marginBottom: 12 }}>In this session</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {s.tools.map((tl, i) => {
              const on = i === station;
              return (
                <button key={i} onClick={() => setStation(i)} style={{
                  appearance: 'none', border: 'none', background: 'transparent', cursor: 'default', textAlign: 'left',
                  display: 'grid', gridTemplateColumns: '20px 1fr', gap: 8, alignItems: 'center', padding: '7px 0',
                  borderTop: i ? `1px solid ${C.rule}` : 'none', color: on ? C.ink : C.muted,
                }}>
                  <span style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                    <span style={{ width: 9, height: 9, borderRadius: '50%', background: on ? C.accent : C.paper, boxShadow: on ? `0 0 0 3px ${C.paper},0 0 0 4px ${C.accent}` : `inset 0 0 0 1.5px ${C.rule}` }} />
                  </span>
                  <span style={{ fontSize: 13, fontWeight: on ? 600 : 400, letterSpacing: '-0.01em', lineHeight: 1.25 }}>{tl.name}</span>
                </button>
              );
            })}
          </div>
          <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.rule}`, display: 'flex', justifyContent: 'space-between' }}>
            <button onClick={() => setStation(Math.max(0, station - 1))} disabled={station === 0} style={miniNav(C, station === 0)}>‹ Prev</button>
            <button onClick={() => setStation(Math.min(s.tools.length - 1, station + 1))} disabled={station === s.tools.length - 1} style={miniNav(C, station === s.tools.length - 1)}>Next ›</button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function miniNav(C, disabled) {
  return {
    appearance: 'none', border: `1px solid ${C.rule}`, background: 'transparent', color: disabled ? C.rule : C.ink,
    cursor: 'default', padding: '5px 10px', fontFamily: '"JetBrains Mono",monospace', fontSize: 10.5, opacity: disabled ? 0.5 : 1,
  };
}

window.SessionPage = { SessionDetail, DeepToolPage };
