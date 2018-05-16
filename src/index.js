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
let images, enemyImages, mapImage, itemImage, startCorner, next, superMoveY, superMoveX;
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
                superMoveY = startCorner.row - next.row;
                superMoveX = startCorner.col - next.col;
                state = 'GLIDE';
            }
        } else if (state === 'GLIDE') {
            glide(superMoveY, superMoveX);
            drawBackground(p5, startCorner, mapImage);
            drawGuy(p5, player[0], images);
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

const glide = (superMoveY, superMoveX) => {
    let moveY = startCorner.row - next.row;
    let moveX = startCorner.col - next.col;
    // Glide DOWN
    if (superMoveY > 0) {
        player[0].ypos += (superMoveY * BS - 1) / 30;
        enemies.forEach(e => e.ypos += (superMoveY * BS - 1) / 30);
        startCorner.row -= superMoveY / 30;
        if (moveY <= 0) {
            startCorner.row = next.row;
            player[0].ypos -= superMoveY * BS / 30 - 1;
            enemies.forEach(e => e.ypos -= (superMoveY * BS + 1) / 30);
            state = 'PLAY';
        }
    }
    else if (superMoveY < 0) { // Gilde UP
        player[0].ypos += (superMoveY * BS - 1) / 30;
        enemies.forEach(e => e.ypos += (superMoveY * BS - 1) / 30);
        startCorner.row -= superMoveY / 30;
        if (moveY >= 0) {
            startCorner.row = next.row;
            player[0].ypos -= superMoveY * BS / 30 - 1;
            enemies.forEach(e => e.ypos -= (superMoveY * BS - 2) / 30);
            state = 'PLAY';
        }
    }
    // Gilde LEFT
    if (superMoveX < 0) {
        player[0].xpos += (superMoveX * BS - 1) / 30;
        enemies.forEach(e => e.xpos += (superMoveX * BS - 1) / 30);
        startCorner.col -= superMoveX / 30;
        if (moveX >= 0) {
            startCorner.col = next.col;
            player[0].xpos -= superMoveX * BS / 30 - 1;
            enemies.forEach(e => e.xpos -= (superMoveX * BS - 1) / 30);
            state = 'PLAY';
        }
    }
    else if (superMoveX > 0) { // Gilde RIGHT
        player[0].xpos += (superMoveX * BS - 1) / 30;
        enemies.forEach(e => e.xpos += (superMoveX * BS - 1) / 30);
        startCorner.col -= superMoveX / 30;
        if (moveX <= 0) {
            startCorner.col = next.col;
            player[0].xpos -= superMoveX * BS / 30 - 1;
            enemies.forEach(e => e.xpos -= (superMoveX * BS - 1) / 30);
            state = 'PLAY';
        }
    }
}

