(function() {
  'use strict';
  if (typeof BubbleGame === 'undefined') {
    window.BubbleGame = {};
  }

  var GameView = BubbleGame.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.keyMap = [];
    $(document.body).on('keydown', this.handleKeydown.bind(this));
    $(document.body).on('keyup', this.handleKeyup.bind(this));
  };

  GameView.prototype.handleKeydown = function (e) {
      this.keyMap.push(e.keyCode);
  };

  GameView.prototype.handleKeyup = function (e) {
    for (var i = (this.keyMap.length - 1); i >= 0; i--) {
      if (this.keyMap[i] === e.keyCode) {
        this.keyMap.splice(i,1);
      }
    }
  };

  GameView.prototype.render = function () {
    this.updateDragonDirection();
    this.game.step(this.keyMap);
    this.game.draw(this.ctx);
  };

  GameView.prototype.updateDragonDirection = function () {
    if ((this.keyMap.indexOf(37) !== -1 &&              // left arrow key
         this.keyMap.indexOf(39) !== -1) ||             // right arrow key
       ((this.keyMap.indexOf(37) === -1 &&              // left arrow key
         this.keyMap.indexOf(39) === -1))) {            // right arrow key
      this.game.dragon.updateSprite("up");
    } else if (this.keyMap.indexOf(37) !== -1) {         // left arrow key
      this.game.dragon.updateSprite("left");
    } else if (this.keyMap.indexOf(39) !== -1) {         // right arrow key
      this.game.dragon.updateSprite("right");
    }
    if (this.keyMap.indexOf(32) !== -1 && !this.game.dragon.firing) {
      this.game.dragon.fire();
    }
  };

}());
