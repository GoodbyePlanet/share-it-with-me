import bunyan from "bunyan";
import { ENVIRONMENT } from "../utils/config";

const log = bunyan.createLogger({name: "share-it-with-me"});

export const LoggerPlugin = {
  requestDidStart: (requestContext: any) => {
    if (requestContext.request.http?.headers.has('x-apollo-tracing')) {
      return;
    }
    const query = requestContext.request.query?.replace(/\s+/g, ' ').trim();
    const variables = ENVIRONMENT === "prod" ? "" : JSON.stringify(requestContext.request.variables);

    log.info(`- [Request Started] { query: ${query}, variables: ${variables}, operationName: ${requestContext.request.operationName} }`);
    return;
  },
  didEncounterErrors: (requestContext: any) => {
    console.log("INSIDE REQUEST CONTEXT...", requestContext);
  }
}