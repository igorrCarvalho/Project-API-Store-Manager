const express = require('express');
const { getSales, insertSale, insertSalesProducts } = require('../models/salesModels');
const { verifySaleById } = require('../services/salesServices');
const {
  validateProductId,
  validateQuantity,
  validateProductIdDB,
} = require('../middlewares/validateMiddlewares');

const salesRouter = express.Router();

salesRouter.get('/', async (req, res) => {
  const allSales = await getSales();
  return res.status(200).json(allSales);
});

salesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const sale = await verifySaleById(id);
  const { type, message } = sale;
  if (type) {
    return res.status(type).json({ message });
  }
  return res.status(200).json(message);
});

salesRouter.post('/',
  validateProductId,
  validateQuantity,
  validateProductIdDB,
  async (req, res) => {
  const productsSales = req.body;
  const allSales = await getSales();
  const saleId = allSales.length + 1;
  await insertSale(saleId);
  productsSales.forEach(async (obj) => {
    const { productId, quantity } = obj;
    await insertSalesProducts(saleId, productId, quantity);
  });
  const saleAdded = { id: saleId, itemsSold: productsSales };
  return res.status(201).json(saleAdded);
});

module.exports = salesRouter;