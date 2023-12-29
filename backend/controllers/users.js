const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../model/user.model');
const usersRouter = require('express').Router();
const logger = require('../utils/logger');

// New User
usersRouter.post('/', async (request, response) => {
  logger.info('request.body', request.body);

  const { username, password } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = User.build({
    Username: username,
    Password: passwordHash,
  });

  try {
    await user.save();
  } catch (error) {
    console.error('Error:', error);
  }

  response.status(201).json(user);
});

const getTokenFrom = request => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

// Get User Info
usersRouter.post('/test', async (request, response) => {
  const token = getTokenFrom(request);
  console.log('token', token);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  console.log('decodedToken', decodedToken);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findOne({ where: { UserID: decodedToken.id } });

  response.status(200).json(user);
});

module.exports = usersRouter;
