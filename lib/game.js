(function() {
  'use strict';
  if (typeof BubbleGame === 'undefined') {
    window.BubbleGame = {};
  }

  var Game = BubbleGame.Game = function() {
    this.bubbles = [];
    this.addBubbles();
    this.dragon = new BubbleGame.Dragon({ x: ((Game.CANVAS_WIDTH / 2) - 24),
                                          y: (Game.CANVAS_HEIGHT - 48) });
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

  Game.prototype.draw = function(ctx) {
    ctx.fillStyle='#333333';
    ctx.fillRect(0, 0, Game.CANVAS_WIDTH, Game.CANVAS_HEIGHT);

    this.bubbles.forEach(function (bubble) {
      bubble.draw(ctx);
    });
    this.dragon.draw(ctx);
  };

  Game.prototype.step = function() {
    this.bubbles.forEach(function(bubble) {
      bubble.x += bubble.vx;
      bubble.y += bubble.vy;
      bubble.vy += Game.GRAVITY;
      if (bubble.y + bubble.radius > Game.CANVAS_HEIGHT) {
        bubble.y = Game.CANVAS_HEIGHT - bubble.radius;
        bubble.vy *= -Game.ELASTICITY;
      }
      if (bubble.x + bubble.radius > Game.CANVAS_WIDTH) {
        bubble.x = Game.CANVAS_WIDTH - bubble.radius;
        bubble.vx *= -1;
      }
      if (bubble.x < bubble.radius) {
        bubble.x = bubble.radius;
        bubble.vx *= -1;
      }
    });
  };

}());
