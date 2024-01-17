const express = require('express');

const RouteProduct = express.Router();
const productCon = require('../controllers/ProductCon');

RouteProduct.get('/', productCon.getProducts);
RouteProduct.get('/:id', productCon.getProductsId);

module.exports = RouteProduct;