const { PrismaClient } = require('@prisma/client')

const prisma1 = new PrismaClient()
const prisma2 = new PrismaClient()

async function main() {
  const SLEEP = 20

  await prisma1.$connect()
  console.log(`1st connect`)
  prisma1
    .$executeRaw(`SELECT pg_sleep(${SLEEP});`)
    .then(() => {
      console.log('1st query returned')
    })
    .catch((e) => {
      console.log('1st query errored', e.toString())
    })
  console.log(`1st sleep ${SLEEP} query sent async`)

  await prisma2.$connect()
  console.log(`2nd connect`)
  prisma2
    .$executeRaw(`SELECT pg_sleep(${SLEEP});`)
    .then(() => {
      console.log('2nd query returned')
    })
    .catch((e) => {
      console.log('2nd query errored', e.toString())
    })
  console.log(`2nd sleep ${SLEEP} query sent async`)
}

main()
