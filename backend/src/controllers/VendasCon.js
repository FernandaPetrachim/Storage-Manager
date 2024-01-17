const { salesService } = require('../services');
const StatusHttp = require('../HTTP/StatusHttp');

const getVendas = async (_req, res) => {
  const { status, data } = await salesService.getVendas();
  return res.status(StatusHttp(status)).json(data);
};
const getVendasById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.getVendasById(id);
  return res.status(StatusHttp(status)).json(data);
};

const inserirVendas = async (req, res) => {
  const itemsSold = req.body;
  const { status, data } = await salesService.insertVendas(itemsSold);
  return res.status(StatusHttp(status)).json(data);
};

const excuirVendas = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.ExcluirVendas(id);
  return res.status(StatusHttp(status)).json(data);
};

const atualizarVendas = async (req, res) => {
  const { saleId, productId } = req.params;
  const { quantity } = req.body;
  const { status, data } = await salesService.atualizarVendas(saleId, productId, quantity);
  return res.status(StatusHttp(status)).json(data);
};

module.exports = {
  getVendas,
  getVendasById,
  inserirVendas,
  excuirVendas,
  atualizarVendas,
};