const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { NOT_FOUND_PATH_ERROR } = require('../utils/constants');
const NotFound = require('../utils/responsesWithError/NotFound');
const { validateLogin, validateRegistration } = require('../utils/validationConfig');

router.use('/users', auth, require('./usersRouter'));
router.use('/movies', auth, require('./moviesRouter'));

router.post('/signin', validateLogin, login);
router.post('/signup', validateRegistration, createUser);

router.use('*', auth, (req, res, next) => next(new NotFound(NOT_FOUND_PATH_ERROR)));

module.exports = router;
