(function() {
  'use strict';
  if (typeof BubbleGame === 'undefined') {
    window.BubbleGame = {};
  }

  var Bubble = BubbleGame.Bubble = function(bubbleParams) {
    this.x = bubbleParams.x;
    this.y = bubbleParams.y;
    this.vx = bubbleParams.vx;
    this.vy = bubbleParams.vy;
    this.game = bubbleParams.game;
    this.size = bubbleParams.size;
    this.radius = Bubble.RADIUS_SIZE[this.size];
    this.image = new Image();
    this.image.src = Bubble.BALL_COLOR[this.size];
  };

  Bubble.RADIUS_SIZE = [0, 8, 16, 24, 32, 40, 48];
  Bubble.BALL_COLOR = ["", "assets/gold_ball.png",  "assets/blue_ball.png",
                           "assets/green_ball.png", "assets/orange_ball.png",
                           "assets/pink_ball.png"];


  Bubble.prototype.draw = function (ctx) {
    ctx.drawImage(
      this.image,
      100, 32,
      215, 215,
      this.x, this.y,
      this.radius * 2, this.radius * 2
    );
  };

  Bubble.prototype.move = function () {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += BubbleGame.Game.GRAVITY;
    if ((this.y + 2*this.radius) > BubbleGame.Game.CANVAS_HEIGHT) {
      this.y = BubbleGame.Game.CANVAS_HEIGHT - 2*this.radius;
      if (this.size == 5) {
        this.vy = BubbleGame.Game.ELASTICITY * -11;
      } else if (this.size == 4) {
        this.vy = BubbleGame.Game.ELASTICITY * -9.75;
      } else if (this.size == 3) {
        this.vy = BubbleGame.Game.ELASTICITY * -8.5;
      } else if (this.size == 2) {
        this.vy = BubbleGame.Game.ELASTICITY * -7.25;
      } else if (this.size == 1) {
        this.vy = BubbleGame.Game.ELASTICITY * -6;
      }
    }
    if (this.x + 2*this.radius > BubbleGame.Game.CANVAS_WIDTH) {
      this.x = BubbleGame.Game.CANVAS_WIDTH - 2*this.radius;
      this.vx *= -1;
    }
    if (this.x < 0) {
      this.x = 0;
      this.vx *= -1;
    }
  };

  Bubble.prototype.isCollidedWith = function (object) {
    var radius = this.radius - 4;
    var x = this.x + this.radius;
    var y = this.y + this.radius;
    var distX = Math.abs(x - object.x - object.w/2);
    var distY = Math.abs(y - object.y - object.h/2);

    if (distX > (object.w/2 + radius)) { return false; }
    if (distY > (object.h/2 + radius)) { return false; }

    if (distX <= (object.w/2)) {
        return true;
      }
    if (distY <= (object.h/2)) {
      return true;
    }

    var dx = distX - (object.w / 2);
    var dy = distY - (object.h / 2);
    return (dx*dx + dy*dy <= (radius*radius));
  };

  Bubble.prototype.collideWith = function (object) {
    if (object instanceof BubbleGame.Dragon) {
      // kill
    } else if (object instanceof BubbleGame.Fireball) {
      this.game.remove(object);
      this.pop();
    }
  };

  Bubble.prototype.pop = function () {
    this.game.remove(this);
    if (this.size > 1) {
      this.game.addBubble(new Bubble({ x: this.x, y: this.y,
                                       vx: 2, vy: -5,
                                       game: this.game, size: this.size - 1 }));
      this.game.addBubble(new Bubble({ x: this.x, y: this.y,
                                       vx: -2, vy: -5,
                                       game: this.game, size: this.size - 1 }));
    }
  };

}());
