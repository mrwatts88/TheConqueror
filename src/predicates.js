
export default {
    'overlaps' : (player,obstacle) =>  Math.abs(player.ypos-obstacle.ypos) < player.height/2 + obstacle.height/2 &&
                                       Math.abs(player.xpos-obstacle.xpos) < player.width/2 + obstacle.width/2
}