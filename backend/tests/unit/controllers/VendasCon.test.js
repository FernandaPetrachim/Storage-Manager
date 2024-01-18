const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const VendasCon = require('../../../src/controllers/VendasCon');

const { vendasServiceSuccessoful, vendasFromModel, /* vendasIDServiceSuccessoful, vendasIdFromModel, vendasIDServiceNotFound, novasVendasFromModel, novasVendasServiceSuccessoful  */ 
  novasVendasFromModel,
} = require('../../../src/Mockar/MockVendas');

describe('Realizando testes - sales controller', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('Retornando todos os sales com sucesso - 200', async function () {
    sinon.stub(VendasCon, 'getSales').resolves(vendasServiceSuccessoful);

    const { status, data } = await VendasCon.getSales();

    expect(status).to.equal('SUCCESSFUL');
    expect(data).to.deep.equal(vendasFromModel);
  });

  it('Retornando um sale com falha - 404', async function () {
    sinon.stub(VendasCon, 'getSales').resolves(vendasServiceSuccessoful);

    const { status, data } = await VendasCon.getSales();

    expect(status).to.equal('SUCCESSFUL');
    expect(data).to.deep.equal(vendasFromModel);
  });

  it('Insere um novo sale com sucesso - 201', async function () {
    // Configura um stub para a função ServiceVendas.inserirVendas
    const inserirVendasStub = sinon.stub(VendasCon, 'inserirVendas');
  
    // Configura o stub para resolver com um objeto contendo status e data
    inserirVendasStub.resolves({ status: 201, data: novasVendasFromModel });
  
    // Chama a função VendasCon.inserirVendas e aguarda a resolução
    const result = await VendasCon.inserirVendas({ body: [{ productId: 1, quantity: 5 }] });
  
    // Verifica se a resposta é a esperada
    expect(result.status).to.equal(201);
    expect(result.data).to.deep.equal(novasVendasFromModel);
  
    // Restaura o stub após o teste
    inserirVendasStub.restore();
  });

  it('Exclui um sale com sucesso - 200', async function () {
    // Configura um stub para a função ServiceVendas.excluirVendas
    sinon.stub(VendasCon, 'excluirVendas').resolves({ status: 'SUCCESSFUL', data: vendasFromModel });
  
    // Chama a função VendasCon.excluirVendas e aguarda a resolução
    const { status, data } = await VendasCon.excluirVendas({ params: { id: 123 } });
  
    // Verifica se os valores retornados são os esperados
    expect(status).to.equal('SUCCESSFUL');
    expect(data).to.deep.equal(vendasFromModel);
  
    // Restaura o stub após o teste
    sinon.restore();
  });
  it('Excluindo um sale com falha - 404', async function () {
    sinon.stub(VendasCon, 'excluirVendas').resolves(vendasServiceSuccessoful);

    const { status, data } = await VendasCon.excluirVendas();

    expect(status).to.equal('SUCCESSFUL');
    expect(data).to.deep.equal(vendasFromModel);
  });
  it('Atualizar um sale com falha - 404', async function () {
    sinon.stub(VendasCon, 'atualizarVenda').resolves(vendasServiceSuccessoful);

    const { status, data } = await VendasCon.atualizarVenda();

    expect(status).to.equal('SUCCESSFUL');
    expect(data).to.deep.equal(vendasFromModel);
  });
  it('Atualizar um novo sale com sucesso - 201', async function () {
    // Configura um stub para a função ServiceVendas.inserirVendas
    const inserirVendasStub = sinon.stub(VendasCon, 'atualizarVenda');
  
    // Configura o stub para resolver com um objeto contendo status e data
    inserirVendasStub.resolves({ status: 201, data: novasVendasFromModel });
  
    // Chama a função VendasCon.inserirVendas e aguarda a resolução
    const result = await VendasCon.atualizarVenda({ body: [{ productId: 1, quantity: 5 }] });
  
    // Verifica se a resposta é a esperada
    expect(result.status).to.equal(201);
    expect(result.data).to.deep.equal(novasVendasFromModel);
  
    // Restaura o stub após o teste
    inserirVendasStub.restore();
  });
  it('Excluir um sale com falha - 404', async function () {
    sinon.stub(VendasCon, 'excluirVendas').resolves(vendasServiceSuccessoful);

    const { status, data } = await VendasCon.excluirVendas();

    expect(status).to.equal('SUCCESSFUL');
    expect(data).to.deep.equal(vendasFromModel);
  });
});
