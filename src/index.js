import * as p5 from './p5.js';
import regent from 'regent';
import rules from './rules.js';
import predicates from './predicates';
import { evaluate } from 'regent';
import { loadItems, loadObstacles} from './map.js'

const SPEED = 5;
const { PLAYER_IS_BLOCKED, PLAYER_CAN_PICK_UP } = rules;
const { overlaps } = predicates;

let playerState = {};

let items = [];
let obstacles = [];

const sketch = p5 => {
    window.p5 = p5;
    p5.setup = () => {
        p5.createCanvas(600, 400);
        p5.rectMode(p5.CENTER);

        items = loadItems(p5);
        obstacles = loadObstacles(p5);

        playerState = {
            inventory : [],
            xpos: p5.width / 2,
            ypos: p5.height / 2,
            width: 20,
            height: 20,
            color : 'white'
        }
    }

    p5.draw = () => {
        p5.background(0);
        p5.strokeWeight(1);
        p5.fill('white');
        updateGuy(p5);
        drawGuy(p5);
        p5.strokeWeight(0);
        drawItems(p5);
        drawObstacles(p5);
        drawInventory(p5);
        pickUp();
    }
}

const updateGuy = p5 => {
    const PIB = PLAYER_IS_BLOCKED;
    let { xpos, ypos } = playerState;

    if (p5.keyIsDown(p5.UP_ARROW) && -1 === allFail(obstacles, obstacleState => evaluate(
        PIB, { "playerState": { ...playerState, ypos: ypos - SPEED }, obstacleState }, { overlaps }))
    ) playerState.ypos -= SPEED;

    if (p5.keyIsDown(p5.DOWN_ARROW) && -1 === allFail(obstacles, obstacleState => evaluate(
        PIB, { "playerState": { ...playerState, ypos: ypos + SPEED }, obstacleState }, { overlaps }))
    ) playerState.ypos += SPEED;

    if (p5.keyIsDown(p5.LEFT_ARROW) && -1 === allFail(obstacles, obstacleState => evaluate(
        PIB, { "playerState": { ...playerState, xpos: xpos - SPEED }, obstacleState }, { overlaps }))
    ) playerState.xpos -= SPEED;

    if (p5.keyIsDown(p5.RIGHT_ARROW) && -1 === allFail(obstacles, obstacleState => evaluate(
        PIB, { "playerState": { ...playerState, xpos: xpos + SPEED }, obstacleState }, { overlaps })
    )) playerState.xpos += SPEED;
}

const pickUp = () => {
    if (playerState.inventory.length >= 16) return;
    let itemIndex = allFail(items, itemState =>     
        evaluate( PLAYER_CAN_PICK_UP, {playerState , itemState }, { overlaps }))
        if (itemIndex !== -1 ) playerState.inventory.push(items.splice(itemIndex,1)[0]);
}

const drawGuy = p5 => p5.rect(playerState.xpos, playerState.ypos, 20, 20)

const drawObstacles = p5 => 
    obstacles.map( ob => { 
        p5.fill(ob.color);
        p5.rect(ob.xpos, ob.ypos, ob.width, ob.height);
    }
)

const drawItems = p5 => 
    items.map( ob => { 
        p5.fill(ob.color);
        p5.rect(ob.xpos, ob.ypos, ob.width, ob.height);
    }
)

const drawInventory = p5 =>{
    let baseX = p5.width  - p5.width/6;
    let baseY =  p5.height/8;

    for (let i =0; i < playerState.inventory.length; ++i){
        let ob = playerState.inventory[i];
        let row = Math.floor(i/4); 
        let col = i%4; 
        let xPosition = baseX + col * (ob.width+5);
        let yPosition = baseY + row * (ob.height+5);
        p5.fill(ob.color);
        p5.rect(xPosition, yPosition, ob.width, ob.height);
    }
}

const allFail = (arr, fxn) => {
    for (let a =0; a < arr.length; ++a) {
        if (fxn(arr[a])) 
            return a;
    }
    return -1;
}

const P5 = new p5(sketch);
