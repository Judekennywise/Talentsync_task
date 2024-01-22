const express = require('express');
const router = express.Router();
const commentController = require("./../controller/comment.controller");
const authenticate = require("./../middleware/authenticate")



//API endpoint structure
/**
     * @openapi
     * '/api/{postId}/comments':
     *  post:
     *     tags:
     *     - Comment Controller
     *     summary: Create a comment
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - content
     *              
     *            properties:
     *              content:
     *                type: string
     *                default: Comment here
     *             
     *     responses:
     *      201:
     *        description: Created
     *      409:
     *        description: Conflict
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
router.post('/:postId/comments', authenticate.authenticate, commentController.createNewComment);

/**
     * @openapi
     * '/api/{postId}/comments':
     *  get:
     *     tags:
     *     - Comment Controller
     *     summary: Get comments under a post by id
     *     parameters:
     *      - name: postId
     *        in: path
     *        description: the id of the post
     *        required: true
     *     responses:
     *      200:
     *        description: Fetched Successfully
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
router.get('/:postId/comments', commentController.getComment);

/**
     * @openapi
     * '/api/comments/{commentId}':
     *  put:
     *     tags:
     *     - Comment Controller
     *     summary: Update a comment by id
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *
     *            properties:
     *              content:
     *                type: string
     *                default: ''
     *              
     *     parameters:
*           - name: commentId
*             in: path
*             description: the id of the comment
*             required: true
     *     responses:
     *      200:
     *        description: Modified
     *      400:
     *        description: Bad Request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
router.put('/comments/:commentId',authenticate.authenticate, commentController.updateComment);
/** DELETE Methods */
    /**
     * @openapi
     * '/api/comments/{commentId}':
     *  delete:
     *     tags:
     *     - Comment Controller
     *     summary: Delete a comment by Id
     *     parameters:
     *      - name: commentId
     *        in: path
     *        description: The unique Id of the comment
     *        required: true
     *     responses:
     *      200:
     *        description: Removed
     *      400:
     *        description: Bad request
     *      404:
     *        description: Not Found
     *      500:
     *        description: Server Error
     */
router.delete('/comments/:commentId', authenticate.authenticate, commentController.deleteComment);

module.exports = router;