require('dotenv').config();

const PORT = process.env.PORT;
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWD = process.env.DB_PASSWD;

module.exports = {
  PORT,
  DB_HOST,
  DB_USER,
  DB_PASSWD,
};
