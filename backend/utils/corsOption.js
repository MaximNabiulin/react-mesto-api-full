module.exports.corsOptions = {
  origin: [
    'https://mesto.nabiulin.nomoredomains.icu',
    'http://localhost:3000',
  ],
  // optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
