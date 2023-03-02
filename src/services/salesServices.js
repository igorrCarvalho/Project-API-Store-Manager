const { getSaleById, getSales } = require('../models/salesModels');

const supplyAllSales = async () => getSales();

const supplySaleById = async (id) => {
  const saleById = await getSaleById(id);
  if (saleById.length === 0) {
    return { type: 404, message: 'Sale not found' };
  }
  return { type: false, message: saleById };
};

const verifySaleById = async (id) => {
  const sale = await getSaleById(id);
  if (!sale) {
    return { type: 404, message: 'Sale not found' };
  }

  return { type: false, message: sale };
};

module.exports = {
  verifySaleById,
  supplyAllSales,
  supplySaleById,
};