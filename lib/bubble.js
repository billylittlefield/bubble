(function() {
  'use strict';
  if (typeof BubbleGame === 'undefined') {
    window.BubbleGame = {};
  }

  var Bubble = BubbleGame.Bubble = function(bubbleParams) {
    this.x = bubbleParams.x;
    this.y = bubbleParams.y;
    this.vx = bubbleParams.vx;
    this.vy = bubbleParams.vy;
    this.game = bubbleParams.game;
    this.radius = bubbleParams.radius;
  };

  Bubble.prototype.draw = function (ctx) {
    ctx.fillStyle = "#FF0000";
    ctx.beginPath();
    ctx.arc( this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fill();
  };

  Bubble.prototype.move = function () {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += BubbleGame.Game.GRAVITY;
    if (this.y + this.radius > BubbleGame.Game.CANVAS_HEIGHT) {
      this.y = BubbleGame.Game.CANVAS_HEIGHT - this.radius;
      this.vy *= -BubbleGame.Game.ELASTICITY;
    }
    if (this.x + this.radius > BubbleGame.Game.CANVAS_WIDTH) {
      this.x = BubbleGame.Game.CANVAS_WIDTH - this.radius;
      this.vx *= -1;
    }
    if (this.x < this.radius) {
      this.x = this.radius;
      this.vx *= -1;
    }
  };

}());
