const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../dbcon');

class Status extends Model {}

Status.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  { sequelize, modelName: 'Status' }
)

module.exports = { Status }