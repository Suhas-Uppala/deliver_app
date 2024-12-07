import { Schema, model } from "mongoose";

const PostmanSchema = new Schema({
  postman_id: String,
  password: String,
});

export default model("Postman", PostmanSchema);
