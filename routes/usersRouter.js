const userRouter = require('express').Router();
const { getCurrentUser, updateUserData } = require('../controllers/users');
const { validateUserUpdate } = require('../utils/validationConfig');

userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', validateUserUpdate, updateUserData);

module.exports = userRouter;
