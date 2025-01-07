import { ApolloError } from "@apollo/server/errors";
import { ApolloServerErrorCode } from "@apollo/server/errors";

// Error de autenticación
export const throwAuthenticationError = (message = "Not Authenticated") => {
  throw new ApolloError(message, ApolloServerErrorCode.UNAUTHENTICATED);
};

// Error de entrada del usuario
export const throwUserInputError = (message, invalidArgs) => {
  throw new ApolloError(message, ApolloServerErrorCode.BAD_USER_INPUT, { invalidArgs });
};

// Error genérico de base de datos
export const throwDatabaseError = (message = "Database Error") => {
  throw new ApolloError(message, "DATABASE_ERROR");
};
// Otros errores específicos pueden definirse aquí
export const throwForbiddenError = (message = "Access Denied") => {
  throw new ApolloError(message, ApolloServerErrorCode.FORBIDDEN);
};
