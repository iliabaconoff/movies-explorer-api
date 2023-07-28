const SECRET = process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev';
const MONGO_DB = process.env.MONGO_DB || 'mongodb://127.0.0.1:27017/bitfilmsdb';
const PORT = process.env.PORT || 3000;

const productionPaths = [
  'https://moviefinder.nomoredomains.xyz',
  'http://moviefinder.nomoredomains.xyz',
  'http://localhost:3000',
  'http://localhost:3001',
];

const devPaths = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://moviefinder.nomoredomains.xyz',
  'http://moviefinder.nomoredomains.xyz',
];

const GLOBAL_CFG = {
  cors: {
    allowOrigins: process.env.NODE_ENV === 'production' ? productionPaths : devPaths,
  },
};

module.exports = {
  SECRET, MONGO_DB, PORT, GLOBAL_CFG,
};
