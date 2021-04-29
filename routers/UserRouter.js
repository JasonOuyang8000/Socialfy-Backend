const userRouter = require('express').Router();

const { create, login, verify } = require('../controllers/UserController');


userRouter.post('', create);

userRouter.post('/login', login);

userRouter.get('/verify', verify);



module.exports = userRouter;
