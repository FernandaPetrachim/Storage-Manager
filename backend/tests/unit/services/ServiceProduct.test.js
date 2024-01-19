const sinon = require('sinon');
const { expect } = require('chai');
const ServiceVendas = require('../../../src/services/ServiceVendas');
const {
  vendasFromModel,
  vendasServiceSuccessoful,
} = require('../../../src/Mockar/MockVendas');
const ModelProduct = require('../../../src/models/ModelProduct');
const {
  produtotIdFromDB,
  productIdFromModel,
  produtoIdFromDB,
} = require('../../../src/Mockar/MockProduct');
const ServiceProduct = require('../../../src/services/ServiceProduct');

describe('Realizando os testes - sales service', function () {
  it('Retornando todos os sales com sucesso', async function () {
    sinon.stub(ServiceVendas, 'getVendas').resolves(vendasServiceSuccessoful);

    const { status, data } = await ServiceVendas.getVendas();

    expect(status).to.equal('SUCCESSFUL');
    expect(data).to.deep.equal(vendasFromModel);
  }); 
  it('Retorna produto com ID existente', async function () {
    sinon.stub(ModelProduct, 'findId1').resolves(produtoIdFromDB);
  
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    const inputData = 1;
    await ServiceProduct.getProdutoID(inputData, req, res);
  
    expect(res.status.calledWith('SUCCESSFUL'));
    expect(res.json.calledWith(productIdFromModel));
  });
});
