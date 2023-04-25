import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
import { NextApiRequest, NextApiResponse } from 'next';
import joinLobby from '../../src/BusinessLogic/events/joinLobby';
import joinRoom from '../../src/BusinessLogic/events/joinRoom';
import leaveRoom from '../../src/BusinessLogic/events/leaveRoom';
import disconnectRoom, { getRoom } from '../../src/BusinessLogic/events/disconnectRoom';
import createRoom from '../../src/BusinessLogic/events/createRoom';
import getActiveGames from '../../src/BusinessLogic/events/getActiveGames';
import startGame from '../../src/BusinessLogic/events/StartGame';
import createRoomMachine from '../../src/Types/Xstate/Back-end/main-back-machine';

// Here you are on the back-end side:
// const serverService = interpret(parentMachine).start();

const roomMachines = new Map();

function setupRoomMachineOnTransition(roomMachine, roomId, io1) {
  roomMachine.onTransition((state) => {
    if (state.changed) {
      console.log('State changed to:', state.value);
      io1.to(roomId).emit('GAME_STATE_UPDATE', state.context);
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
        io.to(roomId).emit('GAME_STATE_UPDATE', roomMachine.state.context);
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
