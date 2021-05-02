const userRouter = require('express').Router();

const { create, login, verify, getPosts } = require('../controllers/UserController');


userRouter.post('', create);

userRouter.post('/login', login);

userRouter.get('/verify', verify);

userRouter.get('/:id/post', getPosts);



module.exports = userRouter;
