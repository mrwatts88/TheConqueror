import { getState, setState } from './globalState'
import { BS } from './constants'

// handle the shifting of the map, so we only draw the visible portion, and shift entities accordingly
export const shiftView = p5 => {
    const { width, height } = p5
    const { players, map, startCorner, id } = getState()
    const sC = {}
    sC.row = startCorner.row
    sC.col = startCorner.col
    if (players[id].xpos !== undefined) {
        const screensLeft = startCorner.col * BS
        const screensTop = startCorner.row * BS

        //player going down
        if (height - ((players[id].ypos - screensTop) + BS) < 2 * BS) {
            const canMove = map.length - (height / BS) - sC.row
            const wantToMove = (height / BS) - 5
            const move = Math.min(canMove, wantToMove)
            sC.row += move
        }

        // player going up
        if ((players[id].ypos - screensTop) < 2 * BS) {
            const canMove = sC.row
            const wantToMove = (height / BS) - 5
            const move = Math.min(canMove, wantToMove)
            sC.row -= move
        }

        // player going right
        if (width - ((players[id].xpos - screensLeft) + BS) < 2 * BS + 160) {
            const canMove = map[0].length - (width / BS) - sC.col + 5
            const wantToMove = (width / BS) - 10
            const move = Math.min(canMove, wantToMove)
            sC.col += move
        }

        // player going left
        if ((players[id].xpos - screensLeft) < 2 * BS) {
            const canMove = sC.col
            const wantToMove = (width / BS) - 10
            const move = Math.min(canMove, wantToMove)
            sC.col -= move
        }
    }

    setState({ next: { ...sC } })
}
