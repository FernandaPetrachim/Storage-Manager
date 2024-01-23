const assert = require('assert');
const validadacaoVendas = require('../../../src/middlewares/validacaoVendas');

describe('validadacaoVendas', function () {
  it('deve retornar erro se "productId" não estiver presente em todos os itens', function () {
    const req = {
      body: [{ quantity: 2 }, { productId: 1, quantity: 3 }],
    };
    const res = {
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        this.body = data;
      },
    };
    const next = function () {};

    validadacaoVendas(req, res, next);

    assert.strictEqual(res.statusCode, 400);
    assert.deepStrictEqual(res.body, { message: '"productId" is required' });
  });

  it('deve retornar erro se "quantity" não estiver presente em pelo menos um item', function () {
    const req = {
      body: [{ productId: 1, quantity: 2 }, { productId: 2 }],
    };
    const res = {
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        this.body = data;
      },
    };
    const next = function () {};

    validadacaoVendas(req, res, next);

    assert.strictEqual(res.statusCode, 400);
    assert.deepStrictEqual(res.body, { message: '"quantity" is required' });
  });

  it('deve chamar next se todas as validações passarem', function () {
    const req = {
      body: [{ productId: 1, quantity: 2 }, { productId: 2, quantity: 3 }],
    };
    const res = {
      status(code) {
        this.statusCode = code;
        return this;
      },
      json(data) {
        this.body = data;
      },
    };
    const next = function () {};

    validadacaoVendas(req, res, next);

    assert.strictEqual(res.statusCode, undefined);
    assert.strictEqual(res.body, undefined);
  });
});
