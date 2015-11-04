(function() {
  'use strict';
  if (typeof BubbleGame === 'undefined') {
    window.BubbleGame = {};
  }

  var Game = BubbleGame.Game = function(level) {
    this.bubbles = [];
    this.fireballs = [];
    this.firewalls = [];
    this.pops = [];
    this.dragon = new BubbleGame.Dragon({ x: ((Game.CANVAS_WIDTH / 2) - 24),
                                          y: (Game.CANVAS_HEIGHT - 48),
                                          game: this });
    this.addFirewalls();
    this.lives = 3;
    this.score = 0;
    this.level = level;
    this.dead = false;
    this.loading = true;
    this.nextLevel = false;
    this.gameWon = false;
    this.gameLost = false;
    this.combo = false;
    this.comboScore = 0;
    this.soundEffects = true;
    this.addBubbles(this.level);
    this.tile = new Image();
    this.tile.src = 'assets/stone.png';
    this.floor = new Image();
    this.floor.src = 'assets/floor.png';
  };

  Game.CANVAS_WIDTH = 600;
  Game.CANVAS_HEIGHT = 400;
  Game.GRAVITY = 0.2;
  Game.ELASTICITY = 0.98;

  Game.prototype.step = function(keyMap) {
    this.moveAll();
    this.checkCollisions();
  };

  Game.prototype.moveAll = function () {
    this.movingObjects().forEach(function (object) {
      object.move();
    });
  };

  Game.prototype.draw = function(ctx) {
    var pattern = ctx.createPattern(this.tile, 'repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, Game.CANVAS_WIDTH, Game.CANVAS_HEIGHT);
    pattern = ctx.createPattern(this.floor, 'repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 400, Game.CANVAS_WIDTH, 40);
    this.drawLives(ctx);
    this.drawLevel(ctx);
    this.drawScore(ctx);
    this.drawDeadScreen(ctx);
    this.drawNextLevelScreen(ctx);
    this.drawCombo(ctx);
    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
  };

  Game.prototype.addFirewalls = function () {
    var x = 0;
    var startFrame = 0;
    while (x < Game.CANVAS_WIDTH - 20) {
      this.firewalls.push(new BubbleGame.Firewall(startFrame, x));
      x += 20;
      if (startFrame === 3) {
        startFrame = 0;
      } else {
        startFrame += 1;
      }
    }
  };

  Game.prototype.addBubbles = function (level) {
    this.fireballs = [];
    switch (level) {
      case 0:
        this.bubbles = [];
        break;
      case 1:
        this.bubbles.push(new BubbleGame.Bubble({
          x: 50, y: 100,
          vx: 1.5, vy: 1,
          game: this,
          size: 2
        }));
        break;
      case 2:
        this.bubbles.push(new BubbleGame.Bubble({
          x: 50, y: 100,
          vx: 1.5, vy: 1,
          game: this,
          size: 3
        }));
        break;
      case 3:
        this.bubbles.push(new BubbleGame.Bubble({
          x: 50, y: 100,
          vx: 1.5, vy: 1,
          game: this,
          size: 2
        }));
        this.bubbles.push(new BubbleGame.Bubble({
          x: 250, y: 100,
          vx: -1.5, vy: 1,
          game: this,
          size: 2
        }));
        this.bubbles.push(new BubbleGame.Bubble({
          x: 450, y: 100,
          vx: 1.5, vy: 1,
          game: this,
          size: 2
        }));
        break;
      case 4:
        this.bubbles.push(new BubbleGame.Bubble({
          x: 100, y: 100,
          vx: 1.5, vy: 1,
          game: this,
          size: 4
        }));
        break;
      case 5:
        this.bubbles.push(new BubbleGame.Bubble({
          x: 100, y: 100,
          vx: 1.5, vy: 1,
          game: this,
          size: 3
        }));
        this.bubbles.push(new BubbleGame.Bubble({
          x: 450, y: 100,
          vx: -1.5, vy: 1,
          game: this,
          size: 3
        }));
        break;
      case 6:
        this.bubbles.push(new BubbleGame.Bubble({
          x: 100, y: 100,
          vx: 1.5, vy: 1,
          game: this,
          size: 5
        }));
        break;
      case 7:
        this.bubbles.push(new BubbleGame.Bubble({
          x: 20, y: 250,
          vx: 1.5, vy: 1,
          game: this,
          size: 2
        }));
        this.bubbles.push(new BubbleGame.Bubble({
          x: 80, y: 250,
          vx: 1.5, vy: 1,
          game: this,
          size: 2
        }));
        this.bubbles.push(new BubbleGame.Bubble({
          x: 460, y: 250,
          vx: -1.5, vy: 1,
          game: this,
          size: 2
        }));
        this.bubbles.push(new BubbleGame.Bubble({
          x: 520, y: 250,
          vx: -1.5, vy: 1,
          game: this,
          size: 2
        }));
        break;
      case 8:
        this.bubbles.push(new BubbleGame.Bubble({
          x: 120, y: 100,
          vx: -1.5, vy: 1,
          game: this,
          size: 5
        }));
        this.bubbles.push(new BubbleGame.Bubble({
          x: 400, y: 100,
          vx: 1.5, vy: 1,
          game: this,
          size: 5
        }));
        break;
      case 9:
        this.bubbles.push(new BubbleGame.Bubble({
          x: 100, y: 100,
          vx: -1.5, vy: 1,
          game: this,
          size: 3
        }));
        this.bubbles.push(new BubbleGame.Bubble({
          x: 250, y: 100,
          vx: -1.5, vy: 1,
          game: this,
          size: 3
        }));
        this.bubbles.push(new BubbleGame.Bubble({
          x: 300, y: 100,
          vx: 1.5, vy: 1,
          game: this,
          size: 3
        }));
        this.bubbles.push(new BubbleGame.Bubble({
          x: 450, y: 100,
          vx: 1.5, vy: 1,
          game: this,
          size: 3
        }));
        break;
      case 10:
        this.bubbles.push(new BubbleGame.Bubble({
          x: 50, y: 100,
          vx: -1.5, vy: 1,
          game: this,
          size: 1
        }));
        this.bubbles.push(new BubbleGame.Bubble({
          x: 150, y: 100,
          vx: -1.5, vy: 1,
          game: this,
          size: 2
        }));
        this.bubbles.push(new BubbleGame.Bubble({
          x: 250, y: 100,
          vx: -1.5, vy: 1,
          game: this,
          size: 3
        }));
        this.bubbles.push(new BubbleGame.Bubble({
          x: 400, y: 100,
          vx: 1.5, vy: 1,
          game: this,
          size: 5
        }));
        this.bubbles.push(new BubbleGame.Bubble({
          x: 500, y: 100,
          vx: 1.5, vy: 1,
          game: this,
          size: 4
        }));
        break;
      case 11:
        this.bubbles.push(new BubbleGame.Bubble({
            x: 50, y: 130,
            vx: 1.5, vy: 1,
            game: this,
            size: 5
          }));
          this.bubbles.push(new BubbleGame.Bubble({
            x: 275, y: 130,
            vx: 1.5, vy: 1,
            game: this,
            size: 5
          }));this.bubbles.push(new BubbleGame.Bubble({
            x: 500, y: 130,
            vx: 1.5, vy: 1,
            game: this,
            size: 5
          }));
          break;
    }
  };

  Game.prototype.allObjects = function() {
    var allObjects = this.bubbles.concat(this.firewalls)
                                 .concat(this.fireballs)
                                 .concat([this.dragon])
                                 .concat(this.pops);
    return allObjects;
  };

  Game.prototype.movingObjects = function () {
    var movingObjects = this.bubbles.concat(this.fireballs)
                                    .concat([this.dragon]);
    return movingObjects;
  };

  Game.prototype.nonBubbles = function() {
    var nonBubbles = this.fireballs.concat([this.dragon]).concat(this.firewalls);
    return nonBubbles;
  };

  Game.prototype.checkCollisions = function() {
    var nonBubbles = this.nonBubbles();
    for (var i = 0; i < this.bubbles.length; i++) {
      for (var j = 0; j < nonBubbles.length; j++) {
        if (this.bubbles[i].isCollidedWith(nonBubbles[j])) {
          this.bubbles[i].collideWith(nonBubbles[j]);
          break;
        }
      }
    }
  };

  Game.prototype.addFireball = function (fireball) {
    this.fireballs.push(fireball);
  };

  Game.prototype.addBubble = function (bubble) {
    this.bubbles.push(bubble);
  };

  Game.prototype.addPop = function(pop) {
    this.pops.push(pop);
  };

  Game.prototype.remove = function (object) {
    if (object instanceof BubbleGame.Fireball) {
      for (var i = 0; i < this.fireballs.length; i++){
        if (this.fireballs[i] === object) {
          this.fireballs.splice(i, 1);
        }
      }
    } else if (object instanceof BubbleGame.Bubble) {
      for (var j = 0; j < this.bubbles.length; j++){
          if (this.bubbles[j] === object) {
            this.bubbles.splice(j, 1);
          }
        }
    } else if (object instanceof BubbleGame.Pop) {
      for (var k = 0; k < this.pops.length; k++) {
        if (this.pops[k] === object) {
          this.pops.splice(k, 1);
        }
      }
    }
  };

  Game.prototype.drawLives = function (ctx) {
    var dragon = new Image();
    dragon.src = "assets/" + window.DRAGON + "-dragon-2.gif";
    var xOffset = 10;
    for (var i = 0; i < this.lives; i++) {
      ctx.drawImage(
        dragon,
        0, 0,
        100, 100,
        xOffset, 410,
        20, 20
      );
      xOffset += 30;
    }
  };

  Game.prototype.drawScore = function (ctx) {
    ctx.font = "30px Arcade Classic Regular";
    ctx.fillStyle = "white";
    ctx.textAlign = "right";
    ctx.fillText(this.score, 580, 430);
  };

  Game.prototype.drawLevel = function (ctx) {
    ctx.font = "30px Arcade Classic Regular";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Level" + this.level, 310, 430);
  };

  Game.prototype.drawDeadScreen = function () {
    var lives = this.lives == 1 ? "   life" : "    lives";
    if (this.dead) {
      ctx.font = "56px Arcade Classic Regular";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("THE   DRAGON   WAS", 300, 175);
      ctx.fillText("CRUSHED    BY    BUBBLES!", 310, 225);
      ctx.fillText(this.lives + lives + "   LEFT", 310, 275);
    }
  };

  Game.prototype.drawNextLevelScreen = function () {
    if (this.nextLevel) {
      ctx.font = "56px Arcade Classic Regular";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("YOU   BURNED   YOUR    WAY", 300, 175);
      ctx.fillText("THROUGH    LEVEL   " + (this.level - 1), 310, 225);
      if (this.lives < 5) {
        ctx.fillText("HAVE   AN   EXTRA    LIFE", 310, 275);
      }
    }
  };

  Game.prototype.drawCombo = function () {
    if (this.combo) {
      ctx.font = "20px Arcade Classic Regular";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("COMBO!    +" + this.comboScore, 300, 30);
      setTimeout(function() {
        this.comboScore = 0;
        this.combo = false;
      }.bind(this), 1500);
    }
  };

  Game.prototype.die = function() {
    this.lives -= 1;
    if (this.lives < 1) {
      this.gameLost = true;
      return;
    }
    this.bubbles = [];
    this.dead = true;
    this.loading = true;
    setTimeout(function() {
      this.loading = false;
      this.dead = false;
      this.dragon.resetPosition();
      this.addBubbles(this.level);
    }.bind(this), 1500);
  };


  Game.prototype.startNextLevel = function () {
    if (this.level == 12) {
      this.gameWon = true;
      return;
    }
    this.level += 1;
    this.nextLevel = true;
    this.loading = true;
    setTimeout(function() {
      if (this.lives < 6) {
        this.lives += 1;
      }
      this.pops = [];
      this.loading = false;
      this.nextLevel = false;
      this.dragon.resetPosition();
      this.addBubbles(this.level);
    }.bind(this), 1500);
  };

}());
