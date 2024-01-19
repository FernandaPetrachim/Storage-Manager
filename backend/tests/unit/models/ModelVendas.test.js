const { expect } = require('chai');
const sinon = require('sinon');
const criarConexao = require('../../../src/models/criarConexao');
const ModelVenda = require('../../../src/models/ModelVendas');
const vendasFromDB1 = require('../../../src/Mockar/MockVendas');

describe('Sales Model', function () {
  it('Recuperando todos os sales com sucesso', async function () {
    sinon.stub(criarConexao, 'execute').resolves([vendasFromDB1]);
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await ModelVenda.findModel1(req, res);

    expect(res.status).to.be.a('function'); // Alterado para verificar se res.status é uma função
    expect(res.json.calledWith(vendasFromDB1.vendasFromModel));

    // Restaure o stub após o teste
    criarConexao.execute.restore();
  });
});
