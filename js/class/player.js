(function(global) {
    /*
     *----------------------------------------------------
     * The player.
     *----------------------------------------------------
     *
     * This is our player.
     *
     */
    var Player = function() {
        // The image/sprite for our player.
        this.sprite = 'images/char-princess-girl.png';

        // The grid coordinates of the player.
        this.col = 2;
        this.row = 5;
    };

    // The player constructor.
    Player.prototype.update = function(dt) {
        this.x = this.col * 101;
        this.y = (this.row * 83) - 20;
    };

    // Render the player in the game scene.
    Player.prototype.render = function(ctx) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    // Handle the user input for the player.
    Player.prototype.handleInput = function(keyCode) {
        var canMove = true;
        var nextCol = this.col;
        var nextRow = this.row;

        if (keyCode === 'down' && this.row < 5) {
            nextRow++;
        } else if (keyCode === 'up' && this.row > 0) {
            nextRow--;
        } else if (keyCode === 'right' && this.col < 4) {
            nextCol++;
        } else if (keyCode === 'left' && this.col > 0) {
            nextCol--;
        }

        allRocks.forEach(function(rock) {
            if ((rock.col === nextCol) && (rock.row === nextRow)) {
                canMove = false;
            }
        });

        if (canMove) {
            this.col = nextCol;
            this.row = nextRow;
        }
    };

    Player.prototype.reset = function(keyCode) {
        this.col = 2;
        this.row = 5;
    };

    global.player = new Player();
})(this);
