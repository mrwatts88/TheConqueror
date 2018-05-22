import { getState } from './globalState'

export const updateGuy = (p5, socket) => {
    const dir = { up: false, down: false, 'left ': false, right: false }
    if (p5.keyIsDown(p5.UP_ARROW)) dir.up = true
    if (p5.keyIsDown(p5.DOWN_ARROW)) dir.down = true
    if (p5.keyIsDown(p5.LEFT_ARROW)) dir.left = true
    if (p5.keyIsDown(p5.RIGHT_ARROW)) dir.right = true
    if (dir.left && dir.right) dir.left = dir.right = false
    if (dir.up && dir.down) dir.up = dir.down = false
    socket.emit('playermove', { id: getState().id, dir })
}
