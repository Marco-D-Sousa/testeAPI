const { Router } = require('express');

const ProductsControl = require('../controllers/ProductsControl');

const productsRoutes = Router();
const productsControl = new ProductsControl();

productsRoutes.get("/", productsControl.index);

module.exports = productsRoutes;