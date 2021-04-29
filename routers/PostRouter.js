const { getPosts } = require('../controllers/PostController');

const postRouter = require('express').Router();

postRouter.get('', getPosts);





module.exports = postRouter;
