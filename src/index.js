import * as p5 from './p5';
import { getTheMap } from './map'
import { drawMap } from './drawMap';
import { drawInventory } from './drawInventory';
import { drawGuy } from './drawGuy';
import { drawEnemies } from './drawEnemies';
import { drawHealth } from './drawHealth';
import { updateGuy } from './updateGuy';
import { updateEnemies } from './updateEnemies';
import { BS, SPEED } from './constants';

let player = {};
let enemies = [];
let map = [];

const sketch = p5 => {
    p5.setup = () => {
        p5.createCanvas(BS * 30, BS * 20);
        map = getTheMap();
        p5.strokeWeight(0);

        player = {
            inventory: [],
            xpos: p5.width / 2,
            ypos: p5.height / 2,
            width: BS,
            height: BS,
            maxHealth: 100,
            health: 100,
            color: 'white',
            type: 'player',
            speed: 1
        }

        enemies.push({
            inventory: [],
            xpos: BS * 12,
            ypos: BS * 10,
            width: BS,
            height: BS,
            color: 'blue',
            type: 'enemy',
            speed: 2
        }, {
                inventory: [],
                xpos: BS * 16,
                ypos: BS * 7,
                width: BS,
                height: BS,
                color: 'blue',
                type: 'enemy',
                speed: 2
            })
    }

    p5.draw = () => {
        p5.background(0);
        drawMap(p5, map);
        drawGuy(p5, player);
        updateGuy(p5, player, map);
        drawEnemies(p5, enemies);
        updateEnemies(p5, enemies, map);
        resolveHealth(player, enemies);
        drawHealth(p5, player);
        drawInventory(p5, player.inventory);
    }
}

const resolveHealth = (player, enemies) => {
    for (let enemy of enemies)
        if (player.health > 0 && Math.abs(player.ypos - enemy.ypos) < player.height / 2 + enemy.height / 2
            && Math.abs(player.xpos - enemy.xpos) < player.width / 2 + enemy.width / 2)
            --player.health;
}

const P5 = new p5(sketch);
