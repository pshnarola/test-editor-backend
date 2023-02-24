'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PageData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PageData.init({
    pageTitle: DataTypes.STRING,
    pageNo: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    user : DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'PageData',
  });
  return PageData;
};