const connection = require('./connection');

const getSales = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales ORDER BY saleId ASC, productId ASC',
  );
  return result;
};

const getSaleById = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales WHERE saleId = ? ORDER BY saleId ASC, productId ASC',
    [id],
  );
  return result;
};

module.exports = {
  getSales,
  getSaleById,
};