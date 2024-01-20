const express = require('express');

const RouteVendas = express.Router();
const VendasCon = require('../controllers/VendasCon');

RouteVendas.get('/', VendasCon.getSales);
RouteVendas.get('/:id', VendasCon.getSalesById);
RouteVendas.post('/', VendasCon.inserirVendas);
RouteVendas.delete('/:id', VendasCon.excluirVendas);

module.exports = RouteVendas;