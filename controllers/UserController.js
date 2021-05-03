const { Op } = require('sequelize');
const { generatePassword, generateUserToken, generateUniqueKey, decryptKey } = require('../helpers/helperFunctions');
const { user, post, postLike, comment, postImage, request } = require('../models');



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
                image: createdUser.image,
                id: createdUser.id
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
                    image: findUser.image,
                    id: findUser.id
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
                image: userFind.image,
                id: userFind.id
            },
        });
    }
    catch (error) {
        res.json({
            error
        });
    }
}


userController.getPosts = async (req,res) => {
    try {
       const { id } = req.params;

       const userFind = await user.findOne({
           where: {
               id
           }
       });
     

        const userPosts = await userFind.getPosts({
            include: [
                {
                    model: user,
                    attributes:['alias','image','id']
                },
                {
                    model: comment,
                    include: {
                        model: user, 
                        attributes:['alias','id']
                    }
                },
                {
                    model: postLike,
                    include: {
                        model: user, 
                        attributes:['alias','id']
                    }
                },
                {
                    model: postImage,
                    attributes:['link']
                 
                },
                
            ],
            order: [['updatedAt', 'DESC']]
        });

      
        res.json({
            posts: userPosts,
            user: {
                id: userFind.id,
                alias: userFind.alias,
                image: userFind.image
            }
        });

    }
    catch(error) {
        console.log(error);
        res.status(400).json({
            error
        });
    }
}


userController.requestFriend = async (req,res) => {

    try {
        const { userFind:sender } = req;
        const { id } = req.params;
        const {cancel} = req.body;
    
        const receiver = await user.findOne({
            where: {
                id
            }
        });
    
        if (receiver === null || sender === null) return res.status(404).json({
            error: {
                message: "User does not exist."
            }
        });

        if (receiver.id === sender.id) return res.status(404).json({
            error: {
                message: "Can't request on same user."
            }
        });

        const [foundRequest] = await sender.getReceivedRequests({
            where: {
                sentId: receiver.id,
                accept: {
                    [Op.or]: [null, false]
                }
            }
        });

       
    
        if (foundRequest !== undefined && foundRequest.accept !== null) {
            if (foundRequest.accept === false) {
                if (cancel) {
                    await foundRequest.update({
                        accept: null
                    });                    
                }
                else {
                    await foundRequest.update({
                        accept: null
                    });

                    // Add Friend Here
                }
            }
        }
    
        // else if (await sender.hasReceivedRequest(foundRequest) || receiver.hasSentRequest(foundRequest)) {
        //     return res.status(400).json({
        //         error: {
        //             message: 'Internal Server Error'
        //         }
        //     });
        // }
    
        else {
             const [findRequest, createdRequest] = await request.findOrCreate({
                    where: {
                        sentId: sender.id,
                        requestId: receiver.id,
                        accept: {
                            [Op.or]: [null, false]
                        }
                    },
                    defaults: {
                        accept: false,
                        sentId: sender.id,
                        requestId: null,
                    }
            });

            await receiver.addReceivedRequests(findRequest);

            if (cancel) {
                await findRequest.update({
                    accept: null
                });
            }

            else {
                
                await findRequest.update({
                    accept: false,
                    
                });

            }
        

        }

        console.log(await receiver.getReceivedRequests())
        console.log(await receiver.getSentRequests())
      

        res.json({
            requests: {
                received: await sender.getReceivedRequests(),
                requested: await sender.getSentRequests(),
              
            }
        });
           
    }
   

  catch(error) {
    console.log(error);
    return res.status(400).json({
        error
    });
  }

  

   
    
};


           




module.exports = userController;