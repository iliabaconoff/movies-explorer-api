const usersRouter = require('express').Router();
const {
  updateUserData,
  getCurrentUser,
} = require('../controllers/users');
const {
  validateUserUpdate,
} = require('../utils/validationConfig');

usersRouter.get('/me', getCurrentUser);
usersRouter.patch('/me', validateUserUpdate, updateUserData);

module.exports = usersRouter;
