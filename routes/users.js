const express = require('express');
const database = require('../database');
const { 
  authenticateToken, 
  requireAdmin, 
  requireUserOrAdmin,
  hashPassword, 
  comparePassword, 
  generateToken 
} = require('../auth');

const router = express.Router();

// POST /api/users/register - Register new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, first, last, street_address } = req.body;

    if (!username || !email || !password || !first || !last) {
      return res.status(400).json({
        success: false,
        message: 'Username, email, password, first name, and last name are required'
      });
    }

    const hashedPassword = await hashPassword(password);
    
    const userData = {
      username,
      email,
      password: hashedPassword,
      first,
      last,
      street_address: street_address || '',
      role: 'user'
    };

    const newUser = await database.createUser(userData);
    const token = generateToken(newUser);

    res.status(201).json({
      success: true,
      data: {
        user: newUser,
        token
      },
      message: 'User registered successfully'
    });
  } catch (error) {
    if (error.message === 'Username already exists') {
      return res.status(409).json({
        success: false,
        message: error.message
      });
    }
    
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// POST /api/users/login - User login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required'
      });
    }

    const user = await database.getUserByUsername(username);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    const { password: _, ...userWithoutPassword } = user;
    const token = generateToken(user);

    res.json({
      success: true,
      data: {
        user: userWithoutPassword,
        token
      },
      message: 'Login successful'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET /api/users - Get all users (admin only)
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const users = await database.getUsers();
    res.json({
      success: true,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET /api/users/:username - Get user profile (user or admin)
router.get('/:username', authenticateToken, requireUserOrAdmin, async (req, res) => {
  try {
    const user = await database.getUserByUsername(req.params.username);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const { password, ...userWithoutPassword } = user;
    res.json({
      success: true,
      data: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// PATCH /api/users/:username - Update user profile (user or admin)
router.patch('/:username', authenticateToken, requireUserOrAdmin, async (req, res) => {
  try {
    const updates = {};
    const allowedFields = ['email', 'first', 'last', 'street_address'];
    
    // Admin can also update role
    if (req.user.role === 'admin') {
      allowedFields.push('role');
    }

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    // Handle password update separately
    if (req.body.password) {
      updates.password = await hashPassword(req.body.password);
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid fields to update'
      });
    }

    const updatedUser = await database.updateUser(req.params.username, updates);
    
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: updatedUser,
      message: 'User updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;