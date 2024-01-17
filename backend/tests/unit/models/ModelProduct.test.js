const chai = require('chai');
const sinon = require('sinon');
const criarConexao = require('../../../src/models/criarConexao');
const {
  findId1,
  findAll1,
  inserirProduto1,
  atualizar,
} = require('../../../src/models/ModelProduct');
 
const { expect } = chai;

describe('Testes para funções de banco de dados', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('findAll1 deve retornar produtos ordenados por id', async function () {
    const executeStub = sinon.stub(criarConexao, 'execute').resolves([[{ id: 1, name: 'Produto 1' }]]);
    const result = await findAll1();
    expect(executeStub.calledOnce);
    expect(result).to.deep.equal([{ id: 1, name: 'Produto 1' }]);
  });

  it('findId1 deve retornar o produto pelo ID', async function () {
    const executeStub = sinon.stub(criarConexao, 'execute').resolves([[{ id: 1, name: 'Produto 1' }]]);
    const result = await findId1(1);
    expect(executeStub.calledOnce);
    expect(result).to.deep.equal({ id: 1, name: 'Produto 1' });
  });

  it('inserirProduto1 deve inserir um produto e retornar o ID', async function () {
    const executeStub = sinon.stub(criarConexao, 'execute').resolves([{ insertId: 1 }]);
    const result = await inserirProduto1('Novo Produto');
    expect(executeStub.calledOnce);
    expect(result).to.equal(1);
  });

  it('atualizar deve atualizar um produto e retornar o resultado', async function () {
    const executeStub = sinon.stub(criarConexao, 'execute').resolves([{ id: 1, name: 'Produto Atualizado' }]);
    const result = await atualizar(1, 'Produto Atualizado');
    expect(executeStub.calledOnce);
    expect(result).to.deep.equal({ id: 1, name: 'Produto Atualizado' });
  });
}); 