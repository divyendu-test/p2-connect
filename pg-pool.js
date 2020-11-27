const Pool = require('pg-pool')
const url = require('url')

const params = url.parse(
  `postgresql://root:prisma@localhost:6433/basic-blog?schema=public&pgbouncer=true`,
)
const auth = params.auth.split(':')

const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  ssl: false,
  min: 0,
  max: 1,
}

const pool1 = new Pool(config)
const pool2 = new Pool(config)

async function main() {
  const SLEEP = 20

  const client1 = await pool1.connect()
  console.log(`1st connect`)
  client1
    .query(`SELECT pg_sleep(${SLEEP});`)
    .then(() => {
      console.log('1st query returned')
    })
    .catch((e) => {
      console.log('1st query errored', e.toString())
    })
  console.log(`1st sleep ${SLEEP} query sent async`)

  const client2 = await pool2.connect()
  console.log(`2nd connect`)
  client2
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
