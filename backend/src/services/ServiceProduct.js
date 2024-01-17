const { ModelPorduct } = require('../models/ModelProduct');

const getProduto = async () => {
  const products = await ModelPorduct.findAll();
  return { status: 'SUCCESSFUL', data: products };
};
  
const getProdutoID = async (id) => {
  const produto = await ModelPorduct.findById(id);
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
  const id1 = await ModelPorduct.insert(name);
  const product = await ModelPorduct.findById(id1);
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

  const productExists = await ModelPorduct.findById(id);

  if (!productExists) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  await ModelPorduct.update(id, name);

  return { status: 'SUCCESSFUL', data: { id: Number(id), name } };
};

module.exports = {
  getProduto,
  getProdutoID,
  inserirProduto,
  atualizarProduto,
};