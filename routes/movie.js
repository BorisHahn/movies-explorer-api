const movieRouter = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movie');
const { validDeleteMoviesData, validCreateMovieData } = require('../utils/validation/validMovieData');

movieRouter.get('/', getMovies);
movieRouter.post('/', validCreateMovieData, createMovie);
movieRouter.delete('/:id', validDeleteMoviesData, deleteMovie);

module.exports = movieRouter;
