export default {
    PLAYER_IS_BLOCKED : {
        left: '@playerState',
        fn: 'overlaps',
        right: '@obstacleState'
      }
}
