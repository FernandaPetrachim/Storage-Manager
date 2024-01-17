const express = require('express');

const RouteProduct = express.Router();
const productCon = require('../controllers/ProductCon');

RouteProduct.get('/', productCon.getProducts1);
RouteProduct.get('/ :id/', productCon.getProductsId1);

module.exports = RouteProduct;