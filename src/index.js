import * as p5 from './p5.js';
import { getTheMap } from './map.js'

const SPEED = 5;
const BLOCK_SIZE = 20;

let playerState = {};
let map = [];

const sketch = p5 => {
    p5.setup = () => {
        p5.createCanvas(600, 400);
        map = getTheMap();
        p5.strokeWeight(0);

        playerState = {
            inventory: [],
            xpos: p5.width / 2,
            ypos: p5.height / 2,
            width: BLOCK_SIZE,
            height: BLOCK_SIZE,
            color: 'white'
        }
    }

    p5.draw = () => {
        p5.background(0);
        drawMap(p5);
        updateGuy(p5);
        drawGuy(p5);
        drawInventory(p5);
    }
}

const drawMap = p5 => {
    for (let row = 0; row < map.length; ++row) {
        for (let col = 0; col < map[0].length; ++col) {
            if (map[row][col] === 'w') {
                p5.fill('red');
                p5.rect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                p5.fill('white');
            }

            if (map[row][col] === 'i') {
                p5.fill('green');
                p5.rect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                p5.fill('white');
            }
        }
    }
}

const updateGuy = p5 => {
    let { xpos, ypos } = playerState;
    let blockX = Math.floor(ypos / BLOCK_SIZE);
    let blockY = Math.floor(xpos / BLOCK_SIZE);

    if (p5.keyIsDown(p5.UP_ARROW)) {
        blockX = Math.floor((ypos - 1) / BLOCK_SIZE);
        if (map[blockX][blockY] === 'w') return;
        if (map[blockX][blockY] === 'i') pickUp(blockX, blockY);
        playerState.ypos -= SPEED;
    }

    if (p5.keyIsDown(p5.DOWN_ARROW)) {
        blockX = Math.floor((ypos + BLOCK_SIZE + 1) / BLOCK_SIZE);
        if (map[blockX][blockY] === 'w') return;
        if (map[blockX][blockY] === 'i') pickUp(blockX, blockY);
        playerState.ypos += SPEED;
    }

    if (p5.keyIsDown(p5.LEFT_ARROW)) {
        blockY = Math.floor((xpos - 1) / BLOCK_SIZE);
        if (map[blockX][blockY] === 'w') return;
        if (map[blockX][blockY] === 'i') pickUp(blockX, blockY);
        playerState.xpos -= SPEED;
    }

    if (p5.keyIsDown(p5.RIGHT_ARROW)) {
        blockY = Math.floor((xpos + BLOCK_SIZE + 1) / BLOCK_SIZE);
        if (map[blockX][blockY] === 'w') return;
        if (map[blockX][blockY] === 'i') pickUp(blockX, blockY);
        playerState.xpos += SPEED;
    }
}

const pickUp = (row, col) => {
    if (playerState.inventory.length >= 16) return;
    map[row][col] = '0';
    playerState.inventory.push({
        width: BLOCK_SIZE,
        height: BLOCK_SIZE,
        color: 'purple'
    });
}

const drawGuy = p5 => p5.rect(playerState.xpos, playerState.ypos, playerState.width, playerState.height)

const drawInventory = p5 => {
    let baseX = p5.width - p5.width / 6;
    let baseY = p5.height / 8;

    for (let i = 0; i < playerState.inventory.length; ++i) {
        let ob = playerState.inventory[i];
        let row = Math.floor(i / 4);
        let col = i % 4;
        let xPosition = baseX + col * (ob.width + 5);
        let yPosition = baseY + row * (ob.height + 5);
        p5.fill(ob.color);
        p5.rect(xPosition, yPosition, ob.width, ob.height);
    }
}

const P5 = new p5(sketch);
