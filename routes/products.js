const express = require('express');
const database = require('../database');
const { authenticateToken, requireAdmin } = require('../auth');

const router = express.Router();

// Get all products (Public)
router.get('/', async (req, res) => {
  try {
    const products = await database.getProducts();
    res.json({ success: true, data: products });
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Search products (Public)
router.get('/search', async (req, res) => {
  try {
    const { q, category } = req.query;
    let products = await database.getProducts();
    
    if (q) {
      products = products.filter(product => 
        product.name.toLowerCase().includes(q.toLowerCase())
      );
    }
    
    if (category) {
      products = products.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    res.json({ success: true, data: products });
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Create product (Admin only)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { name, price, category, on_hand, description } = req.body;
    const newProduct = await database.createProduct({
      name, price, category, on_hand, description
    });
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Update product (Admin only)
router.patch('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const product = await database.updateProduct(req.params.id, req.body);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Delete product (Admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const deleted = await database.deleteProduct(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
