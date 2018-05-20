const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const constants = require('./constants');

const mapUtils = require('./map');
const getState = require('./globalState').getState;
const setState = require('./globalState').setState;
const updateEnemies = require('./updateEnemies');
const updateGuy = require('./updateGuy');
const initNewPlayer = require('./initNewPlayer');
const updateHealth = require('./updateHealth');

app.use(express.static(path.join(__dirname, '../dist')))

let map = mapUtils.getTheMap();
let { enemies } = getState();
const { BS } = constants;

for (let row = 0; row < map.length; ++row) {
    for (let col = 0; col < map[0].length; ++col) {
        // Draw initial monsters and add them to the enemies array
        if (map[row][col] === 'm') {
            enemies.push({
                inventory: [],
                xpos: col * BS,
                ypos: row * BS,
                width: BS,
                height: BS,
                maxHealth: 25,
                health: 25,
                color: 'purple',
                type: 'enemy',
                speed: 1,
                attack: 1,
                prevDirection: 'left',
                step: 0,
                spriteChoice: Math.floor(Math.random() * 7)
            });

            map[row][col] = '0';
        }
    }
}

setState({ map });

// Send updates to all connected clients
setInterval(() => {
    updateEnemies(io);
    updateHealth();
    let { enemies, players } = getState();
    io.emit('update', { enemies, players });
}, 20);

io.on('connection', socket => {
    initNewPlayer(socket.id);
    let { map, enemies, players } = getState();
    socket.emit('firstconnect', { map, enemies, players });

    socket.on('playermove', idAndDir => { updateGuy(idAndDir.id, idAndDir.dir, io); });

    socket.on('disconnect', (reason) => {
        let { players } = getState();
        delete players[socket.id];
    });

    socket.on('useitem', (idAndIndex) => {
        let { id, index } = idAndIndex;
        let { players } = getState();
        let p = players[id];
        let item = p.inventory.splice(index, 1)[0];
        if (item.type === 'ii' || item.type === 'ij' || item.type === 'ik') p.health = Math.min(p.health + 25, p.maxHealth);
    });

    socket.on('chatmsg', (idNameAndText) => {
        let { id, name, text } = idNameAndText;
        let { players } = getState();
        if (name !== '') players[id].name = name;
        io.emit('globalchatmsg', { id, name: players[id].name, text })
    });

    socket.on('chooseplayer', (idAndSpriteChoice) => {
        let { id, spriteChoice } = idAndSpriteChoice;
        let { players } = getState();
        players[id].spriteChoice = spriteChoice;
    });
});

const port = 8080;
server.listen(port, () => console.log(`Server listening on port ${port}`));
