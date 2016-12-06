(function(global) {
    /*
     *----------------------------------------------------
     * The waiting text.
     *----------------------------------------------------
     *
     * This is the waiting text which appear 
     * when the game start.
     */
    var WaitingText = function() {
        this.text = 'Press space to start';
    };

    WaitingText.prototype.render = function(ctx) {
        if (Math.floor(Date.now() / 750) % 2) {
            return;
        }
        ctx.font = '48px sans-serif';
        ctx.fillStyle = 'black';
        ctx.fillText(this.text, 42, 522);
        ctx.fillStyle = 'white';
        ctx.fillText(this.text, 40, 520);
    };

    global.waitingText = new WaitingText();
})(this);
