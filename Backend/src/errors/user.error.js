import { AppError } from "./customErrors.js";

class DuplicateEmailError extends AppError {
  constructor(message = "Email already exists") {
    super(message, "DUPLICATE_EMAIL", 400);
  }
}

class PasswordMismatchError extends AppError {
  constructor(message = "Passwords do not match") {
    super(message, "PASSWORD_MISMATCH", 400);
  }
}

class UserNotFoundError extends AppError {
  constructor(message = "User not found") {
    super(message, "USER_NOT_FOUND", 404);
  }
}

export { DuplicateEmailError, PasswordMismatchError, UserNotFoundError };
