import { assign, createMachine, interpret } from 'xstate';

import { checkTheCurrentCardInTable } from '@engine/CheckTheCurrentCardInTable';
import { findAvailablePath } from '@engine/FindAvailablePath';
import { findTheCard } from '@src/BusinessLogic/Logic';
import { findCardActions, NeighboursActions } from '@src/enums';
import { isPathToFinish } from '@engine/DepthFirstSearch';
import preparationMachine from './PreparationGame';

assign((context, event) => ({ players: event.data }));
// can't work
// if (typeof window !== 'undefined') {
//   inspect({
//     url: 'https://statecharts.io/inspect', // The URL of the inspect server
//     iframe: false, // Set to false if you want to use a separate browser window for the inspector
//   });
// }

function checkCoordinates(param, availablePaths) {
  return availablePaths.some(({ column, row }) => row === param.row && column === param.column);
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
        currentPlayer: 0,
        finishCards: [], // Array of finish cards (one treasure card and two stone cards)
        goldNuggetStock: [], // Stock  of gold nugget cards
        round: 1, // Current round of the game (1 to 3)
        gameBoard: [], // Array representing the game board with played path cards
        discardPile: [], // Array of discarded cards
        deck: [], // Array of cards in the deck
        roomId: 0, // Add roomId to the context
        availablePaths: [], // Array of available paths
        endOfRound: { pathContinued: false, isContinued: [], isNotContinued: [] }, // Object to check if the round is over
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
              currentPlayer: (context) => context.currentPlayer,
            },
            id: 'saboteurPreparation',
            src: preparationMachine,
            onDone: {
              target: 'chooseCard',
              actions: ['updateParentContext', 'findFinalCards', 'findAvailablePaths'],
            },
          },
        },
        chooseCard: {
          on: {
            PLAY_PATH_CARD: [
              {
                cond: 'isEverythingOkay',
                actions: ['setPlayerId', 'playPathCard', 'removePlayedCardFromHand'],
                target: 'nextPlayer',
              },
            ],
            PLAY_ACTION_CARD: {
              actions: ['setPlayerId', 'playActionCard', 'removePlayedCardFromHand'],
              target: 'nextPlayer',
              // cond: 'canPlayActionCard',
            },
            PASS: {
              actions: ['setPlayerId', 'discardCardFromPass'],
              target: 'nextPlayer',
              // cond: 'hasPlayableCards',
            },
          },
        },
        nextPlayer: {
          onEntry: ['GiveCurrentUserANewCardFromTheDeck', 'passTurn', 'findAvailablePaths', 'findPathContinued'],
          always: [
            { target: 'chooseCard', cond: 'isRoundPlayable' },
            { target: 'chooseCard', actions: ['discoverFinalCards'], cond: 'isRockFound' },
            { target: 'score', cond: 'isGoldFound' },
            // { target: 'end', cond: 'isGameEndConditionMet' },
          ],
          // cond: 'isRoundEndConditionMet',
          // ROUND_END: `#room-${roomId}`.score',
        },
        score: {
          onEntry: ['revealRoles', 'distributeGold'],
          on: {
            NEXT_ROUND: {
              target: 'fetchingPlayers',
              // cond: 'isNotLastRound',
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
          const { roomId: gameId } = context;
          const response = await fetch(`${urlWebsite}/api/room/${gameId}/players`);
          return response.json();
        },
      },
      actions: {
        updateParentContext: (context, event) => {
          console.log('updateParentContext');
          context.gameBoard = event.data.matrix;
          context.players = event.data.players;
          context.deck = event.data.deck;
          // Aici trebuie sa spui a cui e randul primului Jucator.
          context.currentPlayer = event.data.currentPlayer;
        },
        setPlayers: assign((context, event) => ({ players: event.data })),
        setRoomId: assign({
          roomId: (_, event) => event.roomId,
        }),
        discoverFinalCards: assign({
          gameBoard: (context, event) => {
            const { gameBoard, endOfRound } = context;
            const { isContinued } = endOfRound;
            isContinued.forEach(([row, column]) => {
              gameBoard[row][column].Card.back = undefined;
            });
            return gameBoard;
          },
        }),

        // NEW STUFF
        passTurn: assign({
          currentPlayer: (context) => (context.currentPlayer + 1) % context.players.length,
        }),
        discardCardFromPass: assign({
          discardPile: (context, event) => {
            // Get the selected card from the player's hand
            const card = context.players[context.currentPlayer].hand[event.payload.handIndex];

            // Remove the card from the player's hand
            context.players[context.currentPlayer].hand.splice(event.payload.handIndex, 1);

            // Add the card to the discard pile
            return [...context.discardPile, card];
          },
        }),
        findFinalCards: assign({
          finishCards: ({ gameBoard }) => findTheCard(gameBoard, findCardActions.Final),
        }),
        findAvailablePaths: assign({
          availablePaths: ({ gameBoard, finishCards }) => findAvailablePath(gameBoard, finishCards),
        }),
        findPathContinued: assign({
          // ? TODO: Think very good about this
          endOfRound: ({ gameBoard, finishCards }) => {
            const isContinued = [];
            const isNotContinued = [];
            finishCards.forEach(([row, column]) => {
              if (checkTheCurrentCardInTable({ matrix: gameBoard, row, column, action: NeighboursActions.ONE })) {
                console.log('Start DFS');
                const x = isPathToFinish(gameBoard, row, column);
                if (x) isContinued.push([row, column]);
                else isNotContinued.push([row, column]);
                console.log('END DFS');
              }
            });
            return {
              pathContinued: isContinued.length > 0,
              isContinued,
              isNotContinued,
            };
          },
        }),
        GiveCurrentUserANewCardFromTheDeck: assign((context) => {
          const { players, currentPlayer, deck } = context;
          if (deck.length === 0) {
            return {}; // No changes to the context if the deck is empty
          }
          // Remove the top card frompo the deck
          const [newCard, ...restOfDeck] = deck;

          // Add the new card to the current player's hand
          const currentPl = players[currentPlayer];
          const updatedHand = [...currentPl.hand, newCard];

          // Update the current player's hand in the players array
          const updatedPlayers = players.map((player, index) =>
            index === currentPlayer ? { ...player, hand: updatedHand } : player
          );

          return {
            deck: restOfDeck,
            players: updatedPlayers,
          };
        }),
        playPathCard: assign({
          gameBoard: (context, event) => {
            const { row, column, card } = event.payload;
            const newGameBoard = JSON.parse(JSON.stringify(context.gameBoard)); // Create a deep copy of the game board
            newGameBoard[row][column] = { Card: card, Occupied: true, playerId: context.playerId }; // Place the card in the matrix
            return newGameBoard;
          },
        }),
        setPlayerId: assign({
          playerId: (_, event) => event.payload.playerId,
        }),
        removePlayedCardFromHand: assign({
          players: (context, event) => {
            const { currentPlayer } = context;
            const { handIndex } = event.payload;
            const newPlayers = JSON.parse(JSON.stringify(context.players)); // Create a deep copy of the players array
            newPlayers[currentPlayer].hand.splice(handIndex, 1); // Remove the card from the player's hand
            return newPlayers;
          },
        }),

        playActionCard: assign({
          playerId: (_, event) => event.payload.playerId,
          /* update gameState with the played action card */
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

        endTurn: assign({
          currentPlayerIndex: (context) => (context.currentPlayerIndex + 1) % context.players.length,
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
        isEverythingOkay: (context, event) => {
          console.log('Guard isEverythingOkay');
          const checkCoord = checkCoordinates(
            {
              row: event.payload.row,
              column: event.payload.column,
            },
            context.availablePaths
          );
          if (!checkCoord) {
            return false;
          }
          const check = checkTheCurrentCardInTable({
            matrix: context.gameBoard,
            row: event.payload.row,
            column: event.payload.column,
            card: event.payload.card,
          });
          return check;
        },
        isRoundPlayable: (context, event) => {
          // Check if the round end condition is met
          const { endOfRound } = context;
          const { pathContinued } = endOfRound;
          return !pathContinued;
        },
        isRockFound: (ctx) => {
          console.log('Guard isRockFound');
          const { gameBoard, endOfRound } = ctx;
          return endOfRound.isContinued.some(([row, column]) => {
            const { code } = gameBoard[row][column].Card;
            return code[8] === 'R';
          });
        },
        isGoldFound: (context) => {
          console.log('Guard isGoldFound');
          const { gameBoard, endOfRound } = context;
          return endOfRound.isContinued.some(([row, column]) => {
            const { code } = gameBoard[row][column].Card;
            return code[8] === 'G';
          });
        },

        isMaxRoundsReached: (context, event) => {
          // Check if the maximum number of rounds has been played
        },
        isPlayerBlocked: (context, event) => {
          // Check if the player is blocked by a broken tool card
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

        // Implement the game end condition validation logic here
        isGameEndConditionMet: (context, event) => true,
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
