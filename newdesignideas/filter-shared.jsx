// filter-shared.jsx
// Shared chrome used by every paradigm: injected stylesheet, the item card and
// the item row, plus small atoms (type tag, count, facet toggle, search input).
// Keeping these identical across paradigms makes the comparison about the
// FILTER chrome, not the result rendering.

const FS_STYLE = `
  .fs-root *{box-sizing:border-box}
  .fs-card{transition:border-color .14s ease, transform .14s ease, box-shadow .14s ease;
    cursor:default;background:var(--fs-paper)}
  .fs-card:hover{border-color:var(--fs-ink)!important;transform:translateY(-2px);
    box-shadow:0 6px 22px -12px rgba(0,0,0,.35)}
  .fs-open{opacity:0;transition:opacity .14s ease}
  .fs-card:hover .fs-open{opacity:1}
  .fs-input{appearance:none;outline:none;font:inherit;color:var(--fs-ink);
    background:var(--fs-paper);border:1px solid var(--fs-ink)}
  .fs-input::placeholder{color:var(--fs-muted)}
  .fs-fbtn{cursor:default;transition:background .12s ease, color .12s ease, border-color .12s ease;
    background:transparent;color:var(--fs-ink);border:1px solid var(--fs-rule);font:inherit}
  .fs-fbtn:hover{border-color:var(--fs-ink)}
  .fs-fbtn[data-on="1"]{background:var(--fs-ink);color:var(--fs-paper);border-color:var(--fs-ink)}
  .fs-tab{cursor:default;transition:color .12s ease}
  .fs-shelf{display:flex;gap:0;overflow-x:auto;scroll-snap-type:x proximity;
    scrollbar-width:thin;scrollbar-color:var(--fs-rule) transparent}
  .fs-shelf::-webkit-scrollbar{height:8px}
  .fs-shelf::-webkit-scrollbar-thumb{background:var(--fs-rule);border-radius:4px}
  .fs-shelf>*{scroll-snap-align:start;flex:0 0 auto}
  .fs-x{cursor:default;opacity:.6}.fs-x:hover{opacity:1}
  .fs-list-row{transition:background .1s ease}
  .fs-list-row:hover{background:var(--fs-paperAlt)}
`;

function FsStyle({ C }) {
  // Drive the stylesheet from CSS vars so theme/accent tweaks reach hover states.
  const vars = {
    '--fs-paper': C.paper, '--fs-paperAlt': C.paperAlt, '--fs-ink': C.ink,
    '--fs-muted': C.muted, '--fs-accent': C.accent, '--fs-rule': C.rule,
  };
  return (
    <React.Fragment>
      <style>{FS_STYLE}</style>
      <div style={vars} data-fs-vars="" />
    </React.Fragment>
  );
}

const FD = window.FilterData;

// Mono label, e.g. for eyebrows / meta.
const Mono = ({ C, children, style }) => (
  <span style={{ fontFamily: '"JetBrains Mono",ui-monospace,monospace', ...style }}>{children}</span>
);

// The type tag — a small bordered monospace chip that distinguishes Bridge /
// Tool / Sketch without a competing glyph.
const TypeTag = ({ C, type }) => {
  const t = FD.FS_TYPE[type];
  return (
    <span style={{
      fontFamily: '"JetBrains Mono",monospace', fontSize: 9.5, letterSpacing: '.1em',
      textTransform: 'uppercase', padding: '2px 6px', border: `1px solid ${C.rule}`,
      color: C.muted, whiteSpace: 'nowrap',
    }}>{t.label}</span>
  );
};

// Result count chip.
const CountPill = ({ C, n, total }) => (
  <span style={{
    fontFamily: '"JetBrains Mono",monospace', fontSize: 11, color: C.muted,
    letterSpacing: '.04em',
  }}>
    <span style={{ color: C.ink, fontWeight: 600 }}>{n}</span>
    {total != null && <span> / {total}</span>} result{n === 1 ? '' : 's'}
  </span>
);

// ── Item card (grids + shelves) ─────────────────────────────────────────────
function ItemCard({ C, item, dense, width }) {
  const suit = FD.FS_SUIT[item.suit];
  const pad = dense ? 16 : 20;
  return (
    <div className="fs-card" style={{
      border: `1px solid ${C.rule}`, padding: pad, width,
      display: 'flex', flexDirection: 'column', minHeight: dense ? 150 : 168,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <Mono C={C} style={{ fontSize: 10.5, color: C.muted, letterSpacing: '.06em' }}>{item.id}</Mono>
        <span style={{ fontSize: 16, color: C.accent }}>{suit.sym}</span>
      </div>
      <div style={{
        fontWeight: 600, fontSize: dense ? 15.5 : 16.5, letterSpacing: '-0.015em',
        lineHeight: 1.18, marginBottom: 8, textWrap: 'pretty',
      }}>{item.name}</div>
      <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.5, textWrap: 'pretty', flex: 1 }}>{item.blurb}</div>
      <div style={{
        marginTop: 14, paddingTop: 12, borderTop: `1px solid ${C.rule}`,
        display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
      }}>
        <TypeTag C={C} type={item.type} />
        <Mono C={C} style={{ fontSize: 10, color: C.muted, letterSpacing: '.04em' }}>
          {suit.name}{item.session !== '—' ? ` · S${item.session}` : ''} · {FD.FS_LEVEL[item.level].label}
        </Mono>
        <Mono C={C} style={{ fontSize: 10.5, color: C.accent, marginLeft: 'auto' }} className="fs-open">↗ Open</Mono>
      </div>
    </div>
  );
}

// ── Item row (command-bar list) ─────────────────────────────────────────────
function ItemRow({ C, item, dense }) {
  const suit = FD.FS_SUIT[item.suit];
  const py = dense ? 9 : 13;
  return (
    <div className="fs-list-row" style={{
      display: 'grid', gridTemplateColumns: '52px 26px 1.5fr 2.4fr 150px 70px',
      alignItems: 'center', borderTop: `1px solid ${C.rule}`,
    }}>
      <Mono C={C} style={{ padding: `${py}px 14px`, fontSize: 11.5, color: C.muted }}>{item.id}</Mono>
      <span style={{ fontSize: 15, color: C.accent }}>{suit.sym}</span>
      <div style={{ padding: `${py}px 14px ${py}px 4px`, fontWeight: 600, fontSize: 14.5, letterSpacing: '-0.01em' }}>{item.name}</div>
      <div style={{ padding: `${py}px 14px`, color: C.muted, fontSize: 13 }}>{item.blurb}</div>
      <div style={{ padding: `${py}px 14px`, display: 'flex', alignItems: 'center', gap: 8 }}>
        <TypeTag C={C} type={item.type} />
        <Mono C={C} style={{ fontSize: 10, color: C.muted }}>{item.session !== '—' ? `S${item.session}` : '—'}</Mono>
      </div>
      <Mono C={C} style={{ padding: `${py}px 14px`, fontSize: 11, color: C.accent, textAlign: 'right' }}>↗</Mono>
    </div>
  );
}

// ── Search input ────────────────────────────────────────────────────────────
function SearchInput({ C, value, onChange, placeholder, mono }) {
  return (
    <div style={{ position: 'relative', flex: 1, minWidth: 0 }}>
      <span style={{
        position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
        color: C.muted, fontSize: 13, pointerEvents: 'none',
        fontFamily: '"JetBrains Mono",monospace',
      }}>⌕</span>
      <input
        className="fs-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%', padding: '10px 12px 10px 30px',
          fontFamily: mono ? '"JetBrains Mono",monospace' : 'inherit',
          fontSize: mono ? 12.5 : 14,
        }}
      />
      {value && (
        <button className="fs-x fs-input" onClick={() => onChange('')} style={{
          position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
          border: 'none', background: 'transparent', color: C.muted, fontSize: 14,
          padding: '2px 6px',
        }}>✕</button>
      )}
    </div>
  );
}

// Section header reused across paradigms.
function StudyHead({ C, kicker, title, sub }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <Mono C={C} style={{
        fontSize: 10.5, letterSpacing: '.16em', textTransform: 'uppercase',
        color: C.accent, display: 'block', marginBottom: 10,
      }}>{kicker}</Mono>
      <h2 style={{
        margin: 0, fontFamily: '"Inter Tight",sans-serif', fontWeight: 500,
        fontSize: 'clamp(28px,3.4vw,40px)', lineHeight: 1.05, letterSpacing: '-0.03em',
        maxWidth: '22ch',
      }}>{title}</h2>
      {sub && <p style={{ margin: '12px 0 0', maxWidth: '58ch', color: C.muted, fontSize: 14.5, lineHeight: 1.5 }}>{sub}</p>}
    </div>
  );
}

// Empty state.
function EmptyState({ C, onReset }) {
  return (
    <div style={{
      border: `1px solid ${C.rule}`, padding: '56px 24px', textAlign: 'center',
      color: C.muted, marginTop: 24,
    }}>
      <div style={{ fontSize: 22, color: C.ink, marginBottom: 8 }}>⌀</div>
      <div style={{ fontSize: 15, color: C.ink, fontWeight: 600, marginBottom: 6 }}>Nothing matches those filters.</div>
      <div style={{ fontSize: 13.5, marginBottom: 18 }}>Try removing a constraint — the facets are AND-ed together.</div>
      <button className="fs-fbtn" onClick={onReset} style={{ padding: '8px 16px', fontSize: 12.5 }}>Clear all filters</button>
    </div>
  );
}

window.FilterShared = {
  FsStyle, Mono, TypeTag, CountPill, ItemCard, ItemRow,
  SearchInput, StudyHead, EmptyState,
};
