(function(global) {
    /*
     *----------------------------------------------------
     * The level.
     *----------------------------------------------------
     *
     * This is the level class of our game which
     * increments after every cleared level.
     *
     */
    var Level = function() {
        this._current = 1;
    };

    Level.prototype.up = function() {
        this._current++;
    };

    Level.prototype.reset = function() {
        this._current = 1;
    };

    Level.prototype.get = function() {
        return this._current;
    };

    Level.prototype.render = function(ctx) {
        ctx.font = '16px sans-serif';
        ctx.fillStyle = 'black';
        ctx.fillText('Level ' + this._current, 22, 82);
        ctx.fillStyle = 'white';
        ctx.fillText('Level ' + this._current, 20, 80);
    };

    global.level = new Level();
})(this);
