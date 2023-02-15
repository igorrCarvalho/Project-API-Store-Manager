const { getAllProducts, getProductById } = require('../models/productsModel');

const supplyAllProducts = async () => {
  return getAllProducts();
};

const supplyProductById = async (id) => {
  const product = await getProductById(id);
  if (!product) {
    return { type: 404, message: 'Product not found' };
  }
  return { type: false, message: product };
};

module.exports = {
  supplyAllProducts,
  supplyProductById,
};