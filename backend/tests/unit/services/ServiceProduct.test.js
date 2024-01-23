const sinon = require('sinon');
const { expect } = require('chai');

const ModelProduct = require('../../../src/models/ModelProduct');
const {
  produtoIdFromDB, novoProdutoFrom, newProdutoFromModel, atualizarFromModelProduto, 
} = require('../../../src/Mockar/MockProduct');
const ServiceProduct = require('../../../src/services/ServiceProduct');

describe('Realizando testes - product service', function () {
  afterEach(function () {
    sinon.restore();
  });
  
  it('Retorna produto com ID existente', async function () {
    sinon.stub(ModelProduct, 'findId1').resolves(produtoIdFromDB);
    const id = 1;
    const { data, status } = await ServiceProduct.getProdutoID(id);
  
    expect(status).to.be.equal('SUCCESSFUL');
    expect(data).to.be.deep.equal({ id: 1, name: 'Martelo de Thor' });
  });
  it('Não retorna produto com ID inexistente', async function () {
    sinon.stub(ModelProduct, 'findId1').resolves(undefined);

    const inputData = 999;
    const product = await ServiceProduct.getProdutoID(inputData);

    expect(product.status).to.equal('NOT_FOUND');
  });
  it('Insere um novo produto com sucesso', async function () {
    sinon.stub(ModelProduct, 'inserirProduto1').resolves(novoProdutoFrom);
    sinon.stub(ModelProduct, 'findId1').resolves(newProdutoFromModel);

    const inputData = 'ProdutoX';
    const product = await ServiceProduct.inserirProduto(inputData);

    expect(product.status).to.equal('CREATED');
    expect(product.data).to.be.deep.equal(newProdutoFromModel);
  });
  it('Testa o retorno quando o name tem menos de 5 caracteres', async function () {
    sinon.stub(ModelProduct, 'inserirProduto1').resolves(novoProdutoFrom);
    sinon.stub(ModelProduct, 'findId1').resolves(newProdutoFromModel);

    const inputData = 'Prod';
    const product = await ServiceProduct.inserirProduto(inputData);

    expect(product.status).to.equal('INVALID_VALUE');
    expect(product.data.message).to.equal('"name" length must be at least 5 characters long');
  });
  it('Testa o retorno quando o name for undefined', async function () {
    sinon.stub(ModelProduct, 'inserirProduto1').resolves(novoProdutoFrom);
    sinon.stub(ModelProduct, 'findId1').resolves(newProdutoFromModel);

    const inputData = '';
    const product = await ServiceProduct.inserirProduto(inputData);

    expect(product.status).to.equal('BAD_REQUEST');
    expect(product.data.message).to.equal('"name" is required');
  });
  it('Atualiza um produto com sucesso', async function () {
    sinon.stub(ModelProduct, 'findId1').resolves(produtoIdFromDB);
    sinon.stub(ModelProduct, 'atualizar').resolves(atualizarFromModelProduto);

    const inputData = { id: 1, name: 'ProdutoX' };
    const product = await ServiceProduct.atualizarProduto(inputData.id, inputData.name);

    expect(product.status).to.equal('SUCCESSFUL');
    expect(product.data).to.be.deep.equal(atualizarFromModelProduto);
  });
  it('Não atualiza quando o name tem menos de 5 caracteres', async function () {
    sinon.stub(ModelProduct, 'findId1').resolves(produtoIdFromDB);
    sinon.stub(ModelProduct, 'atualizar').resolves(atualizarFromModelProduto);

    const inputData = { id: 1, name: 'Prod' };
    const product = await ServiceProduct.atualizarProduto(inputData.id, inputData.name);

    expect(product.status).to.equal('INVALID_VALUE');
    expect(product.data.message).to.equal('"name" length must be at least 5 characters long');
  });
  it('Não atualiza quando o name for undefined', async function () {
    sinon.stub(ModelProduct, 'findId1').resolves(produtoIdFromDB);
    sinon.stub(ModelProduct, 'atualizar').resolves(atualizarFromModelProduto);

    const inputData = { id: 1, name: '' };
    const product = await ServiceProduct.atualizarProduto(inputData.id, inputData.name);

    expect(product.status).to.equal('BAD_REQUEST');
    expect(product.data.message).to.equal('"name" is required');
  });
});
