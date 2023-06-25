const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../dbcon')
const { Anime } = require('./Anime')
const { User } = require('./User')

class Bookmark extends Model {}

Bookmark.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    bookmarkType: {
      type: DataTypes.INTEGER
    }
  },
  { sequelize, modelName: 'Bookmark' }
)

Bookmark.belongsTo(Anime)
Bookmark.belongsTo(User)

module.exports = { Bookmark }