# Knowledge sharing application

## Get Started

### Install Prisma
```
npm install -g prisma
```

### Start application

Example of `.env` file

```
PRISMA_ENDPOINT="http://localhost:4466/dev"
GRAPHQL_ENDPOINT=/graphql
GRAPHQL_SUBSCRIPTIONS=/subscriptions
GRAPHQL_PLAYGROUND=/playground
APP_SECRET=<app-secret>
```

```
npm install

npm start
```

## Start Postgres docker container
    > docker-compose up -d

## To connect to docker container from host machine
    >  psql postgresql://<user>:<password>@localhost:5432/share-it

## After changing data model we need to manually to re-generate Prisma Client
    > npx prisma migrate dev --name <name-of-the-migration> --preview-feature

## Whenever you make changes to your database that are reflected in the Prisma schema
    > npx prisma generate

## To reset Prisma database
    > prisma reset

## To add data from seed.graphql to the prisma service
    > npx prisma db seed --preview-feature

## To generate prisma data model based on existing database and the existing database model
    > prisma introspect

## GraphQL playground
    > http://localhost:8000/playground