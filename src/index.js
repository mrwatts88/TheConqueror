import * as p5 from './p5';
import { BS, SPEED, WIDTH_UNITS, HEIGHT_UNITS } from './constants';
import { drawEnemies } from './drawEnemies';
import { drawGuy } from './drawGuy';
import { drawHealth } from './drawHealth';
import { drawInventory } from './drawInventory';
import { drawMap } from './drawMap';
import { getTheMap } from './map'
import { updateEnemies } from './updateEnemies';
import { updateGuy } from './updateGuy';
import { updateHealth } from './updateHealth';

let player = [{}];
let enemies = [];
let map = [];
let startCorner = { row: 0, col: 0 };
let frame = 0;
let images;
let enemyImages;

const sketch = p5 => {
    p5.setup = () => {
        images = p5.loadImage("sprites.png");
        enemyImages = p5.loadImage("monsterSprites.png");
        p5.createCanvas(BS * WIDTH_UNITS, BS * HEIGHT_UNITS);
        map = getTheMap();
        p5.strokeWeight(0);
    }

    p5.draw = () => {
        p5.background(255);
        p5.strokeWeight(1);
        startCorner = drawMap(p5, map, startCorner, player, enemies);
        drawGuy(p5, player[0], images);
        drawEnemies(p5, enemies, enemyImages);
        drawSidebar(p5);
        drawHealth(p5, player[0]);
        drawInventory(p5, player[0].inventory);
        p5.noFill();
        p5.rect(0, 0, p5.width - 1, p5.height - 1);
        p5.fill('white');
        updateGuy(p5, player[0], map, startCorner, frame);
        updateEnemies(p5, enemies, map, startCorner, frame);
        updateHealth(player[0], enemies);
        frame++;
        frame = frame % 100;
    }
}

const drawSidebar = p5 => {
    p5.fill('grey');
    p5.rect(p5.width - 160, 0, 160, p5.height);
    p5.fill('white');
}

const P5 = new p5(sketch, 'grid');
