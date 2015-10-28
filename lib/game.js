(function() {
  'use strict';
  if (typeof BubbleGame === 'undefined') {
    window.BubbleGame = {};
  }

  var Game = BubbleGame.Game = function() {
    this.bubbles = [];
    this.fireballs = [];
    this.dragon = new BubbleGame.Dragon({ x: ((Game.CANVAS_WIDTH / 2) - 24),
                                          y: (Game.CANVAS_HEIGHT - 48),
                                          game: this });

    this.addBubbles();
  };

  Game.CANVAS_WIDTH = 600;
  Game.CANVAS_HEIGHT = 400;
  Game.GRAVITY = 0.2;
  Game.ELASTICITY = 0.98;

  Game.prototype.addBubbles = function (ctx) {
    this.bubbles.push(new BubbleGame.Bubble({ x: 100, y: 100,
                                              vx: 2, vy: 1,
                                              game: this,
                                              radius: 10 }));
  };

  Game.prototype.step = function(keyMap) {
    this.bubbles.forEach(function(bubble) {
      bubble.move();
    });
    this.dragon.move(keyMap);
    this.dragon.fire(keyMap);
    this.fireballs.forEach(function(fireball) {
      fireball.move();
    });
  };

  Game.prototype.allObjects = function() {
    var allObjects = this.bubbles.concat(this.fireballs).concat([this.dragon]);
    return allObjects;
  };

  Game.prototype.draw = function(ctx) {
    ctx.fillStyle='#333333';
    ctx.fillRect(0, 0, Game.CANVAS_WIDTH, Game.CANVAS_HEIGHT);
    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
  };


  Game.prototype.addFireball = function (fireball) {
    this.fireballs.push(fireball);
  };

}());
