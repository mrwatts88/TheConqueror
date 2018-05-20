import { getState, setState } from './globalState';
import { BS } from './constants';

export const glide = () => {
    let { superMoveY, superMoveX, startCorner, next } = getState();
    let moveY = startCorner.row - next.row;
    let moveX = startCorner.col - next.col;

    if (superMoveY > 0) { // Glide DOWN
        startCorner.row -= superMoveY / 60;
        if (moveY < 0) {
            startCorner.row = next.row;
            setState({ state: 'PLAY' })
        }
    } else if (superMoveY < 0) { // Glide UP
        startCorner.row -= superMoveY / 60;
        if (moveY > 0) {
            startCorner.row = next.row;
            setState({ state: 'PLAY' })
        }
    } if (superMoveX < 0) { // Glide LEFT
        startCorner.col -= superMoveX / 60;
        if (moveX > 0) {
            startCorner.col = next.col;
            setState({ state: 'PLAY' })
        }
    } else if (superMoveX > 0) { // Glide RIGHT
        startCorner.col -= superMoveX / 60;
        if (moveX < 0) {
            startCorner.col = next.col;
            setState({ state: 'PLAY' })
        }
    }
}
