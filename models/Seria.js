const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../dbcon');
const { Anime } = require('../models/Anime');
const { Video } = require('../models/Video');

class Seria extends Model {}

Seria.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    position: {
      type: DataTypes.INTEGER,
    }
  },
  { sequelize, modelName: 'Seria' }
)

Seria.belongsTo(Anime)
Seria.belongsTo(Video)

module.exports = { Seria }