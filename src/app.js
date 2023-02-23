const express = require('express');
const { showProducts, showProductById } = require('./controllers/productsControllers');
const productRouter = require('./routes/productRoutes');
const { supplyAllProducts, supplyProductById } = require('./services/productsServices');
const { getAllProducts, getProductById } = require('./models/productsModel');

const app = express();

app.use(express.json());
// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// starting

app.get('/products', async (req, res) => {
  const allProducts = await getAllProducts();
  res.status(200).json(allProducts);
});

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await getProductById(id);
  if (product === undefined) {
    console.log(entrou);
    return res.status(404).json({ message: 'Product not found' });
  }
  console.log('n entrou')
  return res.status(200).json(product[0]);
});

module.exports = app;