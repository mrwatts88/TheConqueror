export const drawEnemies = (p5, enemies) => enemies.forEach(ob => {
    p5.fill(ob.color);
    p5.rect(ob.xpos, ob.ypos, ob.width, ob.height);
    p5.fill('white');
})