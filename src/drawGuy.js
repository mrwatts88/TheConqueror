export const drawGuy = (p5, player, images) => {
    if (player.xpos === undefined) return;
    p5.fill(player.color);
    // p5.rect(player.xpos, player.ypos, player.width, player.height);

    // location of sprite within sprite sheet (images)
    let x = 32 * (Math.floor(player.step));
    let y = 0;

    switch (player.direction) {
        case 'down':
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
    }

    p5.image(
        images,
        player.xpos,
        player.ypos,
        player.width,
        player.height,
        x,
        y,
        32,
        32,
    )

    p5.fill('white');
}
