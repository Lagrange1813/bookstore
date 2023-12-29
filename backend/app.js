const express = require('express');
const cors = require('cors');

const loginRouter = require('./controllers/login');
const usersRouter = require('./controllers/users');
const booksRouter = require('./controllers/books');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/login', loginRouter);
app.use('/api/users', usersRouter);
app.use('/api/books', booksRouter);

module.exports = app;
