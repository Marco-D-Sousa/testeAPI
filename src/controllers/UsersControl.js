const axios = require("axios");

const AppError = require("../errors/AppError");
const { URL, usersURL, productsURL } = require('../config/URLs');

class UsersControl {
/**
* @api {get} /users Index
* @apiName GetUsers
* @apiGroup Users
* @apiSuccess {JSON} response lista de usuários
* @apiSuccessExample {json} Sucess-Response
*   HTTP/1.1 200 OK
*    [{"id": 1, "name": "Fulano", "tax": 79}, 
*     {"id": 2, "name": "Beltrano", "tax": 121}, 
*     {"id": 3, "name": "Ciclano", "tax": 210}]
* @apiError BadRequest 400
* @apiErrorExample {json} Error-Response
*   HTTP/1.1 400 Bad Request
*   {
*     "error": "Bad Request"
*   }
**/
  async index(req, res, next) {
    try {
      const response = await axios.get(usersURL);
      const users = response.data;
      res.send(users);
    } catch (error) {
      return next(new AppError(`Bad request: ${error.message}`, 400));
    }
  }

/**
* @api {post} /users/calculate Orçamento
* @apiName PostUsers
* @apiGroup Users
* @apiParam {number} userId id do usuário
* @apiParam {array} productList lista de id's de produtos
* @apiSuccess {json} response resultado baseado no total da soma dos "prices" dos produtos informados, diminuído da porcentagem da "tax" do usuário informado  
* @apiSuccessExample {json} Sucess-Response
*   HTTP/1.1 200 OK
*   [{"totalValueToBePaid": "2403.59"]
* @apiError BadRequest 400
* @apiErrorExample {json} Error-Response
*   HTTP/1.1 400 Bad Request
*   {
*     "error": "Bad Request"
*   }
* @apiErrorExample {json} Error-Response
*   HTTP/1.1 400 Bad Request
*   {
*     "error": "userId and productList are required!"
*   }
* @apiErrorExample {json} Error-Response
*   HTTP/1.1 400 Bad Request
*   {
*     "error": "userId must be between 1 and 100"
*   }
**/
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
        totalValueToBePaid: total.toFixed(2),
      });
    } catch (err) {
      return next(new AppError(`Internal Server Error: ${err.message}`, 500));
    }
  }
}

module.exports = UsersControl;
