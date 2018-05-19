import { getState } from './globalState';

export const updateGuy = (p5, socket) => {
    let { id } = getState();
    let dir = { 'up': false, 'down': false, 'left ': false, 'right': false }

    if (p5.keyIsDown(p5.UP_ARROW)) dir.up = true;
    if (p5.keyIsDown(p5.DOWN_ARROW)) dir.down = true;
    if (p5.keyIsDown(p5.LEFT_ARROW)) dir.left = true;
    if (p5.keyIsDown(p5.RIGHT_ARROW)) dir.right = true;

    if (dir.left === true && dir.right === true) {
        dir.left = false;
        dir.right = false;
    }

    if (dir.up === true && dir.down === true) {
        dir.up = false;
        dir.down = false;
    }

    socket.emit('playermove', { id, dir });
}
