import * as p5 from './p5';
import { BS, WIDTH_UNITS, HEIGHT_UNITS } from './constants';
import { drawEnemies } from './drawEnemies';
import { drawGuy } from './drawGuy';
import { drawHealth } from './drawHealth';
import { drawInventory } from './drawInventory';
import { drawVisibleItems } from './drawVisibleItems';
import { shiftView } from './shiftView';
import { updateGuy } from './updateGuy';
import { performClickAction } from './performClickAction';
import { getState, setState } from './globalState';
import { drawLayout } from './drawLayout';
import { glide } from './glide';
import { defer } from './utils'

// When the client is first served the page, it will connect to the websocket server
// The server will then send the map to the client
// When the map arrives, the sketch will start looping
let firstMapPromise = defer();
firstMapPromise.then(data => {
    let { map, enemies, players } = data;
    let startCorner = players['1'].startCorner;
    let next = players['1'].next;
    setState({ map, enemies, players, startCorner, next });
    const P5 = new p5(sketch, 'grid');
})

const socket = io.connect('http://localhost:8080');

// Get map and enemies from server
socket.on('firstconnect', data => { firstMapPromise.resolve(data); })

// Get enemies and players from server
socket.on('update', newData => { setState({ ...newData }); })

// Get map from server
socket.on('mapupdate', map => { setState(map); })

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
        can.mousePressed(() => { performClickAction(p5); })
    }

    p5.draw = () => {
        let gameState = getState().state;
        if (gameState === 'PLAY') {
            shiftView(p5);
            let { players, startCorner, next } = getState();
            if (startCorner.col === next.col && startCorner.row === next.row) {
                p5.background(255);
                drawBackground(p5);
                drawVisibleItems(p5);
                drawGuy(p5);
                drawEnemies(p5);
                drawLayout(p5);
                drawHealth(p5);
                drawInventory(p5);
                updateGuy(p5, socket);
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
            drawInventory(p5);
            drawVisibleItems(p5);
            drawGuy(p5);
            drawEnemies(p5);
        }
    }
}

const drawBackground = p5 => {
    let { mapImage, players, startCorner } = getState();
    p5.image(mapImage, 0, 0, p5.width, p5.height, 32 + startCorner.col * BS,
        32 + startCorner.row * BS, p5.width, p5.height);
}
