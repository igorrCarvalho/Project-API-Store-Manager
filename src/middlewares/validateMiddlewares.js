const { getAllProducts } = require('../models/productsModel');

const validateProductId = (req, res, next) => {
  const arr = req.body;
  let hasntProductId = 0;
  arr.forEach((obj) => {
    if (!obj.productId) {
      hasntProductId += 1;
    }
  });
  if (hasntProductId !== 0) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  return next();  
};

const validateQuantity = (req, res, next) => {
  const arr = req.body;
  arr.forEach((obj) => {
    if (obj.quantity === 0) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
    if (obj.quantity < 0) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
    if (!obj.quantity) {
      return res.status(400).json({ message: '"quantity" is required' });
    }
  });
  next();
};

const validateProductIdDB = async (req, res, next) => {
  const allProducts = await getAllProducts();
  const arr = req.body;
  arr.forEach((obj) => {
    if (!allProducts.some((product) => Number(obj.productId) === Number(product.id))) {
      return res.status(404).json({ message: 'Product not found' });
    }
  });
  return next();
};

module.exports = {
  validateProductId,
  validateQuantity,
  validateProductIdDB,
};