const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { ServiceVendas } = require('../../../src/services/ServiceVendas');
const { VendasCon } = require('../../../src/controllers/VendasCon');

const { vendasServiceSuccessoful, vendasFromModel, vendasIDServiceSuccessoful, vendasIdFromModel, vendasIDServiceNotFound, novasVendasFromModel, novasVendasServiceSuccessoful } = require('../../../src/Mockar/MockVendas');

describe('Realizando testes - sales controller', function () {
  it('Retornando todos os sales com sucesso - 200', async function () {
    sinon.stub(ServiceVendas, 'getSales').resolves(vendasServiceSuccessoful);
    const req = {
      body: { },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await VendasCon.getSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(vendasFromModel);
  });
  it('Retornando um sale com sucesso - 200', async function () {
    sinon.stub(ServiceVendas, 'getSalesById').resolves(vendasIDServiceSuccessoful);
    const req = {
      params: { id: 1 },
      body: { },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await VendasCon.getSalesById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(vendasIdFromModel);
  });
  it('Retornando um sale com falha - 404', async function () {
    sinon.stub(ServiceVendas, 'getSalesById').resolves(vendasIDServiceNotFound);
    const req = {
      params: { id: 999 },
      body: { },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await VendasCon.getSalesById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
  });
  it('Insere um novo sale com sucesso - 201', async function () {
    sinon.stub(ServiceVendas, 'insertSales').resolves(novasVendasServiceSuccessoful);
    const req = {
      body: [{ productId: 1, quantity: 5 }],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await VendasCon.insertSales(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(novasVendasFromModel);
  });
  it('Insere um novo sale com falha - 422', async function () {
    sinon.stub(ServiceVendas, 'insertSales').resolves({ status: 'INVALID_VALUE', data: { message: '"quantity" must be greater than or equal to 1' } });
    const req = {
      body: [{ productId: 1, quantity: 0 }],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await VendasCon.insertSales(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
  });
  it('Insere um novo sale com falha em productId - 400', async function () {
    sinon.stub(ServiceVendas, 'insertSales').resolves({ status: 'BAD_REQUEST', data: { message: '"productId" is required' } });
    const req = {
      body: [{ quantity: 5 }],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await VendasCon.insertSales(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
  });
  it('Insere um novo sale com falha em quantidade - 400', async function () {
    sinon.stub(ServiceVendas, 'inserirVendas').resolves({ status: 'BAD_REQUEST', data: { message: '"quantity" is required' } });
    const req = {
      body: [{ productId: 1 }],
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await VendasCon.inserirVendas(req, res);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
  });
});