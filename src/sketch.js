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
import { xScale, yScale } from './utils'
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
        p5.textAlign(p5.LEFT, p5.TOP)
        p5.textSize(16)
        let { graphicsObjects } = getState()
        createCharacterGrobs(graphicsObjects, p5)
        graphicsObjects['nameBox'] = {
            left: p5 => xScale(p5) * 151,
            right: p5 => xScale(p5) * 291,
            top: p5 => yScale(p5) * 98,
            bottom: p5 => yScale(p5) * 111,
            action: () => setState({ name: '' })
        }

        graphicsObjects['map1'] = {
            left: p5 => xScale(p5) * 450,
            right: p5 => xScale(p5) * 850,
            top: p5 => yScale(p5) * 125,
            bottom: p5 => yScale(p5) * 285,
            action: () => setState({ mapChoice: 1 })
        }
    }

    p5.keyTyped = () => {
        let { graphicsObjects, activeGrob, name } = getState()
        if (graphicsObjects['nameBox'] === activeGrob) setState({ name: name + p5.key })
    }

    p5.draw = () => {
        const { gameState, graphicsObjects, name } = getState()
        if (gameState === LOADING) lazyLoad(p5, images).then(() => setState({ gameState: PLAY }))
        else if (gameState === STARTMENU) {
            if (p5.mouseX > p5.width || p5.mouseX < 0 || p5.mouseY > p5.height || p5.mouseY < 0) setState({ activeGrob: {} })
            p5.background('#009955')
            p5.image(images.startMenuImage, 0, 0, p5.width, p5.height)
            drawCharacterGrobs(graphicsObjects, p5, images.playerImage)

            let left1 = graphicsObjects.nameBox.left
            let top1 = graphicsObjects.nameBox.top
            p5.text(name, left1(p5), top1(p5))
            if (p5.frameCount % 60 < 30) p5.text('|', left1(p5) + p5.textWidth(name), top1(p5) - 2)

            let { left, right, top, bottom } = graphicsObjects.map1
            p5.image(
                images.mapImage,
                left(p5),
                top(p5),
                right(p5) - left(p5),
                bottom(p5) - top(p5),
                200, 465,
                2 * (right(p5) - left(p5)),
                2 * (bottom(p5) - top(p5))
            )

        }
        else if (gameState === PLAY || gameState === GLIDE) {
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
