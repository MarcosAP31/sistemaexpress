const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'marcos',
  password: 'SQLPassword',
  database: 'system',
});

module.exports = sequelize;