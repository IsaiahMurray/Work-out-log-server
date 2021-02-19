const { DataTypes } = require("sequelize");
const db = require("../db");

const User = db.define(
  "user",
  {
    firstName: {
      type: DataTypes.STRING, 
      allowNull: true 
    },
    lastName: {
      type: DataTypes.STRING, 
      allowNull: true 
    },
    email: {
      type: DataTypes.STRING, 
      allowNull: false 
    },
    passwordhash: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
  },
  {}
);

module.exports = User;