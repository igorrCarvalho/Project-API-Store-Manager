const express = require('express');
const {
  validateProductId,
  validateQuantity,
  validateProductIdDB,
} = require('../middlewares/validateMiddlewares');

const { supplySale, showAllSales, showSaleById } = require('../controllers/salesControllers');

const salesRouter = express.Router();

salesRouter.get('/', showAllSales);

salesRouter.get('/:id', showSaleById);

salesRouter.post('/', validateProductId, validateQuantity, validateProductIdDB, supplySale);

module.exports = salesRouter;