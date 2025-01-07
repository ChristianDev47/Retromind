import { AppError } from "./customErrors.js";

class ArticleNotFoundError extends AppError {
  constructor(message = "Article not found") {
    super(message, "ARTICLE_NOT_FOUND", 404);
  }
}

export { ArticleNotFoundError };
