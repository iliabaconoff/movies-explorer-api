const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config');

const { ValidationError } = mongoose.Error;
const User = require('../models/userSchema');
const BadRequest = require('../utils/responsesWithError/BadRequest');
const NotFound = require('../utils/responsesWithError/NotFound');
const Duplicate = require('../utils/responsesWithError/Duplicate');
const {
  DUPLICATED_USER_ERROR, CREATE_SUCCESS_STATUS, NOT_FOUND_ID_ERROR, DUPLICATE_STATUS,
} = require('../utils/constants');

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then(() => {
      res.status(CREATE_SUCCESS_STATUS).send({
        name,
        email,
      });
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest(err.message));
      } else if (err.code === DUPLICATE_STATUS) {
        next(new Duplicate(DUPLICATED_USER_ERROR));
      } else {
        next(err);
      }
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFound())
    .then((userData) => res.send({ data: userData }))
    .catch((err) => next(err));
};

const updateUserData = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(new NotFound(NOT_FOUND_ID_ERROR))
    .then((updatedUserData) => res.send({ data: updatedUserData }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest(err.message));
      } else if (err.code === 11000) {
        next(new Duplicate(DUPLICATED_USER_ERROR));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => next(err));
};

module.exports = {
  getCurrentUser,
  createUser,
  updateUserData,
  login,
};
