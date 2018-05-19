import { getState, setState } from './globalState';
import { BS } from './constants';

// Perform the correct action based on what was clicked
// Currently, only handles removing inventory (3 potions will add 25/100 health)
export const performClickAction = (p5, socket) => {
    let { players, id } = getState();
    let p = players[id];
    let baseX = p5.width - 150;
    let baseY = p5.height / 8;
    let xpos = p5.mouseX;
    let ypos = p5.mouseY;

    // We are in inventory area
    if (xpos >= baseX && ypos >= baseY && xpos <= baseX + 4 * (BS + 5) && ypos <= baseY + 4 * (BS + 5)) {
        // let index = getClickedInventoryIndex(xpos, ypos, baseX, baseY);
        // // let item = p.inventory.splice(index, 1);
        // let item = p.inventory[index];

        socket.emit('useitem', { id, index });  // TODO: give unique ids to each item

        // if (item.type === 'ii' || item.type === 'ij' || item.type === 'ik'){

        //     p.health = Math.min(p.health + 25, 100);

        // }
    }
}

const getClickedInventoryIndex = (xpos, ypos, baseX, baseY) => {
    let xIndex = Math.floor((xpos - baseX) / (BS + 5));
    let yIndex = Math.floor((ypos - baseY) / (BS + 5));
    return yIndex * 4 + xIndex;
}
