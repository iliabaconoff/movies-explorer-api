const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config');
const Unauthorized = require('../utils/responsesWithError/Unauthorized');
const { TOKEN_ERROR } = require('../utils/constants');

const handleError = (res, req, next) => {
  next(new Unauthorized(TOKEN_ERROR));
};

module.exports = function authMiddleware(req, res, next) {
  const { authorization } = req.headers;
  let payload;

  if (!authorization || !authorization.startsWith('Bearer ')) return handleError(res, req, next);

  try {
    const token = req.headers.authorization.split(' ')[1];
    payload = jwt.verify(token, SECRET);
  } catch (err) {
    return handleError(res, req, next);
  }

  req.user = payload;

  return next();
};
