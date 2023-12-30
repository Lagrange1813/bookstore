const { Op } = require('sequelize');

const Book = require('../model/book.model');
const sequelize = require('../services/db');
const booksRouter = require('express').Router();
// const logger = require('../utils/logger');

// get all books
booksRouter.get('/', async (request, response) => {
  const books = await Book.findAll();
  response.json(books);
});

// get book by BookID
booksRouter.get('/id/:id', async (request, response) => {
  const book = await Book.findByPk(request.params.id);
  response.json([book]);
});

// get all books by Title
booksRouter.get('/title/:title', async (request, response) => {
  const books = await Book.findAll({
    where: {
      Title: {
        [Op.like]: `%${request.params.title}%`,
      },
    },
  });
  response.json(books);
});

// get all books by Publisher
booksRouter.get('/publisher/:publisher', async (request, response) => {
  const books = await Book.findAll({
    where: {
      Publisher: {
        [Op.like]: `%${request.params.publisher}%`,
      },
    },
  });
  response.json(books);
});

// get all books by Keywords
booksRouter.get('/keywords/:keywords', async (request, response) => {
  const books = await Book.findAll({
    where: {
      Keywords: {
        [Op.like]: `%${request.params.keywords}%`,
      },
    },
  });
  response.json(books);
});

// get all books by Authors
booksRouter.get('/authors/:authors', async (request, response) => {
  try {
    const authorName = `%${request.params.authors}%`; // 获取参数并为LIKE查询准备
    const books = await sequelize.query(
      `SELECT books.* FROM books 
      JOIN bookauthors ON books.BookID = bookauthors.BookID 
      JOIN authors ON bookauthors.AuthorID = authors.AuthorID 
      WHERE authors.Name LIKE :authorName`, // 使用参数化查询
      {
        replacements: { authorName }, // 传递参数
        type: sequelize.QueryTypes.SELECT,
      }
    );
    response.json(books); // 返回查询结果
  } catch (error) {
    // 错误处理
    console.error('Error:', error);
    response.status(500).send('Server error occurred');
  }
});

module.exports = booksRouter;
