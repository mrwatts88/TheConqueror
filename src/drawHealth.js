export const drawHealth = (p5, player) => {
    p5.fill('black');
    p5.rect(16, 4, 102, 8);
    p5.fill('red');
    p5.rect(17, 5, 100 * player.health / player.maxHealth, 6);
}