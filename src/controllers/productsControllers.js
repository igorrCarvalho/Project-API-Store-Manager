/* const { supplyAllProducts, supplyProductById } = require('../services/productsServices');

const showProducts = async (req, res) => {
  const allProducts = await supplyAllProducts();
  res.status(200).json(allProducts);
};

const showProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await supplyProductById(id);
  if (type) {
    console.log(entrou);
    return res.status(type).json({ oi: 'sim' });
  }
  console.log('n entrou')
  return res.status(200).json({ oi: 'nao' });
};

module.exports = {
  showProducts,
  showProductById,
}; */