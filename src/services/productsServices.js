const { getAllProducts, getProductById } = require('../models/productsModel');

const supplyAllProducts = async () => getAllProducts();

const supplyProductById = async (id) => {
  const product = await getProductById(id);
  if (!product.length) {
    return { oi: 'nao' };
  }
  return { oi: 'sim' };
};

module.exports = {
  supplyAllProducts,
  supplyProductById,
};