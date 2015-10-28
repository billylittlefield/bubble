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
}());
