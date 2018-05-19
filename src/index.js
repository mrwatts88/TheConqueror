import * as p5 from './p5';
import { BS, WIDTH_UNITS, HEIGHT_UNITS } from './constants';
import { drawEnemies } from './drawEnemies';
import { drawPlayers } from './drawPlayers';
import { drawHealth } from './drawHealth';
import { drawInventory } from './drawInventory';
import { drawVisibleItems } from './drawVisibleItems';
import { shiftView } from './shiftView';
import { updateGuy } from './updateGuy';
import { performClickAction } from './performClickAction';
import { getState, setState } from './globalState';
import { drawLayout } from './drawLayout';
import { glide } from './glide';
import { defer } from './utils';

let P5;
let ro;
let width = 960;
let height = 576;

const canvasDiv = document.querySelector('#grid');
const socket = io.connect('http://192.168.86.200:8080');

// When the client is first served the page, it will connect to the websocket server
// The server will then send the map to the client
// When the map arrives, the sketch will start looping
let firstMapPromise = defer();
firstMapPromise.then(data => {
    let { map, enemies, players } = data;
    let id = socket.id;
    let startCorner = players[id].startCorner;
    let next = players[id].next;
    setState({ map, enemies, players, startCorner, next, id });
    P5 = new p5(sketch, 'grid');

    // Observer to catch canvas resize
    ro = new ResizeObserver(entries => {
        for (let entry of entries) {
            const cr = entry.contentRect;
            width = cr.width;
            height = cr.height;
            P5.resizeCanvas(width, height - 4);
        }
    });

    ro.observe(canvasDiv);
})

socket.on('firstconnect', data => { firstMapPromise.resolve(data); })  // Get map and enemies from server
socket.on('update', newData => { setState({ ...newData }); }) // Get enemies and players from server
socket.on('mapupdate', map => { setState(map); }) // Get map from server

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
        const can = p5.createCanvas(width, height - 4);
        can.mousePressed(() => { performClickAction(p5, socket); })
    }

    p5.draw = () => {
        let gameState = getState().state;
        if (gameState === 'PLAY') {
            shiftView(width, height);
            let { players, startCorner, next } = getState();
            if (startCorner.col === next.col && startCorner.row === next.row) {
                drawBackground(p5);
                drawVisibleItems(p5, width, height);
                drawPlayers(p5);
                drawEnemies(p5);
                drawLayout(p5);
                drawInventory(p5);
                drawHealth(p5);
                updateGuy(p5, socket);
            } else {
                setState({
                    superMoveY: startCorner.row - next.row,
                    superMoveX: startCorner.col - next.col,
                    state: 'GLIDE'
                });
            }
        } else if (gameState === 'GLIDE') {
            drawBackground(p5);
            glide();
            drawVisibleItems(p5, width, height);
            drawPlayers(p5);
            drawEnemies(p5);
            drawLayout(p5);
            drawInventory(p5);
            drawHealth(p5);
            updateGuy(p5, socket);
        }
    }
}

const drawBackground = p5 => {
    let { mapImage, players, startCorner } = getState();
    p5.image(mapImage, 0, 0, p5.width, p5.height, 32 + startCorner.col * BS,
        32 + startCorner.row * BS, p5.width, p5.height);
}
