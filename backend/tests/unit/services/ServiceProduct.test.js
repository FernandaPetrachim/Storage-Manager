const sinon = require('sinon');
const { expect } = require('chai');
const ServiceVendas = require('../../../src/services/ServiceVendas');
const {
  vendasFromModel,
} = require('../../../src/Mockar/MockVendas');
const ModelProduct = require('../../../src/models/ModelProduct');
const {
  produtoIdFromDB, 
} = require('../../../src/Mockar/MockProduct');
const ServiceProduct = require('../../../src/services/ServiceProduct');
const ModelVendas = require('../../../src/models/ModelVendas');

describe('Realizando os testes - sales service', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Retornando todos os sales com sucesso', async function () {
    sinon.stub(ModelVendas, 'findModel1').resolves(vendasFromModel);

    const { status, data } = await ServiceVendas.getVendas();

    expect(status).to.equal('SUCCESSFUL');
    expect(data).to.deep.equal(vendasFromModel);
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
  /*  it('Insere um novo produto com sucesso', async function () {
    sinon.stub(ModelProduct, 'inserirProduto1').resolves(novoProdutoFrom);
    sinon.stub(ModelProduct, 'findId1').resolves(novoProdutoFrom);

    const inputData = 'ProdutoX';
    await ServiceProduct.inserirProduto(inputData);
    sinon.assert.calledWith(status, 'CREATED');
    expect(res.status).to.be.equal('CREATED');
    expect(res.json).to.be.deep.equal(novoProdutoFrom);
    // Restaurar os stubs após o teste
    sinon.InserirProduto.restore();
    sinon.FindId.restore();
  }); */
});
