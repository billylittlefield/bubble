(function() {
  'use strict';
  if (typeof BubbleGame === 'undefined') {
    window.BubbleGame = {};
  }

  var Dragon = BubbleGame.Dragon = function(dragonParams) {
    this.x = dragonParams.x;
    this.y = dragonParams.y;
    this.spriteCoords = [0, 0];
    this.upCoords = [[48, 0]];
    this.leftCoords = [[0, 48], [48, 48], [96, 48], [48, 48]];
    this.rightCoords = [[0, 96], [48, 96], [96, 96], [48, 96]];
    this.frameTick = 0;
    this.firing = false;
  };

  var dragonSprite = new Image();
  dragonSprite.src = "assets/dragon_sprite.png";

  Dragon.prototype.draw = function (ctx) {
    console.log(this.x);
    ctx.drawImage(
      dragonSprite,
      this.spriteCoords[0], this.spriteCoords[1],
      48, 48,
      this.x, this.y,
      48, 48
    );
  };

  Dragon.prototype.updateSprite = function (direction) {
    if (this.frameTick == 4) {
      this.frameTick = 0;
      if (direction === "left") {
        this.leftCoords.push(this.leftCoords.shift());
        return this.leftCoords[0];
      } else if (direction === "right") {
        this.rightCoords.push(this.rightCoords.shift());
        return this.rightCoords[0];
      } else {
        return this.upCoords[0];
      }
    } else {
      this.frameTick += 1;
      return this.spriteCoords;
    }
  };

  Dragon.prototype.move = function (keyMap) {
    if ((keyMap.indexOf(37) !== -1 &&              // left arrow key
         keyMap.indexOf(39) !== -1) ||             // right arrow key
       ((keyMap.indexOf(37) === -1 &&              // left arrow key
         keyMap.indexOf(39) === -1))) {            // right arrow key
      this.spriteCoords = this.updateSprite("up");
    } else if (keyMap.indexOf(37) !== -1) {         // left arrow key
      this.spriteCoords = this.updateSprite("left");
      if (this.x > 0) {
        this.x -= 3;
      }
    } else if (keyMap.indexOf(39) !== -1) {         // right arrow key
      this.spriteCoords = this.updateSprite("right");
      if (this.x < BubbleGame.Game.CANVAS_WIDTH - 48) {
        this.x += 3;
      }
    }
  };

  Dragon.protoype.fire = function (keyMap) {
    if (keyMap.indexOf(32) === -1 || this.firing) {
      return;
    } else {
      this.firing = true;
    }
  };

}());
