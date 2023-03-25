import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const JoinLobby = async (socket) => {
  console.log('joinLobby');
  const waitingRooms = await prisma.room.findMany({
    where: {
      gameState: 'WAITING',
    },
    include: {
      players: true,
    },
  });

  socket.emit('updateRooms', waitingRooms);
};

export default JoinLobby;
