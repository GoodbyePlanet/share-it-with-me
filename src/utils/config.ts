import * as dotenv from "dotenv";

dotenv.config();

let path: string;
switch (process.env.NODE_ENV) {
  case "production":
    path = `${__dirname}/../../.env.production`;
    break;
  default:
    path = `${__dirname}/../../.env.development`;
}

dotenv.config({path: path});

export const PORT = process.env.PORT;
export const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT;
export const GRAPHQL_SUBSCRIPTIONS = process.env.GRAPHQL_SUBSCRIPTIONS;
export const GRAPHQL_PLAYGROUND = process.env.GRAPHQL_PLAYGROUND;
export const APP_SECRET = process.env.APP_SECRET;
