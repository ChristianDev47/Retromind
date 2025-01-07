import { ArticleNotFoundError } from "../../errors/article.error.js";
import Article from "../../models/schemas/Article.js";

export const articleResolvers = {
  Query: {
    getArticles: async (root, { page, perPage, sortBy, visibility, userId, categoryId }) => {
      page = page || 1;
      perPage = perPage || 10;
      sortBy = sortBy || 'latest';
      visibility = visibility || 'public';

      const skip = (page - 1) * perPage;

      let filter = { visibility };
      if (userId) filter.author = userId;
      if (categoryId) filter.categories = { $in: [categoryId] };

      let articlesQuery = Article.find(filter).skip(skip).limit(perPage);

      if (sortBy === 'latest') {
        articlesQuery = articlesQuery.sort({ createdAt: -1 });  
      } else if (sortBy === 'popular') {
        articlesQuery = articlesQuery.sort({ likesCount: -1 }); 
      } else if (sortBy === 'relevant') {
        articlesQuery = articlesQuery.sort({ views: -1 });  
      }

      return await Article.find(filter)
      .skip(skip) 
      .limit(perPage)  
      .populate('author')  
      .populate('categories') 
      .populate('likes');  
    },

    articlesCount: async (root, { filter }) => {
      let queryFilter = {};
      if (filter) queryFilter = { visibility: filter };
      const count = await Article.countDocuments(queryFilter);
      return count;
    },

    likesArticlesCount: async (root, ars) => {
      const count = await Article.countDocuments({ 'likes.0': { $exists: true } });
      return count;
    }
  },
  Mutation: {
    createArticle: async (root, args, context) => {
      try {
        const { currentUser } = context
        const article = new Article({...args, author: currentUser._id, createdAt: new Date().toISOString()});
        return await article.save()
      } catch (error) {
        throw new Error("Failed to create article.");
      }
    },

    updateArticle: async (root, args) => {
      try {
        const article = await Article.findByIdAndUpdate(args.id, args, { new: true });
        if (!article) throw new ArticleNotFoundError();
        return article;
      } catch (error) {
        throw new Error("Failed to update article.");
      }
    },

    deleteArticle: async (root, args) => {
      try {
        await Article.findByIdAndDelete(args.id);
        return true;
      } catch (error) {
        if (error instanceof AppError) throw error;
        throw new Error("Failed to delete artcile.");
      }
    },
  }
};
