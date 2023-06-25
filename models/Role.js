const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../dbcon')

class Role extends Model {}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
    }
  },
  { sequelize, modelName: 'Role' }
)

module.exports = { Role }