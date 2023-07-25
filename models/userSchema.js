const { Schema, model } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const Unauthorized = require('../utils/responsesWithError/Unauthorized');
const {VALIDATION_EMAIL_ERROR, LOGIN_ERROR} = require("../utils/variables");

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: VALIDATION_EMAIL_ERROR,
      },
      required: true,
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
    name: {
      type: String,
      minlength: [2, 'Минимальная длина поля "name" - 2'],
      maxlength: [30, 'Максимальная длина поля "name" - 30'],
      required: true,
    },
  },
);

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) return Promise.reject(new Unauthorized(LOGIN_ERROR));
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) return Promise.reject(new Unauthorized(LOGIN_ERROR));
          return user;
        });
    });
};

module.exports = model('user', userSchema);
