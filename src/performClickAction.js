import { getState } from './globalState'
import { BS, GAMESTATE } from './constants'

// Perform the correct action based on what was clicked
export const performClickAction = (p5, socket) => {
    const xpos = p5.mouseX
    const ypos = p5.mouseY
    const { id, gameState, graphicsObjects, players } = getState()
    const p = players[id]

    if (gameState === GAMESTATE.PLAY) {
        const baseX = p5.width - 150
        const baseY = p5.height / 8

        // Click is in in inventory area
        if (
            xpos >= baseX &&
            ypos >= baseY &&
            xpos <= baseX + 4 * (BS + 5) &&
            ypos <= baseY + 4 * (BS + 5)
        ) {
            const index = getClickedInventoryIndex(xpos, ypos, baseX, baseY)
            if (p.inventory[index] !== undefined)
                socket.emit('useitem', { id, index })
        }
    } else if (gameState === GAMESTATE.STARTMENU) {
        for (const key in graphicsObjects) {
            if (Array.isArray(graphicsObjects[key])) {
                for (const obj of graphicsObjects[key])
                    if (didClick(obj, p5)) obj.action()
            } else {
                if (didClick(graphicsObjects[key], p5))
                    graphicsObjects[key].action()
            }
        }
    }
}

const getClickedInventoryIndex = (xpos, ypos, baseX, baseY) => {
    const xIndex = Math.floor((xpos - baseX) / (BS + 5))
    const yIndex = Math.floor((ypos - baseY) / (BS + 5))
    return yIndex * 4 + xIndex
}

const didClick = (graphicsObject, p5) => {
    const { mouseX, mouseY } = p5
    const { left, right, top, bottom } = graphicsObject
    return (
        mouseX > left(p5) &&
        mouseY > top(p5) &&
        mouseX < right(p5) &&
        mouseY < bottom(p5)
    )
}
