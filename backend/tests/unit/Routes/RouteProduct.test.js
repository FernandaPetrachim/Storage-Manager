const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../src/app');
const ServiceProduct = require('../../../src/services/ServiceProduct');
const { produtoIDServiceSuccess } = require('../../../src/Mockar/MockProduct');

const { expect } = chai;

chai.use(chaiHttp);

describe('GET /products', function () {
  it('Deve retornar status 200 e dados válidos', async function () {
    sinon.stub(ServiceProduct, 'getProduto').resolves(produtoIDServiceSuccess);
    // Use chai.request para fazer a requisição HTTP
    const { body, status } = await chai.request(app).get('/products');

    /* Controller,service. model */
    // As asserções podem ser simplificadas usando chai.expect
    // deep.equal compara objetos-- equal só compara numero
    expect(status).to.have.deep.equal(200); 
    expect(body).to.have.deep.equal({ id: 1, name: 'Martelo de Thor' });
  });
});
