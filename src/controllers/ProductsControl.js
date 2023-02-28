const axios = require("axios");

const AppError = require("../errors/AppError");
const { productsURL } = require('../config/URLs');

class ProductsControl {
  async index(req, res, next) {
    try {
      const response = await axios.get(productsURL);
      const products = response.data;
      res.send(products);
    } catch (error) {
      return next(new AppError(`Bad request: ${error.message}`, 400));
    }
  }
}

module.exports = ProductsControl;
