const { getProductById } = require('../models/productsModel');

// Esta parte do código foi reformulada em conjunto com a Thais
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

const validateQuantity = async (req, res, next) => {
  const arr = req.body;
  console.log(arr);
  const validateQuant = arr.every((e) => e.quantity === 0 || e.quantity < 0);
  const quantityExists = arr.every((e) => e.quantity === undefined);
  if (validateQuant) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  if (quantityExists) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  next();
};

const validateProductIdDB = async (req, res, next) => {
  const arr = req.body;
  let itemDontExists = 0;
  await Promise.all(arr.map(async (obj) => {
    const itemId = Number(obj.productId);
    const itemWithId = await getProductById(itemId);
    if (itemWithId.length === 0) {
      itemDontExists += 1;
    }
    return itemWithId;
  }));
    if (itemDontExists !== 0) return res.status(404).json({ message: 'Product not found' });
  return next();
};

module.exports = {
  validateProductId,
  validateQuantity,
  validateProductIdDB,
};