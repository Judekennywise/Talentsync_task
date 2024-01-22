const mongoose = require("mongoose");

//Define schema
const PostSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: [true, "A Blog Post must have a title"],
      },
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
      tags: [String],
      readCount: {
        type: Number,
        default: 0,
      },
     
      state: {
        type: String,
        enum: ["draft", "published"],
        default: "published",
      },
      
      readTime: {
        type: String,
      },
      comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Comment',
        },
      ],
    
      timestamps : { 
        type: Date, 
        default: Date.now }
      });
  const Post = mongoose.model("Post", PostSchema);
  module.exports = Post;