import { CategoryNotFoundError } from "../../errors/index.js";
import Category from "../../models/schemas/Category.js";

export const categoryResolvers = {
  Query: {
    getCategories: async (root, args) => {
      try {
        const categories = await Category.find()
        return categories || []
      } catch (error) {
        throw new Error("Failed to fetch user stats.");
      }
    }
  },

  Mutation: {
    createCategory: async (root, args) => {
      try {
        const category = new Category(args);
        return await category.save();
      } catch (error) {
        throw new Error("Failed to create category.");
      }
    },

    updateCategory: async (root, args) => {
      try {
        const user = await Category.findByIdAndUpdate(args.id, args, { new: true });
        if (!user) throw new CategoryNotFoundError();
        return user;
      } catch (error) {
        throw new Error("Failed to update user.");
      }
    },

    deleteUser: async (root, args) => {
      try {
        await Category.findByIdAndDelete(args.id);
        return true;
      } catch (error) {
        if (error instanceof AppError) throw error;
        throw new Error("Failed to delete user.");
      }
    }
  }
};
