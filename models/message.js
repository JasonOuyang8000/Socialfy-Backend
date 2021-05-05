'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.message.belongsTo(models.user);
      models.message.belongsTo(models.friend);
    }
  };
  message.init({
    info: DataTypes.TEXT,
    friendId: DataTypes.INTEGER,
    userId:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'message',
  });
  return message;
};