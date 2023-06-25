const { Sequelize, DataTypes, Model } = require('sequelize')
const { sequelize } = require('../dbcon')

class Video extends Model {}

Video.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      videoFile: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    { sequelize, modelName: 'Video' }
  )
  
  module.exports = { Video }