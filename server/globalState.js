let state = {
    player: [{}],
    enemies: [],
    map: [],
    images: undefined,
    enemyImages: undefined,
    mapImage: undefined,
    itemImage: undefined,
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