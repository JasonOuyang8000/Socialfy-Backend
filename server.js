require('dotenv').config()
const express = require('express');
const rowdyLogger = require('rowdy-logger');
const { newImage } = require('./helpers/upload');
const AWS = require('aws-sdk');

const { findUser } = require('./middlewears/userAuth');



const postRouter = require('./routers/PostRouter');
const userRouter = require('./routers/UserRouter');


const app = express();
const port = process.env.PORT || 3001;



const rowdyReporter = rowdyLogger.begin(app);

app.use(express.json());
app.use(require('cors')());
app.use(findUser);

app.use('/user', userRouter);
app.use('/post', postRouter);








app.listen(port, () => {
    
    rowdyReporter.print();
});