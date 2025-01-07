import { unwrapResolverError } from '@apollo/server/errors';

export const errorHandler = (error) => {
  const originalError = unwrapResolverError(error);

  if (originalError instanceof Error && 'statusCode' in originalError) {
    return {
      message: originalError.message,
      code: originalError.code,
      statusCode: (originalError).statusCode,
    };
  }

  return {
    message: error.message,
    code: error.extensions?.code || "INTERNAL_SERVER_ERROR",
    statusCode: 500,
  };
};
