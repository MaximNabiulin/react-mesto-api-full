module.exports.corsOptions = {
  origin: [
    'localhost:3000',
    'http://localhost:3000',
    'https://localhost:3000',
    'http://mesto.nabiulin.nomoredomains.icu',
    'https://mesto.nabiulin.nomoredomains.icu',
  ],
  // optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
