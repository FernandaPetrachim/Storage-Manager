// Importar os módulos necessários
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const productCon = require('../../../src/controllers/ProductCon');
const ServiceProduct = require('../../../src/services/ServiceProduct');

const { expect } = chai;
chai.use(sinonChai);

const {
  produtoServiceSuccess,
  produtoIDServiceNot,
  novoProdutoServiceInvalid,
  novoProdutoServiceBad,
  atualizarProdutoServiceSuccesso,
  atualizarProdutoServiceNot,
  atualizarProdutoServiceBad,
  atualizarFromModelProduto,
} = require('../../../src/Mockar/MockProduct');

describe('Realizando testes - controlador de produto', function () {
  beforeEach(function () {
    sinon.restore();
  });
  it('Retornando todos os produtos com sucesso - 200', async function () {
    sinon.stub(ServiceProduct, 'getProduto').resolves(produtoServiceSuccess);
    
    const req = {
      body: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await productCon.getProducts1(req, res);
    
    expect(res.status).to.have.been.calledWith(200);
  });

  it('Retornando um produto com falha - 404', async function () {
    sinon.stub(ServiceProduct, 'getProdutoID').resolves(produtoIDServiceNot);
    
    const req = {
      params: { id: 999 },
      body: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await productCon.getProductsId1(req, res);
    
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'message' });
  });
  
  it('Retornando um produto com sucesso - 200', async function () {
    sinon.stub(ServiceProduct, 'getProdutoID').resolves(produtoServiceSuccess);
    
    const req = {
      params: { id: 1 },
      body: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await productCon.getProductsId1(req, res);
    
    expect(res.status).to.have.been.calledWith(200);
  });
  
  it('Insere um novo produto com falha - 422', async function () {
    sinon.stub(ServiceProduct, 'inserirProduto').resolves(novoProdutoServiceInvalid);
    const req = {
      body: { name: 'Prod' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productCon.inserirProduto(req, res);

    expect(res.json).to.have.been.calledWith(({ message: 'message' }));
    expect(res.status).to.have.been.calledWith(422);
  });
  it('Insere um novo produto com falha - 400', async function () {
    sinon.stub(ServiceProduct, 'inserirProduto').resolves(novoProdutoServiceBad);
    const req = {
      body: { name: '' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productCon.inserirProduto(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith(({ message: 'message' }));
  });
  it('Atualiza um produto com sucesso - 200', async function () {
    sinon.stub(ServiceProduct, 'atualizarProduto').resolves(atualizarProdutoServiceSuccesso);
    const req = {
      params: { id: 1 },
      body: { name: 'ProdutoX' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productCon.atualizarProduto(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(atualizarFromModelProduto);
  });
 /*  it('Atualizar um produto com falha - 422', async function () {
    sinon.stub(ServiceProduct, 'atualizarProduto').resolves(atualizarProdutoServiceSuccesso);
    const req = {
      params: { id: 1 },
      body: { name: 'Prod' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productCon.atualizarProduto(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith(({ message: 'message' }));
  }); */
  it('Atualiza um produto com falha - 400', async function () {
    sinon.stub(ServiceProduct, 'atualizarProduto').resolves(atualizarProdutoServiceBad);
    const req = {
      params: { id: 1 },
      body: { name: '' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productCon.atualizarProduto(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith(({ message: 'message' }));
  });
  it('Atualiza um produto com falha - 404', async function () {
    sinon.stub(ServiceProduct, 'atualizarProduto').resolves(atualizarProdutoServiceNot);
    const req = {
      params: { id: 999 },
      body: { name: 'ProdutoX' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productCon.atualizarProduto(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(({ message: 'message' }));
  });
}); 
