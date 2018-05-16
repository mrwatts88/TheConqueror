import { getState, setState } from './globalState';
import { BS } from './constants';

export const glide = () => {
    let { superMoveY, superMoveX, startCorner, player, enemies, state, next } = getState();

    let moveY = startCorner.row - next.row;
    let moveX = startCorner.col - next.col;

    if (superMoveY > 0) { // Glide DOWN
        player[0].ypos += (superMoveY * BS - 1) / 30;
        enemies.forEach(e => e.ypos += (superMoveY * BS - 1) / 30);
        startCorner.row -= superMoveY / 30;
        if (moveY <= 0) {
            startCorner.row = next.row;
            player[0].ypos -= superMoveY * BS / 30 - 1;
            enemies.forEach(e => e.ypos -= (superMoveY * BS + 1) / 30);
            setState({
                state: 'PLAY'
            })
        }
    } else if (superMoveY < 0) { // Glide UP
        player[0].ypos += (superMoveY * BS - 1) / 30;
        enemies.forEach(e => e.ypos += (superMoveY * BS - 1) / 30);
        startCorner.row -= superMoveY / 30;
        if (moveY >= 0) {
            startCorner.row = next.row;
            player[0].ypos -= superMoveY * BS / 30 - 1;
            enemies.forEach(e => e.ypos -= (superMoveY * BS - 2) / 30);
            setState({
                state: 'PLAY'
            })
        }
    } if (superMoveX < 0) { // Glide LEFT
        player[0].xpos += (superMoveX * BS - 1) / 30;
        enemies.forEach(e => e.xpos += (superMoveX * BS - 1) / 30);
        startCorner.col -= superMoveX / 30;
        if (moveX >= 0) {
            startCorner.col = next.col;
            player[0].xpos -= superMoveX * BS / 30 - 1;
            enemies.forEach(e => e.xpos -= (superMoveX * BS - 1) / 30);
            setState({
                state: 'PLAY'
            })
        }
    } else if (superMoveX > 0) { // Glide RIGHT
        player[0].xpos += (superMoveX * BS - 1) / 30;
        enemies.forEach(e => e.xpos += (superMoveX * BS - 1) / 30);
        startCorner.col -= superMoveX / 30;
        if (moveX <= 0) {
            startCorner.col = next.col;
            player[0].xpos -= superMoveX * BS / 30 - 1;
            enemies.forEach(e => e.xpos -= (superMoveX * BS - 1) / 30);
            setState({
                state: 'PLAY'
            })
        }
    }
}
