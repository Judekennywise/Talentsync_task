const express = require('express');
const router = express.Router();
const Post = require('../model/Post.model');
const Comment = require('../model/Comment.model');

// Create a new comment for a post
exports.createNewComment = async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      let { firstname, lastname } = req.user;
      let author = `${firstname} ${lastname}`;
      let authorId = req.user._id;
      let postId = post._id;
      const newComment = new Comment({
        content: req.body.content,
        author,
        authorId,
        postId
      });
  
      const savedComment = await newComment.save();
      post.comments.push(savedComment);
      await post.save();
  
      res.status(201).json(savedComment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Get comments for a post
  exports.getComment = async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId).populate('comments');
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      res.json(post.comments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Update a comment
  exports.updateComment = async (req, res) => {
    try {
      const updatedComment = await Comment.findByIdAndUpdate(
        req.params.commentId,
        { content: req.body.content },
        { new: true }
      );
  
      if (!updatedComment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
  
      res.json(updatedComment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Delete a comment
  exports.deleteComment = async (req, res) => {
    try {
      const deletedComment = await Comment.findByIdAndDelete(req.params.commentId);
  
      if (!deletedComment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
  
      // Remove the comment reference from the post
      await Post.updateOne({ comments: req.params.commentId }, { $pull: { comments: req.params.commentId } });
  
      res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };