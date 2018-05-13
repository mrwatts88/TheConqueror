export const drawHealth = (p5, player) => {
    if (player.health === undefined) return;
    p5.fill('black');
    p5.rect(p5.width - 131, 4, 102, 8);
    p5.fill('red');
    p5.rect(p5.width - 130, 5, 100 * player.health / player.maxHealth, 6);
}