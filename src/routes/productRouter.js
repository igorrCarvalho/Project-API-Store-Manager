const express = require('express');
const { supplyProductById, insertNewProduct } = require('../services/productsServices');
const { getAllProducts } = require('../models/productsModel');

const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await supplyProductById(id);
  const { message, type } = product;
  if (product.type) {
    return res.status(type).json({ message });
  }
  return res.status(200).json(product.message);
});

router.get('/', async (req, res) => {
  const allProducts = await getAllProducts();
  res.status(200).json(allProducts);
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  const validateInsert = await insertNewProduct(name);
  const { type, message } = validateInsert;
  if (type) {
    return res.status(type).json({ message });
  }

  return res.status(201).json(message);
});

module.exports = router;