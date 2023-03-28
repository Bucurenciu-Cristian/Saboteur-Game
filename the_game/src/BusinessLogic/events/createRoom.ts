import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const CreateRoom = async (socket, io, { userId, roomName }) => {
  const newRoom = await prisma.room.create({
    data: {
      name: roomName,
      players: {
        connect: {
          id: userId,
        },
      },
    },
  });

  // Optionally, you can emit an event to update the lobby with the new room
  const waitingRooms = await prisma.room.findMany({
    where: {
      gameState: 'WAITING',
    },
    include: {
      players: true,
    },
  });
  io.emit('updateRooms', waitingRooms);

  // Send the new room ID back to the client
  socket.emit('roomCreated', newRoom.id);
};
export default CreateRoom;
