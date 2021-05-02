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
      models.user.hasMany(models.comment, {onDelete: 'cascade',hooks: true });
      models.user.hasMany(models.postLike, {onDelete: 'cascade',hooks: true });
      models.user.hasMany(models.post), {onDelete: 'cascade',hooks: true };
    }
  };
  user.init({
    alias: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: {
          args: [4,12],
          msg: "Alias has to be 4 to 12 characters"
        }
      }
    },
    key: {
      type:DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    },
    image: {
      type:DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      }
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};