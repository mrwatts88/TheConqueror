let state = {
    players: {},
    enemies: [],
    map: [],
    startCorner: undefined,
    next: undefined,
    superMoveY: undefined,
    superMoveX: undefined,
    state: 'PLAY',
    env: 'PRODUCTION'
}

exports.getState = () => state;

exports.setState = newState => {
    state = { ...state, ...newState };
}