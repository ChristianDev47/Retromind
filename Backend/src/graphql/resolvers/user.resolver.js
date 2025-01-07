import { AuthenticationError, DuplicateEmailError, UserNotFoundError, PasswordMismatchError } from "../../errors/index.js";
import { comparePasswords, hashPassword } from "../../utils/encryptPassword.js";
import Article from "../../models/schemas/Article.js";
import User from "../../models/schemas/User.js";
import jwt from "jsonwebtoken";
import CONFIG from "../../config/environment.js";

export const userResolvers = {
  Query: {
    me: (root, args, context) => {
      if (!context.currentUser) throw new AuthenticationError();
      return context.currentUser;
    },

    getUserStats: async (root, args, context) => {
      const { currentUser } = context;
      if (!currentUser) throw new AuthenticationError();
      try {
        const userId = currentUser.id;
        const [articlesCount, followersCount, followedCount, favoritesArticlesCount] = await Promise.all([
          Article.countDocuments({ author: userId }),
          User.countDocuments({ "following.id": userId }),
          User.countDocuments({ "followers.id": userId }),
          Article.countDocuments({ "likes.id": userId }),
        ]);

        return { articlesCount, followersCount, followedCount, favoritesArticlesCount };
      } catch (error) {
        throw new Error("Failed to fetch user stats.");
      }
    },

    getFollowers: async (root, { page = 1, perPage = 10 }, context) => {
      const { currentUser } = context;
      if (!currentUser) throw new AuthenticationError();

      try {
        return await User.find({ "following.id": currentUser.id })
          .skip((page - 1) * perPage)
          .limit(perPage);
      } catch (error) {
        throw new Error("Failed to fetch followers.");
      }
    },

    getFollowing: async (root, { page = 1, perPage = 10 }, context) => {
      const { currentUser } = context;
      if (!currentUser) throw new AuthenticationError();
      try {
        return await User.find({ "followers.id": currentUser.id })
          .skip((page - 1) * perPage)
          .limit(perPage);
      } catch (error) {
        throw new Error("Failed to fetch following users.");
      }
    },
  },

  Mutation: {
    createUser: async (root, args) => {
      try {
        const existingUser = await User.findOne({ email: args.email });
        if (existingUser) throw new DuplicateEmailError();

        const hashedPassword = await hashPassword(args.password);
        const user = new User({ ...args, password: hashedPassword, createdAt: new Date().toISOString() });
        const tokenPayload = { email: user.email, id: user._id };
        user.access_token = jwt.sign(tokenPayload, CONFIG.LOGIN.JWT_SECRET); 

        return await user.save()
      } catch (error) {
        throw new Error("Failed to create user.");
      }
    },

    updateUser: async (root, args) => {
      try {
        const user = await User.findByIdAndUpdate(args.id, args, { new: true });
        if (!user) throw new UserNotFoundError();
        return user;
      } catch (error) {
        throw new Error("Failed to update user.");
      }
    },

    deleteUser: async (root, { password }, context) => {
      const { currentUser } = context;
      if (!currentUser) throw new AuthenticationError();

      try {
        const isPasswordValid = comparePasswords(password, currentUser.password);
        if (!isPasswordValid) throw new PasswordMismatchError();

        await User.findByIdAndDelete(currentUser.id);
        return true;
      } catch (error) {
        if (error instanceof AppError) throw error;
        throw new Error("Failed to delete user.");
      }
    },

    login: async (root, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user || !comparePasswords(password, user.password)) {
          throw new AuthenticationError("Wrong credentials");
        }
  
        const tokenPayload = { email: user.email, id: user._id };
        const access_token = jwt.sign(tokenPayload, process.env.JWT_SECRET); 

        await User.findByIdAndUpdate(user.id, {access_token}, { new: true });
        return { value: access_token };
      } catch (error) {
        if (error instanceof AppError) throw error;
        throw new Error("Failed to log in.");
      }
    }
  }
};
