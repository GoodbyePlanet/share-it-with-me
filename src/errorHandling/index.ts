import {ForbiddenError, UserInputError} from "apollo-server";
import {GraphQLError,} from 'graphql';

const WrongCredentialsError = new UserInputError("Provided credentials are invalid!");

const UserNotFoundError = new UserInputError("User not found!");

const UserAlreadyExistsError = new UserInputError("User already exists!");

const formatError = (error: GraphQLError): GraphQLError => {
  if (error.message.startsWith("Access denied")) {
    return new ForbiddenError("Access denied, you don't have permission on this action!");
  }
  return error;
}

export {formatError, UserNotFoundError, WrongCredentialsError, UserAlreadyExistsError};