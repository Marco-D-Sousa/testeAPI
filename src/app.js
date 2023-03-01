const express = require("express");
const compression = require("compression");

const AppError = require('./errors/AppError');
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use(compression());
app.use(routes);

app.use(express.static('public'));

app.use((err, req, res, next) => {
  if(err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }

  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});

module.exports = { app };
