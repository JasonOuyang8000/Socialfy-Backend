const jwt = require('jsonwebtoken');
const models = require('../models');

const findUser = async (req, res, next) => {
    try {

      if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1]

        const { id } = jwt.verify(token, process.env.SECRET);
        const user = await models.user.findOne({
          where: {
            id
          }
        })

  
    
        req.userFind = user;

      } else {
        req.userFind = null;
      }
  
      next();
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: error.message })
    }
}


module.exports = { findUser };