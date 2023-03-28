import { Server } from 'socket.io';
import fs from 'fs';
import joinLobby from '../../src/BusinessLogic/events/joinLobby';
import joinRoom from '../../src/BusinessLogic/events/joinRoom';
import leaveRoom from '../../src/BusinessLogic/events/leaveRoom';
import disconnectRoom, { getRoom } from '../../src/BusinessLogic/events/disconnectRoom';
import createRoom from '../../src/BusinessLogic/events/createRoom';
import getActiveGames from '../../src/BusinessLogic/events/getActiveGames';
import startGame from '../../src/BusinessLogic/events/StartGame';

// Here you are on the back-end side:
// You have to restart the server for the changes to take effect
const SocketHandler = (req, res) => {
  if (!res.socket.server.io) {
    console.log('Socket is initializing');
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
    io.on('connection', (socket) => {
      console.log('User connected through socket ->', socket.rooms);
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
      socket.on('disconnect', (reason) => {
        console.log(`socket ${socket.id} disconnected due to ${reason}`);
      });
    });
    // const dataFolder = 'data';
    // const jsonFilePath = path.join(process.cwd(), dataFolder, 'example.json');
    // Watch for changes in the JSON file and emit the updated content to clients
    // watchAJsonFile(jsonFilePath, io, eventJsonData);
  }
  res.end();
};

export default SocketHandler;

const eventJsonData = 'update-json-data';
const eventNameClient = 'update-input';

const inputChange = 'input-change';
const jsonDataChange = 'json-data-change';

function watchAJsonFile(jsonFilePath, io, eventNameClient) {
  fs.watch(jsonFilePath, (eventType, filename) => {
    if (eventType === 'change') {
      let updatedJsonData = fs.readFileSync(jsonFilePath, 'utf8');
      try {
        updatedJsonData = JSON.parse(updatedJsonData);
        io.emit(eventNameClient, updatedJsonData); // Emit the event if the JSON data is valid
      } catch (error) {
        console.error('Invalid JSON data:', error.message);
      }
    }
  });
}

function eventServerToClient(socket: Socket, eventNameServer: any, eventNameClient: any) {
  socket.on(eventNameServer, (msg) => {
    socket.broadcast.emit(eventNameClient, msg);
  });
}

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}
