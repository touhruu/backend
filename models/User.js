const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../dbcon')
const { Role } = require('./Role')

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
    },
    avatar: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    backgraund: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  },
  { sequelize, modelName: 'User' }
)

User.belongsTo(Role)
module.exports = { User }