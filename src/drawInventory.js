import { getState, setState } from './globalState';
import { BS, itemMap } from './constants';

export const drawInventory = p5 => {
    let { players, id, itemImage, env } = getState();
    let inventory = players[id].inventory;
    let baseX = p5.width - 150;
    let baseY = p5.height / 8;

    for (let i = 0; i < inventory.length; ++i) {
        // Find pixel location to draw each item
        let obj = inventory[i];
        let row = Math.floor(i / 4);
        let col = i % 4;
        let xPosition = baseX + col * (BS + 5);
        let yPosition = baseY + row * (BS + 5);

        if (env === 'DEBUG') {
            p5.fill(obj.color);
            p5.rect(xPosition, yPosition, obj.width, obj.height);
            p5.fill(255);
        } else if (env === 'PRODUCTION') {
            // 2D indices of object in sprite sheet
            let x = itemMap[obj.type].x;
            let y = itemMap[obj.type].y;

            p5.image(
                itemImage, xPosition, yPosition,
                BS, BS, x * BS, y * BS, BS, BS,
            )
        }
    }
}
