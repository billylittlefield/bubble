(function() {
  'use strict';
  if (typeof BubbleGame === 'undefined') {
    window.BubbleGame = {};
  }

  var GameView = BubbleGame.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.keyMap = [];
  };

  GameView.prototype.handleKeydown = function (e) {
      this.keyMap.push(e.keyCode);
  };

  GameView.prototype.handleKeyup = function (e) {
    for (var i = (this.map.length - 1); i >= 0; i--) {
      if (this.keyMap[i] === e.keyCode) {
        this.keyMap.splice(i,1);
      }
    }
  };

  GameView.prototype.start = function () {
    $(document.body).on('keydown', this.handleKeydown.bind(this));
    $(document.body).on('keyup', this.handleKeyup.bind(this));
    setInterval(function() {
      this.game.step();
      this.game.draw(this.ctx);
    }.bind(this), 1000/60);
  };
}());
