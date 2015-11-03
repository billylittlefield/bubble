(function() {
  'use strict';
  if (typeof BubbleGame === 'undefined') {
    window.BubbleGame = {};
  }

  var GameView = BubbleGame.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    ctx.shadowColor = "#ff0000";
    this.keyMap = [];
    this.loading = true;
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

  GameView.prototype.countdown = function (number) {
    var pattern = ctx.createPattern(this.game.tile, 'repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, BubbleGame.Game.CANVAS_WIDTH,
                       BubbleGame.Game.CANVAS_HEIGHT);
    var floor = new Image();
    floor.src = "assets/floor.png";
    floor.onload = function () {
      pattern = ctx.createPattern(floor, 'repeat');
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 400, BubbleGame.Game.CANVAS_WIDTH, 40);
    };
    var dots = parseInt(number) < 4 ? "..." : "";
    ctx.font = "72px Arcade Classic Regular";
    ctx.fillStyle = "white";
    if (number.substring(0,5) == "LEVEL") {
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 2;
    }
    ctx.textAlign = "center";
    ctx.fillText(number + dots, 300, 200);
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    setTimeout(function() {
      this.comboScore = 0;
      this.combo = false;
    }.bind(this), 1500);
  };

  GameView.prototype.render = function (timestamp) {
    if (timestamp === undefined) {
      this.countdown("");
      this.countdown("");
      return;
    }
    this.loading = this.game.loading;
    this.gameWon = this.game.gameWon;
    this.gameLost = this.game.gameLost;
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

$(document).ready(function () {
  window.music = new Audio("assets/music.wav");
  music.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
  }, false);
  music.play();
  $("#music-toggle").click(function() {
    if (window.music.paused) {
      window.music.play();
    } else {
      window.music.pause();
    }
  })
})

}());
