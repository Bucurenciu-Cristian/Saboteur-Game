import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { roomId },
  } = req;
  let room;
  try {
    room = await prisma.room.findUnique({
      where: {
        id: parseInt(roomId, 10),
      },
      include: {
        players: true,
      },
    });

    if (!room) {
      res.status(404).json({ error: 'Room not found' });
      return;
    }

    res.status(200).json(room.players);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching players' });
  } finally {
    await prisma.$disconnect();
  }
}
