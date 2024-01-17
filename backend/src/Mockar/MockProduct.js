const produtoFromModel = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];
  
const produtoIdFromModel = {
  id: 1,
  name: 'Martelo de Thor',
};
  
const produtoIDServiceNot = {
  status: 'NOT_FOUND',
  data: { message: 'message' },
};
const produtoServiceSuccess = {
  status: 'SUCCESSFUL',
  data: produtoFromModel,
};
  
const produtoIDServiceSuccess = {
  status: 'SUCCESSFUL',
  data: produtoIdFromModel,
};
  
const produtoFromDB = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
  {
    id: 3,
    name: 'Escudo do Capitão América',
  },
];
  
const produtoIdFromDB = {
  id: 1,
  name: 'Martelo de Thor',
};
  
const newProdutoFromModel = {
  id: 4,
  name: 'ProdutoX',
};
  
const newProdutoServiceSuccess = {
  status: 'CREATED',
  data: newProdutoFromModel,
};
  
const novoProdutoServiceInvalid = {
  status: 'INVALID_VALUE',
  data: { message: 'message' },
};
  
const novoProdutoServiceBad = {
  status: 'BAD_REQUEST',
  data: { message: 'message' },
};
  
const novoProdutoFrom = { insertId: 4 };
  
const atualizarFromModelProduto = {
  id: 1,
  name: 'ProdutoX',
};
  
const atualizarProdutoServiceSuccesso = {
  status: 'SUCCESSFUL',
  data: atualizarFromModelProduto,
};
  
const atualizarProdutoServiceInvalid = {
  status: 'INVALID_VALUE',
  data: { message: 'message' },
};
  
const atualizarProdutoServiceNot = {
  data: { message: 'message' },
  status: 'NOT_FOUND',
};
const atualizarProdutoServiceBad = {
  status: 'BAD_REQUEST',
  data: { message: 'message' },
};
  
module.exports = {
  produtoFromModel,
  produtoIdFromModel,
  produtoIDServiceNot,
  produtoServiceSuccess,
  produtoIDServiceSuccess,
  produtoFromDB,
  produtoIdFromDB,
  newProdutoFromModel,
  newProdutoServiceSuccess,
  novoProdutoServiceInvalid,
  novoProdutoServiceBad,
  novoProdutoFrom,
  atualizarFromModelProduto,
  atualizarProdutoServiceSuccesso,
  atualizarProdutoServiceInvalid,
  atualizarProdutoServiceNot,
  atualizarProdutoServiceBad,  
};
