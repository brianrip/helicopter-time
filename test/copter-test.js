const expect = require('chai').assert;
const Copter = require('../lib/copter');

describe('Copter', function() {
  context('with default attributes', function() {
    var copter = new Copter(0, 0, 10, 10);

    it('should assign an x coordinate', function() {
      expect.equal(copter.x, 0);
    });

    it('should assign a y coordinate', function() {
      expect.equal(copter.y, 0);
    });

    it('should assign a height', function(){
      expect.equal(copter.height, 10);
    });

    it('should assign a width', function(){
      expect.equal(copter.width, 10);
    });
  });

  describe('#gravity', function() {
    it('should move y coordinate by 2', function(){
      var ycoord = 1;
      var copter = new Copter(0, ycoord, 10, 10);
      copter.gravity();
      expect.equal(copter.y, 3);
    });
  });
});
