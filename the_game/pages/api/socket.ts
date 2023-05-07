import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import { NextApiRequest, NextApiResponse } from 'next';
import { checkTheCurrentCardInTable } from '@engine/CheckTheCurrentCardInTable';
import { IMatrix } from '@src/Types/DexType';
import { Modes } from '@src/enums';
import joinLobby from '../../src/BusinessLogic/events/joinLobby';
import joinRoom from '../../src/BusinessLogic/events/joinRoom';
import leaveRoom from '../../src/BusinessLogic/events/leaveRoom';
import disconnectRoom, { getRoom } from '../../src/BusinessLogic/events/disconnectRoom';
import createRoom from '../../src/BusinessLogic/events/createRoom';
import getActiveGames from '../../src/BusinessLogic/events/getActiveGames';
import startGame from '../../src/BusinessLogic/events/StartGame';
import createRoomMachine from '../../src/Types/Xstate/Back-end/main-back-machine';
import { getCardCondition } from '../game/[gameId]';

// Here you are on the back-end side:
// const serverService = interpret(parentMachine).start();

const roomMachines = new Map();

function removeCodeFromCards(matrix: IMatrix[][]): IMatrix[][] {
  return matrix.map((row) =>
    row.map((cell) => {
      if (cell.Card !== '#' && 'code' in cell.Card) {
        const { code, ...cardWithoutCode } = cell.Card;
        return { ...cell, Card: cardWithoutCode };
      }
      return cell;
    })
  );
}

function setupRoomMachineOnTransition(roomMachine, roomId, io1) {
  roomMachine.onTransition((state) => {
    if (state.changed) {
      console.log('State changed to:', state.value);
      io1.to(roomId).emit('GAME_STATE_UPDATE', { context: state.context, value: state.value });
      console.log('State sent to clients');
      // console.log('State event:', state.event);
    }
  });
}

function getOrCreateRoomMachine(roomId: number, io) {
  if (roomMachines.has(roomId)) {
    return roomMachines.get(roomId);
  }
  const newRoomMachine = createRoomMachine(roomId);
  console.log('Room machine created');
  roomMachines.set(roomId, newRoomMachine);
  setupRoomMachineOnTransition(newRoomMachine, roomId, io);
  return newRoomMachine;
}

const getValidCoordinatesForCard = (card, availablePaths, gameBoard) => {
  const validCoordinates = [];
  // Logic to determine if the card can be placed at each coordinate in availablePaths
  // If the card can be placed at a coordinate, push the coordinate to the validCoordinates array
  for (const availablePath of availablePaths) {
    const { row, column } = availablePath;
    const cardCanBePlaced = checkTheCurrentCardInTable({ matrix: gameBoard, row, column, card, simulation: true });
    if (cardCanBePlaced) {
      validCoordinates.push(availablePath);
    }
  }

  return validCoordinates;
};
// Here you are on the back-end side:
// You have to restart the server for the changes to take effect
const SocketHandler = (req: NextApiRequest, res: NextApiResponse) => {
  if (!res.socket.server.io) {
    console.log('Socket is initializing');
    const optionsServer = {
      cors: {
        origin: ['https://admin.socket.io'],
        credentials: true, // This allows cookies to be sent along with requests
      },
    };
    const io = new Server(res.socket.server, optionsServer);
    const optionsInstrument = {
      auth: false,
      mode: 'development',
    };
    instrument(io, optionsInstrument);
    res.socket.server.io = io;
    io.on('connection', (socket) => {
      // console.log('User connected through socket ->', socket.rooms);
      const assignSocketName = (roomId: number) => {
        const room = io.sockets.adapter.rooms.get(roomId);
        const roomSize = room.size;
        const socketName = `S-${roomId}-${roomSize}`; // Modify this format as needed
        socket.namePlayer = socketName;
      };

      /*
       * This is related to joining the GAME.
       */
      socket.on('joinLobby', () => joinLobby(socket));
      socket.on('joinRoom', (data) => joinRoom(socket, io, data));
      socket.on('leaveRoom', (data) => leaveRoom(socket, io, data));
      socket.on('disconnectRoom', (data) => disconnectRoom(socket, io, data));
      socket.on('createRoom', (data) => createRoom(socket, io, data));
      socket.on('getActiveGames', () => getActiveGames(socket));

      socket.on('startGame', async ({ roomId }) => {
        await startGame(roomId);
        // You can emit an event to inform clients about the updated room, if necessary
        // For example, you can update the room state for all players in the room
        io.to(getRoom(roomId)).emit('gameStarted', { roomId });
      });

      socket.on('join', (roomId) => {
        socket.join(roomId);
        assignSocketName(roomId); // Assign a custom name to the socket when it joins a room

        if (io.sockets.adapter.rooms.has(roomId)) {
          console.log(`${socket.namePlayer} connected`);
        }

        const roomMachine = getOrCreateRoomMachine(roomId, io);
        io.to(roomId).emit('GAME_STATE_UPDATE', { context: roomMachine.state.context, value: roomMachine.state.value });
      });

      socket.on('passTurn', (roomIdObj) => {
        const { gameId: roomId, handIndex } = roomIdObj;
        const roomMachine = getOrCreateRoomMachine(roomId, io);
        roomMachine.send({ type: 'PASS', payload: { handIndex } });
      });

      socket.on('placeCard', (roomIdObj) => {
        const { gameId: roomId } = roomIdObj;
        const roomMachine = getOrCreateRoomMachine(roomId, io);
        roomMachine.send({ type: 'PLAY_PATH_CARD', payload: roomIdObj });
      });

      socket.on('placeActionOnTable', (roomIdObj) => {
        const { gameId: roomId } = roomIdObj;
        const roomMachine = getOrCreateRoomMachine(roomId, io);
        roomMachine.send({ type: 'PLAY_ACTION_CARD_MYSELF', payload: roomIdObj });
      });

      socket.on('selectCard', (roomIdObj) => {
        const { gameId, card } = roomIdObj;
        const roomMachine = getOrCreateRoomMachine(gameId, io);
        if (roomMachine.state.value === 'score') return;

        const { gameBoard } = roomMachine.state.context;
        let validCoordinates = [];
        if (getCardCondition(card, 2, Modes.Map)) {
          const { finishCards } = roomMachine.state.context;
          console.log('finishCards', finishCards);
          validCoordinates = finishCards.map((card) => ({ row: card[0], column: card[1] }));
        } else if (getCardCondition(card, 2, Modes.Destroy)) {
          const { finishCards, startCard } = roomMachine.state.context;

          // Iterate over the whole board and give me the coordinates of the cards that can be destroyed, which is any occupied card
          validCoordinates = [];
          // Iterate through each row
          for (let row = 0; row < gameBoard.length; row += 1) {
            // Iterate through each column
            for (let col = 0; col < gameBoard[row].length; col += 1) {
              // Check if the current cell is occupied
              if (gameBoard[row][col]?.Occupied) {
                // Check if the current cell is not the startCard and not a finishCard
                const isStartCard = startCard[0][0] === row && startCard[0][1] === col;
                const isFinishCard = finishCards.some((finishCard) => finishCard[0] === row && finishCard[1] === col);

                if (!isStartCard && !isFinishCard) {
                  validCoordinates.push({ row, column: col });
                }
              }
            }
          }
        } else {
          const { availablePaths } = roomMachine.state.context;
          validCoordinates = getValidCoordinatesForCard(card, availablePaths, gameBoard);
        }
        socket.emit('validCoordinates', { valid: validCoordinates, card });
      });

      socket.on('startNewGame', (roomIdObj) => {
        const { gameId: roomId } = roomIdObj;
        const roomMachine = getOrCreateRoomMachine(roomId, io);
        roomMachine.send({ type: 'NEXT_ROUND' });
      });
      socket.on('actionTurnOthers', (roomIdObj) => {
        const { gameId: roomId } = roomIdObj;
        const roomMachine = getOrCreateRoomMachine(roomId, io);
        roomMachine.send({ type: 'PLAY_ACTION_CARD_OTHERS', payload: roomIdObj });
      });

      socket.on('disconnecting', (reason) => {
        for (const room of socket.rooms) {
          if (room !== socket.id) {
            socket.to(room).emit('leftRoom');
            console.log(`user has left ${socket.namePlayer} because off this ->`, reason);
          }
        }
      });
      socket.on('disconnect', (reason) => {
        console.log(`socket ${socket.id} disconnected due to ${reason}`);
      });
    });
  }
  res.end();
};

export default SocketHandler;
