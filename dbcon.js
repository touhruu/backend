const { Sequelize } = require('sequelize');

module.exports.sequelize = new Sequelize('aniflix_bd', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});
  