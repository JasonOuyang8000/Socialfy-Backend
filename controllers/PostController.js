const models = require('../models');

const postcontroller = {};

postcontroller.getPosts = async(req, res) => {
    try {
        const posts = await models.posts.findAll({
            include: [
            {
                model: models.user,
                attributes:['name']
            },
            {
                model: models.comment,
                include: {
                    model: models.user, 
                    attributes:['name']
                }
            }
        ]});

        res.json({
            posts
        });

    }
    catch(error) {
        res.status(400).json(error);
    }
};

postcontroller.getPost = async(req, res) => {
    try {

    }
    catch(error) {
        res.status(400).json(error);
    }
};


postcontroller.createPost = async(req, res) => {
    try {
        const { findUser } = req;

        const { description } = req.body;

        if ( findUser === null) res.status(400).json({error:{ message: 'User does not exist'}});

        const post = await models.post.create({
            description,
            likes: 0,
        });

        res.json({post});

    }
    catch(error) {
        res.status(400).json(error);
    }
};


postcontroller.deletePost = async(req, res) => {
    try {
        const { userFind } = req;
        
        if (!userFind) return res.status(400).json({error: {message: "User does not exist."}});
        
        const { id } = req.params; 

        const findPost = await models.post.findOne({where: {
            id
        }});

        if (findPost === null) return res.status(400).json({error: {message: "Post Does Not Exist"}});
       
        if (await userFind.hasPost(findPost)) {
            await findPost.destroy();
            res.status(204).json({});
        }

        else {
            res.status(404).json({error: {message: 'unauthorized'}});
        }


    }
    catch(error) {
        res.status(400).json(error);
    }
};


module.exports = postcontroller;