/*
 *----------------------------------------------------
 * The enemy factory.
 *----------------------------------------------------
 *
 */

var EnemyFactory = {
    create: function() {
        var enemy = new Enemy();
        var index = allEnemies.push(enemy) - 1;
        enemy.index = index;
    }
};

// RUNTIME

/*
 *----------------------------------------------------
 * The player. ^_^
 *----------------------------------------------------
 *
 * This is our player with a soul.
 *
 */

 var player = new Player();

/*
 *----------------------------------------------------
 * The alive enemies. [O_o, O_o, O_o]
 *----------------------------------------------------
 *
 * Here, we have an array of alive bugs.
 *
 */

var allEnemies = [];

/*
 *----------------------------------------------------
 * Texts.
 *----------------------------------------------------
 *
 */

var waitingText = new WaitingText();

// KEY HANDLING.

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        32: 'space',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    var key = allowedKeys[e.keyCode];

    if(key === 'space' && stateMachine.state.getCurrent() === stateMachine.states.waiting) {
        stateMachine.state.change(stateMachine.states.beforeStart);
        return;
    }

    if(stateMachine.state.getCurrent() === stateMachine.states.running) {
        player.handleInput(key);
    }
});

// Because the game keys are also meaningful to browser,
// we prevent the default behaviour eg. scrolling.
window.onkeydown = function(e) {
    if(e.keyCode === 32 || e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
        e.preventDefault();
    }
}
