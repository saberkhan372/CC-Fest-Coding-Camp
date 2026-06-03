// Shared site content — distilled from the existing CC Fest Coding Camp site.
// Used by all three homepage directions so they vary only in form, not facts.

window.CC_CONTENT = {
  brand: "CC Fest · Coding Camp",
  tagline: "A free workshop for creative coding.",
  lede:
    "Open to anyone curious about creative code — you don't need to be a programmer to start. Use a concept bridge when an idea feels fuzzy, open a tool when you want guided practice, then remix a starter sketch into something of your own.",
  year: "2026",
  byline: "Saber Khan · CC Fest",

  stats: [
    { n: "21", label: "Concept bridges", sub: "For intuition before syntax" },
    { n: "66", label: "Workshop tools", sub: "For guided demos and stations" },
    { n: "44", label: "Starter sketches", sub: "For editing, remixing, projects" },
    { n: "05", label: "Sessions", sub: "One arc, first marks to open studio" },
  ],

  manifesto: [
    "You don't need to be a programmer.",
    "The code and the canvas are connected.",
    "Change one thing. See what happens.",
    "Everything here is yours to remix.",
  ],

  rhythm: [
    { k: "Open", v: "Play before reading." },
    { k: "Change", v: "Move one control." },
    { k: "Predict", v: "Say what should happen." },
    { k: "Teach", v: "Turn it into a prompt." },
  ],

  sessions: [
    {
      n: "01",
      title: "Your Canvas, Your Voice",
      blurb: "Make your first marks and find your canvas voice.",
      bridge: "Color: Numbers Become Feeling",
      tools: ["Coordinates", "Shape + Color", "Text Basics", "RGB / HSB"],
    },
    {
      n: "02",
      title: "Things That Move, Things That Listen",
      blurb: "Build things that move, react, and respond.",
      bridge: "Distance Becomes Behavior",
      tools: ["Animation", "frameRate()", "map()", "lerp()", "If / Else"],
    },
    {
      n: "03",
      title: "Patterns, Systems, and What They Say",
      blurb: "Let the code repeat, branch, and think for itself.",
      bridge: "Noise: Smooth Randomness",
      tools: ["For Loop", "Rows + Cols", "Functions", "Noise"],
    },
    {
      n: "04",
      title: "Data as Material",
      blurb: "Turn numbers into pictures that mean something personal.",
      bridge: "Data In, Drawing Out",
      tools: ["Story Planner", "Data Mapper", "CSV / loadTable"],
    },
    {
      n: "05",
      title: "Open Studio",
      blurb: "Remix, share, reflect, teach.",
      bridge: "State Machines: Sketches Have Modes",
      tools: ["Image Remix", "Sound + Shape", "Postcard", "Game State", "Particles"],
    },
  ],

  suits: [
    { id: "marks",   sym: "✦", name: "Marks",    sub: "drawing & color" },
    { id: "motion",  sym: "◎", name: "Motion",   sub: "animation & interaction" },
    { id: "systems", sym: "⬡", name: "Systems",  sub: "loops & generative" },
    { id: "data",    sym: "▦", name: "Data",     sub: "visualization & data" },
    { id: "open",    sym: "☽", name: "Open",     sub: "images, sound, 3D" },
    { id: "support", sym: "⊕", name: "Support",  sub: "debugging & confidence" },
  ],

  bridges: [
    { roman: "I",    name: "Color: Numbers Become Feeling",   fns: "fill() · stroke() · HSB · lerpColor()" },
    { roman: "II",   name: "Triangle to Circle to Wave",       fns: "sin() · cos() · unit circle" },
    { roman: "III",  name: "How p5.js Thinks About Time",      fns: "setup() · draw() · frameCount" },
    { roman: "IV",   name: "World vs Local Coordinates",       fns: "translate() · rotate() · push()/pop()" },
    { roman: "V",    name: "map() Range Translator",           fns: "map() · ranges · translation" },
    { roman: "VI",   name: "Distance Becomes Behavior",        fns: "dist() · proximity · behavior" },
    { roman: "VII",  name: "Noise: Smooth Randomness",         fns: "noise() · random() · motion" },
    { roman: "VIII", name: "random(): Controlled Surprise",    fns: "random() · seed · chance" },
    { roman: "IX",   name: "Events: Sketches Listen",          fns: "mouseX · mouseY · keyPressed()" },
    { roman: "X",    name: "Vectors: Arrows That Store Motion",fns: "createVector() · velocity · accel" },
    { roman: "XI",   name: "Modulo: Counting in Cycles",       fns: "% · cycles · patterns" },
    { roman: "XII",  name: "Arrays: One Thing to Many Things", fns: "arrays · indexes · loops" },
    { roman: "XIII", name: "Objects: Data + Behavior",         fns: "objects · classes · methods" },
    { roman: "XIV",  name: "Functions: Make Your Own Commands",fns: "functions · parameters · return" },
    { roman: "XV",   name: "Conditionals: Code Makes Choices", fns: "if/else · booleans · logic" },
    { roman: "XVI",  name: "State Machines: Sketches Have Modes", fns: "state · modes · game flow" },
    { roman: "XVII", name: "Variable Scope: Where Variables Live", fns: "scope · let · variables" },
    { roman: "XVIII",name: "Pixels: Pictures Are Data",        fns: "pixels[] · get() · loadPixels()" },
    { roman: "XIX",  name: "Data In, Drawing Out",             fns: "preload() · loadTable() · loadJSON()" },
    { roman: "XX",   name: "Data as Argument",                 fns: "arguments · functions · data viz" },
    { roman: "XXI",  name: "Arrays + Loops as a System",       fns: "arrays · for · index" },
  ],

  // 24-ish tools to cover the filter UI. Each tagged with a suit.
  tools: [
    { n: "01", name: "Coordinate System Explorer",   suit: "marks",   blurb: "Click anywhere on the canvas and see the x/y. The grid stops feeling abstract.",  tags: ["coordinates", "canvas", "shapes"] },
    { n: "02", name: "Shape + Color Explorer",       suit: "marks",   blurb: "Mix color and shape while a live code preview updates below.",                       tags: ["color", "shapes", "starter code"] },
    { n: "03", name: "Text Basics Studio",           suit: "marks",   blurb: "Type a word, design it with position, size, color, rotation, alignment.",          tags: ["text()", "identity", "composition"] },
    { n: "04", name: "RGB / HSB Color Lab",          suit: "marks",   blurb: "Switch between RGB and HSB and feel how each system thinks about color.",          tags: ["color", "RGB", "HSB"] },
    { n: "05", name: "Arc Visualizer",               suit: "marks",   blurb: "Adjust start angle, stop angle, mode, size to see how arc() draws part of a circle.", tags: ["arc()", "angles"] },
    { n: "06", name: "Layering Visualizer",          suit: "marks",   blurb: "Shapes drawn later appear on top. Reorder layers, watch the stacking change.",      tags: ["draw order", "layers"] },

    { n: "07", name: "Animation Explorer",           suit: "motion",  blurb: "Watch a variable change every frame and become motion.",                            tags: ["draw()", "frameCount"] },
    { n: "08", name: "frameRate() Visualizer",       suit: "motion",  blurb: "See how frame rate changes the feel of motion.",                                   tags: ["frameRate()", "time"] },
    { n: "09", name: "map() Explorer",               suit: "motion",  blurb: "Translate one range of numbers into another, live.",                               tags: ["map()", "ranges"] },
    { n: "10", name: "lerp() Explorer",              suit: "motion",  blurb: "Smooth interpolation between two values — feel easing in code.",                    tags: ["lerp()", "easing"] },
    { n: "11", name: "Easing Types Comparison",      suit: "motion",  blurb: "Side-by-side easing curves applied to the same motion.",                           tags: ["easing", "curves"] },
    { n: "12", name: "Keyboard Controlled Character",suit: "motion",  blurb: "Move a character with arrow keys. The first real game loop.",                      tags: ["keyPressed()", "state"] },

    { n: "13", name: "For Loop Stepper",             suit: "systems", blurb: "Step through a loop one iteration at a time. See the index move.",                 tags: ["for", "iteration"] },
    { n: "14", name: "Rows and Columns",             suit: "systems", blurb: "Nested loops draw a grid. Change spacing, count, shape — see the system.",         tags: ["nested loops", "grid"] },
    { n: "15", name: "Function Builder",             suit: "systems", blurb: "Compose a function from parts. Call it with new arguments.",                       tags: ["functions", "parameters"] },
    { n: "16", name: "Noise vs Random Explorer",     suit: "systems", blurb: "Random jumps, noise flows. See the difference visually.",                          tags: ["noise()", "random()"] },
    { n: "17", name: "Modulo Pattern Explorer",      suit: "systems", blurb: "Use % to create stripes, wraps, and repeating rhythms.",                           tags: ["%", "patterns"] },
    { n: "18", name: "Class Inheritance Explorer",   suit: "systems", blurb: "Subclasses inherit and override. Watch behavior cascade.",                         tags: ["class", "extends"] },

    { n: "19", name: "Data Story Planner",           suit: "data",    blurb: "Plan a story from data: what's the headline, what's the shape?",                   tags: ["narrative", "data"] },
    { n: "20", name: "Data Mapper",                  suit: "data",    blurb: "Map columns to visual properties. Drag a column onto an axis.",                    tags: ["mapping", "viz"] },
    { n: "21", name: "CSV / loadTable Explorer",     suit: "data",    blurb: "Load a spreadsheet, see rows turn into shapes.",                                   tags: ["loadTable()", "CSV"] },
    { n: "22", name: "Bar Chart Studio",             suit: "data",    blurb: "Build a bar chart from numbers, labels, scale.",                                   tags: ["bar chart", "scale"] },

    { n: "23", name: "Image Remix Studio",           suit: "open",    blurb: "Load an image. Read its pixels. Make something new out of it.",                    tags: ["pixels[]", "remix"] },
    { n: "24", name: "Sound + Shape Visualizer",     suit: "open",    blurb: "Audio becomes amplitude becomes shape. Hear the canvas.",                          tags: ["sound", "amplitude"] },
    { n: "25", name: "Postcard Studio",              suit: "open",    blurb: "A square canvas, your name, four colors. Make a postcard from your world.",        tags: ["composition", "studio"] },
    { n: "26", name: "Game State Starter",           suit: "open",    blurb: "Start screen, play, win, lose. State machines for tiny games.",                    tags: ["state", "game"] },

    { n: "27", name: "Debugging Playground",         suit: "support", blurb: "Read errors out loud. Learn what console.log() is for.",                           tags: ["console", "errors"] },
    { n: "28", name: "Readable Code Coach",          suit: "support", blurb: "Rename variables, add comments, see code become legible.",                         tags: ["naming", "comments"] },
  ],

  // Sample of starter sketches (44 total in real site).
  sketches: [
    "Bouncing Ball Seed",
    "Gravity Bounce Seed",
    "Mouse Trail Drawing",
    "Particle Emitter",
    "Wander Agent",
    "Generative Tile Pattern",
    "Sine Oscillation",
    "Lerp Follow",
    "Angle to Mouse",
    "Sound Pulse",
    "Function Creature Stamp",
    "Tiny CSV Portrait",
  ],

  links: {
    notion:
      "https://sustaining-boursin-d41.notion.site/CC-Fest-Creative-Coding-for-Connection-Expression-and-Learning-2016-now-2c79950a7da980128738c06677fedcb8",
    site: "https://ccfest.rocks",
    github: "https://github.com/saberkhan372/CC-Fest-Coding-Camp",
  },
};
