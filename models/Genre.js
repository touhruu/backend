const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../dbcon')

class Genre extends Model {}

Genre.init(
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
  { sequelize, modelName: 'Genre' }
)

module.exports = { Genre }