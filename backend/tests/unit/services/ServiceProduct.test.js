const chai = require('chai');
const sinon = require('sinon');
const { findAll1, findId1, inserirProduto1, atualizar } = require('../../../src/models/ModelProduct');
const {
  getProduto,
  getProdutoID,
  inserirProduto,
  atualizarProduto,
} = require('../../../src/controllers/ProductCon'); 

const { expect } = chai;

describe('Testes para funções do controlador', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('getProduto deve retornar produtos com status "SUCCESSFUL"', async function () {
    const findAll1Stub = sinon.stub().resolves([{ id: 1, name: 'Produto 1' }]);
    sinon.replace(findAll1, 'findAll1', findAll1Stub);

    const result = await getProduto();

    expect(result.status).to.equal('SUCCESSFUL');
    expect(result.data).to.deep.equal([{ id: 1, name: 'Produto 1' }]);
  });

  it('getProdutoID deve retornar produto com status "SUCCESSFUL" quando encontrado', async function () {
    const findId1Stub = sinon.stub().resolves({ id: 1, name: 'Produto 1' });
    sinon.replace(findId1, 'findId1', findId1Stub);

    const result = await getProdutoID(1);

    expect(result.status).to.equal('SUCCESSFUL');
    expect(result.data).to.deep.equal({ id: 1, name: 'Produto 1' });
  });

  it('getProdutoID deve retornar status "NOT_FOUND" quando produto não encontrado', async function () {
    const findId1Stub = sinon.stub().resolves(null);
    sinon.replace(findId1, 'findId1', findId1Stub);

    const result = await getProdutoID(999);

    expect(result.status).to.equal('NOT_FOUND');
    expect(result.data.message).to.equal('Product not found');
  });

  it('inserir Produto deve retornar status "CREATED" ao inserir um produto válido', async function () {
    const inserirProduto1Stub = sinon.stub().resolves(1);
    const findId1Stub = sinon.stub().resolves({ id: 1, name: 'Novo Produto' });
    sinon.replace(inserirProduto1, 'inserirProduto1', inserirProduto1Stub);
    sinon.replace(findId1, 'findId1', findId1Stub);

    const result = await inserirProduto('Novo Produto');

    expect(result.status).to.equal('CREATED');
    expect(result.data).to.deep.equal({ id: 1, name: 'Novo Produto' });
  });

  it('inserir Produto deve retornar status "BAD_REQUEST" ao inserir um produto inválido', async function () {
    const result = await inserirProduto('Prod');

    expect(result.status).to.equal('BAD_REQUEST');
    expect(result.data.message).to.equal('"name" length must be at least 5 characters long');
  });

  it('atualizar Produto deve retornar status "SUCCESSFUL" ao atualizar um produto válido', async function () {
    const findId1Stub = sinon.stub().resolves({ id: 1, name: 'Produto Existente' });
    const atualizarStub = sinon.stub().resolves();
    sinon.replace(findId1, 'findId1', findId1Stub);
    sinon.replace(atualizar, 'atualizar', atualizarStub);

    const result = await atualizarProduto(1, 'Novo Nome');

    expect(result.status).to.equal('SUCCESSFUL');
    expect(result.data).to.deep.equal({ id: 1, name: 'Novo Nome' });
  });

  it('atualizar Produto deve retornar status "BAD_REQUEST" ao atualizar um produto com nome inválido', async function () {
    const result = await atualizarProduto(1, 'Prod');

    expect(result.status).to.equal('BAD_REQUEST');
    expect(result.data.message).to.equal('"name" length must be at least 5 characters long');
  });

  it('atualizar Produto deve retornar status "NOT_FOUND" ao tentar atualizar um produto inexistente', async function () {
    const findId1Stub = sinon.stub().resolves(null);
    sinon.replace(findId1, 'findId1', findId1Stub);

    const result = await atualizarProduto(999, 'Novo Nome');

    expect(result.status).to.equal('NOT_FOUND');
    expect(result.data.message).to.equal('Product not found');
  });
});
