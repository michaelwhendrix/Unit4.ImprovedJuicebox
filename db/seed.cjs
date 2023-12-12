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


    await prisma.post.createMany({
      data: [
          {
          title:   'Wise Guy, Eh?',
          content:   'This is not an abusive relationship.',
          authorId:   1,
          },
          {
          title:   'Personal Thoughts',
          content:   'I really like these guys... but',
          authorId:   2,
          },
          {
          title:   'I Am Hungry!',
          content:   'Nothing like a pastrami on rye sub.',
          authorId:   3,
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