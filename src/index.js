import * as p5 from './p5.js';
import rules from './rules.js';

let playerState = {};
let obstacleState = {};

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

        obstacleState = {
            xpos: p5.width / 4,
            ypos: p5.height / 4,
            width: 20,
            height: 20
        }
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
     if (p5.keyIsDown(p5.UP_ARROW) // &&
    // !evaluate(PLAYER_IS_BLOCKED,{ "player": playerState, "obstacle": obstacleState}, { overlaps } ) 
) 
            playerState.ypos -= 5;
    if (p5.keyIsDown(p5.DOWN_ARROW)) playerState.ypos += 5;
    if (p5.keyIsDown(p5.LEFT_ARROW)) playerState.xpos -= 5;
    if (p5.keyIsDown(p5.RIGHT_ARROW)) playerState.xpos += 5;
}

const drawGuy = (p5) => { p5.rect(playerState.xpos, playerState.ypos, 20, 20);}

const drawObstacle = (p5) => { p5.rect(obstacleState.xpos, obstacleState.ypos, 20, 20); }

const xydata = {
    playerPosition:{
        x: playerState.xpos,
        y: playerState.ypos 
    },
  
    obstaclePosition: {
        x: obstacleState.xpos,
        y: obstacleState.ypos
    }
  };
  
  const overlaps = (player,obstacle) => {
      return Math.abs(player.x-obstacle.x) <= player.x/2 + obstacle.x/2;
  }