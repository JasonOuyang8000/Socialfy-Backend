'use strict';


const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class postImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.postImage.belongsTo(models.post);
    }
  };
  postImage.init({
    postId: DataTypes.INTEGER,
    key: DataTypes.STRING,
    link: DataTypes.STRING
  },
  {
    sequelize,
    modelName: 'postImage',
  });
  return postImage;
};

