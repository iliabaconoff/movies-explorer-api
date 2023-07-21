const SECRET = 'ddf14c084150aa30553a3bb1132c952e';
const MONGO_DB = process.env.MONGO_DB || 'mongodb://127.0.0.1:27017';
const PORT = process.env.PORT || 3000;

module.exports = {
  SECRET, MONGO_DB, PORT,
};
