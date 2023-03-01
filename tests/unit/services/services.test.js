const { expect } = require('chai');
const sinon = require('sinon');
const { supplyProductById, supplyAllProducts, insertNewProduct } = require('../../../src/services/productsServices');
const productsModel = require('../../../src/models/productsModel');

const { store } = require('../mocks/products');
const connection = require('../../../src/models/connection');

describe('Teste de unidade do services', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('Retorna corretamente a lista de todos os produtos', async function () {
    sinon.stub(productsModel, 'getAllProducts').resolves(store);
    sinon.stub(connection, 'execute').resolves([store]);

    const allProducts = await supplyAllProducts();
    expect(allProducts).to.deep.equal(store);
  });

  it('Caso o ID exista, retorna o produto corretamente', async function () {
    sinon.stub(productsModel, 'getProductById').resolves([store[0]]);
    sinon.stub(connection, 'execute').resolves([[store[0]]]);

    const product = await supplyProductById(1);
    expect(product.type).to.equal(false);
    expect(product.message).to.equal(store[0]);
  });

  it('Não é possível buscar um produto por um ID inexistente', async function () {
    sinon.stub(productsModel, 'getProductById').resolves(undefined);
    sinon.stub(connection, 'execute').resolves([[]]);

    const product = await supplyProductById(99);
    expect(product.type).to.equal(404);
    expect(product.message).to.equal('Product not found');
  });

  it('Não é possível inserir produto sem nome', async function () {
    const result = await insertNewProduct();
    expect(result).to.be.deep.equal({ type: 400, message: '"name" is required' });
  });
  
});
