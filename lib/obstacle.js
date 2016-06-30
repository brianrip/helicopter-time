const PowerUp = require('./powerUp');

class Obstacle {
  constructor(image, x, y, width, height, context, game) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.context = context || {};
    this.game = game || {};
    this.speed = 5;
  }

  draw() {
    this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
    return this;
  }

  move() {
    this.x -= this.speed;
  }

  increaseSpeed() {
    this.speed = this.speed += 2;
  }

  decreaseSpeed() {
    this.speed = this.speed -= 2;
  }

  shuffleObstacle() {
    this.y = Math.floor((Math.random() * (450 - 80)) + 80);
    this.height = Math.floor((Math.random() * (100 - 20)) + 20);
  }

  isPowerUp(collider) {
    return collider instanceof PowerUp;
  }
}

module.exports = Obstacle;
