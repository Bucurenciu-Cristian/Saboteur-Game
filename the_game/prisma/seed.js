const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('samplePassword', 10);

  // Create users
  const user1 = await prisma.user.create({
    data: {
      username: 'user1',
      email: 'user1@example.com',
      passwordHash,
      birthDate: new Date(1990, 0, 1),
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'user2',
      email: 'user2@example.com',
      passwordHash,
      birthDate: new Date(1992, 0, 1),
    },
  });
  const user3 = await prisma.user.create({
    data: {
      username: 'Kicky',
      email: 'bucurenciu.cristian@gmail.com',
      passwordHash,
      birthDate: new Date(1992, 0, 2),
    },
  });
  const user4 = await prisma.user.create({
    data: {
      username: 'Ioana',
      email: 'ioana.catana@ulbsibiu.ro',
      passwordHash,
      birthDate: new Date(1992, 0, 3),
    },
  });

  // Create rooms
  const room1 = await prisma.room.create({
    data: {
      name: 'Room1',
      players: {
        connect: { id: user1.id },
      },
    },
  });

  const room2 = await prisma.room.create({
    data: {
      name: 'Room2',
      players: {
        connect: { id: user2.id },
      },
    },
  });

  console.log('Seeding completed!');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
