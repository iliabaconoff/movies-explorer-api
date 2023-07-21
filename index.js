const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const auth = require('./middlewares/auth');

const { errorLogger, requestLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const responseHandler = require('./middlewares/responseHandler');

const { MONGO_DB, PORT } = require('./utils/config');
const { validateLogin, validateRegistration } = require('./utils/validationConfig');
const { login, createUser } = require('./controllers/users');
const NotFound = require('./utils/responsesWithError/NotFound');

const app = express();
app.use(cors);
mongoose.set('strictQuery', false);
mongoose.connect(MONGO_DB);

app.use(helmet);
app.use(requestLogger);
app.use('/signup', validateRegistration, createUser);
app.use('/signin', validateLogin, login);

app.use('/movies', auth, require('./routes/moviesRouter'));
app.use('/users', auth, require('./routes/usersRouter'));

app.use('*', auth, (req, res, next) => next(new NotFound('Страница не найдена')));

app.use(errorLogger);
app.use(errors());
app.use(responseHandler);

app.listen(PORT, () => console.log('Сервер запушен на порту: ', PORT));
