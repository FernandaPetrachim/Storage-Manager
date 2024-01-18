const sinon = require('sinon');
const { expect } = require('chai');
const ServiceVendas = require('../../../src/services/ServiceVendas');
const {
  vendasFromModel,
  vendasServiceSuccessoful,
} = require('../../../src/Mockar/MockVendas');

describe('Realizando os testes - sales service', function () {
  it('Retornando todos os sales com sucesso', async function () {
    sinon.stub(ServiceVendas, 'getVendas').resolves(vendasServiceSuccessoful);

    const { status, data } = await ServiceVendas.getVendas();

    expect(status).to.equal('SUCCESSFUL');
    expect(data).to.deep.equal(vendasFromModel);
  }); 
});
