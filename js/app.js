/*jshint esversion: 6 */
// Enemies our player must avoid
class Enemy {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  constructor(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.width = 50;
    this.height = 60;
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    // Reset position of the enemy when it reaches the end of the road.
    if (this.x > 510) {
      this.x = -60;
      this.speed = 100 + Math.floor(Math.random() * 20);
    }
    // Collision detector adapted from https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    for (const buggies of allEnemies) {
      if ((player.x < buggies.x + buggies.width) &&
        (player.x + player.width > buggies.x) &&
        (player.y < buggies.y + buggies.height) &&
        (player.height + player.y > buggies.y)) {
        setTimeout(startPos, 200);
        player.sprite = 'images/char-cat-girl.png';
      }
    }
  }

  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 60;
  }

  update() {

  }

  // Draw player on screen
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  // Uses arrow keys to move player and also keeps the player on the canvas.
  handleInput(keyCode) {
    if (keyCode == 'left' && (this.x > 1)) {
      this.x -= 101;
    }
    if (keyCode == 'right' && (this.x < 310)) {
      this.x += 101;
    }
    if (keyCode == 'up' && (this.y > 10)) {
      this.y -= 83;
    }
    if (keyCode == 'down' && (this.y < 400)) {
      this.y += 83;
    }
    // When player gets to the water, player location resets.
    if (this.y <= 10) {
      this.sprite = 'images/char-princess-girl.png';
      setTimeout(startPos, 500);
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [
  new Enemy(-100, 227, 100),
  new Enemy(100, 146, 75),
  new Enemy(0, 62, 200),
  new Enemy(250, 146, 150),
  new Enemy(-15, 62, 95)
];

// Place the player object in a variable called player
const player = new Player(200, 404);

// Resets player function and sprite
function startPos() {
  player.x = 200;
  player.y = 404;
  player.sprite = 'images/char-boy.png';
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});