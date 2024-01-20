const { expect, assert } = require('chai');
const sinon = require('sinon');
const criarConexao = require('../../../src/models/criarConexao');
const ModelVenda = require('../../../src/models/ModelVendas');
const vendasFromDB1 = require('../../../src/Mockar/MockVendas');
const statusHttp = require('../../../src/HTTP/StatusHttp');

describe('Sales Model', function () {
  it('Recuperando todos os sales com sucesso', async function () {
    sinon.stub(criarConexao, 'execute').resolves([vendasFromDB1]);
   
    const result = await ModelVenda.findModel1();

    expect(result).to.be.deep.equal(vendasFromDB1);

    // Restaure o stub após o teste
    criarConexao.execute.restore();
  });
  it('Recuperando sales por id com sucesso', async function () {
    sinon.stub(criarConexao, 'execute').resolves([vendasFromDB1[2]]);
   
    const result = await ModelVenda.findIdModel1(2);
  
    expect(result).to.be.deep.equal(vendasFromDB1[2]);
  
    criarConexao.execute.restore();
  });   
  /*  it('Inserindo sales com sucesso', async function () {
    sinon.stub(criarConexao, 'execute').resolves([vendasFromDB1.novasVendasFromDB]);
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    await ModelVenda.inserirVendas(req, res);
  
    // Verifique o código de status HTTP
    expect(res.status.calledWith(201)); // 201 é o código para criação bem-sucedida
  
    expect(res.json.calledWith(4));
  
    criarConexao.execute.restore();
  }); */
  /* it('Inserindo salesProducts com sucesso', async function () {
    sinon.stub(criarConexao, 'execute').resolves([vendasFromDB1.vendasIDServiceSuccessoful]);
   
    const result = await ModelVenda.inserirVendasProduto(4, 1, 5);
  
    expect(result).to.be.deep.equal(201);
  
    expect(result).to.be.deep.equal(4);
  
    criarConexao.execute.restore();
  }); */
  it('Deletando sales com sucesso', async function () {
    sinon.stub(criarConexao, 'execute').resolves([vendasFromDB1.delVendasFromDB]);
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    await ModelVenda.excluirVendas(1, req, res);
  
    // Verifique se res.json foi chamado com argumentos equivalentes
    expect(res.json.calledWith(sinon.match(vendasFromDB1.delVendasFromDB)));
  
    criarConexao.execute.restore();
  });
  it('Atualizando sales com sucesso', async function () {
    sinon.stub(criarConexao, 'execute').resolves([vendasFromDB1.atualizarVenda]);

    const sales = await ModelVenda.atualizarVendas(1, 1, 10);

    expect(sales).to.be.an('Object');
    expect(sales).to.be.deep.equal(vendasFromDB1.atualizarVenda);
  });
  afterEach(function () {
    sinon.restore();
  });

  it('deve retornar um array vazio quando o produto não é encontrado', async function () {
    const mock = [];
    sinon.stub(criarConexao, 'execute').resolves([mock]);
    const productId = 999; // Substitua por um ID que não existe

    const sales = await ModelVenda.findByIdProductVendas(productId);

    assert(Array.isArray(sales), 'sales deve ser um array');
    assert.strictEqual(sales.length, 0, 'sales deve ser um array vazio');
  });
  it('deve chamar ServiceVendas.excluirVendas corretamente e retornar resposta JSON', async function () {
    // Crie um objeto de exemplo para simular a resposta de ServiceVendas.excluirVendas
    sinon.stub(ModelVenda, 'excluirVendas').resolves({ status: 'SUCESSO', data: { mensagem: 'Venda excluída com sucesso' } });
    
    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await ModelVenda.excluirVendas(req, res);

    expect(res.status.calledOnceWithExactly(req.params.id));

    expect(res.status.calledOnceWithExactly(statusHttp(res.status)));
    expect(res.json.calledOnceWithExactly(res.json));
    expect(res.json.calledWith(sinon.match(vendasFromDB1.delVendasFromDB)));
  });
});
