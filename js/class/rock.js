(function(global) {
    /*
     *----------------------------------------------------
     * The rock.
     *----------------------------------------------------
     *
     * This is the rock which blocks
     * our player.
     */
    var Rock = function() {
        this.index = -1;
        this.col = Rock.getRandomCol();
        this.row = Rock.getRandomRow();
        this.x = this.col * 101;
        this.y = (this.row * 83) - 20;
        this.sprite = 'images/Rock.png';
    };

    // Get a random column for the rock to spawn.
    Rock.getRandomCol = function() {
        return Math.floor((Math.random() * 5));
    };

    // Get a random row for the rock to spawn.
    Rock.getRandomRow = function() {
        return Math.floor((Math.random() * 3) + 1);
    };

    Rock.prototype.render = function(ctx) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    global.Rock = Rock;
})(this);
