import { assign, createMachine } from 'xstate';

const updateGameState = assign({
  gameState: (context, event) => event.gameState,
});

const setPlayerId = assign({
  playerId: (context, event) => event.playerId,
});

const setChosenCard = assign({
  chosenCard: (context, event) => event.card,
});

const clearChosenCard = assign({
  chosenCard: (context, event) => null,
});

const sendPlayCardEvent = (context, event) => {
  // Send the chosen card to the server through Socket.IO
};

const updateCanPlay = assign({
  canPlay: (context, event) => event.gameState.currentPlayerId === context.playerId,
});
const clientMachine = createMachine(
  {
    predictableActionArguments: true,
    id: 'clientSaboteur',
    initial: 'waitingForGame',
    context: {
      gameState: null,
      playerId: null,
      chosenCard: null,
      canPlay: false,
    },
    states: {
      waitingForGame: {
        on: {
          GAME_STATE_UPDATE: {
            target: 'syncedWithServer',
            actions: [updateGameState, setPlayerId],
          },
        },
      },
      syncedWithServer: {
        initial: 'idle',
        states: {
          idle: {
            on: {
              CHOOSE_CARD: {
                target: 'cardChosen',
                actions: setChosenCard,
                cond: 'isPlayersTurn', // Add this guard
              },
            },
          },
          cardChosen: {
            on: {
              PLAY_CARD: {
                target: 'idle',
                actions: sendPlayCardEvent,
              },
              CANCEL_CHOICE: {
                target: 'idle',
                actions: clearChosenCard,
              },
            },
          },
        },
        on: {
          GAME_STATE_UPDATE: {
            actions: ['updateGameState', 'updateCanPlay'], // Add 'updateCanPlay'
          },
          GAME_END: 'end',
        },
      },
      end: {
        type: 'final',
      },
    },
  },
  {
    actions: {
      updateGameState,
      setPlayerId,
      setChosenCard,
      clearChosenCard,
      sendPlayCardEvent,
      updateCanPlay,
    },
    guards: {
      isPlayersTurn: (context, event) => context.canPlay,
    },
  }
);
