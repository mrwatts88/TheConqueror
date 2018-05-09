import * as p5 from './p5.js';
import regent from 'regent';
import rules from './rules.js';
import predicates from './predicates';
import { evaluate } from 'regent';

const SPEED = 5;
const { PLAYER_IS_BLOCKED } = rules;
const { overlaps } = predicates;

let playerState = {};
let obstacles = [];

const sketch = p5 => {
    window.p5 = p5;
    p5.setup = () => {
        p5.createCanvas(600, 400);
        p5.rectMode(p5.CENTER);

        playerState = {
            xpos: p5.width / 2,
            ypos: p5.height / 2,
            width: 20,
            height: 20
        }

        obstacles.push({
            xpos: p5.width / 3,
            ypos: p5.height / 2,
            width: 20,
            height: 20
        });

        obstacles.push({
            xpos: p5.width / 4,
            ypos: p5.height / 2,
            width: 20,
            height: 20
        });
    }

    p5.draw = () => {
        p5.background(0);
        updateGuy(p5);
        drawGuy(p5);
        drawObstacles(p5);
    }
}

const updateGuy = (p5) => {
    const PIB = PLAYER_IS_BLOCKED;
    let { xpos, ypos } = playerState;

    if (p5.keyIsDown(p5.UP_ARROW) && allFail(obstacles, obstacleState => evaluate(
        PIB, { "playerState": { ...playerState, ypos: ypos - SPEED }, obstacleState }, { overlaps }))
    ) playerState.ypos -= SPEED;

    if (p5.keyIsDown(p5.DOWN_ARROW) && allFail(obstacles, obstacleState => evaluate(
        PIB, { "playerState": { ...playerState, ypos: ypos + SPEED }, obstacleState }, { overlaps }))
    ) playerState.ypos += SPEED;

    if (p5.keyIsDown(p5.LEFT_ARROW) && allFail(obstacles, obstacleState => evaluate(
        PIB, { "playerState": { ...playerState, xpos: xpos - SPEED }, obstacleState }, { overlaps }))
    ) playerState.xpos -= SPEED;

    if (p5.keyIsDown(p5.RIGHT_ARROW) && allFail(obstacles, obstacleState => evaluate(
        PIB, { "playerState": { ...playerState, xpos: xpos + SPEED }, obstacleState }, { overlaps })
    )) playerState.xpos += SPEED;
}

const drawGuy = p5 => p5.rect(playerState.xpos, playerState.ypos, 20, 20);
const drawObstacles = p5 => obstacles.map(ob => p5.rect(ob.xpos, ob.ypos, 20, 20));

const allFail = (arr, fxn) => {
    for (let a of arr) if (fxn(a)) return false;
    return true;
}

const P5 = new p5(sketch);
