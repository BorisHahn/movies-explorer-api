const bcrypt = require('bcryptjs');
const User = require('../models/user');
const BadRequest = require('../errors/badRequestError');
const ConflictError = require('../errors/conflctError');

const { created } = require('../utils/const');

module.exports.getProfileInfo = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => res.send(user))
    .catch((err) => {
      next(err);
    });
};

module.exports.signUp = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => res.status(created).send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с данным email уже зарегестрирован'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные при создании пользователя'));
      } else {
        next(err);
      }
    });
};
