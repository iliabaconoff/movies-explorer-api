const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config');

const { ValidationError } = mongoose.Error;
const User = require('../models/userSchema');
const BadRequest = require('../utils/responsesWithError/BadRequest');
const NotFound = require('../utils/responsesWithError/NotFound');
const Duplicate = require('../utils/responsesWithError/Duplicate');

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then(() => {
      res.status(201).send({
        name,
        email,
      });
    })
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest(err.message));
      } else if (err.code === 11000) {
        next(new Duplicate('Пользователь с таким email уже зарегистрирован.'));
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
    .orFail(new NotFound('Пользователь с таким ID не найден.'))
    .then((updatedUserData) => res.send({ data: updatedUserData }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest(err.message));
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
