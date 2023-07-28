const NOT_FOUND_PATH_ERROR = 'Указанный путь не найден.';
const NOT_FOUND_ID_ERROR = 'Ресурс с таким ID не найден.';
const DUPLICATED_USER_ERROR = 'Пользователь с таким email уже зарегистрирован';
const FORBIDDEN_ERROR = 'Недостаточно прав.';
const TOKEN_ERROR = 'С токеном что-то не так...';
const SERVER_ERROR = 'На сервере произошла ошибка.';
const LOGIN_ERROR = 'Неправильная почта или пароль';
const VALIDATION_URL_ERROR = 'Некорректный URL';
const VALIDATION_EMAIL_ERROR = 'Некорректный email';

const CREATE_SUCCESS_STATUS = 201;
const DUPLICATE_STATUS = 11000;

module.exports = {
  NOT_FOUND_PATH_ERROR,
  NOT_FOUND_ID_ERROR,
  DUPLICATED_USER_ERROR,
  FORBIDDEN_ERROR,
  TOKEN_ERROR,
  SERVER_ERROR,
  LOGIN_ERROR,
  VALIDATION_URL_ERROR,
  VALIDATION_EMAIL_ERROR,
  CREATE_SUCCESS_STATUS,
  DUPLICATE_STATUS,
};
