import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default async (req, res) => {
  const { roomId } = req.query;

  if (req.method === 'GET') {
    try {
      const players = await prisma.user.findMany({
        where: { roomId: parseInt(roomId, 10) },
      });

      res.status(200).json(players);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching players', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};