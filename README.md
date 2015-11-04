# Dragon Pop

[Play the game now!][play]

[play]: http://billylittlefield.github.io/dragon-pop/

## Description

Dragon Pop is a wave-defense arcade style game inspired by Bubble Trouble. It's written in JavaScript and uses HTML5 Canvas for rendering. The game objective is to pop all bubbles with fireballs (SPACEBAR) while dodging the bubbles as they bounce around (LEFT/RIGHT ARROWS). When hit with a fireball, every bubble pops into two smaller bubbles until they're small enough to pop into nothingness. By chaining pops together, a skilled player can pop bubbles all the way into the fire ceiling to earn extra combo points. The game currently features 11 balanced and incrementally difficult levels.

## Features

* Bounce behavior dependent on bubble size
* Collision detection between circular (bubble) and rectangular (dragon, fireball) object models
* Gravity and movespeed optimized for playability
* Sprite animations on fireballs, ceiling fire, and dragon movement
* Pre-game selection for fire color and dragon color
* 'Pop' fade-out animation upon bubble pop, dependent on size
* Sound effects for popping bubbles (dependent on size) and shooting fireballs
* Music / sound effect toggle options
* Score tracking and multiplier for combo pops on the ceiling

## Code

### Game

Using jQuery key listeners, keyboard input is detected by mapping key-pushes into a keyMap. On release of a key, the keyCode for the released key is cleared out of the keyMap. This allows multi-key input (ie, moving and firing simultaneously). The dragon direction is set according to the keyMap contents, and the dragon will attempt to fire on every frame the spacebar is held down but is capped with a quarter-second buffer between shots:

```javascript
GameView.prototype.updateDragonDirection = function () {
    if ((this.keyMap.indexOf(37) !== -1 &&              // left arrow key
         this.keyMap.indexOf(39) !== -1) ||             // right arrow key
       ((this.keyMap.indexOf(37) === -1 &&              // left arrow key
         this.keyMap.indexOf(39) === -1))) {            // right arrow key
      this.game.dragon.updateSprite("up");
    } else if (this.keyMap.indexOf(37) !== -1) {        // left arrow key
      this.game.dragon.updateSprite("left");
    } else if (this.keyMap.indexOf(39) !== -1) {        // right arrow key
      this.game.dragon.updateSprite("right");
    }
    if (this.keyMap.indexOf(32) !== -1 && !this.game.dragon.firing) {
      this.game.dragon.fire();
    }
  };
  ```

The Game also keeps track of lives, score, level, background tile images, and the following game-states: Dead, Loading, NextLevel, GameWon, GameLost, and Combo. The gravity and elasticity are set as constants on the Game class.

### Bubbles

Each instance of bubble has instance variables for radius, position, and velocity, as well as references to image source, audio source, and the active game. Collision detection is conditional and heavy use of helper methods helps keep the code logical:

```javascript
  Bubble.prototype.collideWith = function (object) {
    if (object instanceof BubbleGame.Dragon) {
      this.game.die();
    } else if (object instanceof BubbleGame.Fireball) {
      this.game.remove(object);
      this.pop();
    } else if (object instanceof Bubble.Firewall) {
      this.pop();
    }
  };
```

Because of the nature of the game, bubbles bounce with perfectly elastic collisions (no y-velocity loss). Popping a bubble triggers the bubble to disappear, two smaller bubbles to take its place (if not of size == 1), and a 'Pop' obejct to exist temporarily at the scene of the crime. The 'Pop' is just a simple image render in static location with an alpha decreasing every frame.

### Dragon and Fireballs

The dragon does not follow the velocity model of the bubbles because the dragon stays still upon no key input. The dragon model therefore keeps track of position, direction, firing state (boolean), and the sprite animation currently being used. To avoid choppy gameplay, the sprite animation is only updated every four frames and cycles through a predetermined three images for left/right directions. Movement stop will revert the dragon to his forward-facing image. To account for the head of the dragon being shifted to the left/right when moving left/right (respectively), the fireball initial positions are adjusted if the dragon is in motion when shooting:

```javascript
  Dragon.prototype.fire = function () {
    this.firing = true;
    setTimeout(function() {
      this.firing = false;
    }.bind(this), 350);
    var xOffset = this.x + 15;
    if (this.direction === "left") {
      xOffset -= 10;
    } else if (this.direction === "right") {
      xOffset += 10;
    }
    var newFireball = new BubbleGame.Fireball({
        x: xOffset,
        y: (this.y + 10),
        game: this.game
      });
    this.game.addFireball(newFireball);
  };
  ```
  
## Summary
  
I had a blast creating this game. This was my first incorporation of sprites animations, and it opens a whole new door for creating dynamic gameplay. I also learned a great deal about the value of requestAnimationFrame vs. setTimeout when updating the game. RequestAnimationFrame allows for much smoother gameplay, and through use of the timestamp can accomodate browser hangups or frames with heavy calculation. Setting up the pre-game and post-game modals / views also let me practice more jQuery event triggers. On the whole, I'm happy with how the game looks and I think the gameplay is pretty addictive. Let me know if you can beat level 11. I came within 2 blue bubbles of it and choked under the pressure. Happy popping!
