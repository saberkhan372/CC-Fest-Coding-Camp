// session-spine.jsx
// Four renderings of the same five-station arc as a wayfinding device:
//   TopStepper  — horizontal progress timeline (global header)
//   SideRail    — vertical metro spine, current station expands (threads pages)
//   ArcBand     — editorial ascending arc (homepage hero)
//   CompactSpine— slim you-are-here strip for deep pages
// Every one reads the same SESSIONS + current index and calls onSelect.

const SP_STYLE = `
  .sp *{box-sizing:border-box}
  .sp-node{display:flex;align-items:center;justify-content:center;border-radius:50%;
    transition:transform .18s cubic-bezier(.3,.7,.4,1),background .18s,border-color .18s,color .18s;
    cursor:default;flex-shrink:0;font-family:"Inter Tight",sans-serif;font-weight:600}
  .sp-col{cursor:default}
  .sp-col:hover .sp-node{transform:translateY(-2px)}
  .sp-stop{cursor:default;transition:color .15s}
  .sp-stop:hover{color:var(--sp-ink)}
  .sp-chev{cursor:default;transition:opacity .15s,background .15s}
  .sp-chev:hover{opacity:1}
  .sp-sub{transition:opacity .2s}
`;

function SpineStyle({ C }) {
  return (
    <React.Fragment>
      <style>{SP_STYLE}</style>
    </React.Fragment>
  );
}

const SD = window.SessionData;
const _ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

// ── Node ────────────────────────────────────────────────────────────────────
function SpNode({ C, state, glyph, size = 30 }) {
  const past = state === 'past', cur = state === 'current';
  return (
    <div className="sp-node" style={{
      width: size, height: size, fontSize: size * 0.46,
      background: cur ? C.accent : past ? C.ink : C.paper,
      color: cur || past ? C.paper : C.muted,
      border: `1.5px solid ${cur ? C.accent : past ? C.ink : C.rule}`,
      boxShadow: cur ? `0 0 0 4px ${C.paper}, 0 0 0 5.5px ${C.accent}` : 'none',
      transform: cur ? 'translateY(-1px) scale(1.06)' : 'none',
    }}>{glyph}</div>
  );
}

// ── 1 · Top stepper ─────────────────────────────────────────────────────────
function TopStepper({ C, current, onSelect }) {
  const S = SD.SESSIONS, n = S.length;
  const progress = (current / (n - 1)) * 80; // span 10%..90%
  return (
    <div className="sp" style={{ '--sp-ink': C.ink }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14, padding: '0 2%' }}>
        <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10.5, fontStyle: 'italic', color: C.muted }}>↤ {S[0].arcTag}</span>
        <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10.5, fontStyle: 'italic', color: C.muted }}>{S[n - 1].arcTag} ↦</span>
      </div>
      <div style={{ position: 'relative' }}>
        {/* track */}
        <div style={{ position: 'absolute', top: 15, left: '10%', right: '10%', height: 1.5, background: C.rule }} />
        <div style={{ position: 'absolute', top: 15, left: '10%', width: `${progress}%`, height: 1.5, background: C.accent, transition: 'width .3s ease' }} />
        <div style={{ display: 'flex' }}>
          {S.map((s, i) => {
            const state = i < current ? 'past' : i === current ? 'current' : 'future';
            return (
              <div key={s.n} className="sp-col" onClick={() => onSelect(i)} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                <SpNode C={C} state={state} glyph={s.glyph} size={30} />
                <div style={{ marginTop: 12, textAlign: 'center', padding: '0 6px' }}>
                  <div style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, color: state === 'current' ? C.accent : C.muted, letterSpacing: '.08em' }}>{s.n}</div>
                  <div style={{ fontFamily: '"Inter Tight",sans-serif', fontWeight: state === 'current' ? 600 : 500, fontSize: 13.5, letterSpacing: '-0.01em', color: state === 'future' ? C.muted : C.ink, marginTop: 4, lineHeight: 1.2, textWrap: 'balance' }}>{s.title}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── 2 · Side rail (metro spine) ─────────────────────────────────────────────
function SideRail({ C, current, onSelect }) {
  const S = SD.SESSIONS, n = S.length;
  return (
    <div className="sp" style={{ '--sp-ink': C.ink }}>
      {S.map((s, i) => {
        const state = i < current ? 'past' : i === current ? 'current' : 'future';
        const cur = state === 'current';
        return (
          <div key={s.n} className="sp-stop" onClick={() => onSelect(i)} style={{ display: 'grid', gridTemplateColumns: '34px 1fr', columnGap: 14, color: state === 'future' ? C.muted : C.ink }}>
            {/* gutter with line + node */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              {i > 0 && <div style={{ position: 'absolute', top: 0, bottom: '50%', width: 1.5, background: i <= current ? C.accent : C.rule, transform: 'translateY(-1px)' }} />}
              <div style={{ position: 'absolute', top: '50%', bottom: 0, width: 1.5, background: i < current ? C.accent : C.rule, transform: 'translateY(15px)', display: i === n - 1 ? 'none' : 'block' }} />
              <div style={{ position: 'relative', zIndex: 1, paddingTop: 2 }}><SpNode C={C} state={state} glyph={s.glyph} size={28} /></div>
            </div>
            {/* text */}
            <div style={{ paddingBottom: cur ? 8 : 22 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10.5, color: cur ? C.accent : C.muted, letterSpacing: '.06em' }}>{s.n}</span>
                {cur && <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 8.5, letterSpacing: '.1em', textTransform: 'uppercase', color: C.paper, background: C.accent, padding: '2px 6px' }}>You are here</span>}
              </div>
              <div style={{ fontFamily: '"Inter Tight",sans-serif', fontWeight: cur ? 600 : 500, fontSize: 16, letterSpacing: '-0.015em', marginTop: 3 }}>{s.title}</div>
              {cur && (
                <div className="sp-sub" style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 9 }}>
                  <div style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.45 }}>{s.focus}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: '"JetBrains Mono",monospace', fontSize: 11 }}>
                    <span style={{ color: C.accent }}>⬡</span>
                    <span style={{ color: C.ink }}>{s.bridge.name}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 2, paddingLeft: 2 }}>
                    {s.tools.map((tl, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 12.5 }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.rule, flexShrink: 0 }} />
                        <span style={{ color: C.accent, fontSize: 11 }}>{SD.SUIT_GLYPH[tl.suit]}</span>
                        <span>{tl.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── 3 · Arc band (editorial ascent) ─────────────────────────────────────────
function ArcBand({ C, current, onSelect }) {
  const S = SD.SESSIONS, n = S.length;
  const H = 150;
  const pts = S.map((s, i) => {
    const t = i / (n - 1);
    const x = 8 + t * 84;                 // 8%..92%
    const y = 78 - _ease(t) * 52;         // low (78) → high (26)
    return { x, y };
  });
  const path = pts.map((p, i) => `${i ? 'L' : 'M'} ${p.x} ${p.y}`).join(' ');
  const progPath = pts.slice(0, current + 1).map((p, i) => `${i ? 'L' : 'M'} ${p.x} ${p.y}`).join(' ');
  return (
    <div className="sp" style={{ '--sp-ink': C.ink, background: C.paperAlt, border: `1px solid ${C.rule}`, padding: '8px 8px 18px' }}>
      <div style={{ position: 'relative', height: H }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <path d={path} fill="none" stroke={C.rule} strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
          <path d={progPath} fill="none" stroke={C.accent} strokeWidth="1" vectorEffect="non-scaling-stroke" style={{ transition: 'all .3s ease' }} />
        </svg>
        {S.map((s, i) => {
          const state = i < current ? 'past' : i === current ? 'current' : 'future';
          return (
            <div key={s.n} className="sp-col" onClick={() => onSelect(i)} style={{ position: 'absolute', left: `${pts[i].x}%`, top: `${pts[i].y}%`, transform: 'translate(-50%,-50%)', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <SpNode C={C} state={state} glyph={s.glyph} size={34} />
            </div>
          );
        })}
      </div>
      {/* tidy label row beneath the curve */}
      <div style={{ display: 'flex', marginTop: 6 }}>
        {S.map((s, i) => {
          const state = i < current ? 'past' : i === current ? 'current' : 'future';
          return (
            <div key={s.n} className="sp-col" onClick={() => onSelect(i)} style={{ flex: 1, textAlign: 'center', padding: '0 6px' }}>
              <div style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 9.5, color: state === 'current' ? C.accent : C.muted, letterSpacing: '.08em' }}>{s.arcTag}</div>
              <div style={{ fontFamily: '"Inter Tight",sans-serif', fontWeight: state === 'current' ? 600 : 500, fontSize: 12.5, color: state === 'future' ? C.muted : C.ink, marginTop: 3, lineHeight: 1.2 }}>{s.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── 4 · Compact spine (deep pages) ──────────────────────────────────────────
function CompactSpine({ C, current, onSelect }) {
  const S = SD.SESSIONS, n = S.length, s = S[current];
  const Chev = ({ dir, disabled, onClick }) => (
    <button className="sp-chev" onClick={disabled ? undefined : onClick} disabled={disabled} style={{
      appearance: 'none', border: `1px solid ${C.rule}`, background: 'transparent', color: disabled ? C.rule : C.ink,
      width: 28, height: 28, cursor: 'default', opacity: disabled ? 0.5 : 0.8, fontSize: 13,
    }}>{dir === 'prev' ? '‹' : '›'}</button>
  );
  return (
    <div className="sp" style={{ '--sp-ink': C.ink, display: 'flex', alignItems: 'center', gap: 16, border: `1px solid ${C.ink}`, padding: '10px 14px', flexWrap: 'wrap' }}>
      <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 9.5, letterSpacing: '.14em', textTransform: 'uppercase', color: C.muted }}>The arc</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
        {S.map((ss, i) => (
          <React.Fragment key={ss.n}>
            {i > 0 && <div style={{ width: 18, height: 1.5, background: i <= current ? C.accent : C.rule }} />}
            <button onClick={() => onSelect(i)} title={ss.title} style={{
              appearance: 'none', border: 'none', background: 'transparent', cursor: 'default', padding: 0,
              width: 13, height: 13, borderRadius: '50%', flexShrink: 0,
              backgroundColor: i === current ? C.accent : i < current ? C.ink : C.paper,
              boxShadow: i === current ? `0 0 0 3px ${C.paper}, 0 0 0 4px ${C.accent}` : `inset 0 0 0 1.5px ${i < current ? C.ink : C.rule}`,
            }} />
          </React.Fragment>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, minWidth: 0 }}>
        <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 11, color: C.accent }}>{s.n}</span>
        <span style={{ fontFamily: '"Inter Tight",sans-serif', fontWeight: 600, fontSize: 14.5, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>{s.title}</span>
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
        <Chev dir="prev" disabled={current === 0} onClick={() => onSelect(current - 1)} />
        <Chev dir="next" disabled={current === n - 1} onClick={() => onSelect(current + 1)} />
      </div>
    </div>
  );
}

window.SessionSpine = { SpineStyle, SpNode, TopStepper, SideRail, ArcBand, CompactSpine };
