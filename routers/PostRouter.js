const { getPosts, createPost, createComment, deletePost, likePost, getComments } = require('../controllers/PostController');

const postRouter = require('express').Router();

postRouter.get('', getPosts);
postRouter.post('', createPost);
postRouter.delete('/:id', deletePost);
postRouter.post('/:id/comment', createComment);
postRouter.put('/:id/like', likePost);
postRouter.get('/:id/comment',getComments);



module.exports = postRouter;
