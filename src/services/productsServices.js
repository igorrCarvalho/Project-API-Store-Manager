const {
  getAllProducts,
  getProductById,
  insertProduct,
  deleteProduct,
  updateProduct,
} = require('../models/productsModel');

const supplyAllProducts = async () => getAllProducts();

const supplyProductById = async (id) => {
  const product = await getProductById(id);
  if (!product.length) {
    return { type: 404, message: 'Product not found' };
  }
  return { type: false, message: product[0] };
};

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

const supplyDeleteProduct = async (id) => {
  const product = await getProductById(id);
  if (product.length === 0) {
    return { type: 404, message: 'Product not found' };
  }
  await deleteProduct(id);
  return { type: false, message: 'success' };
};

const supplyUpdateProduct = async (id, name) => {
  const product = await getProductById(id);
  if (product.length === 0) {
    return { type: 404, message: 'Product not found' };
  }
  const updateSuccess = await updateProduct(id, name);
  return { type: false, message: updateSuccess };
};

module.exports = {
  supplyAllProducts,
  supplyProductById,
  insertNewProduct,
  supplyDeleteProduct,
  supplyUpdateProduct,
};