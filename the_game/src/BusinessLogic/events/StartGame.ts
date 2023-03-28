import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const startGame = async (roomId) => {
  const updatedRoom = await prisma.room.update({
    where: { id: parseInt(roomId, 10) },
    data: { gameState: 'PLAYING' },
  });
  return updatedRoom;
};
export default startGame;
