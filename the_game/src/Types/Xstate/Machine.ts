import { createMachine } from 'xstate';

const Game = createMachine({
  id: 'game',
  initial: 'setup',
  context: {
    players: [],
  },
  states: {
    setup: {
      on: {
        SETUP_GAME: {
          target: 'gameInProgress',
          actions: ['initializeGame'],
        },
      },
    },
    gameInProgress: {
      initial: 'playerTurn',
      states: {
        playerTurn: {
          on: {},
        },
      },
    },
    gameOver: {
      initial: 'Gold',
      states: {
        Gold: {
          on: {},
        },
      },
    },
  },
});

const VALID_EVENTS = [
  {
    type: 'LOG_OUT',
  },
  {
    type: 'LOG_IN',
    /**
     * Pass in any other properties
     * along with the event
     */
    username: 'myusername',
  },
  {
    /**
     * The event type key and value
     * can be any text case
     */
    type: 'wake up',
  },
];
