import { Schema, model } from "mongoose";

const categorieSchema = new Schema({
  name: {
    type: String,
    required: true,
  }

});

const Category = model("Category", categorieSchema);
export default Category