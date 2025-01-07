import { ApolloServerErrorCode } from '@apollo/server/errors';

class AppError extends Error {
  constructor(message, code = "INTERNAL_SERVER_ERROR", statusCode = 500) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
  }
}

// General errors
class AuthenticationError extends AppError {
  constructor(message = "Authentication failed") {
    super(message, ApolloServerErrorCode.BAD_REQUEST, 401);
  }
}

class ValidationError extends AppError {
  constructor(message = "Validation error") {
    super(message, ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED, 400);
  }
}

class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, ApolloServerErrorCode.BAD_USER_INPUT, 404);
  }
}

export { AppError, AuthenticationError, ValidationError, NotFoundError };
