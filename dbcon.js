const { Sequelize } = require('sequelize');

module.exports.sequelize = new Sequelize('aniflix_bd', 'root', 'rootroot', {
    host: '141.8.194.146',
    dialect: 'mysql'
});
  