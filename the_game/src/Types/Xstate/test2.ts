import { createMachine } from 'xstate';

const saboteurMachine = createMachine({
  id: 'saboteur',
  initial: 'setup',
  states: {
    setup: {
      on: {
        SETUP_COMPLETE: 'playRound',
      },
    },
    playRound: {
      initial: 'startTurn',
      states: {
        startTurn: {
          on: {
            NEXT_PLAYER: 'playerAction',
          },
        },
        playerAction: {
          on: {
            PLAY_PATH_CARD: 'endTurn',
            PLAY_ACTION_CARD: 'endTurn',
            PASS: 'endTurn',
          },
        },
        endTurn: {
          on: {
            ROUND_CONTINUES: 'startTurn',
            ROUND_END: '#saboteur.roundEnd',
          },
        },
      },
    },
    roundEnd: {
      on: {
        LAST_ROUND: 'gameEnd',
        NEXT_ROUND: 'playRound',
      },
    },
    gameEnd: {
      type: 'final',
    },
  },
});
