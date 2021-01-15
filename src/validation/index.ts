import {createError} from "apollo-errors";

const WrongCredentialsError = createError("WrongCredentialsError", {
  message: "Provided credentials are invalid!"
});

const UserNotFoundError = createError("UserNotFoundError", {
  message: "User not found!"
})

const AuthenticationError = createError("AuthenticationError", {
  message: "Not Authenticated!"
})

export {WrongCredentialsError, UserNotFoundError, AuthenticationError};