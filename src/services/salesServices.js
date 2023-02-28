const { getSaleById } = require('../models/salesModels');

const verifySaleById = async (id) => {
  const sale = await getSaleById(id);
  if (!sale) {
    return { type: 404, message: 'Sale not found' };
  }

  return { type: false, message: sale };
};

module.exports = {
  verifySaleById,
};