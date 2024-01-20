const { expect } = require('chai');
const sinon = require('sinon');
const ModelVendas = require('../../../src/models/ModelVendas');
const ServiceVendas = require('../../../src/services/ServiceVendas');
const { vendasFromDB1, vendasFromModel, vendasIdFromModel, novasVendasFromModel, delVendasFromDB } = require('../../../src/Mockar/MockVendas');

describe('Realizando os testes - sales service', function () {
  beforeEach(function () {
    sinon.restore();
  });
  it('Retornando todos os sales com sucesso', async function () {
    sinon.stub(ModelVendas, 'findModel1').resolves(vendasFromDB1);

    const sales = await ServiceVendas.getVendas();

    expect(sales.status).to.equal('SUCCESSFUL');
    expect(sales.data).to.be.deep.equal(vendasFromModel);
  });
  it('Retorna o sale com ID existente', async function () {
    sinon.stub(ModelVendas, 'findIdModel1').resolves(vendasIdFromModel);

    const inputData = 1;
    const sale = await ServiceVendas.getVendasById(inputData);

    expect(sale.status).to.equal('SUCCESSFUL');
    expect(sale.data).to.be.deep.equal(vendasIdFromModel);
  });
  /*  it('Não retorna o sale com ID inexistente', async function () {
    sinon.stub(ModelVendas, 'findIdModel1').resolves();

    const inputData = 999;
    const sale = await ServiceVendas.getVendasById(inputData);

    expect(sale.status).to.equal('NOT_FOUND');
    expect(sale.data.message).to.equal('Sale not found');
  }); */
  it('Não insere um novo sale com produto inexistente', async function () {
    sinon.stub(ModelVendas, 'inserirVendasProduto').resolves({ status: 'NOT_FOUND', data: { message: 'Product not found' } });
    sinon.stub(ModelVendas, 'inserirVendas').resolves(4);

    const inputData = [{ productId: 999, quantity: 5 }];
    const sale = await ServiceVendas.inserirVendas(inputData);

    expect(sale.status).to.equal('NOT_FOUND');
    expect(sale.data.message).to.equal('Product not found');
  });
  it('Inserir um novo sale com sucesso', async function () {
    sinon.stub(ModelVendas, 'inserirVendas').resolves(4);
    sinon.stub(ModelVendas, 'inserirVendasProduto').resolves(4);

    const inputData = [{ productId: 1, quantity: 5 }];
    const sale = await ServiceVendas.inserirVendas(inputData);

    expect(sale.status).to.equal('CREATED');
    expect(sale.data).to.be.deep.equal(novasVendasFromModel);
  }); 
  it('Deleta um sale com ID inexistente', async function () {
    sinon.stub(ModelVendas, 'findByIdVendas').resolves([]);

    const inputData = 999;
    const sale = await ServiceVendas.excluirVendas(inputData);

    expect(sale.data.message).to.equal('Sale not found');
    expect(sale.status).to.equal('NOT_FOUND');
  });
  it('Deleta um sale com sucesso', async function () {
    sinon.stub(ModelVendas, 'findByIdVendas').resolves(delVendasFromDB);
    sinon.stub(ModelVendas, 'excluirVendas').resolves();

    const inputData = 1;
    const sale = await ServiceVendas.excluirVendas(inputData);

    expect(sale.status).to.equal('NO_CONTENT');
  });
  afterEach(function () {
    sinon.restore();
  });
});