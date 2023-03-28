import { PrismaClient } from '@prisma/client';
import { getRoom } from './disconnectRoom';

const prisma = new PrismaClient();

const joinRoom = async (socket, io, { roomId, userId }) => {
  roomId = Number(roomId);
  userId = Number(userId);
  const room = await prisma.room.findUnique({
    where: { id: roomId },
    include: { players: true },
  });

  if (room) {
    socket.join(getRoom(roomId));

    // Check if the user is already in the room
    const existingUserInRoom = room.players.find((player) => player.id === userId);

    // If the user is not in the room, add them
    if (!existingUserInRoom) {
      await prisma.room.update({
        where: { id: roomId },
        data: { players: { connect: { id: userId } } },
      });
    }

    const updatedRoom = await prisma.room.findUnique({
      where: { id: roomId },
      include: { players: true },
    });

    io.to(getRoom(roomId)).emit('updateRoom', updatedRoom);
  }
};
export default joinRoom;
