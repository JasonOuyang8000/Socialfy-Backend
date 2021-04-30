const models = require('../models');


const postcontroller = {};

postcontroller.getPosts = async(req, res) => {
    try {
        const posts = await models.post.findAll({
            include: [
            {
                model: models.user,
                attributes:['alias','image']
            },
            {
                model: models.comment,
                include: {
                    model: models.user, 
                    attributes:['alias']
                }
            },
            {
                model: models.postLike,
                include: {
                    model: models.user, 
                    attributes:['alias']
                }
            },
        ]});

        res.json({
            posts
        });

    }
    catch(error) {
        console.log(error);
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
        const { userFind } = req;

        const { description } = req.body;

        if ( userFind === null || userFind === undefined) return res.status(400).json({error:{ message: 'User does not exist'}});

        const post = await models.post.create({
            description,
        });

        await userFind.addPost(post);

        await post.reload({
            include: {
                model: models.user,
                attributes: ['alias']
            }
        });

        res.json({post});

    }
    catch(error) {
        res.status(400).json(error);
    }
};


postcontroller.createComment = async(req, res) => {
    try {
        const { userFind } = req;
        const { id } = req.params;
        const { description } = req.body;
        
        if ( userFind === null || userFind === undefined) return res.status(400).json({error:{ message: 'User does not exist'}});

        const findPost = await models.post.findOne({
            where: { id },
            include: [{
                model: models.comment,
                include: {
                    model: models.user, 
                    attributes:['alias']
                },
               
            },
            {
                model: models.user,
                attributes: ['alias']
            }
        ]
        });
        
        if ( findPost === null) return res.status(400).json({error:{ message: 'Post does not exist'}});
        
        const comment = await models.comment.create({
            description
        });

        await userFind.addComment(comment);
        await findPost.addComment(comment); 
        await findPost.reload();

        res.json({
            post: findPost
        });

    }
    catch(error) {
        console.log(error);
        res.status(400).json({
            error
        });
    }
}


postcontroller.deletePost = async(req, res) => {
    try {
    
        const { userFind } = req;
        
        if (!userFind) return res.status(400).json({error: {message: "Not authorized"}});
        
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

postcontroller.likePost = async (req, res) => {
    try {
        const { userFind } = req;
        const { id } = req.params;

        const post = await models.post.findOne({
            where: {
                id
            }
       
        });

       

        if ( userFind === null || userFind === undefined) return res.status(400).json({error:{ message: 'User does not exist'}});

        if (post === null) return res.status(404).json({error: {message:'Post does not exist'}});

        const [postLike, created] = await models.postLike.findOrCreate({
            where: { 
                userId: userFind.id,
                postId: id  
            },
            defaults: {
                userId: userFind.id,
                postId: id,
                liked: true
            }
        });

        if (!created) {
            await postLike.update({
                liked: !postLike.liked
            });
        }

        await post.reload({
            include: [{
                model: models.postLike,
                include: {
                    model: models.user,
                    attributes: ['alias']
                }
            }]
        });
      
        res.json({post});

    }
    catch(error) {
        console.log(error);
        res.status(400).json(error);
    }
}


module.exports = postcontroller;