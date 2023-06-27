const { Sequelize, DataTypes, Model } = require('sequelize')
const { sequelize } = require('../dbcon')
const { User } = require('./User')
const { Room } = require('./Room')

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

MessageChat.belongsTo(User)

module.exports = { MessageChat }