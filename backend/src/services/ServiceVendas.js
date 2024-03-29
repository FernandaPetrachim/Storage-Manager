const ModelProduct = require('../models/ModelProduct');
const ModelVendas = require('../models/ModelVendas');

const getVendas = async () => {
  const sales = await ModelVendas.findModel1();
  return { status: 'SUCCESSFUL', data: sales }; // ok
};
const getVendasById = async (id) => {
  const sale = await ModelVendas.findIdModel1(id);
  if (sale.length === 0) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  return { status: 'SUCCESSFUL', data: sale };
};

const inserirVendas = async (itemsSold) => {
  const data = itemsSold.map(async ({ productId }) => {
    const insertId = await ModelProduct.findId1(productId);
    if (!insertId) {
      return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
    }
    return false;
  });

  const dataResult1 = await Promise.all(data);
  if (dataResult1.find((item) => !(!item))) return dataResult1.find((item) => !(!item));

  const id = await ModelVendas.inserirVendas();
  console.log(id);
  const itemsSoldPromisses = itemsSold 
    .map(async ({ productId, quantity }) => ModelVendas
      .inserirVendasProduto(id, productId, quantity));
  await Promise.all(itemsSoldPromisses);
  return { status: 'CREATED', data: { id, itemsSold } };
};

const excluirVendas = async (id) => {
  const sale = await ModelVendas.findByIdVendas(id);
  if (sale.length === 0) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  await ModelVendas.excluirVendas(id);
  return { status: 'NO_CONTENT' };
};

const atualizarVendas = async (saleId, produtoId, quantidade) => {
  const sale = await ModelVendas.findByIdVendas(saleId);
  if (sale.length === 0) return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  const product = await ModelVendas.findByIdProductVendas(produtoId);
  if (product.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found in sale' } };
  }
  await ModelVendas.atualizarVendas(saleId, produtoId, quantidade);
  const [data] = await ModelVendas.findByIdProductVendas(saleId, produtoId);
  return { status: 'SUCCESSFUL',
    data };
};

module.exports = {
  getVendas,
  getVendasById,
  inserirVendas,
  excluirVendas,
  atualizarVendas,
};