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

moviesRouter.post('/movies', validateNewMovie, createMovie);
moviesRouter.get('/movies', getAllMovies);
moviesRouter.delete('/:movies_id', validateMovieId, deleteMovie);

module.exports = moviesRouter;
