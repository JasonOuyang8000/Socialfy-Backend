
require('dotenv').config();
const AWS = require('aws-sdk');


const deleteAws = async(key) => {
 
    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        Bucket: process.env.AWS_BUCKET_NAME,
    });
    
    await s3.deleteObject({ Bucket:  process.env.AWS_BUCKET_NAME, Key:key }, (err, data) => {
        if (err) {
            return res.status(404).json({error: 'Server Error'})
        }
    });
        
  
}

 
module.exports = {deleteAws};