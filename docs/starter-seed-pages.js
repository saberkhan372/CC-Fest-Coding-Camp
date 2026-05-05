(() => {
  const seeds = {
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
      liveSeed: "Click to generate a new abstract poster with different titles, colors, and shape compositions.",
      tryText: "Change the word bank, add a subtitle, or use loops to create bigger shape systems.",
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

  function renderStarterSeedPage(slug) {
    const seed = seeds[slug];
    const app = document.getElementById("app");
    if (!seed || !app) return;

    document.title = `${seed.title} — CC Fest Coding Camp`;
    app.innerHTML = `
      <div class="sketch-shell">
        <div class="sketch-topbar">
          <a href="../../index.html">← Back to tool library</a>
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
                <div class="editor-status">Edit code · press Run to see changes · Reset restores the original</div>
              </div>
            </div>
          </section>
        </main>

        <section class="card lessons-card" style="margin-top:22px;">
          <div class="card-inner">
            <div class="card-header">
              <div>
                <h2>Try / Notice / Remix</h2>
                <p>Keep the code small, visible, and easy to remix live, just like a p5.js Web Editor sketch.</p>
              </div>
            </div>
            <div class="lesson-grid">
              <div class="lesson-card">
                <h3>Try this</h3>
                <p>${seed.tryText}</p>
              </div>
              <div class="lesson-card">
                <h3>Notice this</h3>
                <p>${seed.noticeText}</p>
              </div>
              <div class="lesson-card">
                <h3>Remix this</h3>
                <p>${seed.remixText}</p>
              </div>
            </div>
          </div>
        </section>

        <footer class="footer">${seed.footer}</footer>
      </div>
    `;

    const editor = document.getElementById("starter-editor");
    const frame = document.getElementById("preview-frame");
    const runButton = document.getElementById("run-button");
    const stopButton = document.getElementById("stop-button");
    const resetButton = document.getElementById("reset-button");
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

    runCurrentCode();
  }

  window.renderStarterSeedPage = renderStarterSeedPage;
})();
