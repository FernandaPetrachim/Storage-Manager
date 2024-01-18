const sinon = require('sinon');
const { expect } = require('chai');
const ServiceVendas = require('../../../src/services/ServiceVendas');
const {
  vendasFromModel,
  vendasFromDB1,
} = require('../../../src/Mockar/MockVendas');

describe('Realizando os testes - sales service', function () {
  it('Retornando todos os sales com sucesso', async function () {
    sinon.stub(ServiceVendas, 'getVendas').resolves(vendasFromDB1);

    const { status, data } = await ServiceVendas.getSales();

    expect(status).to.equal('SUCCESSFUL');
    expect(data).to.be.property(vendasFromModel);
  }); 
/* const sinon = require('sinon');
const { expect } = require('chai');
const ServiceVendas = require('../../../src/services/ServiceVendas');
const ModelVendas = require('../../../src/models/ModelVendas');
const {
  vendasFromModel,
  vendasFromDB1,
} = require('../../../src/Mockar/MockVendas');

describe('Realizando os testes - sales service', function () {
  it('Retornando todos os sales com sucesso', async function () {
    const stub = sinon.stub(ModelVendas.prototype, 'getVendas').resolves(vendasFromDB1);

    const { status, data } = await ServiceVendas.getSales();

    expect(status).to.equal('SUCCESSFUL');
    expect(data).to.be.property(vendasFromModel);

    // Restaure o stub após o teste
    stub.restore();
  }); */
});
