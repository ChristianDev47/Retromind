import { userResolvers } from "./user.resolver.js";
import { articleResolvers } from "./article.resolver.js";
import { categoryResolvers } from "./category.resolver.js";

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...articleResolvers.Query,
    ...categoryResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...articleResolvers.Mutation,
    ...categoryResolvers.Mutation
  },
};
