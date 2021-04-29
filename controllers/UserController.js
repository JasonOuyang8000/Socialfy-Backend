const { generatePassword, checkPassword, generateUserToken } = require('../helpers/helperFunctions');
const { user } = require('../models/');

const userController = {};

userController.create = async (req, res) => {
    try {
     
        const { alias,key } = req.body;
      
        const hashedKey = generatePassword(key);
     
        const createdUser = await user.create({
            alias,
            key: hashedKey
        });

    
        const userToken = generateUserToken(createdUser.id, process.env.SECRET);

        res.status(201).json({
            userToken
        });
    }
    catch(error) {
        console.log(error);
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
                key
            }
        });
    
        if (checkPassword(password, findUser.password)) {
            const userToken = generateUserToken(findUser.id, process.env.SECRET);
            res.json({
                userToken
            });
        }

        else {
            return res.status(401).json({error: {
                message: "Key is incorrect or does not exist"
            }});
        }
    
    }
    catch (error) {
        res.status({error});
    } 
}

userController.verify = (req, res) => {
    try {
        const { userFind } = req;

        return res.status(200).json({
            message: 'ok'
        });
    }
    catch (error) {
        res.json({
            error
        });
    }
}


module.exports = userController;