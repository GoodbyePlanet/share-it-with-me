# Knowledge sharing application

## Get Started

### Install Prisma
```
npm install -g prisma
```

### Start application

```
npm install

npm start
```

## Start Prisma server
    > docker-compose up -d

## Deploy Prisma service
    > prisma deploy
    After successful Prisma deployment it is available on http://http://localhost:4466/_admin 
    
## After changing data model we need to manually to re-generate Prisma Client
    > prisma generate

## To reset Prisma database
    > prisma reset