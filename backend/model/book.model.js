const { DataTypes } = require('sequelize');

const sequelize = require('../services/db');

const Book = sequelize.define(
  'Book',
  {
    // 定义模型属性
    BookID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Publisher: {
      type: DataTypes.STRING(100),
    },
    Price: {
      type: DataTypes.DECIMAL(10, 2),
    },
    Keywords: {
      type: DataTypes.STRING(255),
    },
    StockQuantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    SeriesID: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'Books',
    timestamps: false,
  }
);

module.exports = Book;
