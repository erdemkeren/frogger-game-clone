(function(global) {
    /*
     *----------------------------------------------------
     * The enemy.
     *----------------------------------------------------
     *
     * This is the enemy class our player must avoid
     * while passing the bridge.
     *
     */
    var Enemy = function() {
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';

        // The index of the enemy in the all enemies array.
        // Handy for killing the enemies.
        this.index = -1;

        // The grid coordinates of the enemy.
        this.row = Enemy.getRandomRow();

        // The pixel coordinates of the enemy.
        this.x = -101;
        this.y = (this.row * 83) - 20;

        // The speed of the enemy.
        this.speed = Math.floor((Math.random() * 80) + 21);

        // Determine if the enemy is killed or not.
        this.isKilled = false;
    };

    // Get a random column for the enemy to spawn.
    Enemy.getRandomRow = function() {
        return Math.floor((Math.random() * 3) + 1);
    };

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    Enemy.prototype.update = function(dt) {
        this.x = this.x + (this.speed * dt);

        if (this.x > 500) {
            if (this.isKilled) {
                delete allEnemies[this.index];
            } else {
                this.respawn();
            }
        }
    };

    // Draw the enemy on the screen, required method for game
    Enemy.prototype.render = function(ctx) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    Enemy.prototype.respawn = function() {
        this.x = -100;
        this.row = Enemy.getRandomRow();
        this.y = (83 * this.row) - 20;
    };

    // Make the enemy sprint.
    Enemy.prototype.sprint = function() {
        this.speed = 500;
    };

    Enemy.prototype.kill = function() {
        this.isKilled = true;
    };

    global.Enemy = Enemy;
})(this);
