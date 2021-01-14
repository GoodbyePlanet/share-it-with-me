import {createError} from "apollo-errors";

const WrongCredentials = createError("WrongCredentialsError", {
  message: "Provided credentials are invalid!"
});

export {WrongCredentials};