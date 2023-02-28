const { expect } = require('chai');
const sinon = require('sinon');
const { getAllProducts, getProductById } = require('../../../src/models/productsModel');

const connection = require('../../../src/models/connection');
const { store } = require('../mocks/products');

describe('Testes de unidade do models', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Recupera corretamente a lista completa de produtos', async function () {
    sinon.stub(connection, 'execute').resolves([store]);
    const allProducts = await getAllProducts();
    expect(allProducts).to.be.deep.equal(store);
  });

  it('Recupera corretamente um produto pelo id', async function () {
    sinon.stub(connection, 'execute').resolves([[store[0]]]);
    const product = await getProductById(1);
    expect(product).to.be.deep.equal([store[0]]);
  });
});