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
  const user5 = await prisma.user.create({
    data: {
      username: 'user5',
      email: 'user5@example.com',
      passwordHash,
      birthDate: new Date(1998, 0, 1),
    },
  });

  const user6 = await prisma.user.create({
    data: {
      username: 'user6',
      email: 'user6@example.com',
      passwordHash,
      birthDate: new Date(2000, 0, 1),
    },
  });

  const user7 = await prisma.user.create({
    data: {
      username: 'user7',
      email: 'user7@example.com',
      passwordHash,
      birthDate: new Date(2002, 0, 1),
    },
  });

  const user8 = await prisma.user.create({
    data: {
      username: 'user8',
      email: 'user8@example.com',
      passwordHash,
      birthDate: new Date(2004, 0, 1),
    },
  });

  const user9 = await prisma.user.create({
    data: {
      username: 'user9',
      email: 'user9@example.com',
      passwordHash,
      birthDate: new Date(2006, 0, 1),
    },
  });

  const user10 = await prisma.user.create({
    data: {
      username: 'user10',
      email: 'user10@example.com',
      passwordHash,
      birthDate: new Date(2008, 0, 1),
    },
  });
  // Create rooms
  await prisma.room.create({
    data: {
      name: 'Room1',
      players: {
        connect: [{ id: user1.id }, { id: user2.id }, { id: user3.id }, { id: user4.id }],
      },
    },
  });
  await prisma.room.create({
    data: {
      name: 'Room2',
      players: {
        connect: [{ id: user5.id }, { id: user6.id }, { id: user7.id }],
      },
    },
  });

  await prisma.room.create({
    data: {
      name: 'Room3-Empty',
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
