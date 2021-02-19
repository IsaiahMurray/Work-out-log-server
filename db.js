require('dotenv').config();
const Sequelize = require("sequelize");

const db = new Sequelize(`${process.env.DB_URL}`, {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = db;
