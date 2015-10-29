(function() {
  'use strict';
  if (typeof BubbleGame === 'undefined') {
    window.BubbleGame = {};
  }

  var Game = BubbleGame.Game = function() {
    this.bubbles = [];
    this.fireballs = [];
    this.firewalls = [];
    this.dragon = new BubbleGame.Dragon({ x: ((Game.CANVAS_WIDTH / 2) - 20),
                                          y: (Game.CANVAS_HEIGHT - 40),
                                          game: this });
    this.addFirewalls();
    this.addBubbles();
    this.tile = new Image();
    this.tile.src = 'assets/stone.png';
  };

  Game.CANVAS_WIDTH = 600;
  Game.CANVAS_HEIGHT = 400;
  Game.GRAVITY = 0.2;
  Game.ELASTICITY = 0.98;

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

  Game.prototype.addBubbles = function (ctx) {
    this.bubbles.push(new BubbleGame.Bubble({ x: 100, y: 100,
                                              vx: 2, vy: 1,
                                              game: this,
                                              size: 5 }));
  };

  Game.prototype.step = function(keyMap) {
    this.moveAll();
    this.checkCollisions();
  };

  Game.prototype.moveAll = function () {
    this.allObjects().forEach(function (object) {
      object.move();
    });
  };

  Game.prototype.draw = function(ctx) {
    var pattern = ctx.createPattern(this.tile, 'repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, Game.CANVAS_WIDTH, Game.CANVAS_HEIGHT);
    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
    this.firewalls.forEach(function (firewall) {
      firewall.draw(ctx);
    });
  };

  Game.prototype.allObjects = function() {
    var allObjects = this.bubbles.concat(this.fireballs).concat([this.dragon]);
    return allObjects;
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
    }
  };

}());
