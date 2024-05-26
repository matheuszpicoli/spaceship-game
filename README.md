# MP SpaceShip 🚀

### Project link running on Vercel: https://mp-spaceship-game.vercel.app/

<br>

**MP SpaceShip** was the first project I actually carried out, it's one of those little ship games where you obviously control a ship and your objective is to eliminate your opponents.

Your ship is the blue ship, you can control it with **W**, **S**, **A** and **D** or with the **keyboard arrows**. Before starting the game, we have 3 difficulty levels that we can choose, namely: **Easy**, **Medium** and **Hard**.

The entire game runs on top of a single **HTML**, it does not have any type of route to other files, everything is manipulated and created directly in the DOM.

#### I will explain the game based on Normal difficulty, where the variables have their default values, let's say:

I created an environment where there is a certain similarity with space, I thought about creating a .SCSS file to animate the scene but I used **particles.js** for that, it helped me create the "stars" that keep walking randomly around the scene.

You have **100%** of life and with each damage you take you lose **5%** of it until you reach **0%** where the game over is executed, the background music stops and a button appears to reload the game. When you do this, your last played difficulty is saved and you can play with it again or not. The default difficulty value when entering for the first time is normal, it is not possible to play the game without choosing a difficulty, but, if you still manage to remove the input value, Promise will fall into reject and it will force you to choose a difficulty in the same way.

You shoot with the **space bar** and pause and/or unpause the game with the **Esc** key, your projectile has twice the speed of your enemy and each shot you hit counts off **1** of your opponent's life, you gain **10 points** in your score when defeating an enemy when their life reaches **0**, every **100 points** a sound is played.

When your base receives damage, an explosion sound is played and it flashes red twice. When your life reaches 15%, another sound is also played and it also flashes red until the game is over.

The movement of your ship is enough, enemies are generated on the screen every **2 seconds**.

#### Improvements I want to make in the future, such as updates:

1. Best score system for each difficulty played;
2. Changing levels, for every 40 enemies defeated, for example, the difficulty increases;
3. Give the player a customization menu to change the game's colors and scenery.
