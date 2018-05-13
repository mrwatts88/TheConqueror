export const drawInventory = (p5, inventory) => {
    if (inventory == undefined) return;

    let baseX = p5.width - 120;
    let baseY = p5.height / 8;

    for (let i = 0; i < inventory.length; ++i) {
        let ob = inventory[i];
        let row = Math.floor(i / 4);
        let col = i % 4;
        let xPosition = baseX + col * (ob.width + 5);
        let yPosition = baseY + row * (ob.height + 5);
        p5.fill(ob.color);
        p5.rect(xPosition, yPosition, ob.width, ob.height);
    }
}