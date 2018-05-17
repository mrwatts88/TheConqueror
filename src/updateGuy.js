import { processGuy } from './processGuy';
import { BS, SPEED } from './constants';
import { getState, setState } from './globalState';

export const updateGuy = (p5, socket) => {
    if (p5.keyIsDown(p5.UP_ARROW)) {
        socket.emit('playermove', { id: '1', dir: 'up' });
    }

    if (p5.keyIsDown(p5.DOWN_ARROW)) {
        socket.emit('playermove', { id: '1', dir: 'down' });
    }

    if (p5.keyIsDown(p5.LEFT_ARROW)) {
        socket.emit('playermove', { id: '1', dir: 'left' });
    }

    if (p5.keyIsDown(p5.RIGHT_ARROW)) {
        socket.emit('playermove', { id: '1', dir: 'right' });
    }
}
