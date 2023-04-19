import { assign, createMachine, interpret } from 'xstate';
import preparationMachine from './PreparationGame';

const setPlayers = assign((context, event) => ({ players: event.data }));
assign((context, event) => ({ players: event.data }));
const setRoomId = assign({
  roomId: (_, event) => event.roomId,
});

function createRoomMachine(roomId) {
  const urlWebsite = `http://localhost:3050`;
  const roomMachine = createMachine(
    {
      predictableActionArguments: true,
      id: `room-${roomId}`,
      initial: 'room_id',
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
              target: 'prepareGame',
              cond: 'areThereEnoughPlayers',
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
              target: 'final',
              actions: ['updateParentContext'],
              cond: 'areThereEnoughPlayers',
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
        setPlayers,
        setRoomId,
      },
      services: {
        fetchPlayersFromDatabase: async (context) => {
          const { roomId: room_id } = context; // Get roomId from the event if necessary
          const response = await fetch(`${urlWebsite}/api/room/${room_id}/players`);
          const players = await response.json();
          return players;
        },
      },
      guards: {
        // Add guards here
        areThereEnoughPlayers: (context) => {
          console.log(context.players.length);
          return context.players.length >= 3;
        },
      },
    }
  );
  const roomService = interpret(roomMachine).start();
  roomService.send({ type: 'SET_ROOM_ID', roomId });
  return roomService;
}

export default createRoomMachine;
