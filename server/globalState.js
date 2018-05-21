let state = {
    players: {},
    enemies: [],
    map: [],
    startCorner: undefined,
    next: undefined
}

exports.getState = () => state;

exports.setState = newState => {
    state = { ...state, ...newState };
}
