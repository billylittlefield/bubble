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
    this.upCoords = [[0, 22], [20, 22]];
    this.frameTick = 0;
    this.chooseFireball();
    this.sound = new Audio("sounds/fireball.mp3");
    this.sound.volume = this.game.soundEffects ? 1 : 0;
    this.sound.play();
  };


  Fireball.prototype.chooseFireball = function () {
    if (window.FIRE === "blue") {
      this.upCoords = [[0, 123], [20, 123]];
    } else if (window.FIRE === "green") {
      this.upCoords = [[0, 224], [20, 224]];
    }
  };
  var fireballSprite = new Image();
  fireballSprite.src = "images/fireball_sprite.png";

  Fireball.prototype.draw = function (ctx) {
    ctx.drawImage(
      fireballSprite,
      this.spriteCoords[0], this.spriteCoords[1],
      11, 21,
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
