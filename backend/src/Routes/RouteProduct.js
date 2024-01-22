const express = require('express');

const RouteProduct = express.Router();
const productCon = require('../controllers/ProductCon');

RouteProduct.get('/', productCon.getProducts);
RouteProduct.get('/:id', productCon.getProductsId);
RouteProduct.post('/', productCon.inserirProduto);
RouteProduct.put('/:id', productCon.atualizarProduto);
/* RouteProduct.delete('/:id', productCon.excluirProduto); */

module.exports = RouteProduct;