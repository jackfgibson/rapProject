const express = require('express');
const database = require('../database');
const { authenticateToken, requireAdmin } = require('../auth');

const router = express.Router();

// Get user's orders
router.get('/', authenticateToken, async (req, res) => {
  try {
    let orders;
    if (req.user.role === 'admin') {
      orders = await database.getOrders();
    } else {
      orders = await database.getOrdersByUsername(req.user.username);
    }
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error('Error getting orders:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Create order (Checkout)
router.post('/checkout', authenticateToken, async (req, res) => {
  try {
    const { ship_address, products } = req.body;
    const order = await database.createOrder({
      username: req.user.username,
      ship_address,
      products
    });
    res.status(201).json({ success: true, message: 'Order placed successfully', data: order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
