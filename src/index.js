import * as p5 from './p5';
import { getTheMap } from './map'
import { drawMap } from './drawMap';
import { drawInventory } from './drawInventory';
import { drawGuy } from './drawGuy';
import { drawEnemies } from './drawEnemies';
import { drawHealth } from './drawHealth';
import { updateGuy } from './updateGuy';
import { updateEnemies } from './updateEnemies';
import { BS, SPEED, WIDTH_UNITS, HEIGHT_UNITS } from './constants';
import { resolveHealth } from './resolveHealth';

let player = [{}];
let enemies = [];
let map = [];
let startCorner = { row: 0, col: 0 };
let frame = 0;

const sketch = p5 => {
    p5.setup = () => {
        p5.createCanvas(BS * WIDTH_UNITS, BS * HEIGHT_UNITS);
        map = getTheMap();
        p5.strokeWeight(0);
    }

    p5.draw = () => {
        p5.background(0);
        startCorner = drawMap(p5, map, startCorner, player, enemies);
        drawGuy(p5, player[0]);
        drawEnemies(p5, enemies);
        p5.fill('grey');
        p5.rect(p5.width - 160, 0, 160, p5.height);
        p5.fill('white');
        drawHealth(p5, player[0]);
        drawInventory(p5, player[0].inventory);
        updateGuy(p5, player[0], map, startCorner, frame);
        updateEnemies(p5, enemies, map, startCorner, frame);
        resolveHealth(player[0], enemies);
        ++frame;
        frame = frame % 100;
    }
}

const P5 = new p5(sketch);
