require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const routes = require('./routes');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/moviesdb' } = process.env;

const app = express();
mongoose.connect(MONGO_URL);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(routes);

app.use(errors());

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
