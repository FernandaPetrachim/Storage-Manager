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
    const date = '2021-09-09T04:54:29.000Z';
    const mock1 = {
      saleId: 2,
      date,
      productId: 3,
      quantity: 15,
    };
    sinon.stub(criarConexao, 'execute').resolves([mock1]);
    const result = await ModelVenda.findIdModel1(2);
    console.log(mock1);
    expect(result).to.be.deep.equal(mock1);
    expect(result).to.be.deep.not.equal(undefined);
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
  it('Inserindo salesProducts com sucesso', async function () {
    const mock2 = 1;
      
    sinon.stub(criarConexao, 'execute').resolves([{ insertId: mock2 }]);
    const result = await ModelVenda.inserirVendasProduto(4, 1, 5);
  
    expect(result).to.be.deep.equal(mock2);
  
    criarConexao.execute.restore();
  });
  it('Deletando sales com sucesso', async function () {
    sinon.stub(criarConexao, 'execute').resolves([vendasFromDB1.delVendasFromDB]);
    const id = 1;
    const result = await ModelVenda.excluirVendas(id);
  
    // Verifique se res.json foi chamado com argumentos equivalentes
    expect(result).to.be.equal(vendasFromDB1.delVendasFromDB);
  
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
