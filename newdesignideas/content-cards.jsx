// content-cards.jsx
// The three content types — Concept Bridge, Workshop Tool, Starter Sketch —
// rendered at three intensities of distinction so we can decide how hard to
// push "distinct" against "related". Shared DNA in every variant: Inter Tight
// titles, JetBrains Mono meta, hairline borders, one accent. What changes per
// type is the ANATOMY — the zone in the middle each card foregrounds.

const { useState: _ccUseState } = React;

// Representative real content, one of each type.
const CC_SAMPLE = {
  bridge: {
    kind: 'Concept Bridge', glyph: '⬡', id: 'VI',
    title: 'Distance Becomes Behavior',
    blurb: '“How close?” becomes a number — and that number becomes size, brightness, or opacity.',
    idea: '“How close is the mouse?”',
    concept: 'dist() · map()',
    verb: 'Understand the idea', meta: 'Foundations · S02',
  },
  tool: {
    kind: 'Workshop Tool', glyph: '◎', id: '№ 09',
    title: 'map() Explorer',
    blurb: 'Translate one range of numbers into another, live — the Swiss-army function of p5.',
    verb: 'Play before you read', meta: 'Motion · Beginner · S02',
  },
  sketch: {
    kind: 'Starter Sketch', glyph: '✦', id: 'S/09',
    title: 'Bouncing Ball Seed',
    blurb: 'One ball, two velocities, four walls. The most satisfying first remix in camp.',
    code: [
      ['let ', 'speed', ' = ', '4', ';   '],
      ['x += speed;'],
      ['if (x > width) speed *= ', '-1', ';'],
    ],
    verb: 'Change one value', meta: 'Motion · S02',
  },
};

// ── Shared atoms ────────────────────────────────────────────────────────────
function CCLockup({ C, glyph, kind, id, boxed }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
      {boxed ? (
        <span style={{
          width: 26, height: 26, flexShrink: 0, border: `1px solid ${C.ink}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, color: C.accent,
        }}>{glyph}</span>
      ) : (
        <span style={{ fontSize: 15, color: C.accent }}>{glyph}</span>
      )}
      <span style={{
        fontFamily: '"JetBrains Mono",monospace', fontSize: 9.5, letterSpacing: '.14em',
        textTransform: 'uppercase', color: C.muted,
      }}>{kind}</span>
      <span style={{
        marginLeft: 'auto', fontFamily: '"JetBrains Mono",monospace', fontSize: 10.5, color: C.muted,
      }}>{id}</span>
    </div>
  );
}

const CCTitle = ({ C, children, size = 18 }) => (
  <div style={{
    fontFamily: '"Inter Tight",sans-serif', fontWeight: 600, fontSize: size,
    letterSpacing: '-0.015em', lineHeight: 1.16, marginBottom: 8, textWrap: 'pretty',
  }}>{children}</div>
);

const CCBlurb = ({ C, children, clamp }) => (
  <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5, textWrap: 'pretty' }}>{children}</div>
);

function CCFooter({ C, verb, meta, cta }) {
  return (
    <div style={{
      marginTop: 14, paddingTop: 12, borderTop: `1px solid ${C.rule}`,
      display: 'flex', alignItems: 'center', gap: 10,
    }}>
      <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, color: C.accent, letterSpacing: '.04em' }}>{verb}</span>
      <span style={{ marginLeft: 'auto', fontFamily: '"JetBrains Mono",monospace', fontSize: 9.5, color: C.muted }}>{meta}</span>
      {cta && (
        <span style={{
          fontFamily: '"JetBrains Mono",monospace', fontSize: 10, padding: '4px 9px',
          background: C.accent, color: '#fff', whiteSpace: 'nowrap',
        }}>{cta}</span>
      )}
    </div>
  );
}

// ── Distinctive zones ───────────────────────────────────────────────────────
// Bridge: the crossing (idea → concept)
function BridgeCrossing({ C, item, full }) {
  if (full) {
    return (
      <div style={{
        margin: '14px 0 2px', border: `1px solid ${C.rule}`,
        display: 'grid', gridTemplateColumns: '1fr 28px 1fr', alignItems: 'stretch',
      }}>
        <div style={{ padding: '10px 12px' }}>
          <div style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 8.5, letterSpacing: '.12em', textTransform: 'uppercase', color: C.muted, marginBottom: 5 }}>Fuzzy idea</div>
          <div style={{ fontSize: 12.5, fontStyle: 'italic', lineHeight: 1.3 }}>{item.idea}</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.accent, fontSize: 16, borderLeft: `1px solid ${C.rule}`, borderRight: `1px solid ${C.rule}` }}>⟶</div>
        <div style={{ padding: '10px 12px' }}>
          <div style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 8.5, letterSpacing: '.12em', textTransform: 'uppercase', color: C.muted, marginBottom: 5 }}>p5.js concept</div>
          <div style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 12.5, color: C.ink, lineHeight: 1.3 }}>{item.concept}</div>
        </div>
      </div>
    );
  }
  // medium: one inline line
  return (
    <div style={{ margin: '12px 0 2px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: C.muted, fontFamily: '"JetBrains Mono",monospace' }}>
      <span style={{ fontStyle: 'italic', fontFamily: '"Inter Tight",sans-serif' }}>idea</span>
      <span style={{ color: C.accent }}>⟶</span>
      <span style={{ color: C.ink }}>{item.concept}</span>
    </div>
  );
}

// Tool: the control strip
function ToolControls({ C, full }) {
  const Track = ({ pct }) => (
    <div style={{ position: 'relative', height: 3, background: C.rule, borderRadius: 2, flex: 1 }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${pct}%`, background: C.accent, borderRadius: 2 }} />
      <div style={{ position: 'absolute', left: `calc(${pct}% - 6px)`, top: -4.5, width: 12, height: 12, borderRadius: '50%', background: C.paper, border: `1px solid ${C.ink}`, boxShadow: '0 1px 2px rgba(0,0,0,.2)' }} />
    </div>
  );
  if (full) {
    return (
      <div style={{ margin: '14px 0 2px', border: `1px solid ${C.ink}`, padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 11, background: C.paper }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 9.5, color: C.muted, width: 42 }}>start</span>
          <Track pct={32} />
          <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, color: C.ink, width: 24, textAlign: 'right' }}>0.3</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 9.5, color: C.muted, width: 42 }}>stop</span>
          <Track pct={68} />
          <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, color: C.ink, width: 24, textAlign: 'right' }}>200</span>
        </div>
      </div>
    );
  }
  // medium: a slim strip + dots
  return (
    <div style={{ margin: '12px 0 2px', display: 'flex', alignItems: 'center', gap: 10 }}>
      <Track pct={46} />
      <span style={{ display: 'flex', gap: 4 }}>
        <i style={{ width: 6, height: 6, borderRadius: '50%', background: C.accent }} />
        <i style={{ width: 6, height: 6, borderRadius: '50%', background: C.rule }} />
      </span>
    </div>
  );
}

// Sketch: the editable code peek
function SketchCode({ C, item, full }) {
  if (full) {
    return (
      <div style={{ margin: '14px 0 2px', background: '#1b1a17', border: `1px solid ${C.ink}`, padding: '11px 13px', fontFamily: '"JetBrains Mono",monospace', fontSize: 11.5, lineHeight: 1.65 }}>
        {item.code.map((line, i) => (
          <div key={i} style={{ color: 'rgba(244,240,232,0.85)', whiteSpace: 'pre' }}>
            {line.map((tok, j) => {
              const isVal = (tok === '4' || tok === '-1');
              const isKw = (tok === 'let ');
              return <span key={j} style={{ color: isVal ? '#f0a64a' : isKw ? '#8aa6c8' : 'rgba(244,240,232,0.85)', background: isVal ? 'rgba(240,166,74,0.14)' : 'transparent' }}>{tok}</span>;
            })}
            {i === 0 && <span style={{ color: 'rgba(244,240,232,0.4)' }}>// ← change me</span>}
          </div>
        ))}
      </div>
    );
  }
  // medium: one inset mono line
  return (
    <div style={{ margin: '12px 0 2px', background: C.paperAlt, border: `1px solid ${C.rule}`, padding: '7px 10px', fontFamily: '"JetBrains Mono",monospace', fontSize: 11.5, color: C.ink }}>
      let speed = <span style={{ color: C.accent, fontWeight: 600 }}>4</span>;
    </div>
  );
}

// ── Type cards (variant: whisper | medium | loud) ───────────────────────────
function BridgeCard({ C, variant }) {
  const item = CC_SAMPLE.bridge;
  const loud = variant === 'loud';
  const medium = variant === 'medium';
  return (
    <div style={{
      border: `1px solid ${loud ? C.accent : C.rule}`, padding: 18,
      background: loud ? C.paperAlt : C.paper,
      borderLeft: loud ? `3px solid ${C.accent}` : `1px solid ${C.rule}`,
    }}>
      <CCLockup C={C} glyph={item.glyph} kind={item.kind} id={item.id} boxed={loud} />
      <CCTitle C={C}>{item.title}</CCTitle>
      <CCBlurb C={C}>{item.blurb}</CCBlurb>
      {(medium || loud) && <BridgeCrossing C={C} item={item} full={loud} />}
      <CCFooter C={C} verb={item.verb} meta={item.meta} />
    </div>
  );
}

function ToolCard({ C, variant }) {
  const item = CC_SAMPLE.tool;
  const loud = variant === 'loud';
  const medium = variant === 'medium';
  return (
    <div style={{ border: `1px solid ${loud ? C.ink : C.rule}`, padding: 18, background: C.paper }}>
      <CCLockup C={C} glyph={item.glyph} kind={item.kind} id={item.id} boxed={loud} />
      <CCTitle C={C}>{item.title}</CCTitle>
      <CCBlurb C={C}>{item.blurb}</CCBlurb>
      {(medium || loud) && <ToolControls C={C} full={loud} />}
      <CCFooter C={C} verb={item.verb} meta={item.meta} cta={loud ? 'Launch ↗' : null} />
    </div>
  );
}

function SketchCard({ C, variant }) {
  const item = CC_SAMPLE.sketch;
  const loud = variant === 'loud';
  const medium = variant === 'medium';
  return (
    <div style={{
      border: `1px solid ${C.rule}`, padding: 18, background: C.paper,
      borderTop: loud ? `3px solid ${C.ink}` : `1px solid ${C.rule}`,
    }}>
      <CCLockup C={C} glyph={item.glyph} kind={item.kind} id={item.id} boxed={loud} />
      <CCTitle C={C}>{item.title}</CCTitle>
      <CCBlurb C={C}>{item.blurb}</CCBlurb>
      {(medium || loud) && <SketchCode C={C} item={item} full={loud} />}
      <CCFooter C={C} verb={item.verb} meta={item.meta} cta={loud ? 'Remix ↗' : null} />
    </div>
  );
}

// A column of the three types in one variant — the unit each artboard shows.
function TypeTrio({ C, variant }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <BridgeCard C={C} variant={variant} />
      <ToolCard C={C} variant={variant} />
      <SketchCard C={C} variant={variant} />
    </div>
  );
}

window.ContentCards = { CC_SAMPLE, BridgeCard, ToolCard, SketchCard, TypeTrio };
