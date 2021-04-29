
const express = require('express');
const rowdyLogger = require('rowdy-logger');

const { findUser } = require('./middlewears/userAuth');
const postRouter = require('./routers/PostRouter');
const userRouter = require('./routers/UserRouter');


const app = express();
const port = process.env.PORT || 3001;

require('dotenv').config()


const rowdyReporter = rowdyLogger.begin(app);

app.use(express.json());
app.use(require('cors')());
app.use(findUser);

app.use('/user', userRouter);
app.use('/post', postRouter);

app.listen(port, () => {
    
    rowdyReporter.print();
});