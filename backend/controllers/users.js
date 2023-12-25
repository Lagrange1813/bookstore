const bcrypt = require("bcrypt");

const sequelize = require("../services/db");
const User = require("../model/user.model");
const usersRouter = require("express").Router();

usersRouter.get("/", async (request, response) => {
  const users = await User.findAll();
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  console.log("request.body", request.body);

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
    console.error("Error:", error);
  }

  response.status(201).json(user);
});

module.exports = usersRouter;
