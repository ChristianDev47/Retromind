import { CommentNotFoundError } from "../../errors/comment.error.js";
import Comment from "../../models/schemas/Comment.js";

export const commentResolvers = {
  Query: {
    getComments: async (root, { page, perPage, articleId }) => {
      page = page || 1;
      perPage = perPage || 10;
      const skip = (page - 1) * perPage;

      return await Comment.find(filter)
      .skip(skip) 
      .limit(perPage)  
      .populate('author')
      .populate('Comment');  
    },

    commentsCount: async (root, { articleId }) => {
      const count = await Comment.countDocuments({ article: articleId });
      return count;
    },

    commentReactionCount: async (root, args) => {
      const count = await Comment.countDocuments({ 'reactions.0': { $exists: true } });
      return count;
    }
  },
  Mutation: {
    addComment: async (root, args, context) => {
      try {
        const { currentUser } = context
        const comment = new Comment({...args, article: args.articleId, author: currentUser._id, createdAt: new Date().toISOString()});
        return await comment.save()
      } catch (error) {
        throw new Error("Failed to create comment.");
      }
    },

    updateComment: async (root, args) => {
      try {
        const comment = await Comment.findByIdAndUpdate(args.id, args, { new: true });
        if (!comment) throw new CommentNotFoundError();
        return comment;
      } catch (error) {
        throw new Error("Failed to update comment.");
      }
    },

    deleteComment: async (root, args) => {
      try {
        await Comment.findByIdAndDelete(args.id);
        return true;
      } catch (error) {
        if (error instanceof AppError) throw error;
        throw new Error("Failed to delete artcile.");
      }
    },

    addReactionToComment: async (root, args, context) => {
      try {
        const { currentUser } = context 
        const comment = await findById({id: args.commentId})
        if(!comment) throw new CommentNotFoundError()

        const existReaction = comment.reactions.find(react => react.user === currentUser._id )
        let reactions = []
        if(!existReaction){
          reactions = [...comment.reactions, {type: reactionType, user: currentUser._id }]
        }
        
        await Comment.findByIdAndUpdate(args.commentId, reactions, { new: true });
        return true;
      } catch (error) {
        if (error instanceof AppError) throw error;
        throw new Error("Failed to add comment.");
      }
    },

    removeReactionFromComment: async (root, args, context) => {
      try {
        const { currentUser } = context 
        const comment = await findById({id: args.commentId})
        if(!comment) throw new CommentNotFoundError()

        const existReaction = comment.reactions.filter(react => react.user !== currentUser._id )
        let reactions = []
        if(existReaction){
          reactions = [...existReaction]
        }
        
        await Comment.findByIdAndUpdate(args.commentId, reactions, { new: true });
        return true;
      } catch (error) {
        if (error instanceof AppError) throw error;
        throw new Error("Failed to add comment.");
      }
    },
  }
};
