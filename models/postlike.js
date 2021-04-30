'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class postLike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.postLike.belongsTo(models.user);
      models.postLike.belongsTo(models.post);
    }
  };
  postLike.init({
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    liked: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'postLike',
  });
  return postLike;
};