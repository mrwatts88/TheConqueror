import * as p5 from './p5';
import { BS, SPEED, WIDTH_UNITS, HEIGHT_UNITS } from './constants';
import { drawEnemies } from './drawEnemies';
import { drawGuy } from './drawGuy';
import { drawHealth } from './drawHealth';
import { drawInventory } from './drawInventory';
import { drawEntities } from './drawEntities';
import { getTheMap } from './map'
import { initView } from './initView';
import { shiftView } from './shiftView';
import { updateEnemies } from './updateEnemies';
import { updateGuy } from './updateGuy';
import { updateHealth } from './updateHealth';

let player = [{}];
let enemies = [];
let map = [];
let frame = 0;
let images, enemyImages, mapImage, startCorner;

const sketch = p5 => {
    p5.preload = () => {
        images = p5.loadImage("sprites.png");
        enemyImages = p5.loadImage("monsterSprites.png");
        mapImage = p5.loadImage("map.png");
    }

    p5.setup = () => {
        p5.createCanvas(BS * WIDTH_UNITS, BS * HEIGHT_UNITS);
        map = getTheMap();
        startCorner = initView(map, player);
    }

    p5.draw = () => {
        startCorner = shiftView(player, p5, startCorner, enemies, mapImage);
        drawEntities(p5, map, startCorner, enemies);
        drawGuy(p5, player[0], images);
        drawEnemies(p5, enemies, enemyImages);
        drawSidebar(p5);
        drawHealth(p5, player[0]);
        drawInventory(p5, player[0].inventory);
        drawBorder(p5);
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

const drawBorder = p5 => {
    p5.noFill();
    p5.rect(0, 0, p5.width - 1, p5.height - 1);
    p5.fill('white');
}

const P5 = new p5(sketch, 'grid');
