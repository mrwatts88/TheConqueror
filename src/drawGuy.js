export const drawGuy = (p5, player, images, frame) => {
    if (player.xpos === undefined) return;
    p5.fill(player.color);
    // p5.rect(player.xpos, player.ypos, player.width, player.height);
    let x = 32 * (Math.floor(player.step));
    let y;
    switch (player.direction) {
        case 'up':
            y = 96;
            break;
        case 'down':
            y = 0;
            break;
        case 'left':
            y = 32;
            break;
        case 'right':
            y = 64;
            break;
        default:
            x = 0;
            y = 0;
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