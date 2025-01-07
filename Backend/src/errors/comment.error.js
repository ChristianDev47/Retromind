import { AppError } from "./customErrors.js";

class CommentNotFoundError extends AppError {
  constructor(message = "Category not found") {
    super(message, "CATEGORY_NOT_FOUND", 404);
  }
}

export { CommentNotFoundError };