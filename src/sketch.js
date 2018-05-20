import { origWidth, origHeight } from './constants'
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
import { createCharacterGrobs, drawCharacterGrobs, drawBackground } from './graphicsHelpers'

export const initSketch = socket =>
    p5 => {
        p5.preload = () => {
            setState({
                startMenuImage: p5.loadImage('startMenu.png'),
                images: p5.loadImage('sprites1.png'),
                enemyImages: p5.loadImage('monsterSprites.png'),
                mapImage: p5.loadImage('map.png'),
                itemImage: p5.loadImage('items.png'),

            })
        }

        p5.setup = () => {
            const can = p5.createCanvas(origWidth, origHeight)
            can.mousePressed(() => performClickAction(p5, socket))
            p5.textAlign(p5.CENTER, p5.CENTER)
            createCharacterGrobs(getState().graphicsObjects, p5)
        }

        p5.draw = () => {
            const { startMenuImage, gameState, images, graphicsObjects } = getState()
            if (gameState === 'STARTMENU') {
                p5.background('#009955')
                p5.image(startMenuImage, 0, 0, p5.width, p5.height)
                drawCharacterGrobs(graphicsObjects, p5, images)
            } else if (gameState === 'PLAY' || gameState === 'GLIDE') {
                if (gameState === 'PLAY') shiftView(p5)
                const { startCorner, next } = getState()
                if (gameState === 'PLAY' && (startCorner.col !== next.col || startCorner.row !== next.row))
                    setState({ superMoveY: startCorner.row - next.row, superMoveX: startCorner.col - next.col, gameState: 'GLIDE' })
                if (gameState === 'GLIDE') glide()
                drawBackground(p5)
                drawVisibleItems(p5, p5.width, p5.height)
                drawPlayers(p5)
                drawEnemies(p5)
                drawLayout(p5)
                drawInventory(p5)
                drawHealth(p5)
                updateGuy(p5, socket)
            }
        }
    }