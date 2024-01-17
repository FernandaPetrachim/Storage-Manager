const express = require('express');
const RouteProduct = require('./Routes/RouteProduct');

const app = express();

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});

app.use(express.json());
app.use('/products', RouteProduct);

// Inicie o servidor
/* const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor está ouvindo na porta ${PORT}`);
}); */
module.exports = app;
