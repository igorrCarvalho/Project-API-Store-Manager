const { getAllProducts, getProductById, insertProduct } = require('../models/productsModel');

const supplyAllProducts = async () => getAllProducts();

const supplyProductById = async (id) => {
  const product = await getProductById(id);
  if (!product.length) {
    return { type: 404, message: 'Product not found' };
  }
  return { type: false, message: product[0] };
};

supplyProductById(1);

const insertNewProduct = async (name) => {
  if (!name) {
    return { type: 400, message: '"name" is required' };
  }

  if (name.length < 5) {
    return { type: 422, message: '"name" length must be at least 5 characters long' };
  }

  const insertSuccess = await insertProduct(name);
  return { type: false, message: insertSuccess };
};

module.exports = {
  supplyAllProducts,
  supplyProductById,
  insertNewProduct,
};