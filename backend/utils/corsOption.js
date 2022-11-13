module.exports.corsOptions = {
  origin: [
    // 'https://praktikum.tk',
    // 'http://praktikum.tk',
    'http://localhost:3000',
  ],
  // optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
