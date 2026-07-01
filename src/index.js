const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Products data
const products = [
  { id: 1, title: 'Laptop', price: 999.99 },
  { id: 2, title: 'Mouse', price: 29.99 },
  { id: 3, title: 'Keyboard', price: 79.99 }
];

// Middleware to parse JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'API is running successfully' });
});

app.get('/healthcheck', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.json(product);
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
  });
}

module.exports = app;