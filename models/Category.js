const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../dbcon')

class Category extends Model {}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
    },
    color: {
      type: DataTypes.STRING,
      defaultValue: '#3c811c'
    }
  },
  { sequelize, modelName: 'Category' }
)

module.exports = { Category }