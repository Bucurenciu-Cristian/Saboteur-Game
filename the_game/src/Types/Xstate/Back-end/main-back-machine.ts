import { assign, createMachine, interpret, send } from 'xstate';

import { checkTheCurrentCardInTable } from '@engine/CheckTheCurrentCardInTable';
import { findAvailablePath } from '@engine/FindAvailablePath';
import { findTheCard } from '@src/BusinessLogic/Logic';
import { conDirections, findCardActions, Modes, NeighboursActions } from '@src/enums';
import { isPathFinishedRefactored } from '@engine/DepthFirstSearch';
import { findOccupiedEdge } from '@engine/FindOccupiedEdge';
import { fisherYatesShuffle } from '@src/BusinessLogic/FisherYatesShuffle';
import preparationMachine from './PreparationGame';
import { getCardCondition } from '../../../../pages/game/[gameId]';
import { getValidCoordinatesForCard } from '../../../../pages/api/socket';

assign((context, event) => ({ players: event.data }));

function checkCoordinates(param, availablePaths) {
  return availablePaths.some(({ column, row }) => row === param.row && column === param.column);
}

const getToolsToRepair = (card) => {
  const newCode = card.code.slice(2);

  if (newCode.includes(Modes.AxeAndLantern)) {
    return [Modes.Axe, Modes.Lantern];
  }
  if (newCode.includes(Modes.AxeAndCart)) {
    return [Modes.Axe, Modes.Cart];
  }
  if (newCode.includes(Modes.LanternAndCart)) {
    return [Modes.Lantern, Modes.Cart];
  }
  if (newCode.includes(Modes.Lantern)) {
    return [Modes.Lantern];
  }
  if (newCode.includes(Modes.Cart)) {
    return [Modes.Cart];
  }
  if (newCode.includes(Modes.Axe)) {
    return [Modes.Axe];
  }
};
const isMatchingTool = (blockCard, actionCard) => {
  const toolsToRepair = getToolsToRepair(actionCard);
  return toolsToRepair.some((tool) => blockCard.code.includes(tool) && blockCard.code.includes(Modes.False));
};
const playActionCardOthers = assign({
  playerId: (_, event) => event.payload.playerId,
  logMessage: (context, event) => 'Action Card',
  players: (context, event) => {
    const { players } = context;
    const { selectedPlayer, card } = event.payload;
    const isActionCard = getCardCondition(card, 1, Modes.Action);
    if (!isActionCard) {
      return players;
    }

    const newPlayers = JSON.parse(JSON.stringify(players)); // Create a deep copy of the players array
    const targetPlayer = newPlayers.findIndex((player) => player.email === selectedPlayer.email);

    if (card.code[3] === Modes.False) {
      // Only add the broken tool if there is no matching broken tool
      const matchingBrokenTool = newPlayers[targetPlayer].blocks.find((blockCard) => isMatchingTool(blockCard, card));
      if (!matchingBrokenTool) {
        newPlayers[targetPlayer].blocks.push(card);
      }
    } else if (card.code[3] === Modes.True) {
      // Handle repair cards (True and special cards)
      const matchingBrokenTools = newPlayers[targetPlayer].blocks.filter((blockCard) => isMatchingTool(blockCard, card));

      // If there are matching broken tools, remove one at random and send it to the graveyard along with the repair card
      if (matchingBrokenTools.length > 0) {
        // Pick a random index from the matching broken tools
        const randomIndex = Math.floor(Math.random() * matchingBrokenTools.length);
        const randomBrokenTool = matchingBrokenTools[randomIndex];

        // Find the index of the randomly selected broken tool in the target player's blocks
        const blockIndex = newPlayers[targetPlayer].blocks.indexOf(randomBrokenTool);

        // Remove the randomly selected broken tool from the target player's blocks
        const removedItem = newPlayers[targetPlayer].blocks.splice(blockIndex, 1)[0];

        // Send the removed broken tool and the repair card to the discard pile
        context.discardPile.push(removedItem);
        context.discardPile.push(card);
      }
    }
    return newPlayers;
  },
});

const canPlayRepairCardGuard = (context, event) => {
  const { players } = context;
  const { selectedPlayer, card } = event.payload;
  const targetPlayer = players.find((player) => player.email === selectedPlayer.email);

  if (card.code.includes(Modes.False)) {
    return !targetPlayer.blocks.some((blockCard) => isMatchingTool(blockCard, card));
  }

  // Check if the player has a broken tool that can be repaired by the current card
  const hasBrokenTool = targetPlayer.blocks.some((blockCard) => {
    const matchingTools = isMatchingTool(blockCard, card);
    const isBrokenTool = blockCard.code.includes(Modes.False);
    const toolsToRepairBrokenTool = getToolsToRepair(blockCard);
    const toolsToRepairCard = getToolsToRepair(card);

    const toolsToRepairEqual = toolsToRepairCard.some((tool) => toolsToRepairBrokenTool.includes(tool));
    return matchingTools && isBrokenTool && toolsToRepairEqual;
  });

  // If the selected card is a repair card and there is no broken tool to repair, return false to prevent the turn from ending
  if (card.code.includes(Modes.True) && !hasBrokenTool) {
    return false;
  }

  return true;
};
const canPlayPathCardGuard = (context, event): boolean => {
  const { players } = context;
  const { playerId } = event.payload;
  const targetPlayer = players.find((player) => player.playerIdGame === playerId);
  const hasBlockingCard = targetPlayer.blocks.length > 0;
  return !hasBlockingCard;
};

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
        playerId: 0, // Add playerId to store the ID of the player attempting the action
        currentPlayer: 0,
        blocks: [], // Array of block cards
        finishCards: [], // Array of finish cards (one treasure card and two stone cards)
        startCard: [], // Array of start cards
        goldNuggetStock: [], // Stock  of gold nugget cards
        round: 1, // Current round of the game (1 to 3)
        gameBoard: [], // Array representing the game board with played path cards
        discardPile: [], // Array of discarded cards
        deck: [], // Array of cards in the deck
        roomId: 0, // Add roomId to the context
        availablePaths: [], // Array of available paths
        serverText: '', // Text to display on the server
        gameLogs: [],
        logMessage: '',
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
              target: 'end',
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
              actions: [
                'updateParentContext',
                'findFinalCards',
                'findAvailablePaths',
                {
                  type: 'updateLogMessage',
                  message: 'Game started.',
                },
                'addLogEntry',
              ],
            },
          },
        },
        chooseCard: {
          on: {
            PLAY_PATH_CARD: [
              {
                cond: 'checkingPath',
                actions: ['playPathCard', 'removePlayedCardFromHand', 'addLogEntry'],
                target: 'nextPlayer',
              },
              { actions: 'wrongInput' },
            ],
            PLAY_ACTION_CARD_OTHERS: [
              {
                actions: ['playActionCardOthers', 'removePlayedCardFromHand', 'addLogEntry'],
                target: 'nextPlayer',
                cond: 'canPlayRepairCardGuard',
              },
              { actions: 'wrongInput' },
            ],
            PLAY_ACTION_CARD_MYSELF: {
              actions: ['placeActionOnTable', 'removePlayedCardFromHand', 'addLogEntry'],
              target: 'nextPlayer',
              cond: 'canPlayActionOnTable',
            },
            PASS: {
              actions: ['discardCardFromPass', 'addLogEntry'],
              target: 'nextPlayer',
            },
          },
        },
        nextPlayer: {
          entry: ['setPlayerId', 'GiveCurrentUserANewCardFromTheDeck', 'passTurn', 'findAvailablePaths', 'findPathContinued'],
          always: [
            { cond: 'isGoldFound', actions: ['discoverFinalCards'], target: 'score' },
            {
              cond: 'isEdgeDetected',
              actions: ['updateTheMatrix', 'findFinalCards', 'findAvailablePaths'],
              target: 'chooseCard',
            },
            {
              cond: 'isAITurn',
              actions: ['sendAITurnToChooseCardEvent', 'addLogEntry'],
              target: 'chooseCard',
            },
            { cond: 'isAtLeastOnePlayerWithCard', target: 'score' },
            { cond: 'isRoundPlayable', target: 'chooseCard' },
            { cond: 'isRockFound', actions: ['discoverFinalCards'], target: 'chooseCard' },
          ],
          // cond: 'isRoundEndConditionMet',
          // ROUND_END: `#room-${roomId}`.score',
        },
        score: {
          entry: ['revealRoles', 'distributeGold'],
          on: {
            NEXT_ROUND: [
              {
                target: 'fetchingPlayers',
                actions: ['nextRound'],
                cond: 'isNotLastRound',
              },
              {
                target: 'end',
              },
            ],
          },
        },
        end: {
          type: 'final',
          entry: 'announceWinners',
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
        addLogEntry: assign({
          gameLogs: (context) => {
            const newLogEntry = {
              timestamp: new Date(),
              message: context.logMessage,
            };
            return context.gameLogs.concat(newLogEntry);
          },
        }),
        wrongInput: assign((context, event) => {
          context.serverText = 'Wrong input';
          const { type } = event;
          switch (type) {
            case 'PLAY_PATH_CARD':
              context.serverText = "You can't play path cards while you are blocked, only actions or pass the card";
              break;
            case 'PLAY_ACTION_CARD_OTHERS':
              context.serverText = "You didn't played an action correctly";
              break;
            default:
              context.serverText = 'Wrong input';
              break;
          }
        }),
        placeActionOnTable: assign((context, event) => {
          const { card, playerId, row, column } = event.payload;
          const { gameBoard } = context;
          if (getCardCondition(card, 2, Modes.Destroy)) {
            gameBoard[row][column] = { Card: '#', Occupied: false, Player: playerId };
            context.logMessage = `Player ${playerId} played a destroy card on ${row} ${column}`;
          } else {
            context.logMessage = `Player ${playerId} played a map card on ${row} ${column}`;
          }
        }),
        playActionCardOthers,
        updateParentContext: (context, event) => {
          context.gameBoard = event.data.matrix;
          context.players = event.data.players;
          context.deck = event.data.deck;
          // Aici trebuie sa spui a cui e randul primului Jucator.
          context.currentPlayer = event.data.currentPlayer;
          context.discardPile = event.data.discardPile;
          context.logMessage = 'Game started.';
        },
        setPlayers: assign((context, event) => ({ players: event.data })),
        setRoomId: assign({
          roomId: (_, event) => event.roomId,
        }),
        discoverFinalCards: assign({
          gameBoard: (context) => {
            const { gameBoard, endOfRound } = context;
            const { isContinued } = endOfRound;
            isContinued.forEach(([row, column]) => {
              gameBoard[row][column].Card.back = undefined;
            });
            return gameBoard;
          },
        }),
        updateTheMatrix: assign({
          gameBoard: (context) => {
            let { gameBoard } = context;
            const lengthColumns = gameBoard.length;
            const lengthRows = gameBoard[0].length;
            const [_, position] = findOccupiedEdge(gameBoard);
            const { direction } = position[0];
            const newColumn = Array(lengthColumns).fill({ Card: '#', Occupied: false });
            const newRow = Array(lengthRows).fill({ Card: '#', Occupied: false });
            switch (direction) {
              case conDirections.EAST:
                gameBoard = gameBoard.map((row, i) => [...row, newColumn[i]]);
                break;
              case conDirections.WEST:
                gameBoard = gameBoard.map((row, i) => [newColumn[i], ...row]);
                break;
              case conDirections.SOUTH:
                gameBoard.push(newRow);
                break;
              case conDirections.NORTH:
                gameBoard.unshift(newRow);
                break;
              default:
                break;
            }
            return gameBoard;
          },
        }),
        sendAITurnToChooseCardEvent: send(({ players, availablePaths, currentPlayer, gameBoard }) => {
          // console.log('AI will do something');
          const aiPlayer = players[currentPlayer];
          const cards = aiPlayer.hand.filter((card) => card.code[1] === Modes.Path);
          const discardACard = {
            type: 'PASS',
            payload: { handIndex: 0 },
          };
          if (cards.length > 0) {
            // console.log(cards.length, JSON.stringify(cards));
            const [card] = fisherYatesShuffle(cards);
            let validcoords = getValidCoordinatesForCard(card, availablePaths, gameBoard);
            // if (validcoords.length === 0) {
            //   [card] = fisherYatesShuffle(cards);
            //   validcoords = getValidCoordinatesForCard(card, availablePaths, gameBoard);
            // }
            validcoords = fisherYatesShuffle(validcoords);
            if (validcoords.length === 0) {
              // console.log(validcoords);
              return discardACard;
            }
            return {
              type: 'PLAY_PATH_CARD',
              payload: {
                card,
                playerId: currentPlayer,
                row: validcoords[0].row,
                column: validcoords[0].column,
              },
            };
          }
          // console.log('AI will drop a card');
          return discardACard;
        }),
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
          logMessage: (context) => `Player ${context.players[context.currentPlayer].name} discarded a card`,
        }),
        findFinalCards: assign({
          finishCards: ({ gameBoard }) => findTheCard(gameBoard, findCardActions.Final),
          startCard: ({ gameBoard }) => findTheCard(gameBoard, findCardActions.Start),
        }),
        findAvailablePaths: assign({
          availablePaths: ({ gameBoard, finishCards }) => findAvailablePath(gameBoard, finishCards),
        }),
        findPathContinued: assign({
          endOfRound: ({ gameBoard, finishCards }) => {
            const isContinued = [];
            const isNotContinued = [];
            finishCards.forEach(([row, column]) => {
              if (checkTheCurrentCardInTable({ matrix: gameBoard, row, column, action: NeighboursActions.ONE })) {
                // console.log('Start DFS');
                const x = isPathFinishedRefactored(gameBoard, row, column);
                if (x) isContinued.push([row, column]);
                else isNotContinued.push([row, column]);
              }
              /* let { code } = gameBoard[row][column].Card;
              code = changeOrientation(code);
              if (checkTheCurrentCardInTable({ matrix: gameBoard, row, column, action: NeighboursActions.ONE })) {
                const y = isPathFinishedRefactored(gameBoard, row, column);
                if (y) isContinued.push([row, column]);
                else isNotContinued.push([row, column]);
              }
              code = changeOrientation(code); */
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
            const { row, column, card, playerId } = event.payload;
            const { gameBoard } = context;
            gameBoard[row][column] = { Card: card, Occupied: true, playerId }; // Place the card in the matrix
            return gameBoard;
          },
          logMessage: (context, event) => `Player ${context.players[context.currentPlayer].name} played a path card`,
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
          serverText: '',
        }),
        revealRoles: assign({
          /* reveal the roles of all players */
        }),
        distributeGold: assign({
          /* distribute gold nuggets to the winning players */
        }),
        announceWinners: (context) => {
          /* announce the winners based on gold nuggets count */
        },
        nextRound: assign({
          round: (context) => context.round + 1,
        }),
        // From today 25.05
        updatePlayerScore: assign({
          players: (context, event) => {
            // Update the player's score based on the outcome of the round or game
          },
        }),
      },
      guards: {
        canPlayRepairCardGuard,
        // Add guards here
        /* guard implementations */
        canPlayActionOnTable: (context, event) => {
          const { card } = event.payload;
          const isActionCard = getCardCondition(card, 1, Modes.Action);
          if (!isActionCard) {
            return false;
          }
          return getCardCondition(card, 2, Modes.Map) || getCardCondition(card, 2, Modes.Destroy);
        },
        isNotLastRound: (context) => context.round < 3,
        checkingPath: (context, event) => {
          // const checkPlayer = context.playerId === event.payload.playerId;
          // if (!checkPlayer) return false;
          const checkCoord = checkCoordinates(
            {
              row: event.payload.row,
              column: event.payload.column,
            },
            context.availablePaths
          );
          if (!checkCoord) return false;
          const check = checkTheCurrentCardInTable({
            matrix: context.gameBoard,
            row: event.payload.row,
            column: event.payload.column,
            card: event.payload.card,
          });
          // console.log(check);
          return check && canPlayPathCardGuard(context, event);
        },
        isRoundPlayable: (context) => {
          // Check if the round end condition is met
          const { endOfRound } = context;
          const { pathContinued } = endOfRound;
          return !pathContinued;
        },
        isRockFound: (ctx) => {
          const { gameBoard, endOfRound } = ctx;
          return endOfRound.isContinued.some(([row, column]) => {
            const { code } = gameBoard[row][column].Card;
            return code[8] === Modes.Rock;
          });
        },
        isGoldFound: (context) => {
          const { gameBoard, endOfRound } = context;
          return endOfRound.isContinued.some(([row, column]) => {
            const { code } = gameBoard[row][column].Card;
            return code[8] === Modes.Gold;
          });
        },
        isAtLeastOnePlayerWithCard: ({ players, deck }) => {
          if (deck.length > 0) {
            return false;
          }

          for (const player of players) {
            if (player.hand.length > 0) {
              return false;
            }
          }
          return true;
        },
        isEdgeDetected: (context, event) => {
          const { gameBoard } = context;
          const [edgeDetected] = findOccupiedEdge(gameBoard);
          return edgeDetected;
        },
        isAITurn: ({ currentPlayer, players }) => {
          const player = players[currentPlayer];
          return player.username === 'AI';
        },
        isCurrentPlayer: (context, event) => context.playerId === event.payload.playerId,
        isMaxRoundsReached: (context, event) => {
          // Check if the maximum number of rounds has been played
        },
        isPlayerBlocked: (context, event) => {
          // Check if the player is blocked by a broken tool card
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
