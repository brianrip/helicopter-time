var $ = require('jquery');
const Copter = require('./copter');
const Obstacle = require('./obstacle');
const Boundary = require('./boundary');

class Game {
  constructor(status) {
    this.status = status || 'active';
  }

  start() {
      $('.end-game').hide();
      var canvas = document.getElementById('game');
      var copterImg = document.getElementById("copter-pic");
      var cloudImg = document.getElementById("cloud-pic");
      var context = canvas.getContext('2d');
      var copter1 = new Copter(copterImg, 200, 280, 60, 40, context);
      $('#end-game').hide();

      copter1.draw();

      var boundaries = [];

      for (var i = 0; i < 4; i++) {
        boundaries.push(new Boundary((i * 225), -150, 225, 225, context, this, cloudImg));
      }
      for (var j = 0; j < 18; j++) {
        boundaries.push(new Boundary((j * 50), 580, 50, 120, context, this));
      }

      var obstacles = [];
      obstacles.push(new Obstacle(1400, 400, 20, 100, context, this));
      obstacles.push(new Obstacle(1100, 90, 20, 120, context, this));
      obstacles.push(new Obstacle(800, 250, 20, 120, context, this));

      var that = this;

      var score = 0;
      window.requestAnimationFrame(function gameLoop() {
        if (that.status === 'active') {
        $('.score-count').html(score++);
        context.clearRect(0, 0, canvas.width, canvas.height);
        copter1.draw().gravity();
        boundaries.forEach(function(boundary){
          if (boundary.x === -100) {
            boundary.x = 800;
            boundary.shuffleBoundary();
          }
          if (copter1.x < boundary.x + boundary.width &&
            copter1.x + copter1.width > boundary.x &&
            copter1.y < boundary.y + boundary.height &&
            copter1.height + copter1.y > boundary.y) {
              $('.game-canvas').hide();
              $('.end-game').show();
              $('#score').append(`<h5>Score: ${score}</h5>`);
              boundary.game.status = 'inactive';
            }
            boundary.draw().move();
          });

          obstacles.forEach(function(obstacle){
            if (obstacle.x === 0) {
              obstacle.x = 900;
              obstacle.shuffleObstacle();
            }
            if (copter1.x < obstacle.x + obstacle.width &&
              copter1.x + copter1.width > obstacle.x &&
              copter1.y < obstacle.y + obstacle.height &&
              copter1.height + copter1.y > obstacle.y) {
                $('.game-canvas').hide();
                $('.end-game').show();
                $('#score').append(`<h5>Score: ${score}</h5>`);
                obstacle.game.status = 'inactive';
              }
              obstacle.draw().move();
            });
            requestAnimationFrame(gameLoop);
          }
          });

          window.addEventListener('keypress', function (event) {
            event.preventDefault();
            if (event.keyCode === 32) {
              copter1.upLift();
            }
          });
        }
}

module.exports = Game;
