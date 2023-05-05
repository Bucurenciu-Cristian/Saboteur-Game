import { assign, createMachine, interpret } from 'xstate';

import { checkTheCurrentCardInTable } from '@engine/CheckTheCurrentCardInTable';
import { findAvailablePath } from '@engine/FindAvailablePath';
import { findTheCard } from '@src/BusinessLogic/Logic';
import { findCardActions, NeighboursActions } from '@src/enums';
import { isPathToFinish } from '@engine/DepthFirstSearch';
import preparationMachine from './PreparationGame';
import { getCardCondition } from '../../../../pages/game/[gameId]';
import { Modes } from '../../../enums';

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
        console.log('addBrokenTool');
        newPlayers[targetPlayer].blocks.push(card);
      }
    } else if (card.code[3] === Modes.True) {
      // Handle repair cards (True and special cards)
      const matchingBrokenTools = newPlayers[targetPlayer].blocks.filter((blockCard) => isMatchingTool(blockCard, card));
      console.log({ matchingBrokenTools });

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
    console.log({ matchingTools });
    const isBrokenTool = blockCard.code.includes(Modes.False);
    console.log({ isBrokenTool });
    const toolsToRepairBrokenTool = getToolsToRepair(blockCard);
    const toolsToRepairCard = getToolsToRepair(card);

    const toolsToRepairEqual = toolsToRepairCard.some((tool) => toolsToRepairBrokenTool.includes(tool));
    console.log({ toolsToRepairBrokenTool, toolsToRepairCard, toolsToRepairEqual });
    console.log({ matchingTools, isBrokenTool, toolsToRepairEqual });
    return matchingTools && isBrokenTool && toolsToRepairEqual;
  });

  // If the selected card is a repair card and there is no broken tool to repair, return false to prevent the turn from ending
  if (card.code.includes(Modes.True) && !hasBrokenTool) {
    console.log('No broken tool to repair');
    return false;
  }

  return true;
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
              actions: ['updateParentContext', 'findFinalCards', 'findAvailablePaths'],
            },
          },
        },
        chooseCard: {
          on: {
            PLAY_PATH_CARD: [
              {
                cond: 'checkingPath',
                actions: ['playPathCard', 'removePlayedCardFromHand'],
                target: 'nextPlayer',
              },
            ],
            PLAY_ACTION_CARD_OTHERS: [
              {
                actions: ['playActionCardOthers', 'removePlayedCardFromHand'],
                target: 'nextPlayer',
                cond: 'canPlayRepairCardGuard',
              },
              { actions: 'wrongInput' },
            ],
            // Destroy or Map
            PLAY_ACTION_CARD_MYSELF: {
              actions: ['playActionCardMyself', 'removePlayedCardFromHand'],
              target: 'nextPlayer',
              // cond: 'canPlayActionCard',
            },
            PASS: {
              actions: ['discardCardFromPass'],
              target: 'nextPlayer',
            },
          },
        },
        nextPlayer: {
          onEntry: ['setPlayerId', 'GiveCurrentUserANewCardFromTheDeck', 'passTurn', 'findAvailablePaths', 'findPathContinued'],
          always: [
            { target: 'score', cond: 'isAtLeastOnePlayerWithCard' },
            { target: 'chooseCard', cond: 'isRoundPlayable' },
            { target: 'score', actions: ['discoverFinalCards'], cond: 'isGoldFound' },
            { target: 'chooseCard', actions: ['discoverFinalCards'], cond: 'isRockFound' },
          ],
          // cond: 'isRoundEndConditionMet',
          // ROUND_END: `#room-${roomId}`.score',
        },
        score: {
          onEntry: ['revealRoles', 'distributeGold'],
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
        playActionCardOthers,
        updateParentContext: (context, event) => {
          console.log('updateParentContext');
          context.gameBoard = event.data.matrix;
          context.players = event.data.players;
          context.deck = event.data.deck;
          // Aici trebuie sa spui a cui e randul primului Jucator.
          context.currentPlayer = event.data.currentPlayer;
          context.discardPile = event.data.discardPile;
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
            const { row, column, card, playerId } = event.payload;
            const { gameBoard } = context;
            // const newGameBoard = JSON.parse(JSON.stringify(context.gameBoard)); // Create a deep copy of the game board
            gameBoard[row][column] = { Card: card, Occupied: true, playerId }; // Place the card in the matrix
            return gameBoard;
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

        /* playActionCardOthers: assign({
          playerId: (_, event) => event.payload.playerId,

          /!* update gameState with the played action card *!/
          // find the selectedplayer from the payload and add the card to the blocks from the player
          players: (context, event) => {
            const { players } = context;
            const { selectedPlayer, card } = event.payload;
            const isActionCard = getCardCondition(card, 1, Modes.Action);
            if (!isActionCard) {
              return players;
            }

            const newPlayers = JSON.parse(JSON.stringify(players)); // Create a deep copy of the players array
            const targetPlayer = newPlayers.findIndex((player) => player.email === selectedPlayer.email);

            const isSpecialEventCard = isThisCardSpecial(card);

            // Handle regular action cards
            if (!isSpecialEventCard) {
              console.log('Not special');
              if (getCardCondition(card, 3, Modes.False)) {
                // Check if the player already has a broken tool of the same type
                const hasBrokenTool = newPlayers[targetPlayer].blocks.some(
                  (cardBlock) =>
                    (card.code.includes(Modes.Axe) && cardBlock.code.includes(Modes.Axe)) ||
                    (card.code.includes(Modes.Cart) && cardBlock.code.includes(Modes.Cart)) ||
                    (card.code.includes(Modes.Lantern) && cardBlock.code.includes(Modes.Lantern))
                );

                // Only add the broken tool if the player doesn't already have one of the same type
                if (!hasBrokenTool) {
                  newPlayers[targetPlayer].blocks.push(card);
                }
              } else {
                // Handle regular "On" action cards
                newPlayers[targetPlayer].blocks.forEach((cardBlock, index) => {
                  if (
                    (card.code.includes(Modes.Axe) && cardBlock.code.includes(Modes.Axe)) ||
                    (card.code.includes(Modes.Cart) && cardBlock.code.includes(Modes.Cart)) ||
                    (card.code.includes(Modes.Lantern) && cardBlock.code.includes(Modes.Lantern))
                  ) {
                    newPlayers[targetPlayer].blocks.splice(index, 1); // Remove the broken tool card
                  }
                });
              }
            } else {
              // Handle special event cards
              console.log('Special');

              // Iterate through player's blocks
              newPlayers[targetPlayer].blocks.forEach((cardBlock, index) => {
                // Check if the special card can repair the broken tool
                if (card.code.includes(Modes.LanternAndCart)) {
                  if (cardBlock.code.includes(Modes.Lantern) || cardBlock.code.includes(Modes.Cart)) {
                    newPlayers[targetPlayer].blocks.splice(index, 1); // Remove the broken tool card
                  }
                } else if (card.code.includes(Modes.AxeAndLantern)) {
                  if (cardBlock.code.includes(Modes.Axe) || cardBlock.code.includes(Modes.Lantern)) {
                    newPlayers[targetPlayer].blocks.splice(index, 1); // Remove the broken tool card
                  }
                } else if (card.code.includes(Modes.AxeAndCart)) {
                  if (cardBlock.code.includes(Modes.Axe) || cardBlock.code.includes(Modes.Cart)) {
                    newPlayers[targetPlayer].blocks.splice(index, 1); // Remove the broken tool card
                  }
                }
              });
            }

            return newPlayers;
          },
        }), */
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
        isNotLastRound: (context) => context.round < 3,
        checkingPath: (context, event) => {
          console.log('Guard checkingPath');
          console.log(context.playerId, event.payload.playerId);
          const checkPlayer = context.playerId === event.payload.playerId;
          console.log({ checkPlayer });
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

          return check;
        },
        isRoundPlayable: (context) => {
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
        isAtLeastOnePlayerWithCard: (context) => {
          for (const player of context.players) {
            if (player.hand.length > 0) {
              return false;
            }
          }
          return true;
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
