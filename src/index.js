import * as p5 from './p5.js';

let playerState = {};

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

        obstacleState =[ {
            xpos: p5.width / 2,
            ypos: p5.height / 2,
            width: 20,
            height: 20
        } ]
    }

    p5.draw = () => {
        p5.background(0);
        updateGuy(p5);
        drawGuy(p5);
    }
}

const P5 = new p5(sketch);  


const updateGuy = (p5) => {
    if (p5.keyIsDown(p5.UP_ARROW) && evaluate(PLAYER_IS_BLOCKED, 
        {
            "player": playerState, 
            "obstacle": {}
        }
        , { overlaps })  ) playerState.ypos -= 5;
    if (p5.keyIsDown(p5.DOWN_ARROW)) playerState.ypos += 5;
    if (p5.keyIsDown(p5.LEFT_ARROW)) playerState.xpos -= 5;
    if (p5.keyIsDown(p5.RIGHT_ARROW)) playerState.xpos += 5;
}

const drawGuy = (p5) => {
    p5.rect(playerState.xpos, playerState.ypos, 20, 20);
}


const xydata = {
    playerPosition:{
        
    },
  
    obstaclePosition: {
    }
  };
  
  const overlaps = (player,obstacle) => {
      return Math.abs(player.x-obstacle.x) <= player.x/2 + obstacle.x/2;
  }
  
  evaluate(PLAYER_IS_BLOCKED, xydata, { overlaps })   