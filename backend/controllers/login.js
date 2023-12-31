const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../model/user.model');
const getTokenFrom = require('../utils/token');

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ where: { Username: username } });

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.Password);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password',
    });
  }

  const userForToken = {
    username: user.Username,
    id: user.UserID,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  });

  response.status(200).send({ token, username: user.Username });
});

loginRouter.post('/verify', async (request, response) => {
  const { token } = request.body;

  try {
    jwt.verify(token, process.env.SECRET);
    response.status(200).send();
  } catch (error) {
    response.status(401).send();
  }
});

loginRouter.get('/verify', async (request, response) => {
  const token = getTokenFrom(request);

  try {
    jwt.verify(token, process.env.SECRET);
    response.status(200).send();
  } catch (error) {
    response.status(401).send({ error: 'token missing or invalid' });
  }
});

module.exports = loginRouter;
