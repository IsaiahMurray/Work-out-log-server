require('dotenv').config();
const Sequelize = require("sequelize");

const db = new Sequelize(`postgres://postgres:${process.env.PASS}@localhost:5432/wol`, {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = db;
