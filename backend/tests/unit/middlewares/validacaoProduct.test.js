const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const validacaoVendasProduct = require('../../../src/middlewares/validacaoProduct');

describe('Testa o middleware validacaoVendasProduct', function () {
  it('Retorna erro quando a quantidade é menor ou igual a 0', function () {
    const req = {
      body: {
        quantity: 0,
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();

    validacaoVendasProduct(req, res, next);

    expect(res.status.calledWith(422)).to.equal(true);
    expect(res.json.calledWith({ message: '"quantity" must be greater than or equal to 1' })).to.equal(true);
    expect(next.called).to.equal(false);
  });
  it('Retorna erro quando a quantidade não é fornecida', function () {
    const req = {
      body: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();

    validacaoVendasProduct(req, res, next);

    expect(res.status.calledWith(400)).to.equal(true);
    expect(res.json.calledWith({ message: '"quantity" is required' })).to.equal(true);
    expect(next.called).to.equal(false);
  });

  it('Chama a função next quando a quantidade é válida', function () {
    const req = {
      body: {
        quantity: 10,
      },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub();

    validacaoVendasProduct(req, res, next);

    expect(next.calledOnce).to.equal(true);
    expect(res.status.called).to.equal(false);
    expect(res.json.called).to.equal(false);
  });
});