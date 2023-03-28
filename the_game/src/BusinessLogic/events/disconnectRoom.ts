import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export function getRoom(roomId: Number) {
  return `room-${roomId}`;
}

const disconnectRoom = async (socket, io, { roomId, userId }) => {
  // Update the user's roomId to null in the database, disconnecting them from the room
  roomId = Number(roomId);
  userId = Number(userId);
  await prisma.user.update({
    where: { id: userId },
    data: { roomId: null },
  });

  // Fetch the updated room information
  const updatedRoom = await prisma.room.findUnique({
    where: { id: roomId },
    include: { players: true },
  });

  // Check if the room is still available (not deleted) and has players in it
  if (updatedRoom && updatedRoom.players.length > 0) {
    // Broadcast the updated room information to all connected clients in that room
    io.to(getRoom(roomId)).emit('updateRoom', updatedRoom);
  } else {
    // If there are no players left in the room or the room is deleted, emit an event to the clients to leave the room
    io.to(getRoom(roomId)).emit('leaveRoom');

    // Optionally, you can delete the room from the database if there are no players left
    if (updatedRoom) {
      await prisma.room.delete({ where: { id: roomId } });
    }
  }
};
export default disconnectRoom;
