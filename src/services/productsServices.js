const { getAllProducts, getProductById } = require('../models/productsModel');

const supplyAllProducts = async () => getAllProducts();

const supplyProductById = async (id) => {
  const product = await getProductById(id);
  if (!product.length) {
    return { type: 404, message: 'Product not found' };
  }
  return { type: false, message: product[0] };
};

module.exports = {
  supplyAllProducts,
  supplyProductById,
};