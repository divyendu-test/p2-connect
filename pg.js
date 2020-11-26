const pg = require('pg')

const pg1 = new pg.Client(
  `postgresql://root:prisma@localhost:6433/basic-blog?schema=public&pgbouncer=true`,
)
const pg2 = new pg.Client(
  `postgresql://root:prisma@localhost:6433/basic-blog?schema=public&pgbouncer=true`,
)

async function main() {
  const SLEEP = 20

  await pg1.connect()
  console.log(`1st connect`)
  pg1
    .query(`SELECT pg_sleep(${SLEEP});`)
    .then(() => {
      console.log('1st query returned')
    })
    .catch((e) => {
      console.log('1st query errored', e.toString())
    })
  console.log(`1st sleep ${SLEEP} query sent async`)

  await pg2.connect()
  console.log(`2nd connect`)
  pg2
    .query(`SELECT pg_sleep(${SLEEP});`)
    .then(() => {
      console.log('2nd query returned')
    })
    .catch((e) => {
      console.log('2nd query errored', e.toString())
    })
  console.log(`2nd sleep ${SLEEP} query sent async`)
}

main()
