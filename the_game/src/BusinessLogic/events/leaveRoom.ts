import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const leaveRoom = async (socket, io, { roomId, userId }) => {
  roomId = Number(roomId);
  userId = Number(userId);

  const room = await prisma.room.findUnique({
    where: { id: roomId },
    include: { players: true },
  });

  if (room) {
    // Check if the user is in the room
    const existingUserInRoom = room.players.find((player) => player.id === userId);

    // If the user is in the room, disconnect them
    if (existingUserInRoom) {
      await prisma.room.update({
        where: { id: roomId },
        data: { players: { disconnect: { id: userId } } },
      });
    }

    socket.leave(`room-${roomId}`);

    const updatedRoom = await prisma.room.findUnique({
      where: { id: roomId },
      include: { players: true },
    });

    io.to(`room-${roomId}`).emit('updateRoom', updatedRoom);
  }
};

export default leaveRoom;
