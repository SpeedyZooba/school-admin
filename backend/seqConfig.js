const Sequelize = require('sequelize');
const config = require('./config.js');

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect
});

module.exports = sequelize;