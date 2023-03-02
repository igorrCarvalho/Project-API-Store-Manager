const connection = require('./connection');

const getSales = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales',
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

const insertSalesProducts = async (saleId, productId, quantity) => {
  await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
    [saleId, productId, quantity],
  );
  return { productId, quantity };
};

const insertSale = async (id) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.sales (id) VALUES (?)', [id],
  );
  return result;
};

module.exports = {
  getSales,
  getSaleById,
  insertSalesProducts,
  insertSale,
};