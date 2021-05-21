import bunyan from "bunyan";

const log = bunyan.createLogger({name: "share-it-with-me"});

export const LoggerPlugin = {
  requestDidStart: (requestContext: any) => {
    if (requestContext.request.http?.headers.has('x-apollo-tracing')) {
      return;
    }
    const query = requestContext.request.query?.replace(/\s+/g, ' ').trim();
    const variables = JSON.stringify(requestContext.request.variables);

    log.info(`- [Request Started] { query: ${query}, variables: ${variables}, operationName: ${requestContext.request.operationName} }`);
    return;
  },
}