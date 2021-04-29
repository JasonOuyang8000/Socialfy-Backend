const encryptor = require('simple-encryptor');
const jwt = require('jsonwebtoken');
const models = require('../models');
const uniqueKey = require('unique-key');


const generatePassword = (password,secret) => {
    return encryptor(secret).encrypt(password);
}

const checkPassword = (password, hash, secret) => {
    return password === encryptor(secret).decrypt(hash);
}

const decryptKey = (key, secret) => {
   
    return encryptor(secret).decrypt(key);
} 


const generateUniqueKey = async() => {
    let key = uniqueKey(32);
    try {
        const allUsers = await models.user.findAll();
      
        while (allUsers.some(user => user.key === key)) {
            key = uniqueKey(32);
        }
    
    }
    catch (error) {
        console.log(error);
    }
    
    

    return key;
}


const generateUserToken = (userId, secret) => {
    const token = jwt.sign({id: userId}, secret);
    return token;
}

const verifyUserToken = (token, secret) => {
    const { id } = jwt.verify(token, secret);
    
    return id;
}

module.exports = {generatePassword, checkPassword, generateUserToken, verifyUserToken, generateUniqueKey, decryptKey}