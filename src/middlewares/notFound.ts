import {MiddlewareFn} from "type-graphql";
import {Context} from "../context";
import {UserNotFoundError} from "../errorHandling";

export const NotFound: MiddlewareFn<Context> = async ({args, info}, next) => {
  const result = await next();

  if (!result) {
    console.log(`Logging --> ${info.returnType} not found. Query: ${info.fieldName} with argument ${JSON.stringify(args)}`);
    throw UserNotFoundError;
  }

  return result;
};