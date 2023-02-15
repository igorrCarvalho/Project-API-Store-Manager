const express = require('express');
const { supplyAllProducts } = require('./services/productsServices');
const { showProducts, showProductById } = require('./controllers/productsControllers');
const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// starting

app.get('/products', showProducts);

app.get('/products/:id', showProductById);

module.exports = app;