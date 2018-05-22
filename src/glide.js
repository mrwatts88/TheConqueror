import { getState, setState } from './globalState'
import { GAMESTATE } from './constants'

const { PLAY } = GAMESTATE

export const glide = () => {
    const { superMoveY, superMoveX, startCorner, next } = getState()
    const moveY = startCorner.row - next.row
    const moveX = startCorner.col - next.col

    if (superMoveY > 0) {
        // Glide DOWN
        startCorner.row -= superMoveY / 60
        if (moveY < 0) {
            startCorner.row = next.row
            setState({ gameState: PLAY })
        }
    } else if (superMoveY < 0) {
        // Glide UP
        startCorner.row -= superMoveY / 60
        if (moveY > 0) {
            startCorner.row = next.row
            setState({ gameState: PLAY })
        }
    }
    if (superMoveX < 0) {
        // Glide LEFT
        startCorner.col -= superMoveX / 60
        if (moveX > 0) {
            startCorner.col = next.col
            setState({ gameState: PLAY })
        }
    } else if (superMoveX > 0) {
        // Glide RIGHT
        startCorner.col -= superMoveX / 60
        if (moveX < 0) {
            startCorner.col = next.col
            setState({ gameState: PLAY })
        }
    }
}
