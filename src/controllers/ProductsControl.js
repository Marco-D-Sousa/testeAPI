const axios = require("axios");

const AppError = require("../errors/AppError");
const { productsURL } = require('../config/URLs');

class ProductsControl {
  
/**
* @api {get} /products Index
* @apiName GetProducts
* @apiGroup Products
* @apiSuccess {JSON} response lista de produtos
* @apiSuccessExample {json} Sucess-Response
*   HTTP/1.1 200 OK
*   [{"id": 1, "name": "máquina de fazer máquinas", "price": 79}, 
*    {"id": 2, "name": "laptop gamming", "price": 2500},
*    {"id": 3, "name": "TV FullHD 42 polegadas", "price": 1799}]
* @apiError BadRequest 400
* @apiErrorExample {json} Error-Response
*   HTTP/1.1 400 Bad Request
*   {
*     "error": "Bad Request"
*   }
**/
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
