import { getState } from './globalState'
import { BS } from './constants'

// Perform the correct action based on what was clicked
export const performClickAction = (p5, socket) => {
    let xpos = p5.mouseX
    let ypos = p5.mouseY
    let { id, state, graphicsObjects } = getState()

    if (state === 'PLAY') {
        let baseX = p5.width - 150
        let baseY = p5.height / 8

        // Click is in in inventory area
        if (xpos >= baseX && ypos >= baseY && xpos <= baseX + 4 * (BS + 5) && ypos <= baseY + 4 * (BS + 5)) {
            let index = getClickedInventoryIndex(xpos, ypos, baseX, baseY)
            socket.emit('useitem', { id, index })
        }
    } else if (state === 'STARTMENU')
        for (const key in graphicsObjects) {
            if (Array.isArray(graphicsObjects[key])) {
                for (let obj of graphicsObjects[key])
                    if (didClick(obj, p5)) obj.action(id, socket)
            } else {
                if (didClick(graphicsObjects[key], p5)) graphicsObjects[key].action()
            }
        }
}

const getClickedInventoryIndex = (xpos, ypos, baseX, baseY) => {
    let xIndex = Math.floor((xpos - baseX) / (BS + 5))
    let yIndex = Math.floor((ypos - baseY) / (BS + 5))
    return yIndex * 4 + xIndex
}

const didClick = (graphicsObject, p5) => {
    let { mouseX, mouseY } = p5
    let { left, right, top, bottom } = graphicsObject
    return (mouseX > left(p5) && mouseY > top(p5) && mouseX < right(p5) && mouseY < bottom(p5))
}
