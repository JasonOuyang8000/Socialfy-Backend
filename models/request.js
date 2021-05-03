'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.request.belongsTo(models.user,{as: 'sentRequests',foreignKey:'sentId'});
      // models.request.belongsTo(models.user,{as: 'receivedRequests',foreignKey:'sentId'});

      models.request.belongsTo(models.user,{as: 'sentRequests',foreignKey:'sentId'});
      models.request.belongsTo(models.user,{as: 'receivedRequests',foreignKey:'requestId'});
    } 
  };
  request.init({
    requestId: DataTypes.INTEGER,
    sentId: DataTypes.INTEGER,
    accept: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'request',
  });
  return request;
};