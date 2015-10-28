(function() {
  'use strict';
  if (typeof BubbleGame === 'undefined') {
    window.BubbleGame = {};
  }

  var Dragon = BubbleGame.Dragon = function(dragonParams) {
    this.x = dragonParams.x;
    this.y = dragonParams.y;
  };

  var dragonSprite = new Image();
  dragonSprite.src = "assets/dragon_sprite.png";

  var sprite = function(options) {
    var that = {};

    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;

    return that;
  };

  Dragon.prototype.draw = function (ctx) {
    console.log(this.x);
    ctx.drawImage(
      dragonSprite,
      0, 0,
      48, 48,
      this.x, this.y,
      48, 48
    );
  };

}());
