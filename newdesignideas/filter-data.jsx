// filter-data.jsx
// Foundation for the Filter / Taxonomy study: enriched catalog dataset across
// the three content types, the five facet definitions, shared item cards, and
// the filtering / counting helpers every paradigm draws on.

// ── Facet definitions ───────────────────────────────────────────────────────
const FS_TYPES = [
  { id: 'bridge', label: 'Bridge',  plural: 'Concept Bridges', verb: 'Understand the idea' },
  { id: 'tool',   label: 'Tool',    plural: 'Workshop Tools',  verb: 'Practice at a station' },
  { id: 'sketch', label: 'Sketch',  plural: 'Starter Sketches', verb: 'Remix a working seed' },
];

const FS_SUITS = [
  { id: 'marks',   sym: '✦', name: 'Marks',   sub: 'drawing & color' },
  { id: 'motion',  sym: '◎', name: 'Motion',  sub: 'animation & interaction' },
  { id: 'systems', sym: '⬡', name: 'Systems', sub: 'loops & generative' },
  { id: 'data',    sym: '▦', name: 'Data',    sub: 'visualization & data' },
  { id: 'open',    sym: '☽', name: 'Open',    sub: 'images, sound, 3D' },
  { id: 'support', sym: '⊕', name: 'Support', sub: 'debugging & confidence' },
];

const FS_LEVELS = [
  { id: 'beginner',  label: 'Beginner',  sub: 'open it on day one' },
  { id: 'extension', label: 'Extension', sub: 'once the basics click' },
  { id: 'capstone',  label: 'Capstone',  sub: 'pull it all together' },
];

const FS_PATHWAYS = [
  { id: 'first',     label: 'First time with p5', sym: '◜' },
  { id: 'animation', label: 'I want animation',   sym: '◴' },
  { id: 'data',      label: 'I want data',        sym: '▦' },
  { id: 'games',     label: 'I want games',       sym: '◓' },
  { id: 'stuck',     label: "I'm stuck",          sym: '⊕' },
  { id: 'final',     label: 'Final project',      sym: '★' },
];

const FS_SESSIONS = [
  { id: '01', title: 'Your Canvas, Your Voice' },
  { id: '02', title: 'Things That Move & Listen' },
  { id: '03', title: 'Patterns & Systems' },
  { id: '04', title: 'Data as Material' },
  { id: '05', title: 'Open Studio' },
  { id: '—',  title: 'Cross-session support' },
];

// ── Dataset ─────────────────────────────────────────────────────────────────
// Compact rows: [id, name, type, suit, session, level, pathways, blurb, tags]
const _rows = [
  // ── Tools ──
  ['T01','Coordinate System Explorer','tool','marks','01','beginner',['first'],'Click the canvas, see the x/y. The grid stops feeling abstract.',['coordinates','canvas']],
  ['T02','Shape + Color Explorer','tool','marks','01','beginner',['first'],'Mix color and shape while a live code preview updates below.',['color','shapes']],
  ['T03','Text Basics Studio','tool','marks','01','beginner',['first'],'Type a word, design it with position, size, color, rotation.',['text()','identity']],
  ['T04','RGB / HSB Color Lab','tool','marks','01','extension',['first'],'Switch RGB↔HSB and feel how each system thinks about color.',['color','HSB']],
  ['T05','Arc Visualizer','tool','marks','01','extension',[],'Adjust angles and mode to see how arc() draws part of a circle.',['arc()','angles']],
  ['T06','Layering Visualizer','tool','marks','01','beginner',[],'Shapes drawn later sit on top. Reorder and watch the stack.',['draw order','layers']],
  ['T07','Animation Explorer','tool','motion','02','beginner',['animation','first'],'Watch a variable change every frame and become motion.',['draw()','frameCount']],
  ['T08','frameRate() Visualizer','tool','motion','02','beginner',['animation'],'See how frame rate changes the whole feel of motion.',['frameRate()','time']],
  ['T09','map() Explorer','tool','motion','02','beginner',['animation','data'],'Translate one range of numbers into another, live.',['map()','ranges']],
  ['T10','lerp() Explorer','tool','motion','02','extension',['animation'],'Smooth interpolation between two values — feel easing in code.',['lerp()','easing']],
  ['T11','Easing Types Comparison','tool','motion','02','extension',['animation'],'Side-by-side easing curves applied to the same motion.',['easing','curves']],
  ['T12','Keyboard-Controlled Character','tool','motion','02','beginner',['games'],'Move a character with arrow keys. The first real game loop.',['keyPressed()','state']],
  ['T13','For Loop Stepper','tool','systems','03','beginner',['first','stuck'],'Step through a loop one iteration at a time. See the index move.',['for','iteration']],
  ['T14','Rows and Columns','tool','systems','03','beginner',[],'Nested loops draw a grid. Change spacing, count, shape.',['nested loops','grid']],
  ['T15','Function Builder','tool','systems','03','extension',[],'Compose a function from parts. Call it with new arguments.',['functions','parameters']],
  ['T16','Noise vs Random Explorer','tool','systems','03','extension',['animation'],'Random jumps, noise flows. See the difference visually.',['noise()','random()']],
  ['T17','Modulo Pattern Explorer','tool','systems','03','extension',[],'Use % to create stripes, wraps, and repeating rhythms.',['%','patterns']],
  ['T18','Class Inheritance Explorer','tool','systems','03','capstone',['games'],'Subclasses inherit and override. Watch behavior cascade.',['class','extends']],
  ['T19','Data Story Planner','tool','data','04','beginner',['data'],'Plan a story from data: what is the headline, what is the shape?',['narrative','data']],
  ['T20','Data Mapper','tool','data','04','beginner',['data'],'Map columns to visual properties. Drag a column onto an axis.',['mapping','viz']],
  ['T21','CSV / loadTable Explorer','tool','data','04','extension',['data'],'Load a spreadsheet, watch rows turn into shapes.',['loadTable()','CSV']],
  ['T22','Bar Chart Studio','tool','data','04','extension',['data'],'Build a bar chart from numbers, labels, and scale.',['bar chart','scale']],
  ['T23','Image Remix Studio','tool','open','05','extension',[],'Load an image, read its pixels, make something new of it.',['pixels[]','remix']],
  ['T24','Sound + Shape Visualizer','tool','open','05','extension',[],'Audio becomes amplitude becomes shape. Hear the canvas.',['sound','amplitude']],
  ['T25','Postcard Studio','tool','open','05','beginner',['final'],'A square canvas, your name, four colors. A postcard from your world.',['composition','studio']],
  ['T26','Game State Starter','tool','open','05','capstone',['games','final'],'Start, play, win, lose. State machines for tiny games.',['state','game']],
  ['T27','Debugging Playground','tool','support','—','beginner',['stuck'],'Read errors out loud. Learn what console.log() is really for.',['console','errors']],
  ['T28','Readable Code Coach','tool','support','—','extension',['stuck'],'Rename variables, add comments, watch code become legible.',['naming','comments']],

  // ── Bridges ──
  ['B01','Color: Numbers Become Feeling','bridge','marks','01','beginner',['first'],'So color stops feeling like raw numbers and starts feeling expressive.',['fill()','HSB']],
  ['B02','Triangle → Circle → Wave','bridge','marks','02','extension',['animation'],'From right triangles to the unit circle to sine and cosine waves.',['sin()','unit circle']],
  ['B03','How p5.js Thinks About Time','bridge','motion','02','beginner',['first','animation'],'setup() runs once, draw() runs 60× a second. The heartbeat.',['draw()','frameCount']],
  ['B04','World vs Local Coordinates','bridge','motion','03','extension',[],'translate() and rotate() move your drawing space; push()/pop() contain it.',['translate()','push()']],
  ['B05','map() Range Translator','bridge','motion','02','beginner',['animation','data'],'Turn one range of values into another so anything can drive anything.',['map()','ranges']],
  ['B06','Distance Becomes Behavior','bridge','motion','02','extension',['games'],'“How close?” becomes a number, and that number becomes behavior.',['dist()','proximity']],
  ['B07','Noise: Smooth Randomness','bridge','systems','03','extension',['animation'],'Why random() jumps while noise() flows, drifts, and feels alive.',['noise()','random()']],
  ['B08','random(): Controlled Surprise','bridge','systems','03','beginner',[],'Randomness is not chaos — it is a choice you can range and seed.',['random()','seed']],
  ['B09','Events: Sketches Listen','bridge','motion','02','beginner',['games','first'],'mouseX, mousePressed(), keyPressed() — a sketch reacts to you in time.',['mouse','events']],
  ['B10','Vectors: Arrows Store Motion','bridge','systems','03','capstone',['games'],'Position, velocity, acceleration — motion you can store, add, redirect.',['vectors','velocity']],
  ['B11','Arrays: One Thing to Many','bridge','systems','03','extension',['data'],'One name, many values. Track a whole collection and update it at once.',['arrays','indexes']],
  ['B12','Conditionals: Code Makes Choices','bridge','systems','03','beginner',['stuck','games'],'if / else if / else and booleans become visible decisions.',['if/else','booleans']],
  ['B13','State Machines: Sketches Have Modes','bridge','open','05','capstone',['games','final'],'Start / play / win / lose — one sketch, many worlds by mode.',['state','game flow']],
  ['B14','Data In, Drawing Out','bridge','data','04','extension',['data'],'A spreadsheet becomes a drawing: preload(), loadTable(), loadJSON().',['loadTable()','loadJSON()']],

  // ── Sketches ──
  ['S01','Bouncing Ball Seed','sketch','motion','02','beginner',['animation','first'],'One ball, two velocities, four walls. The first-motion classic.',['motion','if']],
  ['S02','Mouse Trail Drawing','sketch','motion','02','beginner',['animation'],'Leave a fading trail as you move — arrays as memory.',['arrays','trails']],
  ['S03','Particle Emitter','sketch','open','05','capstone',['final'],'Drag to emit particles that move, fade, and clean themselves up.',['particles','splice()']],
  ['S04','Generative Tile Pattern','sketch','systems','03','extension',[],'Nested loops, modulo, noise, and HSB combine into a tiling pattern.',['loops','modulo']],
  ['S05','Sine Oscillation','sketch','motion','02','extension',['animation'],'Smooth up-and-down with sin(frameCount * speed) * amplitude.',['sin()','oscillation']],
  ['S06','Lerp Follow','sketch','motion','02','beginner',['animation'],'A circle eases toward the mouse. Change 0.08 and feel the personality shift.',['lerp()','easing']],
  ['S07','Angle to Mouse','sketch','motion','02','extension',['games'],'An arrow rotates to face the cursor with atan2(). The reusable one.',['atan2()','rotate()']],
  ['S08','Sound Pulse','sketch','open','05','extension',[],'A circle that breathes with sound level. One sensor, one visual.',['sound','map()']],
  ['S09','Function Creature Stamp','sketch','systems','03','extension',[],'Call drawCreature() with different arguments, get different creatures.',['functions','reuse']],
  ['S10','Tiny CSV Portrait','sketch','data','04','beginner',['data'],'Activity rows become bars — typed values to data as an outside file.',['CSV','bars']],
  ['S11','Data Self-Portrait','sketch','data','04','beginner',['data','final'],'Five facts about yourself become a visual portrait. Who are you in numbers?',['data','storytelling']],
  ['S12','State Machine Game Seed','sketch','open','05','capstone',['games','final'],'A clean start → play → game over → restart structure.',['gameState','restart']],
];

const FS_DATA = _rows.map(([id, name, type, suit, session, level, pathways, blurb, tags]) => ({
  id, name, type, suit, session, level, pathways, blurb, tags,
}));

// ── Lookups ─────────────────────────────────────────────────────────────────
const FS_SUIT = Object.fromEntries(FS_SUITS.map(s => [s.id, s]));
const FS_TYPE = Object.fromEntries(FS_TYPES.map(t => [t.id, t]));
const FS_LEVEL = Object.fromEntries(FS_LEVELS.map(l => [l.id, l]));
const FS_PATHWAY = Object.fromEntries(FS_PATHWAYS.map(p => [p.id, p]));
const FS_SESSION = Object.fromEntries(FS_SESSIONS.map(s => [s.id, s]));

// ── Filtering ───────────────────────────────────────────────────────────────
// A filter is { q, types:Set, suits:Set, levels:Set, pathways:Set, sessions:Set }.
// AND across facets, OR within a facet. Empty set = no constraint.
function fsEmptyFilter() {
  return {
    q: '',
    types: new Set(), suits: new Set(), levels: new Set(),
    pathways: new Set(), sessions: new Set(),
  };
}

function fsMatch(item, f, { ignore } = {}) {
  const q = (f.q || '').trim().toLowerCase();
  if (q) {
    const hay = (item.name + ' ' + item.blurb + ' ' + item.tags.join(' ')).toLowerCase();
    if (!hay.includes(q)) return false;
  }
  const has = (key, val) => f[key].size === 0 || f[key].has(val);
  if (ignore !== 'types'    && !has('types', item.type)) return false;
  if (ignore !== 'suits'    && !has('suits', item.suit)) return false;
  if (ignore !== 'levels'   && !has('levels', item.level)) return false;
  if (ignore !== 'sessions' && !has('sessions', item.session)) return false;
  if (ignore !== 'pathways') {
    if (f.pathways.size > 0 && !item.pathways.some(p => f.pathways.has(p))) return false;
  }
  return true;
}

function fsFilter(f) {
  return FS_DATA.filter(item => fsMatch(item, f));
}

// Count items that would match if `value` were the selection for `facetKey`,
// holding all OTHER facets fixed. Used for live counts next to options.
function fsCount(f, facetKey, value) {
  return FS_DATA.reduce((n, item) => {
    if (!fsMatch(item, f, { ignore: facetKey })) return n;
    if (facetKey === 'pathways') return n + (item.pathways.includes(value) ? 1 : 0);
    const map = { types: 'type', suits: 'suit', levels: 'level', sessions: 'session' };
    return n + (item[map[facetKey]] === value ? 1 : 0);
  }, 0);
}

function fsToggleSet(set, value) {
  const next = new Set(set);
  next.has(value) ? next.delete(value) : next.add(value);
  return next;
}

function fsActiveCount(f) {
  return f.types.size + f.suits.size + f.levels.size + f.pathways.size + f.sessions.size + (f.q ? 1 : 0);
}

window.FilterData = {
  FS_TYPES, FS_SUITS, FS_LEVELS, FS_PATHWAYS, FS_SESSIONS, FS_DATA,
  FS_SUIT, FS_TYPE, FS_LEVEL, FS_PATHWAY, FS_SESSION,
  fsEmptyFilter, fsMatch, fsFilter, fsCount, fsToggleSet, fsActiveCount,
};
