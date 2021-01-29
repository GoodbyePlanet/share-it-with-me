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

## Start Prisma server
    > docker-compose up -d

## Deploy Prisma service
    > prisma deploy

## After changing data model we need to manually to re-generate Prisma Client
    > prisma generate

## To reset Prisma database
    > prisma reset

## To add data from seed.graphql to the prisma service
    > prisma seed -e .env

## To generate prisma data model based on existing database and the existing database model
    > prisma introspect

## GraphQL playground
    > http://localhost:8000/playground

## Prisma Admin playground
    > http://localhost:4466/dev/_admin