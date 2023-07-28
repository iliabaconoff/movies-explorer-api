const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');

const { errorLogger, requestLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const responseHandler = require('./middlewares/responseHandler');

const { MONGO_DB, PORT } = require('./utils/config');
const { LIMITER } = require('./utils/limiter');
const router = require('./routes');

const app = express();
app.use(cors);
mongoose.set('strictQuery', false);
mongoose.connect(MONGO_DB);

app.use(helmet());
app.use(LIMITER);

app.use(requestLogger);
app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(responseHandler);

app.listen(PORT, () => console.log('Сервер запушен на порту: ', PORT));
