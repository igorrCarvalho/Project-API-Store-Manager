const { getSales, insertSale, insertSalesProducts } = require('../models/salesModels');
const { supplyAllSales, supplySaleById } = require('../services/salesServices');

const supplySale = async (req, res) => {
    const productsSales = req.body;
    const allSales = await getSales();
    const saleId = allSales.length + 1;
    await insertSale(saleId);
    await Promise.all(productsSales.map(async (obj) => {
      const { productId, quantity } = obj;
      return insertSalesProducts(saleId, productId, quantity);
    }));
    const saleAdded = { id: saleId, itemsSold: productsSales };
    return res.status(201).json(saleAdded);
};

const showAllSales = async (req, res) => {
  const allSales = await supplyAllSales();
  return res.status(200).json(allSales);
};

const showSaleById = async (req, res) => {
  const { id } = req.params;
  const numberId = Number(id);
  const { type, message } = await supplySaleById(numberId);
  if (type) {
    return res.status(type).json({ message });
  }
  return res.status(200).json(message);
};

module.exports = {
  supplySale,
  showAllSales,
  showSaleById,
};