const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../dbcon');
const { Category } = require('./Category');
const { Genre } = require('./Genre');
const { Status } = require('./Status')
const { Video } = require('./Video')

class Anime extends Model {}

Anime.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    release_ani: {
      type: DataTypes.INTEGER,
    },
    duration: {
      type: DataTypes.INTEGER,
    },
    age_limit: {
      type: DataTypes.INTEGER,
    },
    picture: {
      type: DataTypes.TEXT,
    },
  },
  { sequelize, modelName: 'Anime' }
)

Anime.belongsTo(Status)
Anime.belongsTo(Category)
Anime.belongsToMany(Genre, { through: 'Anime_Genre' })

module.exports = { Anime }