import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { roomId } = req.query;

  if (req.method === 'GET') {
    try {
      const players = await prisma.user.findMany({
        where: { roomId: parseInt(roomId, 10) },
        select: {
          birthDate: true,
          email: true,
          roomId: true,
          id: true,
          username: true,
        },
      });
      if (!players) {
        res.status(404).json({ error: 'Room not found' });
        return;
      }
      res.status(200).json(players);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching players', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
