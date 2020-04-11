import { origWidth, origHeight, GAMESTATE, itemMap, UNIT_SIZE } from './constants'
import { drawEnemies } from './drawEnemies'
import { drawPlayers } from './drawPlayers'
import { drawHealth } from './drawHealth'
import { drawInventory } from './drawInventory'
import { drawItemInfo } from './drawItemInfo'
import { drawVisibleItems } from './drawVisibleItems'
import { shiftView } from './shiftView'
import { updateGuy } from './updateGuy'
import { performClickAction } from './performClickAction'
import { getState, setState } from './globalState'
import { drawLayout } from './drawLayout'
import { glide } from './glide'
import { xScale, yScale } from './utils'
import {
    createCharacterGrobs,
    drawCharacterGrobs,
    drawBackground,
    lazyLoad,
    drawGrob,
    drawNameText,
} from './graphicsHelpers'

const { GLIDE, STARTMENU, PLAY, LOADING } = GAMESTATE
const images = {
    startMenuImage: null,
    mapImage: null,
    playerImage: null,
    itemImage: null,
    enemyImage: null,
    buttonsImage: null,
}

export const initSketch = socket => p5 => {
    window.p5 = p5;
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
        const { startMenuGrobs } = getState()
        createCharacterGrobs(startMenuGrobs, p5)
    }

    p5.keyPressed = () => {
        if (p5.keyCode === p5.SHIFT) return
        const { name, startMenuGrobs, activeGrob } = getState()
        if (startMenuGrobs['nameBox'] === activeGrob) {
            if (p5.keyCode === p5.BACKSPACE || p5.keyCode === p5.DELETE)
                setState({ name: name.slice(0, -1) })
            else {
                //Letters a-z ~ A-Z
                if (p5.keyCode >= 65 && p5.keyCode <= 90) {
                    const charCode = !p5.keyIsDown(p5.SHIFT)
                        ? p5.keyCode + 32
                        : p5.keyCode
                    setState({ name: name + String.fromCharCode(charCode) })
                }

                //Numbers 1-9 on top row
                if (p5.keyCode >= 96 && p5.keyCode <= 105)
                    setState({ name: name + (p5.keyCode - 96).toString() })

                //Numbers 1-9 on keypad
                if (p5.keyCode >= 48 && p5.keyCode <= 57)
                    setState({ name: name + (p5.keyCode - 48).toString() })
            }
        }
    }

    p5.draw = () => {
        const { gameState, startMenuGrobs, name } = getState()
        if (gameState === LOADING)
            lazyLoad(p5, images).then(() => setState({ gameState: PLAY }))
        else if (gameState === STARTMENU) {
            // Unset any active grobs if mouse leaves the canvas
            if (
                p5.mouseX > p5.width ||
                p5.mouseX < 0 ||
                p5.mouseY > p5.height ||
                p5.mouseY < 0
            )
                setState({ activeGrob: {} })

            p5.background('#009955')
            p5.image(images.startMenuImage, 0, 0, p5.width, p5.height)
            drawCharacterGrobs(p5, images.playerImage)
            drawNameText(p5, startMenuGrobs.nameBox, name)

            const opts = {
                image: images.mapImage,
                grob: getState().startMenuGrobs.map1,
                spriteX: 200,
                spriteY: 465,
                spriteWidth: 400,
                spritHeight: 160,
            }

            drawGrob(p5, opts)
        } else if (gameState === PLAY || gameState === GLIDE) {
            if (gameState === PLAY) shiftView(p5)
            const { startCorner, next } = getState()
            if (
                gameState === PLAY &&
                (startCorner.col !== next.col || startCorner.row !== next.row)
            ) {
                setState({
                    superMoveY: startCorner.row - next.row,
                    superMoveX: startCorner.col - next.col,
                    gameState: GLIDE,
                })
            }
            if (gameState === GLIDE) glide()
            drawBackground(p5, images.mapImage)
            drawVisibleItems(p5, images.itemImage)
            drawPlayers(p5, images.playerImage)
            drawEnemies(p5, images.enemyImage)
            drawLayout(p5, images.buttonsImage)
            drawInventory(p5, images.itemImage)
            drawItemInfo(p5, images.itemImage)
            drawHealth(p5)
            const { isDetailShown, currentItem } = getState()
            if (isDetailShown) drawItemDetail(p5, currentItem, images)
            updateGuy(p5, socket)
        }
    }

    const drawItemDetail = (p5, currentItem, images) => {
        // Draw outer rectangle
        p5.push()
        p5.rectMode(p5.CENTER)
        p5.fill('rgba(0,0,0, 0.25)')
        p5.strokeWeight(3)
        p5.stroke('#FFD700')
        p5.rect(p5.width / 2, p5.height / 2, xScale(p5) * 300, yScale(p5) * 200)
        p5.pop()

        // Draw close btn
        const closeOpts = {
            image: images.buttonsImage,
            grob: getState().playGrobs.itemCloseBtn,
            width: 50,
            height: 50,
            spriteX: 445,
            spriteY: 40,
            spriteWidth: 110,
            spritHeight: 110,
        }

        drawGrob(p5, closeOpts)

        // Draw item image
        const { players, id } = getState()
        const thisPlayer = players[id]
        const thisItem = thisPlayer.inventory[currentItem]
        const { type } = thisItem
        const item = itemMap[type]
        const x = item.x
        const y = item.y

        p5.image(
            images.itemImage,
            xScale(p5) * 300,
            yScale(p5) * 200,
            2 * UNIT_SIZE,
            2 * UNIT_SIZE,
            x * UNIT_SIZE,
            y * UNIT_SIZE,
            UNIT_SIZE,
            UNIT_SIZE
        )

        //Draw Item Description
        p5.push()
        p5.textSize(16)
        p5.strokeWeight(2)
        p5.textAlign(p5.LEFT, p5.BOTTOM)
        p5.text(
            item.description,
            xScale(p5) * 320,
            yScale(p5) * 270,
            xScale(p5) * 280,
            yScale(p5) * 70
        )
        p5.pop()

        // Draw Use button
        const useOpts = {
            image: images.buttonsImage,
            grob: getState().playGrobs.itemUseBtn,
            spriteX: 12,
            spriteY: 280,
            spriteWidth: 205,
            spritHeight: 75,
        }

        drawGrob(p5, useOpts)
        drawGrob(p5, { ...useOpts, grob: getState().playGrobs.itemGiftBtn })
        drawGrob(p5, { ...useOpts, grob: getState().playGrobs.itemDropBtn })
    }
}
