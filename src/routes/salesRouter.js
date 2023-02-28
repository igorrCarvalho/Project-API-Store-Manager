const express = require('express');
const { getSales } = require('../models/salesModels');
const { verifySaleById } = require('../services/salesServices');

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

module.exports = salesRouter;