import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const getActiveGames = async (socket) => {
  // In your server-side code where you handle Socket.IO events
  console.log('getActiveGames');
  const playingRooms = await prisma.room.findMany({
    where: {
      gameState: 'PLAYING',
    },
    include: {
      players: true,
    },
  });
  socket.emit('updateActiveGames', playingRooms);
};
export default getActiveGames;
