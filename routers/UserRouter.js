const userRouter = require('express').Router();

const { create, login, verify, getPosts, requestFriend } = require('../controllers/UserController');


userRouter.post('', create);

userRouter.post('/login', login);

userRouter.get('/verify', verify);

userRouter.get('/:id/post', getPosts);

userRouter.put('/:id/request', requestFriend);



module.exports = userRouter;
