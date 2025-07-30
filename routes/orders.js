const express = require('express');
const fs = require('fs');
const database = JSON.parse(fs.readFileSync('./database.json'));
const { authenticateToken, requireAdmin } = require('../auth');

const router = express.Router();

// Get user's orders
router.get('/', authenticateToken, (req, res) => {
  const orders = database.orders.filter(order => order.username === req.user.username || req.user.role === 'admin');
  res.json({ success: true, data: orders });
});

// Create order (Checkout)
router.post('/checkout', authenticateToken, (req, res) => {
  const { ship_address, products } = req.body;
  const orderId = database.orders.length + 1;
  const order = {
    id: orderId,
    username: req.user.username,
    order_date: new Date().toISOString(),
    ship_address,
    products
  };
  database.orders.push(order);
  fs.writeFileSync('./database.json', JSON.stringify(database, null, 2));
  res.status(201).json({ success: true, message: 'Order placed successfully', data: order });
});

module.exports = router;
