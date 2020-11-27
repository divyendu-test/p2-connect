# Prisma + \$connect

## Setup:

- Prisma with PgBouncer (MAX_CLIENT_CONN=2) in front of a Postgres (max_connections=1)
- Workload, we attempt to make 2 connections and run a "sleep 20" query with each connection. The query is run async.

- To see query logs
  - Get Postgres docker `<container-id>` from `docker ps`
  - docker logs `<container-id>` -f

## To Reproduce:

- Run `docker-compose up -d`
- Run `node index.js`

Expected output:

```
1st connect
1st sleep 20 query sent async
2nd connect
2nd sleep 20 query sent async
1st query returned
2nd query returned
```

Actual output:

```
1st connect
1st sleep 20 query sent async
1st query returned
2nd connect
2nd sleep 20 query sent async
2nd query returned
```

- Run `node pg.js` => It yields the expected output mentioned above
