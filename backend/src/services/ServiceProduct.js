const Model = require('../models/ModelProduct');

const getProduto = async () => {
  const products = await Model.findAll1();
  return { status: 'SUCCESSFUL', data: products };
};
  
const getProdutoID = async (id) => {
  const produto = await Model.findId1(id);
  if (!produto) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  return { status: 'SUCCESSFUL', data: produto };
};

const inserirProduto = async (name) => {
  if (!name) {
    return { status: 'BAD_REQUEST', data: { message: '"name" is required' } };
  }
  if (name.length < 5) {
    return { status: 'INVALID_VALUE',
      data: { message: '"name" length must be at least 5 characters long' } };
  }
  const id1 = await Model.inserirProduto1(name);
  const product = await Model.findId1(id1);
  return { status: 'CREATED', data: product };
};

const atualizarProduto = async (id, name) => {
  if (!name) {
    return { status: 'BAD_REQUEST', data: { message: '"name" is required' } };
  }

  if (name.length < 5) {
    return {
      status: 'INVALID_VALUE',
      data: { message: '"name" length must be at least 5 characters long' },
    };
  }

  const productExists = await Model.findId1(id);

  if (!productExists) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  await Model.atualizar(id, name);

  return { status: 'SUCCESSFUL', data: { id: Number(id), name } };
};
const deleteProduto = async (id) => {
  const produtoTem = await Model.findId1(id);
  if (!produtoTem) return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  await Model.deleteProduto(id);
  return { status: 'NO_CONTENT' };
};

module.exports = {
  getProduto,
  getProdutoID,
  inserirProduto,
  atualizarProduto,
  deleteProduto,
};
//