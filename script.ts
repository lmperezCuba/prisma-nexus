import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// A `main` function so that you can use async/await
async function main() {
  // app.log.info('hello world')
  // ... you will write your Prisma Client queries here
  /*
    await prisma.country.create({
      data: {
        name: "None",
        code_iso_alpha3: "NON",
        code_m49: "200",
        province: {
          create: {
            code: "na",
            name: "nn"
          }
        }
      }
    });
  */
/*
  const allUsers = await prismaClient.country.findMany({
    orderBy: { created_at: 'desc' },
    include: { province: true },
    where: { code_iso_alpha3: { contains: 'CUB' } }
  })*/
  // console.log('Running scripts.')
  // console.log(allUsers)
  // console.dir(allUsers, { depth: null })
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.disconnect()
  })
