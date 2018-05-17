let state = {
    id: undefined,
    players: {},
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

export const getState = () => state;

export const setState = newState => {
    state = { ...state, ...newState };
}