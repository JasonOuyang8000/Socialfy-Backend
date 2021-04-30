const { generatePassword, generateUserToken, generateUniqueKey, decryptKey } = require('../helpers/helperFunctions');
const { user, postLike } = require('../models');



const userController = {};

userController.create = async (req, res) => {
    try {
     
        const { alias,image } = req.body;
        
        const key = await generateUniqueKey();

        const encryptedKey = generatePassword(key,process.env.SECRET_KEY);
     
        const createdUser = await user.create({
            alias,
            key,
            image
        });

        const userToken = generateUserToken(createdUser.id, process.env.SECRET);

        res.status(201).json({
            user: {
                key: encryptedKey,
                alias: createdUser.alias,
                image: createdUser.image
            },
            userToken,
        
        });
    }
    catch(error) {
   
        if (error.errors) return res.status(400).json({error: {message: error.message}});
     
    
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
                user: {
                    alias: findUser.alias,
                    image: findUser.image
                }
            });
        }

        else {
            return res.status(401).json({error: {
                message: "Key is incorrect or does not exist"
            }});
        }
    
    }
    catch (error) {
    
        res.status(400).json({error});
    } 
}

userController.verify = (req, res) => {
    try {
      
      
        const { userFind } = req;
      
    
        return res.status(200).json({
            message: 'ok',
            user: {
                alias: userFind.alias,
                image: userFind.image
            },
        });
    }
    catch (error) {
        res.json({
            error
        });
    }
}





module.exports = userController;