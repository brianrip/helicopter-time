class Copter {
  constructor(image, x, y, width, height, context) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.context = context || {};
    this.copterImg = image;
  }

  draw() {
    this.context.drawImage(this.copterImg, this.x, this.y, this.width, this.height);
    return this;
  }

  gravity() {
    this.y += 4;
  }

  upLift() {
    this.y = this.y - 21;
  }
}
module.exports = Copter;
