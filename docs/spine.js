// CC Fest session spine — compact arc wayfinding for tool pages and the sessions index.
// Self-injects CSS. Auto-inits on tool/bridge pages. Exposes window.CCS for manual init.
(function () {
  'use strict';

  const STYLE_ID = 'cc-spine-style';

  // ── Base URL: strip to the site root regardless of page depth ──────────────
  const BASE = window.location.href
    .replace(/\/(sessions|tools|concept-bridges)\/.*$/, '')
    .replace(/\/$/, '');

  // ── Wait for CCFestSessions + CCFestCatalog ────────────────────────────────
  function boot(attempt) {
    const rawSessions = (window.CCFestSessions || []).filter(function (s) { return s.id !== 'template'; });
    const catalog = window.CCFestCatalog;
    if (!rawSessions.length || !catalog?.items?.length) {
      if (attempt < 40) setTimeout(function () { boot(attempt + 1); }, 100);
      return;
    }
    run(rawSessions, catalog);
  }

  // ── Styles (self-injected, uses site CSS variables as fallbacks) ───────────
  var CSS = [
    '.ccs-rail-kicker,.ccs-strip-kicker,.ccs-stations-kicker{',
    '  font:500 9.5px/1 "DM Mono",ui-monospace,monospace;',
    '  letter-spacing:.12em;text-transform:uppercase;',
    '  color:var(--ink-light,#5c5751);margin-bottom:14px;display:block',
    '}',

    /* ── Side rail ── */
    '.ccs-rail{max-width:260px}',
    '.ccs-stop{display:grid;grid-template-columns:32px 1fr;column-gap:10px;',
    '  text-decoration:none;color:inherit;cursor:pointer;outline-offset:3px}',
    '.ccs-gutter{position:relative;display:flex;justify-content:center;align-items:flex-start}',
    '.ccs-line{position:absolute;width:1.5px;background:var(--line,#d8cdbf)}',
    '.ccs-line--top{top:0;height:14px}',
    '.ccs-line--bot{top:14px;bottom:0}',
    '.ccs-line--done{background:currentColor;opacity:.5}',
    '.ccs-node{width:26px;height:26px;border-radius:50%;display:flex;align-items:center;',
    '  justify-content:center;font-size:12px;flex-shrink:0;position:relative;z-index:1;',
    '  border:1.5px solid var(--line,#d8cdbf);background:var(--panel,#fffdf7);',
    '  color:var(--ink-light,#5c5751);margin-top:1px}',
    '.ccs-node--past{background:var(--ink,#201c1a);color:var(--cream,#f6f0e7);border-color:var(--ink,#201c1a)}',
    '.ccs-node--current{background:var(--node-accent,var(--gold,#f5a800));',
    '  color:var(--cream,#f6f0e7);border-color:var(--node-accent,var(--gold,#f5a800));',
    '  box-shadow:0 0 0 3px var(--panel,#fffdf7),0 0 0 4.5px var(--node-accent,var(--gold,#f5a800))}',
    '.ccs-body{padding-bottom:18px;display:flex;flex-direction:column;gap:2px;min-width:0}',
    '.ccs-num{font:500 10px/1 "DM Mono",ui-monospace,monospace;color:var(--ink-light,#5c5751);margin-top:5px}',
    '.ccs-num--cur{color:var(--node-accent,var(--gold,#f5a800))}',
    '.ccs-yah{font:700 7.5px/1 "DM Mono",ui-monospace,monospace;letter-spacing:.1em;text-transform:uppercase;',
    '  color:var(--panel,#fffdf7);background:var(--node-accent,var(--gold));padding:2px 5px;margin-left:6px}',
    '.ccs-title{font:500 14px/1.25 "DM Sans",system-ui,sans-serif;letter-spacing:-.01em;margin-top:2px}',
    '.ccs-title--cur{font-weight:700}',
    '.ccs-stop--future .ccs-title{color:var(--ink-light,#5c5751)}',
    '.ccs-expand{display:flex;flex-direction:column;gap:8px;margin-top:10px}',
    '.ccs-focus{font:400 12px/1.5 "DM Sans",system-ui,sans-serif;color:var(--ink-light,#5c5751)}',
    '.ccs-bridge{display:flex;align-items:center;gap:7px;',
    '  font:500 11.5px/1.3 "DM Sans",system-ui,sans-serif;',
    '  color:var(--ink,#201c1a);text-decoration:none}',
    '.ccs-bridge:hover{color:var(--accent,#c8391d)}',
    '.ccs-bridge-sym{color:var(--ink-light,#5c5751);font-size:10px}',
    '.ccs-tools{display:flex;flex-direction:column;gap:4px}',
    '.ccs-tool{display:flex;align-items:center;gap:8px;',
    '  font:400 12px/1.3 "DM Sans",system-ui,sans-serif;',
    '  color:var(--ink-light,#5c5751);text-decoration:none}',
    '.ccs-tool:hover{color:var(--ink,#201c1a)}',
    '.ccs-tool-dot{width:5px;height:5px;border-radius:50%;flex-shrink:0;',
    '  background:var(--line,#d8cdbf)}',

    /* ── Compact strip (tool/bridge pages) ── */
    '.ccs-strip{display:flex;align-items:center;flex-wrap:wrap;gap:10px 14px;',
    '  padding:10px 14px;margin:20px 0 0;',
    '  border:1.5px solid var(--line,#d8cdbf);',
    '  border-radius:var(--radius-sm,8px);',
    '  background:var(--panel,#fffdf7)}',
    '.ccs-dots{display:flex;align-items:center;gap:0}',
    '.ccs-seg{width:16px;height:1.5px;background:var(--line,#d8cdbf);flex-shrink:0}',
    '.ccs-seg--done{background:var(--ink-light,#5c5751)}',
    '.ccs-dot{width:12px;height:12px;border-radius:50%;flex-shrink:0;display:block;',
    '  border:1.5px solid var(--line,#d8cdbf);background:var(--panel,#fffdf7);',
    '  text-indent:-9999px;overflow:hidden}',
    '.ccs-dot--past{background:var(--ink,#201c1a);border-color:var(--ink,#201c1a)}',
    '.ccs-dot--current{background:var(--gold,#f5a800);border-color:var(--gold,#f5a800);',
    '  box-shadow:0 0 0 2.5px var(--panel,#fffdf7),0 0 0 4px var(--gold,#f5a800)}',
    '.ccs-dot:focus-visible{outline:2px solid var(--accent,#c8391d);outline-offset:2px}',
    '.ccs-strip-label{display:flex;align-items:baseline;gap:7px;min-width:0}',
    '.ccs-strip-num{font:700 11px/1 "DM Mono",ui-monospace,monospace}',
    '.ccs-strip-title{font:600 13.5px/1.2 "DM Sans",system-ui,sans-serif;',
    '  letter-spacing:-.01em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;',
    '  color:var(--ink,#201c1a)}',
    '.ccs-strip-nav{margin-left:auto;display:flex;gap:5px}',
    '.ccs-nav-btn{display:flex;align-items:center;justify-content:center;',
    '  width:26px;height:26px;border:1.5px solid var(--line,#d8cdbf);',
    '  border-radius:var(--radius-sm,8px);',
    '  font:400 15px/1 "DM Sans",system-ui,sans-serif;',
    '  color:var(--ink,#201c1a);text-decoration:none;background:transparent}',
    'a.ccs-nav-btn:hover{border-color:var(--ink,#201c1a)}',
    'span.ccs-nav-btn[aria-disabled="true"]{opacity:.3;pointer-events:none}',

    /* ── Station rail (tool pages) ── */
    '.ccs-tool-nav{margin:20px 0 0}',
    '.ccs-stations{margin-top:10px;padding:12px 14px 14px;',
    '  border:1.5px solid var(--line,#d8cdbf);',
    '  border-radius:var(--radius-sm,8px);',
    '  background:var(--panel,#fffdf7)}',
    '.ccs-station{display:flex;align-items:center;gap:9px;padding:6px 0;',
    '  text-decoration:none;color:var(--ink-light,#5c5751);',
    '  border-top:1px solid var(--line,#d8cdbf);',
    '  font:400 12.5px/1.3 "DM Sans",system-ui,sans-serif}',
    '.ccs-station:first-of-type{border-top:none}',
    '.ccs-station:hover{color:var(--ink,#201c1a)}',
    '.ccs-station--cur{color:var(--ink,#201c1a)}',
    '.ccs-station-mk{width:8px;height:8px;border-radius:50%;flex-shrink:0;',
    '  border:1.5px solid var(--line,#d8cdbf);background:var(--panel,#fffdf7)}',
    '.ccs-station--cur .ccs-station-mk{background:var(--gold,#f5a800);',
    '  border-color:var(--gold,#f5a800);',
    '  box-shadow:0 0 0 2.5px var(--panel,#fffdf7),0 0 0 4px var(--gold,#f5a800)}',
    '.ccs-station-nm{letter-spacing:-.01em}',
    '.ccs-station--cur .ccs-station-nm{font-weight:700}',

    /* ── Embed mode hides everything ── */
    '.embed-mode .ccs-strip,.embed-mode .ccs-tool-nav{display:none!important}',
  ].join('');

  // ── Main logic ─────────────────────────────────────────────────────────────
  function run(rawSessions, catalog) {
    const byId = new Map(catalog.items.map(function (item) { return [item.id, item]; }));

    function titleOf(slug) {
      return byId.get(slug)?.title || slug.replace(/-/g, ' ');
    }

    var CCS = rawSessions.map(function (s) {
      return {
        id: s.id,
        glyph: s.suitGlyph || '●',
        title: s.title,
        focus: s.subtitle || '',
        accent: s.accent || 'var(--gold,#f5a800)',
        bridge: s.anchorBridge ? {
          label: titleOf(s.anchorBridge),
          href: BASE + '/concept-bridges/' + s.anchorBridge + '/'
        } : null,
        tools: (s.featuredTools || []).map(function (slug) {
          return [titleOf(slug), BASE + '/tools/' + slug + '/'];
        }),
        featuredSlugs: new Set(s.featuredTools || [])
      };
    });

    var N = CCS.length;
    function stateOf(i, cur) { return i < cur ? 'past' : i === cur ? 'current' : 'future'; }

    // inject styles once
    if (!document.getElementById(STYLE_ID)) {
      var styleEl = document.createElement('style');
      styleEl.id = STYLE_ID;
      styleEl.textContent = CSS;
      document.head.appendChild(styleEl);
    }

    // ── Side rail ────────────────────────────────────────────────────────────
    function renderSideRail(el, currentIndex) {
      var cur = currentIndex == null ? -1 : currentIndex;
      var target = typeof el === 'string' ? document.querySelector(el) : el;
      if (!target) return;

      var rail = document.createElement('nav');
      rail.className = 'ccs-rail';
      rail.setAttribute('aria-label', 'Session arc');

      var kicker = document.createElement('div');
      kicker.className = 'ccs-rail-kicker';
      kicker.textContent = 'The arc';
      rail.appendChild(kicker);

      CCS.forEach(function (s, i) {
        var st = stateOf(i, cur);
        var isCur = st === 'current';
        var stop = document.createElement('a');
        stop.className = 'ccs-stop ccs-stop--' + st;
        stop.href = BASE + '/sessions/' + s.id + '/';
        if (isCur) stop.setAttribute('aria-current', 'page');

        var topLine = i > 0
          ? '<span class="ccs-line ccs-line--top' + (cur >= 0 && i <= cur ? ' ccs-line--done' : '') + '"></span>'
          : '';
        var botLine = i < N - 1
          ? '<span class="ccs-line ccs-line--bot' + (cur >= 0 && i < cur ? ' ccs-line--done' : '') + '"></span>'
          : '';
        var nodeStyle = isCur ? ' style="--node-accent:' + s.accent + '"' : '';

        stop.innerHTML =
          '<span class="ccs-gutter">' + topLine + botLine +
            '<span class="ccs-node ccs-node--' + st + '"' + nodeStyle + '>' + s.glyph + '</span>' +
          '</span>' +
          '<span class="ccs-body">' +
            '<span class="ccs-num' + (isCur ? ' ccs-num--cur' : '') + '">' + s.id +
              (isCur ? ' <span class="ccs-yah">You are here</span>' : '') +
            '</span>' +
            '<span class="ccs-title' + (isCur ? ' ccs-title--cur' : '') + '">' + s.title + '</span>' +
            (isCur ? expandHtml(s) : '') +
          '</span>';

        rail.appendChild(stop);
      });

      target.innerHTML = '';
      target.appendChild(rail);
    }

    function expandHtml(s) {
      var tools = s.tools.map(function (pair) {
        return '<a class="ccs-tool" href="' + pair[1] + '"><span class="ccs-tool-dot"></span>' + pair[0] + '</a>';
      }).join('');
      return '<span class="ccs-expand">' +
        '<span class="ccs-focus">' + s.focus + '</span>' +
        (s.bridge
          ? '<a class="ccs-bridge" href="' + s.bridge.href + '">' +
              '<span class="ccs-bridge-sym">⬡</span>' + s.bridge.label +
            '</a>'
          : '') +
        '<span class="ccs-tools">' + tools + '</span>' +
        '</span>';
    }

    // ── Compact strip ────────────────────────────────────────────────────────
    function renderCompactStrip(el, currentIndex) {
      var cur = currentIndex;
      var s = CCS[cur];
      if (!s) return;
      var target = typeof el === 'string' ? document.querySelector(el) : el;
      if (!target) return;

      var dots = CCS.map(function (ss, i) {
        var st = stateOf(i, cur);
        var seg = i > 0
          ? '<span class="ccs-seg' + (i <= cur ? ' ccs-seg--done' : '') + '"></span>'
          : '';
        return seg + '<a class="ccs-dot ccs-dot--' + st + '" href="' +
          BASE + '/sessions/' + ss.id + '/" title="' + ss.title +
          '" aria-label="Session ' + ss.id + ': ' + ss.title + '"></a>';
      }).join('');

      var prevHref = cur > 0 ? BASE + '/sessions/' + CCS[cur - 1].id + '/' : null;
      var nextHref = cur < N - 1 ? BASE + '/sessions/' + CCS[cur + 1].id + '/' : null;

      var strip = document.createElement('div');
      strip.className = 'ccs-strip';
      strip.setAttribute('aria-label', 'Session arc navigation');
      strip.innerHTML =
        '<span class="ccs-strip-kicker">The arc</span>' +
        '<span class="ccs-dots">' + dots + '</span>' +
        '<span class="ccs-strip-label">' +
          '<span class="ccs-strip-num" style="color:' + s.accent + '">' + s.id + '</span>' +
          '<span class="ccs-strip-title">' + s.title + '</span>' +
        '</span>' +
        '<span class="ccs-strip-nav">' +
          (prevHref
            ? '<a href="' + prevHref + '" class="ccs-nav-btn" aria-label="Previous session">‹</a>'
            : '<span class="ccs-nav-btn" aria-disabled="true" aria-label="No previous session">‹</span>') +
          (nextHref
            ? '<a href="' + nextHref + '" class="ccs-nav-btn" aria-label="Next session">›</a>'
            : '<span class="ccs-nav-btn" aria-disabled="true" aria-label="No next session">›</span>') +
        '</span>';

      target.innerHTML = '';
      target.appendChild(strip);
    }

    // ── Station rail ─────────────────────────────────────────────────────────
    function renderStationRail(el, currentIndex, activeHref) {
      var s = CCS[currentIndex];
      if (!s || !s.tools.length) return;
      var target = typeof el === 'string' ? document.querySelector(el) : el;
      if (!target) return;

      var active = (activeHref || '').replace(/\/$/, '');

      var items = s.tools.map(function (pair) {
        var href = pair[1], label = pair[0];
        var isCur = href.replace(/\/$/, '') === active;
        return '<a class="ccs-station' + (isCur ? ' ccs-station--cur' : '') + '" href="' + href + '"' +
          (isCur ? ' aria-current="page"' : '') + '>' +
          '<span class="ccs-station-mk"></span>' +
          '<span class="ccs-station-nm">' + label + '</span>' +
          '</a>';
      }).join('');

      var box = document.createElement('div');
      box.className = 'ccs-stations';
      box.innerHTML = '<div class="ccs-stations-kicker">In this session · ' + s.id + '</div>' + items;

      target.innerHTML = '';
      target.appendChild(box);
    }

    // ── Auto-init on tool / bridge pages ────────────────────────────────────
    var params = new URLSearchParams(window.location.search);
    if (params.get('embed') === '1') {
      window.CCS = { renderSideRail: renderSideRail, renderCompactStrip: renderCompactStrip, renderStationRail: renderStationRail };
      return;
    }

    var path = window.location.pathname.replace(/\\/g, '/');
    var toolMatch = path.match(/\/(tools|concept-bridges)\/([^/]+)\/(?:index\.html)?$/);

    if (toolMatch) {
      var slug = toolMatch[2];
      var item = byId.get(slug);
      if (item && item.session) {
        var sessionIdx = CCS.findIndex(function (s) { return s.id === item.session; });
        if (sessionIdx >= 0) {
          // Remove existing session strip (compact strip replaces it)
          document.querySelectorAll('.cc-session-strip').forEach(function (el) { el.remove(); });

          var anchor = document.querySelector('.bottom-nav, .tool-footer, .bridge-footer, footer');
          if (anchor && anchor.parentNode) {
            var wrapper = document.createElement('div');
            wrapper.className = 'ccs-tool-nav';

            var stripMount = document.createElement('div');
            wrapper.appendChild(stripMount);

            var isFeatured = CCS[sessionIdx].featuredSlugs.has(slug);
            var stationMount = null;
            if (isFeatured) {
              stationMount = document.createElement('div');
              wrapper.appendChild(stationMount);
            }

            anchor.insertAdjacentElement('beforebegin', wrapper);

            renderCompactStrip(stripMount, sessionIdx);
            if (stationMount) {
              var toolHref = window.location.origin + window.location.pathname;
              renderStationRail(stationMount, sessionIdx, toolHref);
            }
          }
        }
      }
    }

    window.CCS = { renderSideRail: renderSideRail, renderCompactStrip: renderCompactStrip, renderStationRail: renderStationRail };
  }

  boot(0);
})();
