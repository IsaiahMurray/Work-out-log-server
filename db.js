require('dotenv').config();
const Sequelize = require("sequelize");

const db = new Sequelize('', 'postgres', 'weewoo123', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = db;
