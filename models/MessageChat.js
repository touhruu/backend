const { Sequelize, DataTypes, Model } = require('sequelize')
const { sequelize } = require('../dbcon')

class MessageChat extends Model {}

MessageChat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    message: {
      type: DataTypes.STRING,
    }
  },
  { sequelize, modelName: 'MessageChat' }
)


module.exports = { MessageChat }