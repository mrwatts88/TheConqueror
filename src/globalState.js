import { xScale, yScale } from './utils'

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
    gameState: 'STARTMENU',
    env: 'PRODUCTION',
    graphicsObjects: {
        startBtn: {
            left: p5 => xScale(p5) * 81,
            right: p5 => xScale(p5) * 156,
            top: p5 => yScale(p5) * 476,
            bottom: p5 => yScale(p5) * 512,
            action: () => setState({ gameState: 'PLAY' })

        },
        chars: []
    }
}

export const getState = () => state
export const setState = newState => { state = { ...state, ...newState } }
