/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var Game = __webpack_require__(1);

	$('.game-canvas').hide();
	$('.end-game').hide();
	$('#copter-pic').hide();
	$('#cloud-pic').hide();
	$('#building-pic').hide();
	$('#fireball-pic').hide();
	$('#angry-bird-pic').hide();
	$('#parachute-pic').hide();
	$('#danger-zone').hide();
	var dangerZone = document.getElementById('danger-zone');
	var game = new Game(dangerZone);

	game.stopSong();
	game.sortAndDisplayScores();
	$('.button').on('click', function () {
	  $('#start-button').hide();
	  $('.info').hide();
	  $('.game-canvas').show();
	  var nextGame = new Game(dangerZone);
	  nextGame.start();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var $ = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var Copter = __webpack_require__(2);
	var Obstacle = __webpack_require__(3);
	var Boundary = __webpack_require__(5);
	var PowerUp = __webpack_require__(4);
	var playback = 'true';
	var canvas = document.getElementById('game');
	var context = canvas.getContext('2d');

	var Game = (function () {
	  function Game(song) {
	    _classCallCheck(this, Game);

	    this.status = 'active';
	    this.song = song;
	    this.copterImg = document.getElementById("copter-pic");
	    this.cloudImg = document.getElementById("cloud-pic");
	    this.fireballImg = document.getElementById("fireball-pic");
	    this.buildingImg = document.getElementById("building-pic");
	    this.angryBirdImg = document.getElementById("angry-bird-pic");
	    this.parachuteImg = document.getElementById("parachute-pic");
	    this.background = new Image();
	    this.background.src = "assets/images/sunset.png";
	    this.copter = new Copter(this.copterImg, 200, 280, 80, 30, context);
	    this.boundaries = [];
	    this.obstacles = [];
	    this.powerUps = [];
	  }

	  _createClass(Game, [{
	    key: 'stopSong',
	    value: function stopSong() {
	      this.song.pause();
	      this.song.currentTime = 0;
	    }
	  }, {
	    key: 'sortAndDisplayScores',
	    value: function sortAndDisplayScores() {
	      var scores = [];
	      for (var i = 0; i < localStorage.length; i++) {
	        scores.push(localStorage.getItem(localStorage.key(i)));
	      }
	      if (scores.length > 0) {
	        var sortedScores = scores.sort(function (a, b) {
	          return b - a;
	        });
	        $('#score').empty();
	        for (var j = 0; j < scores.length && j < 9; j++) {
	          $('#score').append('<h5>Score: ' + sortedScores[j] + ' </h5>');
	        }
	      }
	    }
	  }, {
	    key: 'createTopBoundaries',
	    value: function createTopBoundaries() {
	      for (var i = 0; i < 6; i++) {
	        this.boundaries.push(new Boundary(i * 225, -0, 300, 100, context, this, this.cloudImg));
	      }
	    }
	  }, {
	    key: 'createBottomBoundaries',
	    value: function createBottomBoundaries() {
	      for (var j = 0; j < 24; j++) {
	        this.boundaries.push(new Boundary(j * 50, 580, 50, 120, context, this, this.buildingImg));
	      }
	    }
	  }, {
	    key: 'createObstacles',
	    value: function createObstacles() {
	      this.obstacles.push(new Obstacle(this.fireballImg, 2800, 250, 80, 40, context, this));
	      this.obstacles.push(new Obstacle(this.angryBirdImg, 3250, 250, 80, 80, context, this));
	    }
	  }, {
	    key: 'createPowerUps',
	    value: function createPowerUps() {
	      this.powerUps.push(new PowerUp(this.parachuteImg, 2500, 250, 20, 20, context, this));
	    }
	  }, {
	    key: 'randomizeColliders',
	    value: function randomizeColliders(colliders, copter, score) {
	      colliders.forEach(function (collider) {
	        collider.draw().move();
	        if (score !== 0 && score % 500 === 0) {
	          collider.increaseSpeed();
	        }
	        if (obstacleLeftPage(collider)) {
	          collider.x = 800;
	          shuffleColliders(collider);
	        }
	        if (copter.status === "powered up") {
	          collider.decreaseSpeed();
	          copter.status = "flying";
	        }
	        copter.checkForCollision(collider);
	      });
	    }
	  }, {
	    key: 'playSong',
	    value: function playSong() {
	      if (this.song.currentTime < 12) {
	        this.song.currentTime = 12;
	      }
	      this.song.play();
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      $('.end-game').hide();
	      this.copter.draw();
	      this.createTopBoundaries();
	      this.createBottomBoundaries();
	      this.createObstacles();
	      this.createPowerUps();
	      var that = this;
	      var score = 0;

	      window.requestAnimationFrame(function gameLoop() {
	        if (that.status === 'active') {
	          that.song.play();
	          if (playback === 'true') {
	            that.playSong();
	          }

	          if (playback === 'muted') {
	            that.stopSong();
	          }

	          context.drawImage(that.background, 0, 0, canvas.width, canvas.height);
	          that.copter.draw().gravity();

	          that.randomizeColliders(that.boundaries, that.copter, score);
	          that.randomizeColliders(that.obstacles, that.copter, score);
	          that.randomizeColliders(that.powerUps, that.copter, score);

	          if (that.copter.status === 'crashed') {
	            crash();
	            that.stopSong();
	            localStorage.setItem('score#' + score, score);
	            that.sortAndDisplayScores(score);
	          }

	          requestAnimationFrame(gameLoop);
	          $('.score-count').html(score++);
	        }
	      });

	      window.addEventListener('keydown', function (event) {
	        event.preventDefault();
	        if (event.keyCode === 32) {
	          that.copter.upLift();
	        }
	      });

	      window.addEventListener('keyup', function (event) {
	        event.preventDefault();
	        if (event.keyCode === 32) {
	          that.copter.downpull = 3;
	        }
	      });

	      window.addEventListener('keyup', function (event) {
	        event.preventDefault();
	        if (event.keyCode === 77) {
	          playback = 'muted';
	        }
	      });
	    }
	  }]);

	  return Game;
	})();

	function shuffleColliders(collider) {
	  if (isBoundary(collider)) {
	    collider.shuffleBoundary();
	  } else if (isObstacle(collider)) {
	    collider.shuffleObstacle();
	  } else {
	    collider.shufflePowerUp();
	  }
	}

	function isBoundary(collider) {
	  return collider instanceof Boundary;
	}

	function isObstacle(collider) {
	  return collider instanceof Obstacle;
	}

	function crash() {
	  $('.game-canvas').hide();
	  $('.end-game').show();
	}

	function obstacleLeftPage(collider) {
	  return collider.x < -299;
	}

	module.exports = Game;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Copter = (function () {
	  function Copter(image, x, y, width, height, context) {
	    _classCallCheck(this, Copter);

	    this.x = x;
	    this.y = y;
	    this.width = width;
	    this.height = height;
	    this.context = context || {};
	    this.image = image;
	    this.status = "flying" || {};
	    this.downpull = 4;
	  }

	  _createClass(Copter, [{
	    key: "draw",
	    value: function draw() {
	      this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
	      return this;
	    }
	  }, {
	    key: "gravity",
	    value: function gravity() {
	      this.y += this.downpull;
	    }
	  }, {
	    key: "upLift",
	    value: function upLift() {
	      this.downpull = -6;
	    }
	  }, {
	    key: "checkForCollision",
	    value: function checkForCollision(collider) {
	      if (this.x < collider.x + collider.width && this.x + this.width > collider.x && this.y < collider.y + collider.height && this.height + this.y > collider.y) {
	        if (!collider.isPowerUp(collider)) {
	          this.status = "crashed";
	          collider.game.status = 'inactive';
	        } else {
	          this.status = "powered up";
	          collider.clearPowerUp();
	        }
	      }
	    }
	  }]);

	  return Copter;
	})();

	module.exports = Copter;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var PowerUp = __webpack_require__(4);

	var Obstacle = (function () {
	  function Obstacle(image, x, y, width, height, context, game) {
	    _classCallCheck(this, Obstacle);

	    this.image = image;
	    this.x = x;
	    this.y = y;
	    this.width = width;
	    this.height = height;
	    this.context = context || {};
	    this.game = game || {};
	    this.speed = 5;
	  }

	  _createClass(Obstacle, [{
	    key: 'draw',
	    value: function draw() {
	      this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
	      return this;
	    }
	  }, {
	    key: 'move',
	    value: function move() {
	      this.x -= this.speed;
	    }
	  }, {
	    key: 'increaseSpeed',
	    value: function increaseSpeed() {
	      this.speed = this.speed += 2;
	    }
	  }, {
	    key: 'decreaseSpeed',
	    value: function decreaseSpeed() {
	      this.speed = this.speed -= 2;
	    }
	  }, {
	    key: 'shuffleObstacle',
	    value: function shuffleObstacle() {
	      this.y = Math.floor(Math.random() * (450 - 80) + 80);
	    }
	  }, {
	    key: 'isPowerUp',
	    value: function isPowerUp(collider) {
	      return collider instanceof PowerUp;
	    }
	  }]);

	  return Obstacle;
	})();

	module.exports = Obstacle;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PowerUp = (function () {
	  function PowerUp(image, x, y, width, height, context, game) {
	    _classCallCheck(this, PowerUp);

	    this.image = image;
	    this.x = x;
	    this.y = y;
	    this.width = width;
	    this.height = height;
	    this.context = context || {};
	    this.game = game || {};
	    this.speed = 5;
	  }

	  _createClass(PowerUp, [{
	    key: "draw",
	    value: function draw() {
	      this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
	      return this;
	    }
	  }, {
	    key: "move",
	    value: function move() {
	      this.x -= this.speed;
	    }
	  }, {
	    key: "increaseSpeed",
	    value: function increaseSpeed() {
	      this.speed = this.speed += 2;
	    }
	  }, {
	    key: "decreaseSpeed",
	    value: function decreaseSpeed() {
	      this.speed = this.speed -= 2;
	    }
	  }, {
	    key: "clearPowerUp",
	    value: function clearPowerUp() {
	      this.x = 1100;
	      this.shufflePowerUp();
	    }
	  }, {
	    key: "isPowerUp",
	    value: function isPowerUp(collider) {
	      return collider instanceof PowerUp;
	    }
	  }, {
	    key: "shufflePowerUp",
	    value: function shufflePowerUp() {
	      this.y = Math.floor(Math.random() * (450 - 80) + 80);
	    }
	  }]);

	  return PowerUp;
	})();

	module.exports = PowerUp;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var PowerUp = __webpack_require__(4);

	var Boundary = (function () {
	  function Boundary(x, y, width, height, context, game, image) {
	    _classCallCheck(this, Boundary);

	    this.x = x;
	    this.y = y;
	    this.width = width;
	    this.height = height;
	    this.context = context || {};
	    this.game = game || {};
	    this.image = image || null;
	  }

	  _createClass(Boundary, [{
	    key: 'draw',
	    value: function draw() {
	      this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
	      return this;
	    }
	  }, {
	    key: 'move',
	    value: function move() {
	      this.x -= 5;
	    }
	  }, {
	    key: 'increaseSpeed',
	    value: function increaseSpeed() {
	      this.x = this.x -= 2;
	    }
	  }, {
	    key: 'decreaseSpeed',
	    value: function decreaseSpeed() {
	      this.speed = this.speed -= 2;
	    }
	  }, {
	    key: 'shuffleBoundary',
	    value: function shuffleBoundary() {
	      if (this.y < 300) {
	        this.y = Math.floor(Math.random() * (0 - -50) + -50);
	      } else {
	        this.y = Math.floor(Math.random() * (580 - 510) + 510);
	      }
	    }
	  }, {
	    key: 'isPowerUp',
	    value: function isPowerUp(collider) {
	      return collider instanceof PowerUp;
	    }
	  }]);

	  return Boundary;
	})();

	module.exports = Boundary;

/***/ }
/******/ ]);