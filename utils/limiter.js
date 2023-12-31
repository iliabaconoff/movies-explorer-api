const rateLimit = require('express-rate-limit');

const LIMITER = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = {
  LIMITER,
};
