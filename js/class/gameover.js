 (function(global) {
     /*
      *----------------------------------------------------
      * The game over text.
      *----------------------------------------------------
      *
      * This is the counter which gets activated just before
      * the game starts (on starting state).
      *
      */
     var GameOver = function() {
         this.text = 'Game over!';
     };

     GameOver.prototype.render = function(ctx) {
         ctx.font = '60px sans-serif';
         var textWidth = ctx.measureText(this.text).width;
         ctx.fillStyle = 'black';
         ctx.fillText(this.text, (505 / 2) - (textWidth / 2), 317);
         ctx.fillStyle = 'white';
         ctx.fillText(this.text, (505 / 2) - (textWidth / 2), 315);
     };

     global.gameOver = new GameOver();
 })(this);
