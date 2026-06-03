// session-data.jsx
// The five-session arc. Each session has a dominant "suit" (which doubles as
// its station glyph + color role), a focus line, an anchoring concept bridge,
// and its stations (tools). The arc runs first marks → open studio.

const SUIT_GLYPH = { marks: '✦', motion: '◎', systems: '⬡', data: '▦', open: '☽' };

const SESSIONS = [
  {
    n: '01', suit: 'marks', glyph: '✦',
    title: 'Your Canvas, Your Voice',
    focus: 'Make your first marks and find your canvas voice.',
    arcTag: 'First marks',
    bridge: { name: 'Color: Numbers Become Feeling', fns: 'fill() · HSB · lerpColor()' },
    tools: [
      { name: 'Coordinate System Explorer', suit: 'marks' },
      { name: 'Shape + Color Explorer', suit: 'marks' },
      { name: 'Text Basics Studio', suit: 'marks' },
      { name: 'RGB / HSB Color Lab', suit: 'marks' },
    ],
  },
  {
    n: '02', suit: 'motion', glyph: '◎',
    title: 'Things That Move & Listen',
    focus: 'Build things that move, react, and respond.',
    arcTag: 'It moves',
    bridge: { name: 'Distance Becomes Behavior', fns: 'dist() · map()' },
    tools: [
      { name: 'Animation Explorer', suit: 'motion' },
      { name: 'frameRate() Visualizer', suit: 'motion' },
      { name: 'map() Explorer', suit: 'motion' },
      { name: 'lerp() Explorer', suit: 'motion' },
      { name: 'If / Else Decision Studio', suit: 'motion' },
    ],
  },
  {
    n: '03', suit: 'systems', glyph: '⬡',
    title: 'Patterns & Systems',
    focus: 'Let the code repeat, branch, and think for itself.',
    arcTag: 'It repeats',
    bridge: { name: 'Noise: Smooth Randomness', fns: 'noise() · random()' },
    tools: [
      { name: 'For Loop Stepper', suit: 'systems' },
      { name: 'Rows + Columns', suit: 'systems' },
      { name: 'Function Builder', suit: 'systems' },
      { name: 'Noise vs Random Explorer', suit: 'systems' },
    ],
  },
  {
    n: '04', suit: 'data', glyph: '▦',
    title: 'Data as Material',
    focus: 'Turn numbers into pictures that mean something personal.',
    arcTag: 'It means something',
    bridge: { name: 'Data In, Drawing Out', fns: 'loadTable() · loadJSON()' },
    tools: [
      { name: 'Data Story Planner', suit: 'data' },
      { name: 'Data Mapper', suit: 'data' },
      { name: 'CSV / loadTable Explorer', suit: 'data' },
    ],
  },
  {
    n: '05', suit: 'open', glyph: '☽',
    title: 'Open Studio',
    focus: 'Remix, share, reflect, teach.',
    arcTag: 'Open studio',
    bridge: { name: 'State Machines: Sketches Have Modes', fns: 'state · modes · game flow' },
    tools: [
      { name: 'Image Remix Studio', suit: 'open' },
      { name: 'Sound + Shape Visualizer', suit: 'open' },
      { name: 'Postcard Studio', suit: 'open' },
      { name: 'Game State Starter', suit: 'open' },
      { name: 'Particle System Seed', suit: 'open' },
    ],
  },
];

const SUIT_NAME = { marks: 'Marks', motion: 'Motion', systems: 'Systems', data: 'Data', open: 'Open' };

window.SessionData = { SESSIONS, SUIT_GLYPH, SUIT_NAME };
