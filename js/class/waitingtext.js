var WaitingText = function() {
    this.text = 'Press space to start';
};

WaitingText.prototype.render = function(ctx) {
    ctx.lineWidth = 2;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.font = '48px sans-serif';
    ctx.fillText(this.text, 40, 520);
    ctx.strokeText(this.text, 40, 520);
};
