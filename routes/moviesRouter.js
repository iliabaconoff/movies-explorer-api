const moviesRouter = require('express').Router();
const {
  createMovie,
  deleteMovie,
  getAllMovies,
} = require('../controllers/movies');
const {
  validateMovieId,
  validateNewMovie,
} = require('../utils/validationConfig');

moviesRouter.post('/', validateNewMovie, createMovie);
moviesRouter.get('/', getAllMovies);
moviesRouter.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = moviesRouter;
