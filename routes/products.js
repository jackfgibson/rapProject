const express = require('express');
const fs = require('fs');
const database = JSON.parse(fs.readFileSync('./database.json'));
const { authenticateToken, requireAdmin } = require('../auth');

const router = express.Router();

// Get all products (Public)
router.get('/', (req, res) => {
  res.json({ success: true, data: database.products });
});

// Search products (Public)
router.get('/search', (req, res) => {
  const { q, category } = req.query;
  const filteredProducts = database.products.filter(product => 
    (q ? product.name.toLowerCase().includes(q.toLowerCase()) : true) &&
    (category ? product.category.toLowerCase() === category.toLowerCase() : true)
  );
  res.json({ success: true, data: filteredProducts });
});

// Create product (Admin only)
router.post('/', authenticateToken, requireAdmin, (req, res) => {
  const { name, price, category, on_hand, description } = req.body;
  const newProduct = { id: database.products.length + 1, name, price, category, on_hand, description };
  database.products.push(newProduct);
  fs.writeFileSync('./database.json', JSON.stringify(database, null, 2));
  res.status(201).json({ success: true, data: newProduct });
});

// Update product (Admin only)
router.patch('/:id', authenticateToken, requireAdmin, (req, res) => {
  const product = database.products.find(p => p.id == req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  Object.assign(product, req.body);
  fs.writeFileSync('./database.json', JSON.stringify(database, null, 2));
  res.json({ success: true, data: product });
});

// Delete product (Admin only)
router.delete('/:id', authenticateToken, requireAdmin, (req, res) => {
  const productIndex = database.products.findIndex(p => p.id == req.params.id);
  if (productIndex === -1) return res.status(404).json({ message: 'Product not found' });

  database.products.splice(productIndex, 1);
  fs.writeFileSync('./database.json', JSON.stringify(database, null, 2));
  res.json({ success: true, message: 'Product deleted successfully' });
});

module.exports = router;
