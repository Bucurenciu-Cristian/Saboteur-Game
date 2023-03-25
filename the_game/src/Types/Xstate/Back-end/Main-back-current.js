import { assign, createMachine } from 'xstate';

// Now is working again for some reason.
const Game = createMachine(
  {
    predictableActionArguments: true,
    id: 'saboteur',
    initial: 'idle',
    context: {
      players: [], // Array of player objects with their roles, cards, and other relevant data
      playerId: null, // Add playerId to store the ID of the player attempting the action
      currentPlayerIndex: 0, // Index of the current player in the players array
      pathCards: [], // Array of path cards
      actionCards: [], // Array of action cards
      goldNuggetCards: [], // Array of gold nugget cards
      dwarfCards: [], // Array of dwarf cards (gold-diggers and saboteurs)
      startCard: null, // Start card (ladder)
      finishCards: [], // Array of finish cards (one treasure card and two stone cards)
      goldNuggetStock: [], // Stock of gold nugget cards
      round: 1, // Current round of the game (1 to 3)
      gameBoard: [], // Array representing the game board with played path cards
      gameBoardMatrix: [], // Matrix representing the game board with played path cards
      discardPile: [], // Array of discarded cards
    },
    states: {
      idle: {
        // Add an idle state to handle room creation and joining
        on: {
          CREATE_ROOM: {
            actions: ['createRoom'],
            target: 'setup',
            cond: 'hasEnoughPlayers',
          },
          JOIN_ROOM: {
            actions: ['joinRoom'],
            target: 'setup',
            cond: 'hasEnoughPlayers',
          },
        },
      },
      setup: {
        initial: 'prepareCards',
        states: {
          prepareCards: {
            onEntry: 'prepareCards',
            on: {
              CARDS_PREPARED: 'assignRoles',
            },
          },
          assignRoles: {
            onEntry: 'assignRoles',
            on: {
              ROLES_ASSIGNED: 'dealCards',
            },
          },
          dealCards: {
            onEntry: 'dealCards',
            on: {
              CARDS_DEALT: '#saboteur.play',
            },
          },
        },
      },
      play: {
        initial: 'chooseCard',
        states: {
          chooseCard: {
            on: {
              PLAY_PATH_CARD: {
                actions: ['setPlayerId', 'playPathCard'],
                target: 'validateCard',
                cond: 'isValidPathCard',
                internal: false,
                in: {
                  // MaybeWrong
                  validateCard: {
                    actions: assign({
                      'validateCard.meta.lastCardType': 'path',
                    }),
                  },
                },
              },
              PLAY_ACTION_CARD: {
                actions: ['setPlayerId', 'playActionCard'],
                target: 'validateCard',
                cond: 'canPlayActionCard',
                internal: false,
                in: {
                  validateCard: {
                    actions: assign({
                      'validateCard.meta.lastCardType': 'action',
                    }),
                  },
                },
              },
              PASS: {
                actions: ['setPlayerId', 'pass'],
                target: 'nextPlayer',
                cond: 'hasPlayableCards',
              },
            },
          },
          validateCard: {
            meta: {
              lastCardType: null,
            },
            on: {
              CARD_VALID: 'placeCard',
              CARD_INVALID: 'chooseCard',
            },
          },
          nextPlayer: {
            onEntry: ['updateCurrentPlayerIndex', 'GiveCurrentUserANewCardFromTheDeck'],
            on: {
              NEXT_PLAYER: 'chooseCard',
              ROUND_END: '#saboteur.score',
            },
          },
          placeCard: {
            on: {
              SET_COORDINATES: {
                actions: ['setCardCoordinates'],
                target: 'nextPlayer',
                cond: (context, event, meta) => {
                  const { lastCardType } = meta.stateNode.parent.states.validateCard.meta;
                  if (lastCardType === 'path') {
                    // Handle path card placement
                    return true; // or return areValidCoordinates(context, event);
                  }
                  return lastCardType === 'action';
                },
              },
              INVALID_COORDINATES: 'chooseCard',
            },
          },
        },
      },
      score: {
        onEntry: ['revealRoles', 'distributeGold'],
        on: {
          NEXT_ROUND: {
            target: 'setup',
            cond: 'isNotLastRound',
          },
          GAME_END: 'end',
        },
      },
      end: {
        type: 'final',
        onEntry: 'announceWinners',
      },
    },
  },
  {
    actions: {
      setupGame: assign({
        /* initialize context variables */
      }),
      shuffleAndDealCards: assign({
        /* shuffle and deal cards to players */
      }),
      playPathCard: assign({
        gameBoardMatrix: (context, event) => {
          // Update the game board matrix with the played path card.
          // You can use the row and column indices from the event object to place the card in the matrix.
        },
      }),
      playActionCard: assign({
        /* update gameState with the played action card */
      }),
      pass: assign({
        /* update currentPlayerIndex and gameState */
      }),
      revealRoles: assign({
        /* reveal the roles of all players */
      }),
      distributeGold: assign({
        /* distribute gold nuggets to the winning players */
      }),
      prepareNextRound: assign({
        /* set up the game for the next round */
      }),
      announceWinners: (context) => {
        /* announce the winners based on gold nuggets count */
      },
      setPlayerId: assign({
        playerId: (context, event) => event.playerId,
      }),
      createRoom: assign({
        rooms: (context, event) => {
          // Create a new room and add it to the rooms object
          const newRoom = {
            id: event.roomId,
            users: [{ id: event.userId, role: 'admin' }],
          };
          return { ...context.rooms, [event.roomId]: newRoom };
        },
      }),
      joinRoom: assign({
        rooms: (context, event) => {
          // Add the user to the specified room
          const room = context.rooms[event.roomId];
          if (!room) return context.rooms;
          const newUser = { id: event.userId };
          room.users.push(newUser);
          return { ...context.rooms, [event.roomId]: room };
        },
      }),
    },
    guards: {
      /* guard implementations */
      isNotLastRound: (context) => context.round < 3,
      isValidPathCard: (context, event) => {
        // Check if the path card can be added to the game board
      },
      canPlayActionCard: (context, event) => {
        // Check if the action card can be played
      },
      hasPlayableCards: (context, event) => {
        // Check if the player has any playable cards
      },
      isRoundEndConditionMet: (context, event) => {
        // Check if the end conditions for the current round are met
      },
      isMaxRoundsReached: (context, event) => {
        // Check if the maximum number of rounds has been played
      },
      isPlayerBlocked: (context, event) => {
        // Check if the player is blocked by a broken tool card
      },
      setCardCoordinates: (context, event) => {
        // Check if the coordinates are valid
      },
      hasEnoughPlayers: (context, event) => {
        // TODO: Change this 3 to the input from the form.
        // Check if the room has enough players to start the game
        const room = context.rooms[event.roomId];
        if (!room) return false;
        return room.users.length >= 3;
      },
    },
  }
);
