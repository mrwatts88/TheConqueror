import { getState, setState } from './globalState'
import { BS, GAMESTATE } from './constants'

// Perform the correct action based on what was clicked
export const performClickAction = p5 => {
    const xpos = p5.mouseX
    const ypos = p5.mouseY
    const { id, gameState, startMenuGrobs, playGrobs, players } = getState()
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
                setState({ isDetailShown: true, currentItem: index })
        } else {
            for (const key in playGrobs)
                if (didClick(playGrobs[key], p5)) superAction(playGrobs[key])
        }
    } else if (gameState === GAMESTATE.STARTMENU) {
        for (const key in startMenuGrobs)
            if (didClick(startMenuGrobs[key], p5)) superAction(startMenuGrobs[key])
    }
}

const superAction = grob => {
    setState({ activeGrob: grob })
    grob.action()
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
