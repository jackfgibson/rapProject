const express = require('express');
const database = require('../database');
const { authenticateToken, hashPassword, verifyPassword, generateToken, requireAdmin } = require('../auth');

const router = express.Router();

// User registration (Admin can also do this)
router.post('/register', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { username, password, first, last, street_address, email, role } = req.body;
    const hashedPassword = hashPassword(password);
    const newUser = await database.createUser({
      username, password: hashedPassword, first, last, street_address, email, role
    });
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    if (error.message === 'Username already exists') {
      return res.status(400).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await database.getUserByUsername(username);
    if (!user || !verifyPassword(password, user.password)) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    const token = generateToken({ username: user.username, role: user.role });
    res.json({ success: true, token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Get current user details
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await database.getUserByUsername(req.user.username);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    const { password, ...userWithoutPassword } = user;
    res.json({ success: true, data: userWithoutPassword });
  } catch (error) {
    console.error('Error getting user details:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Get all users (Admin only)
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const users = await database.getUsers();
    res.json({ success: true, data: users });
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
