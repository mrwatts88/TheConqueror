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
import { getState, setState } from './globalState';
import { drawLayout } from './drawLayout';
import { glide } from './glide';

const sketch = p5 => {
    p5.preload = () => {
        setState({
            images: p5.loadImage("sprites.png"),
            enemyImages: p5.loadImage("monsterSprites.png"),
            mapImage: p5.loadImage("map.png"),
            itemImage: p5.loadImage("items.png"),
        })
    }

    p5.setup = () => {
        const can = p5.createCanvas(BS * WIDTH_UNITS, BS * HEIGHT_UNITS);
        getTheMap();
        initView();
        can.mousePressed(() => { performClickAction(p5); })
    }

    p5.draw = () => {
        let gameState = getState().state;
        if (gameState === 'PLAY') {
            shiftView(p5);
            let { startCorner, next } = getState();
            if (startCorner.col === next.col && startCorner.row === next.row) {
                p5.background(255);
                drawBackground(p5);
                drawEntities(p5);
                drawGuy(p5);
                drawEnemies(p5);
                drawLayout(p5);
                drawHealth(p5);
                drawInventory(p5);
                updateGuy(p5);
                updateEnemies(p5);
                updateHealth();
            } else {
                setState({
                    superMoveY: startCorner.row - next.row,
                    superMoveX: startCorner.col - next.col,
                    state: 'GLIDE'
                });
            }
        } else if (gameState === 'GLIDE') {
            glide();
            drawBackground(p5);
            drawLayout(p5);
            drawHealth(p5);
            drawEntities(p5);
            drawGuy(p5);
            drawEnemies(p5);
        }
    }
}

const drawBackground = p5 => {
    let { mapImage, startCorner } = getState();
    p5.image(mapImage, 0, 0, p5.width, p5.height, 32 + startCorner.col * BS,
        32 + startCorner.row * BS, p5.width, p5.height);
}

const P5 = new p5(sketch, 'grid');
