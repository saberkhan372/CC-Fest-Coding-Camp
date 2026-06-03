// filter-paradigms.jsx
// The four filter/taxonomy paradigms. Each is self-contained, holds its own
// filter state (so switching paradigms starts clean), and renders the SAME
// ItemCard/ItemRow so the comparison is purely about the filtering chrome.

const FD2 = window.FilterData;
const FSH = window.FilterShared;
const {
  FS_TYPES, FS_SUITS, FS_LEVELS, FS_PATHWAYS, FS_SESSIONS, FS_DATA,
  FS_SUIT, FS_LEVEL, FS_PATHWAY, FS_SESSION,
  fsEmptyFilter, fsFilter, fsCount, fsToggleSet, fsActiveCount,
} = FD2;
const { Mono, CountPill, ItemCard, ItemRow, SearchInput, StudyHead, EmptyState } = FSH;

const { useState, useMemo } = React;

// ── In-page segmented control (single-select, boxed) ────────────────────────
function SegSingle({ C, value, options, onChange, grow }) {
  return (
    <div style={{ display: 'inline-flex', border: `1px solid ${C.ink}` }}>
      {options.map((o, i) => {
        const on = o.id === value;
        return (
          <button key={o.id} className="fs-fbtn" data-on={on ? '1' : '0'}
            onClick={() => onChange(o.id)}
            style={{
              border: 'none', borderLeft: i ? `1px solid ${C.rule}` : 'none',
              padding: '8px 14px', fontSize: 12.5, fontWeight: 500,
              flex: grow ? 1 : 'none', whiteSpace: 'nowrap',
              display: 'flex', alignItems: 'center', gap: 7,
            }}>
            {o.sym && <span style={{ color: on ? C.paper : C.accent }}>{o.sym}</span>}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

// Responsive card grid of floating hairline cards.
function CardGrid({ C, items, dense }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(${dense ? 232 : 258}px, 1fr))`,
      gap: dense ? 10 : 14,
    }}>
      {items.map(it => <ItemCard key={it.id + it._g} C={C} item={it} dense={dense} />)}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PARADIGM A — LENS & REFINE
// One "Organize by" control regroups the whole catalog; a slim refine row
// (type + level + search) narrows within. Taxonomy as a view.
// ═══════════════════════════════════════════════════════════════════════════
function ParadigmLens({ C, dense }) {
  const [f, setF] = useState(fsEmptyFilter());
  const [lens, setLens] = useState('suits');
  const [type, setType] = useState('all');

  const setQ = (q) => setF(p => ({ ...p, q }));
  const setLevel = (lv) => setF(p => ({ ...p, levels: fsToggleSet(p.levels, lv) }));

  // Apply type as a single optional constraint.
  const eff = useMemo(() => {
    const c = { ...f, types: type === 'all' ? new Set() : new Set([type]) };
    return c;
  }, [f, type]);

  const matched = useMemo(() => fsFilter(eff), [eff]);

  const groups = useMemo(() => {
    if (lens === 'suits') return FS_SUITS.map(s => ({ key: s.id, label: s.name, sym: s.sym, sub: s.sub }));
    if (lens === 'sessions') return FS_SESSIONS.map(s => ({ key: s.id, label: s.id === '—' ? 'Support' : `Session ${s.id}`, sub: s.title }));
    if (lens === 'levels') return FS_LEVELS.map(l => ({ key: l.id, label: l.label, sub: l.sub }));
    return FS_PATHWAYS.map(p => ({ key: p.id, label: p.label, sym: p.sym, sub: 'an intent, not a category' }));
  }, [lens]);

  const itemsFor = (key) => {
    if (lens === 'pathways') return matched.filter(it => it.pathways.includes(key)).map(it => ({ ...it, _g: key }));
    const field = { suits: 'suit', sessions: 'session', levels: 'level' }[lens];
    return matched.filter(it => it[field] === key).map(it => ({ ...it, _g: key }));
  };

  const nonEmpty = groups.map(g => ({ ...g, items: itemsFor(g.key) })).filter(g => g.items.length);

  return (
    <div>
      <StudyHead C={C} kicker="Paradigm A · Lens & Refine"
        title="Organize the catalog, don't just filter it."
        sub="One primary control reframes how everything is grouped. The taxonomy becomes a lens you look through — the structure on screen changes, not just which cards survive. A slim refine row narrows within." />

      {/* Control deck */}
      <div style={{ border: `1px solid ${C.ink}`, background: C.paperAlt, marginBottom: 28 }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, alignItems: 'center', padding: '14px 16px' }}>
          <Mono C={C} style={{ fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: C.muted }}>Organize by</Mono>
          <SegSingle C={C} value={lens} onChange={setLens} options={[
            { id: 'suits', label: 'Category' }, { id: 'sessions', label: 'Session' },
            { id: 'pathways', label: 'Goal' }, { id: 'levels', label: 'Level' },
          ]} />
          <div style={{ flex: 1, minWidth: 200, display: 'flex' }}>
            <SearchInput C={C} value={f.q} onChange={setQ} placeholder="Search 54 items…" />
          </div>
        </div>
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center',
          padding: '11px 16px', borderTop: `1px solid ${C.rule}`,
        }}>
          <Mono C={C} style={{ fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: C.muted }}>Refine</Mono>
          <SegSingle C={C} value={type} onChange={setType} options={[
            { id: 'all', label: 'All types' }, { id: 'bridge', label: 'Bridges' },
            { id: 'tool', label: 'Tools' }, { id: 'sketch', label: 'Sketches' },
          ]} />
          <div style={{ display: 'flex', gap: 6 }}>
            {FS_LEVELS.map(l => (
              <button key={l.id} className="fs-fbtn" data-on={f.levels.has(l.id) ? '1' : '0'}
                onClick={() => setLevel(l.id)} style={{ padding: '7px 12px', fontSize: 12 }}>{l.label}</button>
            ))}
          </div>
          <Mono C={C} style={{ marginLeft: 'auto', fontSize: 11.5, color: C.muted }}>
            <span style={{ color: C.ink, fontWeight: 600 }}>{matched.length}</span> of 54 shown
          </Mono>
        </div>
      </div>

      {nonEmpty.length === 0 && <EmptyState C={C} onReset={() => { setF(fsEmptyFilter()); setType('all'); }} />}

      {/* Grouped results */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
        {nonEmpty.map(g => (
          <section key={g.key}>
            <div style={{
              display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 16,
              borderBottom: `1px solid ${C.ink}`, paddingBottom: 10,
            }}>
              {g.sym && <span style={{ fontSize: 20, color: C.accent }}>{g.sym}</span>}
              <h3 style={{
                margin: 0, fontFamily: '"Inter Tight",sans-serif', fontWeight: 600,
                fontSize: 22, letterSpacing: '-0.02em',
              }}>{g.label}</h3>
              <Mono C={C} style={{ fontSize: 12, color: C.muted }}>{g.sub}</Mono>
              <Mono C={C} style={{ marginLeft: 'auto', fontSize: 22, color: C.accent, fontWeight: 600, letterSpacing: '-0.03em' }}>
                {String(g.items.length).padStart(2, '0')}
              </Mono>
            </div>
            <CardGrid C={C} items={g.items} dense={dense} />
          </section>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PARADIGM B — FACETED RAIL
// Librarian-style sidebar: every facet, live counts, multi-select, AND/OR
// semantics, removable token bar. Built for "I know exactly what I want."
// ═══════════════════════════════════════════════════════════════════════════
function FacetGroup({ C, label, facetKey, options, f, setF }) {
  const set = f[facetKey];
  const toggle = (id) => setF(p => ({ ...p, [facetKey]: fsToggleSet(p[facetKey], id) }));
  return (
    <div style={{ borderTop: `1px solid ${C.rule}`, padding: '14px 0 16px' }}>
      <Mono C={C} style={{ fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: C.muted, display: 'block', marginBottom: 10 }}>{label}</Mono>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {options.map(o => {
          const on = set.has(o.id);
          const n = fsCount(f, facetKey, o.id);
          return (
            <button key={o.id} onClick={() => toggle(o.id)} disabled={n === 0 && !on}
              style={{
                appearance: 'none', border: 'none', background: 'transparent', font: 'inherit',
                cursor: 'default', display: 'flex', alignItems: 'center', gap: 9,
                padding: '5px 6px', textAlign: 'left', color: n === 0 && !on ? C.rule : C.ink,
                opacity: n === 0 && !on ? 0.5 : 1,
              }}>
              <span style={{
                width: 13, height: 13, flexShrink: 0, border: `1px solid ${on ? C.accent : C.muted}`,
                background: on ? C.accent : 'transparent', display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: C.paper, fontSize: 9, lineHeight: 1,
              }}>{on ? '✓' : ''}</span>
              {o.sym && <span style={{ color: C.accent, width: 14, fontSize: 13 }}>{o.sym}</span>}
              <span style={{ fontSize: 13, fontWeight: on ? 600 : 400, flex: 1 }}>{o.label}</span>
              <Mono C={C} style={{ fontSize: 10.5, color: C.muted, fontVariantNumeric: 'tabular-nums' }}>{n}</Mono>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ParadigmFaceted({ C, dense }) {
  const [f, setF] = useState(fsEmptyFilter());
  const items = useMemo(() => fsFilter(f), [f]);
  const active = fsActiveCount(f);

  const tokens = [];
  f.types.forEach(v => tokens.push({ k: 'types', v, label: FD2.FS_TYPE[v].label }));
  f.suits.forEach(v => tokens.push({ k: 'suits', v, label: FS_SUIT[v].name }));
  f.pathways.forEach(v => tokens.push({ k: 'pathways', v, label: FS_PATHWAY[v].label }));
  f.levels.forEach(v => tokens.push({ k: 'levels', v, label: FS_LEVEL[v].label }));
  f.sessions.forEach(v => tokens.push({ k: 'sessions', v, label: v === '—' ? 'Support' : `Session ${v}` }));
  const removeToken = (t) => setF(p => ({ ...p, [t.k]: fsToggleSet(p[t.k], t.v) }));

  return (
    <div>
      <StudyHead C={C} kicker="Paradigm B · Faceted Rail"
        title="Every facet on the table, with live counts."
        sub="A persistent left rail exposes all five facets at once. Counts update as you narrow, dead-ends grey out, and choices collect into a removable token bar. The most powerful option — and the most database-like." />

      <div style={{ display: 'grid', gridTemplateColumns: '236px 1fr', gap: 28, alignItems: 'start' }}>
        {/* Sidebar */}
        <aside style={{ position: 'sticky', top: 16, border: `1px solid ${C.ink}`, padding: '14px 16px', background: C.paper }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
            <strong style={{ fontSize: 14, letterSpacing: '-0.01em' }}>Filters</strong>
            {active > 0
              ? <button className="fs-x" onClick={() => setF(fsEmptyFilter())} style={{ border: 'none', background: 'transparent', color: C.accent, font: 'inherit', fontSize: 11.5 }}>Clear all</button>
              : <Mono C={C} style={{ fontSize: 11, color: C.muted }}>{active} active</Mono>}
          </div>
          <SearchInput C={C} value={f.q} onChange={(q) => setF(p => ({ ...p, q }))} placeholder="Search…" />
          <FacetGroup C={C} label="Type" facetKey="types" options={FS_TYPES.map(t => ({ id: t.id, label: t.plural }))} f={f} setF={setF} />
          <FacetGroup C={C} label="Category" facetKey="suits" options={FS_SUITS.map(s => ({ id: s.id, label: s.name, sym: s.sym }))} f={f} setF={setF} />
          <FacetGroup C={C} label="Goal / pathway" facetKey="pathways" options={FS_PATHWAYS.map(p => ({ id: p.id, label: p.label }))} f={f} setF={setF} />
          <FacetGroup C={C} label="Level" facetKey="levels" options={FS_LEVELS.map(l => ({ id: l.id, label: l.label }))} f={f} setF={setF} />
          <FacetGroup C={C} label="Session" facetKey="sessions" options={FS_SESSIONS.map(s => ({ id: s.id, label: s.id === '—' ? 'Support' : `Session ${s.id}` }))} f={f} setF={setF} />
        </aside>

        {/* Results */}
        <div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
            paddingBottom: 14, marginBottom: 18, borderBottom: `1px solid ${C.ink}`,
          }}>
            <CountPill C={C} n={items.length} total={54} />
            <div style={{ flex: 1 }} />
            {tokens.map(t => (
              <button key={t.k + t.v} onClick={() => removeToken(t)} className="fs-fbtn" data-on="1"
                style={{ padding: '4px 8px 4px 10px', fontSize: 11.5, display: 'flex', alignItems: 'center', gap: 6 }}>
                {t.label}<span style={{ opacity: 0.7 }}>✕</span>
              </button>
            ))}
          </div>
          {items.length === 0 ? <EmptyState C={C} onReset={() => setF(fsEmptyFilter())} /> : <CardGrid C={C} items={items} dense={dense} />}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PARADIGM C — COMMAND BAR
// A console-style line. Type to search; click chips to add key:value tokens.
// Compact, keyboard-leaning, scales to a long catalog. Results as a tight list.
// ═══════════════════════════════════════════════════════════════════════════
function ParadigmCommand({ C, dense }) {
  const [f, setF] = useState(fsEmptyFilter());
  const items = useMemo(() => fsFilter(f), [f]);
  const toggle = (k, v) => setF(p => ({ ...p, [k]: fsToggleSet(p[k], v) }));

  const tokens = [];
  f.types.forEach(v => tokens.push({ k: 'types', kw: 'type', v, label: FD2.FS_TYPE[v].label.toLowerCase() }));
  f.suits.forEach(v => tokens.push({ k: 'suits', kw: 'cat', v, label: v }));
  f.pathways.forEach(v => tokens.push({ k: 'pathways', kw: 'goal', v, label: v }));
  f.levels.forEach(v => tokens.push({ k: 'levels', kw: 'level', v, label: v }));
  f.sessions.forEach(v => tokens.push({ k: 'sessions', kw: 'session', v, label: v }));

  const chipRow = (label, k, opts) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
      <Mono C={C} style={{ fontSize: 9.5, letterSpacing: '.1em', textTransform: 'uppercase', color: C.muted, width: 58, flexShrink: 0 }}>{label}</Mono>
      {opts.map(o => (
        <button key={o.id} className="fs-fbtn" data-on={f[k].has(o.id) ? '1' : '0'} onClick={() => toggle(k, o.id)}
          style={{ padding: '4px 9px', fontSize: 11, fontFamily: '"JetBrains Mono",monospace' }}>{o.label}</button>
      ))}
    </div>
  );

  return (
    <div>
      <StudyHead C={C} kicker="Paradigm C · Command Bar"
        title="One line. Type, or stack tokens."
        sub="A single console-style field. Free text searches names and tags; chips add key:value tokens that read like a query. Dense and fast for repeat visitors — but the syntax has to be learnable." />

      {/* The bar */}
      <div style={{ border: `1px solid ${C.ink}`, marginBottom: 14 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap',
          padding: '11px 14px', background: C.ink, color: C.paper,
        }}>
          <Mono C={C} style={{ fontSize: 13, color: C.accent }}>›</Mono>
          {tokens.map(t => (
            <button key={t.k + t.v} onClick={() => toggle(t.k, t.v)}
              style={{
                appearance: 'none', border: `1px solid ${C.accent}`, background: 'transparent',
                color: C.paper, font: '11.5px "JetBrains Mono",monospace', cursor: 'default',
                padding: '3px 7px', display: 'flex', alignItems: 'center', gap: 6,
              }}>
              <span style={{ color: C.accent }}>{t.kw}:</span>{t.label}<span style={{ opacity: 0.6 }}>✕</span>
            </button>
          ))}
          <input value={f.q} onChange={e => setF(p => ({ ...p, q: e.target.value }))}
            placeholder={tokens.length ? 'and search…' : 'search names + tags, or add tokens below…'}
            style={{
              flex: 1, minWidth: 160, appearance: 'none', border: 'none', outline: 'none',
              background: 'transparent', color: C.paper,
              font: '12.5px "JetBrains Mono",monospace',
            }} />
          <Mono C={C} style={{ fontSize: 11, color: C.paper, opacity: 0.6 }}>{items.length} hits</Mono>
        </div>
        {/* Token palette */}
        <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 9, background: C.paperAlt }}>
          {chipRow('type', 'types', FS_TYPES.map(t => ({ id: t.id, label: t.id })))}
          {chipRow('cat', 'suits', FS_SUITS.map(s => ({ id: s.id, label: s.id })))}
          {chipRow('goal', 'pathways', FS_PATHWAYS.map(p => ({ id: p.id, label: p.id })))}
          {chipRow('level', 'levels', FS_LEVELS.map(l => ({ id: l.id, label: l.id })))}
          {chipRow('session', 'sessions', FS_SESSIONS.map(s => ({ id: s.id, label: s.id })))}
        </div>
      </div>

      {/* Results table */}
      {items.length === 0 ? <EmptyState C={C} onReset={() => setF(fsEmptyFilter())} /> : (
        <div style={{ border: `1px solid ${C.ink}` }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '52px 26px 1.5fr 2.4fr 150px 70px',
            background: C.ink, color: C.paper,
            fontFamily: '"JetBrains Mono",monospace', fontSize: 9.5, letterSpacing: '.1em', textTransform: 'uppercase',
          }}>
            {['ID', '', 'Name', 'What it is', 'Type · Session', 'Open'].map((h, i) => (
              <div key={i} style={{ padding: '9px 14px', textAlign: i === 5 ? 'right' : 'left' }}>{h}</div>
            ))}
          </div>
          {items.map(it => <ItemRow key={it.id} C={C} item={it} dense={dense} />)}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PARADIGM D — SHELVES
// No filter panel. Intent-first curated rows you browse like a storefront.
// Built for the stated audience: "you don't need to be a programmer."
// ═══════════════════════════════════════════════════════════════════════════
function Shelf({ C, title, sub, items, dense }) {
  if (!items.length) return null;
  return (
    <section style={{ marginBottom: 34 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 14 }}>
        <h3 style={{ margin: 0, fontFamily: '"Inter Tight",sans-serif', fontWeight: 600, fontSize: 19, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>{title}</h3>
        <Mono C={C} style={{ fontSize: 11.5, color: C.muted }}>{sub}</Mono>
        <Mono C={C} style={{ marginLeft: 'auto', fontSize: 11.5, color: C.muted }}>{items.length} →</Mono>
      </div>
      <div className="fs-shelf" style={{ paddingBottom: 10 }}>
        {items.map(it => (
          <div key={it.id} style={{ width: dense ? 230 : 256, marginRight: 14 }}>
            <ItemCard C={C} item={it} dense={dense} width="100%" />
          </div>
        ))}
      </div>
    </section>
  );
}

function ParadigmShelves({ C, dense }) {
  const [by, setBy] = useState('pathways');

  const bestFirst = FS_DATA.filter(it => ['T01', 'T02', 'B01', 'S06'].includes(it.id));

  const shelves = useMemo(() => {
    if (by === 'pathways') {
      return [
        { title: 'Best first', sub: 'four friendly places to begin', items: bestFirst },
        ...FS_PATHWAYS.map(p => ({
          title: p.label, sub: 'pathway', items: FS_DATA.filter(it => it.pathways.includes(p.id)),
        })),
      ];
    }
    if (by === 'sessions') {
      return FS_SESSIONS.filter(s => s.id !== '—').map(s => ({
        title: `Session ${s.id}`, sub: s.title, items: FS_DATA.filter(it => it.session === s.id),
      }));
    }
    return FS_SUITS.map(s => ({
      title: `${s.sym}  ${s.name}`, sub: s.sub, items: FS_DATA.filter(it => it.suit === s.id),
    }));
  }, [by]);

  return (
    <div>
      <StudyHead C={C} kicker="Paradigm D · Shelves"
        title="Don't filter. Browse with intent."
        sub="No facets, no panel. The catalog is pre-sliced into curated rows you scroll like a storefront. Switch the organizing principle up top. Lowest cognitive load — best for newcomers, weakest for someone hunting one specific tool." />

      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
        <Mono C={C} style={{ fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: C.muted }}>Browse by</Mono>
        <SegSingle C={C} value={by} onChange={setBy} options={[
          { id: 'pathways', label: 'Goal' }, { id: 'sessions', label: 'Session' }, { id: 'suits', label: 'Category' },
        ]} />
      </div>

      {shelves.map((s, i) => <Shelf key={i} C={C} {...s} dense={dense} />)}
    </div>
  );
}

window.FilterParadigms = {
  ParadigmLens, ParadigmFaceted, ParadigmCommand, ParadigmShelves,
};
