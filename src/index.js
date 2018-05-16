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
import { performClickAction } from './performClickAction';

let player = [{}];
let enemies = [];
let map = [];
let frame = 0;
let images, enemyImages, mapImage, itemImage, startCorner, next;
let state = 'PLAY';
let glideCount = 0;

const sketch = p5 => {
    p5.preload = () => {
        images = p5.loadImage("sprites.png");
        enemyImages = p5.loadImage("monsterSprites.png");
        mapImage = p5.loadImage("map.png");
        itemImage = p5.loadImage("items.png");
    }

    p5.setup = () => {
        const can = p5.createCanvas(BS * WIDTH_UNITS, BS * HEIGHT_UNITS);
        map = getTheMap();
        startCorner = initView(map, player);

        can.mousePressed(() => {
            performClickAction(p5, p5.mouseX, p5.mouseY, player[0]);
        })
    }
    let superMove;

    p5.draw = () => {
        p5.background(255);
        if (state === 'PLAY') {
            next = shiftView(player, p5, startCorner, enemies, mapImage, map);
            if (startCorner.col === next.col && startCorner.row === next.row) {
                drawBackground(p5, startCorner, mapImage);
                drawEntities(p5, map, startCorner, enemies, itemImage);
                drawGuy(p5, player[0], images);
                drawEnemies(p5, enemies, enemyImages);
                drawSidebar(p5);
                drawHealth(p5, player[0]);
                drawInventory(p5, player[0].inventory, itemImage);
                drawBorder(p5);
                updateGuy(p5, player[0], map, startCorner, frame);
                updateEnemies(p5, enemies, map, startCorner, frame);
                updateHealth(player[0], enemies);
                frame++;
                frame = frame % 100;
            } else {
                superMove = startCorner.row - next.row;
                state = 'GLIDE';
            }
        } else if (state === 'GLIDE') {
            let move = startCorner.row - next.row;

            //
            drawBackground(p5, startCorner, mapImage);
            //

            player[0].ypos += (superMove * BS - 1) / 30;
            enemies.forEach(e => e.ypos += (superMove * BS - 1) / 30);

            //
            drawGuy(p5, player[0], images);
            //


            startCorner.row -= (HEIGHT_UNITS - 5) / 30;

            if (move <= 0) {
                startCorner.row = next.row;
                player[0].ypos -= (superMove * BS - 1) / 30;
                enemies.forEach(e => e.ypos -= (superMove * BS - 1) / 30);
                state = 'PLAY';
            }
        }
    }
}
const drawBackground = (p5, startCorner, mapImage) => {
    p5.image(mapImage, 0, 0, p5.width, p5.height, 32 + startCorner.col * BS,
        32 + startCorner.row * BS, p5.width, p5.height);
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
