const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const createManyCategory = await prisma.category.createMany({
    data: [
      { name: 'Burger' },
      { name: 'Pizza' },
      { name: 'Shawrma' },
      { name: 'Juices' },
      { name: 'Snacks' },
    ],
    skipDuplicates: true, // Skip any dublicate unique fileds
  });
  const salt = await bcrypt.genSalt();
  const mainAdmin = await prisma.user.create({
    data: {
      email: 'samysubbah1@gmail.com',
      password: await bcrypt.hash(process.env.ADMIN_PASSWORD, salt),
      name: 'Sami Sabbah',
      location: 'Palestine-Gaza',
      role: 'ADMIN',
    },
  });
  console.log('Seeds: ', createManyCategory);
  console.log('MainAdmin: ', mainAdmin.name);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
