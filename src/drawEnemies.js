export const drawEnemies = (p5, enemies) =>
    enemies.map(ob => {
        p5.fill(ob.color);
        p5.rect(ob.xpos, ob.ypos, ob.width, ob.height);
    })