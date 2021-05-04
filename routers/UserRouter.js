const userRouter = require('express').Router();

const { create, login, verify, getPosts, requestFriend, getFriends, getFriendRequest } = require('../controllers/UserController');


userRouter.post('', create);

userRouter.post('/login', login);

userRouter.get('/verify', verify);

userRouter.get('/:id/post', getPosts);

userRouter.put('/:id/request', requestFriend);

userRouter.get('/request', getFriendRequest);

userRouter.get('/friend', getFriends);



module.exports = userRouter;
