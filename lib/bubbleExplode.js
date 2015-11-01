(function() {
  'use strict';
  if (typeof BubbleGame === 'undefined') {
    window.BubbleGame = {};
  }

  var Pop = BubbleGame.Pop = function(x, y, radius, size, game) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.size = size;
    this.game = game;
    this.frameTick = 0;
    this.image = new Image();
    this.alpha = 1;
    this.image.src = Pop.POP_COLOR[this.size];
  };

  Pop.POP_COLOR = ["", "assets/popping-gold-2.png",  "assets/popping-blue-2.png",
                       "assets/popping-green-2.png", "assets/popping-orange-2.png",
                       "assets/popping-pink-2.png"];


  Pop.prototype.draw = function (ctx) {
    if (this.frameTick > 9) {
      this.game.remove(this);
    }
    else {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.drawImage(
        this.image,
        120, 180,
        302, 240,
        this.x, this.y,
        this.radius * 2, this.radius * 2
      );
      ctx.restore();
      this.frameTick += 1;
      this.alpha -= 0.1;
    }
  };


}());
