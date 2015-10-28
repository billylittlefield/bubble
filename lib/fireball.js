(function() {
  'use strict';
  if (typeof BubbleGame === 'undefined') {
    window.BubbleGame = {};
  }

  var Fireball = BubbleGame.Fireball = function(fireballParams) {
    this.x = fireballParams.x;
    this.y = fireballParams.y;
    this.w = 18;
    this.h = 30;
    this.game = fireballParams.game;
    this.spriteCoords = [0, 22];
    this.upCoords = [[0, 22], [19, 22]];
    this.frameTick = 0;
  };

  var fireballSprite = new Image();
  fireballSprite.src = "assets/fireball_sprite.png";

  Fireball.prototype.draw = function (ctx) {
    ctx.drawImage(
      fireballSprite,
      this.spriteCoords[0], this.spriteCoords[1],
      12, 20,
      this.x, this.y,
      18, 30
    );
  };

  Fireball.prototype.updateSprite = function () {
    if (this.frameTick == 4) {
      this.frameTick = 0;
      this.upCoords.push(this.upCoords.shift());
    } else {
      this.frameTick += 1;
    }
  };

  Fireball.prototype.move = function () {
    this.updateSprite();
    this.spriteCoords = this.upCoords[1];
    this.y -= 5;
    if (this.y < -30) {
      this.game.remove(this);
    }
  };

}());
