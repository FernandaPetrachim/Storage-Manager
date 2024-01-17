const ServiceProduct = require('../services/ServiceProduct');
const StatusHttp = require('../HTTP/StatusHttp');

const getProducts1 = async (_req, res) => {
  const { status, data } = await ServiceProduct.getProduto();
  return res.status(StatusHttp(status)).json(data);
};

const getProductsId1 = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await ServiceProduct.getProdutoID(id);
  return res.status(StatusHttp(status)).json(data);
};

const inserirProduto = async (req, res) => {
  const { name } = req.body;
  const { status, data } = await ServiceProduct.inserirProduto(name);
  return res.status(StatusHttp(status)).json(data);
};

const atualizarProduto = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { status, data } = await ServiceProduct.atualizarProduto(id, name);
  return res.status(StatusHttp(status)).json(data);
};

module.exports = {
  getProducts1,
  getProductsId1,
  inserirProduto,
  atualizarProduto,
};
