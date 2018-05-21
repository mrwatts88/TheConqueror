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
const images = { startMenuImage: null, mapImage: null, playerImage: null, itemImage: null, enemyImage: null, buttonsImage: null }

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
        p5.fill('white')
        let { startMenuGrobs } = getState()
        createCharacterGrobs(startMenuGrobs, p5)
        startMenuGrobs['nameBox'] = {
            left: p5 => xScale(p5) * 151,
            right: p5 => xScale(p5) * 291,
            top: p5 => yScale(p5) * 98,
            bottom: p5 => yScale(p5) * 111,
            action: () => setState({ name: '' })
        }

        startMenuGrobs['map1'] = {
            left: p5 => xScale(p5) * 450,
            right: p5 => xScale(p5) * 850,
            top: p5 => yScale(p5) * 125,
            bottom: p5 => yScale(p5) * 285,
            action: () => setState({ mapChoice: 1 })
        }
    }

    p5.keyTyped = () => {
        let { startMenuGrobs, activeGrob, name } = getState()
        if (startMenuGrobs['nameBox'] === activeGrob) setState({ name: name + p5.key })
    }

    p5.draw = () => {
        const { gameState, startMenuGrobs, name } = getState()
        if (gameState === LOADING) lazyLoad(p5, images).then(() => setState({ gameState: PLAY }))
        else if (gameState === STARTMENU) {
            if (p5.mouseX > p5.width || p5.mouseX < 0 || p5.mouseY > p5.height || p5.mouseY < 0) setState({ activeGrob: {} })
            p5.background('#009955')
            p5.image(images.startMenuImage, 0, 0, p5.width, p5.height)
            drawCharacterGrobs(p5, images.playerImage)

            // draw map grob
            let left1 = startMenuGrobs.nameBox.left
            let top1 = startMenuGrobs.nameBox.top
            p5.text(name, left1(p5), top1(p5))
            if (p5.frameCount % 60 < 30) p5.text('|', left1(p5) + p5.textWidth(name), top1(p5) - 2)

            let { left, right, top, bottom } = startMenuGrobs.map1
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
            // todo: extract
            ///

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
            drawLayout(p5, images.buttonsImage)
            drawInventory(p5, images.itemImage)
            drawHealth(p5)
            updateGuy(p5, socket)
        }
    }
}
