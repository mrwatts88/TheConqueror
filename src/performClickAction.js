import { BS } from './constants';

// Perform the correct action based on what was clicked
// Currently, only handles removing inventory
export const performClickAction = (p5, xpos, ypos, player) => {

    let baseX = p5.width - 150;
    let baseY = p5.height / 8;

    if (xpos >= baseX && ypos >= baseY
        && xpos <= baseX + 4 * (BS + 5)
        && ypos <= baseY + 4 * (BS + 5)) {
        let item = player.inventory.splice(getClickedInventoryIndex(xpos, ypos, baseX, baseY), 1);
        if (item[0].type === 'ii' || item[0] === 'ij' || item[0] === 'ik') {
            player.health += 50;
            if (player.health > player.maxHealth) player.health = player.maxHealth;
        }
    }
}

const getClickedInventoryIndex = (xpos, ypos, baseX, baseY) => {
    let xIndex = Math.floor((xpos - baseX) / (BS + 5));
    let yIndex = Math.floor((ypos - baseY) / (BS + 5));

    return yIndex * 4 + xIndex;
}