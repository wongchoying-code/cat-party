let floorPlan;
let catImg;
let cats = [];
let buyerCount = 5; // Simulating 5 NFT owners. Increase this to see more cats!
const BASE_WIDTH = 800;
const BASE_HEIGHT = 500;

function preload() {
  // Load the empty floor plan image you provided
  floorPlan = loadImage('assets/your_floor_plan_image.png'); 
  
  // Load your custom cat image here (a transparent PNG works best)
  catImg = loadImage('assets/your_cat_image.png'); 
}

function setup() {
  createCanvas(BASE_WIDTH, BASE_HEIGHT);
  resizeResponsiveCanvas();
  
  // Create cats based on the buyer count
  for (let i = 0; i < buyerCount; i++) {
    cats.push(new Cat());
  }
}

function resizeResponsiveCanvas() {
  // Scale the sketch to the largest size that fits the window
  // while preserving the original aspect ratio.
  const scale = min(windowWidth / BASE_WIDTH, windowHeight / BASE_HEIGHT);
  const targetWidth = floor(BASE_WIDTH * scale);
  const targetHeight = floor(BASE_HEIGHT * scale);
  resizeCanvas(targetWidth, targetHeight);
}

function windowResized() {
  resizeResponsiveCanvas();
}

function draw() {
  background(220);
  
  // Draw the floor plan background
  image(floorPlan, 0, 0, width, height);

  // Update and draw each cat
  for (let cat of cats) {
    cat.update();
    cat.display();
  }
}

class Cat {
  constructor() {
    this.reset();
  }

  reset() {
    // Store normalized values so cats scale with canvas resizing.
    this.normX = random(0.06, 0.94);
    this.normY = random(0.1, 0.9);
    
    // How long it stays visible in this spot (in frames)
    this.timer = int(random(60, 200)); 
    
    // Size stored against the base sketch dimensions.
    this.baseSize = random(30, 50); 
  }

  update() {
    this.timer--;
    if (this.timer <= 0) {
      // When the timer hits 0, the cat teleports to a new random location
      this.reset();
    }
  }

  display() {
    push();
    imageMode(CENTER);
    
    // Convert normalized/base values to current responsive canvas values.
    const scale = min(width / BASE_WIDTH, height / BASE_HEIGHT);
    const x = this.normX * width;
    const y = this.normY * height;
    const size = this.baseSize * scale;
    image(catImg, x, y, size, size);
    
    pop();
  }
}