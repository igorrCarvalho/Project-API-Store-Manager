const express = require('express');
const { supplyProductById } = require('./services/productsServices');
const { getAllProducts } = require('./models/productsModel');

const app = express();

app.use(express.json());
// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// starting
app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await supplyProductById(id);
  const { message, type } = product;
  if (product.type) {
    return res.status(type).json({ message });
  }
  return res.status(200).json(product.message);
});

app.get('/products', async (req, res) => {
  const allProducts = await getAllProducts();
  res.status(200).json(allProducts);
});

module.exports = app;