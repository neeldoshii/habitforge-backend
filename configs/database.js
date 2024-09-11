require('dotenv').config()
const { Sequelize } = require('sequelize');


// Option 1: Passing a connection URI
// const sequelize = new Sequelize('postgres://postgres:12345@localhost:5433/postgres');

// Option 2 : Passing parameters separately
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  dialect: 'postgres'
});







async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

  } catch (error) {
    console.error('Unable to connect to the database:', error);

  }
}


module.exports = { sequelize, testConnection }