(function() {
  'use strict';

  var Firewall = BubbleGame.Firewall = function (startFrame, x) {
    this.fireCoords = [[21, 0], [43, 0], [64, 0]];
    this.startFrame = startFrame;
    this.spriteCoords = this.fireCoords[0];
    this.x = x;
    this.frameTick = 0;
    this.chooseFirewall();
  };

  Firewall.prototype.chooseFirewall = function () {
    if (window.FIRE === "blue") {
      this.fireCoords = [[21, 7], [43, 7], [64, 7]];
    } else if (window.FIRE === "green") {
      this.fireCoords = [[21, 14], [43, 14], [64, 14]];
    }
    for (var i = 0; i < this.startFrame; i++) {
      this.fireCoords.push(this.fireCoords.shift());
    }
  };

  var image = new Image();
  image.src = "images/firewall.png";

  Firewall.prototype.draw = function (ctx) {
    this.spriteCoords = this.fireCoords[0];
    if (this.frameTick == 4) {
      this.frameTick = 0;
      this.fireCoords.push(this.fireCoords.shift());
    } else {
      this.frameTick += 1;
    }
    ctx.drawImage(
      image,
      this.spriteCoords[0], this.spriteCoords[1],
      13, 6,
      this.x, 0,
      40, 15
    );
  };



}());
