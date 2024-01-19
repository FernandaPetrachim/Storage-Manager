const ServiceVendas = require('../services/ServiceVendas');
const StatusHttp = require('../HTTP/StatusHttp');

const getSales = async (_req, res) => {
  const { status, data } = await ServiceVendas.getVendas();// STUB SUBSTITUIT NO LOCAL
  return res.status(StatusHttp(status)).json(data);
};
const getSalesById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await ServiceVendas.getVendasById(id);
  return res.status(StatusHttp(status)).json(data);
};

const inserirVendas = async (req, res) => {
  const itemsSold = req.body;
  const { status, data } = await ServiceVendas.inserirVendas(itemsSold);
  return res.status(StatusHttp(status)).json(data);
};

const excluirVendas = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await ServiceVendas.excluirVendas(id);
  return res.status(StatusHttp(status)).json(data);
};

const atualizarVenda = async (req, res) => {
  const { quantity } = req.body;
  const { saleId, productId } = req.params;
  const { status, data } = await ServiceVendas.atualizarVendas(saleId, productId, quantity);
  return res.status(StatusHttp(status)).json(data);
};

module.exports = {
  getSales,
  getSalesById,
  inserirVendas,
  excluirVendas,
  atualizarVenda,
};