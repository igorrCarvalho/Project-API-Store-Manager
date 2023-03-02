const connection = require('./connection');

const getSales = async () => {
  const [result] = await connection.execute(
    `SELECT sales.id AS "saleId",
      p.product_id AS "productId",
      p.quantity AS "quantity",
      sales.date AS "date"
    FROM StoreManager.sales AS sales
    inner JOIN StoreManager.sales_products AS p ON sales.id = p.sale_id`,
  );
  return result;
};

const getSaleById = async (id) => {
  const [result] = await connection.execute(
    `SELECT p.product_id AS "productId",
      p.quantity AS "quantity",
      sales.date AS "date"
    FROM StoreManager.sales AS sales
    inner JOIN StoreManager.sales_products AS p ON sales.id = p.sale_id
    WHERE sales.id = ?`,
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