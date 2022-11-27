const Movie = require('../models/movie');
const NotFoundError = require('../errors/notFoundError');
const BadRequest = require('../errors/badRequestError');
const ForbiddenError = require('../errors/forbiddenError');
const { created } = require('../utils/const');

module.exports.getMovies = async (req, res, next) => {
  try {
    const movie = await Movie.find({ owner: req.user._id });
    res.send(movie);
  } catch (err) {
    next(err);
  }
};

module.exports.createMovie = async (req, res, next) => {
  try {
    const checkedMovie = await Movie.findOne({
      owner: req.user._id,
      movieId: req.body.movieId,
    });
    if (checkedMovie) {
      throw new ForbiddenError('Этот фильм уже сохранен');
    }
    const newMovie = await Movie.create({
      ...req.body,
      owner: req.user._id,
    });
    res.status(created).send(newMovie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequest('Переданы некорректные данные для сохранения фильма'));
    } else {
      next(err);
    }
  }
};

module.exports.deleteMovie = async (req, res, next) => {
  try {
    const deletedMovie = await Movie.findById(req.params.id);
    if (!deletedMovie) {
      throw new NotFoundError('Фильм с указанным id не найден');
    }
    if (deletedMovie.owner.toString() !== req.user._id) {
      throw new ForbiddenError('Чужие фильмы удалению не подлежат');
    }
    await deletedMovie.remove();
    res.send(deletedMovie);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequest('Переданы некорректные данные для удаления фильма'));
    } else {
      next(err);
    }
  }
};
