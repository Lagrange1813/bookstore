const express = require("express");
const cors = require("cors");
const logger = require("./utils/logger");

const usersRouter = require("./controllers/users");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", usersRouter);

module.exports = app;
