import * as p5 from './p5.js';
import regent from 'regent';
import rules from './rules.js';
import predicates from './predicates';
import { evaluate } from 'regent';

const {PLAYER_IS_BLOCKED} = rules;
const {overlaps} = predicates;

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
            xpos: p5.width / 2,
            ypos: p5.height / 4,
            width: 20,
            height: 20
        });
    }

    p5.draw = () => {
        p5.background(0);
        updateGuy(p5);
        drawGuy(p5);
        drawObstacle(p5);
    }
}

const P5 = new p5(sketch);  

const updateGuy = (p5) => {
    const PIB = PLAYER_IS_BLOCKED;

    if (p5.keyIsDown(p5.UP_ARROW)
        && allObjectsAreNotInWay(obstacles, (obstacleState) => {
            evaluate(PIB, { "playerState": {...playerState, ypos:playerState.ypos-5}, obstacleState },{ overlaps })
        })) 
        { 
            console.log("allObjectsAreNotInWay:"+allObjectsAreNotInWay(obstacles, (obstacleState) => {
                evaluate(PIB, { "playerState": {...playerState, ypos:playerState.ypos-5}, obstacleState },{ overlaps })
            }))
        
            console.log("Evaluate Player Is Blocked:"+evaluate(PIB, { "playerState": {...playerState, ypos:playerState.ypos-5}, 'obstacleState': obstacles[0] },{ overlaps }));
        
            playerState.ypos -= 5;
        }

        // THIS WORKS====>
        // !evaluate(PIB, { "playerState": {...playerState, ypos:playerState.ypos-5}, 'obstacleState': obstacles[0] },{ overlaps }))
        //     playerState.ypos -= 5;

        // anyPass(obstacles, (obstacleState)=>{
        // }))
    
    if (p5.keyIsDown(p5.DOWN_ARROW)
        && allObjectsAreNotInWay(obstacles, (obstacleState)=>{
           evaluate(PIB, { "playerState": {...playerState, ypos:playerState.ypos+5},  obstacleState },{ overlaps })
        }))
        playerState.ypos += 5;

    if (p5.keyIsDown(p5.LEFT_ARROW)
        && allObjectsAreNotInWay(obstacles, (obstacleState)=>{
           evaluate(PIB, { "playerState": {...playerState, xpos:playerState.xpos-5},  obstacleState },{ overlaps })
        }))
        playerState.xpos -= 5;

    if (p5.keyIsDown(p5.RIGHT_ARROW)
        && allObjectsAreNotInWay(obstacles, (obstacleState)=>{
           evaluate(PIB, { "playerState": {...playerState, xpos:playerState.xpos+5},  obstacleState },{ overlaps })
        }))
        playerState.xpos += 5;
}

const drawGuy = p5 => p5.rect(playerState.xpos, playerState.ypos, 20, 20); 
const drawObstacle = p5 => p5.rect(obstacles[0].xpos, obstacles[0].ypos, 20, 20);

const allObjectsAreNotInWay = (arr, fxn) => {
    for(let a of arr){
        if(fxn(a)) return false;   
    }
    return true;
}