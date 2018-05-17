const processGuy = require('./processGuy').processGuy;
const getState = require('./globalState').getState;
const setState = require('./globalState').setState;

const BS = 32;

exports.updateGuy = (id, dir, io) => {
    let { players, map } = getState();
    let p = players[id];

    if (dir === 'up') {
        p.direction = 'up';
        if (processGuy(Math.floor((p.ypos - p.speed) / BS), undefined, p, io))
            p.ypos -= p.speed;
        advanceStep(p);
    }

    if (dir === 'down') {
        p.direction = 'playerdown';
        if (processGuy(Math.floor((p.ypos + p.speed + BS - 1) / BS), undefined, p, io))
            p.ypos += p.speed;
        advanceStep(p);
    }

    if (dir === 'left') {
        p.direction = 'left';
        if (processGuy(undefined, Math.floor((p.xpos - p.speed) / BS), p, io))
            p.xpos -= p.speed;
        advanceStep(p);
    }

    if (dir === 'right') {
        p.direction = 'right';
        if (processGuy(undefined, Math.floor((p.xpos + p.speed + BS - 1) / BS), p, io))
            p.xpos += p.speed;
        advanceStep(p);
    }
}

const advanceStep = p => {
    p.step += 0.3;
    if (p.step > 4) p.step = 0;
}
