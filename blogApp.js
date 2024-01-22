const express = require('express');


//import post router and user router
const postRouter = require('./router/post.router');
const userRouter = require('./router/user.router')
const commentRouter = require("./router/comment.router");

const app = express();

//add middleware to parse request body
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

//Middleware for API endpoints
app.use("/api", userRouter)
app.use("/api/posts", postRouter)
app.use("/api", commentRouter)

module.exports = app;