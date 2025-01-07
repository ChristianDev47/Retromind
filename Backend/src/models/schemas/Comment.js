import { Schema, model } from "mongoose";

const commentSchema = new Schema({
  content: { 
    type: String, 
    required: true 
  },
  reactions: [{
    type: { type: String, enum: ['like', 'love', 'laugh', 'angry', 'sad'], required: true }, 
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  }],
  author: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  article: { 
    type: Schema.Types.ObjectId, 
    ref: 'Article', 
    required: true 
  },
  replies: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Comment' 
  }],
  createdAt: {
    type: String
  },
  updatedAt: {
    type: String
  } 
});

const Comment = model("Comment", commentSchema);
export default Comment
