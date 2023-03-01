const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chai = require('chai');
const productsServices = require('../../../src/services/productsServices');
const { showProductById, showProducts } = require('../../../src/controllers/productsControllers');
const { store } = require('../mocks/products');
const connection = require('../../../src/models/connection');

chai.use(sinonChai);
const { expect } = chai;

describe('Testes de unidade do controllers', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Lista os produtos corretamente e retorna o status 200', async function () {
    const req = {};
    const res = {};
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsServices, 'supplyAllProducts').resolves(store);
    sinon.stub(connection, 'execute').resolves([[store]]);
    await showProducts(req, res);
    expect(res.status).to.have.been.calledWith(200);
  });

  it('Quando o ID existe, retorna o produto com o status 200', async function () {
    const req = { params: { id: 1 } };
    const res = {};
    const result = { type: false, message: store[0] };
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
    sinon.stub(productsServices, 'supplyProductById').resolves(result);
    sinon.stub(connection, 'execute').resolves([[store[0]]]);

    await showProductById(req, res);

    expect(res.json).to.have.been.calledWith(store[0]);
    expect(res.status).to.have.been.calledWith(200);
  });

  it('Quando o ID não existe, retorna um erro e o status 404', async function () {
    const req = { params: { id: 99 } };
    const res = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    const result = { type: 404, message: 'Product not found' };

    sinon.stub(productsServices, 'supplyProductById').resolves(result);
    sinon.stub(connection, 'execute').resolves([[]]);

    await showProductById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });
});