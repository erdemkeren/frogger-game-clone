/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        collisionDetected = false,
        counterInterval,
        lastTime = 0;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Update the current state of our game.
         */
        sync();

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    /* This function syncs the game, the states and the scene.
     */
    function sync() {
        // If the current state is before start, we create the enemies.
        if (stateMachine.state.getCurrent() === stateMachine.states.beforeStart) {
            createEnemies();
            allRocks = [];
            createRocks();
            stateMachine.state.change(stateMachine.states.starting);
        }

        if (stateMachine.state.getCurrent() === stateMachine.states.starting) {
            // If the current state is starting, we start a counter to
            // give some space for bugs to spread.
            if (!counter.isActive()) {
                counter.activate();
                counterInterval = setInterval(function() {
                    counter.count();
                }, 1000);
            }

            // If the counter is ended, we start the game.
            if (counter.getCount() === 0) {
                stateMachine.state.change(stateMachine.states.running);
            }
        }

        if (counter.isActive()) {
            // If the counter is -1, that means we showed
            // the 'Go!' text for one second. It is time
            // to clear the interval and reset the counter.
            if (counter.getCount() <= -1) {
                window.clearInterval(counterInterval);
                counter.reset();
            }
        }

        // If the user managed to reach the row 0,
        // that means he won the level and 
        // levelled up!
        if (player.row === 0 && stateMachine.state.getCurrent() === stateMachine.states.running) {
            stateMachine.state.change(stateMachine.states.won);
            setTimeout(function() {
                player.reset();
                level.up();
                stateMachine.state.change(stateMachine.states.beforeStart);
            }, 1000);
        }

        if (stateMachine.state.getCurrent() === stateMachine.states.lost) {
            lives.decrese();

            if(lives.count() <= 0) {
                // If the user has lost the game, we make the
                // enemies sprint to annoy the user.
                sprintEnemies(false);
                stateMachine.state.change(stateMachine.states.fin);
            } else {
                player.reset();
                stateMachine.state.change(stateMachine.states.running);
            }
        }

        // If the user has won the game, we again
        // make the enemies spring but that time
        // they will not respawn.
        if (stateMachine.state.getCurrent() === stateMachine.states.won) {
            sprintEnemies(true);
            stateMachine.state.change(stateMachine.states.fin);
        }

        // If the game is finished and the previous state is lost,
        // we set a timer to reset the the game. Gameover text
        // will also be rendered.
        if((stateMachine.state.getCurrent() === stateMachine.states.fin) && stateMachine.state.getPrevious() === stateMachine.states.lost) {
            setTimeout(function() {
                reset();
            }, 1000);
        }
    }

    /* This function make the enemies sprint. Is called by the
     * prepare when the game is lost or won by the player. If
     * kill is set to true, enemies will not respawn after
     * they leave the viewport of the user and be deleted.
     */
    function sprintEnemies(kill) {
        allEnemies.forEach(function(enemy) {
            enemy.sprint();

            if (kill) {
                enemy.kill();
            }
        });
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        updateEntities(dt);

        if (stateMachine.state.getCurrent() === stateMachine.states.running) {
            checkCollisions();
        }
    }

    /* This function creates level + 2 enemies.
     * E.g. If the current level is 1, 3 enemies
     * will be created.
     */
    function createEnemies() {
        for (var i = 0; i < level.get() + 2; i++) {
            EnemyFactory.create();
        }
    }

    /* This function creates level / 5 rocks.
     * E.g. If the current level is 10, 2 rocks
     * will be created.
     */
    function createRocks() {
        for (var i = 0; i < Math.floor(level.get() / 3); i++) {
            RockFactory.create();
        }
    }

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });

        player.update();
    }

    /* 
     * Check the collision to the player.
     */
    function checkCollisions() {
        allEnemies.forEach(function(enemy) {
            var enemyStart = enemy.x;
            var EnemyEnd = enemy.x + 101;
            var playerStart = player.x + 20; // +20 to feel better.
            var playerEnd = player.x + 81; // 101 - 20 to feel better.
            var sameRow = player.row === enemy.row;
            var touch = (EnemyEnd >= playerStart && EnemyEnd <= playerEnd) || (enemyStart >= playerStart && enemyStart <= playerEnd);

            if (sameRow && touch) {
                console.log('Collision!');
                stateMachine.state.change(stateMachine.states.lost);
            }
        });
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = [
                'images/water-block.png', // Top row is water
                'images/stone-block.png', // Row 1 of 3 of stone
                'images/stone-block.png', // Row 2 of 3 of stone
                'images/stone-block.png', // Row 3 of 3 of stone
                'images/grass-block.png', // Row 1 of 2 of grass
                'images/grass-block.png' // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }

    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        allEnemies.forEach(function(enemy) {
            enemy.render(ctx);
        });

        allRocks.forEach(function(rock) {
            rock.render(ctx);
        });

        if (stateMachine.state.getCurrent() !== stateMachine.states.waiting) {
            player.render(ctx);
            level.render(ctx);
            lives.render(ctx);
        }

        if (stateMachine.state.getCurrent() === stateMachine.states.waiting) {
            waitingText.render(ctx);
        }

        if (counter.isActive()) {
            counter.render(ctx);
        }
    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
        allEnemies = [];
        allRocks = [];
        lives.reset();
        level.reset();
        player.reset();
        
        stateMachine.state.change(stateMachine.states.waiting);
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/char-princess-girl.png',
        'images/Rock.png',
        'images/heart-scaled.png'
    ]);
    Resources.onReady(init);
})(this);
