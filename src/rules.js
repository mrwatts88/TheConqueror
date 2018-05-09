import regent from 'regent';

const rules = {
    const isStoppedByObstacle = { left:@position, fn: 'overlaps', right: @position} // left obj is player, right is obstacle
}