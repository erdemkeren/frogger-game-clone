 (function(global) {
     /*
      *----------------------------------------------------
      * The counter.
      *----------------------------------------------------
      *
      * This is the counter which gets activated just before
      * the game starts (on starting state).
      *
      */
     var Counter = function() {
         this._isActive = false;
         this._count = 3;
     };

     Counter.prototype.activate = function() {
         this._isActive = true;
     };

     Counter.prototype.isActive = function() {
         return this._isActive;
     };

     Counter.prototype.count = function() {
         this._count--;
     };

     Counter.prototype.getCount = function() {
         return this._count;
     };

     Counter.prototype.getText = function() {
         return this._count === 0 || this._count === -1 ? 'Go!' : this._count;
     };

     Counter.prototype.reset = function() {
         this._isActive = false;
         this._count = 3;
     };

     Counter.prototype.render = function(ctx) {
         ctx.font = '60px sans-serif';
         var textWidth = ctx.measureText(this.getText()).width;
         ctx.fillStyle = 'black';
         ctx.fillText(this.getText(), (505 / 2) - (textWidth / 2), 317);
         ctx.fillStyle = 'white';
         ctx.fillText(this.getText(), (505 / 2) - (textWidth / 2), 315);
     };

     global.counter = new Counter();
 })(this);
