const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db'); // Database connection
require('dotenv').config();

const router = express.Router();

// 1. Handle User Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const result = await pool.query('SELECT * FROM Users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(400).send('Invalid credentials');
    }

    const user = result.rows[0];

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign({ user_id: user.user_id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send token to the client
    res.json({ token, ...user });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Server error');
  }
});

router.post('/signup', async (req, res) => {
  const { first_name, last_name, email, phone_number, password } = req.body;
  try {
    // Check if user exists
    const user = await pool.query('SELECT * FROM Users WHERE email = $1', [email]);
    if (user.rows.length > 0) {
      return res.status(400).send('User already exists');
    }

    // Encrypt the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = await pool.query(
      'INSERT INTO Users (first_name, last_name, email, phone_number, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [first_name, last_name, email, phone_number, hashedPassword]
    );

    // Generate JWT token
    const token = jwt.sign({ user_id: newUser.rows[0].user_id, email: newUser.rows[0].email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send token to the client
    res.json({ token, ...newUser.rows[0] });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
