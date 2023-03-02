const {
  supplyAllProducts,
  supplyProductById,
  supplyDeleteProduct,
} = require('../services/productsServices');

const showProducts = async (req, res) => {
  const allProducts = await supplyAllProducts();
  res.status(200).json(allProducts);
};

const showProductById = async (req, res) => {
  const { id } = req.params;
  const numberId = Number(id);
  const { type, message } = await supplyProductById(numberId);
  if (type) {
    return res.status(type).json({ message });
  }
  return res.status(200).json(message);
};

const deleteProductResponse = async (req, res) => {
  const { id } = req.params;
  const numberId = Number(id);
  const { type, message } = await supplyDeleteProduct(numberId);
  if (type) {
    return res.status(type).json({ message });
  }
  return res.status(204).json();
};

module.exports = {
  showProducts,
  showProductById,
  deleteProductResponse,
};