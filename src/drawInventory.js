import { BS } from './constants';

export const drawInventory = (p5, inventory, itemImage) => {
    if (inventory == undefined) return;

    let baseX = p5.width - 120;
    let baseY = p5.height / 8;

    for (let i = 0; i < inventory.length; ++i) {
        let ob = inventory[i];
        let row = Math.floor(i / 4);
        let col = i % 4;
        let xPosition = baseX + col * (ob.width + 5);
        let yPosition = baseY + row * (ob.height + 5);
        // p5.fill(ob.color);
        // p5.rect(xPosition, yPosition, ob.width, ob.height);

        let x = itemMap[ob.type].x;
        let y = itemMap[ob.type].y;

        p5.image(
            itemImage,
            xPosition,
            yPosition,
            BS,
            BS,
            x * BS,
            y * BS,
            BS,
            BS,
        )
    }

    // p5.fill(255);
}

const itemMap = {
    'ia': { x: 0, y: 0 },
    'ib': { x: 1, y: 0 },
    'ic': { x: 2, y: 0 },
    'id': { x: 3, y: 0 },
    'ie': { x: 4, y: 0 },
    'if': { x: 5, y: 0 },
    'ig': { x: 6, y: 0 },
    'ih': { x: 7, y: 0 },
    'ii': { x: 8, y: 0 },
    'ij': { x: 9, y: 0 },
    'ik': { x: 10, y: 0 },
    'il': { x: 11, y: 0 },
    'im': { x: 0, y: 1 },
    'in': { x: 1, y: 1 },
    'io': { x: 2, y: 1 },
    'ip': { x: 3, y: 1 },
    'iq': { x: 4, y: 1 },
    'ir': { x: 5, y: 1 },
    'is': { x: 6, y: 1 },
    'it': { x: 7, y: 1 },
    'iu': { x: 8, y: 1 },
    'iv': { x: 9, y: 1 },
    'iw': { x: 10, y: 1 },
    'ix': { x: 11, y: 1 },
    'iy': { x: 0, y: 2 },
    'iz': { x: 1, y: 2 }
}