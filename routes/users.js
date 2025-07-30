const express = require('express');
const fs = require('fs');
const database = JSON.parse(fs.readFileSync('./database.json'));
const { authenticateToken, hashPassword, verifyPassword, generateToken, requireAdmin } = require('../auth');

const router = express.Router();

// User registration (Admin can also do this)
router.post('/register', authenticateToken, requireAdmin, (req, res) => {
  const { username, password, first, last, street_address, email, role } = req.body;
  const hashedPassword = hashPassword(password);
  const newUser = { username, password: hashedPassword, first, last, street_address, email, role };
  database.users.push(newUser);
  fs.writeFileSync('./database.json', JSON.stringify(database, null, 2));
  res.status(201).json({ success: true, data: newUser });
});

// Login user
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = database.users.find(u => u.username === username);
  if (!user || !verifyPassword(password, user.password)) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  const token = generateToken({ username: user.username, role: user.role });
  res.json({ success: true, token });
});

// Get current user details
router.get('/me', authenticateToken, (req, res) => {
  const user = database.users.find(u => u.username === req.user.username);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ success: true, data: user });
});

// Get all users (Admin only)
router.get('/', authenticateToken, requireAdmin, (req, res) => {
  res.json({ success: true, data: database.users });
});

module.exports = router;
