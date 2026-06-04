(() => {
  const seeds = {
    "draw-your-name-seed": {
      title: "Draw Your Name / Initials Seed",
      session: "Session 1",
      subtitle: "A first text sketch where a name, initials, or meaningful word becomes a designed mark on the canvas.",
      tags: ["text()", "identity", "coordinates"],
      liveSeed: "Start by changing the letters. Then change the size, color, or position to make it feel like yours.",
      tryText: "Replace SK with your initials, name, a place, or one word you want on screen.",
      noticeText: "text() uses x and y just like a shape. textAlign(CENTER, CENTER) makes that point the center of the words.",
      remixText: "Turn it into a name badge, title card, poster, classroom label, poem fragment, or personal logo.",
      footer: "CC Fest Coding Camp · Starter Sketch · Text, identity, and coordinates",
      code: `function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(245);

  textAlign(CENTER, CENTER);
  textSize(72);
  fill(30, 100, 220);

  text("SK", width / 2, height / 2);
}`,
      sketch: (p) => {
        p.setup = () => {
          const canvas = p.createCanvas(400, 400);
          canvas.parent("canvas-container");
        };
        p.draw = () => {
          p.background(245);
          p.textAlign(p.CENTER, p.CENTER);
          p.textSize(72);
          p.noStroke();
          p.fill(30, 100, 220);
          p.text("SK", p.width / 2, p.height / 2);
          p.fill(224, 122, 95);
          p.circle(p.width / 2, p.height / 2, 8);
          p.fill(107, 103, 96);
          p.textSize(13);
          p.text("change the letters", p.width / 2, p.height - 28);
        };
      }
    },
    "framecount-animation-seed": {
      title: "frameCount Animation Seed",
      session: "Session 2",
      subtitle: "A tiny clock-driven animation where p5.js keeps moving even when nobody touches the mouse or keyboard.",
      tags: ["frameCount", "time", "animation"],
      relatedBridges: ["how-p5-thinks-about-time"],
      relatedTools: ["animation-explorer", "framerate-visualizer"],
      liveSeed: "Watch the circle pulse and the color cycle automatically. Press Run after changing the modulo values.",
      tryText: "Change `% 100` to `% 200`, or change the color range from 360 to 120.",
      noticeText: "frameCount increases by 1 every time draw() runs, so the sketch has its own clock.",
      remixText: "Make a breathing badge, rotating poster, pulsing moon, or automatic title screen.",
      footer: "CC Fest Coding Camp · Starter Sketch · frameCount as a clock",
      code: `function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  let hue = frameCount % 360;
  let pulse = frameCount % 100;
  let size = map(pulse, 0, 99, 30, 180);

  background(hue, 25, 96);
  fill((hue + 120) % 360, 70, 90);
  noStroke();
  circle(width / 2, height / 2, size);

  fill(0, 0, 20);
  textAlign(CENTER);
  text("frameCount: " + frameCount, width / 2, height - 26);
}`
    },
    "sine-cosine-motion-seed": {
      title: "Sine / Cosine Motion Seed",
      session: "Session 2",
      subtitle: "A smooth motion seed where sin() moves a ball back and forth using center, amplitude, and speed.",
      tags: ["sin()", "cos()", "cyclical motion"],
      relatedBridges: ["triangle-circle-wave-explorer", "how-p5-thinks-about-time"],
      relatedTools: ["sine-cosine-motion-explorer"],
      liveSeed: "The ball moves by itself. Change amplitude and speed to feel how sine motion works.",
      tryText: "Change amplitude from 120 to 40, then change speed from 0.03 to 0.08.",
      noticeText: "Amplitude controls how far the ball moves. The multiplier controls how fast it cycles.",
      remixText: "Turn the ball into a pendulum, orbiting dot, floating word, bobbing creature, or wave.",
      footer: "CC Fest Coding Camp · Starter Sketch · Smooth sine motion",
      code: `let centerX = 200;
let amplitude = 120;
let speed = 0.03;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(250, 246, 240);

  // center: where the motion starts
  // amplitude: how far it moves
  // speed: how fast it cycles
  let x = centerX + sin(frameCount * speed) * amplitude;

  stroke(220);
  line(centerX - amplitude, 200, centerX + amplitude, 200);

  noStroke();
  fill(61, 90, 128);
  circle(x, 200, 54);
}`
    },
    "tiny-csv-portrait-seed": {
      title: "Tiny CSV Portrait Seed",
      session: "Session 4",
      subtitle: "A minimal data-file sketch: load rows from a CSV and draw one bar for each value.",
      tags: ["CSV", "loadTable()", "data"],
      liveSeed: "This runner uses inline sample rows so it works here, but the code shows the real loadTable() pattern.",
      tryText: "Change the activity names and hours. Then imagine those rows living in a separate data.csv file.",
      noticeText: "Headers name the columns. Each row gives one label and one numeric value.",
      remixText: "Make a daily habit chart, class survey, mood portrait, or tiny schedule visualization.",
      footer: "CC Fest Coding Camp · Starter Sketch · CSV rows become bars",
      code: `// In the p5.js Web Editor, put this in data.csv:
// activity,hours
// sleep,8
// school,7
// screen,4
// reading,1
// movement,2

let rows = [
  { activity: "sleep", hours: 8 },
  { activity: "school", hours: 7 },
  { activity: "screen", hours: 4 },
  { activity: "reading", hours: 1 },
  { activity: "movement", hours: 2 }
];

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(250, 246, 240);

  for (let i = 0; i < rows.length; i++) {
    let row = rows[i];
    let barHeight = map(row.hours, 0, 10, 0, 240);
    let x = 48 + i * 68;

    fill(61, 90, 128);
    rect(x, 320 - barHeight, 42, barHeight, 10);
    fill(44, 42, 38);
    textAlign(CENTER);
    text(row.activity, x + 21, 348);
  }
}`
    },
    "particle-system-seed": {
      title: "Particle System Seed",
      session: "Session 5",
      subtitle: "A satisfying open-studio seed that combines arrays, objects, motion, randomness, lifespan, and cleanup.",
      tags: ["particles", "classes", "arrays"],
      relatedBridges: ["arrays-one-thing-to-many-things", "objects-data-plus-behavior"],
      relatedTools: ["object-lifecycle-visualizer"],
      liveSeed: "Drag on the canvas to emit particles. Each particle moves, fades, and then gets removed.",
      tryText: "Change the velocity range, color, life decrease, or number of particles added each frame.",
      noticeText: "The array stores many Particle objects. The loop updates each one and removes it when it is done.",
      remixText: "Make fireworks, sparks, rain, snow, emotion particles, glitter trails, or magic dust.",
      footer: "CC Fest Coding Camp · Starter Sketch · Particle systems",
      code: `let particles = [];

function setup() {
  createCanvas(400, 400);
  noStroke();
}

function draw() {
  background(250, 246, 240, 30);

  if (mouseIsPressed) {
    particles.push(new Particle(mouseX, mouseY));
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();

    if (particles[i].isDone()) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-2, 2);
    this.vy = random(-3, 1);
    this.life = 255;
    this.size = random(8, 18);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.04;
    this.life -= 4;
  }

  display() {
    fill(61, 90, 128, this.life);
    circle(this.x, this.y, this.size);
  }

  isDone() {
    return this.life < 0;
  }
}`
    },
    "game-state-starter": {
      title: "Game State Starter",
      session: "Session 5",
      subtitle: "A tiny complete game structure with start, play, win, lose, and restart screens controlled by one state variable.",
      tags: ["state", "games", "conditionals"],
      relatedBridges: ["state-machines-sketches-have-modes", "conditionals-code-makes-choices"],
      relatedTools: ["game-state-studio"],
      liveSeed: "Press space to start. Move the mouse to touch the target before time runs out. Press r to restart.",
      tryText: "Change the win score, time limit, target size, or player shape. Add enemies when the structure makes sense.",
      noticeText: "The state variable decides which screen runs. That keeps the game from becoming one giant draw().",
      remixText: "Turn it into a maze, collecting game, reaction game, kindness quest, ecology game, or classroom challenge.",
      footer: "CC Fest Coding Camp · Starter Sketch · Game states and screens",
      code: `let state = "start";
let score = 0;
let timeLeft = 15;
let targetX = 280;
let targetY = 180;

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(250, 246, 240);

  if (state === "start") {
    drawStart();
  } else if (state === "play") {
    drawPlay();
  } else if (state === "win") {
    drawWin();
  } else if (state === "lose") {
    drawLose();
  }
}

function drawStart() {
  textSize(30);
  fill(44, 42, 38);
  text("Collect 5 targets", width / 2, 150);
  textSize(16);
  text("press space to start", width / 2, 210);
}

function drawPlay() {
  timeLeft -= 1 / 60;

  fill(224, 122, 95);
  circle(targetX, targetY, 44);

  fill(61, 90, 128);
  circle(mouseX, mouseY, 34);

  if (dist(mouseX, mouseY, targetX, targetY) < 39) {
    score++;
    targetX = random(50, width - 50);
    targetY = random(80, height - 50);
  }

  fill(44, 42, 38);
  textSize(16);
  text("score: " + score, 70, 28);
  text("time: " + ceil(timeLeft), 320, 28);

  if (score >= 5) state = "win";
  if (timeLeft <= 0) state = "lose";
}

function drawWin() {
  textSize(34);
  fill(129, 178, 154);
  text("You win!", width / 2, 170);
  textSize(16);
  text("press r to restart", width / 2, 225);
}

function drawLose() {
  textSize(34);
  fill(224, 122, 95);
  text("Try again", width / 2, 170);
  textSize(16);
  text("press r to restart", width / 2, 225);
}

function keyPressed() {
  if (key === " " && state === "start") {
    state = "play";
  }

  if (key === "r") {
    state = "start";
    score = 0;
    timeLeft = 15;
  }
}`
    },
    "mouse-trail-drawing-seed": {
      title: "Mouse Trail Drawing Seed",
      session: "Session 2",
      subtitle: "An interaction seed where the mouse leaves a fading trail, making arrays and transparency feel playful instead of abstract.",
      tags: ["interaction", "arrays", "trails"],
      liveSeed: "Move the mouse or drag to leave a fading trail. Click to clear and begin again.",
      tryText: "Change the trail size, the maximum number of points, or the color palette.",
      noticeText: "Each mouse position gets stored in an array as data, then redrawn with a loop.",
      remixText: "Turn the trail into stars, footprints, paint strokes, bubbles, or fireflies.",
      footer: "CC Fest Coding Camp · Starter Sketch · Mouse trails and arrays",
      code: `let trail = [];

function setup() {
  createCanvas(400, 400);
  noStroke();
}

function draw() {
  background(250, 246, 240, 32);

  if (mouseIsPressed) {
    trail.push({ x: mouseX, y: mouseY, size: random(10, 22) });
  }

  if (trail.length > 80) {
    trail.shift();
  }

  for (let i = 0; i < trail.length; i++) {
    let point = trail[i];
    let alpha = map(i, 0, trail.length - 1, 30, 220);
    fill(61, 90, 128, alpha);
    circle(point.x, point.y, point.size);
  }
}

function mousePressed() {
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) return;
  trail = [];
}`,
      sketch: (p) => {
        let trail = [];
        p.setup = () => {
          const canvas = p.createCanvas(400, 400);
          canvas.parent("canvas-container");
          p.noStroke();
        };
        p.draw = () => {
          p.background(250, 246, 240, 34);
          if (trail.length === 0) {
            p.fill(107, 103, 96);
            p.textAlign(p.CENTER, p.CENTER);
            p.textSize(18);
            p.text("Move the mouse", p.width / 2, p.height / 2);
          }
          for (let i = 0; i < trail.length; i++) {
            const point = trail[i];
            const alpha = p.map(i, 0, Math.max(1, trail.length - 1), 30, 220);
            p.fill(61, 90, 128, alpha);
            p.circle(point.x, point.y, point.size);
          }
        };
        function addPoint() {
          if (p.mouseX < 0 || p.mouseX > p.width || p.mouseY < 0 || p.mouseY > p.height) return;
          trail.push({ x: p.mouseX, y: p.mouseY, size: p.random(10, 22) });
          if (trail.length > 80) trail.shift();
        }
        p.mouseMoved = addPoint;
        p.mouseDragged = addPoint;
        p.mousePressed = () => {
          if (p.mouseX < 0 || p.mouseX > p.width || p.mouseY < 0 || p.mouseY > p.height) return;
          trail = [];
        };
      }
    },
    "bouncing-ball-starter": {
      title: "Bouncing Ball Starter",
      session: "Session 2",
      subtitle: "A classic motion seed that makes variables, speed, and conditionals visible through one bouncing ball.",
      tags: ["motion", "variables", "conditionals"],
      liveSeed: "Watch the ball bounce, then click to randomize its speed and color.",
      tryText: "Change the speed values or make the ball grow every time it hits an edge.",
      noticeText: "The `if` statements only activate when the ball reaches the edge conditions.",
      remixText: "Turn the ball into an emoji, add a trail, or make the bounce play a color change.",
      footer: "CC Fest Coding Camp · Starter Sketch · Variables and bouncing motion",
      code: `let x = 200;
let y = 200;
let xSpeed = 3;
let ySpeed = 2;
let ballColor;

function setup() {
  createCanvas(400, 400);
  ballColor = color(224, 122, 95);
}

function draw() {
  background(250, 246, 240);
  fill(ballColor);
  circle(x, y, 40);

  x += xSpeed;
  y += ySpeed;

  if (x < 20 || x > width - 20) {
    xSpeed *= -1;
  }

  if (y < 20 || y > height - 20) {
    ySpeed *= -1;
  }
}

function mousePressed() {
  xSpeed = random(-5, 5);
  ySpeed = random(-5, 5);
  ballColor = color(random(255), random(255), random(255));
}`,
      sketch: (p) => {
        let x = 200;
        let y = 200;
        let xSpeed = 3;
        let ySpeed = 2;
        let ballColor;
        p.setup = () => {
          const canvas = p.createCanvas(400, 400);
          canvas.parent("canvas-container");
          ballColor = p.color(224, 122, 95);
        };
        p.draw = () => {
          p.background(250, 246, 240);
          p.fill(ballColor);
          p.noStroke();
          p.circle(x, y, 40);
          x += xSpeed;
          y += ySpeed;
          if (x < 20 || x > p.width - 20) xSpeed *= -1;
          if (y < 20 || y > p.height - 20) ySpeed *= -1;
        };
        p.mousePressed = () => {
          xSpeed = p.random(-5, 5);
          ySpeed = p.random(-5, 5);
          if (Math.abs(xSpeed) < 1) xSpeed = 2.5;
          if (Math.abs(ySpeed) < 1) ySpeed = -2.5;
          ballColor = p.color(p.random(255), p.random(255), p.random(255));
        };
      }
    },
    "click-to-create-shapes": {
      title: "Click-to-Create Shapes",
      session: "Session 2",
      subtitle: "A simple event seed where every click adds a new visual object, making arrays of data feel immediate and fun.",
      tags: ["events", "arrays", "shapes"],
      relatedBridges: ["arrays-one-thing-to-many-things"],
      relatedTools: ["simple-array-explorer", "for-loop-stepper"],
      liveSeed: "Click inside the canvas to add new shapes. Press any key to clear the collection.",
      tryText: "Change the stored data so each shape also remembers a color or a size.",
      noticeText: "Each click creates one object with position data, then a loop redraws all of them every frame.",
      remixText: "Turn the clicks into stickers, stars, emojis, or a collaborative mural.",
      footer: "CC Fest Coding Camp · Starter Sketch · Click interaction and arrays",
      code: `let shapes = [];

function setup() {
  createCanvas(400, 400);
  shapes.push({ x: 120, y: 160, size: 36, kind: "circle" });
  shapes.push({ x: 260, y: 220, size: 42, kind: "square" });
}

function draw() {
  background(250, 246, 240);

  for (let shape of shapes) {
    fill(61, 90, 128, 220);
    if (shape.kind === "circle") {
      circle(shape.x, shape.y, shape.size);
    } else {
      rect(shape.x - shape.size / 2, shape.y - shape.size / 2, shape.size, shape.size, 12);
    }
  }
}

function mousePressed() {
  shapes.push({
    x: mouseX,
    y: mouseY,
    size: random(24, 48),
    kind: random(["circle", "square"])
  });
}

function keyPressed() {
  shapes = [];
}`,
      sketch: (p) => {
        let shapes = [];
        p.setup = () => {
          const canvas = p.createCanvas(400, 400);
          canvas.parent("canvas-container");
          shapes.push({ x: 120, y: 160, size: 36, kind: "circle", tint: p.color(61, 90, 128, 220) });
          shapes.push({ x: 260, y: 220, size: 42, kind: "square", tint: p.color(224, 122, 95, 210) });
        };
        p.draw = () => {
          p.background(250, 246, 240);
          p.noStroke();
          for (const shape of shapes) {
            p.fill(shape.tint);
            if (shape.kind === "circle") {
              p.circle(shape.x, shape.y, shape.size);
            } else {
              p.rect(shape.x - shape.size / 2, shape.y - shape.size / 2, shape.size, shape.size, 12);
            }
          }
          if (shapes.length === 0) {
            p.fill(107, 103, 96);
            p.textAlign(p.CENTER, p.CENTER);
            p.textSize(18);
            p.text("Click to add shapes", p.width / 2, p.height / 2);
          }
        };
        p.mousePressed = () => {
          if (p.mouseX < 0 || p.mouseX > p.width || p.mouseY < 0 || p.mouseY > p.height) return;
          shapes.push({
            x: p.mouseX,
            y: p.mouseY,
            size: p.random(24, 48),
            kind: p.random(["circle", "square"]),
            tint: p.random([
              p.color(61, 90, 128, 220),
              p.color(224, 122, 95, 215),
              p.color(129, 178, 154, 220)
            ])
          });
        };
        p.keyPressed = () => {
          shapes = [];
        };
      }
    },
    "color-from-position": {
      title: "Color From Position",
      session: "Session 2",
      subtitle: "A responsive interaction seed where the mouse controls hue, size, and background, creating a direct bridge into `map()` and color thinking.",
      tags: ["map()", "color", "interaction"],
      relatedBridges: ["color-numbers-become-feeling", "map-range-translator"],
      relatedTools: ["map-explorer", "rgb-hsb-color-lab"],
      liveSeed: "Move the mouse to shift the palette and shape size across the canvas.",
      tryText: "Swap RGB for HSB or map the y-position to transparency instead of brightness.",
      noticeText: "The mouse values are one range, but `map()` converts them into a new range for color and size.",
      remixText: "Make it feel like a sunset, game HUD, mood ring, or magic paintbrush.",
      footer: "CC Fest Coding Camp · Starter Sketch · Mouse position to color",
      code: `function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100, 1);
}

function draw() {
  let hueValue = map(mouseX, 0, width, 10, 280);
  let brightnessValue = map(mouseY, 0, height, 96, 42);
  let size = map(mouseX, 0, width, 24, 140);

  background(hueValue, 26, brightnessValue);
  fill((hueValue + 120) % 360, 72, 92, 0.9);
  noStroke();
  circle(width / 2, height / 2, size);
}`,
      sketch: (p) => {
        p.setup = () => {
          const canvas = p.createCanvas(400, 400);
          canvas.parent("canvas-container");
          p.colorMode(p.HSB, 360, 100, 100, 1);
        };
        p.draw = () => {
          const hueValue = p.map(p.mouseX, 0, p.width, 10, 280, true);
          const brightnessValue = p.map(p.mouseY, 0, p.height, 96, 42, true);
          const size = p.map(p.mouseX, 0, p.width, 24, 140, true);
          p.background(hueValue, 26, brightnessValue);
          p.noStroke();
          p.fill((hueValue + 120) % 360, 72, 92, 0.92);
          p.circle(p.width / 2, p.height / 2, size);
          p.fill(0, 0, 18, 0.85);
          p.textAlign(p.CENTER);
          p.textSize(14);
          p.text("Move the mouse", p.width / 2, p.height - 22);
        };
      }
    },
    "noise-walker": {
      title: "Noise Walker",
      session: "Session 3",
      subtitle: "A tiny motion seed where one dot wanders with `noise()`, making organic movement feel different from random jumping.",
      tags: ["noise()", "motion", "organic"],
      liveSeed: "Watch the dot wander smoothly. Click to reset the walker's path.",
      tryText: "Change the noise speed or use a second noise offset for the dot size and color.",
      noticeText: "The dot feels smooth because nearby `noise()` values are related to each other.",
      remixText: "Turn the walker into a firefly, wandering planet, fish, ghost, or weather pattern.",
      footer: "CC Fest Coding Camp · Starter Sketch · Noise-driven motion",
      code: `let t = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(250, 246, 240, 24);
  let x = map(noise(t), 0, 1, 40, width - 40);
  let y = map(noise(t + 100), 0, 1, 40, height - 40);

  fill(61, 90, 128);
  noStroke();
  circle(x, y, 22);

  t += 0.01;
}

function mousePressed() {
  background(250, 246, 240);
  t = random(1000);
}`,
      sketch: (p) => {
        let t = 0;
        p.setup = () => {
          const canvas = p.createCanvas(400, 400);
          canvas.parent("canvas-container");
          p.background(250, 246, 240);
        };
        p.draw = () => {
          p.background(250, 246, 240, 24);
          const x = p.map(p.noise(t), 0, 1, 40, p.width - 40);
          const y = p.map(p.noise(t + 100), 0, 1, 40, p.height - 40);
          p.noStroke();
          p.fill(61, 90, 128);
          p.circle(x, y, 22);
          p.fill(224, 122, 95, 90);
          p.circle(x + 10, y - 8, 8);
          t += 0.01;
        };
        p.mousePressed = () => {
          t = p.random(1000);
          p.background(250, 246, 240);
        };
      }
    },
    "function-creature-stamp": {
      title: "Function Creature Stamp",
      session: "Session 3",
      subtitle: "A function seed that draws one reusable creature again and again with different arguments, building intuition before more advanced function tools.",
      tags: ["functions", "parameters", "reuse"],
      liveSeed: "Click to stamp a new row of creatures with different sizes and colors.",
      tryText: "Add more parameters so the creature can change eyes, antennas, or number of legs.",
      noticeText: "The same function is reused with different x, y, and size values to create variety.",
      remixText: "Turn the creature into a flower, robot, alien, or camp mascot.",
      footer: "CC Fest Coding Camp · Starter Sketch · Functions with parameters",
      code: `function setup() {
  createCanvas(400, 400);
  noLoop();
}

function drawCreature(x, y, size, bodyColor) {
  fill(bodyColor);
  ellipse(x, y, size, size * 0.8);
  fill(255);
  circle(x - size * 0.18, y - size * 0.1, size * 0.18);
  circle(x + size * 0.18, y - size * 0.1, size * 0.18);
  fill(44, 42, 38);
  circle(x - size * 0.18, y - size * 0.1, size * 0.08);
  circle(x + size * 0.18, y - size * 0.1, size * 0.08);
}

function draw() {
  background(250, 246, 240);
  drawCreature(90, 170, 70, color(61, 90, 128));
  drawCreature(200, 210, 90, color(224, 122, 95));
  drawCreature(310, 160, 64, color(129, 178, 154));
}

function mousePressed() {
  redraw();
}`,
      sketch: (p) => {
        function drawCreature(x, y, size, bodyColor) {
          p.fill(bodyColor);
          p.noStroke();
          p.ellipse(x, y, size, size * 0.8);
          p.fill(255);
          p.circle(x - size * 0.18, y - size * 0.1, size * 0.18);
          p.circle(x + size * 0.18, y - size * 0.1, size * 0.18);
          p.fill(44, 42, 38);
          p.circle(x - size * 0.18, y - size * 0.1, size * 0.08);
          p.circle(x + size * 0.18, y - size * 0.1, size * 0.08);
          p.stroke(44, 42, 38, 90);
          p.line(x - size * 0.2, y + size * 0.18, x - size * 0.24, y + size * 0.34);
          p.line(x + size * 0.2, y + size * 0.18, x + size * 0.24, y + size * 0.34);
        }
        function paint() {
          p.background(250, 246, 240);
          for (let i = 0; i < 4; i++) {
            const x = 70 + i * 82;
            const y = 150 + p.random(-30, 30);
            const size = p.random(52, 92);
            const colorChoice = p.random([
              p.color(61, 90, 128),
              p.color(224, 122, 95),
              p.color(129, 178, 154)
            ]);
            drawCreature(x, y, size, colorChoice);
          }
        }
        p.setup = () => {
          const canvas = p.createCanvas(400, 400);
          canvas.parent("canvas-container");
          p.noLoop();
          paint();
        };
        p.mousePressed = () => paint();
      }
    },
    "keyboard-controlled-character": {
      title: "Keyboard-Controlled Character",
      session: "Session 3",
      subtitle: "A simple movement seed where arrow keys or WASD move a character, making keyboard input feel game-like right away.",
      tags: ["keyboard", "interaction", "movement"],
      relatedBridges: ["state-machines-sketches-have-modes", "events-sketches-listen"],
      relatedTools: ["game-state-studio", "if-else-decision-studio"],
      liveSeed: "Use the arrow keys or WASD to move the character around the canvas.",
      tryText: "Add a goal, walls, or collectible stars to turn the movement into a tiny game.",
      noticeText: "The position variables only change when certain keys are pressed, which is another form of conditionals.",
      remixText: "Turn the character into a car, rocket, pet, dancer, or maze explorer.",
      footer: "CC Fest Coding Camp · Starter Sketch · Keyboard interaction",
      code: `let playerX = 200;
let playerY = 200;
let speed = 3;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(250, 246, 240);

  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) playerX -= speed;
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) playerX += speed;
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) playerY -= speed;
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) playerY += speed;

  playerX = constrain(playerX, 20, width - 20);
  playerY = constrain(playerY, 20, height - 20);

  fill(61, 90, 128);
  rect(playerX - 18, playerY - 18, 36, 36, 10);
}`,
      sketch: (p) => {
        let playerX = 200;
        let playerY = 200;
        const speed = 3;
        p.setup = () => {
          const canvas = p.createCanvas(400, 400);
          canvas.parent("canvas-container");
        };
        p.draw = () => {
          p.background(250, 246, 240);
          if (p.keyIsDown(p.LEFT_ARROW) || p.keyIsDown(65)) playerX -= speed;
          if (p.keyIsDown(p.RIGHT_ARROW) || p.keyIsDown(68)) playerX += speed;
          if (p.keyIsDown(p.UP_ARROW) || p.keyIsDown(87)) playerY -= speed;
          if (p.keyIsDown(p.DOWN_ARROW) || p.keyIsDown(83)) playerY += speed;
          playerX = p.constrain(playerX, 24, p.width - 24);
          playerY = p.constrain(playerY, 24, p.height - 24);
          p.fill(61, 90, 128);
          p.noStroke();
          p.rect(playerX - 18, playerY - 18, 36, 36, 10);
          p.fill(255);
          p.circle(playerX - 6, playerY - 4, 6);
          p.circle(playerX + 6, playerY - 4, 6);
          p.fill(107, 103, 96);
          p.textAlign(p.CENTER);
          p.textSize(14);
          p.text("Use arrows or WASD", p.width / 2, p.height - 20);
        };
      }
    },
    "simple-collision-game-seed": {
      title: "Simple Collision Game Seed",
      session: "Session 4",
      subtitle: "A minimal collision seed where one circle follows the mouse and checks whether it touches a target circle.",
      tags: ["collision", "dist()", "feedback"],
      liveSeed: "Move the mouse-controlled circle until it touches the target to trigger the collision state.",
      tryText: "Change the hit radius or turn the target into a collectible that jumps to a new spot after each collision.",
      noticeText: "The `dist()` function measures the space between the two circles so the program can decide when they touch.",
      remixText: "Make it a catch-the-star game, a tag game, or a safe/unsafe zone challenge.",
      footer: "CC Fest Coding Camp · Starter Sketch · Simple collision logic",
      code: `let targetX = 280;
let targetY = 180;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(250, 246, 240);

  let touching = dist(mouseX, mouseY, targetX, targetY) < 40;

  fill(touching ? color(129, 178, 154) : color(224, 122, 95));
  circle(targetX, targetY, 40);

  fill(61, 90, 128, 220);
  circle(mouseX, mouseY, 32);
}`,
      sketch: (p) => {
        let targetX = 280;
        let targetY = 180;
        p.setup = () => {
          const canvas = p.createCanvas(400, 400);
          canvas.parent("canvas-container");
        };
        p.draw = () => {
          p.background(250, 246, 240);
          const x = p.constrain(p.mouseX, 0, p.width);
          const y = p.constrain(p.mouseY, 0, p.height);
          const touching = p.dist(x, y, targetX, targetY) < 36;
          p.fill(touching ? p.color(129, 178, 154) : p.color(224, 122, 95));
          p.noStroke();
          p.circle(targetX, targetY, 42);
          p.fill(61, 90, 128, 220);
          p.circle(x, y, 30);
          p.fill(44, 42, 38);
          p.textSize(15);
          p.text(touching ? "touching!" : "move to the target", 18, 30);
        };
        p.mousePressed = () => {
          targetX = p.random(60, 340);
          targetY = p.random(70, 330);
        };
      }
    },
    "data-self-portrait-seed": {
      title: "Data Self-Portrait Seed",
      session: "Session 4",
      subtitle: "A reflective visualization seed where a tiny personal dataset becomes a colorful portrait made from bars and circles.",
      tags: ["data", "arrays", "storytelling"],
      liveSeed: "This sketch turns four personal values into a small visual portrait. Click to randomize the values.",
      tryText: "Replace the labels and values with your own data about sleep, focus, joy, weather, or energy.",
      noticeText: "The values stay inside an array, but `map()` turns them into sizes and heights on the canvas.",
      remixText: "Turn the portrait into a garden, skyline, bracelet, badge, or creature.",
      footer: "CC Fest Coding Camp · Starter Sketch · Data as self-portrait",
      code: `let labels = ["sleep", "energy", "focus", "joy"];
let values = [6, 8, 5, 9];

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(250, 246, 240);

  for (let i = 0; i < values.length; i++) {
    let x = 60 + i * 80;
    let h = map(values[i], 0, 10, 20, 180);
    fill(61, 90, 128, 210);
    rect(x, 300 - h, 42, h, 12);
    fill(224, 122, 95, 210);
    circle(x + 21, 300 - h - 18, map(values[i], 0, 10, 12, 54));
    fill(44, 42, 38);
    text(labels[i], x - 6, 332);
  }
}

function mousePressed() {
  values = [
    floor(random(3, 10)),
    floor(random(3, 10)),
    floor(random(3, 10)),
    floor(random(3, 10))
  ];
}`,
      sketch: (p) => {
        const labels = ["sleep", "energy", "focus", "joy"];
        let values = [6, 8, 5, 9];
        p.setup = () => {
          const canvas = p.createCanvas(400, 400);
          canvas.parent("canvas-container");
          p.textSize(13);
        };
        p.draw = () => {
          p.background(250, 246, 240);
          for (let i = 0; i < values.length; i++) {
            const x = 52 + i * 82;
            const h = p.map(values[i], 0, 10, 20, 180);
            p.noStroke();
            p.fill(61, 90, 128, 210);
            p.rect(x, 300 - h, 44, h, 12);
            p.fill(224, 122, 95, 210);
            p.circle(x + 22, 300 - h - 18, p.map(values[i], 0, 10, 12, 54));
            p.fill(44, 42, 38);
            p.text(labels[i], x - 2, 334);
          }
        };
        p.mousePressed = () => {
          values = [
            p.floor(p.random(3, 10)),
            p.floor(p.random(3, 10)),
            p.floor(p.random(3, 10)),
            p.floor(p.random(3, 10))
          ];
        };
      }
    },
    "image-grid-remix-seed": {
      title: "Image Grid Remix Seed",
      session: "Session 4",
      subtitle: "A media seed that repeats one image across a grid, using loops and tint to build a remix instead of a single photograph.",
      tags: ["images", "loops", "tint()"],
      liveSeed: "Click to rebuild the grid with different tint choices and spacing.",
      tryText: "Swap the image, change the grid spacing, or map tint values across rows and columns.",
      noticeText: "The nested loops control the repetition, while the image source stays the same each time.",
      remixText: "Turn it into a poster wall, sticker sheet, webcam grid, or surreal color study.",
      footer: "CC Fest Coding Camp · Starter Sketch · Image repetition and tint",
      code: `let tile;
let spacing = 84;

function preload() {
  tile = loadImage("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'><rect width='80' height='80' rx='16' fill='%23F0EBE3'/><circle cx='40' cy='30' r='18' fill='%233D5A80'/><rect x='22' y='48' width='36' height='12' rx='6' fill='%23E07A5F'/></svg>");
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
}

function draw() {
  background(250, 246, 240);

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      tint(255, 120 + row * 30 + col * 10);
      image(tile, 50 + col * spacing, 50 + row * spacing, 58, 58);
    }
  }
}`,
      sketch: (p) => {
        let tile;
        let spacing = 84;
        p.preload = () => {
          const svg = "<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'><rect width='80' height='80' rx='16' fill='%23F0EBE3'/><circle cx='40' cy='30' r='18' fill='%233D5A80'/><rect x='22' y='48' width='36' height='12' rx='6' fill='%23E07A5F'/></svg>";
          tile = p.loadImage(`data:image/svg+xml;utf8,${svg}`);
        };
        p.setup = () => {
          const canvas = p.createCanvas(400, 400);
          canvas.parent("canvas-container");
          p.imageMode(p.CENTER);
        };
        p.draw = () => {
          p.background(250, 246, 240);
          for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
              p.tint(255, 130 + row * 26 + col * 12);
              const wobble = p.sin(p.frameCount * 0.03 + row + col) * 4;
              p.image(tile, 50 + col * spacing, 50 + row * spacing + wobble, 58, 58);
            }
          }
          p.noTint();
        };
        p.mousePressed = () => {
          spacing = p.random([72, 80, 84, 92]);
        };
      }
    },
    "sound-pulse-seed": {
      title: "Sound Pulse Seed",
      session: "Session 5",
      subtitle: "A tiny sound-reactive seed where one circle pulses with simulated amplitude, offering a gentle on-ramp to sound visualization.",
      tags: ["sound", "map()", "pulsing"],
      liveSeed: "Watch the circle pulse with a simulated sound level. Click to switch the pulse speed.",
      tryText: "Map the level to color, transparency, or background brightness instead of only circle size.",
      noticeText: "A single changing value can control multiple visual properties at the same time.",
      remixText: "Turn the pulse into a speaker, heartbeat, moon, or breathing planet.",
      footer: "CC Fest Coding Camp · Starter Sketch · Sound-inspired motion",
      code: `let phase = 0;
let pulseSpeed = 0.05;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(250, 246, 240);
  let level = map(sin(phase), -1, 1, 0.1, 1);
  let size = map(level, 0.1, 1, 40, 180);

  fill(61, 90, 128, 210);
  circle(width / 2, height / 2, size);
  phase += pulseSpeed;
}

function mousePressed() {
  pulseSpeed = random(0.03, 0.09);
}`,
      sketch: (p) => {
        let phase = 0;
        let pulseSpeed = 0.05;
        p.setup = () => {
          const canvas = p.createCanvas(400, 400);
          canvas.parent("canvas-container");
        };
        p.draw = () => {
          p.background(250, 246, 240);
          const level = p.map(p.sin(phase), -1, 1, 0.1, 1);
          const size = p.map(level, 0.1, 1, 40, 180);
          p.noStroke();
          p.fill(61, 90, 128, 55);
          p.circle(p.width / 2, p.height / 2, size + 26);
          p.fill(224, 122, 95, 180);
          p.circle(p.width / 2, p.height / 2, size);
          phase += pulseSpeed;
        };
        p.mousePressed = () => {
          pulseSpeed = p.random(0.03, 0.09);
        };
      }
    },
    "mini-generative-poster-seed": {
      title: "Mini Generative Poster Seed",
      session: "Session 5",
      subtitle: "A small poster generator that combines text, shapes, and randomness so code immediately produces something publishable-looking.",
      tags: ["randomness", "text", "composition"],
      relatedBridges: ["random-controlled-surprise", "noise-smooth-randomness"],
      relatedTools: ["noise-lab", "noise-vs-random-explorer"],
      relatedSketches: ["generative-tile-pattern-seed", "wander-agent-seed"],
      liveSeed: "Click to generate a new abstract poster. Press s to save the current poster as a PNG.",
      tryText: "Change the word bank, add a subtitle, or press s after generating a version you want to keep.",
      noticeText: "A few arrays and random choices are enough to make each poster feel distinct.",
      remixText: "Make event posters, music flyers, poetry cards, album covers, or mood posters.",
      footer: "CC Fest Coding Camp · Starter Sketch · Generative poster design",
      code: `let titles = ["code bloom", "night signal", "open studio", "future play"];
let palette = [];

function setup() {
  createCanvas(400, 400);
  textFont("Helvetica");
  noLoop();
  buildPoster();
}

function buildPoster() {
  palette = [
    color(61, 90, 128),
    color(224, 122, 95),
    color(129, 178, 154),
    color(240, 235, 227)
  ];
}

function draw() {
  background(random(palette));
  fill(44, 42, 38);
  textSize(34);
  text(random(titles), 32, 70, 300);
}

function mousePressed() {
  buildPoster();
  redraw();
}

function keyPressed() {
  if (key === "s") {
    saveCanvas("cc-fest-poster", "png");
  }
}`,
      sketch: (p) => {
        const titles = ["code bloom", "night signal", "open studio", "future play", "signal garden"];
        let backgroundColor;
        let titleColor;
        let shapes = [];
        function buildPoster() {
          const palette = [
            p.color(61, 90, 128),
            p.color(224, 122, 95),
            p.color(129, 178, 154),
            p.color(240, 235, 227),
            p.color(248, 214, 168)
          ];
          backgroundColor = p.random(palette);
          titleColor = p.random([p.color(44, 42, 38), p.color(255), p.color(61, 90, 128)]);
          shapes = [];
          for (let i = 0; i < 7; i++) {
            shapes.push({
              x: p.random(30, 370),
              y: p.random(110, 360),
              w: p.random(30, 130),
              h: p.random(18, 120),
              kind: p.random(["rect", "circle"]),
              fill: p.random(palette)
            });
          }
        }
        p.setup = () => {
          const canvas = p.createCanvas(400, 400);
          canvas.parent("canvas-container");
          p.textFont("Helvetica");
          p.noLoop();
          buildPoster();
        };
        p.draw = () => {
          p.background(backgroundColor);
          p.noStroke();
          for (const shape of shapes) {
            p.fill(shape.fill);
            if (shape.kind === "rect") {
              p.rect(shape.x, shape.y, shape.w, shape.h, 14);
            } else {
              p.circle(shape.x, shape.y, shape.w);
            }
          }
          p.fill(titleColor);
          p.textSize(34);
          p.textStyle(p.BOLD);
          p.text(p.random(titles), 30, 68, 250);
          p.textSize(14);
          p.textStyle(p.NORMAL);
          p.text("CC FEST · mini poster seed", 32, 94);
        };
        p.mousePressed = () => {
          buildPoster();
          p.redraw();
        };
      }
    },
    "nested-loop-array-grid": {
      title: "Nested Loop Pattern Studio",
      session: "Session 3",
      subtitle: "A compact seed for teaching how nested loops and spacing values build repeated grid patterns.",
      tags: ["nested loops", "patterns", "grid"],
      liveSeed: "Press Play to render the pattern. Edit `spacing` or swap `rect()` for `circle()` to change the system.",
      tryText: "Change `spacing` from `50` to `25` and notice how the grid gets denser.",
      noticeText: "The outer loop steps across one direction of the grid. The inner loop fills the other direction.",
      remixText: "Replace `rect()` with `circle()`, or make the color depend on `x` and `y`.",
      footer: "CC Fest Coding Camp · Starter Sketch · Nested loops and pattern grids",
      code: `let spacing = 50;

function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  background(250, 246, 240);

  for (let x = 0; x < width; x = x + spacing) {
    for (let y = 0; y < height; y = y + spacing) {
      if (x % 100 == 0) {
        fill(random(255));
      } else {
        fill(random(255), random(0, 255), random(255));
      }
      rect(x, y, spacing);
    }
  }
}`
    },
    "array-position-dot-field": {
      title: "Dot Field Position Sketch",
      session: "Session 3",
      subtitle: "A simple array seed that stores many x/y positions, then redraws them as a single related system.",
      tags: ["arrays", "coordinates", "repetition"],
      relatedBridges: ["arrays-one-thing-to-many-things"],
      relatedTools: ["simple-array-explorer", "polished-array-explorer"],
      liveSeed: "Press Play, then click inside the canvas to regenerate the stored dot positions.",
      tryText: "Change the number of points from `100` to `20` or `200`.",
      noticeText: "The two arrays stay connected by index: `xPositions[i]` belongs with `yPositions[i]`.",
      remixText: "Change the dots into stars, faces, or different colors based on the position values.",
      footer: "CC Fest Coding Camp · Starter Sketch · Arrays of positions",
      code: `let xPositions = [];
let yPositions = [];

function setup() {
  createCanvas(400, 400);
  noStroke();
  generateDotField();
}

function draw() {
  background(220);
  fill(44, 42, 38);

  for (let i = 0; i < xPositions.length; i++) {
    ellipse(xPositions[i], yPositions[i], 10, 10);
  }
}

function mousePressed() {
  generateDotField();
}

function generateDotField() {
  xPositions = [];
  yPositions = [];

  for (let i = 0; i < 100; i++) {
    xPositions.push(random(width));
    yPositions.push(random(height));
  }
}`
    },
    "random-poetry-generator": {
      title: "Random Poetry Generator",
      session: "Session 4",
      subtitle: "A tiny language sketch that uses arrays and randomness to build short poetic lines.",
      tags: ["arrays", "randomness", "text"],
      liveSeed: "Press Play, then click inside the canvas to redraw a new poem from the same word banks.",
      tryText: "Add two new adjectives and two new nouns, then play again to see how the poem changes.",
      noticeText: "The sketch stays short because the arrays do the heavy lifting. New words create new outcomes without changing the structure.",
      remixText: "Make it spooky, joyful, futuristic, or local to your neighborhood by swapping the word banks.",
      footer: "CC Fest Coding Camp · Starter Sketch · Generative language",
      code: `let adjectives = ["baking", "blue", "wet", "lazy", "sunburnt"];
let nouns = ["tree", "hill", "highway", "sky", "city"];
let verbs = ["shimmers", "sweats", "melts", "swims", "gorges"];

function setup() {
  createCanvas(400, 400);
  noLoop();
  textFont("Helvetica", 48);
}

function draw() {
  background(255, 255, 100);
  fill(44, 42, 38);
  text("the", 50, 100);
  text(random(adjectives), 50, 150);
  text(random(nouns), 50, 200);
  text(random(verbs), 50, 250);
}

function mousePressed() {
  redraw();
}`
    },
    "random-sentence-generator": {
      title: "Word Bank Sentence Generator",
      session: "Session 4",
      subtitle: "A lightweight sketch seed for generating simple random sentences from three small arrays.",
      tags: ["language", "arrays", "randomness"],
      liveSeed: "Press Play to generate the first set of sentences, then click the canvas to remix them.",
      tryText: "Change the nouns and verbs so the sentences feel like a sports story, game story, or camp story.",
      noticeText: "The sentence structure stays the same, but the array choices make each result feel different.",
      remixText: "Add punctuation, a second sentence pattern, or a background illustration tied to the words.",
      footer: "CC Fest Coding Camp · Starter Sketch · Random sentence generation",
      code: `let verbs = ["runs", "jumps", "swims"];
let nouns = ["saber", "meghna", "anaya"];
let adverbs = ["fast", "slowly", "quietly"];

function setup() {
  createCanvas(400, 400);
  generateSentences();
}

function generateSentences() {
  background(255);
  fill(44, 42, 38);

  for (let i = 0; i < 3; i++) {
    textSize(20);
    text(
      random(nouns) + " " + random(verbs) + " " + random(adverbs) + ".",
      50 * i + 50,
      50 * i + 50
    );
  }
}

function mousePressed() {
  generateSentences();
}`
    },
    "lerp-follow-seed": {
      title: "lerp() Follow Seed",
      session: "Things That Move",
      subtitle: "A smooth-motion seed where a circle follows the mouse using lerp() — the simplest way to feel the difference between snapping and easing.",
      tags: ["lerp()", "motion", "easing"],
      relatedBridges: ["map-range-translator"],
      relatedTools: ["lerp-explorer", "dist-map-lerp-chain"],
      liveSeed: "Move the mouse slowly, then quickly. The circle eases toward you instead of jumping.",
      tryText: "Change 0.08 to 0.3 for a faster follow, or 0.02 for a very dreamy one. Each value gives the motion a personality.",
      noticeText: "lerp() moves 8% of the remaining distance every frame — so it slows down as it gets closer.",
      remixText: "Make multiple circles each following at different speeds, or make the follower leave a fading trail.",
      footer: "CC Fest Coding Camp · Starter Sketch · lerp() and easing",
      code: `let x = 200;
let y = 200;

function setup() {
  createCanvas(400, 400);
  noStroke();
}

function draw() {
  background(250, 246, 240, 30);

  x = lerp(x, mouseX, 0.08);
  y = lerp(y, mouseY, 0.08);

  // target ring
  stroke(224, 122, 95, 120);
  noFill();
  strokeWeight(1.5);
  circle(mouseX, mouseY, 28);

  // follower
  noStroke();
  fill(61, 90, 128, 220);
  circle(x, y, 42);
}`,
      sketch: (p) => {
        let x = 200;
        let y = 200;
        p.setup = () => {
          const canvas = p.createCanvas(400, 400);
          canvas.parent("canvas-container");
        };
        p.draw = () => {
          p.background(250, 246, 240, 30);
          x = p.lerp(x, p.mouseX, 0.08);
          y = p.lerp(y, p.mouseY, 0.08);
          p.stroke(224, 122, 95, 120);
          p.noFill();
          p.strokeWeight(1.5);
          p.circle(p.mouseX, p.mouseY, 28);
          p.noStroke();
          p.fill(61, 90, 128, 50);
          p.circle(x, y, 60);
          p.fill(61, 90, 128, 220);
          p.circle(x, y, 42);
        };
      }
    },
    "dist-proximity-seed": {
      title: "dist() Proximity Seed",
      session: "Things That Move",
      subtitle: "A seed where shapes continuously react to mouse distance — size and opacity shift in real time, making dist() feel physical before it feels like code.",
      tags: ["dist()", "proximity", "interaction"],
      relatedBridges: ["map-range-translator", "distance-becomes-behavior"],
      relatedTools: ["dist-map-lerp-chain", "map-explorer"],
      liveSeed: "Move the mouse near and far from the circles. The closer you get, the bigger and brighter they grow.",
      tryText: "Change 300 in the map() call to 150 so the effect only activates when you're closer.",
      noticeText: "dist() returns a number — the bigger the number, the farther away. map() turns that number into a size.",
      remixText: "Make circles repel the mouse instead of attracting it, or change color instead of size.",
      footer: "CC Fest Coding Camp · Starter Sketch · dist() and continuous proximity",
      code: `let dots = [];

function setup() {
  createCanvas(400, 400);
  noStroke();
  for (let i = 0; i < 9; i++) {
    dots.push({
      x: 60 + (i % 3) * 140,
      y: 120 + floor(i / 3) * 80
    });
  }
}

function draw() {
  background(250, 246, 240);

  for (let dot of dots) {
    let d = dist(mouseX, mouseY, dot.x, dot.y);
    let size = map(d, 0, 300, 80, 16);
    let alpha = map(d, 0, 300, 255, 70);

    fill(61, 90, 128, alpha);
    circle(dot.x, dot.y, size);
  }
}`,
      sketch: (p) => {
        const dots = [];
        p.setup = () => {
          const canvas = p.createCanvas(400, 400);
          canvas.parent("canvas-container");
          p.noStroke();
          for (let i = 0; i < 9; i++) {
            dots.push({ x: 60 + (i % 3) * 140, y: 120 + Math.floor(i / 3) * 80 });
          }
        };
        p.draw = () => {
          p.background(250, 246, 240);
          for (const dot of dots) {
            const d = p.dist(p.mouseX, p.mouseY, dot.x, dot.y);
            const size = p.map(d, 0, 300, 80, 16);
            const alpha = p.map(d, 0, 300, 255, 70);
            p.fill(61, 90, 128, alpha);
            p.circle(dot.x, dot.y, size);
          }
        };
      }
    },
    "hsb-color-seed": {
      title: "HSB Color Expression Seed",
      session: "Your Canvas, Your Voice",
      subtitle: "A seed where mouse Y controls saturation across a row of hues — drag down and every color drains to gray, making HSB click instantly.",
      tags: ["HSB", "color", "map()"],
      relatedBridges: ["color-numbers-become-feeling"],
      relatedTools: ["rgb-hsb-color-lab", "color-blend-modes-explorer"],
      liveSeed: "Move the mouse up and down. Watch every hue drain to gray as saturation hits zero.",
      tryText: "Try mapping mouseX to hue rotation instead of mouseY to saturation — you get a completely different effect.",
      noticeText: "The magic moment: drag to the bottom. All seven circles turn the same gray. Hue stops mattering when saturation is 0.",
      remixText: "Add a second row where brightness changes, or turn the circles into a gradient stripe background.",
      footer: "CC Fest Coding Camp · Starter Sketch · HSB color and saturation",
      code: `function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  noStroke();
}

function draw() {
  background(0, 0, 96);

  let sat = map(mouseY, 0, height, 100, 0);

  for (let i = 0; i < 7; i++) {
    let hue = map(i, 0, 6, 0, 300);
    let x = 36 + i * 52;

    fill(hue, sat, 78);
    circle(x, height / 2, 44);

    fill(0, 0, 30);
    textSize(11);
    textAlign(CENTER);
    text(floor(hue) + "°", x, height / 2 + 34);
  }

  fill(0, 0, 30);
  textSize(14);
  textAlign(LEFT);
  text("saturation: " + floor(sat) + "%", 18, 30);
}`,
      sketch: (p) => {
        p.setup = () => {
          const canvas = p.createCanvas(400, 400);
          canvas.parent("canvas-container");
          p.colorMode(p.HSB, 360, 100, 100);
          p.noStroke();
        };
        p.draw = () => {
          p.background(0, 0, 96);
          const sat = p.map(p.mouseY, 0, p.height, 100, 0, true);
          for (let i = 0; i < 7; i++) {
            const hue = p.map(i, 0, 6, 0, 300);
            const x = 36 + i * 52;
            p.fill(hue, sat, 78);
            p.circle(x, p.height / 2, 44);
            p.fill(0, 0, 30);
            p.textSize(10);
            p.textAlign(p.CENTER);
            p.text(Math.floor(hue) + "°", x, p.height / 2 + 34);
          }
          p.fill(0, 0, 30);
          p.textSize(13);
          p.textAlign(p.LEFT);
          p.text("sat: " + Math.floor(sat) + "%", 18, 28);
        };
      }
    },
    "text-as-visual-seed": {
      title: "Text as Visual Material",
      session: "Open Studio",
      subtitle: "A seed where words become visual objects — each one placed, sized, rotated, and colored independently, treating text like a drawn shape.",
      tags: ["text", "composition", "randomness"],
      liveSeed: "Click to regenerate the layout. Change the words and colors to make it feel like you.",
      tryText: "Change the words array to your own words — your name, a place, a feeling. Watch the composition shift.",
      noticeText: "Each word is drawn with push()/pop() so translate and rotate apply only to that word, then reset.",
      remixText: "Make all words the same size but different colors, or have size grow based on word position from center.",
      footer: "CC Fest Coding Camp · Starter Sketch · Text as visual material",
      code: `let words = ["make", "code", "remix", "play", "build", "explore", "yes", "now"];

function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  background(250, 246, 240);

  for (let i = 0; i < 14; i++) {
    let x = random(30, width - 30);
    let y = random(40, height - 20);
    let s = random(14, 72);
    let a = random(-PI / 5, PI / 5);
    let c = random([
      color(61, 90, 128, 220),
      color(224, 122, 95, 210),
      color(129, 178, 154, 220)
    ]);

    push();
    translate(x, y);
    rotate(a);
    noStroke();
    fill(c);
    textSize(s);
    textAlign(CENTER, CENTER);
    text(random(words), 0, 0);
    pop();
  }
}

function mousePressed() {
  redraw();
}`,
      sketch: (p) => {
        const words = ["make", "code", "remix", "play", "build", "explore"];
        let items = [];
        function build() {
          items = [];
          for (let i = 0; i < 10; i++) {
            items.push({
              x: p.random(20, 380),
              y: p.random(30, 370),
              s: p.random(12, 64),
              a: p.random(-Math.PI / 5, Math.PI / 5),
              word: p.random(words),
              c: p.random([p.color(61, 90, 128, 210), p.color(224, 122, 95, 200), p.color(129, 178, 154, 210)])
            });
          }
        }
        p.setup = () => {
          const canvas = p.createCanvas(400, 400);
          canvas.parent("canvas-container");
          p.noLoop();
          build();
        };
        p.draw = () => {
          p.background(250, 246, 240);
          p.noStroke();
          for (const item of items) {
            p.push();
            p.translate(item.x, item.y);
            p.rotate(item.a);
            p.fill(item.c);
            p.textSize(item.s);
            p.textAlign(p.CENTER, p.CENTER);
            p.text(item.word, 0, 0);
            p.pop();
          }
        };
        p.mousePressed = () => { build(); p.redraw(); };
      }
    },
    "code-postcard-from-my-world": {
      title: "Code Postcard from My World",
      session: "Session 1",
      subtitle: "A tiny visual hello built from background, shapes, color, and one personal design decision.",
      tags: ["shapes", "color", "identity"],
      relatedBridges: ["color-numbers-become-feeling"],
      relatedTools: ["rgb-hsb-color-lab", "shape-and-color-explorer"],
      liveSeed: "Change the colors and shapes until the scene feels like a place, memory, classroom, or mood.",
      tryText: "Replace the mountains with buildings, desks, windows, trees, or any shapes from your world.",
      noticeText: "This sketch is personal before it is complicated. A few shapes can already communicate a point of view.",
      remixText: "Add text, make one part move with frameCount, or turn the color palette into a weather or feeling code.",
      footer: "CC Fest Coding Camp · Starter Sketch · Code postcard",
      code: `function setup() {
  createCanvas(400, 400);
  colorMode(HSB, 360, 100, 100);
  noStroke();
}

function draw() {
  // Sky
  background(210, 40, 95);

  // Mountains, buildings, or another place from your world
  fill(220, 60, 60);
  triangle(0, 300, 130, 150, 260, 300);
  fill(220, 50, 70);
  triangle(140, 300, 280, 120, 400, 300);

  // Ground
  fill(100, 50, 60);
  rect(0, 300, 400, 100);

  // Sun or moon
  fill(50, 80, 100);
  ellipse(320, 80, 60, 60);

  // A window of light
  fill(60, 90, 100);
  rect(170, 220, 60, 60, 4);
}`
    },
    "one-dataset-three-views": {
      title: "One Dataset, Three Views",
      session: "Session 4",
      subtitle: "The same values become bars, circles, or a color field. Data visualization is a design decision.",
      tags: ["arrays", "data", "mapping"],
      liveSeed: "Press 1, 2, or 3 in the preview to switch visual forms while keeping the same numbers.",
      tryText: "Change the values array, then compare which view makes the difference easiest to see.",
      noticeText: "The data does not change. The representation changes what the viewer notices.",
      remixText: "Add labels, a title, a second dataset, hover interaction, or a note about what the chart hides.",
      footer: "CC Fest Coding Camp · Starter Sketch · Same data, different stories",
      code: `let values = [3, 7, 5, 9, 4, 8, 2, 6];
let labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon"];
let view = 1;

function setup() {
  createCanvas(500, 300);
  textAlign(CENTER);
}

function draw() {
  background(245);
  let maxVal = max(values);
  let spacing = width / values.length;

  for (let i = 0; i < values.length; i++) {
    let v = values[i];

    if (view === 1) {
      let h = map(v, 0, maxVal, 0, height - 70);
      fill(61, 90, 128);
      rect(i * spacing + 6, height - h - 35, spacing - 12, h);
    } else if (view === 2) {
      let d = map(v, 0, maxVal, 14, 80);
      fill(224, 122, 95, 190);
      circle(i * spacing + spacing / 2, height / 2, d);
    } else {
      let shade = map(v, 0, maxVal, 230, 50);
      fill(shade);
      rect(i * spacing, 0, spacing, height);
    }

    fill(44);
    text(labels[i], i * spacing + spacing / 2, height - 12);
  }
}

function keyPressed() {
  if (key === "1") view = 1;
  if (key === "2") view = 2;
  if (key === "3") view = 3;
}`
    },
    "classroom-grid-array-seed": {
      title: "Classroom Grid / Intentional Array Seed",
      session: "Session 4",
      subtitle: "A grid where each cell reads a value from an array, bridging loop patterns into data stories.",
      tags: ["nested loops", "arrays", "systems"],
      liveSeed: "Each square reads from the access array. Change the 0s, 1s, and 2s to redesign the classroom map.",
      tryText: "Change a few values in the array, then change the colors that represent quiet, medium, and buzzing.",
      noticeText: "The nested loop gives each cell a row and column. The array gives that cell a stored value.",
      remixText: "Make the values represent attendance, mood, garden sensors, neighborhood blocks, or a weekly classroom rhythm.",
      footer: "CC Fest Coding Camp · Starter Sketch · Grid as data model",
      code: `let rows = 6;
let cols = 10;

// 0 = quiet, 1 = medium, 2 = buzzing
let access = [
  0, 1, 2, 1, 0, 2, 1, 2, 0, 1,
  2, 0, 1, 2, 1, 0, 2, 1, 2, 0,
  1, 2, 0, 1, 2, 1, 0, 2, 1, 2,
  0, 1, 2, 0, 1, 2, 1, 0, 2, 1,
  2, 1, 0, 2, 0, 1, 2, 1, 0, 2,
  1, 0, 2, 1, 2, 0, 1, 2, 1, 0
];

function setup() {
  createCanvas(500, 320);
  noLoop();
}

function draw() {
  background(245);
  let cellW = width / cols;
  let cellH = height / rows;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let index = row * cols + col;
      let val = access[index];

      if (val === 0) fill("#a8d8ea");
      else if (val === 1) fill("#f9c74f");
      else fill("#90be6d");

      rect(col * cellW + 3, row * cellH + 3, cellW - 6, cellH - 6, 5);
    }
  }
}`
    },
    "arrays-in-motion": {
      title: "Moving Sentence Machine",
      session: "Session 4",
      subtitle: "A starter sketch that turns generated phrases into moving text objects, combining arrays, language, and motion.",
      tags: ["text", "motion", "arrays"],
      liveSeed: "Press Play to generate moving phrases. Click to remix them, then press any key in the preview to pause or resume motion.",
      tryText: "Click to remix the phrases, then press a key to pause or resume the movement.",
      noticeText: "The sketch stores whole sentence objects with both text and position data, not just single words.",
      remixText: "Make the sentences fall, bounce, fade, or react to the mouse instead of only sliding sideways.",
      footer: "CC Fest Coding Camp · Starter Sketch · Arrays of moving sentences",
      code: `let sentences = [];
let xspeed = 2;
let moving = true;

let verbs = ["runs", "jumps", "swims"];
let nouns = ["saber", "meghna", "anaya"];
let adverbs = ["fast", "slowly", "quietly"];

function setup() {
  createCanvas(400, 400);
  textSize(20);
  generateSentences();
}

function draw() {
  background(255);
  fill(44, 42, 38);
  for (let s of sentences) {
    text(s.text, s.x, s.y);

    if (moving) {
      s.x += xspeed;
    }

    if (s.x > width) {
      s.x = -textWidth(s.text);
    }
  }
}

function generateSentences() {
  sentences = [];
  for (let i = 0; i < 3; i++) {
    let phrase = random(nouns) + " " + random(verbs) + " " + random(adverbs);
    sentences.push({ text: phrase, x: i * 20, y: i * 100 + 80 });
  }
}

function mousePressed() {
  generateSentences();
}

function keyPressed() {
  moving = !moving;
}`
    },
    "gravity-bounce-seed": {
      title: "Gravity Bounce Seed",
      session: "Session 2",
      subtitle: "A ball falls with gravity, builds up velocity, and bounces off the floor — the simplest physics simulation in p5.js.",
      tags: ["gravity", "velocity", "bounce", "physics"],
      liveSeed: "Watch gravity pull the ball down each frame. Change the gravity and damping values to feel the difference.",
      tryText: "Change gravity from 0.5 to 1.5. Then change damping from 0.75 to 0.95. How do the two variables interact?",
      noticeText: "vy += gravity runs every frame. Even a small gravity value accumulates — that steady build-up is acceleration.",
      remixText: "Add a second ball starting from a different position. Make each ball a different color. Can you make one ball extra bouncy and one very heavy?",
      footer: "CC Fest Coding Camp · Starter Sketch · Gravity, velocity, and bounce",
      code: `let ballX = 200;
let ballY = 40;
let vy = 0;       // vertical velocity
let gravity = 0.5;
let damping = 0.75; // energy kept on bounce

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(244, 239, 230);

  // gravity adds to velocity each frame
  vy += gravity;
  ballY += vy;

  // bounce off the floor
  if (ballY + 20 >= height) {
    ballY = height - 20;
    vy *= -damping;
  }

  // draw the ball
  fill(61, 90, 128);
  noStroke();
  circle(ballX, ballY, 40);
}

function mousePressed() {
  // click to reset
  ballY = 40;
  vy = 0;
}`
    },
    "angle-to-mouse-seed": {
      title: "Angle to Mouse Seed",
      session: "Session 2",
      subtitle: "An arrow points toward the mouse using atan2() — the standard way to compute the angle between two points in p5.js.",
      tags: ["atan2()", "rotation", "angle", "mouse"],
      liveSeed: "Move your mouse around. The arrow follows by computing a fresh angle every frame.",
      tryText: "Add PI to the angle: angle = atan2(dy, dx) + PI. The arrow flips 180° and now points away from the mouse.",
      noticeText: "atan2() always takes dy first, then dx — opposite of what you might expect. The result is in radians, which rotate() uses directly.",
      remixText: "Replace the triangle with a spaceship shape drawn with beginShape(). Add + HALF_PI to the angle if your shape's nose points up instead of right.",
      footer: "CC Fest Coding Camp · Starter Sketch · atan2(), rotation, and mouse tracking",
      code: `function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(244, 239, 230);

  let cx = width / 2;
  let cy = height / 2;

  // distance from center to mouse
  let dx = mouseX - cx;
  let dy = mouseY - cy;

  // atan2 gives the angle between two points
  let angle = atan2(dy, dx);

  // draw from the center, rotated toward mouse
  push();
  translate(cx, cy);
  rotate(angle);

  // arrow body
  stroke(61, 90, 128);
  strokeWeight(3);
  line(0, 0, 80, 0);

  // arrowhead
  fill(61, 90, 128);
  noStroke();
  triangle(80, 0, 60, -10, 60, 10);

  // center dot
  fill(224, 122, 95);
  circle(0, 0, 16);
  pop();
}`
    },
    "sine-oscillation-seed": {
      title: "Sine Oscillation Seed",
      session: "Session 2",
      subtitle: "An object moves back and forth automatically using sin(frameCount * speed) — the foundation of all smooth repeating motion in p5.js.",
      tags: ["sin()", "oscillation", "animation", "motion"],
      relatedBridges: ["how-p5-thinks-about-time", "triangle-circle-wave-explorer"],
      relatedTools: ["animation-explorer", "sine-cosine-motion-explorer"],
      liveSeed: "The ball moves by itself. Change amplitude and speed to shape the motion.",
      tryText: "Change speed from 0.03 to 0.1. Then change amplitude from 150 to 40. Notice how the two variables are completely independent.",
      noticeText: "sin() always returns a value between -1 and 1. Multiplying by amplitude scales that range. frameCount * speed controls how fast the cycle repeats.",
      remixText: "Add a second ball using cos() instead of sin() — it will be 90 degrees out of phase, making them move like a figure-8 when combined.",
      footer: "CC Fest Coding Camp · Starter Sketch · Sine oscillation and smooth motion",
      code: `let amplitude = 150; // how far it moves
let speed = 0.03;    // how fast it cycles

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(250, 246, 240);

  // sin() gives a value from -1 to 1
  // multiply by amplitude to set the range
  let x = width / 2 + sin(frameCount * speed) * amplitude;

  // guide line
  stroke(210, 200, 185);
  strokeWeight(1);
  line(width / 2 - amplitude, height / 2,
       width / 2 + amplitude, height / 2);

  // oscillating dot
  noStroke();
  fill(224, 122, 95);
  circle(x, height / 2, 40);
}`
    },
    "circular-motion-orbit-seed": {
      title: "Circular Motion Orbit Seed",
      session: "Session 2",
      subtitle: "A dot orbits a center point using sin() and cos() together — the standard pattern for circular motion in p5.js.",
      tags: ["sin()", "cos()", "orbit", "circular motion"],
      liveSeed: "Watch the dot trace a perfect circle. Change orbitRadius and speed to reshape the orbit.",
      tryText: "Change orbitRadius to 50, then to 160. Then change speed from 0.03 to 0.08 — the dot moves faster without changing the circle size.",
      noticeText: "cos() gives the x position, sin() gives the y position. Together they trace a circle — the angle advances each frame, carrying the dot around.",
      remixText: "Add a second dot orbiting at twice the radius and half the speed. Or add a third dot that orbits the first dot — a moon orbiting a planet.",
      footer: "CC Fest Coding Camp · Starter Sketch · Circular motion with sin and cos",
      code: `let angle = 0;
let orbitRadius = 120;
let speed = 0.03;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(244, 239, 230);

  // advance the angle each frame
  angle += speed;

  // cos → x, sin → y gives circular motion
  let x = width / 2 + cos(angle) * orbitRadius;
  let y = height / 2 + sin(angle) * orbitRadius;

  // orbit path
  noFill();
  stroke(210, 200, 185);
  strokeWeight(1);
  circle(width / 2, height / 2, orbitRadius * 2);

  // center anchor
  fill(107, 103, 96);
  noStroke();
  circle(width / 2, height / 2, 12);

  // orbiting dot
  fill(61, 90, 128);
  circle(x, y, 30);
}`
    },
    "generative-tile-pattern-seed": {
      title: "Generative Tile Pattern Seed",
      session: "Session 3",
      subtitle: "Nested loops draw a grid of tiles, each one slightly varied — the foundation of generative pattern-making in p5.js.",
      tags: ["nested loops", "grid", "generative", "pattern"],
      liveSeed: "Click Run to generate a new pattern. Change tileSize or the variation amounts to reshape the grid.",
      tryText: "Change tileSize from 50 to 30. Then change the noise multiplier from 0.1 to 0.4. Notice how a smaller tile size with more variation creates a very different feel.",
      noticeText: "The outer loop steps through rows, the inner through columns. Each tile gets a unique (col, row) address — use those numbers to drive color, size, or rotation.",
      remixText: "Instead of circles, draw a small line at each grid point rotated by noise(). Or alternate between two shapes based on whether (col + row) is even or odd.",
      footer: "CC Fest Coding Camp · Starter Sketch · Nested loops and generative tile patterns",
      code: `let tileSize = 50;

function setup() {
  createCanvas(400, 400);
  noLoop(); // draw once; press Run to regenerate
}

function draw() {
  background(244, 239, 230);

  let cols = width / tileSize;
  let rows = height / tileSize;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let x = col * tileSize + tileSize / 2;
      let y = row * tileSize + tileSize / 2;

      // vary size and color using noise
      let n = noise(col * 0.1, row * 0.1);
      let d = map(n, 0, 1, 10, tileSize - 4);

      fill(map(n, 0, 1, 61, 224),
           map(n, 0, 1, 90, 122),
           map(n, 0, 1, 128, 95), 200);
      noStroke();
      circle(x, y, d);
    }
  }
}

function mousePressed() {
  noiseSeed(floor(random(9999)));
  redraw();
}`
    },
    "class-creature-stamp-seed": {
      title: "Class Creature Stamp Seed",
      session: "Session 3",
      subtitle: "A simple class with a display() method — click to stamp creatures on the canvas, each one a unique instance with its own stored properties.",
      tags: ["class", "objects", "mousePressed", "stamp"],
      liveSeed: "Click anywhere to stamp a creature. Each one is a new object with its own color and size.",
      tryText: "Change the size range from random(20, 60) to random(10, 100). Then add a third property — maybe a rotation angle — and use it inside display().",
      noticeText: "Each mousePressed() call runs new Creature() which stores fresh random values. The creature array holds all of them — each one independent.",
      remixText: "Add a second class that extends Creature and draws a different shape. Mix both types in the same array and let the sketch stamp whichever one is selected.",
      footer: "CC Fest Coding Camp · Starter Sketch · Classes, objects, and stamping",
      code: `let creatures = [];

class Creature {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(20, 60);
    this.r = random(40, 220);
    this.g = random(80, 180);
    this.b = random(80, 200);
  }

  display() {
    fill(this.r, this.g, this.b, 200);
    noStroke();

    // body
    circle(this.x, this.y, this.size);

    // eyes
    fill(255);
    let eyeOff = this.size * 0.18;
    circle(this.x - eyeOff, this.y - eyeOff * 0.5, this.size * 0.22);
    circle(this.x + eyeOff, this.y - eyeOff * 0.5, this.size * 0.22);

    fill(30);
    circle(this.x - eyeOff, this.y - eyeOff * 0.5, this.size * 0.1);
    circle(this.x + eyeOff, this.y - eyeOff * 0.5, this.size * 0.1);
  }
}

function setup() {
  createCanvas(400, 400);
  background(244, 239, 230);
}

function draw() {
  for (let c of creatures) {
    c.display();
  }
}

function mousePressed() {
  creatures.push(new Creature(mouseX, mouseY));
}`
    },
    "particle-emitter-seed": {
      title: "Particle Emitter Seed",
      session: "Session 3",
      subtitle: "An array of particle objects, each emitted from the mouse position and fading out over time — the classic pattern for sparks, trails, and effects.",
      tags: ["particles", "arrays", "objects", "fade"],
      liveSeed: "Move the mouse to emit particles. They drift upward, fade, and are automatically removed when invisible.",
      tryText: "Change the gravity from -0.05 to 0.1 — particles will fall down instead of floating up. Then change lifespan from 120 to 40 for a snappier effect.",
      noticeText: "filter() removes particles whose lifespan hits zero every frame. Without it the array grows forever. The sketch slows down — try commenting it out to feel the difference.",
      remixText: "Make particles explode outward in all directions on mousePressed() instead of streaming continuously. Or give each particle a random color from a palette array.",
      footer: "CC Fest Coding Camp · Starter Sketch · Particle arrays, lifecycle, and fade",
      code: `let particles = [];

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(244, 239, 230);

  // emit a particle at mouse position
  if (mouseIsPressed) {
    particles.push({
      x: mouseX,
      y: mouseY,
      vx: random(-1.5, 1.5),
      vy: random(-3, -0.5),
      lifespan: 120,
      size: random(8, 20)
    });
  }

  // update and draw all particles
  for (let p of particles) {
    p.vy += -0.05; // gentle float up
    p.x += p.vx;
    p.y += p.vy;
    p.lifespan--;

    let alpha = map(p.lifespan, 0, 120, 0, 255);
    fill(224, 122, 95, alpha);
    noStroke();
    circle(p.x, p.y, p.size);
  }

  // remove dead particles
  particles = particles.filter(p => p.lifespan > 0);
}`
    },
    "wander-agent-seed": {
      title: "Wander Agent Seed",
      session: "Session 5",
      subtitle: "A single autonomous agent wanders the canvas using smooth noise-driven angle changes — the simplest form of emergent, life-like motion.",
      tags: ["agents", "noise()", "wander", "autonomous"],
      liveSeed: "The agent wanders on its own. Change wanderStrength and speed to reshape its personality.",
      tryText: "Change wanderStrength from 0.015 to 0.08. The agent becomes jittery and erratic. Then lower speed from 2 to 0.5 — it still wanders but very slowly.",
      noticeText: "noise() returns a smooth value that changes gradually as its input increases. Using frameCount * 0.01 as input gives a slowly drifting angle — much more organic than random().",
      remixText: "Add a second agent with a different wanderStrength. Make them leave a trail by not clearing the background. Or make the agent turn toward the mouse when it gets close.",
      footer: "CC Fest Coding Camp · Starter Sketch · Wander behavior with noise()",
      code: `let x, y;
let angle = 0;
let wanderStrength = 0.015;
let speed = 2;

function setup() {
  createCanvas(400, 400);
  x = width / 2;
  y = height / 2;
}

function draw() {
  background(244, 239, 230, 40); // low alpha = trail

  // noise() gives smooth, organic angle drift
  angle += map(noise(frameCount * wanderStrength), 0, 1, -0.2, 0.2);

  x += cos(angle) * speed;
  y += sin(angle) * speed;

  // wrap edges
  if (x < 0) x = width;
  if (x > width) x = 0;
  if (y < 0) y = height;
  if (y > height) y = 0;

  // draw agent as a directional arrow
  push();
  translate(x, y);
  rotate(angle);
  fill(61, 90, 128, 200);
  noStroke();
  triangle(14, 0, -8, -7, -8, 7);
  pop();
}`
    },
    "parallel-arrays-bar-chart-seed": {
      title: "Parallel Arrays Bar Chart Seed",
      session: "Session 4",
      subtitle: "Two arrays, one loop, one bar chart. The exact structure from Session 4: names[i] labels each bar, values[i] sets the height.",
      tags: ["arrays", "for loop", "rect()", "data"],
      liveSeed: "Change the names and values to your own data. Try your class, your week, your mood scores.",
      tryText: "Change 'Saber' to your name and change the ages to something from your own life.",
      noticeText: "names[i] and values[i] share the same index i — that connection is how parallel arrays work.",
      remixText: "Use colors[], add a title with text(), make bars horizontal, or animate them growing from 0.",
      footer: "CC Fest Coding Camp · Starter Sketch · Parallel arrays and bar charts",
      code: `// Two parallel arrays — names and values
let names  = ["Saber", "Lucia", "Megna", "Anaya"];
let values = [42, 38, 8, 5];

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER);
}

function draw() {
  background(244, 239, 230);

  let barW = width / names.length;
  let maxVal = max(values);

  for (let i = 0; i < names.length; i++) {
    // values[i] sets the height
    let h = map(values[i], 0, maxVal, 0, 300);

    // draw the bar
    fill(61, 90, 128);
    noStroke();
    rect(i * barW + 8, height - 40 - h, barW - 16, h, 4, 4, 0, 0);

    // names[i] labels the bar
    fill(60);
    textSize(13);
    text(names[i], i * barW + barW / 2, height - 20);

    // value above bar
    fill(100);
    textSize(11);
    text(values[i], i * barW + barW / 2, height - 44 - h);
  }

  // baseline
  stroke(180);
  strokeWeight(1);
  line(0, height - 40, width, height - 40);
}`
    },
    "font-loader-seed": {
      title: "Font Loader Seed",
      session: "Session 4",
      subtitle: "Load a custom font with preload() and display it in a sketch. The declare → load → use pattern applies to fonts, images, and sounds.",
      tags: ["preload()", "loadFont()", "textFont()", "assets"],
      liveSeed: "The font loads before setup() runs. Change the font URL, size, or the text displayed.",
      tryText: "Replace the font URL with a different Google Fonts .ttf link. Find one at fonts.google.com.",
      noticeText: "preload() runs before setup() and draw(). Any asset loaded there is always ready when the sketch starts.",
      remixText: "Add a second font, animate the text size, or build a poster with multiple text styles.",
      footer: "CC Fest Coding Camp · Starter Sketch · preload(), loadFont(), and the declare/load/use pattern",
      code: `// STEP 1 — DECLARE (outside everything)
let myFont;

// STEP 2 — LOAD (inside preload)
function preload() {
  // Press Start 2P — a free pixel font from Google Fonts
  myFont = loadFont(
    "https://fonts.gstatic.com/s/pressstart2p/v15/e3t4euO8T-267oIAQAu6jDQyK3nVivM.woff2"
  );
}

// STEP 3 — USE (inside setup or draw)
function setup() {
  createCanvas(400, 300);
  textFont(myFont);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(244, 239, 230);

  // Large display text
  fill(61, 90, 128);
  noStroke();
  textSize(28);
  text("Hello!", width / 2, height / 2 - 30);

  // Smaller subtitle
  textSize(12);
  fill(120);
  text("Custom font loaded with preload()", width / 2, height / 2 + 20);

  // The pattern works the same for images and sounds:
  // let img;
  // function preload() { img = loadImage("url"); }
  // function draw()    { image(img, 0, 0); }
}`
    },
    "image-loader-seed": {
      title: "Image Loader Seed",
      session: "Session 4",
      subtitle: "Load an image with preload() and display it in a sketch. The same declare → load → use pattern from the font loader, applied to images.",
      tags: ["preload()", "loadImage()", "image()", "assets"],
      liveSeed: "The image loads before setup() runs. Try tinting it, resizing it, or drawing shapes over it.",
      tryText: "Add tint(255, 0, 0) before image() to make the image red. Then try tint(255, 255, 0, 180) for a semi-transparent yellow.",
      noticeText: "image() uses the same x, y, width, height logic as rect(). You can position and resize any image.",
      remixText: "Load two images, overlay them, apply filters with filter(), or use get() to sample pixel colors.",
      footer: "CC Fest Coding Camp · Starter Sketch · preload(), loadImage(), and the declare/load/use pattern",
      code: `// STEP 1 — DECLARE
let img;

// STEP 2 — LOAD
function preload() {
  // Picsum gives a random public-domain photo
  // Change the numbers to get a different image
  img = loadImage("https://picsum.photos/seed/ccfest/400/300");
}

// STEP 3 — USE
function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(244, 239, 230);

  // image(img, x, y, width, height)
  // same coordinate system as rect()
  image(img, 0, 0, width, height);

  // Try uncommenting one of these:
  // tint(255, 0, 0);        // red tint
  // tint(255, 200, 0, 180); // yellow, semi-transparent
  // filter(GRAY);           // grayscale

  // Draw shapes on top of the image
  noFill();
  stroke(255);
  strokeWeight(3);
  rect(10, 10, width - 20, height - 20, 8);
}`
    },
    "text-array-seed": {
      title: "Text Array Seed",
      session: "Session 4",
      subtitle: "Store words, phrases, or poem lines in an array and display them on canvas. Text as data, arranged spatially or cycling over time.",
      tags: ["arrays", "text()", "strings", "generative text"],
      liveSeed: "Change the words in the array. Try your own poem lines, quotes, or word list.",
      tryText: "Change the array to five words that describe how you feel right now.",
      noticeText: "text() uses x and y just like circle() or rect(). Each word is positioned with its index.",
      remixText: "Make words appear on click, fade in/out, cycle with frameCount, or arrange them in a spiral.",
      footer: "CC Fest Coding Camp · Starter Sketch · Arrays of strings, text(), and generative layout",
      code: `// An array of words — text as data
let words = [
  "calm",
  "curious",
  "tangled",
  "bright",
  "unfinished",
  "ready"
];

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(244, 239, 230);

  // Display each word at a position based on its index
  for (let i = 0; i < words.length; i++) {
    // Map i to x and y across the canvas
    let x = map(i, 0, words.length - 1, 60, width - 60);
    let y = map(i, 0, words.length - 1, 80, height - 80);

    // Highlight the "current" word using frameCount
    let current = floor(frameCount / 40) % words.length;

    if (i === current) {
      fill(224, 122, 95);
      textSize(28);
    } else {
      fill(100);
      textSize(16);
    }

    noStroke();
    text(words[i], x, y);
  }

  // Show index of current word
  fill(180);
  textSize(11);
  text("words[" + (floor(frameCount / 40) % words.length) + "]",
       width / 2, height - 16);
}`
    },
    "state-machine-game-seed": {
      title: "State Machine Game Seed",
      session: "Session 5",
      subtitle: "A minimal 3-state sketch — title, play, end — where a single gameState variable decides which screen draws and how the sketch responds to clicks.",
      tags: ["gameState", "state machine", "conditionals", "flow"],
      relatedBridges: ["state-machines-sketches-have-modes", "conditionals-code-makes-choices"],
      relatedTools: ["game-state-studio", "if-else-decision-studio"],
      liveSeed: "Click to move through the three states. All the logic lives inside if/else checks on one variable.",
      tryText: "Add a score variable. Increment it in the play state each frame. Show the final score on the end screen. Notice you only need to touch the play and end branches.",
      noticeText: "Each state owns its own drawing code and its own rules for when to switch. Adding a new screen means adding one new value the variable can hold — nothing else changes.",
      remixText: "Add a 'paused' state between title and play. Pressing P switches into it and freezes everything; pressing P again resumes. One more else-if is all it takes.",
      footer: "CC Fest Coding Camp · Starter Sketch · State machines and game flow",
      code: `let gameState = "title";
let score = 0;
let startTime = 0;
let timeLimit = 8; // seconds

function setup() {
  createCanvas(400, 400);
  textAlign(CENTER, CENTER);
}

function draw() {
  if (gameState === "title") {
    background(61, 90, 128);
    fill(255);
    textSize(28);
    text("MY GAME", width / 2, height / 2 - 40);
    textSize(16);
    fill(200, 220, 255);
    text("click to start", width / 2, height / 2 + 20);

  } else if (gameState === "play") {
    background(244, 239, 230);
    let elapsed = (millis() - startTime) / 1000;
    let left = max(0, timeLimit - elapsed);

    score = floor(elapsed * 10);

    fill(44, 42, 38);
    textSize(16);
    text("time: " + left.toFixed(1) + "s", width / 2, 30);
    text("score: " + score, width / 2, 60);

    fill(224, 122, 95);
    noStroke();
    circle(width / 2, height / 2, 60 + sin(elapsed * 4) * 20);

    if (left <= 0) gameState = "end";

  } else if (gameState === "end") {
    background(44, 42, 38);
    fill(255, 220, 100);
    textSize(24);
    text("DONE!", width / 2, height / 2 - 40);
    fill(255);
    textSize(16);
    text("score: " + score, width / 2, height / 2);
    fill(180, 170, 160);
    textSize(14);
    text("click to play again", width / 2, height / 2 + 50);
  }
}

function mousePressed() {
  if (gameState === "title") {
    gameState = "play";
    startTime = millis();
    score = 0;
  } else if (gameState === "end") {
    gameState = "title";
  }
}`
    }
  };

  const RESOURCE_LINKS = {
    bridges: {
      "arrays-loops-as-system":           "Arrays + Loops: A System",
      "arrays-one-thing-to-many-things":  "Arrays: One Thing to Many Things",
      "color-numbers-become-feeling":     "Color: Numbers Become Feeling",
      "conditionals-code-makes-choices":  "Conditionals: Code Makes Choices",
      "data-in-drawing-out":              "Data In, Drawing Out",
      "distance-becomes-behavior":        "Distance Becomes Behavior",
      "events-sketches-listen":           "Events: Sketches Listen",
      "functions-make-your-own-commands": "Functions: Make Your Own Commands",
      "how-p5-thinks-about-time":         "How p5.js Thinks About Time",
      "map-range-translator":             "map() Range Translator",
      "noise-smooth-randomness":          "Noise: Smooth Randomness",
      "objects-data-plus-behavior":       "Objects: Data + Behavior",
      "random-controlled-surprise":       "random(): Controlled Surprise",
      "state-machines-sketches-have-modes": "State Machines: Sketches Have Modes",
      "triangle-circle-wave-explorer":    "Triangle to Circle to Wave Explorer"
    },
    tools: {
      "animation-explorer":          "Animation Explorer",
      "color-blend-modes-explorer":  "Color Blend Modes Explorer",
      "dist-map-lerp-chain":         "dist / map / lerp Chain",
      "for-loop-stepper":            "for Loop Stepper",
      "framerate-visualizer":        "frameRate() Visualizer",
      "game-state-studio":           "Game State Studio",
      "if-else-decision-studio":     "if/else Decision Studio",
      "lerp-explorer":               "lerp Explorer",
      "map-explorer":                "Map Explorer",
      "noise-lab":                   "Noise Lab",
      "noise-vs-random-explorer":    "Noise vs Random Explorer",
      "object-lifecycle-visualizer": "Object Lifecycle Visualizer",
      "polished-array-explorer":     "Polished Array Explorer",
      "rgb-hsb-color-lab":           "RGB / HSB Color Lab",
      "shape-and-color-explorer":    "Shape + Color Explorer",
      "simple-array-explorer":       "Simple Array Explorer",
      "sine-cosine-motion-explorer": "Sine + Cosine Motion Explorer"
    }
  };

  function buildRunnerDoc(code) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    html, body {
      margin: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background: #faf6f0;
    }
    body {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    canvas {
      width: 100% !important;
      height: auto !important;
      display: block;
    }
  </style>
  <script src="https://cdn.jsdelivr.net/npm/p5@1.11.5/lib/p5.js"><\/script>
</head>
<body>
  <script>
    window.addEventListener("error", function(event) {
      const pre = document.createElement("pre");
      pre.textContent = event.message;
      pre.style.padding = "16px";
      pre.style.color = "#a33";
      pre.style.whiteSpace = "pre-wrap";
      document.body.innerHTML = "";
      document.body.appendChild(pre);
    });
  <\/script>
  <script>
${code}
  <\/script>
</body>
</html>`;
  }

  function stopRunner(frame) {
    frame.srcdoc = `<!DOCTYPE html><html><body style="margin:0;display:flex;align-items:center;justify-content:center;height:100%;background:#f7f1e7;color:#6b6760;font-family:DM Sans, sans-serif;">Preview stopped</body></html>`;
  }

  function renderStarterCatalogMeta(slug, attempt = 0) {
    const params = new URLSearchParams(window.location.search);
    if (params.get("embed") === "1" || document.documentElement.classList.contains("embed-mode") || document.body.classList.contains("embed-mode")) return;
    if (document.querySelector(".catalog-meta-strip")) return;

    const catalog = window.CCFestCatalog;
    if (!catalog?.items?.length) {
      if (attempt < 40) {
        window.setTimeout(() => renderStarterCatalogMeta(slug, attempt + 1), 100);
      }
      return;
    }

    const item = catalog.items.find((entry) => entry.id === slug && entry.type === "sketch");
    if (!item) return;

    const suitMap = {
      marks: { glyph: "✦", label: "Marks" },
      motion: { glyph: "◎", label: "Motion" },
      systems: { glyph: "⬡", label: "Systems" },
      data: { glyph: "▦", label: "Data" },
      open: { glyph: "☽", label: "Open" },
      support: { glyph: "⊕", label: "Support" },
    };
    const pathwayLabels = {
      "first-time": "First time",
      animation: "Animation",
      data: "Data",
      games: "Games",
      stuck: "Stuck",
      final: "Final project",
    };

    const suit = suitMap[item.suit];
    const level = item.level ? item.level.charAt(0).toUpperCase() + item.level.slice(1) : null;
    const pathways = (item.pathways || []).map((pathway) => pathwayLabels[pathway] || pathway);
    const pills = [];

    if (suit) pills.push(`<span class="meta-pill meta-pill--suit">${suit.glyph} ${suit.label}</span>`);
    if (level) pills.push(`<span class="meta-pill meta-pill--level">${level}</span>`);
    pathways.forEach((pathway) => {
      pills.push(`<span class="meta-pill meta-pill--pathway">${pathway}</span>`);
    });
    if (!pills.length) return;

    const strip = document.createElement("div");
    strip.className = "catalog-meta-strip";
    strip.setAttribute("aria-label", "Resource metadata");
    strip.innerHTML = pills.join("");

    const anchor = document.querySelector(".seed-rhythm");
    if (anchor?.parentNode) {
      anchor.insertAdjacentElement("afterend", strip);
    }
  }

  function renderStarterSeedPage(slug) {
    const seed = seeds[slug];
    const app = document.getElementById("app");
    if (!seed || !app) return;

    const relatedPanel = renderRelatedResources(seed, slug);
    document.title = `${seed.title} — CC Fest Coding Camp`;
    app.innerHTML = `
      <div class="sketch-shell">
        <div class="sketch-topbar">
          <a class="brand-mark" href="../../index.html">CC Fest · Coding Camp Tools</a>
          <a href="https://github.com/saberkhan372/CC-Fest-Coding-Camp">CC Fest on GitHub</a>
        </div>

        <header class="sketch-header">
          <div class="sketch-meta">
            <span class="pill session">${seed.session}</span>
            <span class="pill type">Starter Sketch</span>
          </div>
          <h1>${seed.title}</h1>
          <p class="sketch-subtitle">${seed.subtitle}</p>
          <div class="tag-row">
            ${seed.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
          </div>
          <div class="seed-rhythm" aria-label="How to use this starter sketch">
            <span class="seed-rhythm-card"><strong>See it</strong> A working sketch — run it before reading the code.</span>
            <span class="seed-rhythm-card"><strong>Change it</strong> ${seed.tryText}</span>
            <span class="seed-rhythm-card"><strong>Remix it</strong> ${seed.remixText}</span>
            <span class="seed-rhythm-card"><strong>Teach it</strong> Ask: what did you change, what moved, and what would you try next?</span>
          </div>
        </header>

        <main class="sketch-layout">
          <section class="card editor-card">
            <div class="editor-chrome">
              <div class="chrome-left">
                <div class="window-dots">
                  <span class="wdot wdot-r"></span>
                  <span class="wdot wdot-y"></span>
                  <span class="wdot wdot-g"></span>
                </div>
                <span class="chrome-filename">sketch.js</span>
              </div>
              <div class="chrome-right">
                <span class="run-status" id="run-status">● ready</span>
                <button class="edbtn edbtn-run" id="run-button" type="button">▶ Run</button>
                <button class="edbtn edbtn-stop" id="stop-button" type="button">■ Stop</button>
                <button class="edbtn edbtn-reset" id="reset-button" type="button">↺ Reset</button>
                <button class="edbtn edbtn-p5" id="p5-export-button" type="button">↗ p5 Editor</button>
              </div>
            </div>
            <div class="editor-hint">${seed.liveSeed}</div>
            <div class="editor-layout">
              <div class="editor-pane">
                <div class="pane-chrome">Code</div>
                <textarea id="starter-editor" class="code-editor" spellcheck="false"></textarea>
              </div>
              <div class="preview-pane">
                <div class="pane-chrome pane-chrome-light">
                  <span>Canvas</span>
                  <span class="live-badge" id="live-badge">● live</span>
                </div>
                <div class="preview-stage">
                  <iframe id="preview-frame" class="preview-frame" title="${seed.title} preview"></iframe>
                </div>
                <div class="canvas-action-bar" aria-label="Canvas actions">
                  <button class="edbtn canvas-action-btn" id="save-canvas-btn" type="button">Save Image</button>
                  <button class="edbtn canvas-action-btn" id="fullscreen-btn" type="button">⛶ Fullscreen</button>
                </div>
                <div class="editor-status">Edit code · press Run to see changes · Reset restores the original</div>
              </div>
            </div>
          </section>
        </main>

        <section class="card lessons-card" style="margin-top:22px;">
          <div class="card-inner">
            <div class="card-header">
              <div>
                <h2>Teaching Prompts</h2>
                <p>Four moves that turn any starter sketch into a full session.</p>
              </div>
            </div>
            <div class="lesson-grid">
              <div class="lesson-card">
                <h3>See it</h3>
                <p>${seed.liveSeed}</p>
              </div>
              <div class="lesson-card">
                <h3>Change it</h3>
                <p>${seed.tryText}</p>
              </div>
              <div class="lesson-card">
                <h3>Code idea</h3>
                <p>${seed.noticeText}</p>
              </div>
              <div class="lesson-card">
                <h3>Remix it</h3>
                <p>${seed.remixText}</p>
              </div>
              <div class="lesson-card">
                <h3>Teach it</h3>
                <p>Ask learners to predict one change, run it, then name what the canvas taught them about the code.</p>
              </div>
            </div>
          </div>
        </section>

        ${relatedPanel}

        <footer class="footer">${seed.footer}</footer>
      </div>
    `;

    const editor = document.getElementById("starter-editor");
    const frame = document.getElementById("preview-frame");
    const runButton = document.getElementById("run-button");
    const stopButton = document.getElementById("stop-button");
    const resetButton = document.getElementById("reset-button");
    const p5ExportButton = document.getElementById("p5-export-button");
    const canvasSaveButton = document.getElementById("save-canvas-btn");
    const canvasFullscreenButton = document.getElementById("fullscreen-btn");
    const previewStage = document.querySelector(".preview-stage");
    const statusEl = document.getElementById("run-status");
    const liveBadge = document.getElementById("live-badge");
    const initialCode = seed.code.trim();

    editor.value = initialCode;

    function setStatus(text, color) {
      if (statusEl) { statusEl.textContent = text; statusEl.style.color = color || ""; }
    }

    function setLive(on) {
      if (liveBadge) liveBadge.style.opacity = on ? "0.8" : "0.28";
    }

    function runCurrentCode() {
      setStatus("● running", "var(--gold)");
      setLive(false);
      frame.srcdoc = buildRunnerDoc(editor.value);
      setTimeout(() => { setStatus("● live", "var(--success)"); setLive(true); }, 900);
    }

    async function exportToP5Editor() {
      const code = editor.value;
      try {
        await navigator.clipboard.writeText(code);
        setStatus("↗ copied", "var(--gold)");
      } catch (error) {
        editor.focus();
        editor.select();
        setStatus("↗ select code", "var(--gold)");
      }
      window.open("https://editor.p5js.org/", "_blank", "noopener,noreferrer");
    }

    function frameDocument() {
      return frame.contentDocument || (frame.contentWindow && frame.contentWindow.document) || null;
    }

    function currentCanvas() {
      const doc = frameDocument();
      return doc && doc.querySelector("canvas");
    }

    function pulseButton(button, label) {
      if (!button) return;
      const original = button.dataset.originalLabel || button.textContent;
      button.dataset.originalLabel = original;
      button.textContent = label;
      window.setTimeout(() => { button.textContent = original; }, 1200);
    }

    function saveCanvasImage() {
      const canvas = currentCanvas();
      if (!canvas) {
        setStatus("● run first", "var(--gold)");
        pulseButton(canvasSaveButton, "Run first");
        return;
      }
      try {
        const link = document.createElement("a");
        link.download = "ccfest-" + (seed.title || slug || "sketch").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 30) + ".png";
        link.href = canvas.toDataURL("image/png");
        link.click();
        pulseButton(canvasSaveButton, "Saved ✓");
      } catch (error) {
        setStatus("● save blocked", "var(--gold)");
        pulseButton(canvasSaveButton, "Save blocked");
      }
    }

    function toggleCanvasFullscreen() {
      const canvas = currentCanvas();
      const doc = frameDocument();
      if (!canvas) {
        setStatus("● run first", "var(--gold)");
        pulseButton(canvasFullscreenButton, "Run first");
        return;
      }
      if (document.fullscreenElement || (doc && doc.fullscreenElement)) {
        const exit = doc && doc.fullscreenElement
          ? doc.exitFullscreen()
          : document.exitFullscreen();
        if (exit && exit.catch) exit.catch(() => {});
        return;
      }
      const target = previewStage || canvas;
      const request = target.requestFullscreen || target.webkitRequestFullscreen || canvas.requestFullscreen || canvas.webkitRequestFullscreen;
      if (request) request.call(target).catch?.(() => setStatus("● fullscreen blocked", "var(--gold)"));
    }

    runButton.addEventListener("click", runCurrentCode);
    stopButton.addEventListener("click", () => {
      setStatus("■ stopped", "rgba(240,235,227,.45)");
      setLive(false);
      stopRunner(frame);
    });
    resetButton.addEventListener("click", () => {
      editor.value = initialCode;
      runCurrentCode();
    });
    p5ExportButton.addEventListener("click", exportToP5Editor);
    canvasSaveButton.addEventListener("click", saveCanvasImage);
    canvasFullscreenButton.addEventListener("click", toggleCanvasFullscreen);
    const updateFullscreenLabel = () => {
      const doc = frameDocument();
      canvasFullscreenButton.textContent = document.fullscreenElement || (doc && doc.fullscreenElement)
        ? "✕ Exit full"
        : "⛶ Fullscreen";
    };
    document.addEventListener("fullscreenchange", updateFullscreenLabel);
    frame.addEventListener("load", () => {
      const doc = frameDocument();
      if (doc) doc.addEventListener("fullscreenchange", updateFullscreenLabel);
    });

    runCurrentCode();
    renderStarterCatalogMeta(slug);
  }

  function renderRelatedResources(seed, slug) {
    const hasHand = (seed.relatedBridges || []).length +
                    (seed.relatedTools   || []).length > 0;

    if (!hasHand) {
      const myTags = new Set(seed.tags || []);
      const matches = Object.entries(seeds)
        .filter(([s, sd]) => s !== slug && (sd.tags || []).some(t => myTags.has(t)))
        .slice(0, 4)
        .map(([s, sd]) => `<a class="related-link" href="../${s}/"><span>Sketch</span><strong>${sd.title}</strong></a>`)
        .join("");
      if (!matches) return "";
      return `
        <section class="card try-next" style="margin-top:22px;">
          <div class="card-inner">
            <div class="card-header"><div>
              <h2>Similar sketches</h2>
              <p>These share related ideas and tags.</p>
            </div></div>
            <div class="related-grid"><div class="related-group">${matches}</div></div>
          </div>
        </section>`;
    }

    const groups = [
      ["Bridge", "relatedBridges", "bridges", "../../concept-bridges/"],
      ["Tool",   "relatedTools",   "tools",   "../"]
    ].map(([label, key, type, base]) => {
      const items = (seed[key] || []).map((s) => {
        const title = RESOURCE_LINKS[type][s] || titleize(s);
        return `<a class="related-link" href="${base}${s}/"><span>${label}</span><strong>${title}</strong></a>`;
      }).join("");
      return items ? `<div class="related-group">${items}</div>` : "";
    }).join("");

    if (!groups.trim()) return "";
    return `
      <section class="card try-next" style="margin-top:22px;">
        <div class="card-inner">
          <div class="card-header"><div>
            <h2>Try next</h2>
            <p>Trace this sketch back to the idea, then forward into a workshop tool.</p>
          </div></div>
          <div class="related-grid">${groups}</div>
        </div>
      </section>`;
  }

  function titleize(slug) {
    return slug.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
  }

  window.renderStarterSeedPage = renderStarterSeedPage;
})();
