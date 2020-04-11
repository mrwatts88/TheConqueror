import { getState, setState } from './globalState'
import { UNIT_SIZE } from './constants'

// handle the shifting of the map, so we only draw the visible portion, and shift entities accordingly
export const shiftView = p5 => {
    const { width, height } = p5
    const { players, map, startCorner, id } = getState()
    const sC = {}
    sC.row = startCorner.row
    sC.col = startCorner.col
    if (players[id] !== undefined) {
        const screensLeft = startCorner.col * UNIT_SIZE
        const screensTop = startCorner.row * UNIT_SIZE

        //player going down
        if (height - (players[id].ypos - screensTop + UNIT_SIZE) < 2 * UNIT_SIZE) {
            const canMove = map.length - height / UNIT_SIZE - sC.row
            const wantToMove = height / UNIT_SIZE - 5
            const move = Math.min(canMove, wantToMove)
            sC.row += move
        }

        // player going up
        if (players[id].ypos - screensTop < 2 * UNIT_SIZE) {
            const canMove = sC.row
            const wantToMove = height / UNIT_SIZE - 5
            const move = Math.min(canMove, wantToMove)
            sC.row -= move
        }

        // player going right
        if (width - (players[id].xpos - screensLeft + UNIT_SIZE) < 2 * UNIT_SIZE + 160) {
            const canMove = map[0].length - width / UNIT_SIZE - sC.col + 5
            const wantToMove = width / UNIT_SIZE - 10
            const move = Math.min(canMove, wantToMove)
            sC.col += move
        }

        // player going left
        if (players[id].xpos - screensLeft < 2 * UNIT_SIZE) {
            const canMove = sC.col
            const wantToMove = width / UNIT_SIZE - 10
            const move = Math.min(canMove, wantToMove)
            sC.col -= move
        }
    }

    setState({ next: { ...sC } })
}
