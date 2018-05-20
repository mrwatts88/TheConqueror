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
import { defer, xScale, yScale } from './utils';

let P5;
let ro;
let width = 900;
let height = 590;

const canvasDiv = document.querySelector('#grid');
const chatUl = document.querySelector('#chat-ul');
const chatSendBtn = document.querySelector('#chat-send-btn');
const chatTextArea = document.querySelector('#chat-text-area');
const chatChatBox = document.querySelector('#chat-chat-box');
const nameText = document.querySelector('#name-text');
const chatBox = document.querySelector('#chat-box');
const slideTab = document.querySelector('#slide-tab');

// Handle chat box slide transition
slideTab.addEventListener('click', () => {
    if (chatBox.style.right === '0px' || chatBox.style.right === '')
        chatBox.style.right = '-300px';
    else chatBox.style.right = '0px';
})

// Handle chat box messages (Send to server)
chatSendBtn.addEventListener('click', e => {
    let { players, id } = getState();
    let text = chatTextArea.value;
    chatTextArea.value = "";
    socket.emit('chatmsg', {
        id,
        name: nameText.value,
        text
    });
})

const socket = io.connect('http://localhost:8080');
// const socket = io.connect('http://184.58.143.70:8080');

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
            P5.resizeCanvas(width, height);
        }
    });

    ro.observe(canvasDiv);
})

// Chat box will always scroll to the bottom when new content is added
var scrollOb = new MutationObserver(() => {
    chatChatBox.scrollTop = chatChatBox.scrollHeight;
});
var config = { childList: true };
scrollOb.observe(chatUl, config);

// Socket listeners
socket.on('firstconnect', data => { firstMapPromise.resolve(data); })  // Get map and enemies from server
socket.on('update', newData => { setState({ ...newData }); }) // Get enemies and players from server
socket.on('mapupdate', map => { setState(map); }) // Get map from server

// message from chat
socket.on('globalchatmsg', idNameAndText => {
    // <ul id="chat-ul">
    //     <li>
    //         <b>Matt: </b> How's everyone doing?
    //     </li>
    // </ul>

    let { players } = getState();
    let { id, name, text } = idNameAndText;
    let nameNode = document.createElement("B");
    nameNode.style.color = players[id].chatColor;
    let nameTextNode = document.createTextNode(`${name}: `);
    nameNode.appendChild(nameTextNode);
    let msgNode = document.createElement("LI");
    msgNode.appendChild(nameNode);
    let msgTextNode = document.createTextNode(text);
    msgNode.appendChild(msgTextNode);
    chatUl.appendChild(msgNode);
});

const sketch = p5 => {
    p5.preload = () => {
        setState({
            images: p5.loadImage("sprites1.png"),
            enemyImages: p5.loadImage("monsterSprites.png"),
            mapImage: p5.loadImage("map.png"),
            itemImage: p5.loadImage("items.png"),
            startMenuImage: p5.loadImage("startMenu.png")
        })
    }

    p5.setup = () => {
        const can = p5.createCanvas(width, height);
        can.mousePressed(() => { performClickAction(p5, socket); })
        p5.textAlign(p5.CENTER, p5.CENTER);
        let { graphicsObjects, players, id } = getState();
        let p = players[id];

        for (let i = 0; i < 7; ++i) {
            graphicsObjects.chars.push({
                left: p5 => xScale(p5) * (2 + i) * BS,
                right: p5 => xScale(p5) * (3 + i) * BS,
                top: p5 => yScale(p5) * 5 * BS,
                bottom: p5 => yScale(p5) * 6 * BS,
                action: () => {
                    socket.emit('chooseplayer', { id, spriteChoice: i });
                }
            });
        }
    }

    p5.draw = () => {
        let { startMenuImage, state, images, graphicsObjects } = getState();
        if (state === 'STARTMENU') {
            p5.background('#442151');
            p5.image(startMenuImage, 0, 0, p5.width, p5.height);

            for (let i = 0; i < graphicsObjects.chars.length; ++i) {
                let x = (i % 4) * 32 * 3;
                let y = Math.floor(i / 4) * 32 * 4;
                let char = graphicsObjects.chars[i];
                p5.image(images,
                    char.left(p5),
                    char.top(p5),
                    char.right(p5) - char.left(p5),
                    char.bottom(p5) - char.top(p5),
                    x, y, 32, 32
                );
            }
        } else if (state === 'MENU') {
            drawBackground(p5);
        } else if (state === 'PLAY') {
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
        } else if (state === 'GLIDE') {
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
    let { mapImage, startCorner } = getState();

    p5.image(mapImage, 0, 0, p5.width, p5.height, 32 + startCorner.col * BS,
        32 + startCorner.row * BS, p5.width, p5.height);
}
