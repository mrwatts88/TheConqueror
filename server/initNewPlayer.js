const getState = require('./globalState').getState;
const setState = require('./globalState').setState;

let BS = 32;
let WIDTH_UNITS = 30;
let HEIGHT_UNITS = 18;

exports.initNewPlayer = id => {
    let { map, players } = getState();
    let pRow = 0;
    let pCol = 0;

    for (let row = 0; row < map.length; ++row) {
        for (let col = 0; col < map[0].length; ++col) {
            // Draw player at initial position and add to the player array.
            if (map[row][col] === 'p') {
                // Position view so that player is in the center, but constrain to size of map.
                pRow = Math.min(map.length - HEIGHT_UNITS, Math.max(0, Math.floor(row - HEIGHT_UNITS / 2)));
                pCol = Math.min(map[0].length - WIDTH_UNITS, Math.max(0, Math.floor(col - WIDTH_UNITS / 2)));

                players[id] = {
                    inventory: [],
                    xpos: col * BS,
                    ypos: row * BS,
                    width: BS,
                    height: BS,
                    maxHealth: 100,
                    health: 100,
                    color: 'pink',
                    type: 'player',
                    speed: 1,
                    attack: 2,
                    direction: 'down',
                    step: 0,
                    startCorner: { row: pRow, col: pCol },
                    next: { row: pRow, col: pCol }
                }

                map[row][col] = '0';
            }
        }
    }
}
