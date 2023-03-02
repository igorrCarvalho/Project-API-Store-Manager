const { getSales, insertSale, insertSalesProducts } = require('../models/salesModels');

const supplySale = async (req, res) => {
    const productsSales = req.body;
    const allSales = await getSales();
    const saleId = allSales.length + 1;
    await insertSale(saleId);
    await Promise.all(productsSales.map(async (obj) => {
      const { productId, quantity } = obj;
      /* console.log(productId);
      console.log(quantity);
      console.log(saleId); */

      return insertSalesProducts(saleId, productId, quantity);
    }));
    const saleAdded = { id: saleId, itemsSold: productsSales };
    return res.status(201).json(saleAdded);
};

module.exports = {
  supplySale,
};