export const drawEnemies = (p5, enemies, images) => enemies.forEach(ob => {
    p5.fill(ob.color);
    // p5.rect(ob.xpos, ob.ypos, ob.width, ob.height);
    let x = 6 * 32 + 32 * (Math.floor(ob.step));
    let y = 4 * 32;
    switch (ob.prevDirection) {
        case 'down':
            y += 0;
            break;
        case 'left':
            y += 32;
            break;
        case 'right':
            y += 64;
            break;
        case 'up':
            y += 96;
            break;
        default:
            y += 0;
            break;
    }

    p5.image(
        images,
        ob.xpos,
        ob.ypos,
        ob.width,
        ob.height,
        x,
        y,
        32,
        32,
    )

    p5.fill('white');
})
