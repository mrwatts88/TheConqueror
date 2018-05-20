let state = {
    id: undefined,
    players: {},
    enemies: [],
    map: [],
    images: undefined,
    enemyImages: undefined,
    mapImage: undefined,
    startMenuImage: undefined,
    itemImage: undefined,
    startCorner: undefined,
    next: undefined,
    superMoveY: undefined,
    superMoveX: undefined,
    state: 'STARTMENU',
    env: 'PRODUCTION',

}

export const getState = () => state;

export const setState = newState => {
    state = { ...state, ...newState };
}