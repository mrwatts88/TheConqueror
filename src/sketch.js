import { origWidth, origHeight, GAMESTATE } from './constants'
import { drawEnemies } from './drawEnemies'
import { drawPlayers } from './drawPlayers'
import { drawHealth } from './drawHealth'
import { drawInventory } from './drawInventory'
import { drawVisibleItems } from './drawVisibleItems'
import { shiftView } from './shiftView'
import { updateGuy } from './updateGuy'
import { performClickAction } from './performClickAction'
import { getState, setState } from './globalState'
import { drawLayout } from './drawLayout'
import { glide } from './glide'
import { createCharacterGrobs, drawCharacterGrobs, drawBackground, lazyLoad } from './graphicsHelpers'

const { GLIDE, STARTMENU, PLAY, LOADING } = GAMESTATE
const images = { startMenuImage: null, mapImage: null, playerImage: null, itemImage: null, enemyImage: null }

export const initSketch = socket => p5 => {
    p5.preload = () => {
        images.startMenuImage = p5.loadImage('startMenu.png')
        images.mapImage = p5.loadImage('map.png')
        images.playerImage = p5.loadImage('sprites1.png')
    }

    p5.setup = () => {
        const can = p5.createCanvas(origWidth, origHeight)
        can.mousePressed(() => performClickAction(p5, socket))
        p5.textAlign(p5.CENTER, p5.CENTER)
        createCharacterGrobs(getState().graphicsObjects, p5)
    }

    p5.draw = () => {
        const { gameState, graphicsObjects } = getState()
        if (gameState === LOADING) lazyLoad(p5, images).then(() => setState({ gameState: PLAY }))
        else if (gameState === STARTMENU) {
            p5.background('#009955')
            p5.image(images.startMenuImage, 0, 0, p5.width, p5.height)
            drawCharacterGrobs(graphicsObjects, p5, images.playerImage)
        } else if (gameState === PLAY || gameState === GLIDE) {
            if (gameState === PLAY) shiftView(p5)
            const { startCorner, next } = getState()
            if (gameState === PLAY && (startCorner.col !== next.col || startCorner.row !== next.row))
                setState({
                    superMoveY: startCorner.row - next.row,
                    superMoveX: startCorner.col - next.col,
                    gameState: GLIDE
                })
            if (gameState === GLIDE) glide()
            drawBackground(p5, images.mapImage)
            drawVisibleItems(p5, images.itemImage)
            drawPlayers(p5, images.playerImage)
            drawEnemies(p5, images.enemyImage)
            drawLayout(p5)
            drawInventory(p5, images.itemImage)
            drawHealth(p5)
            updateGuy(p5, socket)
        }
    }
}
