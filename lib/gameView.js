(function() {
  'use strict';
  if (typeof BubbleGame === 'undefined') {
    window.BubbleGame = {};
  }

  var GameView = BubbleGame.GameView = function(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    ctx.shadowColor = "#ff0000";
    this.keyMap = {};
    this.loading = true;
    $(document.body).on('keydown', this.handleKeydown.bind(this));
    $(document.body).on('keyup', this.handleKeyup.bind(this));
  };

  GameView.prototype.handleKeydown = function (e) {
      this.keyMap[e.keyCode] = true;
  };

  GameView.prototype.handleKeyup = function (e) {
      this.keyMap[e.keyCode] = false;
  };

  GameView.prototype.render = function (dt) {
    if (dt === undefined) {
      this.countdown("GET READY!");
      return;
    }
    this.loading = this.game.loading;
    this.gameWon = this.game.gameWon;
    this.gameLost = this.game.gameLost;
    this.updateDragonDirection();
    this.game.step(dt);
    this.game.draw(this.ctx);
  };

  GameView.prototype.countdown = function (text) {
    var pattern = ctx.createPattern(this.game.tile, 'repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, BubbleGame.Game.CANVAS_WIDTH,
                       BubbleGame.Game.CANVAS_HEIGHT);
    var floor = new Image();
    floor.src = "images/floor.png";
    floor.onload = function () {
      pattern = ctx.createPattern(floor, 'repeat');
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 400, BubbleGame.Game.CANVAS_WIDTH, 40);
    };
    var dots = parseInt(text) < 4 ? "..." : "";
    ctx.font = "72px Arcade Classic Regular";
    ctx.fillStyle = "white";
    if (text.substring(0,5) == "LEVEL") {
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 2;
    }
    ctx.textAlign = "center";
    ctx.fillText(text + dots, 300, 200);
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    setTimeout(function() {
      this.comboScore = 0;
      this.combo = false;
    }.bind(this), 1500);
  };

  GameView.prototype.playCountdown = function (callback) {
    setTimeout(function() {
      this.countdown("LEVEL " + this.game.level);
      setTimeout(function() {
        this.countdown("3");
        setTimeout(function() {
          this.countdown("2");
          setTimeout(function() {
            this.countdown("1");
            setTimeout(function() {
              this.countdown("START!");
              setTimeout(function() {
                window.requestAnimationFrame(callback);
                this.game.loading = false;
              }.bind(this), 750);
            }.bind(this), 750)
          }.bind(this), 750);
        }.bind(this), 750);
      }.bind(this), 1500);
    }.bind(this), 3000);
  };

  GameView.prototype.updateDragonDirection = function () {
    if ((this.keyMap[37] && this.keyMap[39]) ||
       ((!this.keyMap[37] && !this.keyMap[39]))) {
      this.game.dragon.updateSprite("up");
    } else if (this.keyMap[37]) {
      this.game.dragon.updateSprite("left");
    } else if (this.keyMap[39]) {
      this.game.dragon.updateSprite("right");
    }
    if (this.keyMap[32] && !this.game.dragon.firing) {
      this.game.dragon.fire();
    }
  };

$(document).ready(function () {
  window.music = new Audio("sounds/music.wav");
  music.volume = 0.25;
  music.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
  }, false);
  music.play();
  $("#music-toggle").click(function() {
    window.music.paused ? window.music.play() : window.music.pause()
  })

})

}());
