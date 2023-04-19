import { Server } from 'socket.io';
import { instrument } from '@socket.io/admin-ui';
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

function getOrCreateRoomMachine(roomId: number) {
  if (roomMachines.has(roomId)) {
    console.log('Room machine already exists');
    return roomMachines.get(roomId);
  }
  const newRoomMachine = createRoomMachine(roomId);
  console.log('Room machine created');
  roomMachines.set(roomId, newRoomMachine);
  return newRoomMachine;
}

let connectedSockets = 0;

// Here you are on the back-end side:
// You have to restart the server for the changes to take effect
const SocketHandler = (req, res) => {
  if (!res.socket.server.io) {
    console.log('Socket is initializing');
    const optionsServer = {
      cors: {
        // origin: ['http://localhost:3050', 'https://admin.socket.io/#/', 'https://admin.socket.io/'], // This allows any origin to connect. You can replace '*' with your specific origins.
        origin: ['https://admin.socket.io'],
        // methods: ['GET', 'POST'], // Allowed methods
        // allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
        credentials: true, // This allows cookies to be sent along with requests
      },
    };
    const io = new Server(res.socket.server, optionsServer);
    const optionsInstrument = {
      auth: false,
      mode: 'development',
    };
    instrument(io, optionsInstrument);
    const adminNamespace = io.of('/admin');
    res.socket.server.io = io;
    io.on('connection', (socket) => {
      connectedSockets++;
      console.log('User connected through socket ->', socket.rooms);
      console.log('Number of connected sockets:', connectedSockets);

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

        console.log(`socket ${socket.id} joined room ${roomId}`);
        if (io.sockets.adapter.rooms.has(roomId)) {
          console.log(`Room ${roomId} has ${io.sockets.adapter.rooms.get(roomId).size} sockets`);
        }

        const roomMachine = getOrCreateRoomMachine(roomId);
        io.to(roomId).emit('GAME_STATE_UPDATE', roomMachine.state.context);

        roomMachine.onTransition((state) => {
          if (state.changed) {
            console.log('State changed to:', state.value);
            // console.log('New context:', state.context);
            io.to(roomId).emit('GAME_STATE_UPDATE', state.context);
          }
        });
      });

      socket.on('disconnect', (reason) => {
        console.log(`socket ${socket.id} disconnected due to ${reason}`);
        connectedSockets--;
        console.log('Number of connected sockets:', connectedSockets);
      });
    });
  }
  res.end();
};

export default SocketHandler;
