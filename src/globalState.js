import { xScale, yScale } from './utils'
import { GAMESTATE, ENV, itemMap } from './constants'

let state = {}

export const initState = socket => {
    state = {
        id: undefined,
        spriteChoice: 0,
        name: '',
        activeGrob: {},
        isDetailShown: false,
        currentItem: 0,
        players: {},
        enemies: [],
        map: [],
        mapChoice: 0,
        startCorner: undefined,
        next: undefined,
        superMoveY: undefined,
        superMoveX: undefined,
        gameState: GAMESTATE.STARTMENU,
        env: ENV.PRODUCTION,
        playGrobs: {
            mainMenuBtn: {
                left: p5 => xScale(p5) * 750,
                right: p5 => xScale(p5) * 885,
                top: p5 => yScale(p5) * 510,
                bottom: p5 => yScale(p5) * 555,
                action: () => {
                    setState({ gameState: GAMESTATE.STARTMENU })
                },
            },
            itemCloseBtn: {
                left: p5 => p5.width / 2 + 0.5 * xScale(p5) * 300 - 25,
                right: p5 => p5.width / 2 + 0.5 * xScale(p5) * 300 + 25,
                top: p5 => p5.height / 2 - 0.5 * yScale(p5) * 200 - 25,
                bottom: p5 => p5.height / 2 - 0.5 * yScale(p5) * 200 + 25,
                action: () => {
                    setState({ isDetailShown: false })
                },
            },
            itemUseBtn: {
                left: p5 => xScale(p5) * 315,
                right: p5 => xScale(p5) * 385,
                top: p5 => yScale(p5) * 345,
                bottom: p5 => yScale(p5) * 375,
                action: () => {
                    const { id, players, currentItem } = getState()
                    socket.emit('useitem', {
                        id,
                        index: currentItem,
                        item: itemMap[players[id].inventory[currentItem].type],
                    })

                    setState({ isDetailShown: false })
                },
            },
            itemGiftBtn: {
                left: p5 => xScale(p5) * 415,
                right: p5 => xScale(p5) * 485,
                top: p5 => yScale(p5) * 345,
                bottom: p5 => yScale(p5) * 375,
                action: () => {
                    setState({ isDetailShown: false })
                },
            },
            itemDropBtn: {
                left: p5 => xScale(p5) * 515,
                right: p5 => xScale(p5) * 585,
                top: p5 => yScale(p5) * 345,
                bottom: p5 => yScale(p5) * 375,
                action: () => {
                    const { id, players, currentItem } = getState()
                    socket.emit('dropitem', {
                        id,
                        index: currentItem,
                        item: itemMap[players[id].inventory[currentItem].type],
                    })

                    setState({ isDetailShown: false })
                },
            },
        },
        startMenuGrobs: {
            startBtn: {
                left: p5 => xScale(p5) * 81,
                right: p5 => xScale(p5) * 156,
                top: p5 => yScale(p5) * 476,
                bottom: p5 => yScale(p5) * 512,
                action: () => {
                    const { name, spriteChoice, mapChoice } = getState()
                    if (name !== '')
                        socket.emit('startgame', {
                            name,
                            spriteChoice,
                            mapChoice,
                        })
                },
            },

            nameBox: {
                left: p5 => xScale(p5) * 151,
                right: p5 => xScale(p5) * 291,
                top: p5 => yScale(p5) * 98,
                bottom: p5 => yScale(p5) * 111,
                action: () => setState({ name: '' }),
            },
            map1: {
                left: p5 => xScale(p5) * 450,
                right: p5 => xScale(p5) * 850,
                top: p5 => yScale(p5) * 125,
                bottom: p5 => yScale(p5) * 285,
                action: () => setState({ mapChoice: 1 }),
            },
        },

        itemInfoGrobs: {
            item1: {
                // This grobs position methods allow it to remain the same size while scaling its position
                left: p5 => xScale(p5) * 315,
                right: p5 => xScale(p5) * 355,
                top: p5 => yScale(p5) * 204,
                bottom: p5 => yScale(p5) * 150,
                action: () => {},
            },
        },
    }
}

export const getState = () => state
export const setState = newState => {
    state = { ...state, ...newState }
}
