const mongoose = require('mongoose');

const { ValidationError } = mongoose.Error;
const Movie = require('../models/movieSchema');
const BadRequest = require('../utils/responsesWithError/BadRequest');
const NotFound = require('../utils/responsesWithError/NotFound');
const Forbidden = require('../utils/responsesWithError/Forbidden');
const { CREATE_SUCCESS_STATUS, NOT_FOUND_ID_ERROR, FORBIDDEN_ERROR } = require('../utils/constants');

const getAllMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ data: movies }))
    .catch((err) => next(err));
};

const createMovie = (req, res, next) => {
  const { name, link } = req.body;

  Movie.create({ name, link, owner: req.user._id })
    .then((movie) => res.status(CREATE_SUCCESS_STATUS).send({ data: movie }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest(err.message));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFound(NOT_FOUND_ID_ERROR))
    .then((foundMovie) => {
      if (!foundMovie.owner.equals(req.user._id)) {
        return next(
          new Forbidden(FORBIDDEN_ERROR),
        );
      }

      return Movie.deleteOne(foundMovie).then(() => res.send({ message: foundMovie }));
    })
    .catch((err) => next(err));
};

const likeMovie = (req, res, next) => {
  Movie.findByIdAndUpdate(
    req.params.movieId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFound(NOT_FOUND_ID_ERROR))
    .then((movie) => res.send({ data: movie }))
    .catch((err) => next(err));
};

const dislikeMovie = (req, res, next) => {
  Movie.findByIdAndUpdate(
    req.params.movieId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFound(NOT_FOUND_ID_ERROR))
    .then((movie) => res.send({ data: movie }))
    .catch((err) => next(err));
};

module.exports = {
  getAllMovies,
  createMovie,
  deleteMovie,
  likeMovie,
  dislikeMovie,
};
