export default {
    PLAYER_IS_BLOCKED : {
        left: '@playerState',
        fn: 'overlaps',
        right: '@obstacleState'
      },
    PLAYER_CAN_PICK_UP : {
        left: '@playerState',
        fn: 'overlaps',
        right: '@itemState'
      }
}
