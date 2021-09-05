import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    const happy = await prisma.mood.upsert({
        where: { id: 1 },
        update: {},
        create: {
            name: 'happy',
        },
    })

    const sad = await prisma.mood.upsert({
        where: { id: 2},
        update: {},
        create: {
            name: 'sad',
        },
    })
    console.log({ happy, sad })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
