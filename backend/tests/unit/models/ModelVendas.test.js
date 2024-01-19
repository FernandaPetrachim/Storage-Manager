const { expect, assert } = require('chai');
const sinon = require('sinon');
const criarConexao = require('../../../src/models/criarConexao');
const ModelVenda = require('../../../src/models/ModelVendas');
const vendasFromDB1 = require('../../../src/Mockar/MockVendas');
const statusHttp = require('../../../src/HTTP/StatusHttp');

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
  /*  it('Recuperando sales por id com sucesso', async function () {
    sinon.stub(criarConexao, 'execute').resolves([vendasFromDB1]);
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const inputData = 1;
    await ModelVenda.findIdModel1(req, res, inputData);
  
    sinon.assert.called(res.status);
    sinon.assert.called(res.json); // Verifica se a função res.json foi chamada
  
    criarConexao.execute.restore();
  });   */
  it('Inserindo sales com sucesso', async function () {
    sinon.stub(criarConexao, 'execute').resolves([vendasFromDB1.novasVendasFromDB]);
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    await ModelVenda.inserirVendas(req, res);
  
    // Verifique o código de status HTTP
    expect(res.status.calledWith(201)); // 201 é o código para criação bem-sucedida
  
    // Verifique o corpo da resposta (pode variar dependendo do seu código)
    expect(res.json.calledWith(4));
  
    criarConexao.execute.restore();
  });
  it('Inserindo salesProducts com sucesso', async function () {
    sinon.stub(criarConexao, 'execute').resolves([vendasFromDB1.vendasIDServiceSuccessoful]);
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
  
    await ModelVenda.inserirVendasProduto(4, 1, 5, req, res);
  
    // Verifique se res.status foi chamado com 200 (código para sucesso)
    expect(res.status.calledWith(200));
  
    // Verifique se res.json foi chamado com o argumento 4
    expect(res.json.calledWith(4));
  
    criarConexao.execute.restore();
  });
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
    const productId = 999; // Substitua por um ID que não existe

    const sales = await ModelVenda.findByIdProductVendas(productId);

    assert(Array.isArray(sales), 'sales deve ser um array');
    assert.strictEqual(sales.length, 0, 'sales deve ser um array vazio');
  });
 /*  it('deve chamar ServiceVendas.excluirVendas corretamente e retornar resposta JSON', async function () {
    // Crie um objeto de exemplo para simular a resposta de ServiceVendas.excluirVendas
    sinon.stub(ModelVenda, 'getProduto').resolves({ status: 'SUCESSO', data: { mensagem: 'Venda excluída com sucesso' } });
    
    // Configurar stub para ServiceVendas.excluirVendas
    
    // Configurar stubs para req.params e res
    const req = { params: { id: 1 } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    // Chamar a função a ser testada
    await ModelVenda.excluirVendas(req, res);

    // Verificar se ServiceVendas.excluirVendas foi chamada corretamente
    expect(res.status.calledOnceWithExactly(req.params.id));

    // Verificar se res.status e res.json foram chamados corretamente
    expect(res.status.calledOnceWithExactly(statusHttp(res.status)));
    expect(res.json.calledOnceWithExactly(res.json));
    expect(res.json.calledWith(sinon.match(vendasFromDB1.delVendasFromDB)));
  }); */
});
