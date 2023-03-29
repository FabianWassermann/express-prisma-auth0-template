# express-prisma-auth0-template

This is an [ExpressJS](https://expressjs.com/) REST API that uses [Prisma](https://www.prisma.io/) to connect to a MySQL database on PlanetScale.

## ✨ Tools, Tech and Platforms

- Prisma
- Express
- MySQL
- TypeScript
- PlanetScale

## Prerequisites

- Install Railway cli `npm i -g @railway/cli` ([Railway cli doc](https://docs.railway.app/develop/cli))
- Install PlanetScale cli ([PlanetScale cli install doc](https://github.com/planetscale/cli#installation))
- Login to Railway `railway login`
- Connect to Railway project with `railway link`
- Login to PlanetScale `pscale auth login`
- Install dependencies `yarn`

## Setup for development

- Create .env file containing following:

```
DATABASE_URL='mysql://127.0.0.1:3306/db-name'
```

## How to use

- Connect to development db for local usage without password `pscale connect db-name`
- Migrate the schema to database `yarn migrate:dev`
- Run the Server app `yarn run dev`
- View all the data in the database `yarn run data`

## 📝 Notes

coming soon
