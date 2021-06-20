const userRouter = require('express').Router();

const { create, login, verify, getPosts, requestFriend, getFriends, getFriendRequest, message, getMessages } = require('../controllers/UserController');


userRouter.post('', create);

userRouter.post('/login', login);

userRouter.get('/verify', verify);

userRouter.get('/:id/post', getPosts);

userRouter.put('/:id/request', requestFriend);

userRouter.get('/request', getFriendRequest);

userRouter.get('/:id/friend', getFriends);

userRouter.get('/:id/message', getMessages);

userRouter.post('/:id/message', message);

userRouter.get('/connect', (req,res) => {

    try {
        return res.json({
            success: true
        })
    }
    catch (error) {
        return res.status(400).json({
            success: false
        })
    }
  
});



module.exports = userRouter;
