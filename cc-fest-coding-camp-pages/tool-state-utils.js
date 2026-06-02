// CC Fest Tool State — URL hash sync for workshop tool controls
// Exposes window.CCFestToolState = { syncToURL, loadFromURL }
//
// Plain script (not a module). Loaded before renderWorkshopToolPage() runs.
//
// syncToURL(inputs) — listens for input/change events on the provided controls,
//   debounces 300ms, then writes key=value pairs to location.hash using
//   history.replaceState() (no browser-history spam). Preserves ?query params.
//
// loadFromURL(inputs) — reads location.hash, sets matching control values,
//   dispatches input/change events so the tool redraws with the restored state.
//
// Key derivation: uses element.name if present, otherwise strips "ctrl-" prefix
//   from element.id. This matches the id="ctrl-{control.id}" pattern in
//   workshop-tool-pages.js without requiring name attributes on existing elements.

window.CCFestToolState = (() => {
  let timer = null;

  function keyFor(el) {
    if (el.name) return el.name;
    if (el.id)   return el.id.replace(/^ctrl-/, '');
    return null;
  }

  function writeToURL(inputs) {
    const params = new URLSearchParams();
    Array.from(inputs).forEach(el => {
      const key = keyFor(el);
      if (!key) return;
      const val = el.type === 'checkbox' ? (el.checked ? '1' : '0') : el.value;
      params.set(key, val);
    });
    const hash = params.toString();
    // Preserve ?query params (e.g. ?embed=1) alongside the hash
    history.replaceState(null, '', location.search + (hash ? '#' + hash : ''));
  }

  function syncToURL(inputs) {
    const arr = Array.from(inputs);
    function handler() {
      clearTimeout(timer);
      timer = setTimeout(() => writeToURL(arr), 300);
    }
    arr.forEach(el => {
      el.addEventListener('input',  handler);
      el.addEventListener('change', handler);
    });
  }

  function loadFromURL(inputs) {
    const hash = location.hash.slice(1);
    if (!hash) return;
    const params = new URLSearchParams(hash);
    let changed = false;
    Array.from(inputs).forEach(el => {
      const key = keyFor(el);
      if (!key) return;
      const val = params.get(key);
      if (val === null) return;
      if (el.type === 'checkbox') {
        el.checked = val === '1';
      } else {
        el.value = val;
      }
      // Fire both events so range inputs update their label spans and
      // select inputs update the state object via the existing listeners
      el.dispatchEvent(new Event('input',  { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
      changed = true;
    });
    return changed;
  }

  return { syncToURL, loadFromURL };
})();
