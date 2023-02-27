const axios = require("axios");

const AppError = require("../utils/AppError");
const { productsURL } = require('../utils/URLs');

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
