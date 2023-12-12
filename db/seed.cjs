const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const main = async() => {
    await prisma.user.createMany({
        data: [
            {
            username:   'Moe',
            password:   'Moe',
            },
            {
            username:   'Larry',
            password:   'Larry',
            },
            {
            username:   'Curley',
            password:   'Curley',
            },
    ]
    });
    console.log('SEEDED');
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })