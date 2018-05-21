import { xScale, yScale } from './utils'

let state = {}

export const initState = socket => {
    state = {
        id: undefined,
        spriteChoice: 0,
        name: 'fred',
        players: {},
        enemies: [],
        map: [],
        mapChoice: 0,
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
                action: () => {
                    const { name, spriteChoice, mapChoice } = getState()
                    socket.emit('startgame', { name, spriteChoice, mapChoice })
                }
            },
            chars: []
        }
    }
}

export const getState = () => state
export const setState = newState => { state = { ...state, ...newState } }
