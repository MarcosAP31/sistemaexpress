const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost',
  username: 'marcos',
  password: 'Amkl-572#$LCVy',
  database: 'system',
});

module.exports = sequelize;