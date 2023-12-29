const { Op } = require('sequelize');

const Book = require('../model/book.model');
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
        [Op.like]: `%${request.params.title}%`
      }
    },
  });
  response.json(books);
});

// get all books by Publisher
booksRouter.get('/publisher/:publisher', async (request, response) => {
  const books = await Book.findAll({
    where: {
      Publisher: {
        [Op.like]: `%${request.params.publisher}%`
      }
    },
  });
  response.json(books);
});

// get all books by Keywords
booksRouter.get('/keywords/:keywords', async (request, response) => {
  const books = await Book.findAll({
    where: {
      Keywords: {
        [Op.like]: `%${request.params.keywords}%`
      }
    },
  });
  response.json(books);
});

module.exports = booksRouter;
