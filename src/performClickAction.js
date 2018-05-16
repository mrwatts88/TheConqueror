import { getState, setState } from './globalState';
import { BS } from './constants';

// Perform the correct action based on what was clicked
// Currently, only handles removing inventory (3 potions will add 25/100 health)
export const performClickAction = p5 => {
    let { player } = getState();
    let p = player[0];
    let baseX = p5.width - 150;
    let baseY = p5.height / 8;
    let xpos = p5.mouseX;
    let ypos = p5.mouseY;

    // We are in inventory area
    if (xpos >= baseX && ypos >= baseY && xpos <= baseX + 4 * (BS + 5) && ypos <= baseY + 4 * (BS + 5)) {
        let item = p.inventory.splice(getClickedInventoryIndex(xpos, ypos, baseX, baseY), 1);
        if (item[0].type === 'ii' || item[0].type === 'ij' || item[0].type === 'ik')
            p.health = Math.min(p.health + 25, 100);
    }
}

const getClickedInventoryIndex = (xpos, ypos, baseX, baseY) => {
    let xIndex = Math.floor((xpos - baseX) / (BS + 5));
    let yIndex = Math.floor((ypos - baseY) / (BS + 5));
    return yIndex * 4 + xIndex;
}
