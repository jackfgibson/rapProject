const express = require('express');
const database = require('../database');
const { authenticateToken, requireAdmin } = require('../auth');

const router = express.Router();

// GET /api/orders - Get orders (admin: all orders, user: own orders)
router.get('/', authenticateToken, async (req, res) => {
  try {
    let orders;
    
    if (req.user.role === 'admin') {
      orders = await database.getOrders();
    } else {
      orders = await database.getOrdersByUsername(req.user.username);
    }

    res.json({
      success: true,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET /api/orders/:id - Get single order (admin or order owner)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const orders = await database.getOrders();
    const order = orders.find(o => o.id === parseInt(req.params.id));
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user can access this order
    if (req.user.role !== 'admin' && order.username !== req.user.username) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// POST /api/orders/checkout - Create new order (checkout)
router.post('/checkout', authenticateToken, async (req, res) => {
  try {
    const { ship_address, items } = req.body;

    if (!ship_address || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Ship address and items array are required'
      });
    }

    // Validate and process items
    const processedItems = [];
    let totalAmount = 0;

    for (const item of items) {
      if (!item.product_id || !item.quantity || item.quantity <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Each item must have product_id and positive quantity'
        });
      }

      const product = await database.getProductById(item.product_id);
      if (!product) {
        return res.status(400).json({
          success: false,
          message: `Product with id ${item.product_id} not found`
        });
      }

      if (product.on_hand < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}. Available: ${product.on_hand}, Requested: ${item.quantity}`
        });
      }

      const itemTotal = product.price * item.quantity;
      processedItems.push({
        product_id: product.id,
        quantity: item.quantity,
        price: product.price
      });
      totalAmount += itemTotal;

      // Update product inventory
      await database.updateProduct(product.id, {
        on_hand: product.on_hand - item.quantity
      });
    }

    // Simulate credit card processing
    console.log(`💳 Processing payment of $${totalAmount.toFixed(2)} for user ${req.user.username}`);
    
    // Create order
    const orderData = {
      username: req.user.username,
      ship_address,
      items: processedItems,
      total_amount: totalAmount
    };

    const newOrder = await database.createOrder(orderData);

    res.status(201).json({
      success: true,
      data: newOrder,
      message: 'Order placed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// PATCH /api/orders/:id - Update order (admin only)
router.patch('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const updates = {};
    const allowedFields = ['ship_address', 'items', 'status'];
    
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid fields to update'
      });
    }

    const updatedOrder = await database.updateOrder(req.params.id, updates);
    
    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: updatedOrder,
      message: 'Order updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;