import { assign, createMachine, interpret } from 'xstate';
import { inspect } from '@xstate/inspect';
import preparationMachine from './PreparationGame';

const setPlayers = assign((context, event) => ({ players: event.data }));
assign((context, event) => ({ players: event.data }));
const setRoomId = assign({
  roomId: (_, event) => event.roomId,
});
// can't work
if (typeof window !== 'undefined') {
  inspect({
    url: 'https://statecharts.io/inspect', // The URL of the inspect server
    iframe: false, // Set to false if you want to use a separate browser window for the inspector
  });
}

function createRoomMachine(roomId) {
  const urlWebsite = `http://localhost:3050`;
  const roomMachine = createMachine(
    {
      // schema: {
      //   context: {} as { value: string },
      //   events: {} as { type: 'FOO'; value: string } | { type: 'BAR' },
      // },

      predictableActionArguments: true,
      id: `room-${roomId}`,
      initial: 'room_id',
      context: {
        players: [], // Array of player objects with their roles, cards, and other relevant data
        playerId: null, // Add playerId to store the ID of the player attempting the action
        currentPlayerIndex: 0, // Index of the current player in the players array
        currentPlayer: 0,
        startCard: null, // Start card (ladder)
        finishCards: [], // Array of finish cards (one treasure card and two stone cards)
        goldNuggetStock: [], // Stock  of gold nugget cards
        round: 3, // Current round of the game (1 to 3)
        gameBoard: [], // Array representing the game board with played path cards
        discardPile: [], // Array of discarded cards
        deck: [], // Array of cards in the deck
        roomId: 0, // Add roomId to the context

        // pathCards: [], // Array of path cards
        // actionCards: [], // Array of action cards
        // goldNuggetCards: [], // Array of gold nugget cards
        // dwarfCards: [], // Array of dwarf cards (gold-diggers and saboteurs)
      },
      states: {
        room_id: {
          on: {
            SET_ROOM_ID: {
              target: 'fetchingPlayers',
              actions: ['setRoomId'],
            },
          },
        },
        fetchingPlayers: {
          invoke: {
            src: 'fetchPlayersFromDatabase',
            onDone: {
              target: 'checkingPlayers',
              actions: ['setPlayers'],
            },
            onError: {
              // Handle any errors that might occur during fetching players
            },
          },
        },
        checkingPlayers: {
          always: [
            {
              cond: (context) => context.players.length >= 3,
              target: 'prepareGame',
            },
            {
              target: 'final',
            },
          ],
        },
        prepareGame: {
          invoke: {
            data: {
              players: (context) => context.players,
            },
            id: 'saboteurPreparation',
            src: preparationMachine,
            onDone: {
              target: 'play',
              actions: ['updateParentContext'],
            },
          },
        },
        waitingForClients: {
          on: {
            clientIsHere: {},
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
                // ROUND_END: `#room-${roomId}`.score',
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
              target: 'fetchingPlayers',
              cond: 'isNotLastRound',
            },
            GAME_END: 'end',
          },
        },
        final: {
          type: 'final',
        },
        end: {
          type: 'final',
          onEntry: 'announceWinners',
        },
      },
    },
    {
      services: {
        fetchPlayersFromDatabase: async (context) => {
          const { roomId: room_id } = context;
          const response = await fetch(`${urlWebsite}/api/room/${room_id}/players`);
          const players = await response.json();
          return players;
        },
      },
      actions: {
        updateParentContext: (context, event) => {
          context.gameBoard = event.data.matrix;
          context.players = event.data.players;
          context.deck = event.data.deck;
          // Aici trebuie sa spui a cui e randul primului Jucator.
          context.currentPlayerIndex = event.data.currentPlayerIndex;
        },
        setPlayers,
        setRoomId,

        // NEW STUFF
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
        // From today 25.05
        discardCard: assign({
          discardPile: (context, event) =>
            // Add the discarded card to the discard pile
            [...context.discardPile, event.card],
          players: (context, event) =>
            // Remove the discarded card from the player's hand
            context.players.map((player, index) => {
              if (index === event.playerId) {
                return {
                  ...player,
                  hand: player.hand.filter((card) => card.id !== event.card.id),
                };
              }
              return player;
            }),
        }),
        drawCard: assign({
          players: (context, event) => {
            // Draw a card from the deck and add it to the player's hand
            const [drawnCard, ...remainingDeck] = context.deck;
            context.deck = remainingDeck;

            return context.players.map((player, index) => {
              if (index === event.playerId) {
                return {
                  ...player,
                  hand: [...player.hand, drawnCard],
                };
              }
              return player;
            });
          },
        }),
        incrementRound: assign({
          round: (context) => context.round + 1,
        }),

        resetGameBoard: assign({
          gameBoard: (context) => {
            // Reset the game board to the initial state
          },
        }),

        resetPlayerStates: assign({
          players: (context) => {
            // Reset the players' states for a new round or game
          },
        }),

        updatePlayerScore: assign({
          players: (context, event) => {
            // Update the player's score based on the outcome of the round or game
          },
        }),

        removePlayer: assign({
          players: (context, event) =>
            // Remove a player from the game
            context.players.filter((_, index) => index !== event.playerId),
        }),

        addPlayer: assign({
          players: (context, event) =>
            // Add a new player to the game
            [...context.players, event.newPlayer],
        }),
        endTurn: assign({
          currentPlayerIndex: (context) => (context.currentPlayerIndex + 1) % context.players.length,
        }),
        updatePlayerStatus: assign({
          players: (context, event) => {
            // Update the status of the specified player
          },
        }),
        checkPathCompletion: assign({
          gameState: (context) => {
            // Check if the path is completed and update the game state
          },
        }),
        rotateCard: assign({
          players: (context, event) => {
            // Rotate the specified card in the player's hand or on the game board
          },
        }),
      },
      guards: {
        // Add guards here
        /* guard implementations */
        isNotLastRound: (context) => context.round < 3,
        isValidPathCard: (context, event) => {
          // Check if the path card can be added to the game board
        },
        canPlayActionCard: (context, event) => {
          // Check if the action card can be played
        },
        canPlayPathCard: (context, event) => {},
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
        isPlayerTurn: (context, event) => context.currentPlayerIndex === event.playerId,

        isCardInHand: (context, event) => {
          const player = context.players[event.playerId];
          return player.hand.some((card) => card.id === event.card.id);
        },

        isPlayerRoleValidForAction: (context, event) => {
          const player = context.players[event.playerId];
          // Implement the role-specific action validation logic here
        },

        hasEnoughCardsInDeck: (context, event) => context.deck.length > 0,

        isDeckEmpty: (context, event) => context.deck.length === 0,

        isActionCardLimitReached: (context, event) => {
          // Implement the action card limit validation logic here
        },

        isPathCardPlacementValid: (context, event) => {
          // Implement the path card placement validation logic here
        },

        isGameEndConditionMet: (context, event) => {
          // Implement the game end condition validation logic here
        },

        isMaxPlayersReached: (context, event) => {
          const room = context.rooms[event.roomId];
          if (!room) return false;
          const maxPlayers = 10; // Set this value to the maximum number of players allowed
          return room.users.length >= maxPlayers;
        },
      },
    }
  );

  const roomService = interpret(roomMachine, { devTools: true }).start();
  roomService.send({ type: 'SET_ROOM_ID', roomId });
  return roomService;
}

export default createRoomMachine;
