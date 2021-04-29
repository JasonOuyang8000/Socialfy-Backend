'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.hasMany(models.comment);
      models.user.hasMany(models.post);
    }
  };
  user.init({
    alias: DataTypes.STRING,
    key: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};