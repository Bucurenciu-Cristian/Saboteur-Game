const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function createUser(username, email, birthDate, passwordHash) {
  return prisma.user.create({
    data: {
      username,
      email,
      passwordHash,
      birthDate,
    },
  });
}

async function createRoom(name, userIds) {
  return prisma.room.create({
    data: {
      name,
      players: {
        connect: userIds.map((id) => ({ id })),
      },
    },
  });
}

// Real user data
const userData = [
  {
    username: 'Alice',
    email: 'alice@example.com',
    birthDate: new Date(1990, 0, 1),
  },
  {
    username: 'Bob',
    email: 'bob@example.com',
    birthDate: new Date(1992, 0, 1),
  },
  {
    username: 'Charlie',
    email: 'charlie@example.com',
    birthDate: new Date(1993, 5, 15),
  },
  {
    username: 'Diana',
    email: 'diana@example.com',
    birthDate: new Date(1989, 3, 28),
  },
  {
    username: 'Eva',
    email: 'eva@example.com',
    birthDate: new Date(1995, 7, 12),
  },
  {
    username: 'Frank',
    email: 'frank@example.com',
    birthDate: new Date(1991, 11, 24),
  },
  {
    username: 'Grace',
    email: 'grace@example.com',
    birthDate: new Date(1988, 6, 7),
  },
  {
    username: 'Henry',
    email: 'henry@example.com',
    birthDate: new Date(1996, 2, 20),
  },
  {
    username: 'Iris',
    email: 'iris@example.com',
    birthDate: new Date(1997, 10, 8),
  },
  {
    username: 'Jack',
    email: 'jack@example.com',
    birthDate: new Date(1994, 8, 30),
  },
];

async function main() {
  const passwordHash = await bcrypt.hash('samplePassword', 10);

  // Create users
  const users = [];
  for (const user of userData) {
    const createdUser = await createUser(user.username, user.email, user.birthDate, passwordHash);
    users.push(createdUser);
  }

  // Calculate the number of rooms needed
  const usersPerRoom = 5;
  const numRooms = Math.ceil(users.length / usersPerRoom);

  // Create rooms
  for (let i = 1; i <= numRooms; i++) {
    const roomName = `Room${i}`;
    const userIds = users.slice((i - 1) * usersPerRoom, i * usersPerRoom).map((user) => user.id);
    await createRoom(roomName, userIds);
  }

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
