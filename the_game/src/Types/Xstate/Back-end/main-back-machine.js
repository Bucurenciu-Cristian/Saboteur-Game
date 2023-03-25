import { createMachine } from 'xstate';
import preparationMachine from './PreparationGame';

const parentMachine = createMachine(
  {
    predictableActionArguments: true,
    id: 'back-saboteur-parent',
    initial: 'idle',
    context: {
      players: [], // Array of player objects with their roles, cards, and other relevant data
      playerId: null, // Add playerId to store the ID of the player attempting the action
      currentPlayerIndex: 0, // Index of the current player in the players array
      startCard: null, // Start card (ladder)
      finishCards: [], // Array of finish cards (one treasure card and two stone cards)
      goldNuggetStock: [], // Stock of gold nugget cards
      round: 1, // Current round of the game (1 to 3)
      gameBoard: [], // Array representing the game board with played path cards
      discardPile: [], // Array of discarded cards
      deck: [], // Array of cards in the deck
      // pathCards: [], // Array of path cards
      // actionCards: [], // Array of action cards
      // goldNuggetCards: [], // Array of gold nugget cards
      // dwarfCards: [], // Array of dwarf cards (gold-diggers and saboteurs)
    },
    states: {
      idle: {
        after: {
          100: 'executingChild',
        },
      },
      executingChild: {
        invoke: {
          id: 'saboteurPreparation',
          src: preparationMachine,
          onDone: {
            target: 'final',
            actions: ['updateParentContext'],
          },
        },
      },
      final: {
        type: 'final',
      },
    },
  },
  {
    actions: {
      updateParentContext: (context, event) => {
        context.gameBoard = event.data.matrix;
        context.players = event.data.players;
        context.deck = event.data.deck;
      },
    },
  }
);
export default parentMachine;
