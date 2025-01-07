import { Schema, model } from "mongoose";

// User Collection
const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  surname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Provide a valid email",
    ]
  },
  password: {
    type: String,
    require: true,
  },
  bio: {
    type: String,
    require: true,
  },
  profile_picture: {
    type: String
  },
  articles: [{
    type: Schema.Types.ObjectId, 
    ref: 'Article' 
  }],
  following: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  followers: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  verified: {
    type: Boolean,
    default: false
  },
  access_token: {
    type: String,
  },
  createdAt: {
    type: String
  },
  updatedAt: {
    type: String
  }
});

const User = model("User", userSchema);
export default User