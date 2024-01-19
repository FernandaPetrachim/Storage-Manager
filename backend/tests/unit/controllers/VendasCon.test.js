const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const VendasCon = require('../../../src/controllers/VendasCon');
const ServiceVendas = require('../../../src/services/ServiceVendas');

const { vendasServiceSuccessoful, 
  vendasFromModel,  
  novasVendasFromModel,
  vendasIDServiceNotFound,
  vendasIDServiceSuccessoful,
} = require('../../../src/Mockar/MockVendas');

const date = '2021-09-09T04:54:29.000Z';
const vendasFromModelMock = [{
  saleId: 1,
  date,
  productId: 1,
  quantity: 5,
},
{
  saleId: 1,
  date,
  productId: 2,
  quantity: 10,
},
{
  saleId: 2,
  date,
  productId: 3,
  quantity: 15,
},
];
describe('Realizando testes - sales controller', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('Retornando todos os sales com sucesso - 200', async function () {
    sinon.stub(ServiceVendas, 'getVendas').resolves({ status: 'SUCCESSFUL',
      data: vendasFromModelMock }); // aqui o retorno do stub
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await VendasCon.getSales(req, res);// aqui o nome da funçao

    expect(res.status).to.calledWith(200);
    expect(res.json).to.calledWith(vendasFromModelMock);
  });
  it('Retornando testes - sales controller Insere um novo sale com sucesso - 201', async function () {
    sinon.stub(ServiceVendas, 'getVendasById').resolves(vendasIDServiceSuccessoful);
    const req = {
      params: { id: 1 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await VendasCon.getSalesById(req, res);// aqui o nome da funçao

    expect(res.status).to.calledWith(200);
    expect(res.json).to.calledWith(vendasFromModel);
  });

  it('Retornando um sale com falha - 404', async function () {
    sinon.stub(ServiceVendas, 'getVendasById').resolves(vendasIDServiceNotFound);
    const req = {
      params: { id: 404 },
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
    // Configura um stub para a função VendasCon.inserirVendas
    const inserirVendasStub = sinon.stub(ServiceVendas, 'inserirVendas');
    // Configura o stub para resolver com um objeto contendo status e data
    inserirVendasStub.resolves({ status: 201, data: novasVendasFromModel });
    // Cria um objeto de requisição (req) simulado
    const req = { body: [{ productId: 1, quantity: 5 }] };
    // Cria um objeto de resposta (res) simulado com spies para os métodos status e json
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    // Chama a função VendasCon.getSales passando os objetos req e res simulados
    await VendasCon.inserirVendas(req, res);
    // Verifica se o método status foi chamado com o código 201
    expect(res.status.calledWith(201));

    // Verifica se o método json foi chamado com os dados esperados
    expect(res.json.calledWith(novasVendasFromModel));
  
    // Restaura o stub após o teste
    inserirVendasStub.restore();
  });
  
  it('Exclui um sale com sucesso - 200', async function () {
    // Configura um stub para a função ServiceVendas.excluirVendas
    sinon.stub(ServiceVendas, 'excluirVendas').resolves({ status: 'NO_CONTENT', data: null });
    const req = {
      params: { id: 123 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    // Chama a função VendasCon.excluirVendas e aguarda a resolução
    await VendasCon.excluirVendas(req, res);
  
    // Verifica se os valores retornados são os esperados
    expect(res.status).calledWith(204);
    expect(res.json).calledWith(null);
  
    // Restaura o stub após o teste
    sinon.restore();
  });
  it('Excluindo um sale com falha - 404', async function () {
    sinon.stub(ServiceVendas, 'excluirVendas').resolves(vendasServiceSuccessoful);
    const req = {
      params: { id: 322 },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await VendasCon.excluirVendas(req, res);

    expect(res.status).calledWith(200);
    expect(res.json).calledWith(vendasFromModel);
  });
  it('Atualizar um sale com falha - 404', async function () {
    sinon.stub(ServiceVendas, 'atualizarVendas').resolves(vendasIDServiceNotFound);
    const req = {
      body: { quantity: 5 },
      params: { saleId: 1, productId: 1 },
    
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await VendasCon.atualizarVenda(req, res);

    expect(res.status).calledWith(404); // calleith controller
    expect(res.json).calledWith(vendasIDServiceNotFound.data);
  });
  it('Atualizar um novo sale com sucesso - 200', async function () {
    // Configura um stub para a função ServiceVendas.inserirVendas
    const inserirVendasStub = sinon.stub(ServiceVendas, 'atualizarVendas').resolves({ status: 'SUCCESSFUL', data: novasVendasFromModel });
    const req = {
      body: { quantity: 5 },
      params: { saleId: 1, productId: 1 },
    
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    // Chama a função VendasCon.inserirVendas e aguarda a resolução
    await VendasCon.atualizarVenda(req, res);
  
    // Verifica se a resposta é a esperada
    expect(res.status).calledWith(200);
    expect(res.json).calledWith(novasVendasFromModel);
  
    // Restaura o stub após o teste
    inserirVendasStub.restore();
  });
  it('Excluir um sale com falha - 404', async function () {
    sinon.stub(ServiceVendas, 'getVendas').resolves({ status: 'SUCCESSFUL',
      data: vendasFromModelMock }); // aqui o retorno do stub
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await VendasCon.getSales(req, res);
    
    expect(res.status.calledWith('SUCCESSFUL'));
    expect(res.json).calledWith(vendasFromModelMock);
  });
  
  it('Atualiza um sale com falha em quantidade - 400', async function () {
  // Configura um stub para a função VendasCon.atualizarVenda
    sinon.stub(ServiceVendas, 'atualizarVendas').resolves({ status: 'BAD_REQUEST', data: { message: '"quantity" is required' } });
    // Cria objetos de requisição e resposta
    const req = {
      params: { saleId: 1, productId: 1 },
      body: {},
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    // Chama a função VendasCon.atualizarVenda e aguarda a resolução
    await VendasCon.atualizarVenda(req, res);
    // Verifica se a função status foi chamada com o argumento correto (400)
    expect(res.status).to.have.been.calledWith(400);
    // Verifica se a função json foi chamada com a mensagem esperada
    expect(res.json).to.have.been.calledWith(sinon.match.has('message', '"quantity" is required'));
  });
});