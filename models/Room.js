const { Sequelize, DataTypes, Model } = require('sequelize')
const { sequelize } = require('../dbcon')
const { Anime } = require('./Anime')
const { User } = require('./User')
const { UsersInTheRoom } = require('./UsersInTheRoom')
const { MessageChat } = require('./MessageChat')

class Room extends Model {}

Room.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    url: {
      type: DataTypes.STRING,
    },
    privateRoom: {
        type: DataTypes.BOOLEAN,
    }
  },
  { sequelize, modelName: 'Room' }
)

Room.belongsTo(Anime)
Room.belongsToMany(User, { through: UsersInTheRoom })
Room.belongsToMany(User, { through: MessageChat })


module.exports = { Room }