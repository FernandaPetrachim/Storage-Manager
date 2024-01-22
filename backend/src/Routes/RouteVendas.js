const express = require('express');

const RouteVendas = express.Router();
const VendasCon = require('../controllers/VendasCon');
const validadacaoVendas = require('../middlewares/validacaoVendas');

RouteVendas.get('/', VendasCon.getSales);
RouteVendas.get('/:id', VendasCon.getSalesById);
RouteVendas.post('/', validadacaoVendas, VendasCon.inserirVendas);
RouteVendas.delete('/:id', VendasCon.excluirVendas);
/* RouteVendas.put('/:vendaId/produto/:produtoId', validacaoVendasProduct, VendasCon.atualizarVenda); .. */

module.exports = RouteVendas;