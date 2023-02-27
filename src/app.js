const express = require("express");
const axios = require("axios");
const compression = require("compression");

const AppError = require('./utils/AppError');
const routes = require('./routes');

const app = express();
app.use(express.json());
app.use(compression());
app.use(routes);

app.use((err, req, res, next) => {
  if(err instanceof AppError) {
    return res. status(err.statusCode).json({
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

app.get("/", (req, res) => {
  res.send(`
    <p>/users - para receber a lista de usuários.</p>
    <p>/products - para receber a lista de produtos.</p>
    <p>/calculate - passando o id(number) do usuário e uma lista([n, n, n, ...]) com os id's dos produtos para receber o resultado.</p>
  `);
});

module.exports = { app };
