const { Sequelize, DataTypes, Model } = require('sequelize')
const { sequelize } = require('../dbcon')

class UsersInTheRoom extends Model {}

UsersInTheRoom.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    admin: {
        type: DataTypes.BOOLEAN
    }
  },
  { sequelize, modelName: 'UsersInTheRoom' }
)

module.exports = { UsersInTheRoom }