const express = require('express');
const { insertNewProduct } = require('../services/productsServices');
const {
  showProducts,
  showProductById,
  deleteProductResponse,
  updateProductResponse,
} = require('../controllers/productsControllers');
const { validateProductName } = require('../middlewares/validateMiddlewares');

const router = express.Router();

router.get('/:id', showProductById);

router.get('/', showProducts);

router.post('/', async (req, res) => {
  const { name } = req.body;
  const validateInsert = await insertNewProduct(name);
  const { type, message } = validateInsert;
  if (type) {
    return res.status(type).json({ message });
  }

  return res.status(201).json(message);
});

router.put('/:id', validateProductName, updateProductResponse);

router.delete('/:id', deleteProductResponse);

module.exports = router;