const Sequelize = require('sequelize');

const config = require('../utils/config');
const logger = require('../utils/logger');

const sequelize = new Sequelize('bookstore', config.DB_USER, config.DB_PASSWD, {
  host: config.DB_HOST,
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    logger.info('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database: ', error);
  });

module.exports = sequelize;
