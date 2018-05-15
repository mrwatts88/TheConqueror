import { BS, itemMap } from './constants';

export const drawInventory = (p5, inventory, itemImage) => {
    if (inventory == undefined) return;

    let baseX = p5.width - 150;
    let baseY = p5.height / 8;

    for (let i = 0; i < inventory.length; ++i) {
        let ob = inventory[i];
        let row = Math.floor(i / 4);
        let col = i % 4;
        let xPosition = baseX + col * (BS + 5);
        let yPosition = baseY + row * (BS + 5);
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
