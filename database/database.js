const Sequelize = require('sequelize');

const connection = new Sequelize('guide_questions', 'root', '123', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = connection


