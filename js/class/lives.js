(function(global) {
	var Lives = function() {
		this.icon = 'images/heart-scaled.png';
		this._count = 3;
	};

	Lives.prototype.decrese = function() {
		this._count--;
	};

	Lives.prototype.increse = function() {
		this._count++;
	};

	Lives.prototype.reset = function() {
		this._count = 3;
	};

	Lives.prototype.count = function() {
		return this._count;
	};

	Lives.prototype.render = function(ctx) {
		ctx.drawImage(Resources.get(this.icon), 455, 65);
        ctx.font = '16px sans-serif';
        ctx.fillStyle = 'black';
        ctx.fillText('x' + this._count, 472, 82);
        ctx.fillStyle = 'white';
        ctx.fillText('x' + this._count, 470, 80);
	};

	global.lives = new Lives();
})(this);
