// Define variable to center the images on the y axix.
const yOffset = 20;

// Varibales for winner message
const modal = document.querySelector('.modal_background');
const playAgain = document.querySelector('.modal_button');



// Enemies our player must avoid
var Enemy = function(speed, row) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = row * 83 - yOffset;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.   
    if(this.x < 504) {
    	this.x += this.speed * dt;
    } else {
    	this.x = -101;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Hero = function() {
	
	this.startX = 202;
	this.startY = 415 - yOffset;

	this.x = this.startX;
	this.y = this.startY;

	this.sprite = 'images/char-boy.png';
	this.hasWon = false;
};

// Called by the engine.js
// Checks to see if there is a collision
Hero.prototype.update = function() {
	for(let enemy of allEnemies) {
		this.checkCollision(enemy);
	}
};

// Renders the player supplying the x and y coordinates
Hero.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Evluate the player's direction and update x and y coordinates
Hero.prototype.handleInput = function(direction) {
	switch(direction) {
		case 'left':
			if(this.x > 0) {
				this.x -= 101;
			}
			break;
		case 'up':
			if(this.y > 83) {
				this.y -= 83;
			} else { 
				// At this point play made it to the water
				modal.classList.toggle('hide');	
				this.hasWon = true;
			}
			break;
		case 'right':
			if(this.x < 404) {
				this.x += 101;
			}
			break;
		case 'down':
			if(this.y < 395)  {
				this.y += 83;
			}
			break;
	}
};

// Compare player's position against enemy's position.
// If the 'logically' overlap then they collided
Hero.prototype.checkCollision = function(enemy) {
	if(this.y === enemy.y && (enemy.x + 75 > this.x && enemy.x < this.x + 75)) {
		this.resetPlayer();
	}
};

// Resets the player for a new game
Hero.prototype.resetPlayer = function() {
	this.x = this.startX;
	this.y = this.startY;
	this.hasWon = false;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


const player = new Hero();
const enemy1 = new Enemy(20, 1);
const enemy1b = new Enemy(100, 1);
const enemy2 = new Enemy(40, 2);
const enemy3 = new Enemy(80, 2);
const enemy4 = new Enemy(60, 3);

const allEnemies = [];
allEnemies.push(enemy1);
allEnemies.push(enemy1b);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
allEnemies.push(enemy4);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Event listner for Play Again button
playAgain.addEventListener('click', () => {
	modal.classList.toggle('hide');
	player.resetPlayer();
	win.requestAnimationFrame(main);
});
