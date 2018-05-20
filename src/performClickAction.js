import { getState, setState } from './globalState';
import { BS, xScale, yScale } from './constants';

// Perform the correct action based on what was clicked
// Currently, only handles removing inventory (3 potions will add 25/100 health)
export const performClickAction = (p5, socket) => {
    let xpos = p5.mouseX;
    let ypos = p5.mouseY;
    let { players, id, state, width, height } = getState();

    if (state === 'PLAY') {
        let p = players[id];
        let baseX = p5.width - 150;
        let baseY = p5.height / 8;

        // We are in inventory area
        if (xpos >= baseX && ypos >= baseY && xpos <= baseX + 4 * (BS + 5) && ypos <= baseY + 4 * (BS + 5)) {
            let index = getClickedInventoryIndex(xpos, ypos, baseX, baseY);
            socket.emit('useitem', { id, index });  // TODO: give unique ids to each item
        }

    } else if (state === 'STARTMENU')
        for (const key in graphicsObjects) if (didClick(graphicsObjects[key], p5)) graphicsObjects[key].action();
}

const getClickedInventoryIndex = (xpos, ypos, baseX, baseY) => {
    let xIndex = Math.floor((xpos - baseX) / (BS + 5));
    let yIndex = Math.floor((ypos - baseY) / (BS + 5));
    return yIndex * 4 + xIndex;
}

const didClick = (graphicsObject, p5) => {
    let { mouseX, mouseY } = p5;
    let { left, right, top, bottom } = graphicsObject;
    return (mouseX > left(p5) && mouseY > top(p5) && mouseX < right(p5) && mouseY < bottom(p5));
}

const startGame = () => setState({ state: 'PLAY' })

const graphicsObjects = {
    startBtn: {
        left: p5 => xScale(p5) * 81,
        right: p5 => xScale(p5) * 156,
        top: p5 => yScale(p5) * 476,
        bottom: p5 => yScale(p5) * 512,
        action: () => startGame()

    }
}