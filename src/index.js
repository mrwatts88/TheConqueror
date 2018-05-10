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
import { SSL_OP_LEGACY_SERVER_CONNECT } from 'constants';

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
            speed: 1,
            attack: 2
        }

        enemies.push({
            inventory: [],
            xpos: BS * 12,
            ypos: BS * 10,
            width: BS,
            height: BS,
            maxHealth: 25,
            health: 25,
            color: 'blue',
            type: 'enemy',
            speed: 2,
            attack: 1
        })

        enemies.push({
            inventory: [],
            xpos: BS * 5,
            ypos: BS * 10,
            width: BS,
            height: BS,
            maxHealth: 25,
            health: 25,
            color: 'blue',
            type: 'enemy',
            speed: 2,
            attack: 1
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
    for (let i = enemies.length -1 ; i >= 0; --i)
        if (player.health > 0 && Math.abs(player.ypos - enemies[i].ypos) < player.height / 2 + enemies[i].height / 2
            && Math.abs(player.xpos - enemies[i].xpos) < player.width / 2 + enemies[i].width / 2){
                --enemies[i].health;
                if (enemies[i].health <=0)
                    enemies.splice(i,1);
                --player.health;
                if (player.health <=0)
                    player.health = player.maxHealth;
            }
}
const P5 = new p5(sketch);
