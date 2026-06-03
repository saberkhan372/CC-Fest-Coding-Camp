// catalog-card.jsx
// The chosen "Medium" card, generalized to any real catalog item. Shared frame
// (mono id + suit glyph, Inter Tight title, blurb, hairline footer); the one
// distinctive zone per type is what tells Bridge / Tool / Sketch apart.

const CCD = window.FilterData;

const CARD_STYLE = `
  .cc-card{transition:border-color .14s ease, transform .14s ease, box-shadow .14s ease;
    cursor:default}
  .cc-card:hover{border-color:var(--cc-ink, currentColor)!important;transform:translateY(-2px);
    box-shadow:0 8px 26px -14px rgba(0,0,0,.4)}
  .cc-card:hover .cc-open{opacity:1}
`;

const CC_VERB = { bridge: 'Understand it', tool: 'Play first', sketch: 'Remix it' };
const CC_KIND = { bridge: 'Bridge', tool: 'Tool', sketch: 'Sketch' };

function CatalogCardStyle() { return <style>{CARD_STYLE}</style>; }

// distinctive zone — bridge: idea → concept
function CcBridge({ C, item }) {
  return (
    <div style={{ margin: '12px 0 2px', display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: C.muted, fontFamily: '"JetBrains Mono",monospace' }}>
      <span style={{ fontStyle: 'italic', fontFamily: '"Inter Tight",sans-serif' }}>idea</span>
      <span style={{ color: C.accent }}>⟶</span>
      <span style={{ color: C.ink }}>{item.tags.join(' · ')}</span>
    </div>
  );
}
// tool: control strip
function CcTool({ C }) {
  return (
    <div style={{ margin: '12px 0 2px', display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ position: 'relative', height: 3, background: C.rule, borderRadius: 2, flex: 1 }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '46%', background: C.accent, borderRadius: 2 }} />
        <div style={{ position: 'absolute', left: 'calc(46% - 6px)', top: -4.5, width: 12, height: 12, borderRadius: '50%', background: C.paper, border: `1px solid ${C.ink}`, boxShadow: '0 1px 2px rgba(0,0,0,.2)' }} />
      </div>
      <span style={{ display: 'flex', gap: 4 }}>
        <i style={{ width: 6, height: 6, borderRadius: '50%', background: C.accent }} />
        <i style={{ width: 6, height: 6, borderRadius: '50%', background: C.rule }} />
      </span>
    </div>
  );
}
// sketch: editable code peek
function CcSketch({ C, item }) {
  return (
    <div style={{ margin: '12px 0 2px', background: C.paperAlt, border: `1px solid ${C.rule}`, padding: '7px 10px', fontFamily: '"JetBrains Mono",monospace', fontSize: 11.5, color: C.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
      <span style={{ color: C.muted }}>// change </span>
      <span style={{ color: C.accent, fontWeight: 600 }}>{item.tags[0]}</span>
    </div>
  );
}

function MediumCard({ C, item, dense }) {
  const suit = CCD.FS_SUIT[item.suit];
  const pad = dense ? 16 : 18;
  return (
    <div className="cc-card" style={{
      border: `1px solid ${C.rule}`, padding: pad, background: C.paper, '--cc-ink': C.ink,
      display: 'flex', flexDirection: 'column', minHeight: dense ? 168 : 182,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 11 }}>
        <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10.5, color: C.muted, letterSpacing: '.06em' }}>{item.id}</span>
        <span style={{ fontSize: 16, color: C.accent }}>{suit.sym}</span>
      </div>
      <div style={{ fontFamily: '"Inter Tight",sans-serif', fontWeight: 600, fontSize: dense ? 15.5 : 16.5, letterSpacing: '-0.015em', lineHeight: 1.16, marginBottom: 7, textWrap: 'pretty' }}>{item.name}</div>
      <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5, textWrap: 'pretty', flex: 1 }}>{item.blurb}</div>

      {item.type === 'bridge' && <CcBridge C={C} item={item} />}
      {item.type === 'tool' && <CcTool C={C} />}
      {item.type === 'sketch' && <CcSketch C={C} item={item} />}

      <div style={{ marginTop: 13, paddingTop: 11, borderTop: `1px solid ${C.rule}`, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 9.5, letterSpacing: '.1em', textTransform: 'uppercase', padding: '2px 6px', border: `1px solid ${C.rule}`, color: C.muted }}>{CC_KIND[item.type]}</span>
        <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, color: C.muted }}>{suit.name}{item.session !== '—' ? ` · S${item.session}` : ''}</span>
        <span className="cc-open" style={{ marginLeft: 'auto', fontFamily: '"JetBrains Mono",monospace', fontSize: 10, color: C.accent, opacity: 0, transition: 'opacity .14s' }}>{CC_VERB[item.type]} ↗</span>
      </div>
    </div>
  );
}

window.CatalogCard = { MediumCard, CatalogCardStyle };
