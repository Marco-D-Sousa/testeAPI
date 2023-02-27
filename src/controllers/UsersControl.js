const axios = require("axios");

const AppError = require("../utils/AppError");
const { URL, usersURL, productsURL } = require('../utils/URLs');

class UsersControl {
  async index(req, res, next) {
    try {
      const response = await axios.get(usersURL);
      const users = response.data;
      res.send(users);
    } catch (error) {
      return next(new AppError(`Bad request: ${error.message}`, 400));
    }
  }

  async calculate(req, res, next) {
    const { userId, productList } = req.body;

    if (!userId || !productList) {
      return next(new AppError("userId and productList are required!", 400));
    }

    try {
      const responseUsers = await axios.get(usersURL);
      const users = responseUsers.data;

      if (userId < 1 || userId > users.length) {
        return next(new AppError(`UserId must be between 1 and ${users.length}.`, 400));
      }

      const userTaxRaw = users[userId - 1]["tax"];
      let tax = (100 - userTaxRaw / 100) / 100;

      const responseProducts = await axios.get(productsURL);
      const products = responseProducts.data;

      let totalPrice = 0;
      for (const idProduct of productList) {
        totalPrice += products[idProduct]["price"];
      }
      let total = tax * totalPrice;

      res.json({
        userTax: userTaxRaw / 100,
        totalPrice: totalPrice,
        totalValueToBePaid: total.toFixed(2),
      });
    } catch (err) {
      return next(new AppError(`Internal Server Error: ${err.message}`, 500));
    }
  }
}

module.exports = UsersControl;
