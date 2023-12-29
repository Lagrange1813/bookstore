const { DataTypes } = require('sequelize');

const sequelize = require('../services/db');

const User = sequelize.define(
  'User',
  {
    UserID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    Password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING(100),
    },
    Address: {
      type: DataTypes.TEXT,
    },
    Email: {
      type: DataTypes.STRING(100),
      unique: true,
    },
    AccountBalance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.0,
    },
    CreditRating: {
      type: DataTypes.ENUM('1', '2', '3', '4', '5'),
      defaultValue: '1',
    },
  },
  {
    tableName: 'Users',
    timestamps: false,
  }
);

module.exports = User;
