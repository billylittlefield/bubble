(function() {
  'use strict';

  var Firewall = BubbleGame.Firewall = function (startFrame, x) {
    this.fireCoords = [[21, 0], [43, 0], [64, 0]];
    for (var i = 0; i < startFrame; i++) {
      this.fireCoords.push(this.fireCoords.shift());
    }
    this.spriteCoords = this.fireCoords[0];
    this.x = x;
    this.image = new Image();
    this.image.src = "assets/firewall.png";
    this.frameTick = 0;
  };

  Firewall.prototype.draw = function (ctx) {
    this.spriteCoords = this.fireCoords[0];
    if (this.frameTick == 4) {
      this.frameTick = 0;
      this.fireCoords.push(this.fireCoords.shift());
    } else {
      this.frameTick += 1;
    }
    ctx.drawImage(
      this.image,
      this.spriteCoords[0], this.spriteCoords[1],
      13, 6,
      this.x, 0,
      40, 15
    );
  };



}());
