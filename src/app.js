const express = require('express');
const productRouter = require('./routes/productRouter');
/* const salesRouter = require('./routes/salesRouter'); */

const app = express();

app.use(express.json());

app.use('/products', productRouter);

/* app.use('/sales', salesRouter); */

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

module.exports = app;