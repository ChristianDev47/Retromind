import { Schema, model } from "mongoose";

const articleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  views: { 
    type: Number, 
    default: 0 
  },
  visibility: {
    type: String,
    enum: ['public', 'private', 'followers'],
    default: 'public',
  },
  categories: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true 
  }],
  likes: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  comments: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Comment' 
  }],
  sharedLink: { 
    type: String 
  }, 
  createdAt: {
    type: String
  },
  updatedAt: {
    type: String
  }
});

const Article = model("Article", articleSchema);
export default Article