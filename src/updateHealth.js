export const updateHealth = (player, enemies) => {
    if (player.health === undefined) return;
    for (let i = enemies.length - 1; i >= 0; --i)
        if (player.health > 0 && Math.abs(player.ypos - enemies[i].ypos) < player.height / 2 + enemies[i].height / 2
            && Math.abs(player.xpos - enemies[i].xpos) < player.width / 2 + enemies[i].width / 2) {
            --enemies[i].health;
            if (enemies[i].health <= 0)
                enemies.splice(i, 1);
            --player.health;
            if (player.health <= 0)
                player.health = player.maxHealth;
        }
}
