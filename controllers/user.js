const { NODE_ENV, JWT_SEC } = process.env;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const NotFoundError = require("../errors/notFoundError");
const BadRequest = require("../errors/badRequestError");
const ConflictError = require("../errors/conflctError");
const UnauthorizedError = require("../errors/unauthorizedError");

const { created } = require("../utils/const");

module.exports.getProfileInfo = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    res.send(user);
  } catch (err) {
    next(err);
  }
};

module.exports.signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hash,
    });
    res.status(created).send(user);
  } catch (err) {
    if (err.code === 11000) {
      next(
        new ConflictError("Пользователь с данным email уже зарегестрирован")
      );
    } else if (err.name === "ValidationError") {
      next(
        new BadRequest("Переданы некорректные данные при создании пользователя")
      );
    } else {
      next(err);
    }
  }
};

module.exports.signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUser(email, password);
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === "production" ? JWT_SEC : "dev-secret",
      { expiresIn: "7d" }
    );
    res
      .cookie("jwt", token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      })
      .send({ email });
  } catch (err) {
    next(new UnauthorizedError(err.message));
  }
};

module.exports.signOut = (req, res) => {
  res.clearCookie("jwt");
  res.end();
};

module.exports.editProfileInfo = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    await User.findOne({ email });
    const editUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true }
    );
    if (!editUser) {
      throw new NotFoundError("Запрашиваемый пользователь не найден");
    } else {
      res.send(editUser);
    }
  } catch (err) {
    if (err.code === 11000) {
      next(
        new ConflictError("Пользователь с данным email уже зарегестрирован")
      );
    } else if (err.name === "ValidationError") {
      next(
        new BadRequest("Переданы некорректные данные при создании пользователя")
      );
    } else {
      next(err);
    }
  }
};
