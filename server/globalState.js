const C = require('./constants');

let state = {
    players: {},
    enemies: [],
    map: [],
    startCorner: undefined,
    next: undefined,
    superMoveY: undefined,
    superMoveX: undefined,
    state: C.GAMESTATE.STARTMENU,
    env: C.ENV.PRODUCTION
}

exports.getState = () => state;

exports.setState = newState => {
    state = { ...state, ...newState };
}