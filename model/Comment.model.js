const mongoose = require("mongoose");

//Define schema
const CommentSchema = new mongoose.Schema(
    {
      author: {
        type: String,
        required: true,
      },
      authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      
      content: {
        type: String,
        required: [true, "A Blog Post must contain a content"],
      },
      post: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Post"
      },
    },
    { timestamps: true }
  );
  const Comment = mongoose.model("Comment", CommentSchema);
  module.exports = Comment;