export const drawGuy = (p5, player) => {
    if (player.xpos === undefined) return;
    p5.fill(player.color);
    p5.rect(player.xpos, player.ypos, player.width, player.height);
    p5.fill('white');
}