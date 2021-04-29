const { generatePassword, generateUserToken, generateUniqueKey, decryptKey } = require('../helpers/helperFunctions');
const { user } = require('../models');


const userController = {};

userController.create = async (req, res) => {
    try {
     
        const { alias } = req.body;
        
        const key = await generateUniqueKey();

        const encryptedKey = generatePassword(key,process.env.SECRET_KEY);
     
        const createdUser = await user.create({
            alias,
            key
        });

        const userToken = generateUserToken(createdUser.id, process.env.SECRET);

        res.status(201).json({
            key: encryptedKey,
            userToken,
            alias: createdUser.alias
        });
    }
    catch(error) {
      
        res.status(400).json({
            error
        });
    }

}

userController.login = async (req,res) => {
    const { key } = req.body;
    try {
        const findUser = await user.findOne({
            where: {
                key: decryptKey(key,process.env.SECRET_KEY)
            }
        });

        if (findUser !== null ) {
            const userToken = generateUserToken(findUser.id, process.env.SECRET);
            res.json({
                userToken,
                alias: findUser.alias
            });
        }

        else {
            return res.status(401).json({error: {
                message: "Key is incorrect or does not exist"
            }});
        }
    
    }
    catch (error) {
        console.log(error);
        res.status(400).json({error});
    } 
}

userController.verify = (req, res) => {
    try {
        const { userFind } = req;

        return res.status(200).json({
            message: 'ok',
            alias: userFind.alias
        });
    }
    catch (error) {
        res.json({
            error
        });
    }
}


module.exports = userController;