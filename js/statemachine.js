var StateMachine = (function(global) {

	/*
	 *----------------------------------------------------
	 * The available states.
	 *----------------------------------------------------
	 *
	 * These are the available states of the game.
	 * Only one of them can be active at a time.
	 *
	 */

	var states = {
		waiting: 0,
		beforeStart: 1,
		starting: 2,
		running: 3,
		won: 4,
		lost: 5,
		fin: 6
	}

	/*
	 *----------------------------------------------------
	 * The states of the game.
	 *----------------------------------------------------
	 *
	 * This is the state container. getCurrent, getPrevious
	 * and change functions should be used to modify the
	 * state of the game.
	 *
	 */

	var state = {
		_previous: null,
		_current: null,
		getPrevious: function() {
			return state._previous;
		},
		getCurrent: function() {
			return state._current;
		},
		change: function(newState) {
			state._previous = state._current;
			state._current = newState;
		}
	};

	global.stateMachine = {
		state: state,
		states: states
	};
})(this);

stateMachine.state.change(stateMachine.states.waiting);
