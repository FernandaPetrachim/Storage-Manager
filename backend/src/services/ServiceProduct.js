const { findAll1, findId1, inserirProduto1, atualizar } = require('../models/ModelProduct');

const getProduto = async () => {
  const products = await findAll1();
  return { status: 'SUCCESSFUL', data: products };
};
  
const getProdutoID = async (id) => {
  const produto = await findId1(id);
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
  const id1 = await inserirProduto1(name);
  const product = await findId1(id1);
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

  const productExists = await findId1(id);

  if (!productExists) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  await atualizar(id, name);

  return { status: 'SUCCESSFUL', data: { id: Number(id), name } };
};

module.exports = {
  getProduto,
  getProdutoID,
  inserirProduto,
  atualizarProduto,
};
