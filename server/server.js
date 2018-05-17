const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const getTheMap = require('./map').getTheMap;
const getState = require('./globalState').getState;
const setState = require('./globalState').setState;
const updateEnemies = require('./updateEnemies').updateEnemies;

app.use(express.static(path.join(__dirname, '../dist')))

let map = getTheMap();
let { enemies } = getState();
const BS = 32;

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
                step: 0
            });

            map[row][col] = '0';
        }
    }
}

setState({ map });

// Send updates to all connected clients
setInterval(() => {
    updateEnemies(io);
    io.emit('enemyupdate', { enemies: getState().enemies });
}, 30);

io.on('connection', socket => { socket.emit('firstconnect', { map, enemies }); });

server.listen(8080);
