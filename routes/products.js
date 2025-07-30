const express = require('express');
const database = require('../database');
const { authenticateToken, requireAdmin } = require('../auth');

const router = express.Router();

// GET /api/products - Get all products (public)
router.get('/', async (req, res) => {
  try {
    const products = await database.getProducts();
    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET /api/products/search - Search products (public)
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const products = await database.searchProducts(q);
    res.json({
      success: true,
      data: products,
      query: q
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET /api/products/:id - Get single product (public)
router.get('/:id', async (req, res) => {
  try {
    const product = await database.getProductById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// POST /api/products - Create product (admin only)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { name, price, category, on_hand, description } = req.body;

    if (!name || !price || !category || on_hand === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Name, price, category, and on_hand are required'
      });
    }

    const productData = {
      name,
      price: parseFloat(price),
      category,
      on_hand: parseInt(on_hand),
      description: description || ''
    };

    const newProduct = await database.createProduct(productData);
    
    res.status(201).json({
      success: true,
      data: newProduct,
      message: 'Product created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// PATCH /api/products/:id - Update product (admin only)
router.patch('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const updates = {};
    const allowedFields = ['name', 'price', 'category', 'on_hand', 'description'];
    
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        if (field === 'price') {
          updates[field] = parseFloat(req.body[field]);
        } else if (field === 'on_hand') {
          updates[field] = parseInt(req.body[field]);
        } else {
          updates[field] = req.body[field];
        }
      }
    });

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid fields to update'
      });
    }

    const updatedProduct = await database.updateProduct(req.params.id, updates);
    
    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: updatedProduct,
      message: 'Product updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// DELETE /api/products/:id - Delete product (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const deleted = await database.deleteProduct(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;