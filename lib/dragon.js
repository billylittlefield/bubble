(function() {
  'use strict';
  if (typeof BubbleGame === 'undefined') {
    window.BubbleGame = {};
  }

  var Dragon = BubbleGame.Dragon = function(dragonParams) {
    this.x = dragonParams.x;
    this.y = dragonParams.y;
    this.w = 48;
    this.h = 48;
    this.direction = "up";
    this.game = dragonParams.game;
    this.spriteCoords = [48, 0];
    this.upCoords = [48, 0];
    this.leftCoords = [[0, 48], [48, 48], [96, 48], [48, 48]];
    this.rightCoords = [[0, 96], [48, 96], [96, 96], [48, 96]];
    this.frameTick = 0;
    this.chooseDragon();
    this.firing = false;
  };

  var dragonSprite;
  Dragon.prototype.chooseDragon = function () {
    dragonSprite = new Image();
    dragonSprite.src = "assets/dragon_sprite_" + window.DRAGON + ".png";
  };

  Dragon.prototype.draw = function (ctx) {
    ctx.drawImage(
      dragonSprite,
      this.spriteCoords[0], this.spriteCoords[1],
      48, 48,
      this.x, this.y,
      48, 48
    );
  };

  Dragon.prototype.updateSprite = function (direction) {
    this.direction = direction;
    if (direction === "left") {
      this.spriteCoords = this.leftCoords[0];
    } else if (direction === "right") {
      this.spriteCoords = this.rightCoords[0];
    } else {
      this.spriteCoords = this.upCoords;
    }

    if (this.frameTick == 4) {
      this.leftCoords.push(this.leftCoords.shift());
      this.rightCoords.push(this.rightCoords.shift());
      this.frameTick = 0;
    } else {
      this.frameTick += 1;
    }
  };

  Dragon.prototype.move = function (keyMap) {
    if (this.direction == "right" &&
        this.x < BubbleGame.Game.CANVAS_WIDTH - 49) {
      this.x += 3;
    } else if (this.direction == "left" && this.x > 0) {
      this.x -= 3;
    }
  };

  Dragon.prototype.fire = function () {
    this.firing = true;
    setTimeout(function() {
      this.firing = false;
    }.bind(this), 350);
    var xOffset = this.x + 15;
    if (this.direction === "left") {
      xOffset -= 10;
    } else if (this.direction === "right") {
      xOffset += 10;
    }
    var newFireball = new BubbleGame.Fireball({
        x: xOffset,
        y: (this.y + 10),
        game: this.game
      });
    this.game.addFireball(newFireball);
  };

  Dragon.prototype.resetPosition = function () {
    this.x = (BubbleGame.Game.CANVAS_WIDTH / 2) - 24;
    this.y = BubbleGame.Game.CANVAS_HEIGHT - 48;
  };

}());
