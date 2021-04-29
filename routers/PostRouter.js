const { getPosts, createPost, createComment, deletePost } = require('../controllers/PostController');

const postRouter = require('express').Router();

postRouter.get('', getPosts);
postRouter.post('', createPost);
postRouter.delete('/:id', deletePost);
postRouter.post('/:id/comment', createComment);



module.exports = postRouter;
