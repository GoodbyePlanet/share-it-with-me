import {createError} from "apollo-errors";

const WrongCredentialsError = createError('WrongCredentialsError', {
  message: 'Provided credentials are invalid!'
});

const UserNotFoundError = createError('UserNotFoundError', {
  message: 'User not found!'
});

const AuthenticationError = createError('AuthenticationError', {
  message: 'Not Authenticated!'
});

const UserAlreadyExistsError = createError('UserAlreadyExistsError', {
  message: 'Email already taken!'
});

export {WrongCredentialsError, UserNotFoundError, AuthenticationError, UserAlreadyExistsError};